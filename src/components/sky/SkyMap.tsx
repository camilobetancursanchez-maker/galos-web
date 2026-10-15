import Link from "next/link";
import { agents } from "@/content/agents";
import { edgePath } from "./Constellation";

/**
 * The Collection as a star chart: every agent is a constellation on one sky.
 * Hover (or focus) a constellation: the others step back. Click: its wall.
 * On phones the chart keeps its size and scrolls sideways ("drag the sky").
 * Section folder: 13_sections/01_home/05_meet-the-workers + 02_workers.
 */

const W = 1200;
const H = 720;
// Where each constellation hangs on the chart: x, y, size
const SLOTS: [number, number, number][] = [
  [70, 70, 170], [330, 120, 150], [560, 50, 190], [830, 110, 150], [1010, 50, 130],
  [90, 400, 150], [330, 440, 160], [590, 380, 170], [830, 430, 150], [1030, 400, 120],
];

function backgroundStars() {
  // Deterministic faint field stars
  let s = 11;
  const r = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 170 }, () => [r() * W, r() * H, r()] as const);
}

const field = backgroundStars();

export function SkyMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <div className="-mx-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] md:mx-0 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
        <div className="plate min-w-[980px] bg-white md:min-w-0" data-reveal>
          <span className="mark-b" />
          <svg viewBox={`0 0 ${W} ${H}`} className="skymap block w-full" role="group" aria-label="The Galos Collection as a star chart">
            {/* The chart: declination arcs and hour lines, like a planisphere */}
            <g stroke="var(--color-line)" fill="none" strokeWidth={1} vectorEffect="non-scaling-stroke">
              {[900, 1150, 1400, 1650].map((r) => (
                <circle key={r} cx={W / 2} cy={H + 760} r={r} />
              ))}
              {Array.from({ length: 13 }, (_, i) => {
                const a = (-60 + i * 10) * (Math.PI / 180);
                const cx = W / 2, cy = H + 760;
                return <line key={i} x1={cx + Math.sin(a) * 700} y1={cy - Math.cos(a) * 700} x2={cx + Math.sin(a) * 1800} y2={cy - Math.cos(a) * 1800} />;
              })}
            </g>
            {/* Ticks along the frame */}
            <g stroke="var(--color-ink)" strokeWidth={1}>
              {Array.from({ length: 49 }, (_, i) => (
                <g key={i}>
                  <line x1={i * 25} y1={0} x2={i * 25} y2={i % 4 === 0 ? 10 : 5} />
                  <line x1={i * 25} y1={H} x2={i * 25} y2={H - (i % 4 === 0 ? 10 : 5)} />
                </g>
              ))}
            </g>
            <g fill="var(--color-muted)" fontSize={10} letterSpacing="0.12em" fontWeight={600}>
              {Array.from({ length: 13 }, (_, i) => (
                <text key={i} x={i * 100 + 4} y={24}>{String(i * 2).padStart(2, "0")}h</text>
              ))}
            </g>
            {/* Field stars */}
            <g fill="var(--color-ink)">
              {field.map(([x, y, m], i) => (
                <circle key={i} cx={x} cy={y} r={0.5 + m * m * 1.4} opacity={0.15 + m * 0.35} />
              ))}
            </g>
            {/* The Collection */}
            {agents.map((agent, i) => {
              const [x, y, size] = SLOTS[i];
              const k = size / 100;
              return (
                <Link key={agent.slug} href={`/workers/${agent.slug}`} className="const group/c outline-none" aria-label={`${agent.figure}, ${agent.role}`}>
                  <g transform={`translate(${x} ${y})`}>
                    <rect x={-16} y={-16} width={size + 32} height={size + 76} fill="transparent" />
                    <g transform={`scale(${k})`}>
                      <path
                        d={edgePath(agent)}
                        pathLength={1}
                        className="draw"
                        style={{ transitionDelay: `${300 + i * 140}ms` }}
                        fill="none"
                        stroke="var(--color-ink)"
                        strokeWidth={1}
                        vectorEffect="non-scaling-stroke"
                      />
                      {agent.stars.map(([sx, sy, m = 1], j) => (
                        <circle key={j} cx={sx} cy={sy} r={(m === 3 ? 3 : m === 2 ? 2.2 : 1.5) / k} fill="var(--color-ink)" className="star-pop" style={{ transitionDelay: `${400 + i * 140 + j * 60}ms` }} />
                      ))}
                    </g>
                    <text x={0} y={size + 30} fontSize={15} fontWeight={700} letterSpacing="-0.01em" fill="var(--color-ink)">
                      {agent.figure}
                    </text>
                    <text x={0} y={size + 48} fontSize={12} fill="var(--color-muted)">
                      {agent.role}
                    </text>
                    <text x={size} y={size + 30} fontSize={9.5} fontWeight={600} letterSpacing="0.12em" fill="var(--color-faint)" textAnchor="end">
                      {agent.catalog}
                    </text>
                  </g>
                </Link>
              );
            })}
          </svg>
        </div>
      </div>
      <p className="label mt-4 md:hidden">← Drag the sky →</p>
    </div>
  );
}
