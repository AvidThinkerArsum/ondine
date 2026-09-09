# Ondine — a fictional watch maison

Design study: can a one-shot build produce a Valcère-style cinematic product page — one hero object under real light that scroll takes apart and puts back together — with **no image assets at all**? The watch is drawn entirely in SVG as five separate layers (strap, case, movement, dial, bezel + crystal) so it can explode in true CSS 3D, run live seconds, and recolour per variant.

**Stack:** Next.js 16 · React 19 · Tailwind v4 · Framer Motion 13. No images, no external assets.

## Run

```bash
npm run dev -- -p 3002
```

## Where things are

| Piece | File |
|---|---|
| The five SVG layers (materials, gears, jewels, hands, moonphase) | `components/watch/layers.tsx` |
| `Watch3D` (exploding, 3D) and `WatchFlat` (catalogue), live clock | `components/watch/Watch.tsx` |
| Colourways (Nocturne / Ivoire / Céleste) and layer specs | `lib/variants.ts` |
| Gear / spiral / polar geometry helpers | `lib/geometry.ts` |
| Hero: pinned 400vh scroll, apart → hold → together, callouts, cues | `components/Hero.tsx` |
| Parallax background gears (scroll-turned, mouse-shifted) | `components/Gears.tsx` |
| Maison (macro study), Inner world (pedestal), Collection, Enquiry | `components/*.tsx` |

## Notes

- All SVG coordinates are rounded (`rd()` in `lib/geometry.ts`) so server and client render identical markup — unrounded floats caused React hydration warnings.
- Verified frame-by-frame at 1440×900 and 390×844 with a headless Playwright scroll script (kept outside the repo).
