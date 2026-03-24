"use client";

import { useState } from "react";
import type { Resource } from "../data";

const catConfig: Record<string, { label: string; color: string; bg: string; border: string }> = {
  official: { label: "Official", color: "var(--clay)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  skills: { label: "Skills", color: "var(--teal)", bg: "rgba(26,122,109,0.08)", border: "rgba(26,122,109,0.18)" },
  marketing: { label: "Marketing", color: "var(--violet)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.18)" },
  community: { label: "Community", color: "var(--ochre)", bg: "rgba(184,133,32,0.08)", border: "rgba(184,133,32,0.18)" },
  learning: { label: "Learning", color: "var(--sage)", bg: "rgba(45,138,78,0.08)", border: "rgba(45,138,78,0.18)" },
};

export default function Resources({ items }: { items: Resource[] }) {
  const [activeCat, setActiveCat] = useState<string>("all");
  const cats = Object.keys(catConfig);
  const filtered = activeCat === "all" ? items : items.filter((r) => r.category === activeCat);

  return (
    <section className="mt-8" id="resources">
      <p className="text-[0.85rem] mb-5" style={{ color: "var(--text-dim)" }}>
        Curated repos, skills collections, and learning resources for Claude Code.
      </p>

      {/* Category filters */}
      <div className="flex gap-[6px] mb-5 flex-wrap">
        <button
          onClick={() => setActiveCat("all")}
          className="cursor-pointer transition-all duration-150 select-none"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            fontSize: "11px",
            fontWeight: 500,
            padding: "5px 12px",
            borderRadius: "6px",
            border: `1px solid ${activeCat === "all" ? "var(--text-heading)" : "var(--border)"}`,
            background: activeCat === "all" ? "var(--text-heading)" : "var(--surface)",
            color: activeCat === "all" ? "var(--surface)" : "var(--text-dim)",
          }}
        >
          All
        </button>
        {cats.map((cat) => {
          const cc = catConfig[cat];
          const isActive = activeCat === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className="cursor-pointer transition-all duration-150 select-none flex items-center gap-1.5"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "11px",
                fontWeight: 500,
                padding: "5px 12px",
                borderRadius: "6px",
                border: `1px solid ${isActive ? cc.border : "var(--border)"}`,
                background: isActive ? cc.bg : "var(--surface)",
                color: isActive ? cc.color : "var(--text-dim)",
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: cc.color, opacity: isActive ? 1 : 0.35 }} />
              {cc.label}
            </button>
          );
        })}
      </div>

      {/* Resource cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {filtered.map((r, i) => {
          const cc = catConfig[r.category];
          return (
            <a
              key={i}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-xl p-4 no-underline transition-all duration-150 hover:border-[var(--border-strong)]"
              style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 text-[14px]"
                  style={{ background: cc.bg, border: `1px solid ${cc.border}` }}
                >
                  {r.category === "official" ? "📦" : r.category === "skills" ? "🧩" : r.category === "marketing" ? "📈" : r.category === "community" ? "🌐" : "📚"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[0.95rem] font-bold truncate" style={{ color: "var(--text-heading)" }}>
                      {r.title}
                    </span>
                    {r.stars && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded shrink-0" style={{ fontFamily: "var(--font-jetbrains), monospace", background: "var(--surface-alt)", color: "var(--text-dim)", border: "1px solid var(--border)" }}>
                        ★ {r.stars}
                      </span>
                    )}
                  </div>
                  <p className="text-[0.85rem] leading-[1.55] mb-2" style={{ color: "var(--text-secondary)" }}>
                    {r.desc}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[3px] px-1.5 py-[1px]" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: cc.color, background: cc.bg, border: `1px solid ${cc.border}` }}>
                      {cc.label}
                    </span>
                    {r.author && (
                      <span className="text-[0.72rem]" style={{ color: "var(--text-ghost)" }}>
                        by {r.author}
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-[10px] shrink-0 mt-1" style={{ color: "var(--text-ghost)" }}>↗</span>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
