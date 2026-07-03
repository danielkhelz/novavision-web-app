# NovaVision Supabase Setup

1. Create a Supabase project.
2. Run `supabase/migrations/20260630120000_initial_schema.sql` in the SQL editor or with the Supabase CLI.
3. In Authentication, enable email/password and the OAuth providers you want to publish.
4. Add the production URL and Netlify preview URL to Auth redirect URLs.
5. Create the first admin by setting `profiles.is_admin = true` for your user after signup.
6. Keep `SUPABASE_SERVICE_ROLE_KEY` only in Netlify environment variables. Never expose it in the browser.
