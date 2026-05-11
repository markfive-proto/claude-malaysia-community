"use client";

import { ScrollReveal } from "@/components/ScrollReveal";

const SPECS = [
  { label: "RESIDENTIAL FLOORS", display: "38 — 65" },
  { label: "TOTAL RESIDENCES", display: "48" },
  { label: "CEILING HEIGHT", display: "3.2M" },
  { label: "POOL DECK ELEVATION", display: "580M" },
  { label: "YEAR OF COMPLETION", display: "2027" },
  { label: "GLASS FACADE", display: "100%" },
];

const AMENITIES = [
  "Infinity Sky Pool",
  "Private Cinema",
  "Wine Cellar & Tasting Room",
  "Owners' Lounge",
  "Spa & Wellness",
  "24hr Concierge",
  "Valet Parking",
  "Helipad Access",
];

export function SpecsSection() {
  return (
    <section className="bg-[#050505] px-10 py-32 relative overflow-hidden">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#C4A35A]/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <p className="font-tenor text-[10px] tracking-[0.6em] text-[#C4A35A] mb-6">
            THE SPECIFICATIONS
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-cormorant leading-[0.9] tracking-[-0.02em] text-[#EDE8DF] mb-20"
            style={{ fontSize: "clamp(40px,6vw,88px)" }}
          >
            Built to a
            <br />
            <span className="italic text-[#C4A35A]">higher standard</span>
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#C4A35A]/15 mb-24">
          {SPECS.map(({ label, display }, i) => (
            <ScrollReveal key={label} delay={i * 0.05}>
              <div className="bg-[#0a0908] p-10 hover:bg-[#111009] transition-colors duration-500">
                <div
                  className="font-cormorant text-[#C4A35A] mb-3 leading-none"
                  style={{ fontSize: "clamp(36px,4vw,60px)" }}
                >
                  {display}
                </div>
                <p className="font-tenor text-[9px] tracking-[0.45em] text-[#EDE8DF]/25">
                  {label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <p className="font-tenor text-[10px] tracking-[0.6em] text-[#C4A35A]/60 mb-10">
            EXCLUSIVE AMENITIES
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {AMENITIES.map((item, i) => (
            <ScrollReveal key={item} delay={i * 0.04}>
              <div className="flex items-start gap-3 group">
                <div className="w-px h-8 bg-[#C4A35A]/20 mt-1 group-hover:bg-[#C4A35A]/50 transition-colors duration-500 flex-shrink-0" />
                <p className="font-tenor text-[10px] tracking-[0.25em] text-[#EDE8DF]/40 group-hover:text-[#EDE8DF]/70 transition-colors duration-500">
                  {item}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
