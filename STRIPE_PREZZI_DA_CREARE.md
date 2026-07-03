# Prezzi Stripe NovaVision

Questi prezzi devono essere creati in Stripe con gli stessi importi mostrati nella web app NovaVision.

| Variabile Netlify | Nome prezzo Stripe | Importo | Ricorrenza |
| --- | --- | ---: | --- |
| `STRIPE_PRICE_ARTIST_MONTHLY` | Premium artista mensile | EUR 2,00 | Ogni mese |
| `STRIPE_PRICE_ARTIST_YEARLY` | Premium artista annuale | EUR 19,00 | Ogni anno |
| `STRIPE_PRICE_CLIENT_MONTHLY` | Premium cliente mensile | EUR 3,00 | Ogni mese |
| `STRIPE_PRICE_CLIENT_YEARLY` | Premium cliente annuale | EUR 29,00 | Ogni anno |

## Come usarli

1. Vai in Stripe in `Product catalog`.
2. Crea i 4 prezzi ricorrenti elencati sopra.
3. Apri ogni prezzo e copia il suo `Price ID`, che inizia con `price_`.
4. Incolla ogni Price ID nella variabile Netlify corrispondente.

Il piano Free resta gratuito e non richiede un prezzo Stripe.

## Metodo automatico opzionale

Se vuoi far creare i prezzi al progetto, inserisci `STRIPE_SECRET_KEY` in un file locale `.env` oppure nella sessione del terminale, poi esegui:

```bash
npm run stripe:prices
```

Lo script crea o riusa i 4 prezzi corretti e stampa le variabili da copiare in Netlify.
