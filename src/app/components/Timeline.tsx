"use client";

import { useState } from "react";
import type { TimelineEntry } from "../data";

// Category colors — match the filter buttons
const categoryColors: Record<string, { dot: string; shadow: string; bg: string; border: string }> = {
  claude: { dot: "var(--clay)", shadow: "0 0 0 4px rgba(194,90,46,0.08)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  cowork: { dot: "var(--violet)", shadow: "0 0 0 4px rgba(107,92,231,0.08)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.15)" },
  code: { dot: "var(--teal)", shadow: "0 0 0 4px rgba(26,122,109,0.08)", bg: "rgba(26,122,109,0.08)", border: "rgba(26,122,109,0.15)" },
};

const badgeStyles: Record<string, { color: string; bg: string; border: string }> = {
  new: { color: "var(--clay)", bg: "rgba(194,90,46,0.08)", border: "rgba(194,90,46,0.15)" },
  update: { color: "var(--teal)", bg: "rgba(26,122,109,0.08)", border: "rgba(26,122,109,0.18)" },
  platform: { color: "var(--violet)", bg: "rgba(107,92,231,0.08)", border: "rgba(107,92,231,0.18)" },
};

type Filter = "all" | "claude" | "cowork" | "code";

export default function Timeline({
  items,
  platformItems,
}: {
  items: TimelineEntry[];
  platformItems: TimelineEntry[];
}) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "claude", label: "Claude" },
    { key: "cowork", label: "Claude Cowork" },
    { key: "code", label: "Claude Code" },
  ];

  const filtered = filter === "all" ? items : items.filter((i) => i.category === filter);
  const filteredPlatform =
    filter === "all" ? platformItems : platformItems.filter((i) => i.category === filter);

  return (
    <>
      {/* Release Timeline */}
      <section className="mt-8" id="timeline">
        <div className="flex gap-[6px] mb-6 flex-wrap">
          {filters.map((f) => {
            const cc = f.key !== "all" ? categoryColors[f.key] : null;
            const isActive = filter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className="cursor-pointer transition-all duration-150 select-none flex items-center gap-1.5"
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  border: `1px solid ${isActive ? (cc ? cc.border : "var(--text-heading)") : "var(--border)"}`,
                  background: isActive ? (cc ? cc.bg : "var(--text-heading)") : "var(--surface)",
                  color: isActive ? (cc ? cc.dot : "var(--surface)") : "var(--text-dim)",
                }}
              >
                {cc && <span className="w-[7px] h-[7px] rounded-full" style={{ background: cc.dot, opacity: isActive ? 1 : 0.4 }} />}
                {f.label}
              </button>
            );
          })}
        </div>
        <div className="relative pl-9">
          <div
            className="absolute left-[7px] top-2 bottom-0 w-[1.5px]"
            style={{
              background: "linear-gradient(180deg, var(--border-strong) 0%, var(--border) 70%, transparent 100%)",
            }}
          />
          {filtered.map((item, i) => (
            <TimelineItem key={i} item={item} />
          ))}
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm" style={{ color: "var(--text-dim)" }}>
              No updates in this category for March 2026.
            </p>
          )}
        </div>
      </section>

      {/* Platform Updates */}
      {filteredPlatform.length > 0 && (
        <section className="mt-14" id="platform">
          <SectionHead num="02" title="Platform Updates" />
          <div className="relative pl-9">
            <div
              className="absolute left-[7px] top-2 bottom-0 w-[1.5px]"
              style={{
                background: "linear-gradient(180deg, var(--border-strong) 0%, var(--border) 70%, transparent 100%)",
              }}
            />
            {filteredPlatform.map((item, i) => (
              <TimelineItem key={i} item={item} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div
      className="flex items-center gap-3 mb-7 pb-3.5"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      <div
        className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg"
        style={{
          fontFamily: "var(--font-jetbrains), monospace",
          fontSize: "10px",
          fontWeight: 500,
          color: "var(--clay)",
          letterSpacing: "0.08em",
          border: "1.5px solid var(--border-strong)",
          background: "var(--surface)",
        }}
      >
        {num}
      </div>
      <h2
        className="text-[1.4rem]"
        style={{
          fontFamily: "var(--font-newsreader), serif",
          fontWeight: 500,
          color: "var(--text-heading)",
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

const linkIcons: Record<string, string> = {
  twitter: "\uD835\uDD4F",
  blog: "\u{1F4DD}",
  article: "\u{1F4F0}",
  docs: "\u{1F4D6}",
  github: "\u{1F4BB}",
};

const LINK_ICON_MAP: Record<string, string> = {
  twitter: "𝕏",
  blog: "📝",
  article: "📰",
  docs: "📖",
  github: "💻",
};

function getTweetId(url: string): string | null {
  return url.match(/status\/(\d+)/)?.[1] || null;
}

function TimelineItem({ item }: { item: TimelineEntry }) {
  const [open, setOpen] = useState(false);
  const bs = badgeStyles[item.badgeType];
  const hasSources = !!(item.links?.length || item.source);
  const tweetId = item.tweetUrl ? getTweetId(item.tweetUrl) : null;

  /* ── Left column: tweet embed only ── */
  const tweetPanel = tweetId ? (
    <div className="shrink-0 w-full md:w-[300px]">
      <div className="tweet-embed-wrap rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <iframe
          src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=light`}
          className="w-full border-none"
          style={{ height: "400px", overflow: "hidden" }}
          scrolling="no"
          loading="lazy"
          title={`Tweet: ${item.title}`}
          allow="autoplay; fullscreen"
        />
      </div>
    </div>
  ) : null;

  return (
    <article className="relative pb-8 last:pb-0">
      <div className="absolute -left-9 top-[6px] w-[15px] h-[15px] rounded-full z-[2]" style={{ background: categoryColors[item.category]?.dot || "var(--text-ghost)", boxShadow: categoryColors[item.category]?.shadow || "none" }} />

      <div className={tweetPanel ? "flex flex-col md:flex-row gap-4 items-start" : ""}>
        {/* Tweet on the left */}
        {tweetPanel}
        <div className="flex-1 min-w-0">
          {/* Meta */}
          <div className="flex items-center gap-2 flex-wrap mb-1" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "11px", color: "var(--text-dim)" }}>
            <span>{item.date}{item.time && <> &middot; {item.time}</>}</span>
            {item.ago && <span style={{ color: "var(--text-ghost)", fontSize: "10px" }}>{item.ago}</span>}
            {item.version && (
              <span className="rounded-[3px] px-[7px] py-[2px]" style={{ fontSize: "10px", color: "var(--text-ghost)", background: "var(--surface-alt)", border: "1px solid var(--border)" }}>{item.version}</span>
            )}
            <span className="rounded-[3px] px-2 py-[2px]" style={{ fontSize: "9px", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: bs.color, background: bs.bg, border: `1px solid ${bs.border}` }}>{item.badge}</span>
          </div>

          {/* Title */}
          <h3 className="text-[1rem] font-bold mb-1 leading-[1.35]" style={{ color: "var(--text-heading)" }}>{item.title}</h3>

          {/* Description */}
          <p className="text-[0.85rem] leading-[1.6] mb-2" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>

          {/* Read more — compact pill buttons */}
          {hasSources && (
            <div className="flex items-center gap-1.5 flex-wrap mt-1">
              {item.source && (
                <a href={item.source.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 no-underline transition-all duration-150 hover:border-[var(--border-strong)]"
                  style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--twitter)", border: "1px solid rgba(29,155,240,0.15)", background: "rgba(29,155,240,0.04)" }}>
                  <span className="font-bold text-[10px]" style={{ color: "var(--text-heading)" }}>𝕏</span>
                  {item.source.handle.replace(/\s*\(.*\)/, "")}
                </a>
              )}
              {item.links?.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 rounded-md px-2 py-1 no-underline transition-all duration-150 hover:border-[var(--border-strong)]"
                  style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--text-dim)", border: "1px solid var(--border)", background: "var(--surface)" }}>
                  <span className="text-[9px]">{LINK_ICON_MAP[link.type] || "🔗"}</span>
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Sentiment below buttons */}
          {item.sentiment && (
            <div className="mt-2.5">
              <div className="flex items-center gap-2 mb-1">
                {item.sentiment.topReaction && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ fontFamily: "var(--font-jetbrains), monospace", background: "var(--surface-alt)", color: "var(--text-secondary)", border: "1px solid var(--border)" }}>
                    {item.sentiment.topReaction}
                  </span>
                )}
                <div className="h-[5px] w-[100px] rounded-full overflow-hidden flex gap-[1px]">
                  <div className="rounded-l-full" style={{ width: `${item.sentiment.positive}%`, background: "var(--positive)" }} />
                  <div style={{ width: `${item.sentiment.neutral}%`, background: "var(--neutral)" }} />
                  <div className="rounded-r-full" style={{ width: `${item.sentiment.negative}%`, background: "var(--negative)" }} />
                </div>
                <div className="flex gap-2" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "9px" }}>
                  <span style={{ color: "var(--positive)" }}>{item.sentiment.positive}%</span>
                  <span style={{ color: "var(--neutral)" }}>{item.sentiment.neutral}%</span>
                  <span style={{ color: "var(--negative)" }}>{item.sentiment.negative}%</span>
                </div>
              </div>
              <p className="text-[0.78rem] leading-[1.45]" style={{ color: "var(--text-ghost)" }}>
                {item.sentiment.summary}
              </p>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}

export { SectionHead };
