import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { sessionType, date, time, firstName, lastName, email, phone, message } =
    await req.json();

  if (!sessionType || !date || !time || !firstName || !lastName || !email) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
  }

  const resend = new Resend(resendKey);
  const fullName = `${firstName} ${lastName}`;

  // ── Notification email to Juan ───────────────────────────────────
  const notifyHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0e0d;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#f2ead8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:48px 32px;">
    <tr><td>
      <p style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#c17a5a;margin:0 0 24px;">
        New Booking Request
      </p>
      <h1 style="font-size:28px;font-weight:900;margin:0 0 8px;color:#f2ead8;line-height:1.1;">
        ${sessionType}
      </h1>
      <p style="font-size:13px;color:rgba(242,234,216,0.45);margin:0 0 36px;">
        ${date} &nbsp;·&nbsp; ${time} (America/Phoenix)
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid rgba(242,234,216,0.08);padding-top:28px;margin-bottom:28px;">
        <tr>
          <td style="padding:8px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);width:140px;">Name</td>
          <td style="padding:8px 0;font-size:14px;color:#f2ead8;">${fullName}</td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);">Email</td>
          <td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#c17a5a;text-decoration:none;">${email}</a></td>
        </tr>
        ${phone ? `<tr>
          <td style="padding:8px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);">Phone</td>
          <td style="padding:8px 0;font-size:14px;color:#f2ead8;">${phone}</td>
        </tr>` : ""}
        ${message ? `<tr>
          <td style="padding:8px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);vertical-align:top;">Message</td>
          <td style="padding:8px 0;font-size:14px;color:rgba(242,234,216,0.65);line-height:1.7;">${message.replace(/\n/g, "<br>")}</td>
        </tr>` : ""}
      </table>

      <a href="mailto:${email}?subject=Re: ${encodeURIComponent(sessionType)} session — ${date}"
         style="display:inline-block;padding:12px 28px;background:#c17a5a;color:#0f0e0d;font-size:11px;letter-spacing:0.18em;text-transform:uppercase;text-decoration:none;margin-top:8px;">
        Reply to ${firstName} →
      </a>

      <p style="font-size:11px;color:rgba(242,234,216,0.2);margin-top:40px;border-top:1px solid rgba(242,234,216,0.06);padding-top:20px;">
        juancnava.com · Booking system
      </p>
    </td></tr>
  </table>
</body>
</html>`;

  // ── Confirmation email to client ─────────────────────────────────
  const confirmHtml = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0f0e0d;font-family:'DM Sans',Helvetica,Arial,sans-serif;color:#f2ead8;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;padding:48px 32px;">
    <tr><td>
      <p style="font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#c17a5a;margin:0 0 24px;">
        Juan C. Nava Photography
      </p>
      <h1 style="font-size:28px;font-weight:900;margin:0 0 8px;color:#f2ead8;line-height:1.1;">
        Got your request, ${firstName}.
      </h1>
      <p style="font-size:15px;color:rgba(242,234,216,0.55);margin:0 0 36px;line-height:1.7;">
        I&rsquo;ll review your request and follow up within 48 hours to confirm availability and next steps.
      </p>

      <table width="100%" cellpadding="0" cellspacing="0" style="background:#151412;padding:24px 28px;margin-bottom:32px;">
        <tr>
          <td style="padding:6px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);width:120px;">Session</td>
          <td style="padding:6px 0;font-size:13px;color:#f2ead8;">${sessionType}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);">Date</td>
          <td style="padding:6px 0;font-size:13px;color:#f2ead8;">${date}</td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(242,234,216,0.3);">Time</td>
          <td style="padding:6px 0;font-size:13px;color:#f2ead8;">${time} (America/Phoenix)</td>
        </tr>
      </table>

      <p style="font-size:13px;color:rgba(242,234,216,0.4);line-height:1.8;margin:0 0 8px;">
        Questions before then? Reply to this email or reach me at
        <a href="mailto:contact@juancnava.com" style="color:#c17a5a;text-decoration:none;">contact@juancnava.com</a>.
      </p>

      <p style="font-size:11px;color:rgba(242,234,216,0.2);margin-top:40px;border-top:1px solid rgba(242,234,216,0.06);padding-top:20px;">
        <a href="https://juancnava.com" style="color:rgba(242,234,216,0.2);text-decoration:none;">juancnava.com</a>
        &nbsp;·&nbsp; Phoenix, AZ
      </p>
    </td></tr>
  </table>
</body>
</html>`;

  try {
    await Promise.all([
      resend.emails.send({
        from: "Juan C. Nava <bookings@juancnava.com>",
        to: "contact@juancnava.com",
        replyTo: email,
        subject: `${sessionType} request — ${date} at ${time}`,
        html: notifyHtml,
      }),
      resend.emails.send({
        from: "Juan C. Nava <bookings@juancnava.com>",
        to: email,
        replyTo: "contact@juancnava.com",
        subject: `Your session request — ${sessionType}`,
        html: confirmHtml,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[/api/book]", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
