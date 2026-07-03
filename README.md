# NovaVision Web App

Web app Vite + Supabase + Stripe per connettere artisti e clienti, con iscrizioni e pagamenti Premium.

## Stack

- **Frontend**: Vite, HTML/CSS/JS
- **Auth e database**: Supabase
- **Pagamenti**: Stripe Checkout + Customer Portal
- **Deploy**: Vercel (frontend + API serverless)

## Pubblicazione su GitHub

```bash
git remote add origin https://github.com/TUO-USERNAME/novavision-web-app.git
git push -u origin main
```

Poi collega il repo a Vercel per deploy automatico con pagamenti funzionanti.

Guida completa: **[DEPLOY_GITHUB.md](./DEPLOY_GITHUB.md)**

## Sviluppo locale

```bash
npm install
cp .env.example .env
# compila .env con chiavi Supabase e Stripe test
npm run dev:api
```

Apri http://localhost:3000

Solo frontend (senza API Stripe):

```bash
npm run dev
```

## Variabili ambiente

Copia `.env.example` in `.env`. Riferimento: `ENV_VARIABLES.txt`

| Variabile | Dove |
|-----------|------|
| `VITE_SUPABASE_URL` | Vercel + `.env` |
| `VITE_SUPABASE_ANON_KEY` | Vercel + `.env` |
| `VITE_APP_URL` | Vercel + `.env` |
| `SUPABASE_SERVICE_ROLE_KEY` | Solo Vercel / `.env` |
| `STRIPE_SECRET_KEY` | Solo Vercel / `.env` |
| `STRIPE_WEBHOOK_SECRET` | Solo Vercel / `.env` |
| `STRIPE_PRICE_*` | Solo Vercel / `.env` |

## Stripe

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
https://TUO-SITO.vercel.app/api/stripe-webhook
```

## Supabase

Esegui `SUPABASE_SQL_DA_ESEGUIRE.sql` nel SQL Editor.

## Deploy manuale

```bash
npx vercel login
npm run deploy
```

## Guide

- `DEPLOY_GITHUB.md` — GitHub + Vercel + test pagamenti
- `PASSO_PASSO_SUPABASE_STRIPE_NETLIFY.md` — setup Supabase/Stripe (ignora parti Netlify)
- `STRIPE_PREZZI_DA_CREARE.md`