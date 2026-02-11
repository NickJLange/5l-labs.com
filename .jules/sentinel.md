## 2025-02-18 - Safe XML Parsing
**Vulnerability:** The `generate_embeddings.py` script used `xml.etree.ElementTree` to parse the sitemap, which is vulnerable to XXE attacks if the sitemap content is untrusted or tampered with.
**Learning:** Python's standard `xml` library is not secure against maliciously constructed data.
**Prevention:** Always use `defusedxml` when parsing XML data in Python.

## 2025-02-18 - [Render Security Headers for Docusaurus]
**Vulnerability:** Default Render configuration for static sites lacks HSTS and CSP headers, leaving the site vulnerable to MITM and XSS/Injection.
**Learning:** Docusaurus sites on Render require explicit header configuration in `render.yaml`. CSP must account for inline scripts (Docusaurus hydration) and external services (GA, GTM, Google Fonts, Iconify).
**Prevention:** Use the `headers` block in `render.yaml` with a carefully scoped CSP and HSTS.

## 2025-02-18 - [Insecure Dependency Management and Build Process]
**Vulnerability:** The repository contained `bun.lock` but used `npm` in CI/CD, and `package-lock.json` was ignored in `.gitignore`. This led to non-deterministic builds where vulnerabilities could be introduced via unpinned dependencies. Additionally, HTTP links were used for external resources, exposing users to MITM.
**Learning:** Mixed package managers and ignored lockfiles create a dangerous ambiguity in the build process.
**Prevention:** Enforce a single package manager, track the corresponding lockfile, and validate `render.yaml` build commands to ensure they execute all security-critical build steps (like submodule initialization).
