"use client";

import { useEffect, useState, type RefObject } from "react";

/** Scroll helpers for the How it works section (HowItWorks.tsx). */

export const clamp01 = (v: number) => Math.min(Math.max(v, 0), 1);
export const ease = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
const seg = (p: number, a: number, b: number) => clamp01((p - a) / (b - a));

/**
 * One scroll timeline for the three stages: each stage plays its own scene,
 * and the signal travels between them (leg1 = Ask → Hire, leg2 = Hire → Grow).
 * Grow ends a little before the bottom so the final picture rests on screen.
 */
export function timeline(p: number) {
  return {
    ask: seg(p, 0.02, 0.28),
    leg1: seg(p, 0.28, 0.36),
    hire: seg(p, 0.36, 0.62),
    leg2: seg(p, 0.62, 0.7),
    grow: seg(p, 0.7, 0.94),
    stage: p < 0.32 ? 0 : p < 0.66 ? 1 : 2,
  };
}

/** Day 0–7 of "working in about 7 days", from the Hire stage */
export const daysOf = (hire: number) => Math.min(7, Math.floor(clamp01((hire - 0.05) / 0.85) * 7.999));

/** 0 → 1 while the tall section scrolls past its sticky frame. Reduced motion: 1, no scrolling scene. */
export function useSectionProgress(ref: RefObject<HTMLElement | null>) {
  const [p, setP] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => {
        setReduce(true);
        setP(1);
      });
      return () => cancelAnimationFrame(id);
    }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        setP(clamp01(-r.top / Math.max(total, 1)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [ref]);

  return { p, reduce };
}
