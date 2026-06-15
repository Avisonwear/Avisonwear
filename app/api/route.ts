import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  try {
    const { cart } = await req.json();

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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items,

      mode: "payment",

      success_url: `${req.headers.get("origin")}/success`,

      cancel_url: `${req.headers.get("origin")}/checkout`,
    });

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