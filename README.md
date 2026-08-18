# Game Design Global School Explorer

A bilingual, globe-first school exploration MVP for game design, game art, game development, and interactive/digital media. Serious-games programmes are included under the broader Game Design direction.

## Architecture

- **Data layer** — typed school and country records in `src/data/`; bilingual display names and official tuition sources are maintained in `src/data/schoolMeta.ts`.
- **Localization layer** — all interface copy lives in `src/locales.ts`; school descriptions and estimates carry paired English/Chinese fields.
- **Interaction layer** — `App.tsx` owns selection, camera target, filter, and language state.
- **Presentation layer** — focused components for globe, search, filters, language control, and details in `src/components/`.
- **Globe rendering** — `react-globe.gl` + Three.js with bundled Natural Earth country geometry from `world-atlas`, so the map does not depend on a live map or weather service.

## Run locally

```bash
pnpm install
pnpm dev
```

Production check:

```bash
pnpm build
pnpm preview
```

## MVP behavior

- Drag and zoom the 3D globe; introductory auto-rotation stops on interaction.
- Hover countries for uncluttered labels and click dataset countries for an overview.
- Click glowing school markers to open details.
- Search a school, city, country, or region; selecting a result flies the camera to it.
- Multi-select degree, region, and field filters.
- Switch English/Chinese instantly without a refresh.
- On mobile, filters become horizontal chips and details open as a bottom sheet.

## Data note

The 42-school dataset is representative, not exhaustive, with a stronger UK/US/Hong Kong/Macao focus. Tuition cards state whether a figure is annual, per semester, per credit, or a full-programme amount and link to an official fee source. Admissions and portfolio requirements change; uncertain items remain explicitly marked **Check Official Requirements** and link to institutional sources.
