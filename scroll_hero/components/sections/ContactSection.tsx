"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";

const FIELDS = [
  { id: "name", label: "FULL NAME", type: "text" },
  { id: "email", label: "EMAIL ADDRESS", type: "email" },
  { id: "phone", label: "PHONE NUMBER", type: "tel" },
] as const;

export function ContactSection() {
  const [focused, setFocused] = useState<string | null>(null);
  const [values, setValues] = useState({ name: "", email: "", phone: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const isFloating = (id: string) =>
    focused === id || values[id as keyof typeof values].length > 0;

  return (
    <section className="min-h-screen bg-[#050505] px-10 py-32 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <p
          className="font-cormorant text-[#C4A35A]/[0.02] leading-none tracking-[-0.05em]"
          style={{ fontSize: "20vw" }}
        >
          MARK FIVE
        </p>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <ScrollReveal>
          <p className="font-tenor text-[10px] tracking-[0.6em] text-[#C4A35A] mb-6">
            REGISTER INTEREST
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            className="font-cormorant leading-[0.9] tracking-[-0.02em] text-[#EDE8DF] mb-4"
            style={{ fontSize: "clamp(40px,6vw,88px)" }}
          >
            Reserve your
            <br />
            <span className="italic text-[#C4A35A]">place above</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-tenor text-[10px] tracking-[0.3em] text-[#EDE8DF]/25 mb-16 leading-relaxed">
            Priority access for registered interests · Exclusive pre-launch pricing
          </p>
        </ScrollReveal>

        {submitted ? (
          <ScrollReveal>
            <div className="text-center py-20 space-y-4">
              <div className="w-px h-16 bg-[#C4A35A]/40 mx-auto" />
              <p
                className="font-cormorant italic text-[#C4A35A]"
                style={{ fontSize: "clamp(24px,3vw,40px)" }}
              >
                We will be in touch.
              </p>
              <p className="font-tenor text-[10px] tracking-[0.4em] text-[#EDE8DF]/25">
                MARKFIVE · KLCC · 2024
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <form onSubmit={handleSubmit}>
            {FIELDS.map(({ id, label, type }, i) => (
              <ScrollReveal key={id} delay={0.1 * i}>
                <div
                  className={`relative border-b pb-1 mb-1 transition-colors duration-500 ${
                    focused === id ? "border-[#C4A35A]/60" : "border-[#EDE8DF]/8"
                  }`}
                >
                  <label
                    htmlFor={id}
                    className="absolute font-tenor text-[9px] tracking-[0.5em] pointer-events-none transition-all duration-300"
                    style={{
                      top: isFloating(id) ? "12px" : "24px",
                      color: isFloating(id)
                        ? "rgba(196,163,90,0.6)"
                        : "rgba(237,232,223,0.2)",
                    }}
                  >
                    {label}
                  </label>
                  <input
                    id={id}
                    type={type}
                    required
                    value={values[id]}
                    onFocus={() => setFocused(id)}
                    onBlur={() => setFocused(null)}
                    onChange={(e) =>
                      setValues((v) => ({ ...v, [id]: e.target.value }))
                    }
                    className="w-full bg-transparent pt-10 pb-4 font-cormorant text-lg text-[#EDE8DF] outline-none"
                    style={{ caretColor: "#C4A35A" }}
                  />
                </div>
              </ScrollReveal>
            ))}

            <ScrollReveal delay={0.3}>
              <div className="pt-12 flex items-center gap-8">
                <div className="h-px flex-1 bg-[#C4A35A]/15" />
                <button
                  type="submit"
                  className="font-tenor text-[10px] tracking-[0.5em] text-[#C4A35A] border border-[#C4A35A]/30 px-12 py-5 hover:bg-[#C4A35A]/8 hover:border-[#C4A35A]/60 transition-all duration-400 cursor-none"
                >
                  REGISTER
                </button>
                <div className="h-px flex-1 bg-[#C4A35A]/15" />
              </div>
            </ScrollReveal>
          </form>
        )}

        <ScrollReveal delay={0.4}>
          <div className="mt-32 pt-12 border-t border-[#EDE8DF]/5">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="font-tenor text-[9px] tracking-[0.5em] text-[#C4A35A]">
                MARKFIVE
              </p>
              <p className="font-tenor text-[9px] tracking-[0.3em] text-[#EDE8DF]/15">
                KUALA LUMPUR CITY CENTRE · MALAYSIA
              </p>
              <p className="font-tenor text-[9px] tracking-[0.3em] text-[#EDE8DF]/15">
                © 2024 MARKFIVE RESIDENCES
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
