import { safeEqual, leadToken, mailer, esc } from "./_lib.js";

const BUDGETS = ["$100 – $1,000", "$1,000 – $2,000", "$2,000 – $3,000", "$3,000 – $5,000"];

// Receives the answers from /qualify.html and emails them to the owner's Gmail
export async function POST(request) {
  if (!process.env.CAL_WEBHOOK_SECRET || !process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    return new Response("Not configured", { status: 500 });
  }
  let b;
  try { b = await request.json(); } catch { return new Response("Bad JSON", { status: 400 }); }

  const email = String(b.email || "");
  if (!email || !safeEqual(String(b.token || ""), leadToken(email))) {
    return new Response("Invalid link", { status: 401 });
  }
  const users = Math.max(0, Math.min(1e9, Number(b.activeUsers) || 0));
  const clients = Math.max(0, Math.min(1e9, Number(b.pmfClients) || 0));
  const budget = BUDGETS[Number(b.budget)];
  if (!budget) return new Response("Bad budget", { status: 400 });
  const name = String(b.name || "").slice(0, 120);

  await mailer().sendMail({
    from: `Lead qualifier <${process.env.GMAIL_USER}>`,
    to: process.env.GMAIL_USER,
    replyTo: email,
    subject: `Lead answers: ${name || email} | ${budget}/mo`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px">
<p><b>${esc(name)}</b> (${esc(email)}) answered:</p>
<ul><li>Active users: <b>${users}</b></li><li>Customers with PMF validated: <b>${clients}</b></li><li>Monthly marketing budget: <b>${esc(budget)}</b></li></ul></div>`,
  });
  return new Response("OK", { status: 200 });
}
