import Link from "next/link";
import Infobox from "../components/Infobox";
import Toc from "../components/Toc";
import { PROJECTS } from "./projects/data";
import { NOW } from "../lib/site";
import { formatDate, getPosts } from "../lib/content";
import { GITHUB_USER, LANG_COLORS, getGithubStats } from "../lib/github";

export const revalidate = 3600; // refresh the GitHub section hourly

// Add new entries to the TOP of this list.
const NEWS = [
  ["19 November 2026", "Added a blog, project pages, search and dark mode."],
  ["18 November 2026", "Redesigned the site."],
  ["17 November 2026", "Launched samy.lol."],
];

const ago = (iso) => {
  const days = Math.floor((Date.now() - new Date(iso)) / 86400000);
  return days <= 0 ? "today" : days === 1 ? "yesterday" : days < 30 ? `${days} days ago` : formatDate(iso.slice(0, 10));
};

export default async function Home() {
  const github = await getGithubStats();
  const latestPost = getPosts()[0];
  const langTotal = github?.languages.reduce((s, [, n]) => s + n, 0) || 0;

  return (
    <>
      <h1>Sammy</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>

      <Infobox
        title="Sammy"
        caption="Me, in pixel form"
        rows={[
          ["Into", "Computer engineering"],
          ["Focus", "Cloud systems, AI"],
          ["Also", "Hardware, web dev"],
          ["Website", <Link key="w" href="/">samy.lol</Link>],
        ]}
      />

      <p>
        Hi, I&apos;m <b>Sammy</b>. I&apos;m into computer engineering, especially cloud systems and AI.
        This is where I put my <Link href="/projects">projects</Link>,{" "}
        <Link href="/videos">videos</Link> and <Link href="/blog">notes</Link>, and I update it whenever
        I finish something new.
      </p>
      <p>
        I like working across the whole stack, from circuits and hardware up to web apps and the
        cloud.
      </p>

      <Toc
        items={[
          ["now", "Now"],
          ["projects", "What I’ve built"],
          ["interests", "What I’m into"],
          ["github", "On GitHub"],
          ["updates", "Recent updates"],
          ["see-also", "See also"],
        ]}
      />

      <h2 id="now">Now</h2>
      <ul className="now">
        {NOW.map(([k, v]) => <li key={k}><b>{k}</b> {v}</li>)}
      </ul>
      {latestPost && (
        <p>
          Latest post: <Link href={`/blog/${latestPost.slug}`}>{latestPost.meta.title}</Link>{" "}
          <span className="muted">({formatDate(latestPost.meta.date)})</span>
        </p>
      )}

      <h2 id="projects">What I&apos;ve built</h2>
      <ul className="plain">
        {PROJECTS.map((p) => (
          <li key={p.slug}><b><Link href={`/projects/${p.slug}`}>{p.name}</Link></b> – {p.desc}</li>
        ))}
      </ul>
      <p><Link href="/projects">See all my projects →</Link></p>

      <h2 id="interests">What I&apos;m into</h2>
      <p>
        Right now I&apos;m mostly into cloud and distributed computing, machine learning, embedded
        hardware and web development.
      </p>

      <h2 id="github">On GitHub</h2>
      {github ? (
        <>
          <div className="stat-row">
            <div className="stat"><b>{github.total}</b><span>public repos</span></div>
            <div className="stat"><b>{github.languages[0]?.[0] ?? "—"}</b><span>top language</span></div>
            <div className="stat"><b>{github.lastPush ? ago(github.lastPush) : "—"}</b><span>last push</span></div>
          </div>
          {langTotal > 0 && (
            <>
              <div className="langbar" aria-hidden="true">
                {github.languages.map(([lang, n]) => (
                  <span key={lang} style={{ width: `${(n / langTotal) * 100}%`, background: LANG_COLORS[lang] || "#8b949e" }} />
                ))}
              </div>
              <div className="legend">
                {github.languages.map(([lang, n]) => (
                  <span key={lang}><i style={{ background: LANG_COLORS[lang] || "#8b949e" }} />{lang} {Math.round((n / langTotal) * 100)}%</span>
                ))}
              </div>
            </>
          )}
          <h3>Recently updated</h3>
          <ul className="plain">
            {github.repos.map((r) => (
              <li key={r.id}>
                <a href={r.html_url} target="_blank" rel="noopener noreferrer"><b>{r.name}</b></a>
                {r.description ? ` – ${r.description}` : ""}{" "}
                <span className="muted">({r.language ? `${r.language}, ` : ""}updated {ago(r.pushed_at)})</span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="muted">GitHub stats couldn&apos;t be loaded right now.</p>
      )}
      <p>
        <a href={`https://github.com/${GITHUB_USER}`} target="_blank" rel="noopener noreferrer">See my GitHub profile →</a>
      </p>

      <h2 id="updates">Recent updates</h2>
      <table className="wikitable">
        <thead><tr><th>Date</th><th>Update</th></tr></thead>
        <tbody>
          {NEWS.map(([d, t]) => <tr key={d}><td>{d}</td><td>{t}</td></tr>)}
        </tbody>
      </table>

      <h2 id="see-also">See also</h2>
      <ul className="plain">
        <li><Link href="/about">About</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </>
  );
}
