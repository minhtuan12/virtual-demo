# Discover Route Design

## Intent

Add the approved non-virtual destination guide as a separate `/discover` route. The page helps visitors browse the four existing destinations without entering the panorama first, while preserving `/` as the complete 360° experience.

## User Experience

- A shared top navigation links **Explore 360°** (`/`) and **Discover** (`/discover`).
- `/discover` follows the existing visual rules: Be Vietnam Pro, teal accent, glass surfaces, rounded corners, light/dark support, visible focus, reduced motion, and responsive safe spacing.
- A compact hero explains the destination guide without using “demo”, “real”, or equivalent authenticity claims.
- Search matches localized destination name, location, description, country, and category.
- Country and category filters can be combined with search and reset in one action.
- A responsive result summary and card grid show the filtered destinations.
- Each destination card uses the existing preserved thumbnail, localized name/location/description, country/category labels, and practical facts.
- A heart control saves/removes favorites in local storage. A “Favorites only” filter shows saved places. Favorites survive reloads and remain shared across languages.
- “View details” opens an accessible modal containing practical visit information and attribution.
- “Open in 360°” navigates to `/?destination=<destination-id>`. The panorama reads this query once and opens the matching destination, falling back safely to the first destination for an invalid value.
- Empty search/filter results show a localized empty state and reset action.
- The existing flag-image language picker is shared by both routes; all new copy is authored in English, Vietnamese, German, Korean, and Japanese.

## Destination Data

The page reuses the existing four destinations and thumbnails. A discover metadata module adds authored, non-live facts for each destination:

- country code and localized country label;
- category (`culture`, `nature`, or `coast`);
- suggested visit duration;
- best-season guidance;
- accessibility/terrain note;
- feature tags.

No weather, live opening hours, prices, booking, maps API, or other volatile data is shown.

## Routing and State

- Add React Router and define exactly `/` and `/discover`, plus a small not-found redirect to `/discover`.
- Search and filters are page-local state.
- Favorites use a versioned local-storage key and validate unknown/corrupt stored values.
- The details modal is page-local and closes by close button, Escape, or backdrop.
- The selected locale remains managed by the existing i18next setup.
- Query-based panorama selection is isolated in a small parser/helper and does not change ordinary `/` startup.

## Accessibility and Responsive Behavior

- Semantic header/nav/main/section/card markup.
- Labeled search and filter controls.
- Toggle controls expose pressed/checked state.
- Modal uses dialog semantics, initial close-button focus, Escape handling, focus restoration, and body-scroll containment.
- Cards remain usable from narrow mobile widths through desktop grids.
- Images have meaningful localized alternative text on Discover; decorative flags remain hidden from screen readers because their buttons have language names.

## Testing and Acceptance

- Unit tests cover route selection, search/filter combinations, empty state, favorites persistence and corrupt-value recovery, details dialog behavior, and destination-query parsing.
- E2E tests cover navigation between routes, combined filtering, favorite persistence after reload, language switching, responsive card layout, dialog use, and “Open in 360°”.
- The existing full verification gate remains green, including asset byte parity and panorama behavior.
- The original HTML remains byte-identical to commit `76ff08a`.

## Non-goals

- No authentication, backend, database, CMS, analytics, payments, booking, or user accounts.
- No new panorama, destination, or image asset.
- No live or externally fetched travel facts.
- No redesign of the panorama route.
- No multilingual narration; narration remains English-only.

## Builder Decisions

- Use React Router because this is now a multi-route application.
- Reuse existing source-controlled thumbnails rather than introducing remote destination imagery.
- Use a modal rather than a third destination-detail route to keep the approved scope to one new page.
- Practical facts are intentionally static and phrased as general guidance, avoiding claims likely to become stale.
