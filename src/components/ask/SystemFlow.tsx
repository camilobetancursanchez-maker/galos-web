"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Copy } from "@/content";
import { to, type Lang } from "@/lib/i18n";
import { GalosStar } from "@/components/sky/GalosStar";
import { Step } from "./Step";

/**
 * Ask Galos → "Sketch my system": three taps (tools, what takes time, hours a week),
 * then a sketch of the custom system: their tools joined to Galos + what it would do.
 * Opens from the diagnosis or from /custom (/ask?flow=system).
 * Sections: 13_sections/04_ask-galos/05_sketch-my-system · copy: Page — Ask Galos
 */
export function SystemFlow({ lang, c }: { lang: Lang; c: Copy }) {
  const s = c.pages.ask.system;
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});

  if (i >= s.questions.length)
    return <Sketch lang={lang} c={c} answers={answers} notes={notes} onRestart={() => setI(0)} />;

  const q = s.questions[i];
  return (
    <Step
      c={c}
      questions={s.questions}
      i={i}
      picked={answers[q.id] ?? []}
      note={notes[q.id] ?? ""}
      onToggle={(o) =>
        setAnswers((a) => {
          const cur = a[q.id] ?? [];
          return { ...a, [q.id]: q.multi ? (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]) : [o] };
        })
      }
      onNote={(v) => setNotes((n) => ({ ...n, [q.id]: v }))}
      onBack={() => setI((v) => Math.max(v - 1, 0))}
      onNext={() => setI((v) => v + 1)}
      last={s.start}
    />
  );
}

function Sketch({ lang, c, answers, notes, onRestart }: { lang: Lang; c: Copy; answers: Record<string, string[]>; notes: Record<string, string>; onRestart: () => void }) {
  const s = c.pages.ask.system;
  const tools = [...(answers.tools ?? []), ...(notes.tools ? [notes.tools] : [])].slice(0, 8);
  const does = (answers.time ?? []).map((x) => s.does[x]).filter(Boolean);
  const hours = answers.hours?.[0];
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setOn(true));
    return () => cancelAnimationFrame(id);
  }, []);

  // Their tools on a ring around Galos
  const W = 600, H = 360, cx = W / 2, cy = H / 2, rx = 230, ry = 130;
  const nodes = tools.map((name, k) => {
    const a = -Math.PI / 2 + (k * 2 * Math.PI) / Math.max(tools.length, 1);
    return { name, x: cx + rx * Math.cos(a), y: cy + ry * Math.sin(a) };
  });

  return (
    <div className="wrap pb-10 pt-28 md:pt-36">
      <div className="label flex items-center justify-between border-b border-line pb-3">
        <span className="eyebrow !text-ink">{s.label}</span>
        <button type="button" onClick={onRestart} className="hover:text-ink">{s.restart}</button>
      </div>
      <h1 className="h1 rise mt-10 max-w-[16ch]">{s.title}</h1>

      {/* The sketch: their tools, all joined through Galos */}
      <div className={`plate rise mt-14 ${on ? "in" : ""} bg-white px-2 py-8 md:px-10`} style={{ animationDelay: "150ms" }}>
        <span className="mark-b" />
        <p className="label absolute left-4 top-3">{s.yourTools}</p>
        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto mt-4 w-full max-w-3xl" role="img" aria-label={`${s.center}: ${tools.join(", ")}`}>
          {nodes.map((n, k) => (
            <path key={`l${k}`} d={`M${cx} ${cy}L${n.x} ${n.y}`} pathLength={1} className="draw" fill="none" stroke="var(--color-ink)" strokeWidth={1} vectorEffect="non-scaling-stroke" style={{ transitionDelay: `${200 + k * 120}ms` }} />
          ))}
          {nodes.map((n, k) => (
            <g key={n.name} className="star-pop" style={{ transitionDelay: `${400 + k * 120}ms` }}>
              <rect x={n.x - 64} y={n.y - 16} width={128} height={32} rx={16} fill="var(--color-white)" stroke="var(--color-line-strong)" />
              <text x={n.x} y={n.y + 5} textAnchor="middle" fontSize={13} fontWeight={500} fill="var(--color-ink)">
                {n.name.length > 18 ? `${n.name.slice(0, 17)}…` : n.name}
              </text>
            </g>
          ))}
          <circle cx={cx} cy={cy} r={34} fill="var(--color-ink)" />
          <text x={cx} y={cy + 5} textAnchor="middle" fontSize={14} fontWeight={600} fill="var(--color-white)">{s.center}</text>
        </svg>
      </div>

      {/* What it would do */}
      <section className="mt-16">
        <p className="label eyebrow !text-ink">{s.what}</p>
        <ol className="mt-6 border-t border-ink">
          {does.map((d, k) => (
            <li key={d} className="rise grid grid-cols-12 items-baseline gap-2 border-b border-line py-6" style={{ animationDelay: `${300 + k * 100}ms` }}>
              <span className="label num col-span-2 md:col-span-1">0{k + 1}</span>
              <p className="col-span-10 text-[19px] md:col-span-11">{d}</p>
            </li>
          ))}
        </ol>
        {notes.time && <p className="mt-6 text-[15px] text-muted">{s.ownWords} &ldquo;{notes.time}&rdquo;</p>}
      </section>

      {/* Estimate, never a promise */}
      <section className="mt-16 rounded-[24px] bg-wash p-8 md:p-10">
        <p className="label">{c.pages.ask.estimate}</p>
        {hours && <p className="h3 mt-3">{s.hours(hours)}</p>}
        <p className="mt-3 text-[17px] text-muted">{s.price}</p>
      </section>

      <section className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href={to(lang, c.site.bookingUrl)} className="btn btn-ink btn-lg">{c.ui.bookCall}</Link>
        <Link href={to(lang, "/custom")} className="btn btn-line btn-lg">{c.ui.custom.see}</Link>
      </section>

      <p className="label mt-16 flex items-center gap-2 !text-ink">
        <GalosStar className="h-3 w-3" /> {s.sketchNote} {c.pages.ask.isAI} {c.site.disclosure}
      </p>
    </div>
  );
}
