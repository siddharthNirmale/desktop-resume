import { useState, useRef, useEffect } from 'react';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    {
      type: 'output',
      content: (
        <div className="mb-6 pb-4 border-b border-neutral-900 flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-bold tracking-[0.2em] text-white">
              SYS<span className="text-[#f02020]">.</span>TERM
            </h1>
            <p className="text-xs text-neutral-500 tracking-widest uppercase mt-2">
              v1.1.0 // Type 'help' to initialize
            </p>
          </div>
          <div className="text-[#f02020] text-[10px] tracking-widest flex items-center gap-2 uppercase">
            <span className="w-1.5 h-1.5 bg-[#f02020] rounded-full animate-pulse"></span>
            Online
          </div>
        </div>
      ),
    },
  ]);
  const endOfTerminalRef = useRef(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const command = input.trim().toLowerCase();
      let outputContent = null;

      switch (command) {
        case 'help':
          outputContent = (
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-lg my-2">
              {['help', 'clear', 'whoami', 'skills', 'projects', 'experience', 'socials', 'location', 'date'].map((cmd) => (
                <div key={cmd} className="flex items-center gap-2">
                  <span className="text-[#f02020] text-xs">■</span>
                  <span className="text-white tracking-wider">{cmd}</span>
                </div>
              ))}
              <div className="col-span-2 flex items-center gap-2 mt-2 pt-2 border-t border-neutral-900">
                <span className="text-[#f02020] text-xs">■</span>
                <span className="text-neutral-400 tracking-wider">echo [text]</span>
              </div>
            </div>
          );
          break;

        case 'clear':
          setHistory([]);
          setInput('');
          return;

        case 'whoami':
          outputContent = (
            <div className="border-l-2 border-[#f02020] pl-4 py-1 my-3 bg-neutral-950 p-2 rounded-r-lg inline-block">
              <div className="text-white font-bold tracking-widest uppercase text-lg">
                Siddharth Nirmale
              </div>
              <div className="text-neutral-400 text-xs tracking-wider uppercase mt-1">
                Full-Stack Developer
              </div>
            </div>
          );
          break;

        case 'skills':
          const skills = ['MERN Stack', 'ReactJS', 'Node.js', 'GCP', 'Render', 'Gemini API'];
          outputContent = (
            <div className="flex flex-wrap gap-2 my-3 max-w-lg">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          );
          break;

        case 'projects':
          const projects = [
            { name: 'Web OS Terminal', desc: 'Minimalist command-line interface built with React.', tech: ['React', 'Tailwind'] },
            { name: 'Cloud Sync App', desc: 'Real-time data synchronization tool.', tech: ['Node.js', 'GCP'] }
          ];
          outputContent = (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 max-w-2xl">
              {projects.map((proj, idx) => (
                <div key={idx} className="border border-neutral-800 p-4 rounded-xl hover:border-neutral-600 transition-colors bg-[#0a0a0a]">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-bold tracking-wider uppercase text-sm">{proj.name}</h3>
                    <span className="text-[#f02020] text-lg leading-none">↗</span>
                  </div>
                  <p className="text-neutral-500 text-xs mb-4 leading-relaxed">{proj.desc}</p>
                  <div className="flex gap-2">
                    {proj.tech.map(t => (
                      <span key={t} className="text-[9px] px-2 py-0.5 border border-neutral-800 rounded-full text-neutral-400 uppercase tracking-widest bg-black">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          );
          break;

        case 'experience':
          const jobs = [
            { role: 'Full-Stack Developer', company: 'Tech Corp', year: '2023 - Present' },
            { role: 'Frontend Intern', company: 'Startup Inc', year: '2022 - 2023' }
          ];
          outputContent = (
            <div className="flex flex-col gap-4 my-3 border-l border-neutral-800 ml-2 pl-4">
              {jobs.map((job, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 bg-[#f02020] rounded-full border-[3px] border-black"></div>
                  <div className="text-white text-sm font-bold tracking-wider uppercase">{job.role}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-neutral-400 text-xs tracking-widest uppercase">{job.company}</span>
                    <span className="text-neutral-700 text-xs">•</span>
                    <span className="text-neutral-500 text-[10px] tracking-widest">{job.year}</span>
                  </div>
                </div>
              ))}
            </div>
          );
          break;

        case 'socials':
          const socials = ['GitHub', 'LinkedIn', 'Twitter'];
          outputContent = (
            <div className="flex flex-col gap-2 my-3 max-w-sm">
              {socials.map(social => (
                <a key={social} href="#" className="flex justify-between items-center p-3 bg-[#0a0a0a] rounded-lg border border-neutral-800 hover:border-[#f02020] transition-colors group cursor-pointer">
                  <span className="text-white tracking-widest uppercase text-xs font-bold">{social}</span>
                  <span className="text-neutral-600 group-hover:text-[#f02020] transition-colors">→</span>
                </a>
              ))}
            </div>
          );
          break;

        case 'location':
          outputContent = (
            <div className="flex items-center gap-3 my-3 bg-[#111] px-4 py-3 rounded-2xl w-fit border border-neutral-800">
              <div className="w-8 h-8 rounded-full bg-[#f02020] flex items-center justify-center">
                <span className="text-white text-xs">📍</span>
              </div>
              <div>
                <div className="text-white text-sm tracking-wider uppercase font-bold">Indore</div>
                <div className="text-neutral-500 text-[10px] tracking-widest uppercase">
                  Madhya Pradesh, IN
                </div>
              </div>
            </div>
          );
          break;

        case 'date':
          const now = new Date();
          outputContent = (
            <div className="flex gap-4 my-3 items-center">
              <div className="text-4xl text-white font-bold tracking-tighter">
                {now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
              <div className="border-l border-neutral-700 pl-4">
                <div className="text-[#f02020] text-xs font-bold tracking-widest uppercase">
                  {now.toLocaleDateString('en-US', { weekday: 'long' })}
                </div>
                <div className="text-neutral-400 text-xs tracking-widest uppercase mt-0.5">
                  {now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' })}
                </div>
              </div>
            </div>
          );
          break;

        case '':
          outputContent = '';
          break;

        default:
          if (command.startsWith('echo ')) {
            outputContent = <span className="text-white">{command.substring(5)}</span>;
          } else {
            outputContent = (
              <span className="text-neutral-500">
                Command not found: <span className="text-[#f02020] font-bold">{command}</span>. Type 'help'.
              </span>
            );
          }
      }

      setHistory((prev) => [
        ...prev,
        { type: 'command', content: input },
        ...(outputContent ? [{ type: 'output', content: outputContent }] : []),
      ]);
      setInput('');
    }
  };

  return (
    <div className="h-full flex flex-col p-6 bg-black font-mono text-sm overflow-auto custom-scrollbar">
      {/* Command History */}
      {history.map((line, index) => (
        <div key={index} className="mb-2 leading-relaxed">
          {line.type === 'command' ? (
            <div className="flex items-center text-neutral-400 mt-5 mb-2">
              <span className="text-[#f02020] mr-3 font-bold">❯</span>
              <span className="text-white tracking-wider">{line.content}</span>
            </div>
          ) : (
            <div className="text-neutral-300">{line.content}</div>
          )}
        </div>
      ))}

      {/* Active Input Line */}
      <div className="flex items-center mt-5">
        <span className="text-[#f02020] mr-3 font-bold">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="flex-1 bg-transparent outline-none border-none text-white tracking-wider placeholder-neutral-800 focus:ring-0"
          autoFocus
          spellCheck="false"
          autoComplete="off"
          placeholder="ENTER COMMAND..."
        />
      </div>

      {/* Invisible anchor for scroll */}
      <div ref={endOfTerminalRef} className="pb-4" />
    </div>
  );
}