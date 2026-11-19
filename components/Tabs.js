"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

// The "Page / Talk ... Read" tab strip above the article.
// "Talk" opens the contact page.
export default function Tabs() {
  const path = usePathname();
  const onTalk = path === "/contact";
  return (
    <div className="tabs">
      <div className="tabs-group">
        <Link href={onTalk ? "/" : path} className={onTalk ? "tab" : "tab selected"}>Page</Link>
        <Link href="/contact" className={onTalk ? "tab selected" : "tab"}>Talk</Link>
      </div>
      <div className="tabs-group">
        <span className="tab selected">Read</span>
        <ThemeToggle />
      </div>
    </div>
  );
}
