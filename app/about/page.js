import Link from "next/link";
import Infobox from "../../components/Infobox";
import Toc from "../../components/Toc";

export const metadata = { title: "About", description: "About me, what I do and the tools I use." };

const SKILLS = [
  ["Programming", "JavaScript, Python, C"],
  ["Web", "React, Next.js, HTML, CSS"],
  ["Hardware", "Circuits, prototyping"],
  ["Cloud", "Deployment, hosting"],
];

// Footnotes: [id, content]. Cite them in the text with <Ref n={1} />.
const REFS = [
  ["site", <><Link href="/projects/samy-lol">&quot;samy.lol&quot;</Link>. <i>Projects</i>. samy.lol.</>],
  ["blog", <><Link href="/blog/building-samy-lol">&quot;Building samy.lol&quot;</Link>. <i>Blog</i>. samy.lol. 19 November 2026.</>],
  ["github", <><a href="https://github.com/samydev65" target="_blank" rel="noopener noreferrer">&quot;samydev65&quot;</a>. <i>GitHub</i>.</>],
];

function Ref({ n }) {
  return <sup className="ref"><a href={`#cite-${REFS[n - 1][0]}`}>[{n}]</a></sup>;
}
const CitationNeeded = () => (
  <sup className="cn">[<a href="#what-i-do" title="Trust me on this one">citation needed</a>]</sup>
);

export default function About() {
  return (
    <>
      <h1>About</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>

      <Infobox
        title="Sammy"
        caption="Me, in pixel form"
        rows={[
          ["Into", "Computer engineering"],
          ["Focus", "Cloud systems, AI"],
          ["Also", "Hardware, web dev"],
        ]}
      />

      <p>
        I&apos;m <b>Sammy</b>. I&apos;m interested in computer engineering and how computers work at
        every level, from circuits up to the cloud. Lately I&apos;ve been focused on AI.
      </p>

      <Toc items={[["what-i-do", "What I do"], ["skills", "Skills"], ["references", "References"]]} />

      <h2 id="what-i-do">What I do</h2>
      <p>
        I build things in my free time, from hardware prototypes to web apps like this site.
        <Ref n={1} /><Ref n={2} /> I learn best by making stuff,<CitationNeeded /> so most of what I
        know came from projects.<Ref n={3} />
      </p>

      <h2 id="skills">Skills</h2>
      <table className="wikitable">
        <thead><tr><th>Area</th><th>What I use</th></tr></thead>
        <tbody>
          {SKILLS.map(([k, v]) => <tr key={k}><td><b>{k}</b></td><td>{v}</td></tr>)}
        </tbody>
      </table>

      <h2 id="references">References</h2>
      <ol className="references">
        {REFS.map(([id, content]) => <li key={id} id={`cite-${id}`}>{content}</li>)}
      </ol>
    </>
  );
}
