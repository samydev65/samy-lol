"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const PAGES = [
  ["/", "Main page"],
  ["/about", "About"],
  ["/projects", "Projects"],
  ["/videos", "Videos"],
  ["/blog", "Blog"],
  ["/contact", "Contact"],
];

export default function Nav() {
  const path = usePathname();
  return (
    <ul>
      {PAGES.map(([href, label]) => (
        <li key={href}>
          <Link href={href} className={path === href ? "current" : undefined}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}
