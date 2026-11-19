import Link from "next/link";
import { notFound } from "next/navigation";
import Toc from "../../../components/Toc";
import { formatDate, getPost, getPosts } from "../../../lib/content";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.meta.title,
    description: post.meta.summary,
    openGraph: { type: "article", title: post.meta.title, description: post.meta.summary },
  };
}

export default async function Post({ params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  return (
    <>
      <h1>{post.meta.title}</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p className="post-meta">Posted {formatDate(post.meta.date)} · <Link href="/blog">All posts</Link></p>
      {post.headings.length > 2 && <Toc items={post.headings} />}
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </>
  );
}
