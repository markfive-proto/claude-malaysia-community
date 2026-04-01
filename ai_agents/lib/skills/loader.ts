import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { tool } from "ai";
import { z, type ZodTypeAny } from "zod";
import type { ParsedSkill, SkillFrontmatter, LoadedSkill } from "./types";

const SKILLS_DIR = path.join(process.cwd(), "skills");

function parseSkillFile(filePath: string): ParsedSkill {
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as SkillFrontmatter,
    prompt: content.trim(),
    filePath,
  };
}

export function discoverSkills(): ParsedSkill[] {
  if (!fs.existsSync(SKILLS_DIR)) return [];
  return fs
    .readdirSync(SKILLS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parseSkillFile(path.join(SKILLS_DIR, f)));
}

function paramTypeToZod(type: string): ZodTypeAny {
  switch (type) {
    case "number":
      return z.number();
    case "boolean":
      return z.boolean();
    default:
      return z.string();
  }
}

function buildZodSchema(
  parameters: NonNullable<SkillFrontmatter["parameters"]>
): z.ZodObject<Record<string, ZodTypeAny>> {
  const shape: Record<string, ZodTypeAny> = {};
  for (const [key, param] of Object.entries(parameters)) {
    let schema = paramTypeToZod(param.type).describe(param.description);
    if (param.default !== undefined) {
      schema = schema.optional().default(param.default) as ZodTypeAny;
    }
    shape[key] = schema;
  }
  return z.object(shape);
}

export function loadSkills(skillNames?: string[]): LoadedSkill[] {
  const allSkills = discoverSkills();
  const filtered = skillNames
    ? allSkills.filter((s) => skillNames.includes(s.frontmatter.name))
    : allSkills;

  return filtered.map((skill) => {
    const { frontmatter } = skill;
    const loaded: LoadedSkill = { ...skill };

    if (frontmatter.mode === "tool" || frontmatter.mode === "both") {
      if (frontmatter.parameters) {
        loaded.tool = tool({
          description: frontmatter.description,
          inputSchema: buildZodSchema(frontmatter.parameters),
          execute: async (args) => {
            if (frontmatter.handler) {
              const handlerPath = path.join(SKILLS_DIR, frontmatter.handler);
              const handlerModule = await import(handlerPath);
              return handlerModule.default(args);
            }
            return {
              result: `Tool "${frontmatter.name}" executed with args: ${JSON.stringify(args)}`,
              note: "No handler defined — model should use its own knowledge to respond.",
            };
          },
        });
      }
    }

    return loaded;
  });
}

export function buildSystemPrompt(skills: LoadedSkill[]): string {
  const parts: string[] = [
    "You are a research assistant. You help users find, analyze, and synthesize information.",
  ];

  for (const skill of skills) {
    if (
      (skill.frontmatter.mode === "behavior" ||
        skill.frontmatter.mode === "both") &&
      skill.prompt
    ) {
      parts.push(`\n## Skill: ${skill.frontmatter.name}\n\n${skill.prompt}`);
    }
  }

  return parts.join("\n");
}

export function buildTools(
  skills: LoadedSkill[]
): Record<string, NonNullable<LoadedSkill["tool"]>> {
  const tools: Record<string, NonNullable<LoadedSkill["tool"]>> = {};
  for (const skill of skills) {
    if (skill.tool) {
      tools[skill.frontmatter.name] = skill.tool;
    }
  }
  return tools;
}
