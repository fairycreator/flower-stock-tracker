-- Selling prices / price list settings (VAT %, rounding, default markup, which prices to show)
alter table public.stock_settings add column if not exists prices jsonb not null default '{"vat":25,"round":0.5,"markup":2.5,"show":"stem_bunch"}';
alter table public.stock_flowers add column if not exists sell_note text;
-- Selling price is the final price per stem incl. VAT; default markup ×3 on cost
update public.stock_settings set prices = coalesce(prices,'{}'::jsonb) || '{"markup":3,"show":"incl"}'::jsonb where id='main';
alter table public.stock_settings alter column prices set default '{"vat":25,"round":0.5,"markup":3,"show":"incl"}';
comment on column public.stock_flowers.sell is 'Final selling price per stem in DKK, including VAT (moms)';
