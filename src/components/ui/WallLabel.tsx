import { copy } from "@/content";
import type { Agent } from "@/content/agents";
import type { Lang } from "@/lib/i18n";
import { Pending } from "./Pending";

/** The museum label next to every statue: the system, under the art. Section: 13_sections/02_workers/03_wall-label-card */
export function WallLabel({ lang, agent, full = false, as: H = "h3" }: { lang: Lang; agent: Agent; full?: boolean; as?: "h1" | "h2" | "h3" }) {
  const { site, ui, wingOf } = copy(lang);
  const t = ui.wall;
  const wing = wingOf(agent.wing);
  return (
    <div className="text-ink">
      <div className="label flex items-center justify-between gap-4 border-b border-line pb-3">
        <span>{agent.catalog}</span>
        <span className="hidden sm:inline">{agent.coordinates}</span>
      </div>
      <H className={full ? "h1 mt-6" : "h3 mt-4"}>
        {agent.figure}, <span className="text-muted">{agent.role}</span>
      </H>
      <p className={`mt-2 italic text-muted ${full ? "text-lg" : "text-[15px]"}`}>{agent.meaning}</p>
      <p className={full ? "mt-6 text-xl leading-snug" : "mt-3 text-[15px] leading-snug"}>{agent.does}</p>
      {full && (
        <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-line pt-6 text-[15px]">
          <dt className="label pt-0.5">{t.wing}</dt>
          <dd>{wing?.label} · <span className="text-muted">{wing?.plain}</span></dd>
          <dt className="label pt-0.5">{t.measuredOn}</dt>
          <dd>{agent.measuredOn}</dd>
          <dt className="label pt-0.5">{t.channels}</dt>
          <dd>{agent.channels}</dd>
          <dt className="label pt-0.5">{t.liveIn}</dt>
          <dd className="num">
            {agent.liveIn.text} <Pending note={agent.liveIn.pending} />
          </dd>
          <dt className="label pt-0.5">{t.price}</dt>
          <dd className="num">
            {t.hire} {agent.price.hire} · {t.buy} {agent.price.buy} <Pending note={agent.price.pending} />
          </dd>
        </dl>
      )}
      <p className="label mt-6 flex items-center gap-2 !text-ink">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" /> {site.disclosure}
      </p>
    </div>
  );
}
