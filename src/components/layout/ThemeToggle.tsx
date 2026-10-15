"use client";

/**
 * Light / dark switch: the white sky with black stars, or the night sky with white stars.
 * Sets data-theme on <html> (globals.css flips the tokens) and remembers the choice.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const toggle = () => {
    const root = document.documentElement;
    const dark = root.dataset.theme !== "dark";
    if (dark) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", dark ? "#000000" : "#ffffff");
    try {
      localStorage.setItem("galos-theme", dark ? "dark" : "light");
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Switch between light and dark mode"
      title="Light / dark"
      className={`flex h-10 w-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-wash ${className}`}
    >
      {/* moon: to the night sky */}
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] dark:hidden" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
      </svg>
      {/* sun: back to the white sky */}
      <svg viewBox="0 0 24 24" className="hidden h-[18px] w-[18px] dark:block" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden>
        <circle cx={12} cy={12} r={4} />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <path key={a} d="M12 2.5v2.2" transform={`rotate(${a} 12 12)`} strokeLinecap="round" />
        ))}
      </svg>
    </button>
  );
}
