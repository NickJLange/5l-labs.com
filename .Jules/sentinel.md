## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.

## 2026-02-04 - Untracked Lockfiles and Deterministic Builds
**Vulnerability:** `package-lock.json` is explicitly ignored in `.gitignore`, while `bun.lock` exists but `npm` is the intended package manager. This leads to non-deterministic builds and potential supply chain risks via floating dependencies.
**Learning:** Verify that the project's lockfile (`package-lock.json` for npm) is tracked in git and that conflicting lockfiles (like `bun.lock`) are removed to ensure the build environment is consistent and secure.
**Prevention:** Check `.gitignore` for lockfiles and ensure the correct one is present and tracked.

## 2026-02-04 - Production Dependencies Pruning
**Vulnerability:** Build failed in production because critical build tools (`tailwindcss`, `gray-matter`, etc.) were listed in `devDependencies`, which Render prunes when `NODE_ENV=production`.
**Learning:** Build-time dependencies required for generating static assets (like CSS or JSON content) must be listed in `dependencies`, not `devDependencies`, or the build environment must be configured to install dev dependencies.
**Prevention:** Verify build scripts' dependencies and ensure they are present in the production environment. Test locally with `npm install --omit=dev && npm run build`.

## 2026-02-04 - CI/CD Configuration and Submodules
**Vulnerability:** GitHub Actions workflow failed because it used `bun` instead of `npm` (mismatching lockfiles) and failed to checkout submodules recursively.
**Learning:** CI workflows must mirror the production build environment (using `npm ci` if `package-lock.json` is tracked) and correctly handle git submodules using HTTPS URLs and recursive checkout options.
**Prevention:** Verify CI workflows match the local/production package manager and test submodule checkout in a clean environment.
