import type { Metadata } from "next";
import Link from "next/link";
import { getAgent, teams } from "@/content/agents";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { Constellation } from "@/components/sky/Constellation";

export const metadata: Metadata = { title: "Teams" };

/** Teams (bundles): each team is a room, its constellations joined into one. Sections: 13_sections/05_teams */
export default function TeamsPage() {
  return (
    <>
      <PageHead
        index="Exhibitions"
        eyebrow="Teams"
        title="Stars work better together."
        lead="A team is a few agents joined into one constellation. Hiring the team costs less than hiring them one by one."
        pending="Copy: 07_content/Page — Teams."
      />
      <div className="section wrap space-y-20 pt-20">
        {teams.map((t, k) => {
          const members = t.agents.map((s) => getAgent(s)!);
          return (
            <section key={t.slug} className="plate reveal bg-white p-6 md:p-12">
              <span className="mark-b" />
              <div className="label flex justify-between">
                <span>Room {String(k + 1).padStart(2, "0")}</span>
                <span>{members.length} agents</span>
              </div>
              <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
                <div className="md:col-span-5">
                  <h2 className="h2">{t.name}</h2>
                  <p className="mt-4 text-muted">{t.forWho}</p>
                  <p className="num mt-8 text-[44px] font-bold tracking-[-0.04em]">
                    {t.price.text} <Pending note={t.price.pending} />
                  </p>
                  <Link href="/ask" className="btn btn-ink btn-lg mt-6">Hire the team</Link>
                </div>
                <div className="relative grid gap-2 md:col-span-7" style={{ gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))` }} data-reveal>
                  <div className="absolute left-6 right-6 top-1/2 border-t border-dashed border-line-strong" />
                  {members.map((a, i) => (
                    <Link key={a.slug} href={`/agents/${a.slug}`} className="group relative flex min-w-0 flex-col items-center text-center">
                      <Constellation agent={a} delay={i * 200} starScale={1.8} className="aspect-square w-full max-w-24 bg-white text-ink transition-transform duration-500 group-hover:scale-110" />
                      <span className="mt-3 w-full truncate text-[13px] font-semibold sm:text-[15px]">{a.figure}</span>
                      <span className="hidden text-[12px] text-muted sm:block">{a.role}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </>
  );
}
