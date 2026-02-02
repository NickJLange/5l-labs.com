## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.

## 2026-02-02 - HSTS Omission in Render Config
**Vulnerability:** HSTS (`Strict-Transport-Security`) was missing from `render.yaml` even though other security headers were present.
**Learning:** Having a `headers` section doesn't guarantee all necessary headers are present. HSTS is critical for HTTPS-only sites to prevent downgrade attacks.
**Prevention:** Audit `render.yaml` headers against a standard list (HSTS, CSP, XFO, etc.) regularly.
