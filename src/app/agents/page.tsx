import type { Metadata } from "next";
import { agents } from "@/content/agents";
import { figureMap } from "@/lib/images";
import { PageHead } from "@/components/ui/PageHead";
import { SkyMap } from "@/components/sky/SkyMap";
import { AgentWall } from "@/components/agents/AgentWall";

export const metadata: Metadata = { title: "The Collection" };

/** Agents (The Collection). Sections: 13_sections/02_agents */
export default function AgentsPage() {
  const figures = figureMap(agents.map((a) => a.slug));
  return (
    <>
      <PageHead
        index="Cat. GLS-001 — GLS-010"
        eyebrow="The Collection"
        title="Ten agents. One sky."
        lead="Every agent is a constellation: its stars are the steps of its work, its lines are the work moving. Pick one, or ask Galos to pick for you."
        pending="Page title + line: 07_content/Page — Agents."
      />
      <section className="wrap mt-16 md:mt-24">
        <SkyMap />
      </section>
      <section className="section wrap">
        <AgentWall figures={figures} />
      </section>
    </>
  );
}
