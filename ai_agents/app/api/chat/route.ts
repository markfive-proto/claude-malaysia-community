import {
  convertToModelMessages,
  streamText,
  type UIMessage,
} from "ai";
import { getModel } from "@/lib/models";
import {
  loadSkills,
  buildSystemPrompt,
  buildTools,
} from "@/lib/skills/loader";

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    model: modelId,
    activeSkills,
  }: {
    messages: UIMessage[];
    model: string;
    activeSkills: string[];
  } = await req.json();

  const skills = loadSkills(activeSkills);
  const systemPrompt = buildSystemPrompt(skills);
  const tools = buildTools(skills);

  const modelToUse = getModel(modelId);

  const result = streamText({
    model: modelToUse,
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
    tools: Object.keys(tools).length > 0 ? tools : undefined,
  });

  return result.toUIMessageStreamResponse();
}
