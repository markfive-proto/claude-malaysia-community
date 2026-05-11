"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const GALLERY = [
  {
    label: "THE LIVING",
    sublabel: "01 — Floor to ceiling glass",
    detail: "A horizon at your feet",
    frame: "/frames/frame_008.png",
  },
  {
    label: "THE MASTER",
    sublabel: "02 — KLCC facing",
    detail: "City lights as a night light",
    frame: "/frames/frame_018.png",
  },
  {
    label: "THE KITCHEN",
    sublabel: "03 — Bulthaup integration",
    detail: "Precision crafted",
    frame: "/frames/frame_030.png",
  },
  {
    label: "THE TERRACE",
    sublabel: "04 — 580M elevation",
    detail: "Above the clouds",
    frame: "/frames/frame_045.png",
  },
  {
    label: "THE BATH",
    sublabel: "05 — Thassos marble",
    detail: "Stone and silence",
    frame: "/frames/frame_058.png",
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
          {GALLERY.map(({ label, sublabel, detail, frame }) => (
            <div
              key={label}
              className="relative flex-shrink-0 h-full w-screen flex items-end pb-24 px-16"
            >
              {/* Frame photo background */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${frame})` }}
              />
              {/* Gradient overlay for text legibility */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(5,5,5,0.92) 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.15) 100%)",
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
