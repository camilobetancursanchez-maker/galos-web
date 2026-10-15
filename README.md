# Galos website — a gallery of stars

Next.js 16 + Tailwind CSS 4. Version 0.1: the bones and the motion, with PENDING tags where content is missing.

## The idea
White sky, black stars. Galos is a star, and the site is a gallery of them: every AI agent is a **constellation** (its stars are the steps of its work, its lines are the work moving) and, once Higgsfield makes it, a **statue** on the wall. The hero opens as a perfect dot grid (the Braun / Mac Pro grille: the system) that lets go and becomes a sky (the art). Under the cursor, the stars fall back into the grid. Concept note in the vault: `Projects/Galos/Website/04 Concept — A gallery of stars.md`.

## Run it
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Where to edit
| What | Where |
|---|---|
| All page copy (home, Ask Galos questions, nav, contact) | `src/content/site.ts` |
| The agents: wall labels, steps, constellations, teams | `src/content/agents.ts` |
| Colors, type, motion | `src/app/globals.css` |
| Home sections (one file per vault folder `13_sections/01_home/*`) | `src/components/home/` |
| The sky: grid → stars, constellations, star chart, logo | `src/components/sky/` |
| Ask Galos (questions + diagnosis) | `src/components/ask/AskFlow.tsx` |
| Pages | `src/app/*/page.tsx` |

## Statues
Drop `figure-<slug>.webp` (or .png / .jpg) in `public/images/` (e.g. `figure-hermes.webp`). The agent's frame shows it automatically; until then it shows the constellation on a plinth.

## PENDING tags
Example content uses `<Pending note="…" />` or a `pending` field in the content files. The list lives in the vault: `Projects/Galos/Website/PENDING.md`. Hide all tags with `NEXT_PUBLIC_SHOW_PENDING=false`.

## Environment
See `.env.example`: `NEXT_PUBLIC_SITE_URL`, `GHL_WEBHOOK_URL`, `NEXT_PUBLIC_BOOKING_URL`, `NEXT_PUBLIC_SHOW_PENDING`.
