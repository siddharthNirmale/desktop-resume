import { useState, useEffect } from 'react';

export default function Notepad() {
  const [text, setText] = useState(() => {
    return localStorage.getItem('web-os-notepad') || '';
  });

  useEffect(() => {
    localStorage.setItem('web-os-notepad', text);
  }, [text]);

  const handleClear = () => {
    if (window.confirm('Clear all text?')) setText('');
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <div className="h-full flex flex-col bg-black font-mono text-sm overflow-hidden">
      
      {/* Widget Header */}
      <div className="flex justify-between items-end pb-4 mb-2 border-b border-neutral-900 px-6 pt-6">
        <div>
          <h1 className="text-3xl font-bold tracking-[0.2em] text-white">
            TXT<span className="text-[#f02020]">.</span>EDIT
          </h1>
          <p className="text-[10px] text-neutral-500 tracking-widest uppercase mt-2">
            Local Storage // Auto-Sync
          </p>
        </div>
        <div className="text-[#f02020] text-[10px] tracking-widest flex items-center gap-2 uppercase">
          <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse"></span>
          Saving
        </div>
      </div>

      {/* Editor Area */}
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full px-6 py-2 bg-transparent resize-none outline-none text-neutral-300 leading-relaxed custom-scrollbar placeholder-neutral-800 focus:text-white transition-colors"
        spellCheck="false"
        placeholder="START TYPING..."
      />
      
      {/* Telemetry Status Bar */}
      <div className="border-t border-neutral-900 p-3 px-6 text-[10px] text-neutral-500 uppercase tracking-widest flex justify-between items-center bg-[#050505]">
        <div className="flex gap-6">
          <span><span className="text-white font-bold">{text.length}</span> CHARS</span>
          <span><span className="text-white font-bold">{wordCount}</span> WORDS</span>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={handleClear}
            className="text-neutral-600 hover:text-[#f02020] transition-colors outline-none cursor-pointer"
          >
            CLEAR
          </button>
          <span className="text-neutral-800">|</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
}