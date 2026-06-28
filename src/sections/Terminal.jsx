import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState([
    {
      type: "output",
      content: (
        <div className="mb-6 pb-4 border-b border-white/5 flex flex-col gap-1">
          <h1 className="text-lg font-semibold text-white/95 tracking-tight">
            Terminal — zsh
          </h1>
          <p className="text-[12px] text-white/40">
            Type <span className="text-accent font-medium">help</span> to list the available configuration nodes.
          </p>
        </div>
      ),
    },
  ]);

  const endOfTerminalRef = useRef(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;

    const command = input.trim().toLowerCase();
    let outputContent = null;

    switch (command) {
      case "help":
        outputContent = (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 text-[13px] max-w-xl my-2 font-mono">
            {[
              "help",
              "clear",
              "whoami",
              "skills",
              "projects",
              "experience",
              "location",
              "date",
            ].map((cmd) => (
              <div key={cmd} className="flex items-center gap-2">
                <span className="text-accent/60 text-[10px]">❯</span>
                <span className="text-white/80 font-medium">{cmd}</span>
              </div>
            ))}
            <div className="col-span-full flex items-center gap-2 mt-2 pt-2 border-t border-white/5 text-white/40">
              <span className="text-accent/60 text-[10px]">❯</span>
              <span>echo [text]</span>
            </div>
          </div>
        );
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "whoami":
        outputContent = (
          <div className="my-2 space-y-0.5">
            <div className="text-white/95 font-semibold text-[14px]">
              Siddharth Nirmale
            </div>
            <div className="text-white/50 text-[12px]">
              Full-Stack Software Developer
            </div>
          </div>
        );
        break;

      case "skills":
        const skills = [
          "MERN Stack",
          "ReactJS",
          "Node.js",
          "MongoDB Atlas",
          "Google Cloud Platform",
          "Render",
          "Gemini API",
        ];

        outputContent = (
          <div className="flex flex-wrap gap-1.5 my-2 max-w-xl">
            {skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded bg-white/[0.03] border border-white/5 text-[12px] text-white/70 font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        );
        break;

      case "projects":
        const projects = [
          {
            name: "Thumbmax",
            desc: "AI-powered thumbnail generation platform built with Node.js and Gemini API.",
            tech: ["Node.js", "Gemini API"],
          },
          {
            name: "Postify",
            desc: "Full-stack social media application with custom REST API structures.",
            tech: ["React", "Node.js", "MongoDB"],
          },
        ];

        outputContent = (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-3 max-w-2xl">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="border border-white/5 rounded-xl p-4 bg-[#202022]/40 space-y-2 shadow-sm"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-white/90 font-semibold text-[14px]">
                    {proj.name}
                  </h3>
                  <span className="text-white/30 text-[12px]">↗</span>
                </div>
                <p className="text-white/50 text-[13px] leading-relaxed">
                  {proj.desc}
                </p>
                <div className="flex gap-1.5 pt-1">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2 py-0.5 rounded bg-white/[0.02] border border-white/5 text-white/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "experience":
        const jobs = [
          {
            role: "Full-Stack Developer",
            company: "MERN Architecture Engine",
            year: "2024 — Present",
          },
        ];

        outputContent = (
          <div className="flex flex-col gap-4 my-3 border-l border-white/5 ml-2 pl-4">
            {jobs.map((job, idx) => (
              <div key={idx} className="relative space-y-0.5">
                <div className="absolute -left-[21px] top-[6px] w-2 h-2 bg-accent rounded-full border border-surface shadow-[0_0_6px_var(--color-accent)]" />
                <div className="text-white/90 text-[14px] font-semibold">
                  {job.role}
                </div>
                <div className="flex items-center gap-2 text-[12px] text-white/40">
                  <span>{job.company}</span>
                  <span>•</span>
                  <span>{job.year}</span>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "location":
        outputContent = (
          <div className="flex items-center gap-3 my-2 text-[13px] text-white/70">
            <span>📍</span>
            <span className="font-medium text-white/90">Indore, Madhya Pradesh, India</span>
          </div>
        );
        break;

      case "date":
        const now = new Date();
        outputContent = (
          <div className="text-[13px] text-white/70 font-mono my-2">
            {now.toString()}
          </div>
        );
        break;

      default:
        if (command.startsWith("echo ")) {
          outputContent = (
            <span className="text-white/80 font-mono">
              {input.substring(5)}
            </span>
          );
        } else {
          outputContent = (
            <span className="text-white/40 text-[13px]">
              zsh: command not found: <span className="text-accent font-medium">{command}</span>
            </span>
          );
        }
    }

    setHistory((prev) => [
      ...prev,
      { type: "command", content: input },
      ...(outputContent ? [{ type: "output", content: outputContent }] : []),
    ]);

    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col p-6 bg-[#161616]/95 text-white/90 font-mono text-[13px] overflow-y-auto custom-scrollbar">
      {/* Scrollable Command Output Logs */}
      <div className="flex-1">
        {history.map((line, index) => (
          <div key={index} className="mb-2 leading-relaxed">
            {line.type === "command" ? (
              <div className="flex items-center text-white/90 mt-4 mb-2">
                <span className="text-accent mr-2.5 font-bold select-none">❯</span>
                <span className="font-medium tracking-wide">{line.content}</span>
              </div>
            ) : (
              <div className="text-white/80 font-mono">{line.content}</div>
            )}
          </div>
        ))}

        {/* Real-time Interactive Input Line */}
        <div className="flex items-center mt-4">
          <span className="text-accent mr-2.5 font-bold select-none">❯</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleCommand}
            className="flex-1 bg-transparent outline-none text-white font-mono tracking-wide placeholder:text-white/5"
            autoFocus
            spellCheck="false"
            autoComplete="off"
            placeholder="Type 'help'..."
          />
        </div>
      </div>

      <div ref={endOfTerminalRef} className="pb-2" />
    </div>
  );
}