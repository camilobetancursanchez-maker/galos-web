"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { home } from "@/content/site";
import { wings } from "@/content/agents";
import { GalosStar } from "@/components/sky/GalosStar";

/** 04 · Ask Galos prompt — one question on one wall. The tap answers are the 5 wing problems. Section: 13_sections/01_home/04_ask-galos-prompt */
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
            className="mx-auto mt-12 flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)] focus-within:shadow-[inset_0_0_0_1px_var(--color-ink)]"
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
            {[...wings.map((w) => w.problem), ask.other].map((label) => (
              <button key={label} type="button" className="chip" onClick={() => go(label)}>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
