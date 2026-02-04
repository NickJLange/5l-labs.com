## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.

## 2026-02-04 - Untracked Lockfiles and Deterministic Builds
**Vulnerability:** `package-lock.json` is explicitly ignored in `.gitignore`, while `bun.lock` exists but `npm` is the intended package manager. This leads to non-deterministic builds and potential supply chain risks via floating dependencies.
**Learning:** Verify that the project's lockfile (`package-lock.json` for npm) is tracked in git and that conflicting lockfiles (like `bun.lock`) are removed to ensure the build environment is consistent and secure.
**Prevention:** Check `.gitignore` for lockfiles and ensure the correct one is present and tracked.
