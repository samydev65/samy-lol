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
        caption="Sammy in 2026"
        rows={[
          ["Field", "Computer engineering"],
          ["Focus", "Cloud systems, AI"],
          ["Interests", "Hardware, software"],
        ]}
      />

      <p>
        <b>Sammy</b> is a computer engineering student and developer, interested in how computers
        work at every level, from circuits up to the cloud, with a recent focus on artificial
        intelligence.
      </p>

      <Toc items={[["background", "Background"], ["skills", "Skills"]]} />

      <h2 id="background">Background</h2>
      <p>
        Sammy studies computer engineering and builds projects on the side, ranging from hardware
        prototypes to web applications such as this site.
      </p>

      <h2 id="skills">Skills</h2>
      <table className="wikitable">
        <thead><tr><th>Area</th><th>Tools and topics</th></tr></thead>
        <tbody>
          {SKILLS.map(([k, v]) => <tr key={k}><td><b>{k}</b></td><td>{v}</td></tr>)}
        </tbody>
      </table>
    </>
  );
}
