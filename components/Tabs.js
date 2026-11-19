"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// The "Page / Talk ... Read" tab strip above the article.
export default function Tabs() {
  const path = usePathname();
  const onTalk = path === "/talk";
  return (
    <div className="tabs">
      <div className="tabs-group">
        <Link href={onTalk ? "/" : path} className={onTalk ? "tab" : "tab selected"}>Page</Link>
        <Link href="/talk" className={onTalk ? "tab selected" : "tab"}>Talk</Link>
      </div>
      <div className="tabs-group">
        <span className="tab selected">Read</span>
      </div>
    </div>
  );
}
