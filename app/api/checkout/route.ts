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
    const {
  cart,
  email,
  referralEmail,
  firstName,
  lastName,
  phone,
  street,
  zip,
  city,
  country,
  notes,
} = await req.json();

    const line_items = cart.map((item: any) => ({
      price_data: {
        currency: "chf",
        product_data: {
          name: item.name,
          images: [`${req.headers.get("origin")}${item.image}`],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const totalAmount = cart.reduce(
      (sum: number, item: any) =>
        sum + item.price * item.quantity,
      0
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/success`,
      cancel_url: `${req.headers.get("origin")}/checkout`,
    });

    await supabase.from("orders_new").insert([
      {
        customer_email: email,
        referral_email: referralEmail,
        amount: totalAmount,
        status: "pending",
        stripe_session_id: session.id,
        first_name: firstName,
        last_name: lastName,
        phone,
        street,
        zip,
        city,
        country,
        notes,
        items: JSON.stringify(cart),
      },
    ]);

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Stripe session failed" },
      { status: 500 }
    );
  }
}