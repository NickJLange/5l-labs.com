## 2024-05-22 - [Context for Generic Links]
**Learning:** Generic "Read More" or "Learn More" links in cards are confusing for screen reader users.
**Action:** Always add `aria-label` with specific context (e.g., "Read more about [Title]") to these links.
## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").
## 2025-05-24 - [SPA Navigation & Date Hydration]
**Learning:** Using `<a>` tags for internal links causes full page reloads, breaking the SPA experience. `toLocaleDateString()` without explicit locale/timezone causes hydration mismatches.
**Action:** Use `@docusaurus/Link` for all internal links. Always specify `locale` and `timeZone` in `toLocaleDateString()`.
