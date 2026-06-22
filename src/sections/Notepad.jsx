import { useState, useEffect } from "react";

export default function Notepad() {
  const [text, setText] = useState(() => {
    return localStorage.getItem("web-os-notepad") || "";
  });

  useEffect(() => {
    localStorage.setItem("web-os-notepad", text);
  }, [text]);

  const handleClear = () => {
    if (window.confirm("Clear all text?")) setText("");
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="
      h-full flex flex-col
      bg-[var(--color-surface)]
      text-white
      font-[var(--font-primary)]
      overflow-hidden
    ">

      {/* HEADER */}
      <div className="
        flex justify-between items-end
        pb-4 mb-2
        border-b border-[var(--color-surface-border)]
        px-6 pt-6
      ">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em]">
            TXT<span className="text-[var(--color-accent)]">.</span>EDIT
          </h1>

          <p className="
            text-[10px]
            text-white/40
            tracking-[var(--tracking-super-wide)]
            uppercase mt-2
          ">
            Local Storage // Auto-Sync
          </p>
        </div>

        <div className="
          text-[var(--color-accent)]
          text-[10px]
          tracking-[var(--tracking-super-wide)]
          flex items-center gap-2 uppercase
        ">
          <span className="
            w-1.5 h-1.5
            bg-[var(--color-accent)]
            rounded-full animate-pulse
          " />
          Saving
        </div>
      </div>

      {/* EDITOR */}
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="START TYPING..."
        spellCheck="false"
        className="
          flex-1 w-full
          px-6 py-3
          bg-transparent
          resize-none outline-none
          text-white/70
          leading-relaxed
          custom-scrollbar
          placeholder:text-white/10
          focus:text-white
          transition-colors
        "
      />

      {/* STATUS BAR */}
      <div className="
        border-t border-[var(--color-surface-border)]
        p-3 px-6
        text-[10px]
        uppercase tracking-[var(--tracking-super-wide)]
        flex justify-between items-center
        bg-[var(--color-surface-dark)]
        text-white/40
      ">

        <div className="flex gap-6">
          <span>
            <span className="text-white font-bold">{text.length}</span> CHARS
          </span>

          <span>
            <span className="text-white font-bold">{wordCount}</span> WORDS
          </span>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleClear}
            className="
              text-white/30
              hover:text-[var(--color-accent)]
              transition-colors
              cursor-pointer
            "
          >
            CLEAR
          </button>

          <span className="text-white/10">|</span>

          <span>UTF-8</span>
        </div>

      </div>
    </div>
  );
}