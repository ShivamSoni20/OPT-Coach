import { generateBrainFromSession } from "@/lib/brain-generator";
import { kvGet, kvSet } from "@/lib/kv";
import type { SessionState } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const { sessionId } = (await request.json()) as { sessionId?: string };

    if (!sessionId) {
      return Response.json({ error: "sessionId is required." }, { status: 400 });
    }

    const session = await kvGet<SessionState>(`session:${sessionId}`);

    if (!session) {
      return Response.json({ error: "Session not found." }, { status: 404 });
    }

    const brain = await generateBrainFromSession(session);
    await kvSet(`brain:${brain.meta.id}`, brain, { ex: 60 * 60 * 24 * 30 });

    const completedSession: SessionState = {
      ...session,
      status: "complete"
    };

    await kvSet(`session:${sessionId}`, completedSession, { ex: 86400 });

    return Response.json({ brainId: brain.meta.id });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not generate the brain.";
    return Response.json({ error: message }, { status: 500 });
  }
}
