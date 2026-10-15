import Link from "next/link";
import { agents, wings } from "@/content/agents";
import { home } from "@/content/site";
import { Pending } from "@/components/ui/Pending";

/**
 * 03 · The client journey — the 5 wings as five bright stars on one line,
 * Attract → Answer → Convert → Deliver → Keep, and a dotted arc that brings
 * Keep back to Attract (referrals). Tap a wing → its workers.
 * Section: 13_sections/01_home/03_client-journey
 */
export function ClientJourney() {
  const { journey } = home;
  return (
    <section className="section">
      <div className="wrap">
        <div className="reveal max-w-3xl">
          <p className="label eyebrow !text-ink">{journey.eyebrow}</p>
          <h2 className="h2 mt-6">
            {journey.title.text} <Pending note={journey.title.pending} />
          </h2>
          <p className="lead mt-6">{journey.line}</p>
        </div>

        {/* Desktop: one line, five stars, the arc back */}
        <div className="relative mt-20 hidden md:block" data-reveal>
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="absolute inset-x-[10%] top-[7px] h-[150px] w-[80%] overflow-visible" aria-hidden>
            <path d="M0 0H1000" pathLength={1} className="draw" fill="none" stroke="var(--color-ink)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <ol className="relative grid grid-cols-5 gap-6">
            {wings.map((w, i) => {
              const n = agents.filter((a) => a.wing === w.name).length;
              return (
                <li key={w.name} className="reveal text-center" data-delay={String(Math.min(i, 3))}>
                  <Link href={`/workers?wing=${w.name}#walls`} className="group flex flex-col items-center">
                    <span className="relative flex h-[15px] w-[15px] items-center justify-center">
                      <span className="absolute inset-0 rounded-full bg-ink transition-transform duration-500 group-hover:scale-150" />
                      <span className="absolute -inset-3 rounded-full border border-ink opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </span>
                    <span className="label num mt-8">0{i + 1}</span>
                    <span className="h3 mt-2 font-bold">{w.name}</span>
                    <span className="mt-1 text-[14px] text-muted">{w.plain}</span>
                    <span className="mt-5 max-w-[16em] text-[17px] italic leading-snug">&ldquo;{w.problem}&rdquo;</span>
                    <span className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold">
                      {n} {n === 1 ? "worker" : "workers"} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ol>
          {/* Keep brings referrals back to Attract */}
          <svg viewBox="0 0 1000 90" className="mt-10 w-full overflow-visible" aria-hidden>
            <path d="M900 0C900 70 820 80 500 80C180 80 100 70 100 0" fill="none" stroke="var(--color-line-strong)" strokeDasharray="3 6" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d="M94 12L100 0L106 12" fill="none" stroke="var(--color-line-strong)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </svg>
          <p className="label -mt-3 text-center">Keep brings referrals back to Attract</p>
        </div>

        {/* Phone: a vertical line */}
        <ol className="relative mt-14 space-y-10 pl-10 md:hidden">
          <div className="absolute bottom-3 left-[7px] top-3 w-px bg-ink" />
          {wings.map((w, i) => {
            const n = agents.filter((a) => a.wing === w.name).length;
            return (
              <li key={w.name} className="reveal relative">
                <span className="absolute -left-10 top-1.5 h-[15px] w-[15px] rounded-full bg-ink" />
                <Link href={`/workers?wing=${w.name}#walls`} className="block">
                  <span className="label num">0{i + 1} · {w.plain}</span>
                  <span className="h3 mt-1 block font-bold">{w.name}</span>
                  <span className="mt-2 block italic">&ldquo;{w.problem}&rdquo;</span>
                  <span className="mt-2 block text-[14px] font-semibold">{n} {n === 1 ? "worker" : "workers"} →</span>
                </Link>
              </li>
            );
          })}
          <li className="label relative">↺ Keep brings referrals back to Attract</li>
        </ol>
      </div>
    </section>
  );
}
