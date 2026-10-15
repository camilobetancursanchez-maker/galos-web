"use client";

import type { Copy } from "@/content";
import { GalosStar } from "@/components/sky/GalosStar";

export type Question = { id: string; q: string; options: string[]; multi?: boolean };

/** One Ask Galos question on its own screen: progress stars, the chips, "own words", back / next. */
export function Step({
  c,
  questions,
  i,
  picked,
  note,
  onToggle,
  onNote,
  onBack,
  onNext,
  last,
}: {
  c: Copy;
  questions: Question[];
  i: number;
  picked: string[];
  note: string;
  onToggle: (o: string) => void;
  onNote: (v: string) => void;
  onBack: () => void;
  onNext: () => void;
  last: string;
}) {
  const t = c.pages.ask;
  const q = questions[i];
  const n = questions.length;
  return (
    <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-3xl flex-col px-4 pb-10 pt-28 md:pt-36">
      {/* progress: one star per question */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" aria-label={t.progress(i + 1, n)}>
          {questions.map((x, k) => (
            <span key={x.id} className={`h-1.5 rounded-full transition-all duration-500 ${k < i ? "w-1.5 bg-ink" : k === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong"}`} />
          ))}
        </div>
        <span className="label num">{String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}</span>
      </div>

      <div key={q.id} className="rise mt-16 flex-1">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
            <GalosStar className="beat h-4 w-4" />
          </span>
          <span className="label">{t.asks}</span>
        </div>
        <h1 className="h1 mt-6">{q.q}</h1>
        {q.multi && <p className="mt-3 text-muted">{t.pickAll}</p>}
        <div className="mt-10 flex flex-wrap gap-2">
          {q.options.map((o) => (
            <button key={o} type="button" className="chip !h-12 !px-5 !text-[17px]" aria-pressed={picked.includes(o)} onClick={() => onToggle(o)}>
              {o}
            </button>
          ))}
        </div>
        <label className="mt-8 block">
          <span className="sr-only">{t.own}</span>
          <input
            value={note}
            onChange={(e) => onNote(e.target.value)}
            placeholder={t.own}
            className="h-12 w-full border-b border-line-strong bg-transparent text-[17px] outline-none transition-colors placeholder:text-faint focus:border-ink"
          />
        </label>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button type="button" onClick={onBack} className={`text-[15px] text-muted hover:text-ink ${i === 0 ? "invisible" : ""}`}>
          {t.back}
        </button>
        <button type="button" className="btn btn-ink btn-lg" onClick={onNext} disabled={!picked.length && !note}>
          {i === n - 1 ? last : t.next}
        </button>
      </div>
    </div>
  );
}
