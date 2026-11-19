// Reads blog posts (content/blog/*.md) and project write-ups (content/projects/*.md),
// and builds the search index used by the sidebar.
import fs from "node:fs";
import path from "node:path";
import { renderMarkdown } from "./markdown";
import { PROJECTS } from "../app/projects/data";

const ROOT = path.join(process.cwd(), "content");

function readDir(dir) {
  const full = path.join(ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs.readdirSync(full).filter((f) => f.endsWith(".md")).map((f) => f.replace(/\.md$/, ""));
}

function readDoc(dir, slug) {
  const file = path.join(ROOT, dir, `${slug}.md`);
  if (!/^[a-z0-9-]+$/.test(slug) || !fs.existsSync(file)) return null;
  return { slug, ...renderMarkdown(fs.readFileSync(file, "utf8")) };
}

// ---------- blog ----------
export function getPosts() {
  return readDir("blog")
    .map((slug) => readDoc("blog", slug))
    .filter((p) => p && p.meta.draft !== "true")
    .sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
}
export const getPost = (slug) => readDoc("blog", slug);

export function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00Z`);
  return isNaN(d) ? iso : d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}

// ---------- projects ----------
export const getProjectWriteup = (slug) => readDoc("projects", slug);

// ---------- search + random ----------
export const PAGES = [
  ["/", "Main page", "Home: who I am, what I've built, what I'm into, recent updates, GitHub"],
  ["/about", "About", "About me, what I do, skills and tools"],
  ["/projects", "Projects", "List of everything I've built or am working on"],
  ["/videos", "Videos", "Walkthroughs and demos of my projects on YouTube"],
  ["/blog", "Blog", "Posts and notes"],
  ["/history", "Edit history", "Recent changes to this website from GitHub"],
  ["/contact", "Contact", "E-mail, GitHub, YouTube and a contact form"],
];

export function getSearchIndex() {
  return [
    ...PAGES.map(([href, title, text]) => ({ href, title, kind: "Page", text })),
    ...PROJECTS.map((p) => ({
      href: `/projects/${p.slug}`,
      title: p.name,
      kind: "Project",
      text: `${p.desc} ${p.tags.join(" ")} ${getProjectWriteup(p.slug)?.text ?? ""}`.slice(0, 4000),
    })),
    ...getPosts().map((p) => ({
      href: `/blog/${p.slug}`,
      title: p.meta.title,
      kind: "Blog post",
      text: `${p.meta.summary ?? ""} ${p.text}`.slice(0, 4000),
    })),
  ];
}
