## 2025-05-18 - Removing Runtime Markdown Parsing
**Learning:** For static sites like Docusaurus, parsing markdown at runtime (client-side) using `react-markdown` adds unnecessary bundle size (~30KB) and processing time.
**Action:** Move markdown parsing to the build step (e.g. in data generation scripts) using a lightweight parser like `marked` or internal Docusaurus tools, and serve pre-rendered HTML to the client. This shifts the cost from every user's browser to the build server.
