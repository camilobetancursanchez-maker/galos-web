"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { home } from "@/content/site";
import { GalosStar } from "@/components/sky/GalosStar";

/** 02 · Ask Galos prompt — one question on one wall. Section: 13_sections/01_home/02_ask-galos-prompt */
export function AskPrompt() {
  const router = useRouter();
  const [text, setText] = useState("");
  const { ask } = home;

  const go = (q: string) => router.push(`/ask?mode=chat&pain=${encodeURIComponent(q)}`);

  return (
    <section id="ask" className="section">
      <div className="wrap">
        <div className="reveal mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white">
            <GalosStar className="beat h-6 w-6" />
          </div>
          <h2 className="h2 mt-10">{ask.question}</h2>
          <form
            className="mx-auto mt-12 flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-[inset_0_0_0_1px_#d1d1d6] focus-within:shadow-[inset_0_0_0_1px_#0b0b0b]"
            onSubmit={(e) => {
              e.preventDefault();
              if (text.trim()) go(text.trim());
            }}
          >
            <label htmlFor="ask-input" className="sr-only">Tell Galos what&apos;s slowing your business down</label>
            <input
              id="ask-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type it in your own words…"
              className="h-12 min-w-0 flex-1 bg-transparent px-4 text-[17px] outline-none placeholder:text-faint"
            />
            <button type="submit" className="btn btn-ink shrink-0" aria-label="Ask Galos">
              Ask <span aria-hidden>→</span>
            </button>
          </form>
          <p className="label mt-8">or pick one</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {ask.answers.map((a) => (
              <button key={a.id} type="button" className="chip" onClick={() => go(a.label)}>
                {a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
