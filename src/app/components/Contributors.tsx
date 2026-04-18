"use client";

import { useState } from "react";
import type { Contributor, CommunityPost } from "../data";

const tagColors: Record<string, { color: string; bg: string; border: string }> = {
  Workflow: { color: "var(--clay)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  Automation: { color: "var(--teal)", bg: "rgba(26,122,109,0.08)", border: "rgba(26,122,109,0.18)" },
  Refactoring: { color: "var(--violet)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.18)" },
  Testing: { color: "var(--sage)", bg: "rgba(45,138,78,0.08)", border: "rgba(45,138,78,0.18)" },
  Git: { color: "var(--ochre)", bg: "rgba(184,133,32,0.08)", border: "rgba(184,133,32,0.18)" },
  Quality: { color: "#9333ea", bg: "rgba(147,51,234,0.08)", border: "rgba(147,51,234,0.18)" },
  DevOps: { color: "#0891b2", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.18)" },
  Debugging: { color: "var(--negative)", bg: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.12)" },
  "Claude Design": { color: "var(--violet)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.18)" },
  "Opus 4.7": { color: "var(--clay)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  Release: { color: "var(--sage)", bg: "rgba(45,138,78,0.08)", border: "rgba(45,138,78,0.18)" },
  Benchmark: { color: "var(--ochre)", bg: "rgba(184,133,32,0.08)", border: "rgba(184,133,32,0.18)" },
  "Cost Optimization": { color: "var(--teal)", bg: "rgba(26,122,109,0.08)", border: "rgba(26,122,109,0.18)" },
  "Managed Agents": { color: "#0891b2", bg: "rgba(8,145,178,0.08)", border: "rgba(8,145,178,0.18)" },
  Platform: { color: "#9333ea", bg: "rgba(147,51,234,0.08)", border: "rgba(147,51,234,0.18)" },
  "Team Culture": { color: "var(--sage)", bg: "rgba(45,138,78,0.08)", border: "rgba(45,138,78,0.18)" },
  "Computer Use": { color: "var(--violet)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.18)" },
  "New Feature": { color: "var(--clay)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  Usage: { color: "var(--ochre)", bg: "rgba(184,133,32,0.08)", border: "rgba(184,133,32,0.18)" },
  "Max Plan": { color: "var(--negative)", bg: "rgba(220,38,38,0.06)", border: "rgba(220,38,38,0.12)" },
};

type ViewMode = "posts" | "tips";

export default function Contributors({
  items,
  posts,
}: {
  items: Contributor[];
  posts: CommunityPost[];
}) {
  const [activeTag, setActiveTag] = useState<string>("all");
  const [view, setView] = useState<ViewMode>("posts");

  // Get unique tags based on view
  const tags =
    view === "tips"
      ? Array.from(new Set(items.map((c) => c.tag)))
      : Array.from(new Set(posts.flatMap((p) => p.tags)));

  // Filter
  const filteredTips = activeTag === "all" ? items : items.filter((c) => c.tag === activeTag);
  const filteredPosts =
    activeTag === "all" ? posts : posts.filter((p) => p.tags.includes(activeTag));

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
        Posts & tips shared by{" "}
        <a
          href="https://www.facebook.com/groups/836579066085697"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
          style={{ color: "var(--clay)", borderBottom: "1px solid rgba(194,90,46,0.3)" }}
        >
          Claude Malaysia Community
        </a>{" "}
        members &middot; 579 members
      </p>

      {/* View toggle */}
      <div className="flex gap-1 mb-4 p-1 rounded-lg w-fit" style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
        {(["posts", "tips"] as const).map((v) => (
          <button
            key={v}
            onClick={() => { setView(v); setActiveTag("all"); }}
            className="cursor-pointer rounded-md px-3.5 py-1.5 text-[0.8rem] font-semibold transition-all duration-150 capitalize"
            style={{
              background: view === v ? "var(--surface)" : "transparent",
              color: view === v ? "var(--text-heading)" : "var(--text-dim)",
              boxShadow: view === v ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              border: view === v ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            {v === "posts" ? "Group Posts" : "Member Tips"}
          </button>
        ))}
      </div>

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

      {/* Main layout */}
      <div className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-5">
        {/* Content list */}
        <div className="flex flex-col">
          {view === "posts" ? (
            <>
              {filteredPosts.map((p, i) => {
                const tc = tagColors[p.tags[0]] || tagColors.Workflow;
                return (
                  <article
                    key={p.id}
                    id={`post-${p.id}`}
                    className="flex gap-3 py-3.5 group"
                    style={{ borderBottom: i < filteredPosts.length - 1 ? "1px solid var(--border)" : "none" }}
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
                      {p.avatar}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-[0.92rem] font-bold" style={{ color: "var(--text-heading)" }}>
                          {p.author}
                        </span>
                        <span className="text-[0.72rem]" style={{ color: "var(--text-ghost)" }}>
                          {p.date}
                        </span>
                        {p.tags.map((tag) => {
                          const tagC = tagColors[tag] || tagColors.Workflow;
                          return (
                            <span
                              key={tag}
                              className="rounded-[3px] px-1.5 py-[1px]"
                              style={{
                                fontFamily: "var(--font-jetbrains), monospace",
                                fontSize: "9px",
                                fontWeight: 500,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                color: tagC.color,
                                background: tagC.bg,
                                border: `1px solid ${tagC.border}`,
                              }}
                            >
                              {tag}
                            </span>
                          );
                        })}
                        <a
                          href={`#post-${p.id}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 no-underline text-[0.72rem]"
                          style={{ color: "var(--text-ghost)" }}
                          aria-label={`Link to post: ${p.summary.substring(0, 40)}`}
                        >
                          #
                        </a>
                      </div>
                      <p className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--text-body)" }}>
                        {p.summary}
                      </p>
                      <div className="mt-1.5 flex items-center gap-3">
                        <a
                          href={p.fbUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="no-underline text-[0.72rem] transition-colors duration-150 hover:text-[var(--clay)]"
                          style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--text-ghost)" }}
                        >
                          View on Facebook
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
              {filteredPosts.length === 0 && (
                <p className="py-8 text-center text-sm" style={{ color: "var(--text-dim)" }}>
                  No posts in this category yet.
                </p>
              )}
            </>
          ) : (
            <>
              {filteredTips.map((c, i) => {
                const tc = tagColors[c.tag] || tagColors.Workflow;
                return (
                  <article
                    key={c.id}
                    id={`tip-${c.id}`}
                    className="flex gap-3 py-3.5 group"
                    style={{ borderBottom: i < filteredTips.length - 1 ? "1px solid var(--border)" : "none" }}
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
                        <span className="text-[0.92rem] font-bold" style={{ color: "var(--text-heading)" }}>
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
                        <a
                          href={`#tip-${c.id}`}
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 no-underline text-[0.72rem]"
                          style={{ color: "var(--text-ghost)" }}
                          aria-label={`Link to tip by ${c.name}`}
                        >
                          #
                        </a>
                      </div>
                      <p className="text-[0.88rem] leading-[1.6]" style={{ color: "var(--text-body)" }}>
                        {c.tip}
                      </p>
                    </div>
                  </article>
                );
              })}
              {filteredTips.length === 0 && (
                <p className="py-8 text-center text-sm" style={{ color: "var(--text-dim)" }}>
                  No tips in this category yet.
                </p>
              )}
            </>
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
                    {i === 0 ? "\u{1F947}" : i === 1 ? "\u{1F948}" : i === 2 ? "\u{1F949}" : `${i + 1}`}
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
