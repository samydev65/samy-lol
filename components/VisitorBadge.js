"use client";
import { useEffect, useState } from "react";

// Small fixed box in the bottom-left: number of unique guest visitors (one per IP).
export default function VisitorBadge() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    fetch("/api/visit", { method: "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setCount(d.count))
      .catch(() => {});
  }, []);

  if (count === null) return null;
  return (
    <div className="visitor-badge" aria-live="polite">
      <span className="visitor-label">Guest visitors</span>
      <span className="visitor-count">{count.toLocaleString()}</span>
    </div>
  );
}
