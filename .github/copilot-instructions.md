# Copilot instructions for contributors — mikkelgulliksen

Purpose: give AI coding agents immediate, actionable context so they can make safe, correct edits in this repo.

## Architecture & big picture ✅
- Frontend: React + TypeScript + Vite in `frontend/`. UI is small, component-driven and uses Tailwind utilities + a handful of global CSS variables (`frontend/src/index.css`).
- Backend: placeholder Python in `backend/` (`backend/main.py`). Not yet production — treat as minimal/standalone script.
- Content model: single source of truth is `frontend/src/siteConfig.ts` (list of `Project` objects). Most UI is driven from this file.

## Key developer workflows (commands) 🔧
- Run dev server: cd `frontend` && `npm install` && `npm run dev` (Vite HMR)
- Build (typecheck + bundle): `cd frontend && npm run build` (runs `tsc -b && vite build`)
- Lint: `cd frontend && npm run lint` (ESLint + typescript-eslint)
- Preview production build: `cd frontend && npm run preview`
- Video asset workflows: `./scripts/download_videos.sh` (requires `yt-dlp`), `./scripts/compress_small.sh` (requires `ffmpeg`).

## Project-specific conventions & patterns ⚙️
- Content edits → always modify `frontend/src/siteConfig.ts`. Components import that directly.
  - Categories are a literal union: `"MUSIC VIDEO" | "COMMERCIAL" | "FILM" | "LIVE" | "OTHER"` — use these exact strings.
  - Key helper: use `projectKey(project)` for stable React keys.
- Video embedding: `YouTubeEmbed.tsx` lazy-loads the iframe only after user interaction — preserve this pattern for performance.
- `VideoEmbed` supports `youtubeId`, `vimeoId`, or `mp4Url` + `posterUrl`. Prefer the same prop names when adding new components.
- Styling: prefer Tailwind utilities; global theme variables live in `frontend/src/index.css`.
- Type safety: TypeScript is strict (`tsconfig.app.json`). `npm run build` performs `tsc -b` — fixes must preserve type correctness.

## Small examples from the repo (copy/paste safe) 💡
- Add a new project (edit `frontend/src/siteConfig.ts`):

```ts
{
  mp4Url: "https://example.com/video.mp4",
  posterUrl: "/assets/thumb.jpg",
  title: "My New Piece",
  role: "Producer",
  year: "2025",
  category: "COMMERCIAL",
}
```

- Preserve lazy-load pattern when embedding video (see `frontend/src/components/YouTubeEmbed.tsx`).

## Linting / testing / CI notes ⚠️
- There are no automated tests currently (backend `tests/` is empty). Add tests and CI if you introduce logic.
- Always run `npm run lint` and `npm run build` before creating a PR — type-checking is enforced at build-time.

## Asset & media pipeline 📹
- Use `scripts/download_videos.sh` to pull files listed in `scripts/download-list.txt`.
- Use `scripts/compress_small.sh` for quick ffmpeg-based compression (useful for local previews).

## Where to look when changing UX or data
- Data/content: `frontend/src/siteConfig.ts`
- Grid / filtering behavior: `frontend/src/components/ProjectsSection.tsx`
- Video embeds: `frontend/src/components/VideoEmbed.tsx` & `YouTubeEmbed.tsx`
- Global styles: `frontend/src/index.css`
- Lint/type rules: `frontend/eslint.config.js` and `frontend/tsconfig.app.json`

## PR checklist for Copilot changes ✅
- If you change `Project` shape, update all components importing it and run `npm run build`.
- Keep video iframe lazy-load behaviour unless you explicitly justify a change.
- Add/modify sample data in `siteConfig.ts` rather than hard-coding values in components.
- Run `npm run lint` and ensure no type errors.

---
If anything here is unclear or you want more detail (CI, deployment, or sample tests), tell me which section to expand. I can iterate on this file.