"use client";
import { usePathname, useRouter } from "next/navigation";

// "Random article": jumps to a random page, project or post (never the one you're on).
export default function RandomLink({ hrefs }) {
  const router = useRouter();
  const path = usePathname();

  function go(e) {
    e.preventDefault();
    const choices = hrefs.filter((h) => h !== path);
    router.push(choices[Math.floor(Math.random() * choices.length)] || "/");
  }

  return <a href="/" onClick={go}>Random article</a>;
}
