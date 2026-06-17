import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
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
if (order) {
  let items = [];

  try {
    items = JSON.parse(order.items);
  } catch {
    items = [];
  }

  const itemsHtml = items
    .map(
      (item: any) => `
        <li>
          ${item.name}
          ${item.size ? ` - Size: ${item.size}` : ""}
          - Qty: ${item.quantity}
        </li>
      `
    )
    .join("");

await resend.emails.send({
  from: "Avisonwear <support@avisonwear.ch>",
  to: order.customer_email,
  subject: "Order Confirmation - Avisonwear",
  html: `
    <h2>Thank you for your order!</h2>

    <p>Hello ${order.first_name || "Customer"},</p>

    <p>Your order has been received successfully.</p>

    <ul>
      ${itemsHtml}
    </ul>

    <p><strong>Total:</strong> CHF ${order.amount}</p>

    <p>We will start preparing your order shortly.</p>

    <p>Thank you for supporting Avisonwear ❤️</p>
  `,
});

await resend.emails.send({
  from: "Avisonwear <support@avisonwear.ch>",
  to: "support@avisonwear.ch",
  subject: `New Order #${order.id}`,
  html: `
    <h2>New Order Received</h2>

    <p><strong>Name:</strong> ${order.first_name || "-"}</p>

    <p><strong>Email:</strong> ${order.customer_email}</p>

    <p><strong>Phone:</strong> ${order.phone || "-"}</p>

    <p><strong>Address:</strong></p>

    <p>
      ${order.street || "-"}<br>
      ${order.zip || "-"} ${order.city || "-"}<br>
      ${order.country || "-"}
    </p>

    <p><strong>Referral:</strong> ${order.referral_email || "-"}</p>

    <p><strong>Total:</strong> CHF ${order.amount}</p>

    <h3>Products</h3>

    <ul>
      ${itemsHtml}
    </ul>
  `,
});
}
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