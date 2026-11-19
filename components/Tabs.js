"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

// The "Page / Talk ... Read / View history" tab strip above the article.
// "Talk" opens the contact page; "View history" opens the edit history.
export default function Tabs() {
  const path = usePathname();
  const onTalk = path === "/contact";
  const onHistory = path === "/history";
  return (
    <div className="tabs">
      <div className="tabs-group">
        <Link href={onTalk ? "/" : path} className={onTalk ? "tab" : "tab selected"}>Page</Link>
        <Link href="/contact" className={onTalk ? "tab selected" : "tab"}>Talk</Link>
      </div>
      <div className="tabs-group">
        {onHistory ? <Link href="/" className="tab">Read</Link> : <span className="tab selected">Read</span>}
        <Link href="/history" className={onHistory ? "tab selected" : "tab"}>View history</Link>
        <ThemeToggle />
      </div>
    </div>
  );
}
