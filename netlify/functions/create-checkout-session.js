import {
  getAppUrl,
  getOrCreateCustomer,
  getPriceId,
  getStripe,
  getSupabaseAdmin,
  getUserFromEvent,
  json
} from "./_shared.js";

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const user = await getUserFromEvent(event, supabaseAdmin);
    const { planKey } = JSON.parse(event.body || "{}");
    const price = getPriceId(planKey);

    const { data: profile, error } = await supabaseAdmin.from("profiles").select("*").eq("id", user.id).maybeSingle();
    if (error) throw error;

    const customer = await getOrCreateCustomer({ stripe, supabaseAdmin, user, profile });
    const appUrl = getAppUrl();

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer,
      line_items: [{ price, quantity: 1 }],
      success_url: `${appUrl}/#dashboard?checkout=success`,
      cancel_url: `${appUrl}/#dashboard?checkout=cancelled`,
      allow_promotion_codes: true,
      subscription_data: {
        metadata: {
          user_id: user.id,
          plan_key: planKey
        }
      },
      metadata: {
        user_id: user.id,
        plan_key: planKey
      }
    });

    return json(200, { url: session.url });
  } catch (error) {
    return json(400, { error: error.message });
  }
}
