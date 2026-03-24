import type { Quote } from "../data";

const platformColors: Record<string, string> = {
  reddit: "var(--reddit)",
  twitter: "var(--twitter)",
  hn: "var(--hn)",
};

const sentimentBorders: Record<string, string> = {
  praise: "var(--positive)",
  complaint: "var(--negative)",
  mixed: "var(--neutral)",
};

export default function Sentiment({ quotes }: { quotes: Quote[] }) {
  return (
    <section className="mt-14" id="sentiment">
      <SectionHead num="03" title="Community Sentiment" />

      <p className="text-[0.85rem] mb-5" style={{ color: "var(--text-dim)" }}>
        Aggregated from 500+ Reddit developer responses, Twitter/X threads, and Hacker News
        discussions — March 2026.
      </p>

      {/* Quick Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-7">
        <div className="rounded-[10px] p-[18px_20px]" style={{ background: "rgba(29,155,240,0.04)", border: "1px solid rgba(29,155,240,0.12)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span style={{ fontWeight: 700, fontSize: "13px", color: "var(--text-heading)" }}>&#119831;</span>
            <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--twitter)" }}>
              Twitter/X Pulse
            </span>
          </div>
          <p className="text-[0.85rem] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-heading)" }}>Mostly positive.</strong> Developers praise Computer Use and Dispatch launches. Voice mode and Channels getting organic viral traction. Main complaints: quota limits and Opus access restrictions for third-party tools.
          </p>
        </div>
        <div className="rounded-[10px] p-[18px_20px]" style={{ background: "rgba(255,69,0,0.04)", border: "1px solid rgba(255,69,0,0.12)" }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[13px]">💬</span>
            <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--reddit)" }}>
              Reddit Pulse
            </span>
          </div>
          <p className="text-[0.85rem] leading-[1.55]" style={{ color: "var(--text-secondary)" }}>
            <strong style={{ color: "var(--text-heading)" }}>Polarized.</strong> r/ClaudeAI agrees Claude Code wins on quality (67% blind tests) but frustration over rate limits dominates discussion. The $200/mo Max plan is seen as too expensive for daily use. March 2x promo helped but didn&apos;t resolve root issue.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-7">
        <StatCard value="67%" color="var(--positive)" label="Blind Test Wins" sub="Code quality vs. competitors" />
        <StatCard value="4x" color="var(--ochre)" label="Discussion Volume" sub="More mentions than any rival" />
        <StatCard value="46%" color="var(--text-heading)" label='"Most Loved"' sub="VS Code Marketplace (8 months)" />
      </div>

      {/* Bar */}
      <div className="rounded-[10px] p-[18px_20px] mb-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="mb-2.5" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-dim)" }}>
          Overall Reddit Sentiment Distribution
        </div>
        <div className="h-2.5 rounded-[5px] overflow-hidden flex gap-[2px]">
          <div className="rounded-l-[5px]" style={{ width: "45%", background: "var(--positive)" }} />
          <div style={{ width: "22%", background: "var(--neutral)" }} />
          <div className="rounded-r-[5px]" style={{ width: "33%", background: "var(--negative)" }} />
        </div>
        <div className="flex gap-5 mt-2.5 text-[0.78rem]" style={{ color: "var(--text-dim)" }}>
          <span className="flex items-center gap-[5px]"><span className="w-2 h-2 rounded-sm shrink-0" style={{ background: "var(--positive)" }} /> Positive (45%)</span>
          <span className="flex items-center gap-[5px]"><span className="w-2 h-2 rounded-sm shrink-0" style={{ background: "var(--neutral)" }} /> Neutral (22%)</span>
          <span className="flex items-center gap-[5px]"><span className="w-2 h-2 rounded-sm shrink-0" style={{ background: "var(--negative)" }} /> Negative (33%)</span>
        </div>
      </div>

      {/* Verdict */}
      <div className="rounded-r-[10px] p-[20px_24px] mb-7" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: "4px solid var(--ochre)" }}>
        <div className="mb-2" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ochre)" }}>
          Community Verdict
        </div>
        <div style={{ fontFamily: "var(--font-newsreader), serif", fontSize: "1.05rem", color: "var(--text-heading)", lineHeight: 1.55, fontStyle: "italic" }}>
          &ldquo;Higher quality but unusable&rdquo; vs. &ldquo;slightly lower quality but actually usable&rdquo; — the defining tension. Reddit consensus: best-in-class code quality, worst-in-class quota experience.
        </div>
      </div>

      {/* Quotes */}
      <div className="flex flex-col gap-3">
        {quotes.map((q, i) => (
          <div
            key={i}
            className="rounded-[10px] p-[18px_22px] relative transition-[border-color] duration-150 hover:border-[var(--border-strong)]"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", borderLeft: `3px solid ${sentimentBorders[q.sentiment]}` }}
          >
            <div className="flex justify-between items-center mb-2">
              <span
                className="flex items-center gap-[5px] text-[10px] uppercase"
                style={{ fontFamily: "var(--font-jetbrains), monospace", letterSpacing: "0.08em", color: platformColors[q.platform] }}
              >
                {q.platform === "twitter" && <span style={{ fontWeight: 700, fontSize: "11px" }}>&#119831;</span>}
                {q.platformLabel}
              </span>
              {q.votes && (
                <span style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", color: "var(--text-ghost)" }}>
                  {q.votes}
                </span>
              )}
            </div>
            <div style={{ fontFamily: "var(--font-newsreader), serif", fontStyle: "italic", fontSize: "0.95rem", color: "var(--text-heading)", lineHeight: 1.55 }}>
              &ldquo;{q.text}&rdquo;
            </div>
            <div className="mt-1.5 text-[0.78rem]" style={{ color: "var(--text-ghost)" }}>— {q.author}</div>
          </div>
        ))}
      </div>

      {/* Love / Hate */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">
        <ThemeCol type="love" title="What Developers Love" items={[
          "200K context for large codebase analysis",
          "Surgical precision in file selection",
          "MCP (Model Context Protocol) extensibility",
          "59% SWE-bench score — best in class",
          "Multi-file refactoring & dependency tracking",
          'Writing quality "less AI-smelly, more human"',
          'Artifacts = "gamechanger" for prototyping',
          "Plugin ecosystem & hooks system",
        ]} />
        <ThemeCol type="pain" title="What Developers Hate" items={[
          "Usage limits burn in 1–2 complex prompts",
          "Heavy usage costs $150–200/mo on Max",
          "Opaque billing — unclear which limit hit",
          "METR: users 19% slower due to limit friction",
          "Opus restricted from third-party tools",
          "March 2 global outage — dependency risk",
          "Over-cautious creative/roleplay refusals",
          "No native image generation capability",
        ]} />
      </div>
    </section>
  );
}

