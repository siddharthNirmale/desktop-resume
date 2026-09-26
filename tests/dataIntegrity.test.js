import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import skills from "../src/data/skills.js";
import { initialWindowsConfig } from "../src/config/windowsConfig.js";

describe("Data Integrity & Schema Guarantees (Law 3, Law 18)", () => {
  it("ensures skills structure contains valid categories and non-empty items", () => {
    assert.ok(Array.isArray(skills) && skills.length > 0, "Skills should be a non-empty array");

    for (const skill of skills) {
      assert.ok(skill.category && typeof skill.category === "string", "Skill must have a category");
      assert.ok(Array.isArray(skill.items) && skill.items.length > 0, "Skill items must be a non-empty array");
      for (const item of skill.items) {
        assert.ok(typeof item === "string" && item.trim().length > 0, "Skill item must be a non-empty string");
      }
    }
  });

  it("ensures initial windows configuration contains required core applications and widgets", () => {
    assert.ok(Array.isArray(initialWindowsConfig) && initialWindowsConfig.length > 0);
    const windowIds = initialWindowsConfig.map((item) => item.id);

    const requiredApps = ["projects", "about", "resume", "contact", "terminal"];
    for (const app of requiredApps) {
      assert.ok(windowIds.includes(app), `Core application missing from window config: ${app}`);
    }

    for (const item of initialWindowsConfig) {
      assert.ok(item.id && typeof item.id === "string");
      assert.ok(item.title && typeof item.title === "string");
      assert.ok(item.type === "window" || item.type === "widget");
      assert.ok(typeof item.isOpen === "boolean");
    }
  });

  it("ensures project data file exists and contains declared projects and attributes", () => {
    const projectFilePath = path.resolve("src/data/project.js");
    assert.ok(fs.existsSync(projectFilePath), "src/data/project.js must exist");

    const content = fs.readFileSync(projectFilePath, "utf-8");
    assert.ok(content.includes("export default projects"), "project.js must export default projects");
    assert.ok(content.includes("Lekha"), "project.js must include Lekha project");
    assert.ok(content.includes("title:"), "project.js entries must have titles");
    assert.ok(content.includes("tech:"), "project.js entries must have tech stacks");
    assert.ok(content.includes("bullets:"), "project.js entries must have bullet descriptions");
  });
});
