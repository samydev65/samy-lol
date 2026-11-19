// Server-side storage for the visitor count and comments.
//
// Online (Vercel): uses Upstash Redis through its REST API. Add the Upstash Redis
// integration in Vercel (Storage tab) and it sets KV_REST_API_URL / KV_REST_API_TOKEN
// (or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN) for you.
//
// On your computer (no env vars): saves to .data/store.json instead.
//
// IP addresses are never stored. Each one is turned into a one-way hash first,
// which is enough to recognize a repeat visitor/commenter but can't be turned back.
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
const SALT = process.env.IP_SALT || "samy.lol-change-me";
const MAX_COMMENTS = 200;

export function clientIp(request) {
  // Vercel sets these itself, so visitors can't fake them to get extra comments.
  const h = request.headers;
  const first = (v) => v && v.split(",")[0].trim();
  return (
    first(h.get("x-vercel-forwarded-for")) ||
    h.get("x-real-ip") ||
    first(h.get("x-forwarded-for")) ||
    "local"
  );
}

export function hashIp(ip) {
  return crypto.createHash("sha256").update(SALT + "|" + ip).digest("hex").slice(0, 32);
}

// ---------- Redis (online) ----------
async function redis(...command) {
  const res = await fetch(URL_, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis error ${res.status}`);
  return (await res.json()).result;
}

// ---------- JSON file (local dev) ----------
const FILE = path.join(process.cwd(), ".data", "store.json");
let queue = Promise.resolve();
function withFile(fn) {
  // run one read-modify-write at a time so parallel requests don't clobber each other
  const run = queue.then(async () => {
    let data = { visitors: [], commenters: [], comments: [] };
    try { data = JSON.parse(await fs.readFile(FILE, "utf8")); } catch {}
    const result = await fn(data);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    await fs.writeFile(FILE, JSON.stringify(data, null, 2));
    return result;
  });
  queue = run.catch(() => {});
  return run;
}

// ---------- public API ----------
/** Records this visitor (once per IP) and returns the number of unique visitors. */
export async function recordVisit(ipHash) {
  if (URL_) {
    await redis("SADD", "visitors", ipHash);
    return Number(await redis("SCARD", "visitors"));
  }
  return withFile((d) => {
    if (!d.visitors.includes(ipHash)) d.visitors.push(ipHash);
    return d.visitors.length;
  });
}

/** Newest-first list of comments: [{ name, text, at }] */
export async function listComments() {
  if (URL_) {
    const rows = await redis("LRANGE", "comments", 0, MAX_COMMENTS - 1);
    return rows.map((r) => JSON.parse(r));
  }
  return withFile((d) => d.comments.slice(0, MAX_COMMENTS));
}

export async function hasCommented(ipHash) {
  if (URL_) return (await redis("EXISTS", `commenter:${ipHash}`)) === 1;
  return withFile((d) => d.commenters.includes(ipHash));
}

/** Adds a comment unless this IP already left one. Returns true if it was added. */
export async function addComment(ipHash, comment) {
  if (URL_) {
    // SET ... NX only succeeds the first time, so each IP gets exactly one comment
    const ok = await redis("SET", `commenter:${ipHash}`, "1", "NX");
    if (ok !== "OK") return false;
    await redis("LPUSH", "comments", JSON.stringify(comment));
    await redis("LTRIM", "comments", 0, MAX_COMMENTS - 1);
    return true;
  }
  return withFile((d) => {
    if (d.commenters.includes(ipHash)) return false;
    d.commenters.push(ipHash);
    d.comments.unshift(comment);
    d.comments = d.comments.slice(0, MAX_COMMENTS);
    return true;
  });
}
