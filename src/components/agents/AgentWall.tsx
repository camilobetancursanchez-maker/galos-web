"use client";

import { useEffect, useState } from "react";
import { copy } from "@/content";
import type { Wing } from "@/content/agents";
import { useLang } from "@/lib/useLang";
import { AgentCard } from "./AgentCard";

/** Every worker's wall, filtered by wing. Section: 13_sections/02_workers/02_wings-and-filters */
export function AgentWall({ figures, initial = "All" }: { figures: Record<string, string | undefined>; initial?: Wing | "All" }) {
  const lang = useLang();
  const { agents, wings, wingOf, ui } = copy(lang);
  const [wing, setWing] = useState<Wing | "All">(initial);
  // ?wing=Attract from the home page's wing links (read here so the page can be static)
  useEffect(() => {
    const w = new URLSearchParams(window.location.search).get("wing");
    const found = wings.find((x) => x.name === w)?.name;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- the URL is only known in the browser
    if (found) setWing(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const shown = wing === "All" ? agents : agents.filter((a) => a.wing === wing);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={ui.wall.filter}>
        {(["All", ...wings.map((w) => w.name)] as const).map((w) => (
          <button key={w} type="button" className="chip" aria-pressed={wing === w} onClick={() => setWing(w)}>
            {w === "All" ? ui.wall.all : wingOf(w)?.label}
            <span className="num text-[12px] opacity-50">{w === "All" ? agents.length : agents.filter((x) => x.wing === w).length}</span>
          </button>
        ))}
      </div>
      {wing !== "All" && (
        <p className="mt-6 text-muted">
          <span className="font-semibold text-ink">{wingOf(wing)?.label}</span> · {wingOf(wing)?.plain}. &ldquo;{wingOf(wing)?.problem}&rdquo;
        </p>
      )}
      <div key={wing} className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {shown.map((a, i) => (
          <AgentCard key={a.slug} lang={lang} agent={a} src={figures[a.slug]} delay={i % 3} />
        ))}
      </div>
    </div>
  );
}
