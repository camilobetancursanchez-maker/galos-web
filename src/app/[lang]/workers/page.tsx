import type { Metadata } from "next";
import { copy } from "@/content";
import { pageLang } from "@/lib/lang";
import { figureMap } from "@/lib/images";
import { PageHead } from "@/components/ui/PageHead";
import { SkyMap } from "@/components/sky/SkyMap";
import { AgentWall } from "@/components/agents/AgentWall";

export async function generateMetadata(): Promise<Metadata> {
  return { title: copy(await pageLang()).pages.workers.title };
}

/** Workers (the Collection). Sections: 13_sections/02_workers · copy: 07_content/Page — Agents */
export default async function WorkersPage() {
  const lang = await pageLang();
  const { agents, wings, pages } = copy(lang);
  const t = pages.workers;
  const figures = figureMap(agents.map((a) => a.slug));
  return (
    <>
      <PageHead
        index="Cat. GLS-001 — GLS-010"
        eyebrow={t.eyebrow}
        title={t.heading}
        lead={t.lead}
        pending="Page title + line: 07_content/Page — Agents."
      />
      <section className="wrap mt-16 md:mt-24">
        <SkyMap lang={lang} />
      </section>
      <section id="walls" className="section wrap">
        <AgentWall figures={figures} />
      </section>
    </>
  );
}
