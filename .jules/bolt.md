## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2024-05-24 - [Render Deployment Dependency Pruning]
**Learning:** Render sets `NODE_ENV=production` by default, which causes `npm install` to skip `devDependencies`. However, the build script (`generate-latest-post.js`) relies on packages like `gray-matter` which were in `devDependencies`. This caused the build to fail in production.
**Action:** Always verify that packages required for the build process (even if not part of the runtime bundle) are listed in `dependencies` or that the build environment is configured to install dev dependencies. For this repo, move critical build tools to `dependencies`.
