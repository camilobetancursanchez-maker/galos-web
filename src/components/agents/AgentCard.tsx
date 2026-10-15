import Link from "next/link";
import { copy } from "@/content";
import type { Agent } from "@/content/agents";
import { to, type Lang } from "@/lib/i18n";
import { StatueFrame } from "@/components/ui/StatueFrame";
import { WallLabel } from "@/components/ui/WallLabel";

/** One wall in the gallery: the statue, then its label. */
export function AgentCard({ lang, agent, src, delay = 0 }: { lang: Lang; agent: Agent; src?: string; delay?: number }) {
  return (
    <article className="reveal group" data-delay={delay}>
      <Link href={to(lang, `/workers/${agent.slug}`)} className="block">
        <div className="transition-transform duration-700 [transition-timing-function:var(--ease-slow)] group-hover:-translate-y-1.5">
          <StatueFrame lang={lang} agent={agent} src={src} />
        </div>
        <div className="mt-6">
          <WallLabel lang={lang} agent={agent} />
        </div>
        <span className="mt-5 inline-flex items-center gap-2 text-[15px] font-semibold">
          {copy(lang).ui.meet(agent.figure)} <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </span>
      </Link>
    </article>
  );
}
