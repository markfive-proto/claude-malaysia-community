import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import type { LanguageModel } from "ai";

export interface ModelOption {
  id: string;
  name: string;
  provider: "anthropic" | "gemini";
}

export const AVAILABLE_MODELS: ModelOption[] = [
  {
    id: "anthropic/claude-sonnet-4-5",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
  },
  {
    id: "anthropic/claude-haiku-4-5",
    name: "Claude Haiku 4.5",
    provider: "anthropic",
  },
  {
    id: "google/gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "gemini",
  },
  {
    id: "google/gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "gemini",
  },
];

export function getModel(modelId: string): LanguageModel {
  const [provider, ...rest] = modelId.split("/");
  const modelName = rest.join("/");

  switch (provider) {
    case "anthropic":
      return anthropic(modelName);
    case "google":
      return google(modelName);
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
}
