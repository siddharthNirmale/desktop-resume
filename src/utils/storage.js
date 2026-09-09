/**
 * Safe Browser Storage Utility
 * Protects against QuotaExceededError, private browsing SecurityErrors,
 * corrupted JSON crashes, and prototype manipulation.
 */

/**
 * Safely retrieve a raw string from localStorage.
 */
export function safeGetItem(key, fallback = null) {
  if (typeof window === "undefined") return fallback;
  try {
    const value = localStorage.getItem(key);
    return value !== null ? value : fallback;
  } catch {
    return fallback;
  }
}

/**
 * Safely write a string to localStorage.
 * Handles storage disabled, QuotaExceededError, and SecurityError.
 */
export function safeSetItem(key, value) {
  if (typeof window === "undefined") return false;
  try {
    localStorage.setItem(key, String(value));
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely remove an item from localStorage.
 */
export function safeRemoveItem(key) {
  if (typeof window === "undefined") return false;
  try {
    localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

/**
 * Safely parse JSON from localStorage with an optional validator.
 * 
 * @param {string} key - Storage key
 * @param {*} fallback - Fallback if key missing or parsing fails
 * @param {(data: *) => boolean} [validator] - Optional validation predicate
 */
export function safeGetJson(key, fallback = null, validator = null) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (validator && typeof validator === "function") {
      return validator(parsed) ? parsed : fallback;
    }
    return parsed;
  } catch {
    return fallback;
  }
}

/**
 * Safely serialize and store JSON in localStorage.
 */
export function safeSetJson(key, value) {
  if (typeof window === "undefined") return false;
  try {
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return true;
  } catch {
    return false;
  }
}
