"use client";

interface SkillInfo {
  name: string;
  description: string;
  mode: string;
}

interface SkillsPanelProps {
  skills: SkillInfo[];
  activeSkills: string[];
  onToggle: (skillName: string) => void;
}

export function SkillsPanel({
  skills,
  activeSkills,
  onToggle,
}: SkillsPanelProps) {
  if (skills.length === 0) {
    return (
      <div className="text-zinc-500 text-sm p-4">
        No skills found. Add <code>.md</code> files to the{" "}
        <code>skills/</code> directory.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-2">
      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
        Skills
      </h3>
      {skills.map((skill) => (
        <label
          key={skill.name}
          className="flex items-start gap-3 p-2 rounded-lg hover:bg-zinc-800/50 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={activeSkills.includes(skill.name)}
            onChange={() => onToggle(skill.name)}
            className="mt-1 accent-blue-500"
          />
          <div>
            <div className="text-sm text-zinc-100 font-medium">
              {skill.name}
            </div>
            <div className="text-xs text-zinc-400">{skill.description}</div>
            <span className="text-xs text-zinc-600 mt-0.5 inline-block">
              {skill.mode}
            </span>
          </div>
        </label>
      ))}
    </div>
  );
}
