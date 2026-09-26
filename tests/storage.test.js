import { describe, it, beforeEach } from "node:test";
import assert from "node:assert/strict";
import {
  safeGetItem,
  safeSetItem,
  safeRemoveItem,
  safeGetJson,
  safeSetJson,
} from "../src/utils/storage.js";

// Mock localStorage for Node environment
class MockLocalStorage {
  constructor() {
    this.store = new Map();
    this.failOnSet = false;
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    if (this.failOnSet) {
      throw new Error("QuotaExceededError: Storage quota exceeded");
    }
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

describe("Storage Utilities (Rule FE-04, Law 17, Law 18)", () => {
  let mockStorage;

  beforeEach(() => {
    mockStorage = new MockLocalStorage();
    globalThis.window = { localStorage: mockStorage };
    globalThis.localStorage = mockStorage;
  });

  it("stores and retrieves raw string items correctly", () => {
    const success = safeSetItem("theme", "dark");
    assert.equal(success, true);
    assert.equal(safeGetItem("theme"), "dark");
  });

  it("returns fallback for missing items", () => {
    assert.equal(safeGetItem("nonexistent", "default-val"), "default-val");
    assert.equal(safeGetItem("nonexistent"), null);
  });

  it("removes items safely", () => {
    safeSetItem("key-to-remove", "hello");
    assert.equal(safeGetItem("key-to-remove"), "hello");
    safeRemoveItem("key-to-remove");
    assert.equal(safeGetItem("key-to-remove"), null);
  });

  it("handles storage exceptions gracefully without crashing (Rule Law 17)", () => {
    mockStorage.failOnSet = true;
    const writeResult = safeSetItem("fail-key", "data");
    assert.equal(writeResult, false);

    const jsonWriteResult = safeSetJson("fail-json", { a: 1 });
    assert.equal(jsonWriteResult, false);
  });

  it("safely serializes and parses valid JSON objects", () => {
    const data = { notes: [{ id: "1", title: "Test" }], count: 1 };
    const saved = safeSetJson("test-notes", data);
    assert.equal(saved, true);

    const retrieved = safeGetJson("test-notes");
    assert.deepEqual(retrieved, data);
  });

  it("returns fallback when JSON parsing encounters corrupted data", () => {
    mockStorage.setItem("corrupted", "{ invalid json... }");
    const result = safeGetJson("corrupted", { fallback: true });
    assert.deepEqual(result, { fallback: true });
  });

  it("applies validator predicate when provided", () => {
    const validArray = [1, 2, 3];
    safeSetJson("array-data", validArray);

    // Validator requiring array
    const validResult = safeGetJson(
      "array-data",
      [],
      (val) => Array.isArray(val) && val.length > 0
    );
    assert.deepEqual(validResult, validArray);

    // Save non-array
    safeSetJson("non-array", { foo: "bar" });
    const rejectedResult = safeGetJson(
      "non-array",
      ["fallback"],
      (val) => Array.isArray(val)
    );
    assert.deepEqual(rejectedResult, ["fallback"]);
  });
});
