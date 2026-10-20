-- Florén weekly flower stock tracker (own Supabase project).
-- Everything is readable/writable only by signed-in people whose email is on public.team.

create table if not exists public.team (
  email       text primary key check (email = lower(email)),
  name        text,
  added_at    timestamptz not null default now()
);

create or replace function public.is_member() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.team where email = lower(coalesce(auth.jwt() ->> 'email', '')))
$$;
revoke execute on function public.is_member() from anon, public;
grant execute on function public.is_member() to authenticated;

alter table public.team enable row level security;
drop policy if exists "members read team" on public.team;
drop policy if exists "members manage team" on public.team;
create policy "members read team" on public.team for select to authenticated using (public.is_member());
create policy "members manage team" on public.team for all to authenticated using (public.is_member()) with check (public.is_member());

create table if not exists public.stock_flowers (
  id          text primary key,
  tier        text not null default 'regular' check (tier in ('luxury','regular')),
  grp         text not null,
  variety     text not null default '',
  color       text not null,
  length      int,
  supplier    text not null default '',
  bunch       int  not null default 10 check (bunch > 0),
  verified    boolean not null default false,
  sell        numeric(10,2),
  spot        text not null default '',
  active      boolean not null default true,
  src         text,
  grade       text,
  alias       text[] not null default '{}',
  demo        boolean not null default false,
  created_ms  bigint,
  updated_at  timestamptz not null default now()
);

create table if not exists public.stock_settings (
  id          text primary key,
  days        jsonb not null default '[{"wd":2,"time":"06:00"},{"wd":5,"time":"06:00"}]',
  share1      numeric(4,3) not null default 0.5,
  updated_at  timestamptz not null default now()
);

create table if not exists public.stock_invoices (
  id             text primary key,
  supplier       text not null default '',
  supplier_full  text,
  invoice_no     text not null default '',
  invoice_date   date,
  due_date       date,
  wk             text not null,
  day            smallint not null default 1 check (day in (1,2)),
  asset          jsonb,          -- {path,name,type} in storage bucket stock-invoices
  file_name      text not null default '',
  currency       text not null default 'DKK',
  lines          jsonb not null default '[]',
  flowers_total  numeric(12,2),
  fees_total     numeric(12,2),
  total          numeric(12,2),
  manual         boolean not null default false,
  demo           boolean not null default false,
  created_ms     bigint,
  updated_at     timestamptz not null default now()
);

create table if not exists public.stock_purchases (
  id          text primary key,
  wk          text not null,
  day         smallint not null default 1 check (day in (1,2)),
  flower_id   text not null references public.stock_flowers(id),
  stems       int  not null,
  bunches     int,
  pp_stem     numeric(10,2),
  total       numeric(12,2),
  invoice_id  text references public.stock_invoices(id) on delete cascade,
  line        int,
  supplier    text not null default '',
  demo        boolean not null default false,
  updated_at  timestamptz not null default now()
);
create index if not exists stock_purchases_wk_idx on public.stock_purchases (wk);
create index if not exists stock_purchases_flower_idx on public.stock_purchases (flower_id);
create index if not exists stock_purchases_invoice_idx on public.stock_purchases (invoice_id);

create table if not exists public.stock_countlines (
  id          text primary key,           -- <week>_<flower id>
  wk          text not null,
  flower_id   text not null references public.stock_flowers(id),
  entries     jsonb not null default '[]', -- [{b,l,c,r,rt}]
  at_ms       bigint,
  demo        boolean not null default false,
  updated_at  timestamptz not null default now()
);
create index if not exists stock_countlines_wk_idx on public.stock_countlines (wk);
create index if not exists stock_countlines_flower_idx on public.stock_countlines (flower_id);

create table if not exists public.stock_countmeta (
  id          text primary key,           -- week key, e.g. 2026-W43
  saved       boolean not null default false,
  at_ms       bigint,
  demo        boolean not null default false,
  updated_at  timestamptz not null default now()
);

create table if not exists public.stock_orders (
  id          text primary key,           -- <week>_d<day>
  wk          text not null,
  day         smallint not null check (day in (1,2)),
  items       jsonb not null default '{}', -- {flower_id: bunches}
  at_ms       bigint,
  demo        boolean not null default false,
  updated_at  timestamptz not null default now()
);
create index if not exists stock_orders_wk_idx on public.stock_orders (wk);

-- updated_at
create or replace function public.stock_touch() returns trigger language plpgsql
set search_path = public as $$ begin new.updated_at := now(); return new; end $$;

do $$ declare t text; begin
  foreach t in array array['stock_flowers','stock_settings','stock_invoices','stock_purchases','stock_countlines','stock_countmeta','stock_orders'] loop
    execute format('drop trigger if exists %1$s_touch on public.%1$s', t);
    execute format('create trigger %1$s_touch before update on public.%1$s for each row execute function public.stock_touch()', t);
    execute format('alter table public.%s enable row level security', t);
    execute format('drop policy if exists "team all" on public.%s', t);
    execute format('create policy "team all" on public.%s for all to authenticated using (public.is_member()) with check (public.is_member())', t);
  end loop;
end $$;

-- live updates for everyone on the team
do $$ declare t text; begin
  foreach t in array array['stock_flowers','stock_settings','stock_invoices','stock_purchases','stock_countlines','stock_countmeta','stock_orders'] loop
    if not exists (select 1 from pg_publication_tables where pubname='supabase_realtime' and schemaname='public' and tablename=t) then
      execute format('alter publication supabase_realtime add table public.%s', t);
    end if;
  end loop;
end $$;

-- original invoice files (PDF/photo), private
insert into storage.buckets (id, name, public, file_size_limit)
values ('stock-invoices','stock-invoices', false, 26214400)
on conflict (id) do nothing;

drop policy if exists "invoice files team read" on storage.objects;
drop policy if exists "invoice files team write" on storage.objects;
drop policy if exists "invoice files team update" on storage.objects;
drop policy if exists "invoice files team delete" on storage.objects;
create policy "invoice files team read"   on storage.objects for select to authenticated using (bucket_id = 'stock-invoices' and public.is_member());
create policy "invoice files team write"  on storage.objects for insert to authenticated with check (bucket_id = 'stock-invoices' and public.is_member());
create policy "invoice files team update" on storage.objects for update to authenticated using (bucket_id = 'stock-invoices' and public.is_member());
create policy "invoice files team delete" on storage.objects for delete to authenticated using (bucket_id = 'stock-invoices' and public.is_member());
