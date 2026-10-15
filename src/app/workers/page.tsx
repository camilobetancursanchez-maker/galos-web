import type { Metadata } from "next";
import { agents } from "@/content/agents";
import { figureMap } from "@/lib/images";
import { PageHead } from "@/components/ui/PageHead";
import { SkyMap } from "@/components/sky/SkyMap";
import { AgentWall } from "@/components/agents/AgentWall";

export const metadata: Metadata = { title: "Workers" };

/** Workers (the Collection). Sections: 13_sections/02_workers · copy: 07_content/Page — Agents */
export default function WorkersPage() {
  const figures = figureMap(agents.map((a) => a.slug));
  return (
    <>
      <PageHead
        index="Cat. GLS-001 — GLS-010"
        eyebrow="The Collection"
        title="Meet the workers."
        lead="Each one does one job and is measured by one number. Pick one, or ask Galos to pick for you."
        pending="Page title + line: 07_content/Page — Agents."
      />
      <section className="wrap mt-16 md:mt-24">
        <SkyMap />
      </section>
      <section id="walls" className="section wrap">
        <AgentWall figures={figures} />
      </section>
    </>
  );
}
