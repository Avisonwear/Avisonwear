import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const body = await req.text();

    const sig = req.headers.get("stripe-signature");

    if (!sig) {
      return NextResponse.json(
        { error: "No signature" },
        { status: 400 }
      );
    }

    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

   if (event.type === "checkout.session.completed") {
  const session = event.data.object as Stripe.Checkout.Session;
const { data: order } = await supabase
  .from("orders_new")
  .select("*")
  .eq("stripe_session_id", session.id)
  .single();
if (order?.referral_email) {
    const items = JSON.parse(order.items);

const referralPoints = items.reduce(
  (sum: number, item: any) =>
    sum + item.quantity,
  0
);

  const { data: existingReferral } = await supabase
    .from("referrals")
    .select("*")
    .eq("email", order.referral_email)
    .single();

  if (existingReferral) {

  const newCount =
    existingReferral.successful_orders +
    referralPoints;

  let reward = "none";

  if (newCount >= 10) {
    reward = "free_tracksuit";
  } else if (newCount >= 5) {
    reward = "free_hoodie";
  }

  await supabase
    .from("referrals")
    .update({
      successful_orders: newCount,
      reward_earned: reward,
    })
    .eq("email", order.referral_email);

}else {

   await supabase
  .from("referrals")
  .insert([
    {
      email: order.referral_email,
      successful_orders: referralPoints,
      reward_earned: "none",
    },
  ]);

  }
}
console.log("ORDER:", order);
  console.log("SESSION ID:", session.id);

const { data, error } = await supabase
  .from("orders_new")
  .update({
    status: "paid",
  })
  .eq("stripe_session_id", session.id)
  .select();

console.log("UPDATE DATA:", data);
console.log("UPDATE ERROR:", error);
}

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { error: "Webhook failed" },
      { status: 400 }
    );
  }
}