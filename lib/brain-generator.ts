import { nanoid } from "nanoid";

import { AIML_MODEL, getAiClient } from "@/lib/ai";
import { BRAIN_GENERATION_PROMPT } from "@/lib/prompts";
import type { BrainRecord, Process, SessionState, Skill } from "@/lib/types";

type BrainGenerationResult = {
  brain: {
    knowledge: BrainRecord["knowledge"];
    processes: BrainRecord["processes"];
    judgment: BrainRecord["judgment"];
    skills: BrainRecord["skills"];
  };
  knowledge_md: string;
  processes_md: string;
  judgment_md: string;
};

function isNonNullable<T>(value: T | null | undefined): value is T {
  return value != null;
}

function stringOrFallback(value: unknown, fallback = "Not specified") {
  return typeof value === "string" && value.trim().length > 0 ? value.trim() : fallback;
}

function stringArrayOrEmpty(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeProcesses(value: unknown): Process[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((process, index) => {
      if (!process || typeof process !== "object") {
        return null;
      }

      const record = process as Partial<Process>;
      const steps = Array.isArray(record.steps)
        ? record.steps
            .map((step, stepIndex) => {
              if (!step || typeof step !== "object") {
                return null;
              }

              const stepRecord = step as unknown as Record<string, unknown>;

              return {
                order:
                  typeof stepRecord.order === "number" && Number.isFinite(stepRecord.order)
                    ? stepRecord.order
                    : stepIndex + 1,
                action: stringOrFallback(stepRecord.action),
                owner: stringOrFallback(stepRecord.owner),
                duration:
                  typeof stepRecord.duration === "string" && stepRecord.duration.trim().length > 0
                    ? stepRecord.duration.trim()
                    : undefined,
                output: stringOrFallback(stepRecord.output)
              };
            })
            .filter(isNonNullable)
        : [];

      return {
        id: stringOrFallback(record.id, `P${index + 1}`),
        name: stringOrFallback(record.name, `Process ${index + 1}`),
        owner: stringOrFallback(record.owner),
        trigger: stringOrFallback(record.trigger),
        steps,
        decisionPoints: stringArrayOrEmpty(record.decisionPoints)
      };
    })
    .filter(isNonNullable);
}

function normalizeSkills(value: unknown): Skill[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((skill) => {
      if (!skill || typeof skill !== "object") {
        return null;
      }

      const record = skill as Partial<Skill>;

      return {
        name: stringOrFallback(record.name),
        description: stringOrFallback(record.description),
        inputs: stringArrayOrEmpty(record.inputs),
        outputs: stringArrayOrEmpty(record.outputs),
        steps: stringArrayOrEmpty(record.steps)
      };
    })
    .filter(isNonNullable);
}

export async function generateBrainFromSession(session: SessionState): Promise<BrainRecord> {
  const aiClient = getAiClient();

  const completion = await aiClient.chat.completions.create({
    model: AIML_MODEL,
    messages: [{ role: "user", content: BRAIN_GENERATION_PROMPT(session) }],
    response_format: { type: "json_object" },
    temperature: 0.3
  });

  const content = completion.choices[0]?.message?.content;

  if (!content) {
    throw new Error("The model returned an empty brain generation response.");
  }

  const cleaned = content.replace(/^```(?:json)?\s*|\s*```$/g, "").trim();

  let parsed: Partial<BrainGenerationResult>;

  try {
    parsed = JSON.parse(cleaned) as Partial<BrainGenerationResult>;
  } catch {
    throw new Error("Brain generation returned invalid JSON.");
  }

  if (!parsed || typeof parsed !== "object" || !parsed.brain || typeof parsed.brain !== "object") {
    throw new Error("Brain generation response is missing required fields.");
  }

  const brainId = nanoid(10);
  const parsedBrain = parsed.brain as Partial<BrainGenerationResult["brain"]>;

  const brain: BrainRecord = {
    meta: {
      id: brainId,
      userId: session.userId,
      businessName: session.businessName || "Untitled Business",
      businessType: session.businessType,
      generatedAt: new Date().toISOString(),
      sessionDuration: Math.max(
        1,
        Math.round((Date.now() - new Date(session.createdAt).getTime()) / 60000)
      )
    },
    knowledge: {
      operatingModel: stringOrFallback(parsedBrain.knowledge?.operatingModel),
      clientProfile: stringOrFallback(parsedBrain.knowledge?.clientProfile),
      pricingModel: stringOrFallback(parsedBrain.knowledge?.pricingModel),
      teamStructure: stringOrFallback(parsedBrain.knowledge?.teamStructure),
      keyMetrics: stringArrayOrEmpty(parsedBrain.knowledge?.keyMetrics)
    },
    processes: normalizeProcesses(parsedBrain.processes),
    judgment: {
      qualityCriteria: stringOrFallback(parsedBrain.judgment?.qualityCriteria),
      hardRules: stringArrayOrEmpty(parsedBrain.judgment?.hardRules),
      scoringFramework: stringOrFallback(parsedBrain.judgment?.scoringFramework),
      approvalRequired: stringArrayOrEmpty(parsedBrain.judgment?.approvalRequired)
    },
    skills: normalizeSkills(parsedBrain.skills),
    markdown: {
      knowledge_md: stringOrFallback(parsed.knowledge_md),
      processes_md: stringOrFallback(parsed.processes_md),
      judgment_md: stringOrFallback(parsed.judgment_md)
    }
  };

  return brain;
}
