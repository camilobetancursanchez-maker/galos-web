import { NextResponse, type NextRequest } from "next/server";

/**
 * English keeps its URLs (/workers) and Spanish lives at /es (/es/workers).
 * Inside, every page is under app/[lang]: URLs without /es are rewritten to /en,
 * and a typed /en/... redirects to the URL without it.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/es" || pathname.startsWith("/es/")) return;
  const url = request.nextUrl.clone();
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url);
  }
  url.pathname = "/en" + (pathname === "/" ? "" : pathname);
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next's own files and anything with a file extension (icon.svg, images…)
  matcher: ["/((?!_next|.*\\..*).*)"],
};
