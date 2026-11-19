import Link from "next/link";
import { formatDate, getPosts } from "../../lib/content";

export const metadata = { title: "Blog", description: "Posts and notes about what I'm building and learning." };

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <h1>Blog</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>Notes on what I&apos;m building and learning. Newest first.</p>

      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}><b>{p.meta.title}</b></Link>{" "}
            <span className="date">· {formatDate(p.meta.date)}</span>
            {p.meta.summary && <p>{p.meta.summary}</p>}
          </li>
        ))}
      </ul>
    </>
  );
}
