import { nanoid } from "nanoid";

import { AIML_MODEL, getAiClient } from "@/lib/ai";
import { BRAIN_GENERATION_PROMPT } from "@/lib/prompts";
import type { BrainRecord, SessionState } from "@/lib/types";

type BrainGenerationResult = {
  brain: Omit<BrainRecord, "meta" | "markdown">;
  knowledge_md: string;
  processes_md: string;
  judgment_md: string;
};

export async function generateBrainFromSession(session: SessionState) {
  const aiClient = getAiClient();

  const completion = await aiClient.chat.completions.create({
    model: AIML_MODEL,
    messages: [
      {
        role: "user",
        content: BRAIN_GENERATION_PROMPT(session)
      }
    ],
    response_format: { type: "json_object" },
    temperature: 0.3
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("The model returned an empty brain generation response.");
  }

  const parsed = JSON.parse(content) as BrainGenerationResult;
  const brainId = nanoid(10);

  const brain: BrainRecord = {
    meta: {
      id: brainId,
      businessName: session.businessName || "Untitled Business",
      businessType: session.businessType,
      generatedAt: new Date().toISOString(),
      sessionDuration: Math.max(
        1,
        Math.round((Date.now() - new Date(session.createdAt).getTime()) / 60000)
      )
    },
    knowledge: parsed.brain.knowledge,
    processes: parsed.brain.processes,
    judgment: parsed.brain.judgment,
    skills: parsed.brain.skills,
    markdown: {
      knowledge_md: parsed.knowledge_md,
      processes_md: parsed.processes_md,
      judgment_md: parsed.judgment_md
    }
  };

  return brain;
}
