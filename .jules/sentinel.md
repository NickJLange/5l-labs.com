## 2025-07-05 - DoS vulnerability due to lack of input length limit
**Vulnerability:** User inputs (name, email, phone, message) in `src/pages/inquiry.js` lack explicitly defined maximum lengths, which might lead to excessive memory consumption on the client or DoS on external integrations (like Formspree or Email clients) if abused with extremely large inputs.
**Learning:** It's important to set a reasonable `maxLength` on user-facing inputs to protect against client-side and upstream service degradation.
**Prevention:** Always define `maxLength` on `<input>` and `<textarea>` fields in React forms as a basic defense-in-depth practice.
## 2024-05-18 - Fix Reverse Tabnabbing Vulnerability
**Vulnerability:** External links opening in new tabs (`target="_blank"`) did not include `rel="noopener noreferrer"`.
**Learning:** This exposes users to reverse tabnabbing attacks where the newly opened page gains a reference to the `window.opener` object, allowing the untrusted page to navigate the original page to a malicious site.
**Prevention:** Always pair `target="_blank"` with `rel="noopener noreferrer"`, especially when dynamically generating link markup.
