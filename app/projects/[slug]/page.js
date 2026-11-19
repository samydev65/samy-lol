import Link from "next/link";
import { notFound } from "next/navigation";
import Infobox from "../../../components/Infobox";
import Toc from "../../../components/Toc";
import { getProjectWriteup } from "../../../lib/content";
import { PROJECTS, STATUS_LABEL } from "../data";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  return p ? { title: p.name, description: p.desc } : {};
}

const hostOf = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export default async function Project({ params }) {
  const { slug } = await params;
  const p = PROJECTS.find((x) => x.slug === slug);
  if (!p) notFound();
  const doc = getProjectWriteup(slug);

  return (
    <>
      <h1>{p.name}</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>

      <Infobox
        title={p.name}
        image={
          // eslint-disable-next-line @next/next/no-img-element
          <img src="/icon.png" alt="" width={120} height={120} style={{ width: 120, height: 120 }} />
        }
        caption={p.desc}
        rows={[
          ["Status", <span key="s" className={`status ${p.status}`}>{STATUS_LABEL[p.status]}</span>],
          ["Started", p.started],
          ["Built with", p.builtWith],
          ...(p.link ? [["Website", <a key="l" href={p.link}>{hostOf(p.link)}</a>]] : []),
          ...(p.source ? [["Source", <a key="c" href={p.source} target="_blank" rel="noopener noreferrer">GitHub</a>]] : []),
        ].filter(([, v]) => v)}
      />

      {doc ? (
        <>
          {doc.headings.length > 2 && <Toc items={doc.headings} />}
          <div className="prose" dangerouslySetInnerHTML={{ __html: doc.html }} />
        </>
      ) : (
        <p>{p.desc} A full write-up is coming soon.</p>
      )}

      <h2>See also</h2>
      <ul className="plain"><li><Link href="/projects">All projects</Link></li></ul>
    </>
  );
}
