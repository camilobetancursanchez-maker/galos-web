"use client";

import { useEffect, useRef } from "react";
import { copy } from "@/content";
import { agents } from "@/content/agents";
import { useLang } from "@/lib/useLang";
import { readInk, rand } from "@/components/sky/Starfield";
import { Pending } from "@/components/ui/Pending";
import { clamp01, daysOf, ease, timeline, useSectionProgress } from "./how/progress";

/**
 * 02 · How it works — one sky, three shapes. The same 12 stars build each stage's shape,
 * so every stage turns into the next:
 * Ask: sonar rings leave the Galos star and 12 stars spiral in, each with a line to the middle.
 * Hire: the 12 snap into Hermes (GLS-001), no ring around it.
 * Grow: Hermes opens into a planetary system: workers orbit the Galos star (no orbit circles, just trails),
 *   their names in the upper-right corner.
 * The other stars stay as the sky. Every scroll pixel moves them. Section: 13_sections/01_home/02_how-it-works
 */

const N = 140;
const K = 12; // the stars that build the shapes
const HERMES = agents.find((a) => a.slug === "hermes")!;
const HUB = HERMES.stars[3]; // Hermes' bright middle star sits on the Galos star
const MAG = { 1: 1.6, 2: 2.2, 3: 3 } as const;
// The planetary system: radius in units (100 = scene radius), moons, speed, the worker named on it
const ORBITS = [
  { r: 34, moons: 2, v: 0.00042, name: "hermes" },
  { r: 62, moons: 3, v: -0.00026, name: "artemis" },
  { r: 90, moons: 4, v: 0.00016, name: "nike" },
].map((o) => ({ ...o, agent: agents.find((a) => a.slug === o.name)! }));
const MOONS = ORBITS.flatMap((o, i) => Array.from({ length: o.moons }, (_, j) => [i, j] as const));

type Star = { sx: number; sy: number; r: number; ph: number; z: number };

function makeStars(): Star[] {
  const rnd = rand(42);
  return Array.from({ length: N }, () => ({ sx: rnd(), sy: rnd(), r: 0.6 + rnd() * 1.1, ph: rnd() * Math.PI * 2, z: rnd() }));
}

