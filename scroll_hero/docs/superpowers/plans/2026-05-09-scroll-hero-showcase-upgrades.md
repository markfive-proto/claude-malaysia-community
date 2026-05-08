# Scroll Hero Showcase Upgrades — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the MarkFive scroll hero into a cinematic vibe-coding showcase with film grain, mouse parallax, ambient audio, text scramble, chapter navigation, and three new content sections.

**Architecture:** All new visual effects are additive overlays or canvas mutations on the existing scroll-jacked hero. Three new sections (Specs, Gallery, Contact) are composed in `page.tsx` after the hero. Shared utilities (`FilmGrain`, `TextScramble`, `ScrollReveal`) live in `components/`.

**Tech Stack:** Next.js App Router, Framer Motion, Tailwind CSS v4, Web Audio API, React hooks

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `components/FilmGrain.tsx` | Create | SVG turbulence filter + animated overlay |
| `components/TextScramble.tsx` | Create | Char-cycling reveal animation |
| `components/ScrollReveal.tsx` | Create | `whileInView` entry animation wrapper |
| `components/sections/SpecsSection.tsx` | Create | Stat grid + amenities with scroll reveals |
| `components/sections/GallerySection.tsx` | Create | Pinned horizontal scroll, 5 CSS-art cards |
| `components/sections/ContactSection.tsx` | Create | Floating-label form + submission state |
| `components/ScrollHero.tsx` | Modify | Add parallax, color temp, magnetic nav, audio, scramble, chapters |
| `app/globals.css` | Modify | Grain keyframes + input autofill overrides |
| `app/page.tsx` | Modify | Wire FilmGrain + three new sections |

---

### Task 1: Film Grain — global cinematic overlay

**Files:**
- Create: `components/FilmGrain.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Add grain keyframe to globals.css**

Open `app/globals.css` and append after the last rule:

```css
@keyframes grain {
  0%   { transform: translate(0, 0) }
  10%  { transform: translate(-5%, -10%) }
  20%  { transform: translate(-15%, 5%) }
  30%  { transform: translate(7%, -25%) }
  40%  { transform: translate(-5%, 25%) }
  50%  { transform: translate(-15%, 10%) }
  60%  { transform: translate(15%, 0%) }
  70%  { transform: translate(0%, 15%) }
  80%  { transform: translate(3%, 35%) }
  90%  { transform: translate(-10%, 10%) }
}

