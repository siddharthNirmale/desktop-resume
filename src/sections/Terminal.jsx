import { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Web OS Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ]);
  const endOfTerminalRef = useRef(null);

  // Auto-scroll to the bottom when new commands are entered
  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      let output = '';

      // Command Logic Router
      switch (command) {
        case 'help':
          output = 'Available commands: help, clear, whoami, skills, location, date, echo [text]';
          break;
        case 'clear':
          setHistory([]);
          setInput('');
          return;
        case 'whoami':
          output = 'Siddharth Nirmale - Full-Stack Developer';
          break;
        case 'skills':
          output = 'MERN Stack, ReactJS, Node.js, Google Cloud Platform, Render, Gemini API';
          break;
        case 'location':
          output = 'Indore, Madhya Pradesh, India';
          break;
        case 'date':
          output = new Date().toString();
          break;
        case '':
          output = '';
          break;
        default:
          if (command.startsWith('echo ')) {
            output = command.substring(5);
          } else {
            output = `Command not found: ${command}. Type "help" for a list of commands.`;
          }
      }

      // Add the user's command and the system's output to the history
      setHistory((prev) => [
        ...prev,
        { type: 'command', text: input },
        ...(output ? [{ type: 'output', text: output }] : [])
      ]);
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col p-4 bg-[#0a0a0a] text-[#4af626] font-mono text-sm overflow-auto custom-scrollbar shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
      
      {/* Render Command History */}
      {history.map((line, index) => (
        <div key={index} className="mb-1 leading-relaxed">
          {line.type === 'command' ? (
            <span className="text-white">
              <span className="text-blue-400">visitor@web-os</span><span className="text-white">:</span><span className="text-blue-400">~</span><span className="text-white">$</span> {line.text}
            </span>
          ) : (
            <span className="text-neutral-400">{line.text}</span>
          )}
        </div>
      ))}

      {/* Active Input Line */}
      <div className="flex items-center mt-1">
        <span className="text-blue-400 mr-2">visitor@web-os:~$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-white focus:ring-0"
          autoFocus
          spellCheck="false"
          autoComplete="off"
        />
      </div>
      
      {/* Invisible element to anchor the auto-scroll */}
      <div ref={endOfTerminalRef} />
    </div>
  );
}