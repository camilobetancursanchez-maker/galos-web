"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { copy, type Copy } from "@/content";
import type { Wing } from "@/content/agents";
import { to, type Lang } from "@/lib/i18n";
import { useLang } from "@/lib/useLang";
import { GalosStar } from "@/components/sky/GalosStar";
import { Constellation } from "@/components/sky/Constellation";
import { Pending } from "@/components/ui/Pending";
import { Step } from "./Step";
import { SystemFlow } from "./SystemFlow";

/**
 * Ask Galos (/ask): one question per screen, then the Diagnosis.
 * This is the skeleton: the questions and the recommendation rules are local.
 * Later the conversation runs on Claude through the site's backend (06_ask-galos).
 * Sections: 13_sections/04_ask-galos
 */

// Each wing problem marks that wing as a leak and recommends that wing's workers.
const problemToWing = (c: Copy) => Object.fromEntries(c.wings.map((w) => [w.problem, w.name])) as Record<string, Wing>;

type Answers = Record<string, string[]>;

export function AskFlow() {
  const params = useSearchParams();
  const lang = useLang();
  const c = copy(lang);
  const { askQuestions, home, wings } = c;
  const t = c.pages.ask;
  const mode = params.get("mode") === "speak" ? "speak" : "chat";
  const initialPain = params.get("pain") ?? "";
  const known = [...wings.map((w) => w.problem), home.ask.other];

  const [speak, setSpeak] = useState(mode === "speak");
  const [system, setSystem] = useState(params.get("flow") === "system");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>((): Answers =>
    initialPain ? { pain: [known.includes(initialPain) ? initialPain : home.ask.other] } : {},
  );
  const [notes, setNotes] = useState<Record<string, string>>((): Record<string, string> => (initialPain && !known.includes(initialPain) ? { pain: initialPain } : {}));
  const done = i >= askQuestions.length;

  if (speak) return <Speak c={c} onChat={() => setSpeak(false)} />;
  if (system) return <SystemFlow lang={lang} c={c} />;
  if (done) return <Diagnosis lang={lang} c={c} answers={answers} notes={notes} onRestart={() => setI(0)} onSystem={() => { setSystem(true); window.scrollTo(0, 0); }} />;

  const q = askQuestions[i];
  const picked = answers[q.id] ?? [];
  const toggle = (o: string) =>
    setAnswers((a) => {
      const cur = a[q.id] ?? [];
      const next = q.multi ? (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]) : [o];
      return { ...a, [q.id]: next };
    });

  return (
    <Step
      c={c}
      questions={askQuestions}
      i={i}
      picked={picked}
      note={notes[q.id] ?? ""}
      onToggle={toggle}
      onNote={(v) => setNotes((n) => ({ ...n, [q.id]: v }))}
      onBack={() => setI((v) => Math.max(v - 1, 0))}
      onNext={() => setI((v) => v + 1)}
      last={t.see}
    />
  );
}

