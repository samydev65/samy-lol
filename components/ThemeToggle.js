"use client";
import { useEffect, useState } from "react";

// Light/dark switch. The choice is remembered in this browser only.
// (The theme is applied before the page paints by a tiny script in app/layout.js.)
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    setTheme(next);
  }

  return (
    <button type="button" className="tab tab-button" onClick={toggle} aria-label="Switch light or dark mode">
      {theme === "dark" ? "☀ Light" : "☾ Dark"}
    </button>
  );
}
