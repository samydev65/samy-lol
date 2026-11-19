// Public GitHub data for the home page.
// Results are cached and refreshed at most once an hour.
// Optional: set GITHUB_TOKEN in Vercel (a token with no extra permissions) to avoid
// GitHub's limit of 60 requests an hour for anonymous visitors.
export const GITHUB_USER = "samydev65";

async function gh(path) {
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "samy.lol",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 3600 },
    });
    return res.ok ? res.json() : null;
  } catch {
    return null;
  }
}

/** { repos, total, languages: [[name, count]], lastPush } or null */
export async function getGithubStats() {
  const repos = await gh(`/users/${GITHUB_USER}/repos?sort=pushed&per_page=100`);
  if (!Array.isArray(repos)) return null;
  const own = repos.filter((r) => !r.fork && r.name !== GITHUB_USER); // skip the profile README repo
  const counts = {};
  for (const r of own) if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  return {
    repos: own.slice(0, 5),
    total: own.length,
    languages: Object.entries(counts).sort((a, b) => b[1] - a[1]),
    lastPush: own[0]?.pushed_at ?? null,
  };
}

// GitHub's own colors for common languages
export const LANG_COLORS = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", C: "#555555", "C++": "#f34b7d",
  Java: "#b07219", HTML: "#e34c26", CSS: "#563d7c", Go: "#00ADD8", Rust: "#dea584", Shell: "#89e051",
};
