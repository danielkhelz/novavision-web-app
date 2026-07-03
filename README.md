# NovaVision Web App

Web app Vite + Supabase + Stripe + Netlify per connettere artisti e clienti, con iscrizioni e pagamenti Premium.

## Stack

- **Frontend**: Vite, HTML/CSS/JS
- **Auth e database**: Supabase
- **Pagamenti**: Stripe Checkout + Customer Portal
- **Deploy**: Netlify (frontend + serverless functions)

## Pubblicazione su GitHub (consigliata)

Per test completo con iscrizioni e pagamenti:

1. Carica il progetto su GitHub
2. Collega il repo a Netlify
3. Configura variabili ambiente
4. Configura Supabase e Stripe in modalita test

Guida dettagliata: **[DEPLOY_GITHUB.md](./DEPLOY_GITHUB.md)**

```bash
git init
git add .
git commit -m "Initial commit: NovaVision web app"
git remote add origin https://github.com/TUO-USERNAME/novavision-web-app.git
git push -u origin main
```

Ogni push su `main` attiva deploy automatico su Netlify.

## Sviluppo locale

```bash
npm install
cp .env.example .env
# compila .env con chiavi Supabase e Stripe test
npm run dev:netlify
```

Apri http://localhost:8888

Solo frontend (senza funzioni Stripe):

```bash
npm run dev
```

## Variabili ambiente

Copia `.env.example` in `.env` e compila tutti i campi.

Riferimento completo: `NETLIFY_VARIABILI_DA_COMPILARE.txt`

| Variabile | Dove va |
|-----------|---------|
| `VITE_SUPABASE_URL` | Netlify + `.env` |
| `VITE_SUPABASE_ANON_KEY` | Netlify + `.env` |
| `VITE_APP_URL` | Netlify + `.env` |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo Netlify / `.env` locale |
| `STRIPE_SECRET_KEY` | Solo Netlify / `.env` locale |
| `STRIPE_WEBHOOK_SECRET` | Solo Netlify / `.env` locale |
| `STRIPE_PRICE_*` | Solo Netlify / `.env` locale |

`public/env.js` viene generato automaticamente da `scripts/generate-env.js` a ogni build.

## Stripe

Prezzi da creare:

| Piano | Prezzo |
|-------|--------|
| Premium artista mensile | EUR 2,00 / mese |
| Premium artista annuale | EUR 19,00 / anno |
| Premium cliente mensile | EUR 3,00 / mese |
| Premium cliente annuale | EUR 29,00 / anno |

```bash
npm run stripe:prices
```

Webhook:

```text
https://TUO-SITO.netlify.app/.netlify/functions/stripe-webhook
```

## Supabase

Esegui `SUPABASE_SQL_DA_ESEGUIRE.sql` nel SQL Editor.

## Deploy manuale (senza GitHub)

```bash
npm install
npx netlify-cli login
npm run deploy:netlify
```

Vedi anche `NETLIFY_COMPLETO_SENZA_GITHUB.md`.

## Guide incluse

- `DEPLOY_GITHUB.md` — GitHub + Netlify + test pagamenti
- `PASSO_PASSO_SUPABASE_STRIPE_NETLIFY.md`
- `CONFIGURAZIONE_LIVE_SUPABASE_STRIPE.md`
- `STRIPE_PREZZI_DA_CREARE.md`