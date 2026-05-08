# Scroll Hero Showcase Upgrades — Design Spec
Date: 2026-05-09

## Goal
Elevate the MarkFive scroll hero from a polished MVP into a jaw-dropping vibe coding showcase — adding cinematic effects, full page depth, and interactive flourishes that make visitors want to share it.

## Current State
- Scroll-jacked frame animation (61 PNGs, Apple-style)
- Framer Motion parallax on title/metadata
- Custom cursor (gold dot + ring)
- Loading screen with progress bar
- Single "Vision" text section below the hero

## Approved Feature Set

### Layer 1 — Cinematic Polish (in-hero upgrades)
1. **Film grain overlay** — animated SVG turbulence filter at ~4% opacity, steps animation for film-like flicker
2. **Mouse parallax on canvas** — canvas oversized by 40px each side, translates ±10–20px following normalized cursor; 1.4s spring transition
3. **Color temperature shift** — warm gold radial gradient fades out (0→50% scroll), cool blue radial gradient fades in (30→100% scroll)
4. **Magnetic nav items** — each nav label subtly pulls ±10px toward cursor within 70px radius
5. **Audio ambient toggle** — speaker button in nav; Web Audio API generates filtered wind noise + 60Hz sine drone; fade in/out on toggle
6. **TextScramble on title** — "MARK" and "FIVE" cycle through random chars before resolving, triggered after load
7. **Chapter progress sidebar** — 4 chapters (ARRIVAL / ASCENT / THE VIEW / RESIDENCE) shown as vertical markers on left, replaces static vertical label

### Layer 2 — New Sections (below hero)
8. **Specs section** — 6-cell grid (floors, residences, ceiling height, elevation, year, facade) + 8 amenity items; scroll-reveal entry animations
9. **Gallery section** — 5-card horizontal scroll (pinned, 500vh container); each card is CSS-art with corner marks, floor detail, label
10. **Contact section** — floating-label form (name, email, phone), submit confirmation, "MARK FIVE" watermark background

### Layer 3 — Global Infrastructure
11. **ScrollReveal component** — `whileInView` wrapper with directional entry (up/left/right) and configurable delay
12. **FilmGrain component** — SVG filter + animated div, rendered globally in layout

## Architecture

### New Files
- `components/FilmGrain.tsx`
- `components/TextScramble.tsx`
- `components/ScrollReveal.tsx`
- `components/sections/SpecsSection.tsx`
- `components/sections/GallerySection.tsx`
- `components/sections/ContactSection.tsx`

### Modified Files
- `components/ScrollHero.tsx` — add mouse parallax, color temp, magnetic nav, audio, scramble, chapters
- `app/globals.css` — grain keyframes, input autofill overrides
- `app/page.tsx` — add FilmGrain + new sections

## Key Constraints
- No hooks in loops — GallerySection uses `GalleryDot` sub-component for per-item motion values
- Canvas parallax: logical size (1536×1024) unchanged; CSS handles oversized display
- Web Audio: AudioContext created only on user gesture (button click satisfies autoplay policy)
- TextScramble: triggered 700ms after `loaded` becomes true to let entry animation finish first
