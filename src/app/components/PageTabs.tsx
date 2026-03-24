"use client";

import { useState } from "react";

export default function PageTabs({
  announcements,
  community,
}: {
  announcements: React.ReactNode;
  community: React.ReactNode;
}) {
  const [tab, setTab] = useState<"announcements" | "community">("announcements");

  return (
    <>
      {/* Tab bar */}
      <div
        className="flex gap-1 mt-10 mb-2 p-1 rounded-xl w-fit"
        style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}
      >
        <button
          onClick={() => setTab("announcements")}
          className="cursor-pointer rounded-lg px-5 py-2.5 text-[0.88rem] font-semibold transition-all duration-150"
          style={{
            background: tab === "announcements" ? "var(--surface)" : "transparent",
            color: tab === "announcements" ? "var(--text-heading)" : "var(--text-dim)",
            boxShadow: tab === "announcements" ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
            border: tab === "announcements" ? "1px solid var(--border)" : "1px solid transparent",
          }}
        >
          Announcements & Features
        </button>
        <button
          onClick={() => setTab("community")}
          className="cursor-pointer rounded-lg px-5 py-2.5 text-[0.88rem] font-semibold transition-all duration-150"
          style={{
            background: tab === "community" ? "var(--surface)" : "transparent",
            color: tab === "community" ? "var(--text-heading)" : "var(--text-dim)",
            boxShadow: tab === "community" ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
            border: tab === "community" ? "1px solid var(--border)" : "1px solid transparent",
          }}
        >
          Community
        </button>
      </div>

      {/* Tab content */}
      <div>{tab === "announcements" ? announcements : community}</div>
    </>
  );
}
