# Panorama 360°

React + TypeScript migration of the original single-file Panorama 360° experience. The original HTML remains in the repository as the immutable visual and behavioral reference.

## Requirements

- Bun 1.4 or newer
- Node.js for Vite, Vitest, and Playwright command-line tools
- A current browser with WebGL

## Development

```bash
bun install
bun run dev
```

The application has two routes:

- `/` — the original 360° panorama experience
- `/discover` — a standard destination catalog with search, country/category filters, favorites, practical details, and links into the matching panorama

Discover favorites are stored locally in the browser. Suggested duration, season, and terrain are static planning guidance rather than live travel data.

## Verification

```bash
bun run verify
```

The release gate runs strict TypeScript checking, the full unit/integration suite, the production build, byte-for-byte comparison of all extracted images against the original HTML, and Playwright browser tests.

## Features

- Four destinations, seven viewpoints, hotspots, drag/zoom, W/A/S/D and arrow-key navigation
- Auto rotation, automatic Rhine tour, fullscreen, light/dark mode, and little-planet view
- Synthesized ambience matching the original destination profiles
- Interface and destination content in English, Vietnamese, German, Korean, and Japanese
- Responsive Discover catalog with persistent favorites and accessible destination detail dialogs
- English-only browser narration in every interface language
- Optional AI guide through `window.claude.use('sample')`; the control stays hidden when unavailable

Browser narration uses the closest installed `en-US` or English voice and otherwise falls back to the browser default. Voice quality therefore varies by operating system and browser.

## Original reference

`Panorama 360° · Hướng dẫn viên AI.html` and baseline commit `76ff08a` contain the untouched original experience. Extracted image files are verified against the embedded data URLs without recompression.
