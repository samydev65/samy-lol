import Link from "next/link";
import Infobox from "../components/Infobox";
import Toc from "../components/Toc";
import { PROJECTS } from "./projects/data";

// Add new entries to the TOP of this list.
const NEWS = [
  ["18 November 2026", "Site redesigned."],
  ["17 November 2026", "samy.lol launched."],
];

export default function Home() {
  return (
    <>
      <h1>Sammy</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>

      <Infobox
        title="Sammy"
        caption="Sammy in 2026"
        rows={[
          ["Field", "Computer engineering"],
          ["Focus", "Cloud systems, artificial intelligence"],
          ["Interests", "Hardware, software"],
          ["Website", <Link key="w" href="/">samy.lol</Link>],
        ]}
      />

      <p>
        <b>Sammy</b> is a computer engineering student and developer with an interest in cloud
        systems and artificial intelligence. This site collects Sammy&apos;s <Link href="/projects">projects</Link>,{" "}
        <Link href="/videos">videos</Link> and notes, and is updated as new work is finished.
      </p>
      <p>
        The work spans the full stack of computing, from circuits and hardware prototypes up to
        web applications and cloud infrastructure.
      </p>

      <Toc items={[["projects", "Selected projects"], ["interests", "Interests"], ["updates", "Recent updates"], ["see-also", "See also"]]} />

      <h2 id="projects">Selected projects</h2>
      <ul className="plain">
        {PROJECTS.map((p) => (
          <li key={p.name}><b>{p.name}</b> – {p.desc}</li>
        ))}
      </ul>
      <p><Link href="/projects">Full list of projects →</Link></p>

      <h2 id="interests">Interests</h2>
      <p>
        Areas of interest include distributed and cloud computing, machine learning, embedded
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
