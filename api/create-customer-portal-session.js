import { getAppUrl, getStripe, getSupabaseAdmin, getUserFromRequest, sendJson } from "./_shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const user = await getUserFromRequest(req, supabaseAdmin);
    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .maybeSingle();
    if (error) throw error;
    if (!profile?.stripe_customer_id) throw new Error("Nessun cliente Stripe collegato a questo account.");

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${getAppUrl()}/#dashboard`
    });

    return sendJson(res, 200, { url: session.url });
  } catch (error) {
    return sendJson(res, 400, { error: error.message });
  }
}