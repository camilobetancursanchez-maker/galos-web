import type { Metadata } from "next";
import Link from "next/link";
import { PageHead } from "@/components/ui/PageHead";
import { Pending } from "@/components/ui/Pending";

export const metadata: Metadata = { title: "Results" };

const CASES = [
  { client: "Finaro", what: "Website in code + lead capture into GoHighLevel", metric: "Leads / month" },
  { client: "Crambol", what: "WhatsApp agent for the club", metric: "Messages answered" },
];

/** Results. Sections: 13_sections/07_results */
export default function ResultsPage() {
  return (
    <>
      <PageHead
        index="Observation log"
        eyebrow="Results"
        title="What the stars did."
        lead="Every agent is measured. These are the numbers, with each client's permission."
        pending="Copy: 07_content/Page — Results."
      />
      <section className="section wrap space-y-10 pt-20">
        {CASES.map((c, i) => (
          <article key={c.client} className="plate reveal grid gap-10 bg-white p-6 md:grid-cols-12 md:p-12">
            <span className="mark-b" />
            <div className="md:col-span-7">
              <p className="label">Case {String(i + 1).padStart(2, "0")}</p>
              <h2 className="h2 mt-4">{c.client}</h2>
              <p className="mt-4 text-[19px] text-muted">{c.what}</p>
              <p className="mt-6"><Pending note={`Case study ${c.client}: numbers + permission (08_proof/Case study — ${c.client}).`} /></p>
            </div>
            <div className="border-t border-line pt-6 md:col-span-5 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <p className="label">{c.metric}</p>
              <p className="num mt-4 text-[88px] font-bold leading-none tracking-[-0.05em]">—</p>
              <p className="label mt-4">Before → after</p>
            </div>
          </article>
        ))}
        <div className="flex justify-center pt-6">
          <Link href="/ask" className="btn btn-ink btn-lg">Ask Galos what you need</Link>
        </div>
      </section>
    </>
  );
}
