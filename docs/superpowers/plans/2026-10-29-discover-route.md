# Discover Route Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a localized `/discover` destination guide with search, filters, favorites, practical details, and deep links into the existing panorama.

**Architecture:** React Router owns the two product routes while shared navigation and language controls remain reusable. Discover data and pure filtering/persistence helpers stay independent from presentation; the existing tour data remains the source for destination IDs and thumbnails.

**Tech Stack:** React 19, TypeScript, React Router, i18next, Vitest, Testing Library, Playwright, Bun

**Spec:** `docs/superpowers/specs/2026-10-29-discover-route-design.md`

## Global Constraints

- Preserve `/` as the existing panorama experience and keep English-only narration.
- Add exactly one product page at `/discover`; destination detail uses a modal, not another route.
- Reuse the four existing destinations and source-controlled thumbnails; add no panorama or destination asset.
- New interface copy must exist in `en`, `vi`, `de`, `ko`, and `ja` and must not use “demo”, “real”, or equivalent authenticity claims.
- Store only validated destination IDs under versioned local-storage key `panorama.discover.favorites.v1`.
- Do not overwrite the user's current uncommitted edits in `Panorama 360° · Hướng dẫn viên AI.html` or `src/styles/panorama.css`; place new page styles in `src/styles/discover.css`.
- No backend, authentication, CMS, analytics, booking, live weather, live hours, pricing, or maps API.

## Review Focus

- Corrupt or obsolete favorite values must recover to an empty validated set without throwing; Task 2 pins this.
- Search must be locale-aware enough to match case/diacritic variants and must recompute after language changes; Task 3 pins this.
- An invalid `?destination=` value must not break panorama startup or select an unintended destination; Task 1 pins this.
- Modal close by Escape/backdrop must restore focus to the originating card control; Task 4 pins this.
- Direct loading and browser refresh at `/discover` must render the page through Vite history fallback; Task 5 pins this.

---

### Task 1: Router shell and panorama deep links

**Files:**
- Modify: `package.json`
- Modify: `bun.lock`
- Modify: `src/app/App.tsx`
- Modify: `src/app/App.test.tsx`
- Create: `src/app/AppRoutes.tsx`
- Create: `src/app/SiteNavigation.tsx`
- Create: `src/app/destinationQuery.ts`
- Create: `src/app/destinationQuery.test.ts`
- Modify: `src/app/PanoramaExperience.tsx`

**Interfaces:**
- Produces: `destinationFromSearch(search: string): string | null`; routes `/` and `/discover`; shared route navigation.
- Consumes: `destinationById(id)` and `tour.destinations`.

- [ ] **Step 1: Write failing routing and query tests**

Assert `/` renders Panorama 360°, `/discover` renders a Discover placeholder, valid `?destination=rhine-riverbank` resolves that ID, missing/invalid/encoded unexpected values resolve `null`, and panorama selects only a valid query destination once.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `bun test src/app/App.test.tsx src/app/destinationQuery.test.ts`
Expected: FAIL because routing and parser modules do not exist.

- [ ] **Step 3: Install React Router and implement the route shell**

Add `react-router-dom`; export `AppRoutes({ engineFactory? })`, `SiteNavigation`, and `destinationFromSearch`. Keep `App` responsible for providers/styles and render `BrowserRouter` plus `AppRoutes`.

- [ ] **Step 4: Apply a valid destination query once in `PanoramaExperience`**

Parse `window.location.search` on initial mount; call `tourState.selectDestination(id)` only when the helper returns a valid ID.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `bun run typecheck && bun test src/app`
Expected: PASS.

- [ ] **Step 6: Commit**

Run: `git add package.json bun.lock src/app && git commit -m "feat: add application routing shell"`

### Task 2: Discover data and favorite persistence

**Files:**
- Create: `src/features/discover/discoverData.ts`
- Create: `src/features/discover/discoverData.test.ts`
- Create: `src/features/discover/favorites.ts`
- Create: `src/features/discover/favorites.test.ts`
- Create: `src/features/discover/useFavorites.ts`

**Interfaces:**
- Produces: `DiscoverDestination`, `DiscoverCategory`, `discoverDestinations`; `readFavorites(storage): Set<string>`; `writeFavorites(storage, ids): void`; `useFavorites()`.
- Consumes: existing tour destinations, thumbnails, IDs, and the five destination translation keys.

- [ ] **Step 1: Write failing data and persistence tests**

Assert exactly four entries and assignments: Jelgava=`culture`, ruins=`culture`, Texel=`coast`, Rhine=`nature`; every entry references an existing destination. Assert missing/corrupt/non-array/unknown favorites recover to an empty or validated set and toggle persistence uses the versioned key.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `bun test src/features/discover/discoverData.test.ts src/features/discover/favorites.test.ts`
Expected: FAIL because modules do not exist.

- [ ] **Step 3: Implement static metadata and persistence helpers**

Use translation keys for duration, season, terrain, tags, country, and category. `readFavorites` accepts `Pick<Storage, 'getItem'>`; `writeFavorites` accepts `Pick<Storage, 'setItem'>` and writes a stable JSON array.

- [ ] **Step 4: Implement `useFavorites`**

Expose `{ favorites: ReadonlySet<string>; toggle(id: string): void; clear(): void }`, validate IDs against `discoverDestinations`, and persist after each update.

- [ ] **Step 5: Run focused tests and verify GREEN**

Run: `bun run typecheck && bun test src/features/discover`
Expected: PASS.

- [ ] **Step 6: Commit**

Run: `git add src/features/discover && git commit -m "feat: add discover destination data"`

### Task 3: Localized catalog, search, and filters

