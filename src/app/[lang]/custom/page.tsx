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
const WORK = ["Finaro", "Crambol", "Zalina", "Yuki"];

/** Custom projects. Sections: 13_sections/06_custom · copy: 07_content/Page — Custom */
export default async function CustomPage() {
  const lang = await pageLang();
  const { site, ui, pages } = copy(lang);
  const t = pages.custom;
  return (
    <>
      <PageHead
        index="Cat. GLS-0??"
        eyebrow={t.title}
        title={t.heading}
        lead={t.lead}
        pending="Copy: 07_content/Page — Custom."
      />

      {/* 01 · What we build */}
      <section className="section wrap pt-20">
        <ol className="border-t border-ink">
          {t.build.map(([b, d], i) => (
            <li key={b} className="reveal grid gap-2 border-b border-line py-8 md:grid-cols-12 md:items-baseline">
              <span className="label num md:col-span-1">0{i + 1}</span>
              <h2 className="h2 md:col-span-5">{b}</h2>
              <p className="text-[19px] text-muted md:col-span-6">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* 02 · Past work */}
      <section className="wrap">
        <p className="label eyebrow !text-ink">{t.past} <Pending note="Screenshots and mockups of each project (13_sections/06_custom/02_past-work)." /></p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {WORK.map((w, i) => (
            <figure key={w} className="reveal" data-delay={i % 2}>
              <div className="plate aspect-[4/3] bg-wash">
                <span className="mark-b" />
                <span className="label absolute left-4 top-4">{w}</span>
              </div>
              <figcaption className="mt-4 flex justify-between text-[15px]">
                <span className="font-semibold">{w}</span>
                <span className="text-muted">{t.work} {String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 03 · Book a call */}
      <section id="book" className="section wrap">
        <div className="reveal rounded-[28px] bg-ink px-6 py-16 text-center text-white md:py-24">
          <h2 className="h2">{t.bookTitle}</h2>
          <p className="mx-auto mt-4 max-w-md text-white/70">{t.bookLine}</p>
          <Link href={to(lang, site.bookingUrl)} className="btn btn-lg mt-10 bg-white text-ink hover:bg-wash">{ui.bookCall}</Link>
          <p className="mt-4"><Pending note="GoHighLevel calendar link (NEXT_PUBLIC_BOOKING_URL)." align="center" /></p>
        </div>
      </section>
    </>
  );
}
