import type { Agent } from "@/content/agents";

/** Stroke width stays 1px whatever the size, so every constellation reads the same. */
const R = { 1: 1.3, 2: 1.9, 3: 2.7 } as const;

export function edgePath(agent: Pick<Agent, "stars" | "edges">) {
  return agent.edges
    .map(([a, b]) => {
      const [x1, y1] = agent.stars[a];
      const [x2, y2] = agent.stars[b];
      return `M${x1} ${y1}L${x2} ${y2}`;
    })
    .join("");
}

/**
 * One agent's constellation as an SVG (0–100 box).
 * Lines draw themselves when an ancestor gets `.in` (RevealObserver) — add `data-reveal` on a parent.
 */
export function Constellation({
  agent,
  className = "",
  stroke = "currentColor",
  delay = 0,
  starScale = 1,
  title,
}: {
  agent: Pick<Agent, "stars" | "edges">;
  className?: string;
  stroke?: string;
  delay?: number;
  starScale?: number;
  title?: string;
}) {
  return (
    <svg viewBox="-8 -8 116 116" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} overflow="visible">
      {title && <title>{title}</title>}
      <path
        d={edgePath(agent)}
        pathLength={1}
        className="draw"
        style={{ transitionDelay: `${delay}ms` }}
        fill="none"
        stroke={stroke}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        strokeLinecap="round"
      />
      {agent.stars.map(([x, y, m = 1], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={R[m as 1 | 2 | 3] * starScale}
          fill={stroke}
          className="star-pop"
          style={{ transitionDelay: `${delay + 200 + i * 90}ms` }}
        />
      ))}
    </svg>
  );
}
