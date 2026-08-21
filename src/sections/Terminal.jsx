import { useState, useRef, useEffect, useMemo } from "react";
import {
  FiMapPin,
  FiExternalLink,
  FiTerminal,
  FiChevronRight,
  FiCpu,
  FiFolder,
  FiBriefcase,
  FiCalendar,
  FiUser,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiClock,
  FiCommand,
  FiTrash2,
  FiHelpCircle,
  FiZap,
} from "react-icons/fi";
import projects from "../data/project";
import skills from "../data/skills";

const COMMANDS = [
  { cmd: "help", label: "Show available commands", icon: FiHelpCircle },
  { cmd: "whoami", label: "About Siddharth", icon: FiUser },
  { cmd: "skills", label: "View technical skills", icon: FiCpu },
  { cmd: "projects", label: "Explore projects", icon: FiFolder },
  { cmd: "experience", label: "View experience", icon: FiBriefcase },
  { cmd: "location", label: "Current location", icon: FiMapPin },
  { cmd: "date", label: "Current date and time", icon: FiCalendar },
  { cmd: "contact", label: "Contact information", icon: FiMail },
  { cmd: "github", label: "Open GitHub", icon: FiGithub },
  { cmd: "linkedin", label: "Open LinkedIn", icon: FiLinkedin },
  { cmd: "resume", label: "Open resume", icon: FiExternalLink },
  { cmd: "clear", label: "Clear terminal", icon: FiTrash2 },
];

const ALIASES = {
  cls: "clear",
  ls: "help",
  commands: "help",
  about: "whoami",
  tech: "skills",
  work: "experience",
  pwd: "location",
};

