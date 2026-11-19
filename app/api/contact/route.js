import { EMAIL } from "../../../lib/site";
import { claimContactSlot, clientIp, hashIp, releaseContactSlot } from "../../../lib/store";

export const dynamic = "force-dynamic";

// E-mail is sent with Resend (resend.com). Set RESEND_API_KEY in Vercel.
// Without a key (e.g. on your computer) the message is printed in the terminal instead.
const RESEND_KEY = process.env.RESEND_API_KEY;
const TO = process.env.CONTACT_TO || EMAIL;
// onboarding@resend.dev works without owning a domain, but can only send to your own
// Resend account e-mail. Once samy.lol is verified in Resend, use e.g. "samy.lol <contact@samy.lol>".
const FROM = process.env.CONTACT_FROM || "samy.lol <onboarding@resend.dev>";

const LIMIT_SECONDS = 24 * 60 * 60; // one message per visitor per day
const clean = (v, max) => String(v ?? "").trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  // Hidden "website" field: real people never fill it in, simple spam bots do.
  if (body.website) return Response.json({ ok: true });

  const name = clean(body.name, 60).replace(/\s+/g, " ");
  const email = clean(body.email, 120);
  const message = clean(body.message, 3000);

  if (!isEmail(email)) return Response.json({ error: "Please enter a valid e-mail so I can write back." }, { status: 400 });
  if (message.length < 5) return Response.json({ error: "Please write a message." }, { status: 400 });

  const ipHash = hashIp(clientIp(request));
  try {
    if (!(await claimContactSlot(ipHash, LIMIT_SECONDS))) {
      return Response.json({ error: "You've already sent me a message today. I'll get back to you soon!" }, { status: 429 });
    }
  } catch (err) {
    // The daily limit couldn't be checked. Still send the message rather than lose it.
    console.error("[contact form] rate-limit storage error, sending anyway:", err);
  }

  const subject = `samy.lol message from ${name || email}`;
  const text = `Name: ${name || "(not given)"}\nE-mail: ${email}\n\n${message}\n\n--\nSent from the contact form on samy.lol. Hit Reply to answer.`;

  if (!RESEND_KEY) {
    console.log(`\n[contact form] no RESEND_API_KEY set, so not e-mailing. Message:\n${text}\n`);
    return Response.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: FROM, to: [TO], reply_to: email, subject, text }),
    });
    if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
    return Response.json({ ok: true });
  } catch (err) {
    console.error(err);
    await releaseContactSlot(ipHash).catch(() => {}); // let them try again
    return Response.json({ error: "Your message couldn't be sent. Please try again later." }, { status: 502 });
  }
}
