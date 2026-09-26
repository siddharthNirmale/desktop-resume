# Authoritative Engineering Standards & Agent Constitution

> **Canonical Authority**: [Rules-and-Regulations Repository](https://github.com/siddharthNirmale/Rules-and-Regulations)  
> **Status**: Mandatory Standard across all development, refactoring, and AI pair-programming workflows.

---

## 1. Core Mandate & Philosophy
* **Objective**: Produce secure, correct, minimal, maintainable, and regression-free software that preserves system stability.
* **Motto**: *Design like an artist, code like a professional, think like a product designer, build like an engineer.*
* **Aesthetics**: Apple-inspired minimalism & Microsoft-inspired functional desktop architecture. Premium, distinctive, zero generic template tropes.

---

## 2. The 10 Invariant Operational Steps
Every coding agent or engineer MUST execute tasks following these 10 sequential operational steps:
1. **Inspect Before Modifying**: Never edit or delete code until examining relevant files, caller sites, and existing utilities.
2. **Understand the Existing Architecture**: Follow established conventions for error handling, data flow, state management, and file naming.
3. **Identify Constraints**: Check runtime targets (Node v22+, modern evergreen browsers, Vercel SPA deployment).
4. **Plan the Smallest Appropriate Change**: Surgical implementation without speculative abstractions or unused helpers.
5. **Preserve Unrelated Functionality**: Never alter, reformat, or delete code, comments, or imports outside the boundary of the requested task.
6. **Consider Security Implications**: Zero-trust approach; validate inputs, sanitize external links/CSS, and guard against XSS/injections.
7. **Implement Cleanly**: Idiomatic code adhering to established design tokens, Tailwind CSS, and React 19 standards.
8. **Test and Verify**: Confirm existing automated tests continue to pass (`npm test`, `npm run lint`, `npm run build`).
9. **Review the Diff Line-by-Line**: Inspect `git diff` before finalizing to eliminate dead code or unintended whitespace changes.
10. **Report What Changed & Remaining Uncertainty**: Summarize file modifications, executed checks, and architectural decisions transparently.

---

## 3. Priority & Conflict Resolution Hierarchy
When requirements, constraints, or design goals conflict, resolve tensions using this strict priority order:
1. Safety and Security (XSS protection, zero secrets, sanitized URLs, CSP)
2. Functional Correctness
3. Explicit User / Project Requirements
4. Existing Project Constraints & Contracts
5. Data Integrity & Concurrency Safety
6. Accessibility (WCAG 2.2 AA, keyboard navigation, focus-visible, ARIA landmarks)
7. System Reliability & Error Resilience (Error boundaries, safe storage, explicit async states)
8. Measured Performance & Efficiency (Code splitting, chunk budgets < 1000 kB, lazy loading)
9. Code Simplicity & Maintainability
10. Developer Convenience

---

## 4. Domain Standards for this Project

### Frontend Architecture & React (Rule FE-01 to FE-06)
- Use native semantic HTML elements (`<button>`, `<a>`, `<input>`) before custom clickables.
- Lifecycle hooks (`useEffect`) must clean up listeners, observers, timers, and abort fetch requests.
- Handle all async data states explicitly (Loading, Error with retry, Empty, Success).
- Use `ErrorBoundary` around windows, widgets, and root views to isolate failures.

### Accessibility (Rules A11Y-01 to A11Y-06)
- WCAG 2.2 AA compliant.
- Every interactive element and icon button MUST have an accessible name (`aria-label`, `<label>`, or text content).
- High-contrast `:focus-visible` outlines must be maintained.
- Modals and dialogs must trap focus, support `Escape` dismissal, and declare `role="dialog"`.
- Support `@media (prefers-reduced-motion: reduce)`.

### Security & Sanitization (Rules SEC-01 to SEC-05, DP-01)
- Zero secrets in source code, configs, or commits.
- External links opened in `_blank` must specify `rel="noopener noreferrer"`.
- All external URLs dynamically rendered must pass through `sanitizeUrl()`.
- Dynamic CSS URLs and variables must pass through `sanitizeCssUrl()` and `isValidHexColor()`.
- HTTP Security Headers in `vercel.json` (HSTS, CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy).

### Performance & Bundle Hygiene (Rules PERF-01 to PERF-05)
- Explicit aspect ratios / dimensions on images (`loading="lazy"`, `decoding="async"`).
- Code splitting and chunking via `vite.config.js` manualChunks to keep all chunk sizes < 1000 kB.
- Debounced resize and high-frequency event handlers.

### Automated Testing & Quality Gates (Rules TST-01 to TST-04, CI-CD-01)
- Run `npm test`, `npm run lint`, and `npm run build` prior to any completion or pull request.
- Test observable behavior and boundary conditions (`null`, `undefined`, empty collections, errors) using native `node:test`.
