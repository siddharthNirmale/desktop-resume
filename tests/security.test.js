import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  sanitizeUrl,
  isValidHexColor,
  sanitizeCssUrl,
} from "../src/utils/security.js";

describe("Security Utilities - sanitizeUrl (Rule SEC-01, Law 12, Law 18)", () => {
  it("allows valid https and http URLs", () => {
    assert.equal(sanitizeUrl("https://example.com"), "https://example.com");
    assert.equal(sanitizeUrl("http://example.org/path?q=1"), "http://example.org/path?q=1");
  });

  it("allows safe in-page anchors and relative paths", () => {
    assert.equal(sanitizeUrl("#contact"), "#contact");
    assert.equal(sanitizeUrl("/projects/lekha"), "/projects/lekha");
    assert.equal(sanitizeUrl("./assets/hero.png"), "./assets/hero.png");
    assert.equal(sanitizeUrl("../resume.pdf"), "../resume.pdf");
  });

  it("allows mailto: and tel: schemes", () => {
    assert.equal(
      sanitizeUrl("mailto:siddharth175nirmale1@gmail.com"),
      "mailto:siddharth175nirmale1@gmail.com"
    );
    assert.equal(sanitizeUrl("tel:+917723824225"), "tel:+917723824225");
  });

  it("blocks dangerous javascript: pseudo-protocols (XSS mitigation)", () => {
    assert.equal(sanitizeUrl("javascript:alert(1)"), "#");
    assert.equal(sanitizeUrl("JAVASCRIPT:alert(document.cookie)"), "#");
    assert.equal(sanitizeUrl("  javascript:void(0)  "), "#");
  });

  it("blocks data: and vbscript: protocols", () => {
    assert.equal(sanitizeUrl("data:text/html,<script>alert(1)</script>"), "#");
    assert.equal(sanitizeUrl("vbscript:msgbox(1)"), "#");
  });

  it("handles null, undefined, empty, and non-string boundary values (Rule TST-03)", () => {
    assert.equal(sanitizeUrl(null), "#");
    assert.equal(sanitizeUrl(undefined), "#");
    assert.equal(sanitizeUrl(""), "#");
    assert.equal(sanitizeUrl("   "), "#");
    assert.equal(sanitizeUrl(12345), "#");
    assert.equal(sanitizeUrl({}), "#");
  });

  it("returns custom fallback when specified", () => {
    assert.equal(sanitizeUrl("javascript:void(0)", "https://fallback.com"), "https://fallback.com");
    assert.equal(sanitizeUrl(null, "/default"), "/default");
  });
});

describe("Security Utilities - isValidHexColor (Rule SEC-01)", () => {
  it("validates 3, 4, 6, and 8 digit hex color codes", () => {
    assert.equal(isValidHexColor("#fff"), true);
    assert.equal(isValidHexColor("#FFFF"), true);
    assert.equal(isValidHexColor("#0a84ff"), true);
    assert.equal(isValidHexColor("#0A84FF80"), true);
  });

  it("rejects invalid hex characters and injection attempts", () => {
    assert.equal(isValidHexColor("#ggg"), false);
    assert.equal(isValidHexColor("red"), false);
    assert.equal(isValidHexColor("#0a84ff; background: red"), false);
    assert.equal(isValidHexColor("#0a84ff'"), false);
    assert.equal(isValidHexColor("0a84ff"), false);
  });

  it("handles boundary values (null, undefined, empty string)", () => {
    assert.equal(isValidHexColor(null), false);
    assert.equal(isValidHexColor(undefined), false);
    assert.equal(isValidHexColor(""), false);
    assert.equal(isValidHexColor(123), false);
  });
});

describe("Security Utilities - sanitizeCssUrl (Rule SEC-01)", () => {
  it("permits safe URLs for CSS url() use", () => {
    assert.equal(sanitizeCssUrl("https://example.com/bg.png"), "https://example.com/bg.png");
    assert.equal(sanitizeCssUrl("/assets/wallpaper.webp"), "/assets/wallpaper.webp");
  });

  it("rejects strings containing CSS breakout characters", () => {
    assert.equal(sanitizeCssUrl("https://example.com/bg.png); alert(1)"), null);
    assert.equal(sanitizeCssUrl("https://example.com/bg.png'"), null);
    assert.equal(sanitizeCssUrl('https://example.com/bg.png"'), null);
    assert.equal(sanitizeCssUrl("https://example.com/bg.png\\"), null);
  });

  it("handles boundary values", () => {
    assert.equal(sanitizeCssUrl(null), null);
    assert.equal(sanitizeCssUrl(undefined), null);
    assert.equal(sanitizeCssUrl(""), null);
  });
});
