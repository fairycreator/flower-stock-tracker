# Florén – flower stock tracker

Weekly cut-flower stock for Florén Studio (Copenhagen): flower list stacked by colour, two buying days a week with printable buying sheets, supplier invoice upload and matching, an end-of-week cooler count, and waste / cost / next-week order suggestions. Ukrainian and English UI, prices in DKK, built for phones.

- **Frontend:** plain HTML/CSS/JS, no build step. Hosted on Vercel.
- **Backend:** Supabase project `floren-stock-tracker` (Postgres with row-level security, realtime, storage, one edge function).

## How it works

| Screen | What it does |
|---|---|
| Головна / Home | Drop zone for supplier invoices, next buying day with item count and estimate, count status, this week's figures and what needs attention. |
| Склад / Stock | *List*: Luxury and Regular tabs, flowers grouped by colour → group → variety and length, search and filters. *Selling prices*: price per stem, VAT, pack price, markup, margin and price-list PDF/CSV. |
| Закупівля / Buying | Day 1 and Day 2 buying sheets grouped by supplier → tier → colour: have, need, order (bunches), last price, estimate. Every suggestion shows its reasoning and can be edited. A4 PDF. |
| Рахунки / Invoices | Drop or pick a supplier A4 PDF (or photo) – here, on Home, or anywhere on the page on desktop. Lines are matched to your flowers; unknown lines are turned into new flowers (group, variety, colour, length, pack size, tier and price taken from the invoice) and added to stock with one tap. The original file stays attached. |
| Підрахунок / Count | Cooler-style screen with big +/− for bunches and loose stems, condition (fresh, usable, sell first, not usable) and a required reason for every discard. Saving carries usable leftovers into next week's opening stock. |
| Огляд / Insights | Bought, used, left, waste %, cost per stem and income (when a selling price is set), per flower, colour and tier. Next week's suggested order. |
| ⚙ Settings (top bar) | Buying days and times, language, team members, A4 templates, CSV exports, remove demo data. |

**Suggestions:** typical weekly use (average of up to the last 12 counted weeks) minus usable leftovers, rounded up to whole bunches, split between the two buying days by past buying (or the day‑1 share setting). With fewer than 8 counted weeks they are marked *low confidence*. Seasonality is not shown before 52 weeks of data. Prices are only ever taken from invoices.

**Invoice reading:** Dutch auction-style PDFs (like Verdel: `2x 25 50 Rosa Red Naomi S 60 9,69 484,50`) are parsed in the browser with a bundled pdf.js (`vendor/pdfjs`, Apache-2.0) and matched by the product names saved on each flower. Photos and other layouts go to the `read-invoice` edge function, which uses Claude (needs an Anthropic API key, see below).

## Data

| Table | Purpose |
|---|---|
| `team` | Emails allowed to use the app (`is_member()` checks the signed-in email) |
| `stock_flowers` | Flower list (tier, group, variety, colour, length, supplier, bunch size, invoice aliases) |
| `stock_invoices` | Invoices with their lines (jsonb) and a pointer to the original in storage |
| `stock_purchases` | One row per matched invoice line: week, buying day, flower, stems, price per stem |
| `stock_countlines` / `stock_countmeta` | End-of-week count per flower / saved flag per week |
| `stock_orders` | Edited order quantities per week and buying day |
| `stock_settings` | Buying days and times |

Storage bucket `stock-invoices` (private). Every table and the bucket are limited to team members by RLS.

Schema: `supabase/migrations/`. Seed (Verdel invoice 295427 for week 43, starter flower list, demo week 41): `supabase/seed.sql`.

## Setup notes

1. **Auth URL** – in Supabase → Authentication → URL Configuration, set *Site URL* to the Vercel address so confirmation emails link back to the app.
2. **Team** – a person creates an account in the app with their email; someone already on the team adds that email under *Ще → Команда*. (Or: `insert into public.team (email) values ('name@example.com');`)
3. **Invoice reading for photos / other suppliers** – add the secret in Supabase → Edge Functions → Secrets: `ANTHROPIC_API_KEY`. Optional `ANTHROPIC_MODEL` (default `claude-sonnet-5-5`).
4. **Config** – `js/config.js` holds the Supabase URL and publishable key (safe to be public; RLS protects the data).

## Local run

Any static server works, e.g. `npx serve .` or `python3 -m http.server`.

Fonts: DejaVu Sans Condensed (bundled in `fonts/`, used for Cyrillic in PDFs; licence in `fonts/LICENSE-DejaVu.txt`), Golos Text, Yeseva One and JetBrains Mono from Google Fonts.
