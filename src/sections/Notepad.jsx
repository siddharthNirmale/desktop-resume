import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";

export default function Notepad() {
  const [text, setText] = useState(() => {
    return localStorage.getItem("web-os-notepad") || "";
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    localStorage.setItem("web-os-notepad", text);

    const timeout = setTimeout(() => {
      setIsSaving(false);
    }, 400);

    return () => clearTimeout(timeout);
  }, [text]);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to discard all text?")) {
      setText("");
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full h-full flex flex-col bg-[var(--color-surface)] text-[var(--color-text)] font-primary selection:bg-[var(--color-accent)] selection:text-white transition-colors duration-250">

      {/* macOS Style Document Info Sub-Header Bar */}
      <div className="px-6 py-4 border-b border-[var(--color-surface-border)] flex items-center justify-between bg-gradient-to-b from-[var(--color-surface-border)] to-transparent shrink-0 transition-colors duration-250">
        <div>
          <h1 className="text-sm font-medium text-[var(--color-text)] transition-colors duration-250">
            untitled.txt
          </h1>
          <p className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5 transition-colors duration-250">
            Local  Synchronization
          </p>
        </div>

        {/* Dynamic Sync Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-200">
          <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-250 ${isSaving ? 'bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)] animate-pulse' : 'bg-[var(--color-surface-border)]'}`} />
          <span className={`transition-colors duration-250 ${isSaving ? 'text-[var(--color-accent)]' : 'text-[var(--color-text-tertiary)]'}`}>
            {isSaving ? 'Syncing...' : 'Saved'}
          </span>
        </div>
      </div>

      {/* Editor Body Textarea Workspace */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing your notes here..."
        spellCheck="false"
        // bg-transparent lets the parent's surface color shine through seamlessly
        className="flex-1 w-full px-6 py-5 bg-transparent resize-none outline-none text-[14px] text-[var(--color-text-secondary)] leading-relaxed custom-scrollbar placeholder:text-[var(--color-text-tertiary)] placeholder:opacity-50 focus:text-[var(--color-text)] transition-colors duration-250 font-primary"
      />

      {/* Clean Native Status Metadata Footer Bar */}
      <div className="border-t border-[var(--color-surface-border)] p-2 px-6 text-[12px] text-[var(--color-text-tertiary)] flex justify-between items-center bg-[var(--color-surface-inactive)] font-medium transition-colors duration-250">
        <div className="flex gap-4">
          <span>
            <span className="text-[var(--color-text-secondary)] font-semibold transition-colors duration-250">{text.length}</span> characters
          </span>
          <span>
            <span className="text-[var(--color-text-secondary)] font-semibold transition-colors duration-250">{wordCount}</span> words
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] transition-colors duration-150 focus:outline-none cursor-default"
            title="Clear Document"
          >
            <FiTrash2 size={12} />
            <span>Clear</span>
          </button>

          <span className="text-[var(--color-surface-border)] font-normal transition-colors duration-250">|</span>
          <span className="text-[var(--color-text-tertiary)] text-[11px] font-normal tracking-wide transition-colors duration-250">UTF-8</span>
        </div>
      </div>

    </div>
  );
}
