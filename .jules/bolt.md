## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-05-25 - Blocking Font Imports in CSS
**Learning:** Loading fonts via `@import` in CSS files blocks the critical rendering path, delaying First Contentful Paint (FCP).
**Action:** Move external font loading to `docusaurus.config.js` using `stylesheets` and `headTags` (with preconnect) to unblock rendering.

## 2025-05-25 - Render Production Build Dependencies
**Learning:** Render sets `NODE_ENV=production` during builds, which causes `npm install` to prune `devDependencies`. If build tools (like `tailwindcss`, `postcss`, `gray-matter`) are in `devDependencies`, the build will fail.
**Action:** Ensure all dependencies required for the build process (even if not used at runtime by the client) are listed in `dependencies` in `package.json`.

## 2025-05-25 - Render Lockfile Precedence (Bun vs NPM)
**Learning:** Render prioritizes `bun.lock` (if present) over `package-lock.json`, attempting to build with Bun. If `bun.lock` is stale or inconsistent with `package.json` (e.g., listing critical build tools as `devDependencies` when they are needed in production), the build will fail.
**Action:** Ensure only one lockfile exists. If using `npm`, delete `bun.lock` to prevent Render from switching to Bun and using stale dependency definitions.
