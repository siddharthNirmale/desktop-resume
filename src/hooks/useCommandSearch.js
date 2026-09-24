import { useState, useEffect, useMemo, useCallback } from "react";
import { ALL_COMMANDS } from "../config/commandRegistry";
import { safeGetJson, safeSetJson } from "../utils/storage";

export default function useCommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [recentIds, setRecentIds] = useState(() =>
    safeGetJson("os-recent-commands", [], (arr) => Array.isArray(arr))
  );

  const handleQueryChange = useCallback((newQuery) => {
    setQuery(newQuery);
    setSelectedIndex(0);
  }, []);

  // Filter and rank commands based on query
  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) {
      if (recentIds.length > 0) {
        return recentIds
          .map((id) => ALL_COMMANDS.find((c) => c.id === id))
          .filter(Boolean)
          .slice(0, 6);
      }
      return ALL_COMMANDS.slice(0, 6);
    }

    const lowerQuery = trimmed.toLowerCase();

    const scored = ALL_COMMANDS.map((cmd) => {
      let score = 0;
      const lowerName = cmd.name.toLowerCase();

      if (lowerName === lowerQuery) score += 100;
      else if (lowerName.startsWith(lowerQuery)) score += 50;
      else if (lowerName.includes(lowerQuery)) score += 20;

      if (cmd.keywords?.some((k) => k.includes(lowerQuery))) score += 10;
      if (cmd.description?.toLowerCase().includes(lowerQuery)) score += 5;

      return { cmd, score };
    }).filter((item) => item.score > 0);

    return scored.sort((a, b) => b.score - a.score).map((item) => item.cmd);
  }, [query, recentIds]);

  // Handle keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }

      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const addRecent = useCallback((id) => {
    setRecentIds((prev) => {
      const updated = [id, ...prev.filter((item) => item !== id)].slice(0, 8);
      safeSetJson("os-recent-commands", updated);
      return updated;
    });
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery: handleQueryChange,
    results,
    selectedIndex,
    setSelectedIndex,
    addRecent,
    closePalette,
  };
}
