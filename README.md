# Senarysoft Front-End Assessment – User Management (Edit Users)

A responsive recreation of the **User Management – Edit Users** interface for the Senarysoft LLC Front-End Developer Practical Assessment. It is a static front end with client-side mock data: no backend, no database, no build step.

Visual reference: `assets/reference-user-management.png`. Full requirements: [`CLAUDE_TASK.md`](CLAUDE_TASK.md).

## Technologies

- HTML5 (semantic landmarks: `header`, `nav`, `aside`, `main`)
- CSS3 (custom properties, grid, flexbox) on top of **Bootstrap 5.3**
- Vanilla JavaScript (no framework, no dependencies beyond Bootstrap's JS for the modal, offcanvas, dropdown, collapse and toast)
- Icons are an inline SVG sprite in `index.html` (no icon-font dependency)

## How to run

No install or build is needed. Either open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Project structure

```
index.html          Page markup, SVG icon sprite, Add/Edit modal
css/styles.css      Reference-matching look layered over Bootstrap
js/data.js          Mock users + option lists (groups, divisions, regions, ...)
js/app.js           State, filtering, rendering, Add/Edit/Enable-Disable
vendor/             Local copy of Bootstrap CSS + JS bundle (see note below)
assets/             Reference screenshot
```

## Implementation approach

`js/app.js` follows one simple flow: an event updates either the `state` object (search text, search field, three filters, current page) or the `users` array, then `render()` redraws the table rows, the entry count and the pagination.

- `getFilteredUsers()` is the single place where search and filters are applied. Search text and each dropdown must all match (AND).
- Rows are drawn from the filtered list, sliced by `PAGE_SIZE` (10).
- Any change to search or a filter returns to page 1; the current page is also clamped if the result set shrinks.
- Text inserted into the table is HTML-escaped (`esc()`), because Add/Edit accepts user-typed values.

## Mock-data assumptions

- 20 users. The first 10 mirror the rows in the reference screenshot; the rest add variety for pagination and filters.
- Fields: ID, first name, last name, username/email, group, division, region, user type, submitted date, enabled date, status.
- The reference leaves **User Type** empty, so it is filled with Employee / Contractor / Partner.
- In the reference, "Division" holds state codes (NY, CA, TX) and "Region" holds Corporate / West / South, so the same convention is used (plus FL, IL and East).
- Status is Active or Disabled. A disabled user has no enabled date (shown as an em dash); enabling sets it to today.
- Data lives in memory only, so edits reset when the page is reloaded.

## Features

- **Search** across ID, names, email, group, division, region and user type (case-insensitive "contains").
- **Search by field** selector to limit the search to one column.
- **Status, Region and Division filters**, combinable with each other and with search. **Clear Filters** resets search, field selector and all three filters.
- **Filters** button collapses/expands the filter panel.
- **Pagination**: Previous / numbered pages / Next, current page marked, ellipsis when there are many pages.
- **Entry count**: "Showing X to Y of Z entries", plus "(filtered from N total entries)" when filters/search reduce the list; "Showing 0 entries" with an empty-state row when nothing matches.
- **Add User** and **Edit User** use one Bootstrap modal with validation (required fields, email format, unique email). Add assigns the next ID and today's date, clears filters, and shows the new user at the top of page 1.
- **Enable / Disable** icon in each row toggles status immediately; disabled rows are dimmed, the button switches to an "enable" icon, and the list and count update (respecting the active Status filter).
- The **header search** icon opens a small search box that drives the same table search.
- Toast messages confirm add, edit and enable/disable.

## Responsive behavior

- **Desktop (≥ 1200px):** matches the reference: full header navigation, sidebar at ~23.5% of the content width, complete table.
- **Small desktop / tablet (992–1199px):** sidebar stays; header navigation collapses into a hamburger menu; the table scrolls horizontally if needed.
- **Tablet and mobile (< 992px):** the sidebar becomes a slide-in drawer opened from a **Menu** button. The toolbar wraps and, on phones, stacks to full width.
- **Mobile:** the table keeps its normal columns and scrolls horizontally inside its own region; the **Actions** column stays pinned at the right edge so Edit and Enable/Disable are always reachable. Filter labels sit beside full-width selects, and the pagination centers.

## UI/UX notes (small changes from the reference)

- A **Status** column was added (the assessment lists Status as a field; the reference has no such column).
- Teal buttons are slightly darker so white text meets contrast guidelines.
- Long emails are truncated with the full address in a tooltip.
- Visible focus outlines, a "skip to main content" link, labelled controls, `aria-label`s on icon buttons (e.g. "Edit John Doe"), `aria-current` on the active nav item and page number, and a live region for the entry count.
- Only this page exists, so the other header and sidebar links are visual only (they do not navigate).

## Bootstrap

Bootstrap **5.3.2** (official `bootstrap.min.css` and `bootstrap.bundle.min.js`) is kept locally in `vendor/`, so the page runs without a CDN or network connection. The `sourceMappingURL` comments were removed from both files so browsers do not request missing `.map` files.

## Known limitations

- No persistence (in-memory data) and no real navigation beyond this page.
- The Enabled Date for a disabled user is cleared rather than kept as history.
- Testing was done in headless Chromium only (desktop 1672/1440/1024px, tablet 820px, mobile 390px). Other browsers and real devices were not tested.
