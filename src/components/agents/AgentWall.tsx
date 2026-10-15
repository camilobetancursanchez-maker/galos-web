"use client";

import { useEffect, useState } from "react";
import { agents, wings, type Wing } from "@/content/agents";
import { AgentCard } from "./AgentCard";

/** Every worker's wall, filtered by wing. Section: 13_sections/02_workers/02_wings-and-filters */
export function AgentWall({ figures, initial = "All" }: { figures: Record<string, string | undefined>; initial?: Wing | "All" }) {
  const [wing, setWing] = useState<Wing | "All">(initial);
  // ?wing=Attract from the home page's wing links (read here so the page can be static)
  useEffect(() => {
    const w = new URLSearchParams(window.location.search).get("wing");
    const found = wings.find((x) => x.name === w)?.name;
    if (found) setWing(found);
  }, []);
  const shown = wing === "All" ? agents : agents.filter((a) => a.wing === wing);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by wing">
        {(["All", ...wings.map((w) => w.name)] as const).map((w) => (
          <button key={w} type="button" className="chip" aria-pressed={wing === w} onClick={() => setWing(w)}>
            {w}
            <span className="num text-[12px] opacity-50">{w === "All" ? agents.length : agents.filter((x) => x.wing === w).length}</span>
          </button>
        ))}
      </div>
      {wing !== "All" && (
        <p className="mt-6 text-muted">
          <span className="font-semibold text-ink">{wing}</span> · {wings.find((w) => w.name === wing)?.plain}. &ldquo;{wings.find((w) => w.name === wing)?.problem}&rdquo;
        </p>
      )}
      <div key={wing} className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {shown.map((a, i) => (
          <AgentCard key={a.slug} agent={a} src={figures[a.slug]} delay={i % 3} />
        ))}
      </div>
    </div>
  );
}
