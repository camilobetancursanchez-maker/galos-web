"use client";

import { useEffect, useRef, useState } from "react";
import type { Agent } from "@/content/agents";
import { Pending } from "@/components/ui/Pending";

/**
 * Watch it work: the constellation draws itself one step at a time, the step lights up next to it.
 * Plays on its own while on screen; tap a step to jump. Section: 13_sections/03_agent-page/02_watch-it-work
 */
export function WatchItWork({ agent }: { agent: Agent }) {
  const steps = agent.steps.list;
  const n = steps.length;
  const E = agent.edges.length;
  const [active, setActive] = useState(-1);
  const [auto, setAuto] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setActive(n - 1));
      return () => cancelAnimationFrame(id);
    }
    let timer = 0;
    const io = new IntersectionObserver(([e]) => {
      window.clearInterval(timer);
      if (e.isIntersecting && auto) {
        setActive((a) => (a < 0 ? 0 : a));
        timer = window.setInterval(() => setActive((a) => (a + 1) % (n + 1)), 1900);
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearInterval(timer);
    };
  }, [auto, n]);

  const step = Math.min(active, n - 1);
  const shownEdges = active < 0 ? 0 : active >= n ? E : Math.ceil(((step + 1) / n) * E);
  const lit = new Set<number>(active < 0 ? [] : [agent.edges[0][0]]);
  agent.edges.slice(0, shownEdges).forEach(([a, b]) => {
    lit.add(a);
    lit.add(b);
  });

  return (
    <div ref={box} className="grid gap-12 md:grid-cols-12 md:items-center">
      <div className="plate relative aspect-square bg-white md:col-span-7">
        <span className="mark-b" />
        <span className="label absolute left-4 top-4">{agent.catalog} · in motion</span>
        <svg viewBox="-10 -10 120 120" className="absolute inset-[10%] h-[80%] w-[80%]" aria-label={`${agent.figure}'s constellation, drawn step by step`}>
          {agent.edges.map(([a, b], i) => {
            const [x1, y1] = agent.stars[a];
            const [x2, y2] = agent.stars[b];
            const on = i < shownEdges;
            const len = Math.hypot(x2 - x1, y2 - y1);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="#0b0b0b"
                strokeWidth={0.4}
                strokeLinecap="round"
                strokeDasharray={len}
                strokeDashoffset={on ? 0 : len}
                style={{ transition: "stroke-dashoffset 900ms var(--ease-slow)" }}
              />
            );
          })}
          {agent.stars.map(([x, y, m = 1], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={m === 3 ? 2 : m === 2 ? 1.5 : 1.1} fill={lit.has(i) ? "#0b0b0b" : "#d1d1d6"} style={{ transition: "fill 500ms" }} />
              {lit.has(i) && <circle cx={x} cy={y} r={5} fill="none" stroke="#0b0b0b" strokeWidth={0.5} vectorEffect="non-scaling-stroke" className="beat-ring" style={{ transformOrigin: `${x}px ${y}px` }} />}
            </g>
          ))}
        </svg>
      </div>
      <div className="md:col-span-5">
        <p className="label eyebrow !text-ink">
          Watch it work <Pending note={agent.steps.pending} />
        </p>
        <ol className="mt-8 border-t border-line">
          {steps.map((s, i) => {
            const on = active >= 0 && i <= step;
            return (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    setAuto(false);
                    setActive(i);
                  }}
                  className="flex w-full items-baseline gap-5 border-b border-line py-4 text-left"
                >
                  <span className={`label num w-6 transition-colors ${on ? "!text-ink" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                  <span className={`text-[19px] tracking-[-0.015em] transition-colors duration-500 ${on ? "text-ink" : "text-faint"}`}>{s}</span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
