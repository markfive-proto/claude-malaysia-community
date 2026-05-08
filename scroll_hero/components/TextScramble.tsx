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
