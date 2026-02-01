## 2025-05-24 - Client-side Markdown Rendering for Static Previews
**Learning:** Using client-side markdown parsers (like react-markdown) for static content previews significantly increases bundle size unnecessarily. Processing markdown to plain text or HTML at build time is a much more efficient strategy for static site generators.
**Action:** Always check if content transformation can be moved to the build step before importing heavy runtime libraries.

## 2025-05-24 - Client-side Routing and Hydration
**Learning:** Replacing `<a>` tags with Docusaurus `<Link>` components for internal links enables client-side routing, avoiding full page reloads. Also, explicitly setting the locale in `toLocaleDateString` prevents hydration mismatches between server (Node.js) and client (Browser).
**Action:** Use `<Link>` for all navigation and always define a locale for date formatting.

## 2025-05-24 - Build Dependencies in Production
**Learning:** Render sets `NODE_ENV=production` by default, skipping `devDependencies`. Docusaurus build scripts and plugins (like gray-matter, tailwindcss, postcss) must be in `dependencies` to function during the build on Render.
**Action:** Always move build-time tools to `dependencies` if they are required for the production build command.
