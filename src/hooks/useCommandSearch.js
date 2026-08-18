import { useState, useEffect, useMemo, useCallback } from 'react';
import { getAllCommands } from '../config/commandRegistry';

export default function useCommandSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentIds, setRecentIds] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem('os-recent-commands')) || [];
    } catch {
      return [];
    }
  });

  const commands = useMemo(() => getAllCommands(), []);

  // Filter and rank commands based on query
  const results = useMemo(() => {
    if (!query.trim()) {
      // Return recent or suggested when empty
      if (recentIds.length > 0) {
        return recentIds
          .map(id => commands.find(c => c.id === id))
          .filter(Boolean)
          .slice(0, 6);
      }
      return commands.slice(0, 6); // default suggestions
    }

    const lowerQuery = query.toLowerCase();
    
    const scored = commands.map(cmd => {
      let score = 0;
      const lowerName = cmd.name.toLowerCase();
      
      // Exact match
      if (lowerName === lowerQuery) score += 100;
      // Starts with
      else if (lowerName.startsWith(lowerQuery)) score += 50;
      // Partial name match
      else if (lowerName.includes(lowerQuery)) score += 20;
      
      // Keyword match
      if (cmd.keywords.some(k => k.includes(lowerQuery))) score += 10;
      
      // Description match
      if (cmd.description.toLowerCase().includes(lowerQuery)) score += 5;

      return { cmd, score };
    }).filter(item => item.score > 0);

    return scored.sort((a, b) => b.score - a.score).map(item => item.cmd);
  }, [query, commands, recentIds]);

  // Handle keyboard shortcut (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Reset selection when query or results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const addRecent = useCallback((id) => {
    setRecentIds(prev => {
      const updated = [id, ...prev.filter(item => item !== id)].slice(0, 8);
      localStorage.setItem('os-recent-commands', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const closePalette = useCallback(() => {
    setIsOpen(false);
    setQuery("");
  }, []);

  return {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    results,
    selectedIndex,
    setSelectedIndex,
    addRecent,
    closePalette
  };
}
