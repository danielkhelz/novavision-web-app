create or replace function public.prevent_profile_privilege_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  if public.current_user_is_admin() then
    return new;
  end if;

  if new.is_admin is distinct from old.is_admin then
    raise exception 'Only admins can change is_admin';
  end if;

  if new.verified is distinct from old.verified then
    raise exception 'Only admins can change verified';
  end if;

  if new.publication_status is distinct from old.publication_status then
    raise exception 'Only admins can change publication_status';
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_prevent_privilege_escalation on public.profiles;
create trigger profiles_prevent_privilege_escalation
before update on public.profiles
for each row execute function public.prevent_profile_privilege_escalation();

create or replace function public.prevent_job_self_approval()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    return new;
  end if;

  if public.current_user_is_admin() then
    return new;
  end if;

  if new.publication_status is distinct from old.publication_status then
    raise exception 'Only admins can change job publication_status';
  end if;

  return new;
end;
$$;

drop trigger if exists jobs_prevent_self_approval on public.jobs;
create trigger jobs_prevent_self_approval
before update on public.jobs
for each row execute function public.prevent_job_self_approval();
