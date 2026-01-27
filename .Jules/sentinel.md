## 2026-01-26 - Static Site Security Headers in Render
**Vulnerability:** Missing security headers (X-Frame-Options, X-Content-Type-Options, etc.) on static site deployment, exposing users to clickjacking and MIME sniffing.
**Learning:** Static sites deployed on Render do not include robust security headers by default. They must be explicitly configured in the `render.yaml` specification.
**Prevention:** Always verify and configure a `headers` section in `render.yaml` for any static site service to enforce defense-in-depth.

## 2026-02-19 - Strict Transport Security (HSTS) and Cross-Domain Policies
**Vulnerability:** Missing HSTS header allows protocol downgrade attacks. Missing Cross-Domain policy allows potential Flash/PDF cross-site data leakage.
**Learning:** Even with basic security headers, enforcing HTTPS via HSTS is crucial for preventing MITM attacks. Restricting cross-domain policies adds defense-in-depth against legacy attack vectors.
**Prevention:** Include `Strict-Transport-Security` and `X-Permitted-Cross-Domain-Policies` in `render.yaml` headers configuration.
