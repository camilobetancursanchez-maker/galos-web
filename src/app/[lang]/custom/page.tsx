import type { Metadata } from "next";
import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";

export async function generateMetadata(): Promise<Metadata> {
  return { title: copy(await pageLang()).pages.custom.title };
}

const SKETCH = "/ask?flow=system";

/** Custom projects (custom systems). Sections: 13_sections/06_custom · copy: 07_content/Page — Custom */
export default async function CustomPage() {
  const lang = await pageLang();
  const { site, ui, pages } = copy(lang);
  const t = pages.custom;
  return (
    <>
      {/* 01 · Entrance */}
      <PageHead
        index="Cat. GLS-0??"
        eyebrow={t.eyebrow}
        title={t.heading}
        lead={t.lead}
        pending="Copy: 07_content/Page — Custom."
      >
        <div className="rise mt-10 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "240ms" }}>
          <Link href={to(lang, site.bookingUrl)} className="btn btn-ink btn-lg">{ui.bookCall}</Link>
          <Link href={to(lang, SKETCH)} className="btn btn-line btn-lg">{t.sketch}</Link>
        </div>
      </PageHead>

      {/* 02 · Your work today → with a system */}
      <section className="section wrap pb-0">
        <div className="label grid grid-cols-2 gap-6 border-b border-ink pb-3">
          <span>{t.today}</span>
          <span className="!text-ink">→ {t.withSystem}</span>
        </div>
        <ol>
          {t.pairs.map(([before, after], i) => (
            <li key={before} className="reveal grid grid-cols-2 gap-6 border-b border-line py-7" data-delay={i % 4}>
              <p className="text-[17px] text-muted md:text-[21px]">{before}</p>
              <p className="text-[17px] font-semibold md:text-[21px]">{after}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 03 · What we build */}
      <section className="section wrap pb-0">
        <p className="label eyebrow !text-ink">{t.buildTitle}</p>
        <ol className="mt-8 border-t border-ink">
          {t.build.map(([b, d], i) => (
            <li key={b} className="reveal grid gap-2 border-b border-line py-8 md:grid-cols-12 md:items-baseline">
              <span className="label num md:col-span-1">0{i + 1}</span>
              <h2 className="h2 md:col-span-5">{b}</h2>
              <p className="text-[19px] text-muted md:col-span-6">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 04 · Works with your tools */}
      <section className="section wrap pb-0">
        <h2 className="h2 reveal max-w-[18ch]">{t.toolsTitle}</h2>
        <p className="lead reveal mt-4">{t.toolsLine}</p>
        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {t.tools.map(([group, names], i) => (
            <div key={group} className="reveal border-t border-line pt-4" data-delay={i % 3}>
              <p className="label">{group}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {names.map((n) => (
                  <li key={n} className="chip !cursor-default">{n}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 05 · How it works: Map → Build → Run */}
      <section className="section wrap pb-0">
        <p className="label eyebrow !text-ink">{t.howTitle}</p>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {t.how.map(([step, d], i) => (
            <li key={step} className="reveal rounded-[24px] bg-white p-8 shadow-[inset_0_0_0_1px_var(--color-line)]" data-delay={i}>
              <span className="label num">0{i + 1}{i < t.how.length - 1 ? " →" : ""}</span>
              <h3 className="h3 mt-6">{step}</h3>
              <p className="mt-3 text-[17px] text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 06 · Price */}
      <section className="section wrap pb-0">
        <div className="reveal grid gap-4 border-y border-ink py-10 md:grid-cols-12 md:items-baseline">
          <span className="label md:col-span-2">{t.priceLabel}</span>
          <p className="h2 num md:col-span-5">{t.price}</p>
          <p className="text-[19px] text-muted md:col-span-5">
            {t.priceLine} <Pending note="Starting price $900 for now (Camilo, WED 14): confirm in 05_offer." />
          </p>
        </div>
      </section>

      {/* 07 · Book a call */}
      <section id="book" className="section wrap">
        <div className="reveal rounded-[28px] bg-ink px-6 py-16 text-center text-white md:py-24">
          <h2 className="h2">{t.bookTitle}</h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">{t.bookLine}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href={to(lang, site.bookingUrl)} className="btn btn-lg bg-white text-ink hover:bg-wash">{ui.bookCall}</Link>
            <Link href={to(lang, SKETCH)} className="btn btn-lg text-white shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-white)_40%,transparent)] hover:bg-white/10">{t.sketch}</Link>
          </div>
          <p className="mt-4"><Pending note="GoHighLevel calendar link (NEXT_PUBLIC_BOOKING_URL)." align="center" /></p>
        </div>
      </section>
    </>
  );
}
