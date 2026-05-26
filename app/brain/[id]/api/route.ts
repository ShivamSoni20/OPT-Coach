import { kvGet } from "@/lib/kv";
import type { BrainRecord } from "@/lib/types";

export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const brain = await kvGet<BrainRecord>(`brain:${params.id}`);

  if (!brain) {
    return Response.json({ error: "Brain not found" }, { status: 404 });
  }

  return Response.json(brain, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=300"
    }
  });
}
