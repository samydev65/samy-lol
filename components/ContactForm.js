"use client";
import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");

  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const d = await res.json().catch(() => ({}));
      if (res.ok) return setStatus("sent");
      setError(d.error || "Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setStatus("idle");
  }

  if (status === "sent") {
    return <p className="notice">Thanks! Your message is on its way. I&apos;ll reply to the e-mail you gave me.</p>;
  }

  return (
    <form className="form" onSubmit={submit}>
      <label htmlFor="c-name">Name <span className="muted">(optional)</span></label>
      <input id="c-name" name="name" maxLength={60} autoComplete="name" />

      <label htmlFor="c-email">Your e-mail</label>
      <input id="c-email" name="email" type="email" maxLength={120} autoComplete="email" required />

      <label htmlFor="c-msg">Message</label>
      <textarea id="c-msg" name="message" maxLength={3000} required />

      {/* hidden from people; bots that fill it in get ignored */}
      <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />

      <div className="form-row">
        <button className="button" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <span className="muted">I&apos;ll reply to the e-mail you enter.</span>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
