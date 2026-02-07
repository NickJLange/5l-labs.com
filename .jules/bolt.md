## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2024-05-24 - [Recursive Directory Creation in Scripts]
**Learning:** The `scripts/generate-latest-post.js` script failed in CI because it attempted to write to `src/generated/latest-post.json` without ensuring the `src/generated` directory existed. This path might not exist in a fresh CI checkout (it's gitignored).
**Action:** Always use `fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true })` before writing files to generated directories in build scripts.
