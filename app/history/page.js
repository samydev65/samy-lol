import { GITHUB_USER, SITE_REPO, getSiteHistory } from "../../lib/github";

export const metadata = { title: "Edit history", description: "Recent changes to samy.lol." };
export const revalidate = 3600;

const fmt = (iso) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "UTC" }) + " UTC";

export default async function History() {
  const commits = await getSiteHistory();
  const repo = `https://github.com/${GITHUB_USER}/${SITE_REPO}`;
  return (
    <>
      <h1>samy.lol: Revision history</h1>
      <p className="tagline">From samy.lol, the personal homepage</p>
      <p>
        Every change I make to this site, newest first. It&apos;s pulled from the site&apos;s{" "}
        <a href={repo} target="_blank" rel="noopener noreferrer">GitHub repository</a> and refreshes every hour.
      </p>

      {commits ? (
        <table className="wikitable" style={{ width: "100%" }}>
          <thead><tr><th>Date</th><th>Change</th><th>Revision</th></tr></thead>
          <tbody>
            {commits.map((c) => (
              <tr key={c.sha}>
                <td style={{ whiteSpace: "nowrap" }}>{fmt(c.date)}</td>
                <td>{c.message}</td>
                <td><a href={c.url} target="_blank" rel="noopener noreferrer"><code>{c.sha}</code></a></td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="muted">
          The history couldn&apos;t be loaded right now. See it on{" "}
          <a href={`${repo}/commits/main`} target="_blank" rel="noopener noreferrer">GitHub</a>.
        </p>
      )}
    </>
  );
}
