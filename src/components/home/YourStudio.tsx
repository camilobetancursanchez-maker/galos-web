import { wings } from "@/content/agents";
import { home } from "@/content/site";
import { Pending } from "@/components/ui/Pending";

/**
 * 06 · Your Studio — a drawing of the Studio map: Galos in the middle, the five
 * wings as rooms, hired rooms lit with their workers, empty rooms grey with "Hire".
 * Section: 13_sections/01_home/06_your-studio
 */
const STAR = "M980 45C920 300 900 640 1260 743C1050 760 900 900 646 1275C800 1000 780 700 222 650C700 620 860 400 980 45Z";
// Example team: who is hired in each wing (empty = grey room)
const HIRED: Record<string, string[]> = { Attract: ["Calliope"], Answer: ["Hermes"], Convert: ["Nike"], Deliver: [], Keep: [] };

export function YourStudio() {
  const { studio } = home;
  const C = 300, R = 196, W = 168, H = 92;
  return (
    <section className="section">
      <div className="wrap grid gap-14 md:grid-cols-12 md:items-center">
        <div className="reveal md:col-span-5">
          <p className="label eyebrow !text-ink">{studio.eyebrow}</p>
          <h2 className="h2 mt-6">{studio.title.text}</h2>
          <p className="lead mt-6">
            {studio.line.text} <Pending note={studio.line.pending} />
          </p>
          <ul className="mt-10 space-y-4 border-t border-line pt-6 text-[17px]">
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" /> Galos in the middle: ask it anything about your business.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" /> Your team on the map: lit rooms work, grey rooms are waiting.</li>
            <li className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ink" /> One next step at a time, never a wall of options.</li>
          </ul>
        </div>
        <div className="md:col-span-7">
          <div className="plate reveal bg-white p-3 md:p-6" data-delay="1">
            <span className="mark-b" />
            <div className="label flex justify-between px-1">
              <span>Galos Studio · map</span>
              <span className="flex items-center gap-2">Example <Pending note="A real screenshot of the Studio when it exists (13_sections/01_home/06_your-studio)." align="right" /></span>
            </div>
            <svg viewBox="0 0 600 600" className="mt-2 w-full" role="img" aria-label="The Studio map: Galos in the middle and five rooms, one per wing" data-reveal>
              {wings.map((w, i) => {
                const a = (-90 + i * 72) * (Math.PI / 180);
                const x = C + Math.cos(a) * R, y = C + Math.sin(a) * R;
                const hired = HIRED[w.name];
                const lit = hired.length > 0;
                return (
                  <g key={w.name}>
                    <line x1={C} y1={C} x2={x} y2={y} stroke={lit ? "var(--color-ink)" : "var(--color-line-strong)"} strokeWidth={1} strokeDasharray={lit ? undefined : "3 5"} />
                    <rect x={x - W / 2} y={y - H / 2} width={W} height={H} rx={16} fill={lit ? "var(--color-ink)" : "var(--color-wash)"} stroke={lit ? "none" : "var(--color-line-strong)"} strokeDasharray={lit ? undefined : "3 5"} />
                    <text x={x - W / 2 + 16} y={y - H / 2 + 26} fontSize={12} fontWeight={600} letterSpacing="0.12em" fill={lit ? "var(--color-white)" : "var(--color-muted)"} opacity={lit ? 0.6 : 1}>
                      {w.name.toUpperCase()}
                    </text>
                    <text x={x - W / 2 + 16} y={y - H / 2 + 58} fontSize={21} fontWeight={700} letterSpacing="-0.02em" fill={lit ? "var(--color-white)" : "var(--color-faint)"}>
                      {lit ? hired.join(", ") : "Hire"}
                    </text>
                    {lit ? (
                      <circle cx={x + W / 2 - 18} cy={y - H / 2 + 22} r={3.5} fill="var(--color-white)" className="twinkle" />
                    ) : (
                      <text x={x - W / 2 + 16} y={y - H / 2 + 78} fontSize={12} fill="var(--color-muted)">{w.plain.length > 22 ? w.plain.slice(0, 21) + "…" : w.plain}</text>
                    )}
                  </g>
                );
              })}
              {/* Galos in the middle */}
              <circle cx={C} cy={C} r={74} fill="none" stroke="var(--color-ink)" strokeWidth={1} className="beat-ring" style={{ transformOrigin: `${C}px ${C}px` }} />
              <circle cx={C} cy={C} r={54} fill="var(--color-ink)" />
              <svg x={C - 20} y={C - 24} width={40} height={46} viewBox="200 20 1080 1280">
                <path d={STAR} fill="var(--color-white)" />
              </svg>
              <text x={C} y={C + 88} fontSize={13} fontWeight={600} letterSpacing="0.12em" fill="var(--color-ink)" textAnchor="middle">GALOS</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
