## 2025-05-23 - Add context to "Read More" links
**Learning:** "Read More" links are a common accessibility anti-pattern. Screen reader users navigating by links hear repeated "Read More" phrases without context.
**Action:** Always add `aria-label` to "Read More" links to include the title of the destination (e.g., "Read more about [Post Title]").

## 2025-10-28 - Prevent Hydration Mismatch in Dates
**Learning:** Rendering dates with `toLocaleDateString()` without a locale relies on the runtime environment, leading to mismatches between SSG (server) and Client.
**Action:** Always specify a stable locale (e.g., 'en-US') for date formatting to ensure visual consistency and prevent hydration errors.
