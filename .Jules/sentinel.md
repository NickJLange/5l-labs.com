## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.

## 2026-01-27 - HSTS Header Enforcement
**Vulnerability:** Missing Strict-Transport-Security (HSTS) header allows potential SSL stripping or downgrade attacks.
**Learning:** HTTPS deployment alone does not guarantee future connections will be secure; HSTS is required to instruct browsers to refuse insecure connections.
**Prevention:** Explicitly configure `Strict-Transport-Security` in `render.yaml` with `includeSubDomains` and `preload` directives.
