import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { copy } from "@/content";
import { pageLang } from "@/lib/lang";

export async function generateMetadata(): Promise<Metadata> {
  return { title: copy(await pageLang()).pages.legal.title };
}

/** Legal. Section: 13_sections/10_legal/01_privacy-terms */
export default async function LegalPage() {
  const t = copy(await pageLang()).pages.legal;
  return (
    <>
      <PageHead index="Legal" eyebrow={t.title} title={t.heading} />
      <section className="section wrap max-w-3xl space-y-16 pt-20">
        {t.items.map(([h, d]) => (
          <article key={h} className="reveal border-t border-ink pt-6">
            <h2 className="h3">{h}</h2>
            <p className="mt-4 text-muted">{d} <Pending note="Claude drafts, Camilo approves (PENDING.md, blocks publishing)." /></p>
          </article>
        ))}
      </section>
    </>
  );
}
