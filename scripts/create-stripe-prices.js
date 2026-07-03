import fs from "node:fs";
import path from "node:path";
import Stripe from "stripe";

const envPath = path.join(process.cwd(), ".env");

if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Missing STRIPE_SECRET_KEY.");
  console.error("Set it in your terminal or in a local .env file, then run: npm run stripe:prices");
  process.exit(1);
}

const stripe = new Stripe(stripeSecretKey, { apiVersion: "2024-06-20" });

const plans = [
  {
    env: "STRIPE_PRICE_ARTIST_MONTHLY",
    productKey: "artist",
    productName: "NovaVision Premium Artista",
    priceName: "Premium artista mensile",
    lookupKey: "novavision_artist_monthly",
    amount: 200,
    interval: "month"
  },
  {
    env: "STRIPE_PRICE_ARTIST_YEARLY",
    productKey: "artist",
    productName: "NovaVision Premium Artista",
    priceName: "Premium artista annuale",
    lookupKey: "novavision_artist_yearly",
    amount: 1900,
    interval: "year"
  },
  {
    env: "STRIPE_PRICE_CLIENT_MONTHLY",
    productKey: "client",
    productName: "NovaVision Premium Cliente",
    priceName: "Premium cliente mensile",
    lookupKey: "novavision_client_monthly",
    amount: 300,
    interval: "month"
  },
  {
    env: "STRIPE_PRICE_CLIENT_YEARLY",
    productKey: "client",
    productName: "NovaVision Premium Cliente",
    priceName: "Premium cliente annuale",
    lookupKey: "novavision_client_yearly",
    amount: 2900,
    interval: "year"
  }
];

async function findOrCreateProduct(plan) {
  const products = await stripe.products.list({ active: true, limit: 100 });
  const existing = products.data.find((product) => product.metadata?.novavision_product === plan.productKey);
  if (existing) return existing;

  return stripe.products.create({
    name: plan.productName,
    metadata: {
      app: "novavision",
      novavision_product: plan.productKey
    }
  });
}

async function findMatchingPrice(plan) {
  const prices = await stripe.prices.list({
    active: true,
    lookup_keys: [plan.lookupKey],
    limit: 1
  });

  const price = prices.data[0];
  if (!price) return null;

  const matches =
    price.currency === "eur" &&
    price.unit_amount === plan.amount &&
    price.recurring?.interval === plan.interval;

  if (!matches) {
    throw new Error(
      `Lookup key ${plan.lookupKey} exists but does not match ${plan.priceName}. Archive it in Stripe or create a fresh lookup key.`
    );
  }

  return price;
}

async function findOrCreatePrice(plan) {
  const existing = await findMatchingPrice(plan);
  if (existing) return existing;

  const product = await findOrCreateProduct(plan);
  return stripe.prices.create({
    product: product.id,
    currency: "eur",
    unit_amount: plan.amount,
    recurring: { interval: plan.interval },
    nickname: plan.priceName,
    lookup_key: plan.lookupKey,
    metadata: {
      app: "novavision",
      novavision_plan: plan.lookupKey
    }
  });
}

const results = [];

for (const plan of plans) {
  const price = await findOrCreatePrice(plan);
  results.push({ env: plan.env, priceId: price.id, label: plan.priceName });
}

console.log("\nStripe prices ready. Copy these values into Netlify environment variables:\n");

for (const result of results) {
  console.log(`${result.env}=${result.priceId}`);
}

console.log("\nExpected NovaVision prices:");
console.log("- Premium artista mensile: EUR 2,00 / mese");
console.log("- Premium artista annuale: EUR 19,00 / anno");
console.log("- Premium cliente mensile: EUR 3,00 / mese");
console.log("- Premium cliente annuale: EUR 29,00 / anno");
