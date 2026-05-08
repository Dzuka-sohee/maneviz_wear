-- =============================================
-- MANEVIZ WEAR — Supabase Schema
-- Jalankan di: Supabase Dashboard → SQL Editor
-- =============================================

-- 1. Tabel countdowns
create table if not exists countdowns (
  id          uuid primary key default gen_random_uuid(),
  label       text not null default 'Main Launch',
  target_date timestamptz not null,
  is_active   boolean not null default false,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- 2. Trigger auto-update kolom updated_at
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger countdowns_updated_at
  before update on countdowns
  for each row execute procedure update_updated_at();

-- 3. Row Level Security
alter table countdowns enable row level security;

-- Public hanya bisa READ countdown yang is_active = true
create policy "Public read active"
  on countdowns for select
  using (is_active = true);

-- Authenticated (admin) bisa full CRUD
create policy "Authenticated full access"
  on countdowns for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- 4. Seed data awal
insert into countdowns (label, target_date, is_active)
values ('Grand Launch', '2026-06-06T00:00:00+00:00', true);

-- =============================================
-- Buat admin user di:
-- Supabase Dashboard → Authentication → Users → Add User
-- Contoh: admin@manevizwear.com / password_kamu
-- =============================================