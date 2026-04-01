import { discoverSkills } from "@/lib/skills/loader";

export async function GET() {
  const skills = discoverSkills();
  return Response.json(
    skills.map((s) => ({
      name: s.frontmatter.name,
      description: s.frontmatter.description,
      mode: s.frontmatter.mode,
    }))
  );
}
