import Infobox from "../../components/Infobox";
import Toc from "../../components/Toc";

export const metadata = { title: "About" };

const SKILLS = [
  ["Programming", "JavaScript, Python, C"],
  ["Web", "React, Next.js, HTML, CSS"],
  ["Hardware", "Circuits, prototyping"],
  ["Cloud", "Deployment, hosting"],
];

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

      <Toc items={[["what-i-do", "What I do"], ["skills", "Skills"]]} />

      <h2 id="what-i-do">What I do</h2>
      <p>
        I build things in my free time, from hardware prototypes to web apps like this site. I
        learn best by making stuff, so most of what I know came from projects.
      </p>

      <h2 id="skills">Skills</h2>
      <table className="wikitable">
        <thead><tr><th>Area</th><th>What I use</th></tr></thead>
        <tbody>
          {SKILLS.map(([k, v]) => <tr key={k}><td><b>{k}</b></td><td>{v}</td></tr>)}
        </tbody>
      </table>
    </>
  );
}
