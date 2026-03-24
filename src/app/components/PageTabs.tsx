"use client";

import { useState } from "react";

type TabKey = "announcements" | "community" | "resources";

const tabs: { key: TabKey; label: string }[] = [
  { key: "announcements", label: "Announcements" },
  { key: "community", label: "Community" },
  { key: "resources", label: "Resources" },
];

export default function PageTabs({
  announcements,
  community,
  resources,
}: {
  announcements: React.ReactNode;
  community: React.ReactNode;
  resources: React.ReactNode;
}) {
  const [tab, setTab] = useState<TabKey>("announcements");

  return (
    <>
      <div
        className="flex gap-1 mt-8 mb-2 p-1 rounded-xl w-fit"
        style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}
      >
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="cursor-pointer rounded-lg px-4 py-2 text-[0.85rem] font-semibold transition-all duration-150"
            style={{
              background: tab === t.key ? "var(--surface)" : "transparent",
              color: tab === t.key ? "var(--text-heading)" : "var(--text-dim)",
              boxShadow: tab === t.key ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
              border: tab === t.key ? "1px solid var(--border)" : "1px solid transparent",
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div>
        {tab === "announcements" && announcements}
        {tab === "community" && community}
        {tab === "resources" && resources}
      </div>
    </>
  );
}
