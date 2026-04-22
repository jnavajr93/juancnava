import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, context, product } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // ── Connect your email service here ────────────────────────────
  //
  // ConvertKit:
  //   await fetch(`https://api.convertkit.com/v3/forms/${process.env.CONVERTKIT_FORM_ID}/subscribe`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ api_key: process.env.CONVERTKIT_API_KEY, email }),
  //   });
  //
  // Mailchimp:
  //   await fetch(`https://us1.api.mailchimp.com/3.0/lists/${process.env.MAILCHIMP_LIST_ID}/members`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email_address: email, status: "subscribed" }),
  //   });
  //
  // Beehiiv:
  //   await fetch(`https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUB_ID}/subscriptions`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${process.env.BEEHIIV_API_KEY}`,
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ email }),
  //   });
  //
  // ───────────────────────────────────────────────────────────────

  console.log(`[subscribe] ${email} — context: ${context}${product ? ` — product: ${product}` : ""}`);

  return NextResponse.json({ success: true });
}
