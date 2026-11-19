import { PROJECTS } from "./projects/data";
import { PAGES, getPosts } from "../lib/content";
import { SITE_URL } from "../lib/site";

// Tells Google and other search engines about every page on the site.
export default function sitemap() {
  return [
    ...PAGES.map(([href]) => ({ url: `${SITE_URL}${href === "/" ? "" : href}` })),
    ...PROJECTS.map((p) => ({ url: `${SITE_URL}/projects/${p.slug}` })),
    ...getPosts().map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: p.meta.date })),
  ];
}
