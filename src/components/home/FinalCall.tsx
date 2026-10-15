import Link from "next/link";
import { copy } from "@/content";
import { to } from "@/lib/i18n";
import { pageLang } from "@/lib/lang";
import { GalosStar } from "@/components/sky/GalosStar";
import { Pending } from "@/components/ui/Pending";

/** 10 · Questions + the final call: the north star. Section: 13_sections/01_home/10_questions-and-final-call */
export async function FinalCall() {
  const lang = await pageLang();
  const { faq, faqPending, home, ui } = copy(lang);
  const { final } = home;
  return (
    <>
      <section className="section wrap grid gap-12 md:grid-cols-12">
        <div className="reveal md:col-span-4">
          <p className="label eyebrow !text-ink">{ui.questions}</p>
          <h2 className="h2 mt-6">
            {ui.beforeYouAsk} <Pending note={faqPending} />
          </h2>
        </div>
        <div className="reveal md:col-span-8" data-delay="1">
          <div className="border-t border-line">
            {faq.map((f) => (
              <details key={f.q} className="group border-b border-line py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[19px] tracking-[-0.015em]">
                  {f.q}
                  <span className="text-muted transition-transform duration-300 group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 max-w-[40em] text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <section className="section pt-0">
        <div className="wrap reveal flex flex-col items-center text-center">
          <div className="relative flex h-40 w-40 items-center justify-center">
            <span className="beat-ring absolute inset-6 rounded-full border border-ink" />
            <span className="beat-ring absolute inset-6 rounded-full border border-ink [animation-delay:1.3s]" />
            <GalosStar className="beat relative h-16 w-16" />
          </div>
          <h2 className="display mt-8">{final.title.text}</h2>
          <p className="lead mx-auto mt-6">
            {final.sub.text} <Pending note={final.sub.pending} align="center" />
          </p>
          <Link href={to(lang, "/ask")} className="btn btn-ink btn-lg mt-10">{ui.askGalos}</Link>
        </div>
      </section>
    </>
  );
}
