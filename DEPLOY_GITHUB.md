# NovaVision — Pubblicazione su GitHub + Vercel

Guida per pubblicare il repository su GitHub e testare iscrizioni e pagamenti Stripe **senza Netlify**.

## Perche Vercel

Stripe richiede API server-side (checkout, webhook, portale abbonamenti). GitHub Pages pubblica solo file statici.

Vercel collega GitHub, esegue la build Vite e ospita le API in `api/` — piano gratuito sufficiente per test.

## 1. Crea repository GitHub

1. https://github.com/new
2. Nome: `novavision-web-app`
3. Non aggiungere README o `.gitignore` (gia nel progetto)
4. Crea il repository

## 2. Carica il codice

```bash
cd "D:\DISCO D\PRGETTO NOVAVISION WEB APP\NOVAVISION WEB APP"
git remote add origin https://github.com/TUO-USERNAME/novavision-web-app.git
git push -u origin main
```

## 3. Collega Vercel a GitHub

1. https://vercel.com → accedi con GitHub
2. `Add New` → `Project`
3. Importa `novavision-web-app`
4. Conferma impostazioni (lette da `vercel.json`):

| Campo | Valore |
|-------|--------|
| Framework | Other |
| Build command | `npm run build` |
| Output directory | `dist` |

5. Deploy

## 4. Variabili ambiente Vercel

`Project Settings` → `Environment Variables`

Inserisci tutte le variabili da `.env.example` o `ENV_VARIABLES.txt`:

**Frontend**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL` — URL Vercel, es. `https://novavision-web-app.vercel.app`

**Backend (segrete)**

- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` — `sk_test_...` per test
- `STRIPE_WEBHOOK_SECRET`
- `APP_URL` — stesso URL di `VITE_APP_URL`
- `STRIPE_PRICE_ARTIST_MONTHLY`
- `STRIPE_PRICE_ARTIST_YEARLY`
- `STRIPE_PRICE_CLIENT_MONTHLY`
- `STRIPE_PRICE_CLIENT_YEARLY`

Dopo il primo deploy, aggiorna `VITE_APP_URL` e `APP_URL` con l'URL reale e rifai deploy.

## 5. Supabase

1. Crea progetto su https://supabase.com
2. Esegui `SUPABASE_SQL_DA_ESEGUIRE.sql`
3. `Authentication` → `URL Configuration`:
   - Site URL: URL Vercel
   - Redirect URLs: URL Vercel
4. Admin primo account:

```sql
update public.profiles
set is_admin = true, publication_status = 'approved'
where email = 'tua-email@example.com';
```

## 6. Stripe (test)

1. Modalita test attiva
2. Crea prezzi: `npm run stripe:prices` oppure `STRIPE_PREZZI_DA_CREARE.md`
3. Webhook:

```text
https://TUO-SITO.vercel.app/api/stripe-webhook
```

Eventi:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

4. Signing secret `whsec_...` → `STRIPE_WEBHOOK_SECRET` su Vercel

## 7. Test

1. Registrazione utente
2. Login
3. Dashboard → piano Premium
4. Carta test `4242 4242 4242 4242`
5. Verifica abbonamento in dashboard e tabella `subscriptions` su Supabase
6. `Gestisci abbonamento` → portale Stripe

## 8. Deploy automatici

Ogni `git push` su `main` → rebuild Vercel.

## Sviluppo locale

```bash
cp .env.example .env
# compila .env
npm install
npm run dev:api
```

Apri http://localhost:3000 — frontend + API Stripe in locale.

Solo frontend (senza pagamenti):

```bash
npm run dev
```

## Sicurezza

- Mai committare `.env` o chiavi `service_role` / `sk_live_`
- `public/env.js` rigenerato a ogni build
- Usa `sk_test_` finche non vai in produzione