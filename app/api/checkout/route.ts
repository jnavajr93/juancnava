import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { priceId } = await req.json();

  if (!priceId) {
    return NextResponse.json({ error: "Missing priceId" }, { status: 400 });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (!stripeKey) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  // Dynamic import so the server doesn't crash if stripe isn't installed yet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let stripe: any;
  try {
    const Stripe = (await import("stripe")).default;
    stripe = new Stripe(stripeKey, { apiVersion: "2026-03-25.dahlia" });
  } catch {
    return NextResponse.json({ error: "Stripe package not installed. Run: npm install stripe" }, { status: 500 });
  }

  const origin = req.headers.get("origin") ?? "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${origin}/prints/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/prints`,
    shipping_address_collection: { allowed_countries: ["US", "CA", "MX"] },
    custom_text: {
      submit: { message: "Archival pigment print. Signed and numbered. Ships within 2 weeks." },
    },
  });

  return NextResponse.json({ url: session.url });
}
