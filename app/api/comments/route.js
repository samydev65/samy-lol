import { addComment, clientIp, hasCommented, hashIp, listComments } from "../../../lib/store";

export const dynamic = "force-dynamic";

const NAME_MAX = 40;
const TEXT_MAX = 500;
const clean = (v, max) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, max);

// GET /api/comments — all comments, plus whether this visitor already posted.
export async function GET(request) {
  try {
    const ip = hashIp(clientIp(request));
    const [comments, posted] = await Promise.all([listComments(), hasCommented(ip)]);
    return Response.json({ comments, posted });
  } catch {
    return Response.json({ error: "Comments unavailable" }, { status: 503 });
  }
}

// POST /api/comments — one comment per IP address, ever.
export async function POST(request) {
  let body;
  try { body = await request.json(); } catch { return Response.json({ error: "Bad request" }, { status: 400 }); }

  // Hidden "website" field: real people never fill it in, simple spam bots do.
  if (body.website) return Response.json({ ok: true });

  const name = clean(body.name, NAME_MAX) || "Anonymous";
  const text = clean(body.text, TEXT_MAX);
  if (text.length < 2) return Response.json({ error: "Write a comment first." }, { status: 400 });

  try {
    const added = await addComment(hashIp(clientIp(request)), { name, text, at: new Date().toISOString() });
    if (!added) return Response.json({ error: "You've already left a comment. Thanks!" }, { status: 409 });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Comments unavailable" }, { status: 503 });
  }
}