function StatCard({ value, color, label, sub }: { value: string; color: string; label: string; sub: string }) {
  return (
    <div className="rounded-[10px] p-[22px_20px] text-center" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 600, fontSize: "2.4rem", lineHeight: 1, color }}>{value}</div>
      <div className="mt-1" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-dim)" }}>{label}</div>
      <div className="mt-0.5 text-[0.75rem]" style={{ color: "var(--text-ghost)" }}>{sub}</div>
    </div>
  );
}

function ThemeCol({ type, title, items }: { type: "love" | "pain"; title: string; items: string[] }) {
  const dotColor = type === "love" ? "var(--positive)" : "var(--negative)";
  const headColor = type === "love" ? "var(--positive)" : "var(--negative)";
  return (
    <div className="rounded-[10px] p-[20px_22px]" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h4 className="mb-3.5 pb-2" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: headColor, borderBottom: "1px solid var(--border)" }}>
        {title}
      </h4>
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-[9px] py-1.5 text-[0.85rem] leading-[1.5]" style={{ color: "var(--text-secondary)" }}>
          <span className="w-[5px] h-[5px] rounded-full shrink-0 mt-[7px]" style={{ background: dotColor, opacity: 0.45 }} />
          {item}
        </div>
      ))}
    </div>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-7 pb-3.5" style={{ borderBottom: "1px solid var(--border)" }}>
      <div className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg" style={{ fontFamily: "var(--font-jetbrains), monospace", fontSize: "10px", fontWeight: 500, color: "var(--clay)", letterSpacing: "0.08em", border: "1.5px solid var(--border-strong)", background: "var(--surface)" }}>
        {num}
      </div>
      <h2 className="text-[1.4rem]" style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 500, color: "var(--text-heading)", letterSpacing: "-0.01em" }}>
        {title}
      </h2>
    </div>
  );
}
