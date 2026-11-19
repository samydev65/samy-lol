import { clientIp, hashIp, recordVisit } from "../../../lib/store";

export const dynamic = "force-dynamic";

// POST /api/visit — counts this visitor once per IP and returns the total.
export async function POST(request) {
  try {
    const count = await recordVisit(hashIp(clientIp(request)));
    return Response.json({ count });
  } catch {
    return Response.json({ error: "Counter unavailable" }, { status: 503 });
  }
}
