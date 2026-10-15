import type { Metadata } from "next";
import Link from "next/link";
import { agents, teams, wings, getAgent } from "@/content/agents";
import { pricing, site } from "@/content/site";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { Constellation } from "@/components/sky/Constellation";

export const metadata: Metadata = { title: "Pricing" };

/** Pricing. Section: 13_sections/11_pricing · copy: 07_content/Page — Pricing · prices: 05_offer */
export default function PricingPage() {
  return (
    <>
      <PageHead
        index="Price list"
        eyebrow="Pricing"
        title={pricing.title}
        lead={pricing.lead}
        pending="Prices: 05_offer/Galos Offer (after $100M Offers). Full monthly price on every card."
      />

      {/* Every worker, by wing */}
      <section className="section wrap pt-20">
        <div className="label hidden grid-cols-12 gap-6 border-b border-ink pb-3 md:grid">
          <span className="col-span-2">Wing</span>
          <span className="col-span-4">Worker</span>
          <span className="col-span-4">What it does</span>
          <span className="col-span-2 text-right">Hire / month</span>
        </div>
        {wings.map((w) => {
          const list = agents.filter((a) => a.wing === w.name);
          return (
            <div key={w.name} className="reveal grid gap-4 border-b border-line py-8 md:grid-cols-12 md:gap-6">
              <div className="md:col-span-2">
                <p className="h3 font-bold">{w.name}</p>
                <p className="mt-1 text-[14px] text-muted">{w.plain}</p>
              </div>
              <ul className="space-y-5 md:col-span-10">
                {list.length ? (
                  list.map((a) => (
                    <li key={a.slug}>
                      <Link href={`/workers/${a.slug}`} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 md:grid-cols-10 md:gap-6">
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
                  <li className="text-muted">Workers for this wing are coming.</li>
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
          <p className="label">Teams cost less</p>
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
          <Link href="/teams" className="btn btn-line mt-8">See the teams</Link>
        </div>
        <div className="plate reveal bg-white p-8 md:p-10" data-delay="1">
          <span className="mark-b" />
          <p className="label">Extras <Pending note="Leaders + Oracle prices: 05_offer." /></p>
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
            <p className="label !text-white/60">Custom projects</p>
            <h2 className="h2 mt-4">Don&apos;t see your problem? We build it.</h2>
            <p className="mt-3 text-white/70">From $X, scoped on a call. <Pending note="Custom projects starting price: 05_offer." /></p>
          </div>
          <Link href={site.bookingUrl} className="btn btn-lg mt-8 bg-white text-ink hover:bg-wash md:mt-0">Book a call</Link>
        </div>
      </section>
    </>
  );
}
