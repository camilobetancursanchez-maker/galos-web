/** The Galos star (the Life OS orb's star). Final logo files: vault 02_brand/logos/. */
export function GalosStar({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="200 20 1080 1280" className={className} fill="currentColor" role={title ? "img" : undefined} aria-hidden={title ? undefined : true}>
      {title && <title>{title}</title>}
      <path d="M980 45C920 300 900 640 1260 743C1050 760 900 900 646 1275C800 1000 780 700 222 650C700 620 860 400 980 45Z" />
    </svg>
  );
}
