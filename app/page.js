import Link from "next/link";
import Infobox from "../components/Infobox";
import Toc from "../components/Toc";
import { PROJECTS } from "./projects/data";

// Add new entries to the TOP of this list.
const NEWS = [
  ["18 November 2026", "Redesigned the site."],
  ["17 November 2026", "Launched samy.lol."],
];

export default function Home() {
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
        <Link href="/videos">videos</Link> and notes, and I update it whenever I finish something new.
      </p>
      <p>
        I like working across the whole stack, from circuits and hardware up to web apps and the
        cloud.
      </p>

      <Toc items={[["projects", "What I’ve built"], ["interests", "What I’m into"], ["updates", "Recent updates"], ["see-also", "See also"]]} />

      <h2 id="projects">What I&apos;ve built</h2>
      <ul className="plain">
        {PROJECTS.map((p) => (
          <li key={p.name}><b>{p.name}</b> – {p.desc}</li>
        ))}
      </ul>
      <p><Link href="/projects">See all my projects →</Link></p>

      <h2 id="interests">What I&apos;m into</h2>
      <p>
        Right now I&apos;m mostly into cloud and distributed computing, machine learning, embedded
        hardware and web development.
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
        <li><Link href="/talk">Talk page</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </>
  );
}