.film-grain {
  filter: url(#film-grain);
  opacity: 0.045;
  animation: grain 0.3s steps(1) infinite;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 100px #050505 inset;
  -webkit-text-fill-color: #EDE8DF;
}
```

- [ ] **Step 2: Create FilmGrain component**

Create `components/FilmGrain.tsx`:

```tsx
"use client";

export function FilmGrain() {
  return (
    <>
      <svg className="hidden" xmlns="http://www.w3.org/2000/svg">
        <filter id="film-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>
      <div className="film-grain pointer-events-none fixed inset-0 z-[9990]" />
    </>
  );
}
```

- [ ] **Step 3: Add FilmGrain to page.tsx**

Replace `app/page.tsx`:

```tsx
import { ScrollHeroClient } from "@/components/ScrollHeroClient";
import { FilmGrain } from "@/components/FilmGrain";

export default function Home() {
  return (
    <main>
      <FilmGrain />
      <ScrollHeroClient />
    </main>
  );
}
```

- [ ] **Step 4: Start dev server and verify grain is visible**

```bash
cd /Users/marcuschia/Desktop/build_factory/scroll_hero
npm run dev
```

Open http://localhost:3000. You should see a faint film-grain texture flickering over the entire page.

- [ ] **Step 5: Commit**

```bash
git add components/FilmGrain.tsx app/globals.css app/page.tsx
git commit -m "feat: add animated film grain overlay"
```

---

### Task 2: TextScramble — char-cycling title reveal

**Files:**
- Create: `components/TextScramble.tsx`

- [ ] **Step 1: Create TextScramble component**

Create `components/TextScramble.tsx`:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#";

interface Props {
  text: string;
  active?: boolean;
  className?: string;
  speed?: number;
}

export function TextScramble({ text, active = true, className, speed = 28 }: Props) {
  const [display, setDisplay] = useState(text);
  const iterRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    iterRef.current = 0;
    const total = text.length * 3;
    timerRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iterRef.current / 3) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
      iterRef.current++;
      if (iterRef.current > total) {
        clearInterval(timerRef.current!);
        setDisplay(text);
      }
    }, speed);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active, text, speed]);

  return <span className={className}>{display}</span>;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/TextScramble.tsx
git commit -m "feat: add TextScramble char-cycling component"
```

---

### Task 3: ScrollReveal — viewport entry animation wrapper

**Files:**
- Create: `components/ScrollReveal.tsx`

- [ ] **Step 1: Create ScrollReveal component**

Create `components/ScrollReveal.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}

export function ScrollReveal({
  children,
  delay = 0,
  className,
  direction = "up",
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: direction === "up" ? 32 : 0,
        x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/ScrollReveal.tsx
git commit -m "feat: add ScrollReveal whileInView wrapper"
```

---

### Task 4: Update ScrollHero — mouse parallax, color temperature, magnetic nav, ambient audio, text scramble, chapter sidebar

**Files:**
- Modify: `components/ScrollHero.tsx`

This is the largest task. Replace the entire file with the version below. Changes vs original:
- Combined mouse handler (cursor + parallax tracking)
- Canvas oversized 40px each side, shifts with `mouseParallax`
- Two new color-temp overlays (warm gold fades out, cool blue fades in)
- `MagneticItem` sub-component for nav links
- `useAmbientAudio` hook (Web Audio API)
- `TextScramble` on "MARK" / "FIVE"
- Chapter sidebar (left edge, replaces static vertical label)
- `scrambleActive` triggered 700ms after load

- [ ] **Step 1: Write the new ScrollHero.tsx**

Replace `components/ScrollHero.tsx` with:

```tsx
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { TextScramble } from "@/components/TextScramble";

const TOTAL_FRAMES = 61;
const CHAPTERS = ["ARRIVAL", "ASCENT", "THE VIEW", "RESIDENCE"];
const NAV_ITEMS = ["RESIDENCES", "GALLERY", "CONTACT"];

function padFrame(n: number) {
  return String(n).padStart(3, "0");
}

function useAmbientAudio() {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const toggle = useCallback(() => {
    if (playing) {
      if (gainRef.current && ctxRef.current) {
        gainRef.current.gain.setTargetAtTime(0, ctxRef.current.currentTime, 0.8);
        setTimeout(() => {
          ctxRef.current?.close();
          ctxRef.current = null;
          setPlaying(false);
        }, 2500);
      }
    } else {
      const ctx = new AudioContext();
      ctxRef.current = ctx;

      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(2, bufferSize, ctx.sampleRate);
      [0, 1].forEach((ch) => {
        const data = buffer.getChannelData(ch);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
      });
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const hpf = ctx.createBiquadFilter();
      hpf.type = "highpass";
      hpf.frequency.value = 1200;

      const lpf = ctx.createBiquadFilter();
      lpf.type = "lowpass";
      lpf.frequency.value = 3500;

      const compressor = ctx.createDynamicsCompressor();

      const gain = ctx.createGain();
      gainRef.current = gain;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.setTargetAtTime(0.04, ctx.currentTime, 2);

      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = 60;
      const oscGain = ctx.createGain();
      oscGain.gain.value = 0;
      oscGain.gain.setTargetAtTime(0.012, ctx.currentTime, 3.5);

      osc.connect(oscGain);
      noise.connect(hpf);
      hpf.connect(lpf);
      lpf.connect(compressor);
      compressor.connect(gain);
      oscGain.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      noise.start();
      setPlaying(true);
    }
  }, [playing]);

  useEffect(() => () => { ctxRef.current?.close(); }, []);

  return { playing, toggle };
}

function MagneticItem({
  children,
  onEnter,
  onLeave,
}: {
  children: string;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 70) {
      const strength = (1 - dist / 70) * 10;
      setOffset({
        x: (dx / Math.max(dist, 1)) * strength,
        y: (dy / Math.max(dist, 1)) * strength,
      });
    }
  }, []);

  return (
    <span
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={() => {
        setOffset({ x: 0, y: 0 });
        onLeave();
      }}
      className="font-tenor text-[10px] tracking-[0.3em] text-[#EDE8DF]/40 hover:text-[#C4A35A] cursor-none inline-block"
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition:
          "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease",
      }}
    >
      {children}
    </span>
  );
}

export function ScrollHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(1);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorRingPos, setCursorRingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrambleActive, setScrambleActive] = useState(false);
  const { playing: audioPlaying, toggle: toggleAudio } = useAmbientAudio();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.4, 0.75, 1],
    [1, 1, 0.5, 0.15]
  );
  const metaOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.8, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.72, 0.9], ["20px", "0px"]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.15, 0.35, 0.65]
  );
  const vignetteScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const warmToneOpacity = useTransform(scrollYProgress, [0, 0.5], [0.08, 0]);
  const coolToneOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 0.12]);
  const chapterSidebarOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
      setCursorRingPos({ x: e.clientX, y: e.clientY });
      setMouseParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 14,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let loaded = 0;
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${padFrame(i + 1)}.png`;
      img.onload = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
        if (i === 0) {
          const canvas = canvasRef.current;
          const ctx = canvas?.getContext("2d");
          if (canvas && ctx) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      };
      images[i] = img;
    }
    framesRef.current = images;
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const frameIndex = Math.min(
      Math.floor(progress * (TOTAL_FRAMES - 1)),
      TOTAL_FRAMES - 1
    );
    setCurrentFrame(frameIndex + 1);
    const img = framesRef.current[frameIndex];
    if (img?.complete && img.naturalWidth > 0)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    setActiveChapter(
      progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3
    );
  });

  const loaded = loadProgress >= 100;

  useEffect(() => {
    if (!loaded) return;
    const t = setTimeout(() => setScrambleActive(true), 700);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <>
      {mounted && (
        <>
          <div
            className="cursor"
            style={{
              left: cursorPos.x,
              top: cursorPos.y,
              width: isHovering ? 12 : 8,
              height: isHovering ? 12 : 8,
            }}
          />
          <div
            className="cursor-ring"
            style={{
              left: cursorRingPos.x,
              top: cursorRingPos.y,
              width: isHovering ? 52 : 36,
              height: isHovering ? 52 : 36,
              opacity: isHovering ? 0.8 : 0.5,
              transition:
                "left 0.12s ease, top 0.12s ease, width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
            }}
          />
        </>
      )}

      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#050505] flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="text-center select-none">
              <motion.p
                className="font-cormorant text-[80px] leading-none text-[#C4A35A] mb-8 tracking-[-0.03em]"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                M
              </motion.p>
              <div className="relative h-px w-52 mx-auto bg-[#C4A35A]/15 overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-[#C4A35A]"
                  style={{ width: `${loadProgress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="font-tenor text-[10px] tracking-[0.5em] text-[#C4A35A]/35 mt-5">
                {loadProgress}%
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
        <div className="sticky top-0 h-screen overflow-hidden bg-[#050505]">

          {/* Canvas with mouse parallax */}
          <canvas
            ref={canvasRef}
            width={1536}
            height={1024}
            style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              width: "calc(100% + 40px)",
              height: "calc(100% + 40px)",
              objectFit: "cover",
              display: "block",
              transform: `translate(${mouseParallax.x}px, ${mouseParallax.y}px)`,
              transition: "transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          />

          {/* Dark overlay */}
          <motion.div
            className="absolute inset-0 bg-[#050505]"
            style={{ opacity: overlayOpacity }}
          />

          {/* Warm gold — day */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: warmToneOpacity,
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(255,180,60,0.5) 0%, rgba(200,120,20,0.15) 50%, transparent 80%)",
            }}
          />

          {/* Cool blue — night */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: coolToneOpacity,
              background:
                "radial-gradient(ellipse at 40% 60%, rgba(40,80,160,0.5) 0%, rgba(20,40,100,0.15) 50%, transparent 80%)",
            }}
          />

          {/* Radial vignette */}
          <motion.div
            className="absolute inset-0"
            style={{
              scale: vignetteScale,
              background:
                "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.65) 100%)",
            }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 100%)",
            }}
          />

          {/* Top gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)",
            }}
          />

          {/* Navigation */}
          <motion.nav
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-9"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -10 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-tenor text-[11px] tracking-[0.55em] text-[#C4A35A]">
              MARKFIVE
            </div>
            <div className="flex items-center gap-9">
              {NAV_ITEMS.map((item) => (
                <MagneticItem
                  key={item}
                  onEnter={() => setIsHovering(true)}
                  onLeave={() => setIsHovering(false)}
                >
                  {item}
                </MagneticItem>
              ))}
              {/* Ambient audio toggle */}
              <button
                onClick={toggleAudio}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                className="cursor-none ml-2 relative w-8 h-8 flex items-center justify-center group"
                aria-label={audioPlaying ? "Mute ambient" : "Play ambient"}
              >
                <div
                  className={`absolute inset-0 rounded-full border transition-colors duration-500 ${
                    audioPlaying
                      ? "border-[#C4A35A]/50"
                      : "border-[#EDE8DF]/10"
                  }`}
                />
                {audioPlaying ? (
                  <div className="flex items-end gap-[2px] h-3">
                    {[0.6, 1, 0.8, 1.2, 0.5].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-[2px] bg-[#C4A35A] rounded-full"
                        style={{ height: `${h * 10}px` }}
                        animate={{ scaleY: [1, 1.5, 0.6, 1.2, 1] }}
                        transition={{
                          duration: 0.6 + i * 0.1,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.08,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    className="text-[#EDE8DF]/20 group-hover:text-[#C4A35A] transition-colors duration-300"
                  >
                    <path
                      d="M1 4H3L6 1V11L3 8H1V4Z"
                      stroke="currentColor"
                      strokeWidth="1"
                      fill="none"
                    />
                    <path
                      d="M8 3C9.2 4 9.2 8 8 9"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M9.5 1.5C11.5 3.5 11.5 8.5 9.5 10.5"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>
          </motion.nav>

          {/* Main title with TextScramble */}
          <motion.div
            className="absolute left-10 bottom-28 z-20"
            style={{ y: titleY, opacity: titleOpacity }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : -20 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-tenor text-[10px] tracking-[0.55em] text-[#C4A35A] mb-7">
              EST. 2024 — KUALA LUMPUR
            </p>
            <h1
              className="font-cormorant leading-[0.88] tracking-[-0.02em] select-none"
              style={{ fontSize: "clamp(72px, 11vw, 164px)" }}
            >
              <span className="block text-[#EDE8DF]">
                <TextScramble text="MARK" active={scrambleActive} />
              </span>
              <span className="block italic text-[#C4A35A]">
                <TextScramble text="FIVE" active={scrambleActive} speed={32} />
              </span>
            </h1>
            <motion.div style={{ opacity: metaOpacity }} className="mt-8 space-y-1">
              <p className="font-tenor text-[10px] tracking-[0.4em] text-[#EDE8DF]/40">
                WHERE LIGHT SURRENDERS TO NIGHT
              </p>
            </motion.div>
          </motion.div>

          {/* Right metadata */}
          <motion.div
            className="absolute right-10 bottom-28 z-20 text-right"
            style={{ opacity: metaOpacity }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: loaded ? 1 : 0, x: loaded ? 0 : 20 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-3">
              {[
                { label: "RESIDENCES", value: "48" },
                { label: "FLOORS", value: "38 — 65" },
                { label: "LOCATION", value: "KLCC" },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-baseline justify-end gap-3">
                  <span className="font-tenor text-[9px] tracking-[0.35em] text-[#EDE8DF]/25">
                    {label}
                  </span>
                  <span className="font-cormorant text-lg text-[#EDE8DF]/50">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Frame counter (right) */}
          <motion.div
            className="absolute right-10 top-1/2 -translate-y-1/2 z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="flex flex-col items-end gap-2">
              <div className="w-px h-16 bg-[#C4A35A]/20 relative overflow-hidden">
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-[#C4A35A]/60"
                  style={{
                    height: `${(currentFrame / TOTAL_FRAMES) * 100}%`,
                    transition: "height 0.05s linear",
                  }}
                />
              </div>
              <p className="font-tenor text-[9px] tracking-[0.3em] text-[#C4A35A]/50">
                {String(currentFrame).padStart(2, "0")}
              </p>
            </div>
          </motion.div>

          {/* Chapter sidebar (left) */}
          <motion.div
            className="absolute left-10 top-1/2 -translate-y-1/2 z-20"
            style={{ opacity: chapterSidebarOpacity }}
          >
            <div className="flex flex-col gap-4">
              {CHAPTERS.map((chapter, i) => (
                <div key={chapter} className="flex items-center gap-3">
                  <div
                    className="w-px rounded-full"
                    style={{
                      height: activeChapter === i ? "24px" : "10px",
                      background:
                        activeChapter === i
                          ? "#C4A35A"
                          : "rgba(196,163,90,0.2)",
                      transition:
                        "height 0.6s cubic-bezier(0.22,1,0.36,1), background 0.4s ease",
                    }}
                  />
                  <p
                    className="font-tenor text-[8px] tracking-[0.45em]"
                    style={{
                      color:
                        activeChapter === i
                          ? "rgba(196,163,90,0.8)"
                          : "rgba(237,232,223,0.15)",
                      transition: "color 0.4s ease",
                    }}
                  >
                    {chapter}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
            style={{ opacity: scrollHintOpacity }}
          >
            <p className="font-tenor text-[9px] tracking-[0.6em] text-[#EDE8DF]/35">
              SCROLL
            </p>
            <div className="h-12 w-px bg-[#C4A35A]/25 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 right-0 bg-[#C4A35A]"
                animate={{ y: ["-100%", "200%"] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                style={{ height: "35%" }}
              />
            </div>
          </motion.div>

          {/* Deep scroll CTA */}
          <motion.div
            className="absolute inset-x-0 bottom-20 z-20 flex flex-col items-center gap-6"
            style={{ opacity: ctaOpacity, y: ctaY }}
          >
            <p className="font-cormorant italic text-[clamp(22px,3vw,36px)] text-[#EDE8DF]/70 tracking-wide">
              A life above the clouds
            </p>
            <div className="flex items-center gap-8">
              <div className="h-px w-16 bg-[#C4A35A]/30" />
              <button
                className="font-tenor text-[10px] tracking-[0.5em] text-[#C4A35A] border border-[#C4A35A]/30 px-9 py-4 hover:bg-[#C4A35A]/8 hover:border-[#C4A35A]/60 transition-all duration-400 cursor-none"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                REGISTER INTEREST
              </button>
              <div className="h-px w-16 bg-[#C4A35A]/30" />
            </div>
          </motion.div>

          {/* Scroll progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-px bg-[#C4A35A]/10 z-20">
            <motion.div
              className="h-full bg-[#C4A35A]/60"
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
            />
          </div>

        </div>
      </div>

      {/* Vision section */}
      <section className="min-h-screen bg-[#050505] flex items-center justify-center px-10 py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <p className="font-tenor text-[10px] tracking-[0.6em] text-[#C4A35A]">
            THE VISION
          </p>
          <h2 className="font-cormorant text-[clamp(40px,6vw,88px)] leading-[0.9] tracking-[-0.02em] text-[#EDE8DF]">
            Architecture as
            <br />
            <span className="italic text-[#C4A35A]">Living Poetry</span>
          </h2>
          <p className="font-tenor text-xs tracking-[0.15em] text-[#EDE8DF]/35 leading-relaxed max-w-lg mx-auto">
            Each residence is a carefully composed dialogue between sky and city.
            Floor-to-ceiling glass frames KLCC as a living canvas — a view that
            transforms with every hour of light.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-12 bg-[#C4A35A]/30" />
            <span className="font-tenor text-[10px] tracking-[0.4em] text-[#C4A35A]/50">
              MARKFIVE · KLCC · 2024
            </span>
            <div className="h-px w-12 bg-[#C4A35A]/30" />
          </div>
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Verify in browser**

With `npm run dev` running, open http://localhost:3000. Check:
- Title "MARK FIVE" scrambles on load (chars cycle then resolve)
- Moving the mouse causes the building image to subtly shift (parallax)
- Scrolling into the first quarter shows "ARRIVAL" highlighted in chapter sidebar
- Clicking the circle button in the nav toggles ambient audio bars animation
- Deep-scrolling reveals the golden overlay early and blue shift late

- [ ] **Step 3: Commit**

```bash
git add components/ScrollHero.tsx components/TextScramble.tsx
git commit -m "feat: add parallax, scramble, magnetic nav, audio, chapters to hero"
```

---

### Task 5: Specs Section

**Files:**
- Create: `components/sections/SpecsSection.tsx`

- [ ] **Step 1: Create SpecsSection**

```bash
mkdir -p /Users/marcuschia/Desktop/build_factory/scroll_hero/components/sections
```

Create `components/sections/SpecsSection.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";
import { animate, useInView } from "framer-motion";
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

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-[#C4A35A]/8 mb-24">
          {SPECS.map(({ label, display }, i) => (
            <ScrollReveal key={label} delay={i * 0.05}>
              <div className="bg-[#050505] p-10 hover:bg-[#0d0c0a] transition-colors duration-500">
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/SpecsSection.tsx
git commit -m "feat: add SpecsSection with stat grid and amenities"
```

---

### Task 6: Gallery Section — pinned horizontal scroll

**Files:**
- Create: `components/sections/GallerySection.tsx`

The container is `500vh` tall. The strip is `500vw` wide (5 cards × 100vw). Scrolling through the container translates the strip from `0%` to `-80%` (i.e., `-400vw`), landing on card 4. `GalleryDot` is a sub-component so `useTransform` is called at the top level of a component (not inside a loop).

- [ ] **Step 1: Create GallerySection**

Create `components/sections/GallerySection.tsx`:

```tsx
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

        {/* Section header */}
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

        {/* Dot counter */}
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

        {/* Horizontal strip */}
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
              {/* Corner marks */}
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/GallerySection.tsx
git commit -m "feat: add horizontal pinned gallery section"
```

---

### Task 7: Contact Section

**Files:**
- Create: `components/sections/ContactSection.tsx`

- [ ] **Step 1: Create ContactSection**

Create `components/sections/ContactSection.tsx`:

```tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      {/* Watermark */}
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
                    focused === id
                      ? "border-[#C4A35A]/60"
                      : "border-[#EDE8DF]/8"
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
```

- [ ] **Step 2: Commit**

```bash
git add components/sections/ContactSection.tsx
git commit -m "feat: add ContactSection with floating-label form"
```

---

### Task 8: Wire all sections into page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Update page.tsx to include all sections**

Replace `app/page.tsx`:

```tsx
import { ScrollHeroClient } from "@/components/ScrollHeroClient";
import { FilmGrain } from "@/components/FilmGrain";
import { SpecsSection } from "@/components/sections/SpecsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      <FilmGrain />
      <ScrollHeroClient />
      <SpecsSection />
      <GallerySection />
      <ContactSection />
    </main>
  );
}
```

- [ ] **Step 2: Full end-to-end verification**

With `npm run dev` running, walk through the full page:

1. **Load** → loading screen with pulsing "M" and progress bar
2. **Entry** → "MARK" and "FIVE" scramble-reveal; film grain flickers on everything
3. **Scroll hero** → canvas shifts with mouse (parallax); chapter sidebar updates through ARRIVAL → ASCENT → THE VIEW → RESIDENCE; color shifts from warm gold to cool blue
4. **Audio** → clicking the circle button in nav plays ambient drone + shows animated bars
5. **Vision section** → "Architecture as Living Poetry" text block
6. **Specs section** → stat grid fades in on scroll; hover on cells darkens them
7. **Gallery section** → 5 cards scroll horizontally as you scroll vertically; dot indicators animate
8. **Contact section** → form fields float their labels on focus; submit shows "We will be in touch."

- [ ] **Step 3: Final commit**

```bash
git add app/page.tsx
git commit -m "feat: wire specs, gallery, contact sections into page"
```

---

## Post-Build Checklist

- [ ] No TypeScript errors: `npx tsc --noEmit`
- [ ] No ESLint errors: `npx eslint . --ext .ts,.tsx`
- [ ] Canvas parallax is subtle (not nauseating) — adjust multiplier from `20/14` if needed
- [ ] Film grain opacity (`0.045`) is visible but not distracting — adjust in `globals.css` if needed
- [ ] Gallery x-transform end value: `((GALLERY.length - 1) / GALLERY.length) * 100` = `80%` for 5 cards
- [ ] AudioContext created only on button click (satisfies browser autoplay policy)