**Files:**
- Create: `src/features/discover/filterDestinations.ts`
- Create: `src/features/discover/filterDestinations.test.ts`
- Create: `src/features/discover/DiscoverPage.tsx`
- Create: `src/features/discover/DiscoverPage.test.tsx`
- Create: `src/features/discover/DiscoverFilters.tsx`
- Create: `src/features/discover/DestinationCard.tsx`
- Modify: `src/app/AppRoutes.tsx`
- Modify: `src/locales/en.ts`
- Modify: `src/locales/vi.ts`
- Modify: `src/locales/de.ts`
- Modify: `src/locales/ko.ts`
- Modify: `src/locales/ja.ts`
- Modify: `src/locales/locales.test.ts`
- Create: `src/styles/discover.css`

**Interfaces:**
- Produces: `filterDestinations(items, query)` where query contains normalized text, country, category, favorites-only and favorite IDs; responsive localized `/discover` catalog.
- Consumes: `discoverDestinations`, `useFavorites`, shared `LanguagePicker`, `SiteNavigation`.

- [ ] **Step 1: Write failing filter and page tests**

Assert combined text/country/category/favorite filtering, accent-insensitive matching, locale rerender, reset, result count, empty state, four localized cards, image alt text, and favorites toggling.

- [ ] **Step 2: Run focused tests and verify RED**

Run: `bun test src/features/discover src/locales/locales.test.ts`
Expected: FAIL because catalog modules and locale keys do not exist.

- [ ] **Step 3: Add complete Discover locale resources**

Add identical key shapes for navigation, hero, search, filters, result/empty states, actions, countries, categories, facts, tags, image alt text, and modal labels in all five locale files.

- [ ] **Step 4: Implement pure filtering**

Normalize with Unicode NFD plus combining-mark removal and lowercasing. Match translated searchable strings supplied by the page; apply all active filters conjunctively.

- [ ] **Step 5: Build the Discover page and dedicated styles**

Use semantic controls/cards, current visual tokens, responsive grid, and a theme toggle. Do not modify `src/styles/panorama.css`.

- [ ] **Step 6: Run focused tests and verify GREEN**

Run: `bun run typecheck && bun test src/features/discover src/locales`
Expected: PASS.

- [ ] **Step 7: Commit**

Run: `git add src/features/discover src/app/AppRoutes.tsx src/locales src/styles/discover.css && git commit -m "feat: build localized discover catalog"`

### Task 4: Accessible practical-details dialog

**Files:**
- Create: `src/features/discover/DestinationDetails.tsx`
- Create: `src/features/discover/DestinationDetails.test.tsx`
- Modify: `src/features/discover/DiscoverPage.tsx`
- Modify: `src/features/discover/DestinationCard.tsx`
- Modify: `src/styles/discover.css`

**Interfaces:**
- Produces: modal props `{ destination: DiscoverDestination | null; returnFocus: HTMLElement | null; onClose(): void }` and `Open in 360°` deep link.
- Consumes: Discover translations, destination metadata, and `/?destination=<id>` contract from Task 1.

- [ ] **Step 1: Write failing dialog behavior tests**

Assert facts/attribution render, dialog labeling, close button initial focus, Escape close, backdrop close, inside-click retention, focus restoration, and exact panorama href.

- [ ] **Step 2: Run dialog tests and verify RED**

Run: `bun test src/features/discover/DestinationDetails.test.tsx`
Expected: FAIL because the dialog does not exist.

- [ ] **Step 3: Implement `DestinationDetails` and page integration**

Use a portal-backed dialog with a backdrop, document Escape listener while open, mount/unmount focus effects, and `returnFocus?.focus()` on close.

- [ ] **Step 4: Run dialog and catalog tests and verify GREEN**

Run: `bun run typecheck && bun test src/features/discover`
Expected: PASS.

- [ ] **Step 5: Commit**

Run: `git add src/features/discover src/styles/discover.css && git commit -m "feat: add discover destination details"`

### Task 5: Browser verification, documentation, and release

**Files:**
- Create: `tests/e2e/discover.spec.ts`
- Modify: `tests/e2e/responsive.spec.ts`
- Modify: `README.md`

**Interfaces:**
- Consumes: completed routes and `bun run verify`.
- Produces: browser-level acceptance coverage and updated operation documentation.

- [ ] **Step 1: Write failing E2E scenarios**

Cover direct `/discover` load/refresh, shared route navigation, combined filters, empty reset, favorite reload persistence, five-language switch, details dialog keyboard close, mobile card layout, and deep link selecting Rhine in `/`.

- [ ] **Step 2: Run E2E and verify RED for uncovered behavior**

Run: `bun run test:e2e`
Expected: new scenarios fail until browser-visible gaps are corrected.

- [ ] **Step 3: Fix only acceptance gaps and document routes**

Update README with `/` and `/discover`, favorite storage, static practical guidance, and local commands.

- [ ] **Step 4: Run the complete release gate**

Run: `bun install --frozen-lockfile && bun run verify`
Expected: typecheck PASS, all unit tests PASS, build PASS, asset parity PASS, and all Playwright tests PASS.

- [ ] **Step 5: Confirm protected user edits remain untouched**

Run: `git diff -- "Panorama 360° · Hướng dẫn viên AI.html" src/styles/panorama.css`
Expected: only the pre-existing user edits remain; this feature adds no hunks to either file.

- [ ] **Step 6: Final review and commit**

Run the required whole-branch reviewer, fix Critical/Important findings once, then `git add tests/e2e README.md && git commit -m "test: verify discover route"`.

- [ ] **Step 7: Push main after a clean final verification**

Run: `git push origin main`
Expected: `main -> main` succeeds without force.
