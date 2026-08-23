import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command as CommandIcon } from "lucide-react";
import useCommandSearch from "../hooks/useCommandSearch";

export default function CommandPalette({
  toggleWindow,
  toggleWidget,
  minimizeAll,
  restoreAll,
  resetLayout,
  bringToFront,
}) {
  const {
    isOpen,
    setIsOpen,
    query,
    setQuery,
    results,
    selectedIndex,
    setSelectedIndex,
    addRecent,
    closePalette,
  } = useCommandSearch();

  const inputRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll selected item into view smoothly
    if (listRef.current) {
      const selectedEl = listRef.current.children[selectedIndex];
      if (selectedEl) {
        selectedEl.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [selectedIndex]);

  const handleExecute = (command) => {
    command.action({
      toggleWindow,
      toggleWidget,
      minimizeAll,
      restoreAll,
      resetLayout,
      bringToFront,
    });
    addRecent(command.id);
    closePalette();
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleExecute(results[selectedIndex]);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 font-primary">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closePalette}
          />

          {/* Palette */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header / Input */}
            <div className="flex items-center px-4 py-3 border-b border-[var(--color-surface-border)]">
              <Search className="w-5 h-5 text-[var(--color-text-secondary)] mr-3" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search apps, projects, skills..."
                className="flex-1 bg-transparent border-none outline-none text-[var(--color-text)] placeholder-[var(--color-text-tertiary)] text-base font-medium"
              />
              <div className="hidden sm:flex items-center gap-1 text-[10px] text-[var(--color-text-tertiary)] font-semibold border border-[var(--color-surface-border)] px-1.5 py-0.5 rounded-md">
                ESC
              </div>
            </div>

            {/* Results */}
            <div 
              ref={listRef}
              className="max-h-[340px] overflow-y-auto p-2 custom-scrollbar"
            >
              {results.length === 0 ? (
                <div className="py-10 text-center text-[var(--color-text-secondary)] text-sm">
                  No results found for "{query}"
                </div>
              ) : (
                <>
                  {!query && (
                    <div className="px-3 pt-2 pb-1 text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider">
                      {/* Only label as recent if there are recent items, else suggestions */}
                      Suggested
                    </div>
                  )}
                  {results.map((cmd, i) => {
                    const isSelected = i === selectedIndex;
                    const Icon = cmd.icon || CommandIcon;
                    return (
                      <button
                        key={cmd.id}
                        onClick={() => handleExecute(cmd)}
                        onMouseEnter={() => setSelectedIndex(i)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left outline-none ${
                          isSelected
                            ? "bg-[var(--color-accent)] text-white"
                            : "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        <div className={`p-1.5 rounded-lg ${isSelected ? "bg-white/20" : "bg-[var(--color-surface-hover)]"}`}>
                          <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-[var(--color-text-secondary)]"}`} />
                        </div>
                        <div className="flex flex-col flex-1 min-w-0">
                          <span className={`text-sm font-medium truncate ${isSelected ? "text-white" : "text-[var(--color-text)]"}`}>
                            {cmd.name}
                          </span>
                          <span className={`text-xs truncate ${isSelected ? "text-white/70" : "text-[var(--color-text-secondary)]"}`}>
                            {cmd.description}
                          </span>
                        </div>
                        <div className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                          isSelected 
                            ? "bg-white/20 text-white" 
                            : "bg-[var(--color-surface-border)] text-[var(--color-text-tertiary)]"
                        }`}>
                          {cmd.category}
                        </div>
                      </button>
                    );
                  })}
                </>
              )}
            </div>
            
            {/* Footer */}
            <div className="px-4 py-2 bg-[var(--color-surface-dark)] border-t border-[var(--color-surface-border)] flex items-center justify-between text-xs text-[var(--color-text-tertiary)]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <span className="bg-[var(--color-surface)] border border-[var(--color-surface-border)] px-1 rounded">↑</span>
                  <span className="bg-[var(--color-surface)] border border-[var(--color-surface-border)] px-1 rounded">↓</span>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <span className="bg-[var(--color-surface)] border border-[var(--color-surface-border)] px-1 rounded">↵</span>
                  to select
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
