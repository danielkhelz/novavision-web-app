import {
  getAppUrl,
  getOrCreateCustomer,
  getPriceId,
  getStripe,
  getSupabaseAdmin,
  getUserFromRequest,
  sendJson
} from "./_shared.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const user = await getUserFromRequest(req, supabaseAdmin);
    const { planKey } = req.body || {};
    const price = getPriceId(planKey);

    const { data: profile, error } = await supabaseAdmin
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();
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

    return sendJson(res, 200, { url: session.url });
  } catch (error) {
    return sendJson(res, 400, { error: error.message });
  }
}