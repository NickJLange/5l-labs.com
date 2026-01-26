## 2026-01-26 - [Secure External Links & HTTPS]
**Vulnerability:** External links were using HTTP and lacked `noopener noreferrer` protection against reverse tabnabbing.
**Learning:** Docusaurus `<Link>` component does not automatically add `target="_blank"` or `rel="noopener"`, so manual handling or wrapper is needed for external links mixed with internal ones.
**Prevention:** Use a wrapper component or explicit props for external links to ensure `rel="noopener noreferrer"`.
