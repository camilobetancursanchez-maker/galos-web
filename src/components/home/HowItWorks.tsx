"use client";

import { useEffect, useRef, useState } from "react";
import { home } from "@/content/site";
import { Pending } from "@/components/ui/Pending";

/**
 * 02 · How it works — three stars on one line. As you scroll, the black signal
 * travels from Ask to Hire to Grow. Section: 13_sections/01_home/02_how-it-works
 */
export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const id = requestAnimationFrame(() => setP(1));
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
        setP(Math.min(Math.max(-r.top / Math.max(total, 1), 0), 1));
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
  }, []);

  const { how } = home;
  const n = how.steps.length;
  const at = (i: number) => i / (n - 1);

  return (
    <section ref={ref} id="how" className="relative h-[260svh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="wrap">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="label eyebrow !text-ink">{how.eyebrow}</p>
              <h2 className="h2 mt-6">
                {how.title.text} <Pending note={how.title.pending} />
              </h2>
            </div>
            <p className="label num hidden md:block">{String(how.steps.filter((_, i) => p >= at(i) - 0.001).length).padStart(2, "0")} / 0{n}</p>
          </div>

          {/* Desktop: a horizontal line through three stars */}
          <div className="relative mt-20 hidden md:block">
            <div className="absolute left-0 right-0 top-[7px] h-px bg-line" />
            <div className="absolute left-0 top-[7px] h-px bg-ink" style={{ width: `${p * 100}%` }} />
            <div className="absolute top-[3px] h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-ink shadow-[0_0_0_6px_var(--color-white)]" style={{ left: `${p * 100}%` }} />
            <ol className="relative grid grid-cols-3">
              {how.steps.map((s, i) => {
                const on = p >= at(i) - 0.001;
                return (
                  <li key={s.n} className={i === 0 ? "" : i === n - 1 ? "text-right" : "text-center"}>
                    <span className={`inline-block h-[15px] w-[15px] rounded-full border transition-colors duration-500 ${on ? "border-ink bg-ink" : "border-line-strong bg-white"}`} />
                    <div className={`mt-10 transition-opacity duration-700 ${on ? "opacity-100" : "opacity-25"}`}>
                      <p className="label num">{s.n}</p>
                      <h3 className="h1 mt-3">{s.title}</h3>
                      <p className={`mt-4 max-w-[22em] text-[17px] text-muted ${i === 1 ? "mx-auto" : i === n - 1 ? "ml-auto" : ""}`}>{s.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Phone: a vertical line */}
          <ol className="relative mt-14 space-y-12 pl-10 md:hidden">
            <div className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
            <div className="absolute left-[7px] top-2 w-px bg-ink" style={{ height: `calc(${p * 100}% - 16px)` }} />
            {how.steps.map((s, i) => {
              const on = p >= at(i) - 0.001;
              return (
                <li key={s.n} className="relative">
                  <span className={`absolute -left-10 top-1.5 h-[15px] w-[15px] rounded-full border transition-colors duration-500 ${on ? "border-ink bg-ink" : "border-line-strong bg-white"}`} />
                  <div className={`transition-opacity duration-700 ${on ? "opacity-100" : "opacity-30"}`}>
                    <p className="label num">{s.n}</p>
                    <h3 className="h2 mt-2">{s.title}</h3>
                    <p className="mt-3 text-[17px] text-muted">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
