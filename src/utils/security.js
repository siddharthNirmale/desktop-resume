/**
 * Core Security Utilities
 * Defensive sanitation against XSS, open redirects, and injection vectors.
 */

// Permitted URL schemes for navigation
const ALLOWED_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);

/**
 * Validates and sanitizes a URL string.
 * Blocks dangerous schemes (javascript:, data:, vbscript:) and malformed URIs.
 * 
 * @param {string} url - Target URL to sanitize
 * @param {string} fallback - Fallback URL if invalid (default: "#")
 * @returns {string} Sanitized safe URL
 */
export function sanitizeUrl(url, fallback = "#") {
  if (!url || typeof url !== "string") {
    return fallback;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return fallback;
  }

  // Allow safe in-page anchors and relative paths
  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../")
  ) {
    return trimmed;
  }

  try {
    // Attempt standard URL parse
    const parsed = new URL(trimmed, window.location.origin);
    if (ALLOWED_PROTOCOLS.has(parsed.protocol)) {
      return trimmed;
    }
  } catch {
    // If URL constructor fails, reject
    return fallback;
  }

  return fallback;
}

/**
 * Validates whether a given string is a valid hex color.
 * Protects against CSS injection via dynamic CSS variables or styles.
 * 
 * @param {string} color - Hex color string
 * @returns {boolean} True if safe hex color
 */
export function isValidHexColor(color) {
  if (!color || typeof color !== "string") return false;
  return /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(color.trim());
}

/**
 * Validates and sanitizes an image or wallpaper URL for use in CSS url(...).
 * Rejects strings containing quotes, parenthesis, or control characters.
 * 
 * @param {string} url - Target wallpaper URL
 * @returns {string|null} Safe URL or null
 */
export function sanitizeCssUrl(url) {
  if (!url || typeof url !== "string") return null;
  const trimmed = url.trim();
  // Reject quotes, parentheses, semicolons, backslashes, or newlines that could break out of CSS url()
  if (/["'();\s\\]/.test(trimmed)) {
    return null;
  }
  const safe = sanitizeUrl(trimmed, null);
  return safe;
}

/**
 * Safely opens an external URL with reverse-tabnabbing protection.
 * 
 * @param {string} url - URL to open
 * @param {string} target - Window target (default: "_blank")
 * @param {string} features - Window features (default: "noopener,noreferrer")
 */
export function safeOpen(url, target = "_blank", features = "noopener,noreferrer") {
  const safeUrl = sanitizeUrl(url, null);
  if (!safeUrl) return null;
  return window.open(safeUrl, target, features);
}
