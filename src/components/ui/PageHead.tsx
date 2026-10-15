import type { ReactNode } from "react";
import { Pending } from "./Pending";

/** The opening plate of every inner page. */
export function PageHead({
  index,
  eyebrow,
  title,
  lead,
  pending,
  children,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  pending?: string;
  children?: ReactNode;
}) {
  return (
    <header className="wrap pt-32 md:pt-44">
      <div className="label flex items-center justify-between border-b border-line pb-3">
        <span className="eyebrow !text-ink">{eyebrow}</span>
        <span>{index}</span>
      </div>
      <h1 className="h1 rise mt-10 max-w-[14ch]">{title}</h1>
      {lead && (
        <p className="lead rise mt-6" style={{ animationDelay: "120ms" }}>
          {lead} <Pending note={pending} />
        </p>
      )}
      {children}
    </header>
  );
}
