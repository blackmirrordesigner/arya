-- ============================================================
--  ARYA · Row Level Security
--  20261015_002_rls.sql
--  Run after 001_schema.sql
-- ============================================================

-- ── OILS: public read, admin write ───────────────────────────
alter table public.oils enable row level security;

create policy "oils_public_read"
  on public.oils for select
  using (active = true);

create policy "oils_admin_all"
  on public.oils for all
  using (auth.role() = 'service_role');

-- ── CUSTOMERS: own record only ────────────────────────────────
alter table public.customers enable row level security;

-- Anonymous users can insert (first checkout — no account yet)
create policy "customers_insert_anon"
  on public.customers for insert
  with check (true);

-- Authenticated users can read/update their own record
create policy "customers_own_read"
  on public.customers for select
  using (
    auth.uid() is not null and
    email = (select email from auth.users where id = auth.uid())
  );

create policy "customers_own_update"
  on public.customers for update
  using (
    auth.uid() is not null and
    email = (select email from auth.users where id = auth.uid())
  );

-- Service role (admin / Edge Function) can do anything
create policy "customers_admin_all"
  on public.customers for all
  using (auth.role() = 'service_role');

-- ── ORDERS: own orders + admin ────────────────────────────────
alter table public.orders enable row level security;

-- Anonymous insert (guest checkout via Edge Function with service_role key)
create policy "orders_insert_service"
  on public.orders for insert
  with check (auth.role() = 'service_role');

-- Customer reads own orders (join via customer email)
create policy "orders_own_read"
  on public.orders for select
  using (
    auth.uid() is not null and
    customer_id in (
      select id from public.customers
      where email = (select email from auth.users where id = auth.uid())
    )
  );

-- Admin full access
create policy "orders_admin_all"
  on public.orders for all
  using (auth.role() = 'service_role');

-- ── ORDER ITEMS: follow parent order ─────────────────────────
alter table public.order_items enable row level security;

create policy "order_items_own_read"
  on public.order_items for select
  using (
    order_id in (
      select o.id from public.orders o
      join public.customers c on c.id = o.customer_id
      where auth.uid() is not null
        and c.email = (select email from auth.users where id = auth.uid())
    )
  );

create policy "order_items_admin_all"
  on public.order_items for all
  using (auth.role() = 'service_role');

-- ── ORDER EVENTS: follow parent order ────────────────────────
alter table public.order_events enable row level security;

create policy "order_events_own_read"
  on public.order_events for select
  using (
    order_id in (
      select o.id from public.orders o
      join public.customers c on c.id = o.customer_id
      where auth.uid() is not null
        and c.email = (select email from auth.users where id = auth.uid())
    )
  );

create policy "order_events_admin_all"
  on public.order_events for all
  using (auth.role() = 'service_role');
