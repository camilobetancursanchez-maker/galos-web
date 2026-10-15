import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { Constellation } from "@/components/sky/Constellation";

export async function generateMetadata(): Promise<Metadata> {
  return { title: copy(await pageLang()).pages.pricing.title };
}

/** Pricing. Section: 13_sections/11_pricing · copy: 07_content/Page — Pricing · prices: 05_offer */
export default async function PricingPage() {
  const lang = await pageLang();
  const { agents, teams, wings, getAgent, pricing, home, ui, pages } = copy(lang);
  const t = pages.pricing;
  return (
    <>
      <PageHead
        index={t.index}
        eyebrow={home.pricing.eyebrow}
        title={pricing.title}
        lead={pricing.lead}
        pending="Prices: 05_offer/Galos Offer (after $100M Offers). Full monthly price on every card."
      />

      {/* Every worker, by wing */}
      <section className="section wrap pt-20">
        <div className="label hidden grid-cols-12 gap-6 border-b border-ink pb-3 md:grid">
          <span className="col-span-2">{t.cols[0]}</span>
          <span className="col-span-4">{t.cols[1]}</span>
          <span className="col-span-4">{t.cols[2]}</span>
          <span className="col-span-2 text-right">{t.cols[3]}</span>
        </div>
        {wings.map((w) => {
          const list = agents.filter((a) => a.wing === w.name);
          return (
            <div key={w.name} className="reveal grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-2">
                <p className="h3 font-bold">{w.label}</p>
                <p className="mt-1 text-[14px] text-muted">{w.plain}</p>
              </div>
              <ul className="space-y-5 md:col-span-10">
                {list.length ? (
                  list.map((a) => (
                    <li key={a.slug}>
                      <Link href={to(lang, `/workers/${a.slug}`)} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-10 md:gap-6">
                        <span className="flex items-center gap-3 md:col-span-4">
                          <Constellation agent={a} starScale={2.2} className="in h-10 w-10 shrink-0 text-ink" />
                          <span className="hidden font-semibold md:inline">
                            {a.figure}, <span className="text-muted">{a.role}</span>
                          </span>
                        </span>
                        <span className="md:col-span-4">
                          <span className="block font-semibold md:hidden">{a.figure}, <span className="text-muted">{a.role}</span></span>
                          <span className="block text-[15px] text-muted">{a.does}</span>
                        </span>
                        <span className="num text-right text-[22px] font-bold tracking-[-0.03em] md:col-span-2">{a.price.hire}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="text-muted">{t.empty}</li>
                )}
              </ul>
            </div>
          );
        })}
      </section>

      {/* Teams + extras */}
      <section className="wrap grid gap-6 md:grid-cols-2">
        <div className="plate reveal bg-white p-8 md:p-10">
          <span className="mark-b" />
          <p className="label">{t.teams}</p>
          <ul className="mt-6 space-y-5">
            {teams.map((t) => (
              <li key={t.slug} className="flex items-baseline justify-between gap-4 border-b border-line pb-5">
                <span>
                  <span className="block text-[19px] font-semibold">{t.name}</span>
                  <span className="block text-[14px] text-muted">{t.agents.map((s) => getAgent(s)!.figure).join(" · ")}</span>
                </span>
                <span className="num shrink-0 text-[22px] font-bold tracking-[-0.03em]">{t.price.text}</span>
              </li>
            ))}
          </ul>
          <Link href={to(lang, "/teams")} className="btn btn-line mt-8">{t.seeTeams}</Link>
        </div>
        <div className="plate reveal bg-white p-8 md:p-10" data-delay="1">
          <span className="mark-b" />
          <p className="label">{t.extras} <Pending note="Leaders + Oracle prices: 05_offer." /></p>
          <ul className="mt-6 space-y-5">
            {pricing.extras.map((x) => (
              <li key={x.t} className="border-b border-line pb-5">
                <span className="block text-[19px] font-semibold">{x.t}</span>
                <span className="block text-[15px] text-muted">{x.d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Custom projects */}
      <section className="section wrap">
        <div className="reveal rounded-[28px] bg-ink px-6 py-14 text-white md:flex md:items-center md:justify-between md:px-14">
          <div>
            <p className="label !text-white/60">{ui.customProjects}</p>
            <h2 className="h2 mt-4">{t.customTitle}</h2>
            <p className="mt-3 text-white/70">{t.customFrom} <Pending note="Starting price $900 for now (Camilo, WED 14): confirm in 05_offer." /></p>
          </div>
          <Link href={to(lang, "/custom")} className="btn btn-lg mt-8 bg-white text-ink hover:bg-wash md:mt-0">{ui.custom.see}</Link>
        </div>
      </section>
    </>
  );
}
