import OpenAI from "openai";

export const AIML_BASE_URL = process.env.AIML_API_BASE_URL ?? "https://api.aimlapi.com/v1";
export const AIML_MODEL = process.env.AIML_MODEL ?? "openai/gpt-4.1-mini";

export function assertAiConfig() {
  if (!process.env.AIML_API_KEY && !process.env.OPENAI_API_KEY) {
    throw new Error("Missing AIML API key. Set AIML_API_KEY in your environment.");
  }
}

export function getAiClient() {
  assertAiConfig();

  return new OpenAI({
    apiKey: process.env.AIML_API_KEY ?? process.env.OPENAI_API_KEY,
    baseURL: AIML_BASE_URL
  });
}
