"use client";

import { useState } from "react";
import type { Contributor } from "../data";

const tagColors: Record<string, { color: string; bg: string; border: string }> = {
  Workflow: { color: "var(--clay)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  Automation: { color: "var(--teal)", bg: "rgba(26,122,109,0.08)", border: "rgba(26,122,109,0.18)" },
  Refactoring: { color: "var(--violet)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.18)" },
  Testing: { color: "var(--sage)", bg: "rgba(45,138,78,0.08)", border: "rgba(45,138,78,0.18)" },
  Git: { color: "var(--ochre)", bg: "rgba(184,133,32,0.08)", border: "rgba(184,133,32,0.18)" },
  Quality: { color: "#9333ea", bg: "rgba(147,51,234,0.08)", border: "rgba(147,51,234,0.18)" },
  DevOps: { color: "#0891b2", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.18)" },
  Debugging: { color: "var(--negative)", bg: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.12)" },
};

export default function Contributors({ items }: { items: Contributor[] }) {
  const [activeTag, setActiveTag] = useState<string>("all");

  // Get unique tags
  const tags = Array.from(new Set(items.map((c) => c.tag)));

  // Filter
  const filtered = activeTag === "all" ? items : items.filter((c) => c.tag === activeTag);

  // Leaderboard
  const leaderboard = items.reduce<Record<string, { name: string; avatar: string; count: number }>>(
    (acc, c) => {
      if (!acc[c.name]) acc[c.name] = { name: c.name, avatar: c.avatar, count: 0 };
      acc[c.name].count++;
      return acc;
    },
    {}
  );
  const ranked = Object.values(leaderboard).sort((a, b) => b.count - a.count);

  return (
    <section className="mt-8" id="contributors">
      <p className="text-[0.85rem] mb-5" style={{ color: "var(--text-dim)" }}>
        Tips & techniques shared by{" "}
        <a
          href="https://www.facebook.com/groups/836579066085697"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          style={{ color: "var(--clay)", borderBottom: "1px solid rgba(194,90,46,0.3)" }}
        >
          Claude Malaysia Community
        </a>{" "}
        members.
      </p>

      {/* Tag filters */}
      <div className="flex gap-[6px] mb-5 flex-wrap">
        <button
          onClick={() => setActiveTag("all")}
          className="cursor-pointer transition-all duration-150 select-none"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            fontWeight: 500,
            padding: "5px 12px",
            borderRadius: "6px",
            border: `1px solid ${activeTag === "all" ? "var(--text-heading)" : "var(--border)"}`,
            background: activeTag === "all" ? "var(--text-heading)" : "var(--surface)",
            color: activeTag === "all" ? "var(--surface)" : "var(--text-dim)",
          }}
        >
          All
        </button>
        {tags.map((tag) => {
          const tc = tagColors[tag] || tagColors.Workflow;
          const isActive = activeTag === tag;
          return (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className="cursor-pointer transition-all duration-150 select-none flex items-center gap-1.5"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11px",
                fontWeight: 500,
                padding: "5px 12px",
                borderRadius: "6px",
                border: `1px solid ${isActive ? tc.border : "var(--border)"}`,
                background: isActive ? tc.bg : "var(--surface)",
                color: isActive ? tc.color : "var(--text-dim)",
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: tc.color, opacity: isActive ? 1 : 0.35 }} />
              {tag}
            </button>
          );
        })}
      </div>

      {/* Main layout: tips left, leaderboard right */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-5">
        {/* Tips list */}
        <div className="flex flex-col">
          {filtered.map((c, i) => {
            const tc = tagColors[c.tag] || tagColors.Workflow;
            return (
              <div
                key={i}
                className="flex gap-3 py-3.5"
                style={{ borderBottom: i < filtered.length - 1 ? "1px solid var(--border)" : "none" }}
              >
                {/* Avatar */}
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5"
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    background: "var(--surface-alt)",
                    color: "var(--text-dim)",
                    border: "1px solid var(--border)",
                  }}
                >
                  {c.avatar}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="text-[0.85rem] font-semibold" style={{ color: "var(--text-heading)" }}>
                      {c.name}
                    </span>
                    {c.handle && (
                      <span className="text-[0.72rem]" style={{ color: "var(--text-ghost)" }}>{c.handle}</span>
                    )}
                    <span
                      className="rounded-[3px] px-1.5 py-[1px]"
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: "9px",
                        fontWeight: 500,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: tc.color,
                        background: tc.bg,
                        border: `1px solid ${tc.border}`,
                      }}
                    >
                      {c.tag}
                    </span>
                  </div>
                  <p className="text-[0.85rem] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
                    {c.tip}
                  </p>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm" style={{ color: "var(--text-dim)" }}>
              No tips in this category yet.
            </p>
          )}
        </div>

        {/* Leaderboard */}
        <div>
          <div className="rounded-xl p-4 sticky top-[68px]" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <h4
              className="mb-3 pb-2"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Top Contributors
            </h4>
            <div className="flex flex-col gap-2.5">
              {ranked.map((r, i) => (
                <div key={r.name} className="flex items-center gap-2">
                  <span
                    className="shrink-0 w-4 text-center"
                    style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: i < 3 ? "var(--ochre)" : "var(--text-ghost)" }}
                  >
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                  </span>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0"
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      background: i === 0 ? "rgba(184,133,32,0.12)" : "var(--surface-alt)",
                      color: i === 0 ? "var(--ochre)" : "var(--text-dim)",
                      border: `1px solid ${i === 0 ? "rgba(184,133,32,0.25)" : "var(--border)"}`,
                    }}
                  >
                    {r.avatar}
                  </div>
                  <span className="text-[0.78rem] flex-1 truncate" style={{ color: "var(--text-heading)", fontWeight: i === 0 ? 600 : 400 }}>
                    {r.name}
                  </span>
                  <span className="text-[9px] shrink-0" style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--text-ghost)" }}>
                    {r.count}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://www.facebook.com/groups/836579066085697"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center no-underline rounded-lg py-2 mt-4 text-[11px] font-semibold transition-all duration-150"
              style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--surface)", background: "var(--clay)" }}
            >
              + Submit a Tip
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
