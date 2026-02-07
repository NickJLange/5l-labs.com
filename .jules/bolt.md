## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2024-05-24 - [Render Deployment Dependency Pruning]
**Learning:** Render sets `NODE_ENV=production` by default, which causes `npm install` to skip `devDependencies`. However, the build script (`generate-latest-post.js`) relies on packages like `gray-matter` which were in `devDependencies`. This caused the build to fail in production.
**Action:** Always verify that packages required for the build process (even if not part of the runtime bundle) are listed in `dependencies` or that the build environment is configured to install dev dependencies. For this repo, move critical build tools to `dependencies`.

## 2024-05-24 - [CI/CD Migration from Bun to NPM]
**Learning:** The project was using Bun in CI but had conflicting configuration (missing `bun.lock` initially, then switched to `package-lock.json`). GitHub Actions failed with 404s for packages and submodule errors.
**Action:** Migrated CI workflow to use `npm ci` and ensured `package-lock.json` is tracked. Also updated the checkout step to include `submodules: recursive` to correctly fetch the `embeddings` submodule, and removed the phantom `embeddings-source` submodule from the git index.

## 2024-05-24 - [Render Build Command Pitfall]
**Learning:** Render's `buildCommand` setting overrides the default behavior. If set to `npx docusaurus build`, it skips the `npm run build` script defined in `package.json`. This is critical if `npm run build` includes pre-build steps like generating content or copying assets.
**Action:** Always set `buildCommand` to `npm run build` (or equivalent) in `render.yaml` to ensure the full build pipeline is executed. Also, verify that environment variable groups defined in `render.yaml` are explicitly applied to the service definition.
