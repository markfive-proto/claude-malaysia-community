"use client";

import { AVAILABLE_MODELS } from "@/lib/models";

interface ModelSelectorProps {
  value: string;
  onChange: (modelId: string) => void;
}

export function ModelSelector({ value, onChange }: ModelSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-zinc-800 text-zinc-100 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 border border-zinc-700"
    >
      <optgroup label="Anthropic">
        {AVAILABLE_MODELS.filter((m) => m.provider === "anthropic").map(
          (m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          )
        )}
      </optgroup>
      <optgroup label="Google">
        {AVAILABLE_MODELS.filter((m) => m.provider === "gemini").map(
          (m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          )
        )}
      </optgroup>
    </select>
  );
}
