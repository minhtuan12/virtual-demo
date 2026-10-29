# React Panorama Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the single-file production entry with a React + TypeScript application that preserves the complete panorama experience and adds five localized interfaces with English-only narration.

**Architecture:** React owns low-frequency product state and renders the interface; a direct Three.js engine owns the animation loop and high-frequency panorama state behind a typed controller. Canonical English data, extracted image assets, translations, audio, and the optional AI adapter remain separate so parity can be tested without coupling every feature to WebGL.

**Tech Stack:** Vite, React, TypeScript, Three.js, i18next, react-i18next, Vitest, Testing Library, Playwright, Bun

**Spec:** `docs/superpowers/specs/2026-10-29-react-panorama-migration-design.md`

## Global Constraints

- Commit `76ff08a` and `Panorama 360° · Hướng dẫn viên AI.html` are the immutable parity baseline.
- Preserve all panorama and thumbnail image bytes; do not recompress or replace assets.
- Preserve all current visual rules and behavior except for the approved language picker.
- UI/content locales are exactly `en`, `vi`, `de`, `ko`, and `ja`; first visit defaults to English and explicit selection persists locally.
- Narration is English-only for every selected UI locale and prefers `en-US`, then any English voice, then browser default.
- Keep the optional `window.claude.use('sample')` behavior behind a typed adapter and hide the AI control when unavailable.
- Do not add `/discover` or any other new product route in this phase.
- The implementation owner authors and self-checks all four non-English translations.
- New-route work begins only after this migration passes parity checks, is committed, and is pushed to `origin/main`.

## Review Focus

- A device with no English speech voice must still narrate through the browser default without throwing; Task 5 pins this fallback.
- A locale persisted with an invalid or obsolete value must recover to English; Task 2 pins this input.
- An AI runtime that rejects permission or does not exist must keep the panorama usable and hide or gracefully fail the AI surface; Task 6 pins both states.
- Rapid destination changes during image loading must not display a stale texture or leak Three.js resources; Task 3 pins stale-load disposal.
- Keyboard shortcuts must not trigger panorama navigation while the user types in the AI input; Task 4 pins input isolation.

---

### Task 1: React foundation and exact asset extraction

**Files:**
- Create: `package.json`
- Create: `bun.lock`
- Create: `index.html`
- Create: `tsconfig.json`
- Create: `tsconfig.app.json`
- Create: `vite.config.ts`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `src/main.tsx`
- Create: `src/app/App.tsx`
- Create: `src/app/App.test.tsx`
- Create: `scripts/extract-original-assets.mjs`
- Create: `tests/assets/original-assets.test.ts`
- Create: `src/assets/panoramas/*`
- Create: `src/assets/thumbnails/*`
- Modify: `.gitignore`

**Interfaces:**
- Consumes: the baseline HTML's `IMG` and `TH` arrays.
- Produces: Vite scripts `dev`, `build`, `typecheck`, `test`, and `test:e2e`; deterministic asset files and `src/assets/manifest.json` with `{ panoramas: AssetEntry[]; thumbnails: AssetEntry[] }`, where `AssetEntry = { file: string; sha256: string; bytes: number }`.

- [ ] **Step 1: Write the failing shell and asset tests**

Add `App.test.tsx` asserting the React shell renders `Panorama 360°`, and `original-assets.test.ts` asserting the manifest contains every original data URL with matching decoded byte length and SHA-256.

- [ ] **Step 2: Run the tests and verify the foundation is absent**

Run: `bun test`

Expected: FAIL because the package and React entry do not exist.

- [ ] **Step 3: Add the minimal Vite/React/TypeScript test foundation**

Pin compatible current versions in `package.json`; configure strict TypeScript, jsdom Vitest, Testing Library cleanup, and Chromium Playwright. Keep `/` as the only application entry.

- [ ] **Step 4: Implement deterministic asset extraction**

