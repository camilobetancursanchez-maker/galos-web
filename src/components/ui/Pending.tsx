"use client";

import { useId, useState } from "react";

/**
 * PENDING tag: marks example content Camilo still has to confirm.
 * Shows the note on hover, keyboard focus or tap. Hide them all with NEXT_PUBLIC_SHOW_PENDING=false.
 * The list lives in the vault: Projects/Galos/Website/PENDING.md.
 */
export function Pending({ note, className = "", align = "left" }: { note?: string; className?: string; align?: "left" | "right" | "center" }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  if (!note || process.env.NEXT_PUBLIC_SHOW_PENDING === "false") return null;
  const pos = align === "right" ? "right-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "left-0";
  return (
    <span className={`group relative inline-flex align-middle ${className}`} data-pending={note}>
      <button
        type="button"
        aria-describedby={id}
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        onBlur={() => setOpen(false)}
        className="inline-flex cursor-help items-center gap-1.5 rounded-full bg-white px-2 py-[3px] font-sans text-[10px] font-semibold uppercase leading-none tracking-[0.12em] text-ink shadow-[inset_0_0_0_1px_#0b0b0b]"
      >
        <span className="h-1 w-1 rounded-full bg-ink" />
        Pending
      </button>
      <span
        role="tooltip"
        id={id}
        className={`pointer-events-none absolute top-full z-50 mt-2 w-64 max-w-[calc(100vw-32px)] rounded-xl bg-ink px-3 py-2 text-left font-sans text-xs font-normal normal-case leading-snug tracking-normal text-white ${pos} ${
          open ? "block" : "hidden group-hover:block group-focus-within:block"
        }`}
      >
        {note}
      </span>
    </span>
  );
}
