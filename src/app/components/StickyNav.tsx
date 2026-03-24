"use client";

import { useEffect, useState } from "react";

const tabs = [
  { hash: "#announcements", label: "Announcements" },
  { hash: "#community", label: "Community" },
  { hash: "#resources", label: "Resources" },
];

export default function StickyNav() {
  const [activeHash, setActiveHash] = useState("#announcements");

  useEffect(() => {
    const update = () => {
      const h = window.location.hash || "#announcements";
      setActiveHash(h);
    };
    update();
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(250,249,247,0.88)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)",
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-[860px] mx-auto px-6 flex items-center gap-2 h-[56px] overflow-x-auto">
        <a
          href="#"
          className="shrink-0 mr-2 text-[16px] font-semibold no-underline"
          style={{
            fontFamily: "var(--font-newsreader), serif",
            color: "var(--text-heading)",
            fontStyle: "italic",
          }}
        >
          Pulse Check
        </a>
        <span className="shrink-0 w-px h-6 mr-1" style={{ background: "var(--border-strong)" }} />
        {tabs.map((t) => {
          const isActive = activeHash === t.hash;
          return (
            <a
              key={t.hash}
              href={t.hash}
              className="shrink-0 no-underline transition-all duration-150 rounded-lg px-3.5 py-1.5"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "12.5px",
                fontWeight: 500,
                color: isActive ? "var(--clay)" : "var(--text-dim)",
                background: isActive ? "rgba(194,90,46,0.08)" : "transparent",
              }}
            >
              {t.label}
            </a>
          );
        })}
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
