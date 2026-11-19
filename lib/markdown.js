// A tiny Markdown reader for blog posts and project write-ups. It supports what the
// site needs and nothing more:
//
//   ---                      <- optional header with  key: value  lines
//   title: My post
//   ---
//   ## Heading / ### Smaller heading
//   Paragraphs (separate with a blank line)
//   - bullet lists        1. numbered lists
//   **bold**  *italic*  `code`  [link text](https://...)
//
// Only files in this repo go through it, and all text is HTML-escaped first.

const escape = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const slugify = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function inline(text) {
  return escape(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
    .replace(/\*([^*]+)\*/g, "<i>$1</i>")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
      const external = /^https?:\/\//.test(url);
      return `<a href="${url}"${external ? ' target="_blank" rel="noopener noreferrer"' : ""}>${label}</a>`;
    });
}

export function parseFrontmatter(src) {
  const meta = {};
  let body = src.replace(/\r\n/g, "\n");
  const m = body.match(/^---\n([\s\S]*?)\n---\n?/);
  if (m) {
    for (const line of m[1].split("\n")) {
      const i = line.indexOf(":");
      if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim();
    }
    body = body.slice(m[0].length);
  }
  return { meta, body };
}

/** Returns { meta, html, headings: [[id, text]], text } */
export function renderMarkdown(src) {
  const { meta, body } = parseFrontmatter(src);
  const headings = [];
  const out = [];
  const blocks = body.split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);

  for (const block of blocks) {
    const lines = block.split("\n");
    const h = block.match(/^(#{2,3}) (.+)$/);
    if (h && lines.length === 1) {
      const level = h[1].length;
      const id = slugify(h[2]);
      if (level === 2) headings.push([id, h[2]]);
      out.push(`<h${level} id="${id}">${inline(h[2])}</h${level}>`);
    } else if (lines.every((l) => /^[-*] /.test(l))) {
      out.push(`<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join("")}</ul>`);
    } else if (lines.every((l) => /^\d+\. /.test(l))) {
      out.push(`<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\. /, ""))}</li>`).join("")}</ol>`);
    } else {
      out.push(`<p>${inline(lines.join(" "))}</p>`);
    }
  }

  const text = body.replace(/[#*`>\-[\]()]/g, " ").replace(/\s+/g, " ").trim();
  return { meta, html: out.join("\n"), headings, text };
}
