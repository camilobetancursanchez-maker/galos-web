import fs from "node:fs";
import path from "node:path";

/**
 * Finds an agent's statue in public/images (figure-<slug>.webp/.png/.jpg).
 * Drop the approved image from the vault's 11_site-images/ there and it shows up on its own.
 */
export function figureSrc(slug: string): string | undefined {
  for (const ext of ["webp", "png", "jpg"]) {
    const file = `figure-${slug}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", "images", file))) return `/images/${file}`;
  }
  return undefined;
}

export function figureMap(slugs: string[]) {
  return Object.fromEntries(slugs.map((s) => [s, figureSrc(s)]));
}
