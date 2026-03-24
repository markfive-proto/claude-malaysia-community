"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "timeline", label: "Timeline" },
  { id: "platform", label: "Platform" },
  { id: "sources", label: "Sources" },
  { id: "sentiment", label: "Sentiment" },
  { id: "contributors", label: "Tips" },
];

export default function StickyNav() {
  const [active, setActive] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(true);

      const offsets = sections
        .map((s) => {
          const el = document.getElementById(s.id);
          if (!el) return null;
          return { id: s.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      const current = offsets.reduce<string | null>((best, s) => {
        if (s.top <= 100) return s.id;
        return best;
      }, null);

      setActive(current || "");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: "rgba(250,249,247,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-[860px] mx-auto px-6 flex items-center gap-2 h-[56px] overflow-x-auto">
        <span
          className="shrink-0 mr-3 text-[16px] font-semibold"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            color: "var(--text-heading)",
            fontStyle: "italic",
          }}
        >
          Pulse Check
        </span>
        <span
          className="shrink-0 w-px h-6 mr-1"
          style={{ background: "var(--border-strong)" }}
        />
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 no-underline transition-all duration-150 rounded-lg px-3.5 py-1.5"
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "12.5px",
              fontWeight: 500,
              color:
                active === s.id ? "var(--clay)" : "var(--text-dim)",
              background:
                active === s.id
                  ? "rgba(194,90,46,0.08)"
                  : "transparent",
            }}
          >
            {s.label}
          </a>
        ))}
        <span className="flex-1" />
        <a
          href="https://www.facebook.com/groups/836579066085697"
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 no-underline rounded-lg px-4 py-2 text-[12.5px] font-semibold transition-all duration-150"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            color: "var(--surface)",
            background: "var(--clay)",
          }}
        >
          Join Community
        </a>
      </div>
    </nav>
  );
}
