import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { Pending } from "@/components/ui/Pending";

/** 09 · Custom projects — the one black card: a star that isn't in the Collection yet. Section: 13_sections/01_home/09_custom */
export async function Custom() {
  const lang = await pageLang();
  const { home, site, ui } = copy(lang);
  const { custom } = home;
  return (
    <section className="section pt-0">
      <div className="wrap">
        <div className="reveal relative overflow-hidden rounded-[28px] bg-ink px-6 py-16 text-white md:px-16 md:py-24">
          {/* a new constellation, still being drawn */}
          <svg viewBox="0 0 400 300" className="pointer-events-none absolute -right-10 top-0 h-full w-[70%] opacity-90 md:right-0 md:w-[45%]" aria-hidden data-reveal>
            <path d="M40 220L120 150L210 180L260 80L350 120" pathLength={1} className="draw" fill="none" stroke="var(--color-white)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d="M350 120L370 230" fill="none" stroke="var(--color-white)" strokeOpacity={0.4} strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
            {[[40, 220, 2], [120, 150, 3], [210, 180, 2], [260, 80, 4], [350, 120, 2]].map(([x, y, r], i) => (
              <circle key={i} cx={x} cy={y} r={r} fill="var(--color-white)" className="star-pop" style={{ transitionDelay: `${300 + i * 120}ms` }} />
            ))}
            <circle cx={370} cy={230} r={5} fill="none" stroke="var(--color-white)" strokeDasharray="2 3" className="twinkle" />
          </svg>
          <div className="relative max-w-xl">
            <p className="label eyebrow !text-white/60 before:!bg-white">{custom.eyebrow} · Cat. GLS-0??</p>
            <h2 className="h2 mt-6">{custom.title.text}</h2>
            <p className="mt-6 text-[19px] text-white/70">
              {custom.text.text} <Pending note={custom.text.pending} />
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href={to(lang, site.bookingUrl)} className="btn btn-lg bg-white text-ink hover:bg-wash">{ui.bookCall}</Link>
              <Link href={to(lang, "/custom")} className="btn btn-lg text-white shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-white)_40%,transparent)] hover:bg-white/10">{ui.custom.past}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
