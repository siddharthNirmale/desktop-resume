import { useState, useRef, useEffect } from "react";

export default function Terminal() {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState([
    {
      type: "output",
      content: (
        <div className="
          mb-6 pb-4
          
          border-b border-[var(--color-surface-border)]
          flex justify-between items-end
        ">
          <div>
            <h1 className="text-4xl text-white font-bold tracking-[0.2em]">
              SYS<span className="text-[var(--color-accent)]">.</span>TERM
            </h1>

            <p className="
              text-xs
              text-white/40
              tracking-[var(--tracking-super-wide)]
              uppercase mt-2
            ">
              v1.1.0 // Type 'help' to initialize
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
            Online
          </div>
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
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm max-w-lg my-2">
            {[
              "help",
              "clear",
              "whoami",
              "skills",
              "projects",
              "experience",
              "socials",
              "location",
              "date",
            ].map((cmd) => (
              <div key={cmd} className="flex items-center gap-2">
                <span className="text-[var(--color-accent)] text-xs">■</span>
                <span className="text-white tracking-wider">{cmd}</span>
              </div>
            ))}

            <div className="col-span-2 flex items-center gap-2 mt-2 pt-2 border-t border-[var(--color-surface-border)]">
              <span className="text-[var(--color-accent)] text-xs">■</span>
              <span className="text-white/40 tracking-wider">
                echo [text]
              </span>
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
          <div className="
            border-l-2 border-[var(--color-accent)]
            pl-4 py-1 my-3
            bg-[var(--color-surface-dark)]
            p-2 rounded-r-lg inline-block
          ">
            <div className="text-white font-bold tracking-widest uppercase text-lg">
              Siddharth Nirmale
            </div>
            <div className="text-white/40 text-xs tracking-wider uppercase mt-1">
              Full-Stack Developer
            </div>
          </div>
        );
        break;

      case "skills":
        const skills = [
          "MERN Stack",
          "ReactJS",
          "Node.js",
          "GCP",
          "Render",
          "Gemini API",
        ];

        outputContent = (
          <div className="flex flex-wrap gap-2 my-3 max-w-lg">
            {skills.map((skill) => (
              <span
                key={skill}
                className="
                  px-3 py-1.5
                  bg-[var(--color-surface)]
                  border border-[var(--color-surface-border)]
                  text-[10px]
                  font-bold uppercase tracking-widest
                  text-white/60
                "
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
            name: "Web OS Terminal",
            desc: "Minimalist command-line interface built with React.",
            tech: ["React", "Tailwind"],
          },
          {
            name: "Cloud Sync App",
            desc: "Real-time data synchronization tool.",
            tech: ["Node.js", "GCP"],
          },
        ];

        outputContent = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3 max-w-2xl">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="
                  border border-[var(--color-surface-border)]
                  p-4
                  bg-[var(--color-surface-dark)]
                  hover:border-[var(--color-accent)]
                  transition-colors
                "
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-bold tracking-wider uppercase text-sm">
                    {proj.name}
                  </h3>
                  <span className="text-[var(--color-accent)] text-lg leading-none">
                    ↗
                  </span>
                </div>

                <p className="text-white/40 text-xs mb-4 leading-relaxed">
                  {proj.desc}
                </p>

                <div className="flex gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="
                        text-[9px]
                        px-2 py-0.5
                        border border-[var(--color-surface-border)]
                        text-white/40
                        uppercase tracking-widest
                      "
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
            company: "Tech Corp",
            year: "2023 - Present",
          },
          {
            role: "Frontend Intern",
            company: "Startup Inc",
            year: "2022 - 2023",
          },
        ];

        outputContent = (
          <div className="
            flex flex-col gap-4 my-3
            border-l border-[var(--color-surface-border)]
            ml-2 pl-4
          ">
            {jobs.map((job, idx) => (
              <div key={idx} className="relative">
                <div className="
                  absolute -left-[21px] top-1.5
                  w-2.5 h-2.5
                  bg-[var(--color-accent)]
                  rounded-full
                  border-2 border-[var(--color-surface)]
                " />

                <div className="text-white text-sm font-bold tracking-wider uppercase">
                  {job.role}
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-white/40 text-xs uppercase tracking-widest">
                    {job.company}
                  </span>

                  <span className="text-white/20 text-xs">•</span>

                  <span className="text-white/30 text-[10px] tracking-widest">
                    {job.year}
                  </span>
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "location":
        outputContent = (
          <div className="
            flex items-center gap-3 my-3
            bg-[var(--color-surface-dark)]
            px-4 py-3
            border border-[var(--color-surface-border)]
            w-fit
          ">
            <div className="
              w-8 h-8 rounded-full
              bg-[var(--color-accent)]
              flex items-center justify-center
            ">
              <span className="text-white text-xs">📍</span>
            </div>

            <div>
              <div className="text-white text-sm tracking-wider uppercase font-bold">
                Indore
              </div>
              <div className="text-white/40 text-[10px] tracking-widest uppercase">
                Madhya Pradesh, IN
              </div>
            </div>
          </div>
        );
        break;

      case "date":
        const now = new Date();

        outputContent = (
          <div className="flex gap-4 my-3 items-center">
            <div className="text-4xl text-white font-bold tracking-tighter">
              {now.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </div>

            <div className="
              border-l border-[var(--color-surface-border)]
              pl-4
            ">
              <div className="
                text-[var(--color-accent)]
                text-xs font-bold tracking-widest uppercase
              ">
                {now.toLocaleDateString("en-US", { weekday: "long" })}
              </div>

              <div className="
                text-white/40
                text-xs tracking-widest uppercase mt-0.5
              ">
                {now.toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
              </div>
            </div>
          </div>
        );
        break;

      default:
        if (command.startsWith("echo ")) {
          outputContent = (
            <span className="text-white">
              {command.substring(5)}
            </span>
          );
        } else {
          outputContent = (
            <span className="text-white/40">
              Command not found:{" "}
              <span className="text-[var(--color-accent)] font-bold">
                {command}
              </span>
              . Type 'help'.
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
    <div className="
      h-full flex flex-col
      p-6
      bg-[var(--color-surface)]
      text-white
      font-[var(--font-primary)]
      text-sm overflow-auto custom-scrollbar
    ">
      {history.map((line, index) => (
        <div key={index} className="mb-2 leading-relaxed">
          {line.type === "command" ? (
            <div className="flex items-center text-white/40 mt-5 mb-2">
              <span className="text-[var(--color-accent)] mr-3 font-bold">
                ❯
              </span>
              <span className="text-white tracking-wider">
                {line.content}
              </span>
            </div>
          ) : (
            <div className="text-white/70">{line.content}</div>
          )}
        </div>
      ))}

      {/* INPUT */}
      <div className="flex items-center mt-5">
        <span className="text-[var(--color-accent)] mr-3 font-bold">
          ❯
        </span>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          className="
            flex-1 bg-transparent outline-none
            text-white tracking-wider
            placeholder:text-white/10
          "
          autoFocus
          spellCheck="false"
          autoComplete="off"
          placeholder="ENTER COMMAND..."
        />
      </div>

      <div ref={endOfTerminalRef} className="pb-4" />
    </div>
  );
}