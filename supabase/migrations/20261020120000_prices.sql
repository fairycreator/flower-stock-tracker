-- Selling prices / price list settings (VAT %, rounding, default markup, which prices to show)
alter table public.stock_settings add column if not exists prices jsonb not null default '{"vat":25,"round":0.5,"markup":2.5,"show":"stem_bunch"}';
alter table public.stock_flowers add column if not exists sell_note text;
