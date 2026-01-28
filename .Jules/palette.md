## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2025-05-24 - Light Mode Brand Color Contrast
**Learning:** The brand primary color (`#38bdf8`) has insufficient contrast (1.77:1) against white backgrounds in Light Mode, making buttons and links hard to read.
**Action:** In the future, consider darkening the primary color for Light Mode (e.g. to Sky 600 or 700) or using a different color for text/foregrounds.
