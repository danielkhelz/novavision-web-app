create extension if not exists "pgcrypto";

do $$ begin
  create type public.user_role as enum ('artist', 'client', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type public.content_status as enum ('draft', 'pending_review', 'approved', 'rejected', 'archived');
exception when duplicate_object then null; end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role public.user_role not null default 'client',
  display_name text not null default 'Utente NovaVision',
  phone text,
  city text,
  country text default 'Italia',
  birth_date date,
  avatar_url text,
  category text,
  instrument text,
  education text,
  diploma text,
  bio text,
  price_min integer check (price_min is null or price_min >= 0),
  verified boolean not null default false,
  publication_status public.content_status not null default 'pending_review',
  is_admin boolean not null default false,
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.jobs (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  city text not null,
  event_date date not null,
  category text,
  genre text,
  instrument text,
  budget_min integer check (budget_min is null or budget_min >= 0),
  budget_max integer not null default 0 check (budget_max >= 0),
  description text not null,
  publication_status public.content_status not null default 'pending_review',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  artist_id uuid not null references public.profiles(id) on delete cascade,
  message text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (job_id, artist_id)
);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  artist_id uuid not null references public.profiles(id) on delete cascade,
  event_type text not null,
  city text not null,
  event_date date not null,
  budget integer not null default 0 check (budget >= 0),
  message text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.conversations (
  id uuid primary key default gen_random_uuid(),
  client_id uuid not null references public.profiles(id) on delete cascade,
  artist_id uuid not null references public.profiles(id) on delete cascade,
  booking_request_id uuid references public.booking_requests(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (client_id, artist_id)
);

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  sender_id uuid not null references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  stripe_customer_id text not null,
  stripe_subscription_id text unique not null,
  stripe_price_id text,
  plan_key text,
  status text not null default 'active',
  current_period_end timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_reviews (
  id uuid primary key default gen_random_uuid(),
  reviewer_id uuid references public.profiles(id) on delete set null,
  target_table text not null,
  target_id uuid not null,
  status public.content_status not null,
  note text,
  created_at timestamptz not null default now()
);

create index if not exists profiles_public_artist_idx on public.profiles(role, publication_status, city, category);
create index if not exists jobs_public_idx on public.jobs(publication_status, event_date, city, category);
create index if not exists applications_artist_idx on public.applications(artist_id);
create index if not exists conversations_members_idx on public.conversations(client_id, artist_id);
create index if not exists messages_conversation_idx on public.messages(conversation_id, created_at);
create index if not exists subscriptions_user_idx on public.subscriptions(user_id);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();

drop trigger if exists jobs_set_updated_at on public.jobs;
create trigger jobs_set_updated_at before update on public.jobs for each row execute function public.set_updated_at();

drop trigger if exists applications_set_updated_at on public.applications;
create trigger applications_set_updated_at before update on public.applications for each row execute function public.set_updated_at();

drop trigger if exists booking_requests_set_updated_at on public.booking_requests;
create trigger booking_requests_set_updated_at before update on public.booking_requests for each row execute function public.set_updated_at();

drop trigger if exists conversations_set_updated_at on public.conversations;
create trigger conversations_set_updated_at before update on public.conversations for each row execute function public.set_updated_at();

drop trigger if exists subscriptions_set_updated_at on public.subscriptions;
create trigger subscriptions_set_updated_at before update on public.subscriptions for each row execute function public.set_updated_at();

create or replace function public.current_user_is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid()
      and is_admin = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;
alter table public.booking_requests enable row level security;
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.subscriptions enable row level security;
alter table public.content_reviews enable row level security;

drop policy if exists "profiles public approved artists" on public.profiles;
create policy "profiles public approved artists" on public.profiles
for select using (publication_status = 'approved' or id = auth.uid() or public.current_user_is_admin());

drop policy if exists "profiles self insert" on public.profiles;
create policy "profiles self insert" on public.profiles
for insert with check (id = auth.uid());

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
for update using (id = auth.uid() or public.current_user_is_admin())
with check (id = auth.uid() or public.current_user_is_admin());

drop policy if exists "jobs public approved" on public.jobs;
create policy "jobs public approved" on public.jobs
for select using (publication_status = 'approved' or owner_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "jobs owner insert" on public.jobs;
create policy "jobs owner insert" on public.jobs
for insert with check (owner_id = auth.uid());

drop policy if exists "jobs owner update" on public.jobs;
create policy "jobs owner update" on public.jobs
for update using (owner_id = auth.uid() or public.current_user_is_admin())
with check (owner_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "applications participants select" on public.applications;
create policy "applications participants select" on public.applications
for select using (
  artist_id = auth.uid()
  or public.current_user_is_admin()
  or exists (select 1 from public.jobs where jobs.id = applications.job_id and jobs.owner_id = auth.uid())
);

drop policy if exists "applications artist insert" on public.applications;
create policy "applications artist insert" on public.applications
for insert with check (artist_id = auth.uid());

drop policy if exists "applications participants update" on public.applications;
create policy "applications participants update" on public.applications
for update using (
  artist_id = auth.uid()
  or public.current_user_is_admin()
  or exists (select 1 from public.jobs where jobs.id = applications.job_id and jobs.owner_id = auth.uid())
);

drop policy if exists "booking requests participants select" on public.booking_requests;
create policy "booking requests participants select" on public.booking_requests
for select using (client_id = auth.uid() or artist_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "booking requests client insert" on public.booking_requests;
create policy "booking requests client insert" on public.booking_requests
for insert with check (client_id = auth.uid());

drop policy if exists "booking requests participants update" on public.booking_requests;
create policy "booking requests participants update" on public.booking_requests
for update using (client_id = auth.uid() or artist_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "conversations participants select" on public.conversations;
create policy "conversations participants select" on public.conversations
for select using (client_id = auth.uid() or artist_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "conversations client insert" on public.conversations;
create policy "conversations client insert" on public.conversations
for insert with check (client_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "conversations participants update" on public.conversations;
create policy "conversations participants update" on public.conversations
for update using (client_id = auth.uid() or artist_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "messages participants select" on public.messages;
create policy "messages participants select" on public.messages
for select using (
  public.current_user_is_admin()
  or exists (
    select 1 from public.conversations
    where conversations.id = messages.conversation_id
      and (conversations.client_id = auth.uid() or conversations.artist_id = auth.uid())
  )
);

drop policy if exists "messages participant insert" on public.messages;
create policy "messages participant insert" on public.messages
for insert with check (
  sender_id = auth.uid()
  and exists (
    select 1 from public.conversations
    where conversations.id = messages.conversation_id
      and (conversations.client_id = auth.uid() or conversations.artist_id = auth.uid())
  )
);

drop policy if exists "subscriptions owner select" on public.subscriptions;
create policy "subscriptions owner select" on public.subscriptions
for select using (user_id = auth.uid() or public.current_user_is_admin());

drop policy if exists "content reviews admin all" on public.content_reviews;
create policy "content reviews admin all" on public.content_reviews
for all using (public.current_user_is_admin())
with check (public.current_user_is_admin());

insert into storage.buckets (id, name, public)
values ('profile-assets', 'profile-assets', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "profile assets public read" on storage.objects;
create policy "profile assets public read" on storage.objects
for select using (bucket_id = 'profile-assets');

drop policy if exists "profile assets owner insert" on storage.objects;
create policy "profile assets owner insert" on storage.objects
for insert with check (
  bucket_id = 'profile-assets'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "profile assets owner update" on storage.objects;
create policy "profile assets owner update" on storage.objects
for update using (
  bucket_id = 'profile-assets'
  and auth.uid()::text = (storage.foldername(name))[1]
);

drop policy if exists "profile assets owner delete" on storage.objects;
create policy "profile assets owner delete" on storage.objects
for delete using (
  bucket_id = 'profile-assets'
  and auth.uid()::text = (storage.foldername(name))[1]
);
