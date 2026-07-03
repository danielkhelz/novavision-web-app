# Pubblica NovaVision — GitHub + Vercel

Segui nell'ordine. Tempo stimato: 15 minuti.

## Parte A — GitHub (5 min)

### A1. Crea repository

1. Apri: https://github.com/new?name=novavision-web-app&description=NovaVision+web+app+test
2. Nome: `novavision-web-app`
3. Visibilita: Public o Private
4. **Non** spuntare README, .gitignore o licenza
5. Clicca **Create repository**

### A2. Push codice

Sostituisci `TUO-USERNAME` con il tuo username GitHub:

```powershell
cd "D:\DISCO D\PRGETTO NOVAVISION WEB APP\NOVAVISION WEB APP"
git remote add origin https://github.com/TUO-USERNAME/novavision-web-app.git
git push -u origin main
```

Se compare finestra login GitHub → autorizza.

**Oppure script automatico:**

```powershell
powershell -ExecutionPolicy Bypass -File scripts/publish-github-vercel.ps1
```

---

## Parte B — Vercel (5 min)

### B1. Collega GitHub

1. https://vercel.com → accedi con **GitHub**
2. **Add New** → **Project**
3. Seleziona `novavision-web-app`
4. Framework: **Other** (gia configurato in `vercel.json`)
5. **Non** modificare Build command (`npm run build`) ne Output (`dist`)
6. **Deploy** (primo deploy senza variabili — va bene, poi le aggiungi)

### B2. Variabili ambiente

`Project Settings` → `Environment Variables` → aggiungi **tutte**:

| Variabile | Valore |
|-----------|--------|
| `VITE_SUPABASE_URL` | da Supabase → Settings → API |
| `VITE_SUPABASE_ANON_KEY` | anon public key |
| `VITE_APP_URL` | URL Vercel, es. `https://novavision-web-app.vercel.app` |
| `APP_URL` | stesso URL Vercel |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role (segreta) |
| `STRIPE_SECRET_KEY` | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (dopo B4) |
| `STRIPE_PRICE_ARTIST_MONTHLY` | `price_...` |
| `STRIPE_PRICE_ARTIST_YEARLY` | `price_...` |
| `STRIPE_PRICE_CLIENT_MONTHLY` | `price_...` |
| `STRIPE_PRICE_CLIENT_YEARLY` | `price_...` |

Applica a **Production**, **Preview**, **Development**.

Poi: **Deployments** → ultimo deploy → **Redeploy**.

### B3. Supabase URL

Supabase → **Authentication** → **URL Configuration**:

- **Site URL**: `https://TUO-SITO.vercel.app`
- **Redirect URLs**: `https://TUO-SITO.vercel.app`

Salva.

### B4. Stripe webhook

Stripe → **Developers** → **Webhooks** → **Add endpoint**:

```text
https://TUO-SITO.vercel.app/api/stripe-webhook
```

Eventi:

- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

Copia signing secret → incolla in Vercel come `STRIPE_WEBHOOK_SECRET` → **Redeploy**.

---

## Parte C — Test (5 min)

1. Apri URL Vercel
2. Registrati (artista o cliente)
3. Dashboard → piano Premium
4. Carta test: `4242 4242 4242 4242` — scadenza futura qualsiasi — CVC qualsiasi
5. Verifica abbonamento attivo in dashboard

---

## Deploy da CLI (alternativa)

```powershell
cd "D:\DISCO D\PRGETTO NOVAVISION WEB APP\NOVAVISION WEB APP"
npx vercel login
npx vercel --prod
```

Poi aggiungi variabili nel dashboard come sopra.

---

## Problemi comuni

| Problema | Soluzione |
|----------|-----------|
| Push rifiutato | Repo gia con README → cancella file su GitHub o usa `git pull --rebase` |
| Login GitHub | Usa Git Credential Manager o token PAT |
| Checkout non parte | Manca `STRIPE_SECRET_KEY` o Price ID su Vercel |
| Webhook fallisce | URL webhook = dominio Vercel esatto + redeploy dopo `STRIPE_WEBHOOK_SECRET` |
| Auth Supabase errore | Site URL e Redirect non aggiornati con URL Vercel |