import { type Tool } from "ai";

export type SkillMode = "tool" | "behavior" | "both";

export interface SkillFrontmatter {
  name: string;
  description: string;
  mode: SkillMode;
  model?: "anthropic" | "gemini";
  parameters?: Record<
    string,
    {
      type: string;
      description: string;
      default?: unknown;
    }
  >;
  handler?: string;
}

export interface ParsedSkill {
  frontmatter: SkillFrontmatter;
  prompt: string;
  filePath: string;
}

export interface LoadedSkill extends ParsedSkill {
  tool?: Tool;
}
