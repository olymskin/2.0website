# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Artifacts

### OLYM – Luxury Skincare Landing Page (`artifacts/olym`)

A high-end cinematic landing page for the OLYM luxury skincare brand.

**Tech stack:**
- React + Vite (frontend-only, no backend)
- Tailwind CSS with custom OLYM design tokens
- GSAP + ScrollTrigger for pinned scroll animations
- React Three Fiber / Three.js for 3D interactive product section
- Cormorant Garamond (serif headings) + Inter (body) from Google Fonts

**Design system:**
- Background: `#0A0A0A`
- Primary accent: `#6E0F1A` (cherry wine)
- Secondary accent: `#3B0A0F`
- Gold highlight: `#C6A46A`
- Text primary: `#F4EFE9`
- Text secondary: `#A89C92`

**Components:**
- `Header` — floating OLYM logo (top right), menu icon (top left), scroll-aware fade
- `HeroVideo` — fullscreen autoplay video background with headline + Enter CTA
- `PinnedStorySection` — GSAP ScrollTrigger pinned sections with staged text reveal
- `RichTextSection` — dark background, centered editorial copy + gold CTA button
- `ProductExperience` — Three.js 3D rotating jar with WebGL error boundary fallback
- `HeroImageSection` — fullscreen static image with editorial headline
- `FounderCircleSection` — GSAP pinned scroll with staged text lines overlay
- `FinalCTASection` — final dark CTA section linking to Tally form
- `Footer` — minimal OLYM footer with muted links

**Media replacement points:**
- Hero video: replace `src` in `HeroVideo.tsx` with your video file path (e.g. `/videos/hero.mp4`)
- Pinned story backgrounds: replace `imageSrc` props in `Home.tsx` for each `PinnedStorySection`
- Hero image: replace `imageSrc` in the `HeroImageSection` call in `Home.tsx`
- Founder Circle background: replace `imageSrc` in the `FounderCircleSection` call in `Home.tsx`
- Tally form URL: update `TALLY_URL` constant in `FinalCTASection.tsx`

**Notes:**
- 3D product section uses a CSS fallback jar in environments without WebGL
- All scroll animations respect `prefers-reduced-motion`
- Mobile-first, responsive design
