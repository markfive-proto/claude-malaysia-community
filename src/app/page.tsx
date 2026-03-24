import PromoBanner from "./components/PromoBanner";
import StickyNav from "./components/StickyNav";
import Timeline from "./components/Timeline";
import Contributors from "./components/Contributors";
import Resources from "./components/Resources";
import PageTabs from "./components/PageTabs";
import { timeline, platformUpdates, contributors, resources, sources } from "./data";

export default function Home() {
  return (
    <>
      <StickyNav />
      {/* Promo Banner — full width */}
      <div className="pt-[56px]">
        <PromoBanner />
      </div>

      <main className="max-w-[860px] mx-auto px-6">
        {/* Header */}
        <header className="pt-12 pb-8" style={{ borderBottom: "1px solid var(--border)" }}>
          <div
            className="flex items-center gap-2.5 mb-4"
            style={{
              fontFamily: "var(--font-jetbrains), monospace",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--clay)",
            }}
          >
            <span className="w-6 h-[2px] rounded-sm" style={{ background: "var(--clay)" }} />
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--sage)", animation: "pulse-dot 2.5s ease-in-out infinite" }}
            />
            Live Community Pulse
          </div>
          <h1
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontWeight: 500,
              fontSize: "clamp(2.4rem, 5.5vw, 3.6rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              color: "var(--text-heading)",
              marginBottom: "14px",
            }}
          >
            Claude Malaysia Community{" "}
            <em style={{ fontStyle: "italic", fontWeight: 400, color: "var(--clay)" }}>
              Pulse Check
            </em>
          </h1>
          <p
            className="max-w-[560px] text-[0.95rem] leading-[1.7]"
            style={{ color: "var(--text-secondary)" }}
          >
            Feature releases, team announcements, and real community sentiment from Reddit,
            Twitter/X, and Hacker News — March 2026.
          </p>
        </header>

        {/* Tabs */}
        <PageTabs
          announcements={
            <>
              <Timeline items={timeline} platformItems={platformUpdates} />
              {/* Sources */}
              <section className="mt-14 pt-6" id="sources" style={{ borderTop: "1px solid var(--border)" }}>
                <h3
                  className="mb-3.5"
                  style={{
                    fontFamily: "var(--font-jetbrains), monospace",
                    fontSize: "10px",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-dim)",
                  }}
                >
                  Sources
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {sources.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline transition-all duration-150 hover:text-[var(--clay)] hover:border-[var(--clay-mid)] hover:bg-[var(--clay-light)]"
                      style={{
                        fontFamily: "var(--font-jetbrains), monospace",
                        fontSize: "10.5px",
                        color: "var(--text-dim)",
                        padding: "5px 10px",
                        border: "1px solid var(--border)",
                        borderRadius: "5px",
                        background: "var(--surface)",
                      }}
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </section>
            </>
          }
          community={
            <Contributors items={contributors} />
          }
          resources={
            <Resources items={resources} />
          }
        />

        {/* Footer */}
        <footer
          className="mt-10 pt-7 pb-12 flex justify-between items-center flex-wrap gap-3"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <div
            className="text-[11px]"
            style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--text-ghost)" }}
          >
            Founded by{" "}
            <a
              href="https://www.linkedin.com/in/marcusmark5/"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              style={{ color: "var(--text-dim)", borderBottom: "1px solid var(--border)" }}
            >
              Marcus Chia
            </a>{" "}
            &middot;{" "}
            <a
              href="https://www.facebook.com/groups/836579066085697"
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              style={{ color: "var(--clay)", borderBottom: "1px solid rgba(194,90,46,0.3)" }}
            >
              Join the Community
            </a>
          </div>
          <div
            style={{
              fontFamily: "var(--font-newsreader), serif",
              fontSize: "15px",
              color: "var(--text-dim)",
              fontStyle: "italic",
            }}
          >
            Claude Malaysia Community
          </div>
        </footer>
      </main>
    </>
  );
}
