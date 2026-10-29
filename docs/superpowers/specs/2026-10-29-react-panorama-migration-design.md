# React Panorama Migration Design

## Intent

Migrate the existing single-file `Panorama 360° · Hướng dẫn viên AI.html` demo to a maintainable React + TypeScript application without losing or intentionally changing any existing image, content, interaction, visual rule, or capability. This migration is the first delivery phase and must be committed and pushed before any new route or feature work begins.

The original HTML and commit `76ff08a` are the immutable behavioral and visual reference for parity.

## Goals

- Rebuild the current experience with Vite, React, and TypeScript.
- Preserve every embedded panorama and thumbnail at the same source quality.
- Preserve the existing glassmorphism design, teal accent, responsive layout, light/dark themes, and reduced-motion behavior.
- Preserve all current panorama interactions and auxiliary features.
- Add interface/content localization for English, Vietnamese, German, Korean, and Japanese.
- Use English as the default interface language and persist the user's explicit language choice locally.
- Keep narration English-only in every interface language.
- Produce a separately verifiable React migration commit and push it to `origin/main` before work on new routes begins.

## Non-goals

- No new product route such as `/discover` in this phase.
- No redesign, new visual direction, new destination, or new panorama.
- No authentication, database, backend, CMS, analytics, or paid service.
- No server-generated speech or multilingual narration.
- No replacement or recompression of current images.
- No removal of the original HTML reference file.

## Anti-goals

The migration is considered unsuccessful if it looks cleaner internally but loses a current feature, changes image quality, alters established interaction behavior, materially changes the layout, or combines migration work with new-route development in the same commit.

## Current Experience That Must Remain

### Visual and responsive behavior

- Full-viewport WebGL panorama canvas.
- `Be Vietnam Pro` typography and current system fallbacks.
- Frosted glass panels, 18px-family rounded corners, existing shadows, and teal accent tokens.
- Automatic OS theme handling plus explicit light/dark toggle.
- Desktop side destination list and mobile horizontal destination list.
- Responsive chat, destination controls, direction pad, step label, attribution, toast, intro, hotspot cards, and safe-area handling.
- Reduced-motion support.

### Panorama and navigation

- Four destinations and all seven existing viewpoint nodes.
- All current embedded panorama and thumbnail images with byte-equivalent source data.
- Three.js inverted sphere rendering and existing projection behavior.
- Drag/pointer look, mouse-wheel zoom, auto-rotation, fullscreen, and little-planet mode.
- W/A/S/D and arrow-key navigation.
- On-screen directional pad.
- Directional navigation hotspots and information hotspots.
- Existing viewpoint transitions, fades, cards, toasts, arrival direction, FOV behavior, and destination selection.
- Existing Rhine multi-view walking path and automatic tour.

### Audio and AI

- Synthesized ambient sound behavior and per-destination audio profiles.
- English-only browser `speechSynthesis` narration.
- Narration always reads the canonical English destination/viewpoint text, even when the interface is Vietnamese, German, Korean, or Japanese.
- Prefer an installed `en-US` voice, then any English voice, then the browser default.
- Existing AI guide panel, suggested questions, input, conversation history, rate-limit/permission/general errors, and location context.
- Retain the current optional `window.claude.use('sample')` integration behind a typed adapter; when unavailable, the AI control remains hidden exactly as it is now.
- AI prompts and answers follow the selected interface language.

## Localization

Use `i18next` with `react-i18next` and five complete locale resources: `en`, `vi`, `de`, `ko`, and `ja`.

Localized material includes:

- Page metadata and intro copy.
- All controls, titles, ARIA labels, tooltips, loading states, toasts, and errors.
- Destination names, locations, descriptions, viewpoint names, hotspot labels/descriptions, navigation labels, credits, and step status.
- AI greeting, suggestions, prompts, and error messages.

English is the authored canonical content. Other locales are explicit translations rather than runtime machine translation. The selected locale is stored in local storage. On first visit, English is used regardless of browser locale, matching the user's requirement that the converted experience start in English.

The implementation owner authors and self-checks the Vietnamese, German, Korean, and Japanese translations. No separate external translation delivery or approval gate is required for this phase.

The language picker is the only visible additive control allowed in this phase. It must use the same glass-panel visual rules and fit desktop and mobile layouts without obscuring existing controls.

