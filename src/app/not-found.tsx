import Link from "next/link";
import { GalosStar } from "@/components/sky/GalosStar";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[80svh] flex-col items-center justify-center text-center">
      <GalosStar className="twinkle h-10 w-10" />
      <p className="label mt-8">Cat. GLS-404</p>
      <h1 className="h2 mt-4 max-w-[16ch]">This star isn&apos;t in the Collection yet.</h1>
      <Link href="/" className="btn btn-ink mt-10">Back to the gallery</Link>
    </section>
  );
}
