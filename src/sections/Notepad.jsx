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
    <div className="w-full h-full flex flex-col bg-surface text-white font-primary selection:bg-accent/30 selection:text-white">
      
      {/* macOS Style Document Info Sub-Header Bar */}
      <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-b from-white/[0.02] to-transparent shrink-0">
        <div>
          <h1 className="text-sm font-medium text-white/90">
            untitled.txt
          </h1>
          <p className="text-[11px] text-white/40 mt-0.5">
            Local iCloud Synchronization
          </p>
        </div>

        {/* Dynamic Sync Indicator */}
        <div className="flex items-center gap-1.5 text-[11px] font-medium transition-colors duration-200">
          <span className={`w-1.5 h-1.5 rounded-full ${isSaving ? 'bg-accent shadow-[0_0_8px_var(--color-accent)] animate-pulse' : 'bg-white/20'}`} />
          <span className={isSaving ? 'text-accent' : 'text-white/40'}>
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
        className="flex-1 w-full px-6 py-5 bg-[#1E1E1E]/40 resize-none outline-none text-[14px] text-white/80 leading-relaxed custom-scrollbar placeholder:text-white/10 focus:text-white transition-colors font-primary"
      />

      {/* Clean Native Status Metadata Footer Bar */}
      <div className="border-t border-white/5 p-2 px-6 text-[12px] text-white/40 flex justify-between items-center bg-[#1A1A1C]/50 font-medium">
        <div className="flex gap-4">
          <span>
            <span className="text-white/70 font-semibold">{text.length}</span> characters
          </span>
          <span>
            <span className="text-white/70 font-semibold">{wordCount}</span> words
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-white/30 hover:text-accent transition-colors duration-150 focus:outline-none cursor-default"
            title="Clear Document"
          >
            <FiTrash2 size={12} />
            <span>Clear</span>
          </button>
          
          <span className="text-white/5 font-normal">|</span>
          <span className="text-white/30 text-[11px] font-normal tracking-wide">UTF-8</span>
        </div>
      </div>

    </div>
  );
}