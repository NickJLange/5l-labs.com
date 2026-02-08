## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2026-02-08 - O(N) File Reads in Build Script
**Learning:** The `generate-latest-post.js` script was reading file content during the search for the latest post, making build time proportional to the number of posts.
**Action:** Separate metadata collection from content reading. Scan filenames first, sort, then read only the winner.
