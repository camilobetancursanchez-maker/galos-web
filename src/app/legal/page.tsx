import type { Metadata } from "next";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Legal" };

/** Legal. Section: 13_sections/10_legal/01_privacy-terms */
export default function LegalPage() {
  return (
    <>
      <PageHead index="Legal" eyebrow="Legal" title="Privacy, terms and AI." />
      <section className="section wrap max-w-3xl space-y-16 pt-20">
        {[
          ["AI disclosure", `${site.disclosure} Every agent says it is an AI. A person at Galos sets it up, watches it and answers for it.`],
          ["Privacy policy", "How Galos collects, uses and protects personal data (Ley 1581 de 2012)."],
          ["Terms", "The terms for hiring or buying a worker."],
        ].map(([t, d]) => (
          <article key={t} className="reveal border-t border-ink pt-6">
            <h2 className="h3">{t}</h2>
            <p className="mt-4 text-muted">{d} <Pending note="Claude drafts, Camilo approves (PENDING.md, blocks publishing)." /></p>
          </article>
        ))}
      </section>
    </>
  );
}
