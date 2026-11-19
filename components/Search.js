"use client";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

// Sidebar search over every page, project and blog post.
// index: [{ title, href, kind, text }]
export default function Search({ index }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  const results = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return [];
    return index
      .map((item) => {
        const title = item.title.toLowerCase();
        const hay = `${title} ${item.text}`.toLowerCase();
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 1), 0);
        return { ...item, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [q, index]);

  function go(href) {
    setOpen(false);
    setQ("");
    router.push(href);
  }

  function onKeyDown(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter" && results[active]) { e.preventDefault(); go(results[active].href); }
    else if (e.key === "Escape") setOpen(false);
  }

  return (
    <div className="search" role="search">
      <input
        type="search"
        placeholder="Search samy.lol"
        aria-label="Search samy.lol"
        value={q}
        onChange={(e) => { setQ(e.target.value); setActive(0); setOpen(true); }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={onKeyDown}
      />
      {open && q.trim() && (
        <ul className="search-results">
          {results.length === 0 && <li className="none">No results</li>}
          {results.map((r, i) => (
            <li key={r.href} className={i === active ? "active" : undefined}>
              <a href={r.href} onMouseDown={(e) => { e.preventDefault(); go(r.href); }}>
                {r.title}
                <span className="kind">{r.kind}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
