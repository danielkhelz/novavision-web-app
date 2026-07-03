# Netlify completo senza GitHub

Questa e la procedura corretta per testare NovaVision gratuitamente su Netlify senza usare GitHub.

## Perche non basta trascinare la cartella

Il drag-and-drop di Netlify pubblica i file statici della web app. Va bene per vedere il design e navigare nel frontend.

Per Stripe completo servono invece le funzioni serverless in `netlify/functions`:

- `create-checkout-session`
- `stripe-webhook`
- `create-customer-portal-session`

Queste funzioni vengono pubblicate con Netlify CLI o con un deploy collegato a Git, non con il semplice trascinamento statico.

## 1. Apri il terminale nella cartella

Cartella progetto:

```text
D:\DISCO D\PRGETTO NOVAVISION WEB APP\NOVAVISION WEB APP
```

## 2. Installa dipendenze

```bash
npm install
```

## 3. Accedi a Netlify

```bash
npx netlify-cli login
```

Si aprira il browser per autorizzare Netlify.

## 4. Primo deploy e collegamento sito

```bash
npm run deploy:netlify
```

La prima volta Netlify CLI ti chiedera di creare un nuovo sito oppure collegarne uno esistente.

## 5. Configura variabili ambiente

In Netlify apri:

```text
Site configuration -> Environment variables
```

Inserisci tutte le variabili presenti in:

```text
NETLIFY_VARIABILI_DA_COMPILARE.txt
```

## 6. Pubblica di nuovo la web app completa

```bash
npm run deploy:netlify
```

Questo comando esegue:

- build Vite
- pubblicazione cartella `dist`
- pubblicazione funzioni `netlify/functions`

## 7. Configura Stripe webhook

Dopo il deploy, crea in Stripe questo endpoint:

```text
https://TUO-SITO.netlify.app/.netlify/functions/stripe-webhook
```

Eventi:

```text
checkout.session.completed
customer.subscription.updated
customer.subscription.deleted
```

Copia il signing secret `whsec_...` in Netlify nella variabile:

```text
STRIPE_WEBHOOK_SECRET
```

Poi rilancia:

```bash
npm run deploy:netlify
```

## 8. Test

1. Apri il sito Netlify.
2. Crea un account.
3. Verifica che il profilo appaia in Supabase.
4. Prova Stripe in test mode.
5. Controlla in Stripe che il webhook venga ricevuto.

## Cartella drag-and-drop

`NETLIFY_DRAG_DROP` resta disponibile per test statico veloce, ma non e la versione completa con Stripe.