function Diagnosis({ lang, c, answers, notes, onRestart, onSystem }: { lang: Lang; c: Copy; answers: Answers; notes: Record<string, string>; onRestart: () => void; onSystem: () => void }) {
  const { agents, askQuestions, getAgent, site, wings, wingOf } = c;
  const t = c.pages.ask;
  const PROBLEM_TO_WING = problemToWing(c);
  const pains = useMemo(() => answers.pain ?? [], [answers.pain]);
  const slowAnswers = askQuestions.find((q) => q.id === "speed")?.slow ?? [];
  const slow = (answers.speed ?? []).some((s) => slowAnswers.includes(s));
  const recs = [...new Set([...(slow ? ["hermes"] : []), ...pains.flatMap((p) => agents.filter((a) => a.wing === PROBLEM_TO_WING[p]).map((a) => a.slug))])]
    .slice(0, 3)
    .map((s) => getAgent(s)!);
  const leaks = new Set<string>(pains.map((p) => PROBLEM_TO_WING[p]).filter(Boolean));
  if (slow) leaks.add("Answer");
  const [send, setSend] = useState(false);
  const type = answers.type?.[0];
  const other = askQuestions.find((q) => q.id === "type")?.options.at(-1);
  const who = type && type !== other ? t.your(type) : t.yourBusiness;

  return (
    <div className="wrap pb-10 pt-28 md:pt-36">
      <div className="label flex items-center justify-between border-b border-line pb-3">
        <span className="eyebrow !text-ink">{t.diagnosis}</span>
        <button type="button" onClick={onRestart} className="hover:text-ink">{t.restart}</button>
      </div>
      <h1 className="h1 rise mt-10 max-w-[16ch]">
        {t.loses(who)}
      </h1>

      {/* The map of their business: leaks in black */}
      <div className="plate rise mt-14 bg-white px-4 py-10 md:px-10" style={{ animationDelay: "150ms" }}>
        <span className="mark-b" />
        <p className="label absolute left-4 top-3">{t.map}</p>
        <ol className="relative mt-6 grid grid-cols-3 gap-y-10 md:grid-cols-5">
          <li aria-hidden className="absolute left-[10%] right-[10%] top-[9px] hidden h-px bg-line-strong md:block" />
          {wings.map(({ name: s, label }) => {
            const leak = leaks.has(s);
            return (
              <li key={s} className="relative flex flex-col items-center text-center">
                <span className={`relative flex h-5 w-5 items-center justify-center rounded-full ${leak ? "bg-ink" : "border border-line-strong bg-white"}`}>
                  {leak && <span className="beat-ring absolute inset-0 rounded-full border border-ink" />}
                </span>
                <span className={`mt-4 text-[15px] ${leak ? "font-semibold" : "text-muted"}`}>{label}</span>
                <span className="mt-0.5 hidden text-[12px] text-muted md:block">{wingOf(s)?.plain}</span>
                {leak && <span className="label mt-1 !text-ink">{t.leak}</span>}
              </li>
            );
          })}
        </ol>
        {notes.pain && <p className="mt-8 text-center text-[15px] text-muted">{t.youSaid} &ldquo;{notes.pain}&rdquo;</p>}
      </div>

      {/* Recommended agents */}
      <section className="mt-20">
        <p className="label eyebrow !text-ink">{t.recommends}</p>
        {recs.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {recs.map((a, k) => (
              <Link key={a.slug} href={to(lang, `/workers/${a.slug}`)} className="rise group rounded-[24px] bg-white p-6 shadow-[inset_0_0_0_1px_var(--color-line)] transition-shadow hover:shadow-[inset_0_0_0_1px_var(--color-ink)]" style={{ animationDelay: `${250 + k * 120}ms` }}>
                <div className="flex items-start justify-between">
                  <Constellation agent={a} starScale={2} className="in h-20 w-20 text-ink" />
                  <span className="label">{a.catalog}</span>
                </div>
                <h2 className="h3 mt-6">{a.figure}, <span className="text-muted">{a.role}</span></h2>
                <p className="mt-2 text-[15px] text-muted">{a.does}</p>
                <p className="label mt-5 !text-ink">{t.why} {pains.find((p) => PROBLEM_TO_WING[p] === a.wing) ?? t.whySlow}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="h3 mt-6 max-w-[24ch]">{t.piece}</p>
        )}
      </section>

      {/* Estimate */}
      <section className="mt-16 rounded-[24px] bg-wash p-8 md:p-10">
        <p className="label">{t.estimate}</p>
        <p className="h3 mt-3">{t.estimateLine}</p>
        <p className="mt-3"><Pending note="The estimate comes when Ask Galos runs on Claude (06_ask-galos). Always 'estimate', never a guarantee." /></p>
      </section>

      {/* Custom systems: when the tools are the problem, sketch the system */}
      <section className="mt-12 rounded-[24px] bg-ink p-8 text-white md:flex md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <p className="h3">{t.system.cta}</p>
          <p className="mt-2 text-white/70">{t.system.ctaLine}</p>
        </div>
        <button type="button" onClick={onSystem} className="btn btn-lg mt-6 shrink-0 bg-white text-ink hover:bg-wash md:mt-0">{t.system.start}</button>
      </section>

      {/* Three ways forward */}
      <section className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href={to(lang, recs.length >= 3 ? "/teams" : recs[0] ? `/workers/${recs[0].slug}#hire` : site.bookingUrl)} className="btn btn-ink btn-lg">
          {recs.length > 1 ? t.hireTeam : recs.length ? t.hire(recs[0].figure) : c.ui.bookCall}
        </Link>
        <Link href={to(lang, site.bookingUrl)} className="btn btn-line btn-lg">{c.ui.bookCall}</Link>
        <button type="button" className="btn btn-line btn-lg" onClick={() => setSend(true)}>{t.send}</button>
      </section>

      {send && (
        <form className="rise mt-10 grid max-w-xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <p className="label">{t.send} <Pending note="Form → GoHighLevel webhook (GHL_WEBHOOK_URL) + WhatsApp/email follow-up. Not connected yet." /></p>
          {t.fields.map((f) => (
            <label key={f} className="block">
              <span className="sr-only">{f}</span>
              <input placeholder={f} className="h-12 w-full border-b border-line-strong bg-transparent text-[17px] outline-none placeholder:text-faint focus:border-ink" />
            </label>
          ))}
          <button type="submit" className="btn btn-ink btn-lg mt-4 justify-self-start" disabled>{t.sendBtn}</button>
        </form>
      )}
      <p className="label mt-16 flex items-center gap-2 !text-ink"><span className="h-1.5 w-1.5 rounded-full bg-ink" /> {t.isAI} {site.disclosure}</p>
    </div>
  );
}

function Speak({ c, onChat }: { c: Copy; onChat: () => void }) {
  const t = c.pages.ask;
  return (
    <div className="flex min-h-[100svh] flex-col items-center justify-center px-4 text-center">
      <div className="relative flex h-56 w-56 items-center justify-center">
        <span className="beat-ring absolute inset-8 rounded-full border border-ink" />
        <span className="beat-ring absolute inset-8 rounded-full border border-ink [animation-delay:0.9s]" />
        <span className="beat-ring absolute inset-8 rounded-full border border-ink [animation-delay:1.8s]" />
        <span className="flex h-28 w-28 items-center justify-center rounded-full bg-ink text-white">
          <GalosStar className="beat h-10 w-10" />
        </span>
      </div>
      <h1 className="h2 mt-10">{t.speakTitle}</h1>
      <p className="lead mx-auto mt-4">{t.speakLine}</p>
      <p className="mt-4"><Pending note="Speak (voice): decide if it ships on day one (PENDING.md, open questions)." align="center" /></p>
      <button type="button" className="btn btn-line btn-lg mt-10" onClick={onChat}>{t.useChat}</button>
    </div>
  );
}
