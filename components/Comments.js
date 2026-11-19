"use client";
import { useEffect, useState } from "react";

const fmt = (iso) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" });

export default function Comments() {
  const [comments, setComments] = useState([]);
  const [posted, setPosted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const load = () =>
    fetch("/api/comments", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setComments(d.comments);
        setPosted(d.posted);
      })
      .catch(() => setError("Comments couldn't be loaded right now."))
      .finally(() => setLoading(false));

  useEffect(() => { load(); }, []);

  async function submit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), text: form.get("text"), website: form.get("website") }),
      });
      const d = await res.json();
      if (!res.ok) {
        setError(d.error || "Something went wrong.");
        if (res.status === 409) setPosted(true);
      } else {
        await load();
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <h2 id="leave">Leave a comment</h2>
      {posted ? (
        <p className="notice">Thanks for leaving a comment! Each visitor can post once.</p>
      ) : (
        <form className="form" onSubmit={submit}>
          <label htmlFor="c-name">Name <span className="muted">(optional)</span></label>
          <input id="c-name" name="name" maxLength={40} autoComplete="nickname" />
          <label htmlFor="c-text">Comment</label>
          <textarea id="c-text" name="text" maxLength={500} required />
          {/* hidden from people; bots that fill it in get ignored */}
          <input name="website" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
          <div className="form-row">
            <button className="button" type="submit" disabled={sending}>{sending ? "Posting…" : "Post comment"}</button>
            <span className="muted">One comment per visitor. Be nice.</span>
          </div>
        </form>
      )}
      {error && <p className="error">{error}</p>}

      <h2 id="comments">Comments ({comments.length})</h2>
      {loading ? (
        <p className="muted">Loading…</p>
      ) : comments.length === 0 ? (
        <p className="muted">No comments yet. Be the first.</p>
      ) : (
        <ul className="talk">
          {comments.map((c, i) => (
            <li key={i}>
              <p>{c.text}</p>
              <div className="talk-sig">— <b>{c.name}</b>, {fmt(c.at)}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
