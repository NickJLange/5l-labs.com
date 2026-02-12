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

## 2026-02-12 - Directional Affordance in Buttons
**Learning:** Adding a directional icon (arrow) to primary action buttons enhances affordance. Animating it on hover/focus creates delight and reinforces the action direction.
**Action:** Use the `readMoreBtn` pattern with inline SVG arrow and `transform` transition for future "Read More" or directional links.

## 2026-02-12 - Render Build Configuration for NPM
**Learning:** Render projects configured for NPM must track `package-lock.json` and remove `bun.lock` to avoid mixed package manager errors. The build command in `render.yaml` must use `npm run build`.
**Action:** Ensure `package-lock.json` is not in `.gitignore`, `bun.lock` is removed, and `render.yaml` explicitly calls `npm run build`.

## 2026-02-12 - Render Build Script Robustness
**Learning:** Build scripts relying on submodules must explicitly initialize them if not guaranteed by the CI environment. `cp` commands should use `source/.` instead of `source/*` to avoid failure on empty directories. Critical tools like `typescript` must be in `dependencies` if the build process invokes them, as production builds prune `devDependencies`.
**Action:** Update `build` scripts to include `git submodule update --init --recursive` and use `cp -r source/. dest/`. Move `typescript` to `dependencies` for Docusaurus projects.
