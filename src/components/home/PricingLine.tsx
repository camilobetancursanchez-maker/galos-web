import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { Pending } from "@/components/ui/Pending";

/** 07 · Pricing in one line. Section: 13_sections/01_home/07_pricing */
export async function PricingLine() {
  const lang = await pageLang();
  const { home, ui } = copy(lang);
  const { pricing } = home;
  return (
    <section className="wrap">
      <div className="plate reveal bg-white p-6 md:p-14">
        <span className="mark-b" />
        <div className="label flex justify-between">
          <span className="eyebrow !text-ink">{pricing.eyebrow}</span>
          <Pending note={pricing.pending} align="right" />
        </div>
        <h2 className="h2 mt-8 max-w-[18ch]">{pricing.title.text}</h2>
        <div className="mt-12 grid gap-8 border-t border-line pt-8 md:grid-cols-3">
          {pricing.facts.map((f, i) => (
            <div key={f.t}>
              <p className="label num">0{i + 1}</p>
              <p className="mt-3 text-[19px]">
                <span className="font-semibold">{f.t}</span> <span className="text-muted">{f.d}</span>
              </p>
            </div>
          ))}
        </div>
        <Link href={to(lang, "/pricing")} className="btn btn-line btn-lg mt-12">{ui.seePricing}</Link>
      </div>
    </section>
  );
}
