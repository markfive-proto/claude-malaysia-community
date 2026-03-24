"use client";

import { useEffect, useState } from "react";

type BannerState = {
  ended: boolean;
  isPeak: boolean;
  countdown: string;
};

function getState(): BannerState {
  const promoEnd = new Date("2026-03-27T23:59:59-04:00");
  const now = new Date();

  if (now > promoEnd) {
    return { ended: true, isPeak: false, countdown: "" };
  }

  // Convert to ET (UTC-4 for EDT in March)
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const etNow = new Date(utcMs + -4 * 3600000);
  const hour = etNow.getHours();
  const isPeak = hour >= 8 && hour < 14;

  if (isPeak) {
    const peakEnd = new Date(etNow);
    peakEnd.setHours(14, 0, 0, 0);
    const diff = peakEnd.getTime() - etNow.getTime();
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    return { ended: false, isPeak: true, countdown: `2x resumes in ${h}h ${m}m` };
  }

  const peakStart = new Date(etNow);
  if (hour >= 14) peakStart.setDate(peakStart.getDate() + 1);
  peakStart.setHours(8, 0, 0, 0);
  const diff = peakStart.getTime() - etNow.getTime();
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  return { ended: false, isPeak: false, countdown: `2x for ${h}h ${m}m more` };
}

export default function PromoBanner() {
  const [state, setState] = useState<BannerState | null>(null);

  useEffect(() => {
    setState(getState());
    const id = setInterval(() => setState(getState()), 60000);
    return () => clearInterval(id);
  }, []);

  if (!state) return null;

  if (state.ended) {
    return (
      <div
        className="px-5 py-4"
        style={{ background: "var(--surface-alt)", borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[860px] mx-auto flex items-center gap-4 flex-wrap">
        <span className="text-[22px] shrink-0">&#9200;</span>
        <div className="flex-1 min-w-[200px]">
          <div className="font-bold text-[0.9rem]" style={{ color: "var(--text-heading)" }}>
            2x Promotion Ended
          </div>
          <div className="text-[0.8rem]" style={{ color: "var(--text-secondary)" }}>
            The March 13–27 doubled usage promotion has ended. Stay tuned for future promotions.
          </div>
        </div>
        <div
          className="flex items-center gap-[7px] rounded-md px-3 py-[5px] text-[11px] font-medium whitespace-nowrap"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            background: "var(--surface-alt)",
            color: "var(--text-dim)",
            border: "1px solid var(--border)",
          }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full shrink-0"
            style={{ background: "var(--text-dim)" }}
          />
          Ended
        </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-5 py-4"
      style={{
        background: "linear-gradient(135deg, #fef9ec 0%, #fdf3d7 100%)",
        borderBottom: "1px solid rgba(217,119,6,0.2)",
      }}
    >
      <div className="max-w-[860px] mx-auto flex items-center gap-4 flex-wrap">
      <span className="text-[22px] shrink-0">&#9889;</span>
      <div className="flex-1 min-w-[200px]">
        <div className="font-bold text-[0.9rem]" style={{ color: "var(--text-heading)" }}>
          2x Usage Limits Active
        </div>
        <div className="text-[0.8rem]" style={{ color: "var(--text-secondary)" }}>
          March 13–27: doubled quotas across all plans during off-peak hours (outside 8 AM – 2 PM
          ET). Free users included.
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <div
          className="flex items-center gap-[7px] rounded-md px-3 py-[5px] text-[11px] font-medium whitespace-nowrap"
          style={{
            fontFamily: "var(--font-jetbrains), monospace",
            background: state.isPeak ? "rgba(220,38,38,0.06)" : "rgba(22,163,74,0.1)",
            color: state.isPeak ? "var(--negative)" : "var(--positive)",
            border: `1px solid ${state.isPeak ? "rgba(220,38,38,0.15)" : "rgba(22,163,74,0.2)"}`,
          }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full shrink-0"
            style={{
              background: state.isPeak ? "var(--negative)" : "var(--positive)",
              animation: state.isPeak ? "pulse-red 2s ease-in-out infinite" : "pulse-green 2s ease-in-out infinite",
            }}
          />
          {state.isPeak ? "Peak hours — standard limits" : "2x active now"}
        </div>
        <span
          className="text-[11px] whitespace-nowrap"
          style={{ fontFamily: "var(--font-jetbrains), monospace", color: "var(--text-dim)" }}
        >
          {state.countdown}
        </span>
      </div>
      </div>
    </div>
  );
}
