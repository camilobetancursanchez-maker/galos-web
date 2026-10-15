"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { home } from "@/content/site";
import { Starfield } from "@/components/sky/Starfield";
import { Pending } from "@/components/ui/Pending";

/**
 * 01 · Hero — the grid that becomes a sky. The corners read like a star chart:
 * the coordinates follow the cursor. Section: 13_sections/01_home/01_hero
 */
export function Hero() {
  const coords = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = coords.current;
    if (!el) return;
    const on = (e: PointerEvent) => {
      const ra = (e.clientX / window.innerWidth) * 24;
      const dec = 90 - (e.clientY / window.innerHeight) * 180;
      const h = Math.floor(ra), m = Math.floor((ra - h) * 60);
      const d = Math.trunc(dec), dm = Math.floor(Math.abs(dec - d) * 60);
      el.textContent = `RA ${String(h).padStart(2, "0")}h ${String(m).padStart(2, "0")}m · Dec ${dec >= 0 ? "+" : "−"}${String(Math.abs(d)).padStart(2, "0")}° ${String(dm).padStart(2, "0")}′`;
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);

  const { hero } = home;
  return (
    <section className="relative h-[100svh] min-h-[640px] overflow-hidden bg-white">
      <div className="absolute inset-0">
        <Starfield mode="lattice" seed={21} />
      </div>
      {/* soft white center so the words always read */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(42%_34%_at_50%_50%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.75)_55%,rgba(255,255,255,0)_100%)]" />

      {/* the chart frame */}
      <div className="pointer-events-none absolute inset-3 top-[72px] md:inset-6 md:top-20">
        <div className="plate h-full w-full border-line/70">
          <span className="mark-b" />
        </div>
        <div className="label absolute left-4 top-3 md:left-5 md:top-4">{hero.eyebrow} · Vol. I</div>
        <div className="label absolute right-4 top-3 hidden md:right-5 md:top-4 sm:block">Cat. GLS-001 — GLS-010</div>
        <div className="label absolute bottom-3 left-4 md:bottom-4 md:left-5">
          <span ref={coords} className="num">RA 00h 00m · Dec +00° 00′</span>
        </div>
        <div className="label absolute bottom-3 left-1/2 hidden -translate-x-1/2 md:bottom-4 md:block">Move to find the order</div>
      </div>

      <div className="wrap relative flex h-full flex-col items-center justify-center px-7 text-center">
        <p className="label eyebrow rise !text-ink" style={{ animationDelay: "900ms" }}>
          {hero.eyebrow}
        </p>
        <h1 className="display rise mt-6 max-w-[11ch]" style={{ animationDelay: "1100ms" }}>
          {hero.title.text}
        </h1>
        <p className="lead rise mx-auto mt-6 max-w-[34em]" style={{ animationDelay: "1300ms" }}>
          {hero.sub.text} <Pending note={hero.sub.pending} align="center" />
        </p>
        <div className="rise mt-10 flex flex-col items-center gap-3 sm:flex-row" style={{ animationDelay: "1500ms" }}>
          <Link href="/ask" className="btn btn-ink btn-lg">Ask Galos what I need</Link>
          <Link href="/agents" className="btn btn-line btn-lg">See the Collection</Link>
        </div>
      </div>

    </section>
  );
}