## Technical Shape

### Application foundation

- Vite
- React
- TypeScript with strict checking
- Three.js directly, managed through React lifecycle hooks
- i18next and react-i18next
- Vitest and Testing Library for behavior that can be reliably covered outside WebGL
- Playwright for browser-level parity checks

Direct Three.js is preferred over React Three Fiber for this phase because it minimizes rendering-semantic changes from the current implementation and makes parity easier to prove.

### Modules

- `src/app`: application shell, providers, metadata, and route entry.
- `src/panorama`: Three.js scene lifecycle, camera state, texture loading, pointer/keyboard/wheel controls, projection, and transitions.
- `src/features/tour`: destination list, viewpoint graph, automatic tour, hotspots, cards, and directional controls.
- `src/features/audio`: English narration and synthesized ambience.
- `src/features/ai-guide`: typed optional Claude sample adapter and chat state.
- `src/features/language`: locale picker and persisted preference.
- `src/data`: canonical English destination/viewpoint data and image assets.
- `src/locales`: five locale resources.
- `src/styles`: current design tokens, component styles, responsive rules, and reduced-motion rules.

The builder may choose exact filenames and component boundaries as long as these responsibilities remain separated and observable behavior remains unchanged.

### Asset preservation

Extract embedded base64 images from the original HTML into source-controlled binary asset files without decoding/re-encoding transformations. Verify hashes or byte identity after extraction. The original HTML remains in the repository for reference but is not the production entry point.

### Route behavior

The React application owns `/`. No additional product route is introduced in this migration phase. Vite history fallback must allow the deployed root experience to load normally.

## State and Lifecycle

React owns interface state such as current destination, current viewpoint, visible card, chat visibility, theme, language, voice toggle, ambience toggle, tour state, and loading status.

The panorama engine owns high-frequency mutable rendering values such as longitude, latitude, FOV, drag coordinates, animation-frame state, projected hotspot positions, and Three.js objects. These values live in refs/engine state rather than triggering React renders every frame.

All global listeners, animation frames, audio nodes, speech, textures, materials, geometries, and renderer resources must be cleaned up when the experience unmounts or reloads during development.

## Accessibility and Performance

- Preserve and translate accessible names for every interactive control.
- Maintain visible keyboard focus.
- Preserve keyboard navigation while avoiding shortcuts when typing in inputs.
- Keep touch interaction and safe-area behavior.
- Respect `prefers-reduced-motion` for automatic visual movement and hotspot pulse.
- Lazy-initialize WebGL/audio/speech work where compatible with the existing start interaction.
- Cap renderer pixel ratio as the original does.
- Avoid React state updates on animation frames.
- Load only what is required for the initial experience while ensuring destination transitions do not regress visibly.

## Verification and Acceptance

### Automated checks

- TypeScript check and production build pass.
- Unit tests cover locale selection/persistence, English-only voice selection/fallback, destination/viewpoint graph behavior, tour progression, and feature fallbacks.
- Browser checks cover intro/loading, destination switching, information hotspots, directional navigation, keyboard controls, theme, fullscreen availability handling, little-planet mode, auto tour, ambience toggle, narration toggle, language switching, responsive layouts, and optional AI control behavior.
- Asset identity checks prove that every original panorama and thumbnail is present without recompression.

### Manual parity pass

Compare the original HTML and React build at desktop and mobile viewport sizes. Exercise every destination, viewpoint, hotspot, button, keyboard shortcut, audio toggle, tour state, theme, and locale. Differences require correction unless they are limited to the approved language picker or unavoidable browser/runtime variation.

## Delivery Sequence

1. Preserve the existing baseline commit (`76ff08a`).
2. Scaffold and implement the React migration only.
3. Install and lock required dependencies.
4. Run automated and manual parity verification.
5. Create a focused, reviewable React migration commit series with no new-route work mixed in.
6. Push `main` to `origin` at `https://github.com/minhtuan12/virtual-demo.git`.
7. Stop and report the pushed migration result.
8. Begin separate brainstorming/design for new routes and features only afterward.

## Builder Decisions

The builder may decide exact component granularity, test file organization, translation key naming, and internal engine APIs. These choices must favor behavioral parity and clear ownership over abstraction for its own sake.
