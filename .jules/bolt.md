# Bolt's Journal

This journal documents critical performance learnings for the 5L Labs project.

## 2026-02-22 - Font Loading Optimization
**Learning:** Using `preconnect` for `fonts.gstatic.com` significantly improves FCP by establishing the connection early.
**Action:** Always include `preconnect` links for external font providers in `docusaurus.config.js`.

## 2026-02-22 - Static Image Formats
**Learning:** The Docusaurus React setup efficiently handles direct WebP imports in `src/pages/index.js`, dropping the hero banner LCP image payload by ~85% (233KB -> 35KB) without needing additional Webpack loader configurations.
**Action:** Default to `.webp` formats for large static UI elements (like logos or hero images) rather than `.png`.

## 2026-02-22 - Build Script Optimization
**Learning:** `scripts/generate-latest-post.js` previously parsed the markdown content and executed heavy regex-based formatting (`gray-matter` + `stripMarkdown`) on *every* blog post encountered, even if it wasn't the latest one. This was an O(N) bottleneck.
**Action:** Changed the script to only scan filenames/dates in O(N) time to find the latest file, and then perform exactly *one* O(1) read/parse operation for that specific file.
