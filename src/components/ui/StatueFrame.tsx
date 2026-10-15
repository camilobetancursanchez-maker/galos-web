import Image from "next/image";
import type { Agent } from "@/content/agents";
import { Constellation } from "@/components/sky/Constellation";
import { Pending } from "./Pending";

/**
 * The wall where an agent's statue hangs. Until the Higgsfield statue exists,
 * the frame shows the agent's constellation where the figure will stand,
 * on its plinth, with the one black signal point.
 */
export function StatueFrame({
  agent,
  src,
  size = "md",
  priority = false,
}: {
  agent: Agent;
  src?: string;
  size?: "md" | "lg";
  priority?: boolean;
}) {
  return (
    <figure className="relative">
      <div className="plate relative aspect-[4/5] overflow-hidden bg-wash" data-reveal>
        <span className="mark-b" />
        {src ? (
          <Image src={src} alt={`${agent.figure}, ${agent.role}: a classical statue`} fill priority={priority} sizes={size === "lg" ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"} className="object-cover" />
        ) : (
          <>
            {/* museum light from above */}
            <div className="absolute inset-0 bg-[radial-gradient(60%_45%_at_50%_0%,#ffffff_0%,rgba(255,255,255,0)_100%)]" />
            <div className="absolute inset-x-[18%] top-[14%] bottom-[30%] text-ink/80">
              <Constellation agent={agent} className="h-full w-full" starScale={size === "lg" ? 1.3 : 1} />
            </div>
            {/* plinth */}
            <svg viewBox="0 0 100 40" className="absolute inset-x-[22%] bottom-[8%] w-[56%]" aria-hidden>
              <g fill="#fff" stroke="#d1d1d6" strokeWidth={1} vectorEffect="non-scaling-stroke">
                <rect x={22} y={1} width={56} height={4} />
                <rect x={28} y={5} width={44} height={26} />
                <rect x={18} y={31} width={64} height={4} />
                <rect x={14} y={35} width={72} height={4} />
              </g>
            </svg>
            {/* the black signal point */}
            <span className="twinkle absolute bottom-[19%] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-ink" />
            <div className="absolute left-3 top-3 flex items-center gap-2">
              <span className="label">Statue · figure-{agent.slug}</span>
              <Pending note={`Statue of ${agent.figure} from Higgsfield (04_art-direction → 11_site-images/figure-${agent.slug}.png).`} />
            </div>
          </>
        )}
      </div>
    </figure>
  );
}
