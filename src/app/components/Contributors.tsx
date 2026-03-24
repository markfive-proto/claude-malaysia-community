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
  // Count tips per contributor for leaderboard
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
    <section className="mt-14" id="contributors">
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
          04
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
          Community Tips & Techniques
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-[1fr_220px] gap-6">
        {/* Tips List */}
        <div>
          <p className="text-[0.85rem] mb-4" style={{ color: "var(--text-dim)" }}>
            Practical tips contributed by members of the{" "}
            <a
              href="https://www.facebook.com/groups/836579066085697"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              style={{ color: "var(--clay)", borderBottom: "1px solid rgba(194,90,46,0.3)" }}
            >
              Claude Malaysia Community
            </a>
            .
          </p>

          <div className="flex flex-col">
            {items.map((c, i) => {
              const tc = tagColors[c.tag] || tagColors.Workflow;
              return (
                <div
                  key={i}
                  className="group flex gap-3.5 py-4 transition-colors duration-150"
                  style={{
                    borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none",
                  }}
                >
                  {/* Number */}
                  <div
                    className="shrink-0 w-6 text-right pt-0.5"
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "11px",
                      color: "var(--text-ghost)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      {/* Avatar */}
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                        style={{
                          fontFamily: "var(--font-jetbrains), monospace",
                          background: "var(--surface-alt)",
                          color: "var(--text-dim)",
                          border: "1px solid var(--border)",
                        }}
                      >
                        {c.avatar}
                      </div>
                      <span
                        className="text-[0.82rem] font-semibold"
                        style={{ color: "var(--text-heading)" }}
                      >
                        {c.name}
                      </span>
                      {c.handle && (
                        <span className="text-[0.72rem]" style={{ color: "var(--text-ghost)" }}>
                          {c.handle}
                        </span>
                      )}
                      <span
                        className="rounded-[3px] px-1.5 py-[1px] ml-auto"
                        style={{
                          fontFamily: "var(--font-jetbrains), monospace",
                          fontSize: "8.5px",
                          fontWeight: 500,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          color: tc.color,
                          background: tc.bg,
                          border: `1px solid ${tc.border}`,
                        }}
                      >
                        {c.tag}
                      </span>
                    </div>
                    <p
                      className="text-[0.85rem] leading-[1.6]"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {c.tip}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard Sidebar */}
        <div>
          <div
            className="rounded-[10px] p-4 sticky top-[68px]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <h4
              className="mb-3 pb-2"
              style={{
                fontFamily: "var(--font-jetbrains), monospace",
                fontSize: "10px",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--ochre)",
                borderBottom: "1px solid var(--border)",
              }}
            >
              Top Contributors
            </h4>
            <div className="flex flex-col gap-2">
              {ranked.map((r, i) => (
                <div key={r.name} className="flex items-center gap-2.5">
                  <div
                    className="shrink-0 w-5 text-center"
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      fontSize: "10px",
                      fontWeight: 500,
                      color: i === 0 ? "var(--ochre)" : i < 3 ? "var(--text-dim)" : "var(--text-ghost)",
                    }}
                  >
                    {i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}`}
                  </div>
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      background: i === 0 ? "rgba(184,133,32,0.12)" : "var(--surface-alt)",
                      color: i === 0 ? "var(--ochre)" : "var(--text-dim)",
                      border: `1px solid ${i === 0 ? "rgba(184,133,32,0.25)" : "var(--border)"}`,
                    }}
                  >
                    {r.avatar}
                  </div>
                  <span
                    className="text-[0.8rem] flex-1 min-w-0 truncate"
                    style={{
                      color: "var(--text-heading)",
                      fontWeight: i === 0 ? 600 : 400,
                    }}
                  >
                    {r.name}
                  </span>
                  <span
                    className="text-[10px] shrink-0"
                    style={{
                      fontFamily: "var(--font-jetbrains), monospace",
                      color: "var(--text-ghost)",
                    }}
                  >
                    {r.count} {r.count === 1 ? "tip" : "tips"}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <a
                href="https://www.facebook.com/groups/836579066085697"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center no-underline rounded-md py-2 text-[11px] font-semibold transition-all duration-150"
                style={{
                  fontFamily: "var(--font-jetbrains), monospace",
                  color: "var(--surface)",
                  background: "var(--clay)",
                }}
              >
                + Submit a Tip
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
