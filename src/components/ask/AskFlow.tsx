"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { getAgent } from "@/content/agents";
import { askQuestions, home, site } from "@/content/site";
import { GalosStar } from "@/components/sky/GalosStar";
import { Constellation } from "@/components/sky/Constellation";
import { Pending } from "@/components/ui/Pending";

/**
 * Ask Galos (/ask): one question per screen, then the Diagnosis.
 * This is the skeleton: the questions and the recommendation rules are local.
 * Later the conversation runs on Claude through the site's backend (06_ask-galos).
 * Sections: 13_sections/04_ask-galos
 */

const PAIN_TO_AGENTS: Record<string, string[]> = {
  "I don't get enough leads": ["artemis", "argus", "calliope"],
  "I lose leads": ["nike", "mnemosyne", "hermes"],
  "Too many messages": ["hermes", "athena"],
  "No website": ["daedalus", "pygmalion"],
};
const PAIN_TO_LEAKS: Record<string, string[]> = {
  "I don't get enough leads": ["Get leads"],
  "I lose leads": ["Follow up", "Organize"],
  "Too many messages": ["Answer"],
  "No website": ["Get leads"],
};
const STAGES = ["Get leads", "Answer", "Follow up", "Organize", "Close", "Reviews"];

type Answers = Record<string, string[]>;

