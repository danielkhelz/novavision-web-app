import { getStripe, getSupabaseAdmin, json } from "./_shared.js";

function rawBody(event) {
  return Buffer.from(event.body || "", event.isBase64Encoded ? "base64" : "utf8");
}

async function upsertSubscription(supabaseAdmin, stripe, subscriptionId) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["customer", "items.data.price"]
  });

  const userId = subscription.metadata?.user_id;
  if (!userId) return;

  const item = subscription.items.data[0];
  await supabaseAdmin.from("subscriptions").upsert(
    {
      user_id: userId,
      stripe_customer_id: typeof subscription.customer === "string" ? subscription.customer : subscription.customer.id,
      stripe_subscription_id: subscription.id,
      stripe_price_id: item?.price?.id || null,
      plan_key: subscription.metadata?.plan_key || null,
      status: subscription.status,
      current_period_end: subscription.current_period_end
        ? new Date(subscription.current_period_end * 1000).toISOString()
        : null
    },
    { onConflict: "stripe_subscription_id" }
  );
}

export async function handler(event) {
  if (event.httpMethod !== "POST") return json(405, { error: "Method not allowed" });

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) return json(500, { error: "STRIPE_WEBHOOK_SECRET is not configured." });

  try {
    const stripe = getStripe();
    const supabaseAdmin = getSupabaseAdmin();
    const signature = event.headers["stripe-signature"] || event.headers["Stripe-Signature"];
    const stripeEvent = stripe.webhooks.constructEvent(rawBody(event), signature, webhookSecret);

    if (stripeEvent.type === "checkout.session.completed") {
      const session = stripeEvent.data.object;
      if (session.subscription) await upsertSubscription(supabaseAdmin, stripe, session.subscription);
    }

    if (
      stripeEvent.type === "customer.subscription.created" ||
      stripeEvent.type === "customer.subscription.updated" ||
      stripeEvent.type === "customer.subscription.deleted"
    ) {
      await upsertSubscription(supabaseAdmin, stripe, stripeEvent.data.object.id);
    }

    return json(200, { received: true });
  } catch (error) {
    return json(400, { error: error.message });
  }
}
