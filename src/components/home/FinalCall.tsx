import Link from "next/link";
import { home } from "@/content/site";
import { GalosStar } from "@/components/sky/GalosStar";
import { Pending } from "@/components/ui/Pending";

/** 07 · Final call — the north star. Section: 13_sections/01_home/07_final-call */
export function FinalCall() {
  const { final } = home;
  return (
    <section className="section">
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
        <Link href="/ask" className="btn btn-ink btn-lg mt-10">Ask Galos</Link>
      </div>
    </section>
  );
}
