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
        transition: "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), color 0.3s ease",
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
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4, 0.75, 1], [1, 1, 0.5, 0.15]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5], [1, 0.8, 0]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.72, 0.9], ["20px", "0px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.35, 0.65]);
  const vignetteScale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const warmToneOpacity = useTransform(scrollYProgress, [0, 0.5], [0.08, 0]);
  const coolToneOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 0.12]);
  const chapterSidebarOpacity = useTransform(scrollYProgress, [0, 0.06], [0, 1]);

  useEffect(() => { setMounted(true); }, []);

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
    const frameIndex = Math.min(Math.floor(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1);
    setCurrentFrame(frameIndex + 1);
    const img = framesRef.current[frameIndex];
    if (img?.complete && img.naturalWidth > 0)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    setActiveChapter(progress < 0.25 ? 0 : progress < 0.5 ? 1 : progress < 0.75 ? 2 : 3);
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
              transition: "left 0.12s ease, top 0.12s ease, width 0.25s ease, height 0.25s ease, opacity 0.25s ease",
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

          {/* Canvas with mouse parallax — oversized 40px each side */}
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
          <motion.div className="absolute inset-0 bg-[#050505]" style={{ opacity: overlayOpacity }} />

          {/* Warm gold — dawn */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: warmToneOpacity,
              background: "radial-gradient(ellipse at 60% 40%, rgba(255,180,60,0.5) 0%, rgba(200,120,20,0.15) 50%, transparent 80%)",
            }}
          />

          {/* Cool blue — night */}
          <motion.div
            className="absolute inset-0"
            style={{
              opacity: coolToneOpacity,
              background: "radial-gradient(ellipse at 40% 60%, rgba(40,80,160,0.5) 0%, rgba(20,40,100,0.15) 50%, transparent 80%)",
            }}
          />

          {/* Radial vignette */}
          <motion.div
            className="absolute inset-0"
            style={{
              scale: vignetteScale,
              background: "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 30%, rgba(5,5,5,0.65) 100%)",
            }}
          />

          {/* Bottom gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-56 pointer-events-none"
            style={{ background: "linear-gradient(to top, rgba(5,5,5,0.95) 0%, transparent 100%)" }}
          />

          {/* Top gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, rgba(5,5,5,0.8) 0%, transparent 100%)" }}
          />

          {/* Navigation */}
          <motion.nav
            className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-10 pt-9"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: loaded ? 1 : 0, y: loaded ? 0 : -10 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-tenor text-[11px] tracking-[0.55em] text-[#C4A35A]">MARKFIVE</div>
            <div className="flex items-center gap-9">
              {NAV_ITEMS.map((item) => (
                <MagneticItem key={item} onEnter={() => setIsHovering(true)} onLeave={() => setIsHovering(false)}>
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
                <div className={`absolute inset-0 rounded-full border transition-colors duration-500 ${audioPlaying ? "border-[#C4A35A]/50" : "border-[#EDE8DF]/10"}`} />
                {audioPlaying ? (
                  <div className="flex items-end gap-[2px] h-3">
                    {[0.6, 1, 0.8, 1.2, 0.5].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-[2px] bg-[#C4A35A] rounded-full"
                        style={{ height: `${h * 10}px` }}
                        animate={{ scaleY: [1, 1.5, 0.6, 1.2, 1] }}
                        transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }}
                      />
                    ))}
                  </div>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="text-[#EDE8DF]/20 group-hover:text-[#C4A35A] transition-colors duration-300">
                    <path d="M1 4H3L6 1V11L3 8H1V4Z" stroke="currentColor" strokeWidth="1" fill="none" />
                    <path d="M8 3C9.2 4 9.2 8 8 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
                    <path d="M9.5 1.5C11.5 3.5 11.5 8.5 9.5 10.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
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
                  <span className="font-tenor text-[9px] tracking-[0.35em] text-[#EDE8DF]/25">{label}</span>
                  <span className="font-cormorant text-lg text-[#EDE8DF]/50">{value}</span>
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
                  style={{ height: `${(currentFrame / TOTAL_FRAMES) * 100}%`, transition: "height 0.05s linear" }}
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
                      background: activeChapter === i ? "#C4A35A" : "rgba(196,163,90,0.2)",
                      transition: "height 0.6s cubic-bezier(0.22,1,0.36,1), background 0.4s ease",
                    }}
                  />
                  <p
                    className="font-tenor text-[8px] tracking-[0.45em]"
                    style={{
                      color: activeChapter === i ? "rgba(196,163,90,0.8)" : "rgba(237,232,223,0.15)",
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
            <p className="font-tenor text-[9px] tracking-[0.6em] text-[#EDE8DF]/35">SCROLL</p>
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
          <p className="font-tenor text-[10px] tracking-[0.6em] text-[#C4A35A]">THE VISION</p>
          <h2 className="font-cormorant text-[clamp(40px,6vw,88px)] leading-[0.9] tracking-[-0.02em] text-[#EDE8DF]">
            Architecture as<br />
            <span className="italic text-[#C4A35A]">Living Poetry</span>
          </h2>
          <p className="font-tenor text-xs tracking-[0.15em] text-[#EDE8DF]/35 leading-relaxed max-w-lg mx-auto">
            Each residence is a carefully composed dialogue between sky and city.
            Floor-to-ceiling glass frames KLCC as a living canvas — a view
            that transforms with every hour of light.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <div className="h-px w-12 bg-[#C4A35A]/30" />
            <span className="font-tenor text-[10px] tracking-[0.4em] text-[#C4A35A]/50">MARKFIVE · KLCC · 2024</span>
            <div className="h-px w-12 bg-[#C4A35A]/30" />
          </div>
        </div>
      </section>
    </>
  );
}
