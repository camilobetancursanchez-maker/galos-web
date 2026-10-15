import Link from "next/link";
import { agents } from "@/content/agents";
import { home } from "@/content/site";
import { figureMap } from "@/lib/images";
import { SkyMap } from "@/components/sky/SkyMap";
import { AgentCard } from "@/components/agents/AgentCard";
import { Pending } from "@/components/ui/Pending";

/** 05 · Meet the workers — the sky, then the first three walls. Section: 13_sections/01_home/05_meet-the-workers */
export function MeetTheWorkers() {
  const { workers: collection } = home;
  const first = agents.slice(0, 3);
  const figures = figureMap(first.map((a) => a.slug));
  return (
    <section id="workers" className="section">
      <div className="wrap">
        <div className="reveal grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="label eyebrow !text-ink">{collection.eyebrow}</p>
            <h2 className="h2 mt-6">{collection.title.text}</h2>
          </div>
          <p className="lead md:col-span-5">
            {collection.line.text} <Pending note={collection.line.pending} />
          </p>
        </div>
        <SkyMap className="mt-14 md:mt-20" />
        <div className="mt-24 grid gap-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {first.map((a, i) => (
            <AgentCard key={a.slug} agent={a} src={figures[a.slug]} delay={i} />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link href="/workers" className="btn btn-line btn-lg">See all ten workers</Link>
        </div>
      </div>
    </section>
  );
}
