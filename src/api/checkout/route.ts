import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16" as Stripe.LatestApiVersion,
});

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json(); // Get the amount from the request

    // Create a checkout session with EUR as the currency
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur", // Set to EUR
            product_data: {
              name: "Shopping Cart Purchase",
            },
            unit_amount: amount * 100, // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/cancel`,
    });

    // Return session ID to the client
    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Error creating session:", error.message || error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
