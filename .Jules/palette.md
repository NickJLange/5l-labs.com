## 2025-02-18 - Generic "Read More" Links
**Learning:** Generic "Read More" links are problematic for screen reader users as they often navigate by links list, leaving them with multiple "Read More" links and no context.
**Action:** Always include an `aria-label` providing specific context, e.g., "Read more about [Post Title]", when the link text itself is generic.
## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2026-01-30 - Context for Icon-Only/Abbreviated Badges
**Learning:** Fixed position badges or icon-only elements with abbreviated text (like "OE") are ambiguous for both screen readers and visual users.
**Action:** Always provide `aria-label` for screen readers and `title` attributes for tooltips on such elements to explain their purpose.

## 2026-02-08 - SSG Hydration and Semantic Dates
**Learning:** `toLocaleDateString()` without fixed locale arguments and explicit `timeZone` causes hydration mismatches in SSG sites (like Docusaurus) between server build and client browser. Also, generic `<span>` or `<small>` for dates lacks semantic meaning.
**Action:** Use the `<time>` element with `dateTime` attribute, fixed locale/options, and explicit `timeZone: 'UTC'` for date formatting to ensure consistency and accessibility.

## 2026-02-08 - Render Build Commands for Custom Scripts
**Learning:** `npx docusaurus build` in `render.yaml` bypasses `package.json` scripts. If a project relies on pre-build scripts (e.g., generating content), using the framework command directly causes build failures due to missing assets.
**Action:** Always use `npm run build` (or equivalent) in `render.yaml` to ensure the full build pipeline defined in `package.json` is executed.

## 2026-02-08 - Dependencies for Production Build
**Learning:** Build tools like `tailwindcss`, `postcss`, and `autoprefixer` are often needed during the production build of static sites. If they are in `devDependencies`, `bun install --production` (default on platforms like Render) will skip them, causing build failures.
**Action:** Move build-critical tools from `devDependencies` to `dependencies` in `package.json` to ensure they are available in the production environment.

## 2026-02-09 - Focus Indicators for Custom Interactive Elements
**Learning:** Custom-styled interactive elements (like fixed badges) often lose default browser focus outlines or have insufficient contrast.
**Action:** Always add explicit `:focus-visible` styles (e.g., `outline`, `box-shadow`, `transform`) to ensure keyboard users can clearly see where they are navigating.

## 2026-02-16 - Hardcoded Grid Classes in Components
**Learning:** Components that hardcode layout classes (e.g., `col col--6`) limit their reusability and make layout adjustments difficult.
**Action:** Pass layout classes as props or handle layout in the parent container, keeping components focused on content.

## 2026-02-16 - Render Submodules and SSH
**Learning:** Render does not support SSH submodule URLs by default.
**Action:** Always use HTTPS URLs for public submodules in `.gitmodules` to ensure Render can clone them without SSH keys.

## 2026-02-16 - Render Bun Version
**Learning:** Render's default Bun version may be outdated and incompatible with modern (text-based) `bun.lock`.
**Action:** Explicitly set `BUN_VERSION` in `render.yaml` (via `envVarGroups`) to match the local version (e.g., 1.2.14).
