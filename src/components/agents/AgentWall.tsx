"use client";

import { useState } from "react";
import { agents, jobAreas, type JobArea } from "@/content/agents";
import { AgentCard } from "./AgentCard";

/** Every wall of the Collection, filtered by the job. Section: 13_sections/02_agents/02_job-areas-and-filters */
export function AgentWall({ figures }: { figures: Record<string, string | undefined> }) {
  const [area, setArea] = useState<JobArea | "All">("All");
  const shown = area === "All" ? agents : agents.filter((a) => a.area === area);
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by job">
        {(["All", ...jobAreas] as const).map((a) => (
          <button key={a} type="button" className="chip" aria-pressed={area === a} onClick={() => setArea(a)}>
            {a}
            <span className="num text-[12px] opacity-50">{a === "All" ? agents.length : agents.filter((x) => x.area === a).length}</span>
          </button>
        ))}
      </div>
      <div key={area} className="mt-14 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {shown.map((a, i) => (
          <AgentCard key={a.slug} agent={a} src={figures[a.slug]} delay={i % 3} />
        ))}
      </div>
    </div>
  );
}
