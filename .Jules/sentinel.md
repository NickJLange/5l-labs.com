## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.

## 2026-02-12 - Docusaurus Content Security Policy
**Vulnerability:** Missing Content-Security-Policy allowed potential XSS.
**Learning:** Docusaurus sites on Render require `unsafe-inline` for scripts/styles in CSP due to hydration and theming. External services like Google Analytics and Fonts must be explicitly allowlisted.
**Prevention:** Use the standard Docusaurus CSP pattern in `render.yaml`: `script-src 'self' 'unsafe-inline' ...` and verify against `docusaurus.config.js` external links.
