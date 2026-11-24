import { SITE, hmac, safeEqual, leadToken, mailer, esc } from "./_lib.js";

// Cal.com webhook (BOOKING_CREATED) -> qualification email from Gmail to the guest
export async function POST(request) {
  const raw = await request.text();
  const secret = process.env.CAL_WEBHOOK_SECRET;
  if (!secret || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return new Response("Not configured", { status: 500 });
  }

  const signature = request.headers.get("x-cal-signature-256") || "";
  if (!safeEqual(signature, hmac(secret, raw))) {
    return new Response("Invalid signature", { status: 401 });
  }

  let body;
  try { body = JSON.parse(raw); } catch { return new Response("Bad JSON", { status: 400 }); }
  if (body.triggerEvent !== "BOOKING_CREATED") return new Response("Ignored", { status: 200 });

  const p = body.payload || {};
  const owner = process.env.GMAIL_USER.toLowerCase();
  const guest = (p.attendees || []).find((a) => a.email && a.email.toLowerCase() !== owner);
  if (!guest) return new Response("No guest", { status: 200 });

  const first = (guest.name || "").trim().split(/\s+/)[0] || "there";
  const tz = guest.timeZone || "UTC";
  let when = "";
  try {
    when = new Date(p.startTime).toLocaleString("en-GB", {
      weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: tz,
    }) + ` (${tz})`;
  } catch { /* keep empty */ }

  const link = `${SITE}/qualify.html?e=${encodeURIComponent(guest.email)}&n=${encodeURIComponent(guest.name || "")}&t=${leadToken(guest.email)}`;

  const text = `Hi ${first},

Thanks for booking a call${when ? ` on ${when}` : ""}. So I can make the 15 minutes useful, could you answer 3 quick questions (1 minute)?

- How many active users do you have?
- How many customers have you validated product-market fit with?
- What is your estimated monthly marketing budget?

Answer here: ${link}

Or just reply to this email.

Wael`;

  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.55;color:#111;max-width:520px">
<p>Hi ${esc(first)},</p>
<p>Thanks for booking a call${when ? ` on <b>${esc(when)}</b>` : ""}. So I can make the 15 minutes useful, could you answer 3 quick questions (1 minute)?</p>
<ul><li>How many active users do you have?</li><li>How many customers have you validated product-market fit with?</li><li>What is your estimated monthly marketing budget?</li></ul>
<p><a href="${esc(link)}" style="background:#111;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;display:inline-block">Answer the 3 questions</a></p>
<p>Or just reply to this email.</p>
<p>Wael</p></div>`;

  await mailer().sendMail({
    from: `Wael Aouididi <${process.env.GMAIL_USER}>`,
    to: guest.email,
    subject: "3 quick questions before our call",
    text,
    html,
  });
  return new Response("Sent", { status: 200 });
}
