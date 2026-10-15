import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { Constellation } from "@/components/sky/Constellation";

export async function generateMetadata(): Promise<Metadata> {
  return { title: copy(await pageLang()).pages.teams.title };
}

/** Teams (bundles): each team is a room, its constellations joined into one. Sections: 13_sections/05_teams */
export default async function TeamsPage() {
  const lang = await pageLang();
  const { getAgent, teams, pages } = copy(lang);
  const p = pages.teams;
  return (
    <>
      <PageHead
        index={p.index}
        eyebrow={p.title}
        title={p.heading}
        lead={p.lead}
        pending="Copy: 07_content/Page — Teams."
      />
      <div className="section wrap space-y-20 pt-20">
        {teams.map((t, k) => {
          const members = t.agents.map((s) => getAgent(s)!);
          return (
            <section key={t.slug} className="plate reveal bg-white p-6 md:p-12">
              <span className="mark-b" />
              <div className="label flex justify-between">
                <span>{p.room} {String(k + 1).padStart(2, "0")}</span>
                <span>{p.workers(members.length)}</span>
              </div>
              <div className="mt-8 grid gap-10 md:grid-cols-12 md:items-end">
                <div className="md:col-span-5">
                  <h2 className="h2">{t.name}</h2>
                  <p className="mt-4 text-muted">{t.forWho}</p>
                  <p className="num mt-8 text-[44px] font-bold tracking-[-0.04em]">
                    {t.price.text} <Pending note={t.price.pending} />
                  </p>
                  <Link href={to(lang, "/ask")} className="btn btn-ink btn-lg mt-6">{p.hire}</Link>
                </div>
                <div className="relative grid gap-2 md:col-span-7" style={{ gridTemplateColumns: `repeat(${members.length}, minmax(0, 1fr))` }} data-reveal>
                  <div className="absolute left-6 right-6 top-1/2 border-t border-dashed border-line-strong" />
                  {members.map((a, i) => (
                    <Link key={a.slug} href={to(lang, `/workers/${a.slug}`)} className="group relative flex min-w-0 flex-col items-center text-center">
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
