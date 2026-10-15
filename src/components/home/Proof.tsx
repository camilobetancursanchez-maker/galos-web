import { home } from "@/content/site";
import { Pending } from "@/components/ui/Pending";

/** 05 · Proof — an observation log. Numbers only when real. Section: 13_sections/01_home/05_proof */
export function Proof() {
  const { proof } = home;
  return (
    <section className="section">
      <div className="wrap">
        <div className="reveal">
          <p className="label eyebrow !text-ink">{proof.eyebrow}</p>
          <h2 className="h2 mt-6">
            {proof.title.text} <Pending note={proof.pending} />
          </h2>
        </div>
        <div className="reveal mt-14 border-t border-ink" data-delay="1">
          <div className="label hidden grid-cols-12 gap-6 border-b border-line py-3 md:grid">
            <span className="col-span-1">Obs.</span>
            <span className="col-span-3">Client</span>
            <span className="col-span-3">What Galos did</span>
            <span className="col-span-3">Measured on</span>
            <span className="col-span-2 text-right">Result</span>
          </div>
          {proof.rows.map((r, i) => (
            <div key={r.client} className="grid grid-cols-2 gap-x-6 gap-y-1 border-b border-line py-6 md:grid-cols-12 md:items-baseline md:py-8">
              <span className="label num md:col-span-1">0{i + 1}</span>
              <span className="text-right text-[44px] font-bold leading-none tracking-[-0.04em] md:order-last md:col-span-2 md:text-[56px]">{r.value}</span>
              <span className="h3 col-span-2 md:col-span-3">{r.client}</span>
              <span className="col-span-2 text-muted md:col-span-3">{r.what}</span>
              <span className="col-span-2 text-muted md:col-span-3">{r.metric}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