export default function Terminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    {
      type: "output",
      content: (
        <div className="mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-[var(--color-accent)] text-white shadow-sm">
              <FiTerminal size={14} />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                  Terminal
                </h1>

                <span className="flex items-center gap-1 text-[9px] font-medium uppercase tracking-[0.1em] text-[var(--color-text-tertiary)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                  online
                </span>
              </div>

              <p className="mt-0.5 text-[10px] text-[var(--color-text-tertiary)]">
                Interactive portfolio shell
              </p>
            </div>
          </div>

          <div className="mt-4 max-w-xl">
            <p className="text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
              Explore the portfolio directly from the command line.
              Type{" "}
              <button
                type="button"
                onClick={() => setInput("help")}
                className="font-semibold text-[var(--color-accent)] transition-opacity hover:opacity-70"
              >
                help
              </button>{" "}
              to see what you can do.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-[var(--color-text-tertiary)]">
            <span className="flex items-center gap-1.5">
              <FiCommand size={10} />
              ↑ ↓ history
            </span>

            <span className="flex items-center gap-1.5">
              <FiZap size={10} />
              Tab autocomplete
            </span>

            <span className="flex items-center gap-1.5">
              <FiTerminal size={10} />
              Enter execute
            </span>
          </div>
        </div>
      ),
    },
  ]);

  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const endOfTerminalRef = useRef(null);

  const availableCommands = useMemo(
    () => COMMANDS.map((item) => item.cmd),
    []
  );

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [history]);

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const modifier = event.ctrlKey || event.metaKey;

      if (modifier && event.key.toLowerCase() === "l") {
        event.preventDefault();
        clearTerminal();
        return;
      }

      if (modifier && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  const clearTerminal = () => {
    setHistory([]);
    setInput("");
    setHistoryIndex(-1);

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const addHistory = (command, outputContent = null) => {
    setHistory((prev) => [
      ...prev,
      {
        type: "command",
        content: command,
      },
      ...(outputContent
        ? [
          {
            type: "output",
            content: outputContent,
          },
        ]
        : []),
    ]);
  };

  const getCommandOutput = (command, rawInput) => {
    switch (command) {
      case "help":
        return (
          <div className="my-3 max-w-2xl">
            <div className="mb-3 flex items-center gap-2">
              <FiTerminal
                size={11}
                className="text-[var(--color-accent)]"
              />

              <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-tertiary)]">
                Available commands
              </span>
            </div>

            <div className="grid grid-cols-1 gap-x-8 gap-y-1 sm:grid-cols-2">
              {COMMANDS.map(({ cmd, label, icon: Icon }) => (
                <button
                  key={cmd}
                  type="button"
                  onClick={() => {
                    setInput(cmd);
                    inputRef.current?.focus();
                  }}
                  className="group flex min-w-0 items-center justify-between rounded-md px-2 py-2 text-left transition-colors duration-150 hover:bg-[var(--color-surface-inactive)]"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <Icon
                      size={11}
                      className="shrink-0 text-[var(--color-accent)]"
                    />

                    <span className="truncate font-mono text-[11px] font-medium text-[var(--color-text)]">
                      {cmd}
                    </span>
                  </span>

                  <span className="ml-3 hidden truncate text-[10px] text-[var(--color-text-tertiary)] sm:block">
                    {label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 border-t border-[var(--color-surface-border)] pt-3">
              <span className="text-[10px] leading-relaxed text-[var(--color-text-tertiary)]">
                Tip: use{" "}
                <span className="font-medium text-[var(--color-text-secondary)]">
                  ↑
                </span>{" "}
                and{" "}
                <span className="font-medium text-[var(--color-text-secondary)]">
                  ↓
                </span>{" "}
                to navigate command history or press{" "}
                <span className="font-medium text-[var(--color-text-secondary)]">
                  Tab
                </span>{" "}
                for autocomplete.
              </span>
            </div>
          </div>
        );

      case "whoami":
        return (
          <div className="my-3">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-inactive)] text-[var(--color-accent)]">
                <FiUser size={14} />
              </div>

              <div>
                <div className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                  Siddharth Nirmale
                </div>

                <div className="mt-1 text-[11px] text-[var(--color-text-tertiary)]">
                  Full-Stack Software Developer
                </div>

                <div className="mt-3 max-w-md text-[11px] leading-[1.7] text-[var(--color-text-secondary)]">
                  Developer focused on building polished, interactive and
                  practical digital experiences.
                </div>
              </div>
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="my-3 flex max-w-2xl flex-col gap-5">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-[var(--color-accent)]" />

                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                    {skillGroup.category}
                  </span>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-1.5 pl-3">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-medium text-[var(--color-text-secondary)] transition-colors hover:text-[var(--color-accent)]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "projects":
        return (
          <div className="my-3 max-w-3xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                {projects.length} projects
              </span>

              <FiFolder
                size={11}
                className="text-[var(--color-accent)]"
              />
            </div>

            <div className="divide-y divide-[var(--color-surface-border)]">
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="group py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-baseline gap-2">
                        <h3 className="truncate text-[12px] font-semibold tracking-[-0.01em] text-[var(--color-text)]">
                          {proj.title}
                        </h3>

                        {(proj.badge || proj.type) && (
                          <span className="shrink-0 text-[9px] font-medium text-[var(--color-accent)]">
                            [{proj.badge || proj.type}]
                          </span>
                        )}

                        <span className="shrink-0 text-[9px] text-[var(--color-text-tertiary)]">
                          {proj.year}
                        </span>
                      </div>

                      <p className="mt-1.5 max-w-2xl text-[10px] leading-[1.65] text-[var(--color-text-secondary)]">
                        {proj.bullets?.[0]}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                        {proj.tech.split(" • ").map((tech) => (
                          <span
                            key={tech}
                            className="text-[9px] text-[var(--color-text-tertiary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {proj.live && (
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${proj.title}`}
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[var(--color-text-tertiary)] transition-all duration-200 hover:bg-[var(--color-accent)] hover:text-white"
                      >
                        <FiExternalLink size={11} />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "experience": {
        const jobs = [
          {
            role: "Data Science & Development Intern",
            company: "Personifwy",
            year: "Jan 2024 — May 2024",
          },
        ];

        return (
          <div className="my-3 max-w-xl">
            {jobs.map((job, idx) => (
              <div
                key={idx}
                className="group relative pl-5"
              >
                <div className="absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_8px_var(--color-accent)]" />

                <div className="text-[13px] font-semibold tracking-[-0.015em] text-[var(--color-text)]">
                  {job.role}
                </div>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] text-[var(--color-text-tertiary)]">
                  <span className="font-medium text-[var(--color-text-secondary)]">
                    {job.company}
                  </span>

                  <span className="opacity-50">·</span>

                  <span>{job.year}</span>
                </div>
              </div>
            ))}
          </div>
        );
      }

      case "location":
        return (
          <div className="my-3 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-inactive)] text-[var(--color-accent)]">
              <FiMapPin size={13} />
            </div>

            <div>
              <div className="text-[12px] font-semibold text-[var(--color-text)]">
                Indore, Madhya Pradesh, India
              </div>

              <div className="mt-0.5 text-[10px] text-[var(--color-text-tertiary)]">
                Current location
              </div>
            </div>
          </div>
        );

      case "date": {
        const now = new Date();

        return (
          <div className="my-3 flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-surface-inactive)] text-[var(--color-accent)]">
              <FiClock size={13} />
            </div>

            <div>
              <div className="text-[12px] font-medium text-[var(--color-text)]">
                {now.toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="mt-0.5 text-[10px] text-[var(--color-text-tertiary)]">
                {now.toLocaleTimeString()}
              </div>
            </div>
          </div>
        );
      }

      case "contact":
        return (
          <div className="my-3 flex flex-col gap-2 text-[11px]">
            <div className="flex items-center gap-2">
              <FiMail
                size={11}
                className="text-[var(--color-accent)]"
              />
              <span className="text-[var(--color-text-secondary)]">
                Available through the portfolio contact section.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <FiGithub
                size={11}
                className="text-[var(--color-accent)]"
              />
              <span className="text-[var(--color-text-secondary)]">
                GitHub profile available with{" "}
                <span className="text-[var(--color-text)]">
                  github
                </span>
                .
              </span>
            </div>
          </div>
        );

      case "github":
        window.open(
          "https://github.com/siddharthNirmale",
          "_blank",
          "noopener,noreferrer"
        );

        return (
          <span className="text-[11px] text-[var(--color-text-secondary)]">
            Opening GitHub…
          </span>
        );

      case "linkedin":
        window.open(
          "https://www.linkedin.com/",
          "_blank",
          "noopener,noreferrer"
        );

        return (
          <span className="text-[11px] text-[var(--color-text-secondary)]">
            Opening LinkedIn…
          </span>
        );

      case "resume":
        return (
          <div className="my-3 flex items-center gap-2 text-[11px] text-[var(--color-text-secondary)]">
            <FiExternalLink
              size={11}
              className="text-[var(--color-accent)]"
            />
            <span>
              Resume command is ready — connect it to your resume URL.
            </span>
          </div>
        );

      default:
        if (command.startsWith("echo ")) {
          return (
            <span className="text-[11px] leading-relaxed text-[var(--color-text-secondary)]">
              {rawInput.substring(5)}
            </span>
          );
        }

        if (command.length > 0) {
          return (
            <div className="my-2 flex flex-wrap items-center gap-2 text-[11px]">
              <span className="text-[var(--color-text-tertiary)]">
                command not found:
              </span>

              <span className="font-medium text-[var(--color-accent)]">
                {command}
              </span>

              <span className="text-[var(--color-text-tertiary)]">
                · type
              </span>

              <button
                type="button"
                onClick={() => {
                  setInput("help");
                  inputRef.current?.focus();
                }}
                className="font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
              >
                help
              </button>
            </div>
          );
        }

        return null;
    }
  };

  const executeCommand = (value = input) => {
    const rawCommand = value.trim();

    if (!rawCommand) return;

    const normalized = rawCommand.toLowerCase();
    const command =
      ALIASES[normalized] || normalized;

    if (command === "clear") {
      clearTerminal();
      return;
    }

    const output = getCommandOutput(command, rawCommand);

    setCommandHistory((prev) => {
      const next = [...prev, rawCommand];

      return next.slice(-50);
    });

    setHistoryIndex(-1);
    addHistory(rawCommand, output);
    setInput("");

    requestAnimationFrame(() => {
      inputRef.current?.focus();
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      executeCommand();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      if (!commandHistory.length) return;

      const nextIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || "");
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();

      if (historyIndex === -1) return;

      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(-1);
        setInput("");
        return;
      }

      const nextIndex = historyIndex + 1;

      setHistoryIndex(nextIndex);
      setInput(commandHistory[nextIndex] || "");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();

      const value = input.trim().toLowerCase();

      if (!value) return;

      const match = availableCommands.find((cmd) =>
        cmd.startsWith(value)
      );

      if (match) {
        setInput(match);
      }
    }

    if (event.key === "Escape") {
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const handleTerminalClick = (event) => {
    if (
      event.target.closest("button") ||
      event.target.closest("a") ||
      event.target.closest("input")
    ) {
      return;
    }

    focusTerminal();
  };

  return (
    <div
      ref={terminalRef}
      onClick={handleTerminalClick}
      className="
        flex h-full w-full flex-col
        overflow-hidden
        bg-[var(--color-surface-dark)]
        font-mono text-[12px]
        text-[var(--color-text)]
        selection:bg-[var(--color-accent)]
        selection:text-white
      "
    >
      {/* Top status bar */}
      <div
        className="
          flex h-8 shrink-0 items-center justify-between
          border-b border-[var(--color-surface-border)]
          px-3.5
          text-[9px]
          text-[var(--color-text-tertiary)]
        "
      >
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] shadow-[0_0_6px_var(--color-accent)]" />
          <span>portfolio-shell</span>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <span>zsh</span>
          <span className="opacity-40">•</span>
          <span>interactive</span>
        </div>
      </div>

      {/* Terminal output */}
      <div
        className="
          custom-scrollbar
          flex-1
          overflow-y-auto
          overscroll-contain
          px-4 py-5
          sm:px-5
        "
      >
        <div className="max-w-4xl">
          {history.map((line, index) => (
            <div
              key={index}
              className="animate-[terminalIn_180ms_ease-out]"
            >
              {line.type === "command" ? (
                <div className="mb-1.5 mt-4 flex min-w-0 items-center">
                  <FiChevronRight
                    size={14}
                    className="mr-1.5 shrink-0 text-[var(--color-accent)]"
                  />

                  <span className="mr-2 shrink-0 text-[10px] text-[var(--color-text-tertiary)]">
                    ~
                  </span>

                  <span className="min-w-0 truncate font-medium tracking-[-0.01em] text-[var(--color-text)]">
                    {line.content}
                  </span>
                </div>
              ) : (
                <div className="text-[var(--color-text-secondary)]">
                  {line.content}
                </div>
              )}
            </div>
          ))}

          {/* Input */}
          <div className="mt-4 flex min-w-0 items-center">
            <FiChevronRight
              size={14}
              className="mr-1.5 shrink-0 text-[var(--color-accent)]"
            />

            <span className="mr-2 shrink-0 text-[10px] text-[var(--color-text-tertiary)]">
              ~
            </span>

            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setHistoryIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              className="
                min-w-0 flex-1
                bg-transparent
                py-1
                outline-none
                text-[12px]
                tracking-[-0.01em]
                text-[var(--color-text)]
                placeholder:text-[var(--color-text-tertiary)]
                placeholder:opacity-60
              "
              autoFocus
              spellCheck="false"
              autoComplete="off"
              aria-label="Terminal command input"
              placeholder="Type a command…"
            />
          </div>

          <div
            ref={endOfTerminalRef}
            className="h-6"
          />
        </div>
      </div>

      {/* Bottom hint bar */}
      <div
        className="
          flex min-h-7 shrink-0 items-center
          border-t border-[var(--color-surface-border)]
          px-3.5
          text-[9px]
          text-[var(--color-text-tertiary)]
        "
      >
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden sm:inline">
            ↑ ↓ history
          </span>

          <span className="hidden sm:inline opacity-40">
            •
          </span>

          <span className="hidden sm:inline">
            Tab complete
          </span>

          <span className="truncate">
            Ctrl/Cmd + K to focus
          </span>
        </div>
      </div>

      <style>{`
        @keyframes terminalIn {
          from {
            opacity: 0;
            transform: translateY(3px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