`scripts/extract-original-assets.mjs` must read the baseline HTML, parse only the literal `IMG` and `TH` arrays, decode without re-encoding, write extension-correct binary files, and generate stable hashes in `manifest.json`.

- [ ] **Step 5: Install dependencies and generate assets**

Run: `bun install && bun run extract:assets`

Expected: lockfile created; panorama and thumbnail assets plus manifest generated.

- [ ] **Step 6: Run the foundation checks**

Run: `bun run typecheck && bun test tests/assets/original-assets.test.ts src/app/App.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit**

Run: `git add package.json bun.lock index.html tsconfig*.json vite.config.ts vitest.config.ts playwright.config.ts src/main.tsx src/app scripts tests/assets .gitignore && git commit -m "build: scaffold React panorama app"`

### Task 2: Canonical tour model and translations

**Files:**
- Create: `src/data/tour.ts`
- Create: `src/data/tour.test.ts`
- Create: `src/features/language/i18n.ts`
- Create: `src/features/language/language.ts`
- Create: `src/features/language/language.test.ts`
- Create: `src/locales/en.ts`
- Create: `src/locales/vi.ts`
- Create: `src/locales/de.ts`
- Create: `src/locales/ko.ts`
- Create: `src/locales/ja.ts`
- Create: `src/locales/locales.test.ts`

**Interfaces:**
- Consumes: generated asset manifest from Task 1.
- Produces: `Tour`, `Destination`, `Viewpoint`, `NavigationHotspot`, `InfoHotspot`; `tour: Tour`; `SUPPORTED_LOCALES`; `resolveLocale(value: unknown): Locale`; `setLocale(locale: Locale): Promise<void>`.

- [ ] **Step 1: Write failing domain and locale tests**

Assert four destinations, seven viewpoints, unchanged graph edges/hotspot coordinates/credits, identical key sets in all five locale files, English default, valid persisted locale recovery, and invalid persisted locale fallback to `en`.

- [ ] **Step 2: Run the focused tests**

Run: `bun test src/data/tour.test.ts src/features/language/language.test.ts src/locales/locales.test.ts`

Expected: FAIL because the model and locale modules do not exist.

- [ ] **Step 3: Define the canonical typed tour data**

Move coordinates, graph structure, attribution, and asset references from the baseline into `tour.ts`; keep human-readable copy as translation keys and retain canonical English narration text.

- [ ] **Step 4: Add i18next and five complete authored locale resources**

Use `panorama.locale` as the storage key; do not inspect browser locale on first visit. Include metadata, intro, destinations, viewpoints, hotspots, navigation, controls, ARIA labels, toasts, credits, AI copy, and errors.

- [ ] **Step 5: Run locale and domain verification**

Run: `bun run typecheck && bun test src/data src/features/language src/locales`

Expected: PASS with equal locale key sets and exact graph counts.

- [ ] **Step 6: Commit**

Run: `git add src/data src/features/language src/locales && git commit -m "feat: add tour data and five locales"`

### Task 3: Direct Three.js panorama engine

**Files:**
- Create: `src/panorama/types.ts`
- Create: `src/panorama/math.ts`
- Create: `src/panorama/math.test.ts`
- Create: `src/panorama/PanoramaEngine.ts`
- Create: `src/panorama/PanoramaEngine.test.ts`
- Create: `src/panorama/usePanoramaEngine.ts`
- Create: `src/panorama/PanoramaCanvas.tsx`

**Interfaces:**
- Consumes: `Viewpoint`, asset URLs, and translated hotspot display data from Task 2.
- Produces: `PanoramaController` with `goTo(viewpointId, transition?)`, `move(backward)`, `turn(delta)`, `setAutoRotate(enabled)`, `setPlanet(enabled)`, `setFov(value)`, `projectHotspots()`, `resize()`, and `dispose()`; emits `onReady`, `onViewpointChange`, and projected-hotspot snapshots.

- [ ] **Step 1: Write failing math and lifecycle tests**

Cover longitude wrapping, hotspot direction conversion, arrival direction, FOV clamping, device-pixel-ratio cap, cleanup of renderer/geometry/material/textures/listeners/animation frame, and disposal of a stale texture when a newer `goTo` finishes first.

- [ ] **Step 2: Run the engine tests**

Run: `bun test src/panorama`

Expected: FAIL because engine modules do not exist.

- [ ] **Step 3: Implement pure panorama math**

Export `wrapDegrees`, `hotspotDirection`, `arrivalLongitude`, and `clampFov` with the baseline's exact constants and coordinate mapping.

- [ ] **Step 4: Implement `PanoramaEngine`**

Use the baseline sphere geometry, inward scale, camera defaults, easing, fade timing hooks, pixel-ratio cap, pointer/wheel behavior, auto-rotation idle timing, planet mode, and projected hotspot visibility limits; keep frame-mutating values outside React state.

- [ ] **Step 5: Add the React lifecycle wrapper**

`usePanoramaEngine` creates one engine per mounted canvas, forwards stable callbacks, resizes it, and calls `dispose()` on unmount; `PanoramaCanvas` exposes the canvas only.

- [ ] **Step 6: Run engine verification**

Run: `bun run typecheck && bun test src/panorama`

Expected: PASS.

- [ ] **Step 7: Commit**

Run: `git add src/panorama && git commit -m "feat: add Three.js panorama engine"`

### Task 4: Parity interface, hotspots, and navigation

**Files:**
- Create: `src/app/PanoramaExperience.tsx`
- Create: `src/app/PanoramaExperience.test.tsx`
- Create: `src/features/tour/useTour.ts`
- Create: `src/features/tour/useTour.test.ts`
- Create: `src/features/tour/DestinationList.tsx`
- Create: `src/features/tour/HotspotLayer.tsx`
- Create: `src/features/tour/InfoCard.tsx`
- Create: `src/features/tour/DirectionPad.tsx`
- Create: `src/features/tour/Toolbar.tsx`
- Create: `src/features/tour/Intro.tsx`
- Create: `src/features/tour/StatusOverlays.tsx`
- Create: `src/features/language/LanguagePicker.tsx`
- Create: `src/styles/tokens.css`
- Create: `src/styles/panorama.css`
- Modify: `src/app/App.tsx`

**Interfaces:**
- Consumes: `tour`, translation APIs, and `PanoramaController`.
- Produces: integrated destination/viewpoint state, baseline-equivalent toolbar and overlays, and `LanguagePicker` as the only new visible control.

- [ ] **Step 1: Write failing interaction tests**

Assert loading/intro states, destination selection, info-card open/close, directional hotspot transitions, W/A/S/D and arrow behavior, no shortcut action for `INPUT`, automatic-tour progression/end, theme persistence for the session, fullscreen feature detection, auto-rotation toggle, planet toggle, and language selection.

- [ ] **Step 2: Run interaction tests**

Run: `bun test src/app/PanoramaExperience.test.tsx src/features/tour`

Expected: FAIL because the experience components do not exist.

- [ ] **Step 3: Implement tour state and controls**

Match the baseline graph movement, 100-degree forward/backward selection threshold, 30-degree turn, tour delays, toast duration, card behavior, fade states, and keyboard exclusions.

- [ ] **Step 4: Reproduce the baseline visual system**

Port the existing CSS tokens and responsive rules without redesign; replace mojibake-prone icon text with accessible inline SVG where it does not change appearance. Add the glass language picker without covering existing controls at desktop or mobile widths.

- [ ] **Step 5: Integrate `PanoramaExperience` at `/`**

Connect loading, engine events, localized UI, translated metadata, overlays, hotspots, controls, intro, theme, and fullscreen handling.

- [ ] **Step 6: Run interface verification**

Run: `bun run typecheck && bun test src/app src/features/tour src/features/language`

Expected: PASS.

- [ ] **Step 7: Commit**

Run: `git add src/app src/features/tour src/features/language/LanguagePicker.tsx src/styles && git commit -m "feat: recreate panorama interface in React"`

### Task 5: English narration and synthesized ambience

**Files:**
- Create: `src/features/audio/voice.ts`
- Create: `src/features/audio/voice.test.ts`
- Create: `src/features/audio/useNarration.ts`
- Create: `src/features/audio/ambience.ts`
- Create: `src/features/audio/ambience.test.ts`
- Create: `src/features/audio/useAmbience.ts`
- Modify: `src/app/PanoramaExperience.tsx`
- Modify: `src/features/tour/Toolbar.tsx`

**Interfaces:**
- Consumes: canonical English narration text and current destination/viewpoint.
- Produces: `selectEnglishVoice(voices): SpeechSynthesisVoice | undefined`; narration controls `{ enabled, toggle, speakCurrent, stop }`; `AmbienceController` with `enable(profile)`, `setProfile(profile)`, `disable()`, and `dispose()`.

- [ ] **Step 1: Write failing audio tests**

Assert voice preference order `en-US` → any `en-*` → undefined/browser default, utterance `lang = 'en-US'` for every UI locale, speech cancellation on disable/unmount, baseline audio profiles for beach/Rhine/other, and AudioContext/node cleanup.

- [ ] **Step 2: Run audio tests**

Run: `bun test src/features/audio`

Expected: FAIL because audio modules do not exist.

- [ ] **Step 3: Implement English-only narration**

Narrate only canonical English destination/viewpoint content; speak again on viewpoint changes when enabled and surface the localized unsupported-browser toast without changing narration language.

- [ ] **Step 4: Implement lazy synthesized ambience**

Create AudioContext only after user activation and preserve the original noise buffer, filter, oscillator, gain targets, and localized disclosure toast.

- [ ] **Step 5: Integrate audio controls**

Connect toolbar state and current viewpoint changes; ensure voice and ambience remain independent and dispose on unmount.

- [ ] **Step 6: Run audio verification**

Run: `bun run typecheck && bun test src/features/audio src/app/PanoramaExperience.test.tsx`

Expected: PASS.

- [ ] **Step 7: Commit**

Run: `git add src/features/audio src/app/PanoramaExperience.tsx src/features/tour/Toolbar.tsx && git commit -m "feat: preserve panorama audio features"`

### Task 6: Optional localized AI guide

**Files:**
- Create: `src/types/claude.d.ts`
- Create: `src/features/ai-guide/adapter.ts`
- Create: `src/features/ai-guide/adapter.test.ts`
- Create: `src/features/ai-guide/prompt.ts`
- Create: `src/features/ai-guide/prompt.test.ts`
- Create: `src/features/ai-guide/useAiGuide.ts`
- Create: `src/features/ai-guide/AiGuide.tsx`
- Create: `src/features/ai-guide/AiGuide.test.tsx`
- Modify: `src/app/PanoramaExperience.tsx`
- Modify: `src/features/tour/Toolbar.tsx`

**Interfaces:**
- Consumes: selected locale, translated place context, current destination/viewpoint, and optional `window.claude.use`.
- Produces: `loadSampleModel(): Promise<SampleModel | null>`; `buildGuidePrompt(input: GuidePromptInput): string`; chat API `{ available, open, messages, busy, ask, close }`.

- [ ] **Step 1: Write failing adapter, prompt, and component tests**

Assert absent runtime returns `null` and hides the control, permission rejection returns `null`, prompts request the selected locale and contain current translated context, history is limited to eight messages, Enter submits, rapid submit is blocked, and rate-limit/permission/general failures use localized copy without breaking the experience.

- [ ] **Step 2: Run AI guide tests**

Run: `bun test src/features/ai-guide`

Expected: FAIL because AI modules do not exist.

- [ ] **Step 3: Implement the typed optional adapter and prompt builder**

Preserve `cache: false`, `modelTier: 'quick'`, streaming `onText`, 90-word maximum instruction, uncertainty rule, plain-text output, current context, and last-eight-message history; change only the requested response language.

- [ ] **Step 4: Implement and integrate the guide UI**

Match the baseline panel, suggestions, input length, messages, open/close behavior, and mobile positioning; reset conversation when destination changes.

- [ ] **Step 5: Run AI verification**

Run: `bun run typecheck && bun test src/features/ai-guide src/app/PanoramaExperience.test.tsx`

Expected: PASS.

- [ ] **Step 6: Commit**

Run: `git add src/types src/features/ai-guide src/app/PanoramaExperience.tsx src/features/tour/Toolbar.tsx && git commit -m "feat: migrate localized AI guide"`

### Task 7: End-to-end parity and release readiness

**Files:**
- Create: `tests/e2e/panorama.spec.ts`
- Create: `tests/e2e/localization.spec.ts`
- Create: `tests/e2e/responsive.spec.ts`
- Create: `tests/e2e/ai-fallback.spec.ts`
- Create: `tests/e2e/helpers/claudeStub.ts`
- Create: `scripts/verify-parity.mjs`
- Create: `README.md`
- Modify: `package.json`

**Interfaces:**
- Consumes: the completed React experience and baseline HTML.
- Produces: `bun run verify` as the single release gate covering typecheck, unit tests, production build, asset hashes, and Playwright parity checks.

- [ ] **Step 1: Write failing browser parity scenarios**

Cover intro/load, all four destinations and seven viewpoints, every hotspot type, keyboard/pointer/wheel navigation, theme, fullscreen capability handling, planet view, automatic tour, ambience, English narration under all five UI locales, locale persistence, translated metadata/ARIA, desktop/mobile layout, unavailable AI runtime, and stubbed successful/error AI responses.

- [ ] **Step 2: Run Playwright and capture the expected failures**

Run: `bun run test:e2e`

Expected: FAIL until all browser-observable gaps are corrected.

- [ ] **Step 3: Add the parity verification script and fix only parity defects**

`verify-parity.mjs` must compare original embedded asset hashes/counts with the generated manifest, confirm baseline destination/viewpoint counts, and orchestrate non-visual invariants. Do not add new product behavior while resolving failures.

- [ ] **Step 4: Document local operation and feature fallbacks**

Document Bun installation, `bun install`, development/build/test commands, supported locales, English-only narration, browser voice variance, optional Claude runtime behavior, and the preserved baseline HTML.

- [ ] **Step 5: Run the complete release gate**

Run: `bun run verify`

Expected: typecheck PASS, unit tests PASS, production build PASS, asset parity PASS, Playwright PASS.

- [ ] **Step 6: Perform the manual parity pass**

Run the original HTML and production preview side by side at desktop and mobile sizes; record every item in the spec's manual parity list as PASS in the implementation handoff.

- [ ] **Step 7: Commit release verification**

Run: `git add tests/e2e scripts/verify-parity.mjs README.md package.json bun.lock && git commit -m "test: verify React panorama parity"`

### Task 8: Final repository check and push

**Files:**
- Modify only if verification finds a documented migration defect; do not add new-route work.

**Interfaces:**
- Consumes: all migration commits and `bun run verify`.
- Produces: a clean `main` branch pushed to `origin/main` with the React migration and no `/discover` work.

- [ ] **Step 1: Confirm clean, scoped history**

Run: `git status --short && git log --oneline --decorate 76ff08a..HEAD && git diff --stat 76ff08a..HEAD`

Expected: clean worktree; only design, plan, React migration, tests, assets, and documentation are present.

- [ ] **Step 2: Re-run the release gate from the committed tree**

Run: `bun install --frozen-lockfile && bun run verify`

Expected: PASS with no generated untracked files.

- [ ] **Step 3: Push the migration**

Run: `git push -u origin main`

Expected: `main -> main` succeeds at `https://github.com/minhtuan12/virtual-demo.git`.

- [ ] **Step 4: Report the migration handoff**

Provide the pushed commit range, verification results, known browser-dependent voice limitations, and state explicitly that route/feature expansion has not begun.
