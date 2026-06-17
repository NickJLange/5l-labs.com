# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-22 - Static Image Formats
**Learning:** The Docusaurus React setup efficiently handles direct WebP imports in `src/pages/index.js`, dropping the hero banner LCP image payload by ~85% (233KB -> 35KB) without needing additional Webpack loader configurations.
**Action:** Default to `.webp` formats for large static UI elements (like logos or hero images) rather than `.png`.

## 2026-02-23 - Avoid O(N) I/O and Parsing in build scripts
**Learning:** The previous implementation of `generate-latest-post.js` parsed the `frontmatter` of every file it encountered that was newer than the previously parsed file. Since files are not read chronologically, this created multiple expensive read/parse operations.
**Action:** Iterate through filename dates (string operations) first to identify the most recent target, then perform exactly one read and parse.
