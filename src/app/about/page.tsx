import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { GalosStar } from "@/components/sky/GalosStar";

export const metadata: Metadata = { title: "About" };

/** About (the studio). Sections: 13_sections/08_about */
export default function AboutPage() {
  return (
    <>
      <PageHead index="The studio" eyebrow="About" title="Art meets systems." />

      {/* 01 · Camilo + the studio */}
      <section className="section wrap grid gap-12 pt-20 md:grid-cols-12">
        <figure className="md:col-span-5">
          <div className="plate reveal aspect-[4/5] bg-wash">
            <span className="mark-b" />
            <span className="label absolute left-4 top-4">Portrait <Pending note="Camilo's photo (13_sections/08_about/01_camilo-and-studio)." /></span>
          </div>
        </figure>
        <div className="reveal md:col-span-6 md:col-start-7 md:pt-10" data-delay="1">
          <p className="label eyebrow !text-ink">The studio</p>
          <p className="h3 mt-6">Galos is a studio of one designer and a collection of AI agents.</p>
          <p className="mt-6 text-[19px] text-muted">
            An industrial designer who builds software. The machine is complicated; what you touch is simple. <Pending note="Camilo's story in his words (a voice note is fine)." />
          </p>
        </div>
      </section>

      {/* 02 · Art meets systems */}
      <section className="wrap">
        <div className="reveal mx-auto max-w-4xl text-center">
          <GalosStar className="mx-auto h-8 w-8" />
          <p className="h2 mt-10">
            Every star in the sky is a system. We just learned to see the figure in it.
          </p>
          <p className="mt-6"><Pending note="The manifesto: 00_concept/The Collection (Camilo's words)." align="center" /></p>
        </div>
      </section>

      {/* 03 · YouTube */}
      <section className="section wrap">
        <div className="plate reveal flex flex-col items-start justify-between gap-6 bg-white p-8 md:flex-row md:items-center md:p-12">
          <span className="mark-b" />
          <div>
            <p className="label">The channel</p>
            <h2 className="h3 mt-3">How Galos builds, on YouTube.</h2>
          </div>
          <a href="https://www.youtube.com" className="btn btn-line">Watch <Pending note="Channel link + which videos to show." align="right" /></a>
        </div>
      </section>
    </>
  );
}
