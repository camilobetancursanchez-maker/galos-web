import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { agents, getAgent } from "@/content/agents";
import { site } from "@/content/site";
import { figureSrc } from "@/lib/images";
import { StatueFrame } from "@/components/ui/StatueFrame";
import { WallLabel } from "@/components/ui/WallLabel";
import { Pending } from "@/components/ui/Pending";
import { WatchItWork } from "@/components/agents/WatchItWork";
import { Constellation } from "@/components/sky/Constellation";

export function generateStaticParams() {
  return agents.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/workers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const a = getAgent(slug);
  return a ? { title: `${a.figure}, ${a.role}`, description: a.does } : {};
}

/** Worker page (one template, every worker). Sections: 13_sections/03_worker-page */
export default async function AgentPage({ params }: PageProps<"/workers/[slug]">) {
  const { slug } = await params;
  const agent = getAgent(slug);
  if (!agent) notFound();
  const i = agents.indexOf(agent);
  const prev = agents[(i - 1 + agents.length) % agents.length];
  const next = agents[(i + 1) % agents.length];

  return (
    <>
      {/* 01 · Statue + wall label */}
      <section className="wrap pt-28 md:pt-36">
        <nav className="label flex items-center gap-2" aria-label="Breadcrumb">
          <Link href="/workers" className="hover:text-ink">Workers</Link>
          <span>/</span>
          <span className="!text-ink">{agent.catalog}</span>
        </nav>
        <div className="mt-8 grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-7">
            <StatueFrame agent={agent} src={figureSrc(agent.slug)} size="lg" priority />
          </div>
          <div className="rise md:col-span-5 md:pt-10">
            <WallLabel agent={agent} full as="h1" />
            <p className="mt-8 border-l border-ink pl-4 text-[17px] italic">
              &ldquo;{agent.intro.text}&rdquo; <Pending note={agent.intro.pending} />
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="#hire" className="btn btn-ink btn-lg">Hire {agent.figure}</Link>
              <Link href="#hire" className="btn btn-line btn-lg">Buy</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 02 · Watch it work */}
      <section className="section wrap">
        <WatchItWork agent={agent} />
      </section>

      {/* 03 · Try me (later) */}
      <section className="wrap">
        <div className="plate reveal flex flex-col items-start justify-between gap-6 bg-white p-8 md:flex-row md:items-center md:p-12">
          <span className="mark-b" />
          <div>
            <p className="label">Try me</p>
            <h2 className="h3 mt-3">Try {agent.figure} on your own business.</h2>
          </div>
          <span className="flex items-center gap-3">
            <span className="btn btn-line pointer-events-none opacity-40">Coming soon</span>
            <Pending note="Try me demo: later, one worker at a time (13_sections/03_worker-page/03_try-me)." align="right" />
          </span>
        </div>
      </section>

      {/* 04 · Hire vs Buy */}
      <section id="hire" className="section wrap">
        <div className="reveal">
          <p className="label eyebrow !text-ink">Hire or buy</p>
          <h2 className="h2 mt-6">Two ways to have {agent.figure}.</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {[
            { t: "Hire", price: agent.price.hire, rows: ["Galos sets it up", "Galos runs it", "Monthly report", "Cancel any month"], ink: true },
            { t: "Buy", price: agent.price.buy, rows: ["Galos sets it up", "You run it", "Hand-over session", "Yours to keep"], ink: false },
          ].map((o, k) => (
            <div key={o.t} className={`reveal rounded-[28px] p-8 md:p-10 ${o.ink ? "bg-ink text-white" : "bg-white shadow-[inset_0_0_0_1px_var(--color-line)]"}`} data-delay={k}>
              <p className={`label ${o.ink ? "!text-white/60" : ""}`}>{o.t}</p>
              <p className="num mt-4 text-[56px] font-bold leading-none tracking-[-0.04em]">{o.price}</p>
              <ul className={`mt-8 space-y-3 border-t pt-6 text-[17px] ${o.ink ? "border-white/15" : "border-line"}`}>
                {o.rows.map((r) => (
                  <li key={r} className="flex items-center gap-3">
                    <span className={`h-1.5 w-1.5 rounded-full ${o.ink ? "bg-white" : "bg-ink"}`} /> {r}
                  </li>
                ))}
              </ul>
              <Link href="/ask" className={`btn btn-lg mt-10 w-full ${o.ink ? "bg-white text-ink hover:bg-wash" : "btn-line"}`}>
                {o.t} {agent.figure}
              </Link>
            </div>
          ))}
        </div>
        <p className="mt-6"><Pending note={`${agent.price.pending} What's included in Hire vs Buy: agent note → What's included. Checkout: 09_checkout-onboarding.`} /></p>
      </section>

      {/* 05 · Live-in timeline */}
      <section className="wrap">
        <div className="reveal">
          <p className="label eyebrow !text-ink">From yes to live <Pending note={agent.liveIn.pending} /></p>
        </div>
        <ol className="reveal mt-10 grid gap-8 border-t border-ink pt-8 md:grid-cols-4" data-delay="1">
          {[
            ["Day 1", "You pay. " + agent.figure + " writes to you."],
            ["Day 2", "You answer a few questions and connect your accounts."],
            ["Day 3–4", "Galos builds and tests it on your business."],
            ["Day __", agent.figure + " goes live. The numbers start."],
          ].map(([d, t]) => (
            <li key={d}>
              <p className="num text-[28px] font-bold tracking-[-0.03em]">{d}</p>
              <p className="mt-2 text-muted">{t}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 06 · Results + FAQ */}
      <section className="section wrap grid gap-16 md:grid-cols-12">
        <div className="reveal md:col-span-5">
          <p className="label eyebrow !text-ink">Measured on</p>
          <p className="h3 mt-6">{agent.measuredOn}</p>
          <p className="mt-6 text-muted">Proof for {agent.figure} <Pending note="Client + number for this worker: worker note → Proof (08_proof)." /></p>
        </div>
        <div className="reveal md:col-span-7" data-delay="1">
          <p className="label eyebrow !text-ink">Questions <Pending note="FAQ: worker note → FAQ." /></p>
          <div className="mt-6 border-t border-line">
            {["Is it a real person?", "What do I need to have ready?", "Can I change what it says?", "What if it doesn't work for my business?"].map((q) => (
              <details key={q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[19px] tracking-[-0.015em]">
                  {q}
                  <span className="text-muted transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted">
                  {q.startsWith("Is it") ? `No. ${agent.figure} is an AI worker, run by Galos. It always says so.` : "Answer pending."}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* The next stars */}
      <nav className="wrap grid grid-cols-2 gap-4 border-t border-line pt-10" aria-label="More workers">
        {[prev, next].map((a, k) => (
          <Link key={a.slug} href={`/workers/${a.slug}`} className={`group flex items-center gap-4 ${k ? "flex-row-reverse text-right" : ""}`}>
            <Constellation agent={a} starScale={2.4} className="in h-14 w-14 shrink-0 text-ink transition-transform duration-500 group-hover:scale-110" />
            <span>
              <span className="label block">{k ? "Next" : "Previous"} · {a.catalog}</span>
              <span className="mt-1 block text-[17px] font-semibold">{a.figure}, <span className="text-muted">{a.role}</span></span>
            </span>
          </Link>
        ))}
      </nav>
      <p className="sr-only">{site.disclosure}</p>
    </>
  );
}
