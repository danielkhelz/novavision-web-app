# NovaVision - Guida passo passo Supabase + Stripe + Netlify

Questa guida e pensata per la prima configurazione. Segui l'ordine.

## 1. Crea Supabase

1. Vai su https://supabase.com e crea un account.
2. Crea un nuovo progetto.
3. Scegli una password database e conservala.
4. Quando il progetto e pronto, apri `SQL Editor`.
5. Apri il file `SUPABASE_SQL_DA_ESEGUIRE.sql` nella cartella NovaVision.
6. Copia tutto il contenuto.
7. Incollalo nel SQL Editor di Supabase.
8. Premi `Run`.

## 2. Recupera chiavi Supabase

In Supabase apri:

`Project Settings` -> `API`

Copiati:

- `Project URL` -> andra in `VITE_SUPABASE_URL`
- `anon public` key -> andra in `VITE_SUPABASE_ANON_KEY`
- `service_role` key -> andra in `SUPABASE_SERVICE_ROLE_KEY`

La `service_role` e segreta: non metterla mai nel browser, solo nelle variabili Netlify.

## 3. Configura Auth Supabase

In Supabase apri:

`Authentication` -> `URL Configuration`

Inserisci:

- Site URL: il tuo URL Netlify finale
- Redirect URLs: il tuo URL Netlify finale

Se non hai ancora l'URL finale, puoi farlo dopo il primo deploy Netlify.

Per Google/Apple:

`Authentication` -> `Providers`

Attiva Google o Apple solo quando hai creato le credenziali nei rispettivi portali.

## 4. Crea Stripe

1. Vai su https://stripe.com e crea un account.
2. Inizia in `Test mode`.
3. Vai in `Product catalog`.
4. Crea questi 4 prezzi ricorrenti, uguali ai prezzi mostrati nella web app:
   - Premium artista mensile: `EUR 2,00` ogni `mese`
   - Premium artista annuale: `EUR 19,00` ogni `anno`
   - Premium cliente mensile: `EUR 3,00` ogni `mese`
   - Premium cliente annuale: `EUR 29,00` ogni `anno`
5. Copia i Price ID, iniziano con `price_`.

Mappatura variabili Netlify:

```text
STRIPE_PRICE_ARTIST_MONTHLY=Price ID del prezzo Premium artista mensile, EUR 2,00 / mese
STRIPE_PRICE_ARTIST_YEARLY=Price ID del prezzo Premium artista annuale, EUR 19,00 / anno
STRIPE_PRICE_CLIENT_MONTHLY=Price ID del prezzo Premium cliente mensile, EUR 3,00 / mese
STRIPE_PRICE_CLIENT_YEARLY=Price ID del prezzo Premium cliente annuale, EUR 29,00 / anno
```

Metodo automatico opzionale: dopo aver inserito `STRIPE_SECRET_KEY` in un file locale `.env`, puoi eseguire:

```bash
npm run stripe:prices
```

Il comando crea o riusa i 4 prezzi corretti e stampa i Price ID da mettere su Netlify.

## 5. Configura Stripe Webhook

Dopo aver pubblicato il progetto completo su Netlify, crea il webhook in Stripe:

`Developers` -> `Webhooks` -> `Add endpoint`

Endpoint:

```text
https://TUO-SITO.netlify.app/.netlify/functions/stripe-webhook
```

Eventi da selezionare:

- `checkout.session.completed`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copia il signing secret, inizia con `whsec_`.

## 6. Configura Netlify

Per Stripe devi pubblicare il progetto completo, non solo `NETLIFY_DRAG_DROP`.

Impostazioni:

```text
Build command: npm run build
Publish directory: dist
Functions directory: netlify/functions
```

Poi vai in:

`Site configuration` -> `Environment variables`

Inserisci tutte le variabili elencate in `NETLIFY_VARIABILI_DA_COMPILARE.txt`.

## 7. Test finale

1. Apri il sito Netlify.
2. Crea un account cliente.
3. Crea un account artista.
4. In Supabase rendi admin il tuo account:

```sql
update public.profiles
set is_admin = true, verified = true, publication_status = 'approved'
where email = 'LA-TUA-EMAIL';
```

5. Approva profili e annunci dal database/admin.
6. Prova un checkout Stripe in test mode.
7. Controlla in Stripe che il webhook venga ricevuto.

## Nota importante

Il drag-and-drop Netlify pubblica il sito statico. Per Stripe Checkout e webhook devi usare il deploy completo del progetto con Netlify Functions.
