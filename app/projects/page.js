import { PROJECTS, STATUS_LABEL } from "./data";

export const metadata = { title: "Projects" };

export default function Projects() {
  return (
    <>
      <h1>Projects</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>

      <p>
        Here&apos;s what I&apos;ve built or am working on. I add things as I start or finish them.
      </p>

      <table className="wikitable" style={{ width: "100%" }}>
        <thead>
          <tr><th>Project</th><th>Description</th><th>Status</th><th>Topics</th></tr>
        </thead>
        <tbody>
          {PROJECTS.map((p) => (
            <tr key={p.name}>
              <td><b>{p.link ? <a href={p.link}>{p.name}</a> : p.name}</b></td>
              <td>{p.desc}</td>
              <td className={`status ${p.status}`}>{STATUS_LABEL[p.status]}</td>
              <td>{p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