export function AskFlow() {
  const params = useSearchParams();
  const mode = params.get("mode") === "speak" ? "speak" : "chat";
  const initialPain = params.get("pain") ?? "";
  const known = home.ask.answers.map((a) => a.label);

  const [speak, setSpeak] = useState(mode === "speak");
  const [i, setI] = useState(0);
  const [answers, setAnswers] = useState<Answers>((): Answers =>
    initialPain ? { pain: [known.includes(initialPain) ? initialPain : "Something else"] } : {},
  );
  const [notes, setNotes] = useState<Record<string, string>>((): Record<string, string> => (initialPain && !known.includes(initialPain) ? { pain: initialPain } : {}));
  const done = i >= askQuestions.length;

  if (speak) return <Speak onChat={() => setSpeak(false)} />;
  if (done) return <Diagnosis answers={answers} notes={notes} onRestart={() => setI(0)} />;

  const q = askQuestions[i];
  const picked = answers[q.id] ?? [];
  const toggle = (o: string) =>
    setAnswers((a) => {
      const cur = a[q.id] ?? [];
      const next = q.multi ? (cur.includes(o) ? cur.filter((x) => x !== o) : [...cur, o]) : [o];
      return { ...a, [q.id]: next };
    });

  return (
    <div className="mx-auto flex min-h-[calc(100svh-64px)] max-w-3xl flex-col px-4 pb-10 pt-28 md:pt-36">
      {/* progress: six stars */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2" aria-label={`Question ${i + 1} of ${askQuestions.length}`}>
          {askQuestions.map((x, k) => (
            <span key={x.id} className={`h-1.5 rounded-full transition-all duration-500 ${k < i ? "w-1.5 bg-ink" : k === i ? "w-6 bg-ink" : "w-1.5 bg-line-strong"}`} />
          ))}
        </div>
        <span className="label num">{String(i + 1).padStart(2, "0")} / 0{askQuestions.length}</span>
      </div>

      <div key={q.id} className="rise mt-16 flex-1">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white">
            <GalosStar className="beat h-4 w-4" />
          </span>
          <span className="label">Galos asks</span>
        </div>
        <h1 className="h1 mt-6">{q.q}</h1>
        {q.multi && <p className="mt-3 text-muted">Pick all that apply.</p>}
        <div className="mt-10 flex flex-wrap gap-2">
          {q.options.map((o) => (
            <button key={o} type="button" className="chip !h-12 !px-5 !text-[17px]" aria-pressed={picked.includes(o)} onClick={() => toggle(o)}>
              {o}
            </button>
          ))}
        </div>
        <label className="mt-8 block">
          <span className="sr-only">Or say it in your own words</span>
          <input
            value={notes[q.id] ?? ""}
            onChange={(e) => setNotes((n) => ({ ...n, [q.id]: e.target.value }))}
            placeholder="Or say it in your own words…"
            className="h-12 w-full border-b border-line-strong bg-transparent text-[17px] outline-none transition-colors placeholder:text-faint focus:border-ink"
          />
        </label>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button type="button" onClick={() => setI((v) => Math.max(v - 1, 0))} className={`text-[15px] text-muted hover:text-ink ${i === 0 ? "invisible" : ""}`}>
          ← Back
        </button>
        <button type="button" className="btn btn-ink btn-lg" onClick={() => setI((v) => v + 1)} disabled={!picked.length && !notes[q.id]}>
          {i === askQuestions.length - 1 ? "See my diagnosis" : "Next"}
        </button>
      </div>
    </div>
  );
}

function Diagnosis({ answers, notes, onRestart }: { answers: Answers; notes: Record<string, string>; onRestart: () => void }) {
  const pains = useMemo(() => answers.pain ?? [], [answers.pain]);
  const slow = (answers.speed ?? []).some((s) => /hours|next day/.test(s));
  const recs = useMemo(() => {
    const list = pains.flatMap((p) => PAIN_TO_AGENTS[p] ?? []);
    if (slow) list.unshift("hermes");
    return [...new Set(list)].slice(0, 3).map((s) => getAgent(s)!);
  }, [pains, slow]);
  const leaks = new Set(pains.flatMap((p) => PAIN_TO_LEAKS[p] ?? []));
  if (slow) leaks.add("Answer");
  const [send, setSend] = useState(false);
  const type = answers.type?.[0];
  const who = type && type !== "Other" ? `your ${type.toLowerCase()}` : "your business";

  return (
    <div className="wrap pb-10 pt-28 md:pt-36">
      <div className="label flex items-center justify-between border-b border-line pb-3">
        <span className="eyebrow !text-ink">Your diagnosis</span>
        <button type="button" onClick={onRestart} className="hover:text-ink">Start again</button>
      </div>
      <h1 className="h1 rise mt-10 max-w-[16ch]">
        Here&apos;s where {who} loses clients.
      </h1>

      {/* The map of their business: leaks in black */}
      <div className="plate rise mt-14 bg-white px-4 py-10 md:px-10" style={{ animationDelay: "150ms" }}>
        <span className="mark-b" />
        <p className="label absolute left-4 top-3">The map of your business</p>
        <ol className="relative mt-6 grid grid-cols-3 gap-y-10 md:grid-cols-6">
          <div className="absolute left-[8%] right-[8%] top-[9px] hidden h-px bg-line-strong md:block" />
          {STAGES.map((s) => {
            const leak = leaks.has(s);
            return (
              <li key={s} className="relative flex flex-col items-center text-center">
                <span className={`relative flex h-5 w-5 items-center justify-center rounded-full ${leak ? "bg-ink" : "border border-line-strong bg-white"}`}>
                  {leak && <span className="beat-ring absolute inset-0 rounded-full border border-ink" />}
                </span>
                <span className={`mt-4 text-[15px] ${leak ? "font-semibold" : "text-muted"}`}>{s}</span>
                {leak && <span className="label mt-1 !text-ink">Leak</span>}
              </li>
            );
          })}
        </ol>
        {notes.pain && <p className="mt-8 text-center text-[15px] text-muted">You said: &ldquo;{notes.pain}&rdquo;</p>}
      </div>

      {/* Recommended agents */}
      <section className="mt-20">
        <p className="label eyebrow !text-ink">Galos recommends</p>
        {recs.length ? (
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {recs.map((a, k) => (
              <Link key={a.slug} href={`/agents/${a.slug}`} className="rise group rounded-[24px] bg-white p-6 shadow-[inset_0_0_0_1px_#e5e5ea] transition-shadow hover:shadow-[inset_0_0_0_1px_#0b0b0b]" style={{ animationDelay: `${250 + k * 120}ms` }}>
                <div className="flex items-start justify-between">
                  <Constellation agent={a} starScale={2} className="in h-20 w-20 text-ink" />
                  <span className="label">{a.catalog}</span>
                </div>
                <h2 className="h3 mt-6">{a.figure}, <span className="text-muted">{a.role}</span></h2>
                <p className="mt-2 text-[15px] text-muted">{a.does}</p>
                <p className="label mt-5 !text-ink">Why: {pains.find((p) => PAIN_TO_AGENTS[p]?.includes(a.slug)) ?? "you answer slowly"}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="h3 mt-6 max-w-[24ch]">Your business needs a piece made just for it. Let&apos;s talk.</p>
        )}
      </section>

      {/* Estimate */}
      <section className="mt-16 rounded-[24px] bg-wash p-8 md:p-10">
        <p className="label">Estimate, not a promise</p>
        <p className="h3 mt-3">About __ more appointments a month at your close rate.</p>
        <p className="mt-3"><Pending note="The estimate comes when Ask Galos runs on Claude (06_ask-galos). Always 'estimate', never a guarantee." /></p>
      </section>

      {/* Three ways forward */}
      <section className="mt-12 flex flex-col gap-3 sm:flex-row">
        <Link href={recs.length >= 3 ? "/teams" : recs[0] ? `/agents/${recs[0].slug}#hire` : site.bookingUrl} className="btn btn-ink btn-lg">
          {recs.length > 1 ? "Hire this team" : recs.length ? `Hire ${recs[0].figure}` : "Book a call"}
        </Link>
        <Link href={site.bookingUrl} className="btn btn-line btn-lg">Book a call</Link>
        <button type="button" className="btn btn-line btn-lg" onClick={() => setSend(true)}>Send me this diagnosis</button>
      </section>

      {send && (
        <form className="rise mt-10 grid max-w-xl gap-4" onSubmit={(e) => e.preventDefault()}>
          <p className="label">Send me this diagnosis <Pending note="Form → GoHighLevel webhook (GHL_WEBHOOK_URL) + WhatsApp/email follow-up. Not connected yet." /></p>
          {["Name", "WhatsApp", "Email"].map((f) => (
            <label key={f} className="block">
              <span className="sr-only">{f}</span>
              <input placeholder={f} className="h-12 w-full border-b border-line-strong bg-transparent text-[17px] outline-none placeholder:text-faint focus:border-ink" />
            </label>
          ))}
          <button type="submit" className="btn btn-ink btn-lg mt-4 justify-self-start" disabled>Send</button>
        </form>
      )}
      <p className="label mt-16 flex items-center gap-2 !text-ink"><span className="h-1.5 w-1.5 rounded-full bg-ink" /> Galos is an AI. {site.disclosure}</p>
    </div>
  );
}

function Speak({ onChat }: { onChat: () => void }) {
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
      <h1 className="h2 mt-10">Speak to Galos.</h1>
      <p className="lead mx-auto mt-4">Tell it about your business, out loud, like you would to a friend.</p>
      <p className="mt-4"><Pending note="Speak (voice): decide if it ships on day one (PENDING.md, open questions)." align="center" /></p>
      <button type="button" className="btn btn-line btn-lg mt-10" onClick={onChat}>Use chat instead</button>
    </div>
  );
}
