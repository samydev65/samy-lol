"use client";
import { useEffect, useState } from "react";

// Easter egg: type ↑ ↑ ↓ ↓ ← → ← → B A anywhere to flip the site into 90s mode.
// Type it again to switch back.
const CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

export default function Konami() {
  const [toast, setToast] = useState("");

  useEffect(() => {
    let pos = 0;
    let timer;
    function onKey(e) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = key === CODE[pos] ? pos + 1 : key === CODE[0] ? 1 : 0;
      if (pos < CODE.length) return;
      pos = 0;
      const root = document.documentElement;
      const on = !root.hasAttribute("data-retro");
      if (on) root.setAttribute("data-retro", "");
      else root.removeAttribute("data-retro");
      setToast(on ? "★ 90s mode unlocked! Best viewed in Netscape Navigator ★" : "Back to the present.");
      clearTimeout(timer);
      timer = setTimeout(() => setToast(""), 3500);
    }
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); clearTimeout(timer); };
  }, []);

  return toast ? <div className="toast" role="status">{toast}</div> : null;
}
