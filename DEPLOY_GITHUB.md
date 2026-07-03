# NovaVision — Pubblicazione su GitHub + Netlify

Guida per pubblicare il repository su GitHub e testare iscrizioni e pagamenti Stripe.

## 1. Crea repository GitHub

1. Vai su https://github.com/new
2. Nome suggerito: `novavision-web-app`
3. Visibilita: `Public` o `Private`
4. Non aggiungere README, `.gitignore` o licenza (esistono gia nel progetto)
5. Crea il repository

## 2. Carica il codice

Dalla cartella progetto:

```bash
git init
git add .
git commit -m "Initial commit: NovaVision web app"
git branch -M main
git remote add origin https://github.com/TUO-USERNAME/novavision-web-app.git
git push -u origin main
```

## 3. Collega Netlify a GitHub

1. Vai su https://app.netlify.com
2. `Add new site` -> `Import an existing project`
3. Scegli `GitHub` e autorizza Netlify
4. Seleziona il repository `novavision-web-app`
5. Conferma impostazioni build:

| Campo | Valore |
|-------|--------|
| Build command | `npm run build` |
| Publish directory | `dist` |
| Functions directory | `netlify/functions` |

Netlify legge gia `netlify.toml`; questi valori sono precompilati.

## 4. Variabili ambiente Netlify

In Netlify: `Site configuration` -> `Environment variables`

Inserisci tutte le variabili da `.env.example` o `NETLIFY_VARIABILI_DA_COMPILARE.txt`:

**Frontend (pubbliche)**

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL` — URL Netlify, es. `https://novavision-web-app.netlify.app`

**Backend (segrete, solo Netlify)**

- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY` — usa chiave `sk_test_...` per test
- `STRIPE_WEBHOOK_SECRET`
- `APP_URL` — stesso URL Netlify di `VITE_APP_URL`
- `STRIPE_PRICE_ARTIST_MONTHLY`
- `STRIPE_PRICE_ARTIST_YEARLY`
- `STRIPE_PRICE_CLIENT_MONTHLY`
- `STRIPE_PRICE_CLIENT_YEARLY`

Dopo il primo deploy, aggiorna `VITE_APP_URL` e `APP_URL` con l'URL reale e rifai deploy.

## 5. Supabase

1. Crea progetto su https://supabase.com
2. Esegui `SUPABASE_SQL_DA_ESEGUIRE.sql` nel SQL Editor
3. In `Authentication` -> `URL Configuration`:
   - Site URL: URL Netlify
   - Redirect URLs: URL Netlify
4. Rendi admin il primo account:

```sql
update public.profiles
set is_admin = true, publication_status = 'approved'
where email = 'tua-email@example.com';
```

## 6. Stripe (modalita test)

1. Account Stripe in test mode
2. Crea i 4 prezzi ricorrenti (vedi `STRIPE_PREZZI_DA_CREARE.md`) oppure:

```bash
npm run stripe:prices
```

3. Webhook endpoint:

```text
https://TUO-SITO.netlify.app/.netlify/functions/stripe-webhook
```

Eventi da abilitare:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

4. Copia il signing secret `whsec_...` in `STRIPE_WEBHOOK_SECRET` su Netlify

## 7. Test funzionalita

Dopo deploy riuscito:

1. Registrazione utente (artista o cliente)
2. Login
3. Dashboard -> scegli piano Premium
4. Checkout Stripe con carta test `4242 4242 4242 4242`
5. Verifica abbonamento in dashboard e tabella `subscriptions` su Supabase
6. `Gestisci abbonamento` -> portale Stripe

## 8. Deploy automatici

Ogni `git push` su `main` attiva rebuild Netlify.

Per sviluppo locale:

```bash
cp .env.example .env
# compila .env con le tue chiavi
npm install
npm run dev:netlify
```

`dev:netlify` avvia Vite + funzioni Netlify in locale sulla porta 8888.

## Note sicurezza

- Mai committare `.env` o chiavi `service_role` / `sk_live_`
- `public/env.js` viene rigenerato a ogni build da variabili `VITE_*`
- Usa sempre `sk_test_` e webhook test finche non vai in produzione