import Link from "next/link";
import type { Agent } from "@/content/agents";
import { StatueFrame } from "@/components/ui/StatueFrame";
import { WallLabel } from "@/components/ui/WallLabel";

/** One wall in the gallery: the statue, then its label. */
export function AgentCard({ agent, src, delay = 0 }: { agent: Agent; src?: string; delay?: number }) {
  return (
    <article className="reveal group" data-delay={delay}>
      <Link href={`/workers/${agent.slug}`} className="block">
        <div className="transition-transform duration-700 [transition-timing-function:var(--ease-slow)] group-hover:-translate-y-1.5">
          <StatueFrame agent={agent} src={src} />
        </div>
        <div className="mt-6">
          <WallLabel agent={agent} />
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold">
          Meet {agent.figure} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </article>
  );
}
