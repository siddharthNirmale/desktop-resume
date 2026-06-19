import { useState, useEffect } from 'react';

export default function Notepad() {
  const [text, setText] = useState(() => {
    return localStorage.getItem('web-os-notepad') || 'Draft your ideas here...';
  });

  useEffect(() => {
    localStorage.setItem('web-os-notepad', text);
  }, [text]);

  return (
    <div className="h-full flex flex-col bg-[#0c0c0c] text-neutral-300">
      <textarea 
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-sm leading-relaxed custom-scrollbar placeholder-neutral-700"
        spellCheck="false"
        placeholder="Start typing..."
      />
      
      {/* Minimal Status Bar */}
      <div className="border-t border-neutral-800/80 p-2 px-6 text-[10px] text-neutral-600 uppercase tracking-widest flex justify-between select-none">
        <span>{text.length} Characters</span>
        <span>UTF-8</span>
      </div>
    </div>
  );
}