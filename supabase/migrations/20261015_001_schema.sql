-- ============================================================
--  ARYA · Supabase Schema Migration
--  20261015_001_schema.sql
--  Run in order: 001 → 002 → 003
-- ============================================================

-- Extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- ============================================================
--  1. OILS catalog (matches JS OILS array)
-- ============================================================
create table if not exists public.oils (
  id          text        primary key,        -- 'kunzhut', 'len', etc.
  num         text        not null,            -- '01', '02', ...
  name        text        not null,
  latin       text        not null,
  task        text        not null,
  price_rub   integer     not null,
  img_path    text,                            -- 'assets/oil-kunzhut.png'
  hero_img    text,                            -- hero-images path
  why         text,
  body        text,
  body2       text,
  quote       text,
  how         jsonb       not null default '[]',      -- ["step1", "step2", ...]
  science     jsonb       not null default '[]',      -- [{k, v}, ...]
  alts        jsonb       not null default '[]',      -- [{name, tag, note, price}, ...]
  active      boolean     not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.oils is 'ARYA oil product catalog';

-- ============================================================
--  2. CUSTOMERS
-- ============================================================
create table if not exists public.customers (
  id          uuid        primary key default uuid_generate_v4(),
  email       text        not null,
  phone       text,
  first_name  text,
  last_name   text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),

  constraint customers_email_unique unique (email)
);

comment on table public.customers is 'Customer contact records';

-- ============================================================
--  3. ORDERS
-- ============================================================
create type public.order_status as enum (
  'pending_payment',   -- created, awaiting payment
  'paid',              -- payment confirmed
  'pressing',          -- oil being pressed
  'shipped',           -- dispatched to customer
  'delivered',         -- confirmed delivered
  'cancelled',         -- cancelled before pressing
  'refunded'           -- payment returned
);

create type public.delivery_method as enum (
  'courier',   -- Moscow courier
  'cdek',      -- СДЭК
  'pickup',    -- self pickup
  'post'       -- Почта России
);

create table if not exists public.orders (
  id              uuid            primary key default uuid_generate_v4(),
  order_number    text            not null unique,   -- 'ARYA-2026-0001'
  customer_id     uuid            not null references public.customers(id),
  status          public.order_status not null default 'pending_payment',

  -- Delivery
  delivery_method public.delivery_method not null default 'courier',
  delivery_address text,
  delivery_city    text,

  -- Financials
  total_rub       integer         not null,           -- kopecks → rub
  currency        text            not null default 'RUB',

  -- Dates
  paid_at         timestamptz,
  pressing_starts_at timestamptz,                     -- scheduled press date
  pressing_done_at   timestamptz,
  shipped_at      timestamptz,
  ready_estimate  date,                               -- shown to customer (~14 days)

  -- Payment (placeholder — connect Stripe/YooKassa later)
  payment_provider    text,                           -- 'stripe', 'yookassa', etc.
  payment_intent_id   text,
  payment_ref         text,

  -- Meta
  notes           text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.orders is 'ARYA preorders — one per customer submission';

-- Auto-generate human-readable order number
create sequence if not exists public.order_seq start 1;

create or replace function public.generate_order_number()
returns trigger language plpgsql as $$
begin
  new.order_number := 'ARYA-' || to_char(now(), 'YYYY') || '-' || lpad(nextval('public.order_seq')::text, 4, '0');
  return new;
end;
$$;

drop trigger if exists trg_order_number on public.orders;
create trigger trg_order_number
  before insert on public.orders
  for each row execute function public.generate_order_number();

-- ============================================================
--  4. ORDER ITEMS
-- ============================================================
create table if not exists public.order_items (
  id          uuid        primary key default uuid_generate_v4(),
  order_id    uuid        not null references public.orders(id) on delete cascade,
  oil_id      text        not null references public.oils(id),
  oil_name    text        not null,           -- snapshot at order time
  qty         integer     not null default 1 check (qty > 0),
  unit_price  integer     not null,           -- RUB at order time
  line_total  integer     generated always as (qty * unit_price) stored,
  created_at  timestamptz not null default now()
);

comment on table public.order_items is 'Individual oil bottles in an order';

-- ============================================================
--  5. ORDER STATUS HISTORY (audit log)
-- ============================================================
create table if not exists public.order_events (
  id          uuid        primary key default uuid_generate_v4(),
  order_id    uuid        not null references public.orders(id) on delete cascade,
  from_status public.order_status,
  to_status   public.order_status not null,
  note        text,
  created_by  text        default 'system',  -- 'system' | 'admin' | user email
  created_at  timestamptz not null default now()
);

comment on table public.order_events is 'Immutable audit trail of order status transitions';

-- Auto-log status changes
create or replace function public.log_order_status_change()
returns trigger language plpgsql as $$
begin
  if old.status is distinct from new.status then
    insert into public.order_events(order_id, from_status, to_status, created_by)
    values (new.id, old.status, new.status, 'system');
  end if;
  return new;
end;
$$;

drop trigger if exists trg_order_status on public.orders;
create trigger trg_order_status
  after update on public.orders
  for each row execute function public.log_order_status_change();

-- ============================================================
--  6. updated_at auto-update
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger trg_oils_updated_at     before update on public.oils     for each row execute function public.set_updated_at();
create trigger trg_customers_updated_at before update on public.customers for each row execute function public.set_updated_at();
create trigger trg_orders_updated_at    before update on public.orders    for each row execute function public.set_updated_at();
