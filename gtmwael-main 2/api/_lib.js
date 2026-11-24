import { createHmac, timingSafeEqual } from "node:crypto";
import nodemailer from "nodemailer";

export const SITE = process.env.SITE_URL || "https://www.yoursaasgrowth.com";

export const hmac = (key, data) => createHmac("sha256", key).update(data).digest("hex");

export const safeEqual = (a, b) => {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
};

// Token that proves a /qualify link was issued by us for this email
export const leadToken = (email) =>
  hmac(process.env.CAL_WEBHOOK_SECRET, `qualify:${email.toLowerCase()}`);

export const mailer = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

export const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
