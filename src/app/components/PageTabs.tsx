"use client";

import { useState, useEffect, useCallback } from "react";

type TabKey = "announcements" | "community" | "resources";

const tabList: { key: TabKey; label: string; hash: string }[] = [
  { key: "announcements", label: "Announcements", hash: "#announcements" },
  { key: "community", label: "Community", hash: "#community" },
  { key: "resources", label: "Resources", hash: "#resources" },
];

function hashToTab(hash: string): TabKey {
  const found = tabList.find((t) => t.hash === hash);
  return found ? found.key : "announcements";
}

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

  const syncFromHash = useCallback(() => {
    setTab(hashToTab(window.location.hash || "#announcements"));
  }, []);

  useEffect(() => {
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [syncFromHash]);

  const switchTab = (t: TabKey) => {
    const entry = tabList.find((x) => x.key === t);
    if (entry) {
      window.history.pushState(null, "", entry.hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    }
    setTab(t);
  };

  return (
    <>
      <div
        className="flex gap-1 mt-8 mb-2 p-1 rounded-xl w-fit"
        role="tablist"
        aria-label="Content sections"
        style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}
      >
        {tabList.map((t) => (
          <button
            key={t.key}
            role="tab"
            aria-selected={tab === t.key}
            aria-controls={`panel-${t.key}`}
            id={`tab-${t.key}`}
            onClick={() => switchTab(t.key)}
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

      <div
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
      >
        {tab === "announcements" && announcements}
        {tab === "community" && community}
        {tab === "resources" && resources}
      </div>
    </>
  );
}
