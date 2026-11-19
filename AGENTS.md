# salagdinova.art

Architecture portfolio of Maria Salagdinova (Politecnico di Milano). An EmDash site (Astro CMS) on Cloudflare Workers + D1 + R2. Admin at `/_emdash/admin`.

## Commands

```bash
pnpm dev      # dev server, http://localhost:4321
pnpm build
pnpm deploy   # astro build && wrangler deploy
```

## Design rules (from Maria's own portfolio — follow them)

- One typeface: Jost (self-hosted, `@fontsource/jost`), a free stand-in for Futura PT. 400 for text, 500 for titles. No second face.
- Black and white only. Grey (`--grey`) for team names and secondary text. No accent colour in the UI: colour comes only from the images.
- Small, quiet type. Title + place top-left, credits (course, year / professors / team in grey) bottom-left — like the portfolio sheets.
- One strong image per screen, lots of empty space. No shadows, rounded corners, gradients, cards or animations beyond a CSS hover.
- Styles live in `src/styles/global.css`.

## Languages

`en` (default, no prefix), `it` (`/it/…`), `ru` (`/ru/…`), configured in `astro.config.mjs`. Never set `prefixDefaultLocale` — it breaks the admin.

- Content is translated in the admin (Translations panel). Each translation is its own entry with the same slug.
- Interface strings (nav, "Context", "Next project"…) are in `src/i18n.ts`.
- Route files under `src/pages/`, `src/pages/it/`, `src/pages/ru/` are thin wrappers around the views in `src/views/`. Add a route in all three.

## Schema (see `seed/seed.json`)

- `projects`: `title`, `place`, `course`, `year`*, `professors`*, `team`*, `order`*, `cover`*, `summary`, `context` (Portable Text), `figures`* (repeater: `image`, `caption`, `caption_it`, `caption_ru`, `background` White/Black, `size` Full width/Wide/Half width/Narrow). Fields marked * are shared by all languages, so an image replaced in one language changes everywhere.
- `pages`: `title`, `image`*, `content`. Slugs: `home` (shown at `/`: image = cover collage, content = the line under it), `about`, `contact`.
- Home lists published projects sorted by `order`.

`src/components/Figures.astro` groups consecutive figures with the same background into one band; two consecutive "Half width" figures sit side by side.

## Seed

`seed/seed.json` is generated (schema + content in three languages). Its `$media` URLs point at `seed/media/*.jpg` in the public GitHub repo `aosaos-gith/salagdinova-art` (branch `main`): the Worker downloads them into R2 during the setup wizard, so the repo must be public at that moment. After setup the seed is no longer read; editing it does not change a site that is already set up.

Images were extracted from Maria's PDF portfolio; she replaces them with originals in the admin (Media library, or the image fields).
