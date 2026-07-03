import { getAppUrl, getStripe, getSupabaseAdmin, getUserFromEvent, json } from "./_shared.js";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const user = await getUserFromEvent(event, supabaseAdmin);
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

    return json(200, { url: session.url });
  } catch (error) {
    return json(400, { error: error.message });
  }
}