/** Shortest turn from angle a to angle b */
const turn = (a: number, b: number) => ((((b - a) % (Math.PI * 2)) + Math.PI * 3) % (Math.PI * 2)) - Math.PI;

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const { p, reduce } = useSectionProgress(ref);
  const pRef = useRef(p);
  useEffect(() => {
    pRef.current = p;
  }, [p]);

  useEffect(() => {
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    if (!cv || !ctx) return;
    const stars = makeStars();
    let w = 0, h = 0, dpr = 1, raf = 0, frame = 0, ink = readInk();
    let ps = pRef.current, last = 0;
    const size = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height; dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(cv);

    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (frame++ % 30 === 0) ink = readInk();
      // Glide with the scroll; after a pause (hidden tab) jump straight to it
      ps = t - last > 200 ? pRef.current : ps + (pRef.current - ps) * 0.14;
      last = t;
      const T = timeline(ps);
      const desk = w >= 768;
      const fx = desk ? w * 0.66 : w * 0.5, fy = desk ? h * 0.54 : h * 0.34;
      // Scene radius in px (100 units): as big as fits, clear of the words
      const R = desk
        ? Math.min(w * 0.2, (fy - 90) / 1.1, (h - fy - 40) / 1.1, (w - fx - 24) / 1.1, (fx - w * 0.44) / 1.1)
        : Math.min(w * 0.42, h * 0.2);
      const u = R / 100;
      const maxD = Math.hypot(Math.max(fx, w - fx), Math.max(fy, h - fy));
      const c = (a: number) => `rgba(${ink},${a})`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;

      // Ask: sonar rings leave the Galos star (pushed by the scroll, breathing on their own)
      const sonar = 1 - T.leg1;
      const fronts = [0, 1, 2].map((k) => (T.ask * 1.6 + t * 0.00005 + k / 3) % 1);
      if (sonar > 0) {
        for (const f of fronts) {
          ctx.beginPath();
          ctx.arc(fx, fy, f * maxD * 0.9, 0, Math.PI * 2);
          ctx.strokeStyle = c((1 - f) * 0.22 * sonar);
          ctx.stroke();
        }
      }

      // Every star: where it sits in the sky (drifting, a little parallax with the scroll)
      const sky = stars.map((s) => [
        s.sx * w + Math.sin(t * 0.0004 + s.ph) * 6,
        s.sy * h + Math.cos(t * 0.00035 + s.ph) * 6 - (ps - 0.5) * 60 * s.z,
      ]);

      // The 12 that build the shapes: sky → spokes (Ask) → Hermes (Hire) → orbits (Grow)
      const spin = t * 0.00008 + ps * 1.2;
      const actors = Array.from({ length: K }, (_, i) => {
        const [x0, y0] = sky[i];
        const a0 = Math.atan2(y0 - fy, x0 - fx), r0 = Math.hypot(x0 - fx, y0 - fy);
        const ca = ease(clamp01((T.ask - (r0 / maxD) * 0.6) / 0.4));
        // Ask: spiral in (polar path) to a spoke around the middle
        const a1 = i * 2.4 + spin, r1 = (26 + (i % 3) * 12) * u;
        const a = a0 + turn(a0, a1) * ca, r = r0 + (r1 - r0) * ca;
        let x = fx + Math.cos(a) * r, y = fy + Math.sin(a) * r;
        // Hire: two stars on each of Hermes' six stars
        const [hx, hy, m = 1] = HERMES.stars[i % 6];
        const ch = ease(clamp01((T.hire - (i % 6) * 0.06 - (i >= 6 ? 0.05 : 0)) / 0.4));
        x += (fx + (hx - HUB[0]) * 1.2 * u - x) * ch;
        y += (fy + (hy - HUB[1]) * 1.2 * u - y) * ch;
        // Grow: nine become moons, the rest join the Galos star
        const cg = ease(clamp01((T.grow - i * 0.035) / 0.45));
        let tx = fx, ty = fy, size = 2.4, label = "";
        if (i < MOONS.length) {
          const [oi, j] = MOONS[i], o = ORBITS[oi];
          const ma = (j * Math.PI * 2) / o.moons + oi + t * o.v + ps * 2 * Math.sign(o.v);
          tx = fx + Math.cos(ma) * o.r * u; ty = fy + Math.sin(ma) * o.r * u * 0.92;
          size = 3.4;
          if (j === 0) label = `${o.agent.catalog} · ${o.agent.figure.toUpperCase()}`;
        }
        x += (tx - x) * cg; y += (ty - y) * cg;
        const rad = 1.4 + 0.8 * ca + (MAG[m as 1 | 2 | 3] - 2.2) * ch * (1 - cg) + (size - 2.2) * cg * (i < MOONS.length ? 1 : 0);
        const alpha = i < MOONS.length ? 0.45 + 0.55 * ca : (0.45 + 0.55 * ca) * (1 - cg);
        return { x, y, ca, ch, cg, rad, alpha, label, oi: i < MOONS.length ? MOONS[i][0] : -1 };
      });

      // Ask: a line from each star to the middle (fades as Hermes forms)
      for (const s of actors) {
        const v = 0.5 * s.ca * (1 - s.ch);
        if (v <= 0.01) continue;
        ctx.beginPath();
        ctx.moveTo(fx, fy);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = c(v);
        ctx.stroke();
      }

      // Hire: Hermes' lines draw themselves once its stars have landed (and let go in Grow)
      const e = clamp01((T.hire - 0.55) / 0.3) * (1 - clamp01(T.grow * 2.5));
      if (e > 0) {
        ctx.beginPath();
        for (const [i0, i1] of HERMES.edges) {
          const A = actors[i0], B = actors[i1];
          ctx.moveTo(A.x, A.y);
          ctx.lineTo(A.x + (B.x - A.x) * e, A.y + (B.y - A.y) * e);
        }
        ctx.strokeStyle = c(0.8);
        ctx.stroke();
      }

      ctx.font = "600 10px -apple-system, BlinkMacSystemFont, system-ui, sans-serif";
      ctx.letterSpacing = "1.2px";
      const hl = clamp01((T.hire - 0.6) / 0.3) * (1 - clamp01(T.grow * 3));
      if (hl > 0) {
        ctx.textAlign = "center";
        ctx.fillStyle = c(0.55 * hl);
        ctx.fillText(`${HERMES.catalog} · ${HERMES.figure.toUpperCase()}`, fx, fy + 60 * u + 28);
      }

      // Grow: each moon leaves a short trail on its orbit (no full circles)
      for (const s of actors) {
        if (s.oi < 0 || s.cg <= 0.05) continue;
        const o = ORBITS[s.oi];
        const ma = Math.atan2((s.y - fy) / 0.92, s.x - fx);
        const dir = -Math.sign(o.v);
        for (let k = 0; k < 10; k++) {
          const a1 = ma + dir * k * 0.06, a2 = ma + dir * (k + 1) * 0.06;
          ctx.beginPath();
          ctx.moveTo(fx + Math.cos(a1) * o.r * u, fy + Math.sin(a1) * o.r * u * 0.92);
          ctx.lineTo(fx + Math.cos(a2) * o.r * u, fy + Math.sin(a2) * o.r * u * 0.92);
          ctx.strokeStyle = c(0.5 * (1 - k / 10) * s.cg);
          ctx.stroke();
        }
      }

      // Grow: the workers on the orbits, named in the upper-right corner (inner orbit first), clear of the shapes
      const right = (w + Math.min(w, 1280)) / 2 - (desk ? 40 : 16);
      ctx.textAlign = "right";
      actors.forEach((s) => {
        if (!s.label) return;
        const v = 0.6 * clamp01((s.cg - 0.6) / 0.4);
        if (v <= 0) return;
        const y = (desk ? 112 : 92) + s.oi * 20;
        ctx.fillStyle = c(v);
        ctx.fillText(s.label, right, y);
        ctx.beginPath();
        ctx.arc(right - ctx.measureText(s.label).width - 10, y - 3.5, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });

      // The sky: the other stars, lit for a moment as a sonar ring passes them
      for (let i = K; i < N; i++) {
        const [x, y] = sky[i];
        let a = 0.22;
        if (sonar > 0) {
          const d = Math.hypot(x - fx, y - fy);
          for (const f of fronts) a += 0.45 * sonar * (1 - f) * Math.max(0, 1 - Math.abs(d - f * maxD * 0.9) / 24);
        }
        ctx.beginPath();
        ctx.arc(x, y, stars[i].r, 0, Math.PI * 2);
        ctx.fillStyle = c(Math.min(a, 0.9));
        ctx.fill();
      }

      // The Galos star: beating while it listens, the sun of the system in Grow
      const listen = 1 - T.hire;
      if (listen > 0) {
        const f = (t * 0.0006) % 1;
        ctx.beginPath();
        ctx.arc(fx, fy, 10 + f * 16, 0, Math.PI * 2);
        ctx.strokeStyle = c((1 - f) * 0.5 * listen);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(fx, fy, 4.5 + Math.sin(t * 0.003) * 0.6 * listen + 2.5 * ease(T.grow), 0, Math.PI * 2);
      ctx.fillStyle = c(1);
      ctx.fill();

      for (const s of actors) {
        if (s.alpha <= 0.01) continue;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.rad, 0, Math.PI * 2);
        ctx.fillStyle = c(s.alpha);
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  const { how } = copy(useLang()).home;
  const T = timeline(p);
  const fills = [T.ask, T.hire, T.grow];
  const days = daysOf(T.hire);
  const g = ease(T.grow);
  const extra = [
    null,
    <p key="hire" className="label num mt-6">{how.day.replace("{d}", String(days))} · GLS-001 Hermes</p>,
    <div key="grow" className="mt-8 grid max-w-[24em] grid-cols-3 gap-4">
      {[38, 112, 24].map((n, i) => (
        <div key={i}>
          <p className="h2 num">+{Math.round(n * g)}</p>
          <p className="label mt-1">{how.stats.items[i]}</p>
        </div>
      ))}
      <Pending note={how.stats.pending} className="col-span-3" />
    </div>,
  ];

  return (
    <section ref={ref} id="how" className={`relative ${reduce ? "" : "h-[420svh]"}`}>
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-sky">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" aria-hidden />
        <div className="wrap relative flex h-full flex-col justify-end pb-10 md:justify-center md:pb-0">
          <div className="-mx-4 bg-gradient-to-t from-sky via-sky/90 to-transparent px-4 pt-16 md:mx-0 md:max-w-[40%] md:bg-none md:px-0 md:pt-0">
            <p className="label eyebrow !text-ink">{how.eyebrow}</p>
            <ol className="mt-6 grid grid-cols-3 gap-3">
              {how.steps.map((s, i) => (
                <li key={s.n}>
                  <div className="h-px bg-line">
                    <div className="h-px bg-ink" style={{ width: `${fills[i] * 100}%` }} />
                  </div>
                  <p className={`label num mt-3 transition-colors duration-500 ${T.stage === i ? "!text-ink" : ""}`}>{s.n} · {s.title}</p>
                </li>
              ))}
            </ol>
            <div className="relative mt-8 h-[230px] md:mt-12 md:h-[320px]">
              {how.steps.map((s, i) => (
                <div
                  key={s.n}
                  aria-hidden={T.stage !== i}
                  className="absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-slow)]"
                  style={{ opacity: T.stage === i ? 1 : 0, transform: `translateY(${(i - T.stage) * 28}px)` }}
                >
                  <h3 className="h1">{s.title}</h3>
                  <p className="mt-4 max-w-[24em] text-[17px] text-muted">{s.text}</p>
                  {extra[i]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
