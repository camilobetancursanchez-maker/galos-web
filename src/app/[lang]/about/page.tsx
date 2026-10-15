import type { Metadata } from "next";
import { copy } from "@/content";
import { pageLang } from "@/lib/lang";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { GalosStar } from "@/components/sky/GalosStar";

export async function generateMetadata(): Promise<Metadata> {
  return { title: copy(await pageLang()).pages.about.title };
}

/** About (the studio). Sections: 13_sections/08_about (never call Galos "the studio": Galos Studio is the client login) */
export default async function AboutPage() {
  const t = copy(await pageLang()).pages.about;
  return (
    <>
      <PageHead index="Galos" eyebrow={t.title} title={t.heading} />

      {/* 01 · Camilo */}
      <section className="section wrap grid gap-12 pt-20 md:grid-cols-12">
        <figure className="md:col-span-5">
          <div className="plate reveal aspect-[4/5] bg-wash">
            <span className="mark-b" />
            <span className="label absolute left-4 top-4">{t.portrait} <Pending note="Camilo's photo (13_sections/08_about/01_camilo-and-studio)." /></span>
          </div>
        </figure>
        <div className="reveal md:col-span-6 md:col-start-7 md:pt-10" data-delay="1">
          <p className="label eyebrow !text-ink">{t.who}</p>
          <p className="h3 mt-6">{t.whoTitle}</p>
          <p className="mt-6 text-[19px] text-muted">
            {t.whoText} <Pending note="Camilo's story in his words (a voice note is fine)." />
          </p>
        </div>
      </section>

      {/* 02 · Art meets systems */}
      <section className="wrap">
        <div className="reveal mx-auto max-w-4xl text-center">
          <GalosStar className="mx-auto h-8 w-8" />
          <p className="h2 mt-10">
            {t.manifesto}
          </p>
          <p className="mt-6"><Pending note="The manifesto: 00_concept/The Collection (Camilo's words)." align="center" /></p>
        </div>
      </section>

      {/* 03 · YouTube */}
      <section className="section wrap">
        <div className="plate reveal flex flex-col items-start justify-between gap-6 bg-white p-8 md:flex-row md:items-center md:p-12">
          <span className="mark-b" />
          <div>
            <p className="label">{t.channel}</p>
            <h2 className="h3 mt-3">{t.channelTitle}</h2>
          </div>
          <a href="https://www.youtube.com" className="btn btn-line">{t.watch} <Pending note="Channel link + which videos to show." align="right" /></a>
        </div>
      </section>
    </>
  );
}
