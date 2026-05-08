"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const GALLERY = [
  {
    label: "THE LIVING",
    sublabel: "01 — Floor to ceiling glass",
    detail: "A horizon at your feet",
    bg: "linear-gradient(135deg, #1a1208 0%, #0d0c08 40%, #050505 100%)",
    accent:
      "linear-gradient(90deg, transparent 0%, rgba(196,163,90,0.06) 50%, transparent 100%)",
  },
  {
    label: "THE MASTER",
    sublabel: "02 — KLCC facing",
    detail: "City lights as a night light",
    bg: "linear-gradient(160deg, #080d14 0%, #050a10 50%, #050505 100%)",
    accent:
      "radial-gradient(ellipse at 30% 60%, rgba(100,150,220,0.08) 0%, transparent 60%)",
  },
  {
    label: "THE KITCHEN",
    sublabel: "03 — Bulthaup integration",
    detail: "Precision crafted",
    bg: "linear-gradient(120deg, #140f08 0%, #0a0806 50%, #050505 100%)",
    accent:
      "linear-gradient(180deg, transparent 0%, rgba(196,163,90,0.04) 100%)",
  },
  {
    label: "THE TERRACE",
    sublabel: "04 — 580M elevation",
    detail: "Above the clouds",
    bg: "linear-gradient(180deg, #020508 0%, #050810 60%, #050505 100%)",
    accent:
      "radial-gradient(ellipse at 50% 80%, rgba(80,120,200,0.1) 0%, transparent 60%)",
  },
  {
    label: "THE BATH",
    sublabel: "05 — Thassos marble",
    detail: "Stone and silence",
    bg: "linear-gradient(160deg, #0f0f0e 0%, #0a0a09 50%, #050505 100%)",
    accent:
      "radial-gradient(ellipse at 70% 30%, rgba(220,210,190,0.05) 0%, transparent 50%)",
  },
];

function GalleryDot({
  index,
  total,
  scrollYProgress,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const width = useTransform(
    scrollYProgress,
    [index / total, Math.min((index + 1) / total, 1)],
    ["8px", "28px"]
  );
  const opacity = useTransform(
    scrollYProgress,
    [
      Math.max(0, (index - 0.5) / total),
      index / total,
      Math.min((index + 1) / total, 1),
      Math.min((index + 1.5) / total, 1),
    ],
    [0.2, 1, 1, 0.2]
  );
  return (
    <motion.div
      className="h-px bg-[#C4A35A] rounded-full"
      style={{ width, opacity }}
    />
  );
}

export function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${((GALLERY.length - 1) / GALLERY.length) * 100}%`]
  );

  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${GALLERY.length * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">
        <motion.div
          className="absolute top-10 left-10 z-20"
          style={{ opacity: headerOpacity }}
        >
          <p className="font-tenor text-[10px] tracking-[0.6em] text-[#C4A35A]">
            THE INTERIORS
          </p>
          <p
            className="font-cormorant italic text-[#EDE8DF]/40 mt-2"
            style={{ fontSize: "clamp(20px,2.5vw,36px)" }}
          >
            Scroll to explore
          </p>
        </motion.div>

        <div className="absolute bottom-10 right-10 z-20 flex items-center gap-3">
          {GALLERY.map((_, i) => (
            <GalleryDot
              key={i}
              index={i}
              total={GALLERY.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.div
          className="absolute top-0 left-0 flex h-full"
          style={{ x, width: `${GALLERY.length * 100}vw` }}
        >
          {GALLERY.map(({ label, sublabel, detail, bg, accent }) => (
            <div
              key={label}
              className="relative flex-shrink-0 h-full w-screen flex items-end pb-24 px-16"
            >
              <div className="absolute inset-0" style={{ background: bg }} />
              <div className="absolute inset-0" style={{ background: accent }} />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(196,163,90,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(196,163,90,0.02) 1px, transparent 1px)",
                  backgroundSize: "80px 80px",
                }}
              />
              <div className="absolute top-12 left-12 w-8 h-8 border-l border-t border-[#C4A35A]/20" />
              <div className="absolute top-12 right-12 w-8 h-8 border-r border-t border-[#C4A35A]/20" />
              <div className="absolute bottom-12 left-12 w-8 h-8 border-l border-b border-[#C4A35A]/20" />
              <div className="absolute bottom-12 right-12 w-8 h-8 border-r border-b border-[#C4A35A]/20" />
              <div className="relative z-10">
                <p className="font-tenor text-[9px] tracking-[0.5em] text-[#C4A35A]/50 mb-4">
                  {sublabel}
                </p>
                <h3
                  className="font-cormorant leading-none tracking-[-0.02em] text-[#EDE8DF]"
                  style={{ fontSize: "clamp(40px,6vw,80px)" }}
                >
                  {label}
                </h3>
                <p className="font-cormorant italic text-xl text-[#C4A35A]/60 mt-3">
                  {detail}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
