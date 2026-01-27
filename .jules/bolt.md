## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-05-24 - Optimizing Font Loading Strategy
**Learning:** Loading Google Fonts via `@import` in CSS blocks rendering and delays First Contentful Paint (FCP).
**Action:** Use `<link rel="preconnect">` for font domains and `<link rel="stylesheet">` (or Docusaurus `stylesheets` config) to load fonts asynchronously and earlier in the network waterfall.
