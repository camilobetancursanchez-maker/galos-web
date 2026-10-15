"use client";

import { useEffect, useRef } from "react";

/**
 * The Galos sky, drawn on a canvas: black stars on a white sky.
 *
 * mode "lattice" (the hero): the page opens as a perfect dot grid (the Braun /
 * Mac Pro grille, the system). The grid lets go and becomes a sky (the art).
 * Wherever the cursor goes, the stars fall back into the grid: under the art,
 * the system is always there. With no cursor (phones), a slow scan does it.
 *
 * mode "ambient" (behind every page): a sparse sky that drifts as you scroll.
 */

type Dot = {
  gx: number; gy: number; // place in the grid
  sx: number; sy: number; // place in the sky
  z: number; // depth 0..1 (parallax)
  r: number; // radius in the sky
  a: number; // alpha in the sky
  keep: boolean; // stays visible as a star
  tw: number; // twinkle phase (0 = no twinkle)
  bright: boolean; // gets the small cross
  o: number; // current "order" 0 (sky) .. 1 (grid), smoothed
};

const INK = "11,11,11";

function rand(seed: number) {
  // Small deterministic PRNG so the sky looks the same on every visit
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function Starfield({
  mode = "ambient",
  className = "",
  seed = 7,
}: {
  mode?: "lattice" | "ambient";
  className?: string;
  seed?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1;
    let dots: Dot[] = [];
    let raf = 0;
    let visible = true;
    const start = performance.now();
    const pointer = { x: -9999, y: -9999, last: 0, has: false };
    let scrollY = window.scrollY;

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const rnd = rand(seed);
      dots = [];
      if (mode === "lattice") {
        const gap = w < 640 ? 18 : 22;
        const cols = Math.ceil(w / gap) + 1;
        const rows = Math.ceil(h / gap) + 1;
        const ox = (w - (cols - 1) * gap) / 2;
        const oy = (h - (rows - 1) * gap) / 2;
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++) {
            const keep = rnd() < 0.16;
            const mag = rnd();
            dots.push({
              gx: ox + i * gap,
              gy: oy + j * gap,
              sx: rnd() * w,
              sy: rnd() * h,
              z: rnd(),
              r: keep ? 0.5 + mag * mag * 1.9 : 0,
              a: keep ? 0.35 + mag * 0.65 : 0,
              keep,
              tw: keep && rnd() < 0.3 ? rnd() * Math.PI * 2 + 0.01 : 0,
              bright: keep && mag > 0.93,
              o: 1,
            });
          }
        }
      } else {
        const count = Math.round((w * h) / 22000);
        for (let k = 0; k < count; k++) {
          const mag = rnd();
          dots.push({
            gx: 0, gy: 0,
            sx: rnd() * w,
            sy: rnd() * h,
            z: 0.15 + rnd() * 0.85,
            r: 0.45 + mag * mag * 1.4,
            a: 0.1 + mag * 0.32,
            keep: true,
            tw: rnd() < 0.4 ? rnd() * Math.PI * 2 + 0.01 : 0,
            bright: mag > 0.97,
            o: 0,
          });
        }
      }
    };

    const ease = (t: number) => 1 - Math.pow(1 - Math.min(Math.max(t, 0), 1), 4);

    const cross = (x: number, y: number, len: number, alpha: number) => {
      ctx.strokeStyle = `rgba(${INK},${alpha * 0.8})`;
      ctx.lineWidth = 0.75;
      ctx.beginPath();
      ctx.moveTo(x - len, y);
      ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len);
      ctx.lineTo(x, y + len);
      ctx.stroke();
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, w, h);

      if (mode === "lattice") {
        // 0 → 0.7 s: the grid. 0.7 → 3.1 s: the grid lets go.
        const sky = reduce ? 1 : ease((t - 0.7) / 2.4);
        // Where the order shows: the cursor, or a slow scan when there's none
        let px = pointer.x, py = pointer.y;
        const idle = !pointer.has || now - pointer.last > 4000;
        if (idle && !reduce && t > 3) {
          const s = (t - 3) * 0.18;
          px = w * (0.5 + 0.36 * Math.sin(s * 1.3));
          py = h * (0.5 + 0.3 * Math.sin(s * 2.1 + 1));
        }
        const R = Math.max(130, Math.min(w, h) * 0.2);
        const mx = pointer.has ? (pointer.x / w - 0.5) : 0;
        const my = pointer.has ? (pointer.y / h - 0.5) : 0;

        for (const d of dots) {
          const dx = d.gx - px, dy = d.gy - py;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const near = dist < R ? 1 - dist / R : 0;
          const target = Math.max(1 - sky, near * near * (3 - 2 * near));
          d.o += (target - d.o) * (reduce ? 1 : 0.09);
          const o = d.o;

          if (d.keep) {
            const sx = d.sx - mx * d.z * 28 - 0;
            const sy = d.sy - my * d.z * 20 - scrollY * d.z * 0.25;
            const x = sx + (d.gx - sx) * o;
            const y = sy + (d.gy - sy) * o;
            let a = d.a + (0.55 - d.a) * o;
            if (d.tw) a *= 0.6 + 0.4 * Math.sin(t * 1.6 + d.tw);
            const r = d.r + (1.05 - d.r) * o;
            ctx.fillStyle = `rgba(${INK},${a})`;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
            if (d.bright && o < 0.5) cross(x, y, 6 + d.r * 2, a * (1 - o * 2));
          } else if (o > 0.02) {
            ctx.fillStyle = `rgba(${INK},${0.62 * o})`;
            ctx.beginPath();
            ctx.arc(d.gx, d.gy, 1.05, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      } else {
        for (const d of dots) {
          let y = (d.sy - scrollY * d.z * 0.35) % h;
          if (y < 0) y += h;
          let a = d.a;
          if (d.tw && !reduce) a *= 0.55 + 0.45 * Math.sin(t * 1.2 + d.tw);
          ctx.fillStyle = `rgba(${INK},${a})`;
          ctx.beginPath();
          ctx.arc(d.sx, y, d.r, 0, Math.PI * 2);
          ctx.fill();
          if (d.bright) cross(d.sx, y, 5, a);
        }
      }

      if (!reduce && visible) raf = requestAnimationFrame(frame);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.last = performance.now();
      pointer.has = true;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
      if (reduce) frame(performance.now());
    };

    build();
    frame(performance.now());

    const ro = new ResizeObserver(() => {
      build();
      if (reduce) frame(performance.now());
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([e]) => {
      const was = visible;
      visible = e.isIntersecting && !document.hidden;
      if (visible && !was && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(canvas);

    const onVis = () => {
      const was = visible;
      visible = !document.hidden;
      if (visible && !was && !reduce) {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(frame);
      }
    };

    if (mode === "lattice") {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [mode, seed]);

  return <canvas ref={ref} aria-hidden className={`block h-full w-full ${className}`} />;
}
