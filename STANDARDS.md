# Engineering Standards & Coding Constitution

This repository adheres strictly to the authoritative rules defined in the [Rules-and-Regulations Repository](https://github.com/siddharthNirmale/Rules-and-Regulations).

Every change, pull request, and AI coding agent interaction is bound by these standards.

---

## 1. The Core Philosophy
Our objective is to build **secure, correct, minimal, maintainable, and regression-free software** that delivers an Apple-inspired minimal and Microsoft-inspired functional desktop experience.

> *"Design like an artist. Code like a professional. Think like a product designer. Build like an engineer."*

---

## 2. The 10 Invariant Operational Steps
1. **Inspect Before Modifying**: Read callers, imports, schemas, and surrounding code before modifying.
2. **Understand the Existing Architecture**: Respect established naming, styling, state management, and error handling patterns.
3. **Identify Constraints**: Browser targets, Node runtime (v22+), Vercel static SPA environment.
4. **Plan Smallest Change**: Surgical implementation without speculative abstractions or bloated helpers.
5. **Preserve Unrelated Functionality**: Never touch or reformat unrelated files or comments.
6. **Consider Security Implications**: Zero trust on inputs, sanitized URLs, and reverse tabnabbing defense.
7. **Implement Cleanly**: Adhere to Tailwind CSS v4 design tokens and React 19 conventions.
8. **Test and Verify**: Run `npm test`, `npm run lint`, and `npm run build` with zero errors.
9. **Review Diff Line-by-Line**: Eliminate dead code, debug statements, and unintended whitespace diffs.
10. **Report with Transparency**: Provide a structured breakdown of changes and verification results.

---

## 3. Priority & Conflict Resolution Hierarchy
```text
1. Safety and Security
2. Functional Correctness
3. Explicit User / Project Requirements
4. Existing Project Constraints & Contracts
5. Data Integrity & Concurrency Safety
6. Accessibility (WCAG 2.2 AA)
7. System Reliability & Error Resilience
8. Measured Performance & Efficiency
9. Code Simplicity & Maintainability
10. Developer Convenience
```

---

## 4. Domain Standards & Project Implementation

| Domain | Standard Reference | Project Implementation |
| :--- | :--- | :--- |
| **Error Resilience** | [backend/ERROR-HANDLING-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/backend/ERROR-HANDLING-RULES.md) | `ErrorBoundary` wrapping windows, widgets, and root displays to isolate failures. |
| **Frontend Lifecycle** | [frontend/FRONTEND-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/frontend/FRONTEND-RULES.md) | Effect cleanup with `AbortController`, timers, observers, and event listeners. Explicit async states (Loading, Error, Success). |
| **Accessibility** | [frontend/ACCESSIBILITY-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/frontend/ACCESSIBILITY-RULES.md) | WCAG 2.2 AA compliant. `:focus-visible` styling, accessible names (`aria-label`) on all controls, modal focus/escape handling, and `@media (prefers-reduced-motion: reduce)`. |
| **Security & Headers** | [security/SECURITY-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/security/SECURITY-RULES.md) | `sanitizeUrl()`, `sanitizeCssUrl()`, `isValidHexColor()`, `rel="noopener noreferrer"`, CSP, HSTS, and frame protections in `vercel.json`. |
| **Performance & Bundling** | [frontend/PERFORMANCE-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/frontend/PERFORMANCE-RULES.md) | Code splitting in `vite.config.js` into dedicated vendor chunks (`vendor-three`, `vendor-motion`, `vendor-lottie`), keeping all chunk sizes < 1000 kB. Lazy-loaded images with explicit dimensions. |
| **SEO Hygiene** | [frontend/SEO-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/frontend/SEO-RULES.md) | Single `<h1>`, sequential heading tree, OpenGraph/Twitter cards, JSON-LD Schema markup, canonical URL, valid `robots.txt`, and `sitemap.xml`. |
| **Automated Testing** | [testing/TESTING-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/testing/TESTING-RULES.md) | Deterministic unit tests with Node native `node:test` covering boundary cases, security sanitization, and storage recovery. |
| **CI/CD Quality Gates** | [devops/CI-CD-RULES.md](https://github.com/siddharthNirmale/Rules-and-Regulations/blob/main/devops/CI-CD-RULES.md) | GitHub Actions pipeline enforcing static analysis, security audits, automated testing, and production compilation. |

---

## 5. Verification Commands
Run before any commit or pull request:
```bash
# 1. Static Analysis
npm run lint

# 2. Automated Test Suite
npm test

# 3. Security Audit
npm audit --omit=dev

# 4. Production Build Verification
npm run build
```
