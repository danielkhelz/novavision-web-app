import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export function sendJson(res, statusCode, body) {
  res.status(statusCode).json(body);
}

export function getAppUrl() {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.VITE_APP_URL) return process.env.VITE_APP_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("STRIPE_SECRET_KEY is not configured.");
  return new Stripe(key, { apiVersion: "2024-06-20" });
}

export function getSupabaseAdmin() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRole) throw new Error("Supabase server environment variables are not configured.");
  return createClient(url, serviceRole, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export async function getUserFromRequest(req, supabaseAdmin) {
  const header = req.headers.authorization || req.headers.Authorization || "";
  const token = header.replace(/^Bearer\s+/i, "");
  if (!token) throw new Error("Missing Authorization bearer token.");
  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data.user) throw new Error("Invalid or expired session.");
  return data.user;
}

export function getPriceId(planKey) {
  const mapping = {
    artist_monthly: process.env.STRIPE_PRICE_ARTIST_MONTHLY,
    artist_yearly: process.env.STRIPE_PRICE_ARTIST_YEARLY,
    client_monthly: process.env.STRIPE_PRICE_CLIENT_MONTHLY,
    client_yearly: process.env.STRIPE_PRICE_CLIENT_YEARLY
  };
  const priceId = mapping[planKey];
  if (!priceId) throw new Error(`No Stripe Price ID configured for ${planKey}.`);
  return priceId;
}

export async function getOrCreateCustomer({ stripe, supabaseAdmin, user, profile }) {
  if (profile?.stripe_customer_id) return profile.stripe_customer_id;

  const customer = await stripe.customers.create({
    email: user.email,
    name: profile?.display_name || user.user_metadata?.display_name || user.email,
    metadata: { user_id: user.id }
  });

  await supabaseAdmin
    .from("profiles")
    .update({ stripe_customer_id: customer.id })
    .eq("id", user.id);

  return customer.id;
}

export async function readRawBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}