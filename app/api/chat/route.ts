import { AIML_MODEL, getAiClient } from "@/lib/ai";
import { getAuthenticatedUser } from "@/lib/auth";
import { kvGet, kvSet } from "@/lib/kv";
import { OPT_COACH_SYSTEM } from "@/lib/prompts";
import type { ChatRoutePayload, SessionState } from "@/lib/types";
import { getNextQuestionCount, parseBrainReady } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const aiClient = getAiClient();
    const user = await getAuthenticatedUser(request);

    if (!user) {
      return Response.json({ error: "Login required." }, { status: 401 });
    }

    const { sessionId, userMessage, businessType, businessName } =
      (await request.json()) as ChatRoutePayload;

    if (!sessionId || !userMessage) {
      return Response.json(
        { error: "sessionId and userMessage are required." },
        { status: 400 }
      );
    }

    const session =
      (await kvGet<SessionState>(`session:${sessionId}`)) ??
      ({
        id: sessionId,
        userId: user.id,
        businessType: businessType ?? "agency",
        businessName,
        messages: [],
        questionsAnswered: 0,
        extractedData: {},
        status: "coaching",
        createdAt: new Date().toISOString()
      } satisfies SessionState);

    if (session.userId && session.userId !== user.id) {
      return Response.json({ error: "You do not have access to this session." }, { status: 403 });
    }

    session.userId = user.id;
    session.businessType = businessType ?? session.businessType;
    session.businessName = businessName ?? session.businessName;

    session.messages.push({
      role: "user",
      content: userMessage,
      timestamp: new Date().toISOString()
    });

    const stream = await aiClient.chat.completions.create({
      model: AIML_MODEL,
      stream: true,
      temperature: 0.7,
      max_tokens: 900,
      messages: [
        {
          role: "system",
          content: OPT_COACH_SYSTEM(session.businessType)
        },
        ...session.messages.map((message) => ({
          role: message.role,
          content: message.content
        }))
      ]
    });

    let fullResponse = "";

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const text = chunk.choices[0]?.delta?.content ?? "";
            fullResponse += text;
            controller.enqueue(new TextEncoder().encode(text));
          }

          session.messages.push({
            role: "assistant",
            content: fullResponse,
            timestamp: new Date().toISOString()
          });

          session.questionsAnswered = getNextQuestionCount(
            fullResponse,
            session.questionsAnswered
          );

          if (parseBrainReady(fullResponse)) {
            session.status = "generating";
          }

          await kvSet(`session:${sessionId}`, session, { ex: 86400 });
          controller.close();
        } catch (streamError) {
          controller.error(streamError);
        }
      }
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        "X-Session-Id": sessionId
      }
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not process chat request.";
    return Response.json({ error: message }, { status: 500 });
  }
}
