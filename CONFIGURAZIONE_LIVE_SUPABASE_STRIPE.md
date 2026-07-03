# Configurazione live NovaVision

Questa configurazione rende la web app utilizzabile online con account reali, database Supabase e pagamenti Stripe.

## 1. Supabase

1. Crea un progetto Supabase.
2. Apri SQL Editor ed esegui in ordine:
   - `supabase/migrations/20260630120000_initial_schema.sql`
   - `supabase/migrations/20260630143000_protect_review_fields.sql`
3. In Authentication abilita:
   - Email/password
   - Google OAuth, se vuoi il pulsante Google
   - Apple OAuth, se vuoi il pulsante Apple
4. In Authentication > URL Configuration aggiungi:
   - URL Netlify di produzione
   - eventuale dominio personalizzato
   - URL preview Netlify, se lo usi
5. Dopo aver creato il primo account, rendilo admin:

```sql
update public.profiles
set is_admin = true, verified = true, publication_status = 'approved'
where email = 'LA-TUA-EMAIL';
```

## 2. Stripe

1. Crea 4 prezzi ricorrenti in Stripe, con gli stessi importi presenti nella web app:
   - Premium artista mensile: `EUR 2,00` ogni `mese`
   - Premium artista annuale: `EUR 19,00` ogni `anno`
   - Premium cliente mensile: `EUR 3,00` ogni `mese`
   - Premium cliente annuale: `EUR 29,00` ogni `anno`
2. Copia i rispettivi Price ID, formato `price_...`.
3. Crea un webhook Stripe verso:

```text
https://TUO-SITO.netlify.app/.netlify/functions/stripe-webhook
```

4. Eventi webhook richiesti:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copia il signing secret del webhook, formato `whsec_...`.

## 3. Netlify deploy completo consigliato

Per Supabase + Stripe + Functions usa il progetto completo, non solo drag-and-drop.

Impostazioni Netlify:

```text
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

Variabili ambiente Netlify:

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_URL=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
APP_URL=
STRIPE_PRICE_ARTIST_MONTHLY=
STRIPE_PRICE_ARTIST_YEARLY=
STRIPE_PRICE_CLIENT_MONTHLY=
STRIPE_PRICE_CLIENT_YEARLY=
```

Mappa i Price ID cosi:

```text
STRIPE_PRICE_ARTIST_MONTHLY -> Premium artista mensile, EUR 2,00 / mese
STRIPE_PRICE_ARTIST_YEARLY -> Premium artista annuale, EUR 19,00 / anno
STRIPE_PRICE_CLIENT_MONTHLY -> Premium cliente mensile, EUR 3,00 / mese
STRIPE_PRICE_CLIENT_YEARLY -> Premium cliente annuale, EUR 29,00 / anno
```

Metodo automatico opzionale:

```bash
npm run stripe:prices
```

Il comando usa `STRIPE_SECRET_KEY`, crea o riusa i prezzi corretti e stampa i valori `STRIPE_PRICE_*` da copiare in Netlify.

## 4. Drag-and-drop Netlify

La cartella `NETLIFY_DRAG_DROP` pubblica il sito statico. Supabase puo funzionare anche in drag-and-drop se compili prima con le variabili `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, oppure se modifichi `env.js` nella cartella pubblicata.

Stripe Checkout con Netlify Functions richiede deploy completo del progetto.

## 5. Test finale

1. Registrazione artista.
2. Registrazione cliente.
3. Approvazione admin del profilo artista.
4. Pubblicazione annuncio cliente.
5. Approvazione admin annuncio.
6. Candidatura artista.
7. Richiesta diretta cliente.
8. Checkout Stripe test.
9. Webhook Stripe ricevuto.
10. Portale abbonamento Stripe aperto dalla dashboard.
