import { useState, useRef, useEffect } from "react";
import {
  FiMapPin,
  FiExternalLink,
  FiTerminal,
  FiChevronRight,
  FiCpu,
  FiFolder,
  FiBriefcase,
  FiCalendar,
} from "react-icons/fi";
import projects from "../data/project";
import skills from "../data/skills";

export default function Terminal() {
  const [input, setInput] = useState("");

  const [history, setHistory] = useState([
    {
      type: "output",
      content: (
        <div className="mb-5 border-b border-[var(--color-surface-border)] pb-4">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)]">
              <FiTerminal
                size={14}
                className="text-[var(--color-accent)]"
              />
            </div>

            <div>
              <h1 className="text-[14px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
                Terminal
              </h1>

              <p className="text-[11px] text-[var(--color-text-tertiary)]">
                Interactive portfolio shell
              </p>
            </div>
          </div>

          <p className="mt-3 text-[12px] leading-relaxed text-[var(--color-text-secondary)]">
            Type{" "}
            <span className="font-semibold text-[var(--color-accent)]">
              help
            </span>{" "}
            to explore available commands.
          </p>
        </div>
      ),
    },
  ]);

  const endOfTerminalRef = useRef(null);

  useEffect(() => {
    endOfTerminalRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key !== "Enter") return;

    const command = input.trim().toLowerCase();
    let outputContent = null;

    switch (command) {
      case "help":
        outputContent = (
          <div className="my-2 max-w-xl">
            <div className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
              Available commands
            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-1.5 sm:grid-cols-3">
              {[
                { cmd: "help", icon: <FiTerminal size={11} /> },
                { cmd: "clear", icon: <FiTerminal size={11} /> },
                { cmd: "whoami", icon: <FiTerminal size={11} /> },
                { cmd: "skills", icon: <FiCpu size={11} /> },
                { cmd: "projects", icon: <FiFolder size={11} /> },
                { cmd: "experience", icon: <FiBriefcase size={11} /> },
                { cmd: "location", icon: <FiMapPin size={11} /> },
                { cmd: "date", icon: <FiCalendar size={11} /> },
              ].map(({ cmd, icon }) => (
                <div
                  key={cmd}
                  className="
                    group flex items-center gap-2
                    rounded-md px-2 py-1.5
                    transition-colors duration-150
                    hover:bg-[var(--color-surface-inactive)]
                  "
                >
                  <span className="text-[var(--color-accent)] opacity-80">
                    {icon}
                  </span>

                  <span className="text-[12px] font-medium text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]">
                    {cmd}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-3 flex items-center gap-2 border-t border-[var(--color-surface-border)] pt-3 text-[11px] text-[var(--color-text-tertiary)]">
              <span className="text-[var(--color-accent)]">
                <FiTerminal size={11} />
              </span>

              <span>
                echo{" "}
                <span className="text-[var(--color-text-secondary)]">
                  [text]
                </span>
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
          <div className="my-2">
            <div className="text-[15px] font-semibold tracking-[-0.02em] text-[var(--color-text)]">
              Siddharth Nirmale
            </div>

            <div className="mt-1 text-[12px] text-[var(--color-text-tertiary)]">
              Full-Stack Software Developer
            </div>
          </div>
        );
        break;

      case "skills":
        outputContent = (
          <div className="my-3 flex max-w-2xl flex-col gap-4">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category}>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-tertiary)]">
                  {skillGroup.category}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="
                        rounded-md
                        border border-[var(--color-surface-border)]
                        bg-[var(--color-surface-inactive)]
                        px-2 py-1
                        text-[11px]
                        font-medium
                        text-[var(--color-text-secondary)]
                      "
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
        break;

      case "projects":
        outputContent = (
          <div className="my-3 grid max-w-3xl grid-cols-1 gap-3 sm:grid-cols-2">
            {projects.map((proj, idx) => (
              <div
                key={idx}
                className="
                  group rounded-[11px]
                  border border-[var(--color-surface-border)]
                  bg-[var(--color-surface-inactive)]
                  p-3.5
                  transition-colors duration-150
                  hover:bg-[var(--color-surface)]
                "
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="truncate text-[13px] font-semibold tracking-[-0.015em] text-[var(--color-text)]">
                      {proj.title}
                    </h3>

                    <span className="mt-0.5 block text-[10px] text-[var(--color-text-tertiary)]">
                      {proj.year}
                    </span>
                  </div>

                  {proj.live && (
                    <a
                      href={proj.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${proj.title}`}
                      className="
                        flex h-7 w-7 shrink-0 items-center justify-center
                        rounded-full
                        border border-[var(--color-surface-border)]
                        text-[var(--color-text-tertiary)]
                        transition-all duration-150
                        hover:border-[var(--color-accent)]
                        hover:bg-[var(--color-accent)]
                        hover:text-white
                      "
                    >
                      <FiExternalLink size={12} />
                    </a>
                  )}
                </div>

                <p className="mt-3 text-[11px] leading-[1.6] text-[var(--color-text-secondary)]">
                  {proj.bullets[0]}
                </p>

                <div className="mt-3 flex flex-wrap gap-1">
                  {proj.tech.split(" • ").map((t) => (
                    <span
                      key={t}
                      className="
                        rounded-md
                        bg-[var(--color-surface-border)]
                        px-1.5 py-0.5
                        text-[9px]
                        font-medium
                        text-[var(--color-text-tertiary)]
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

      case "experience": {
        const jobs = [
          {
            role: "Data Science & Development Intern",
            company: "Personifwy",
            year: "Jan 2024 — May 2024",
          },
        ];

        outputContent = (
          <div className="my-3 ml-1 flex max-w-xl flex-col gap-5 border-l border-[var(--color-surface-border)] pl-5">
            {jobs.map((job, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -left-[25px] top-1.5 flex h-2 w-2 items-center justify-center rounded-full bg-[var(--color-accent)] shadow-[0_0_7px_var(--color-accent)]" />

                <div className="flex items-center gap-2">
                  <FiBriefcase
                    size={12}
                    className="text-[var(--color-accent)]"
                  />

                  <span className="text-[14px] font-semibold tracking-[-0.015em] text-[var(--color-text)]">
                    {job.role}
                  </span>
                </div>

                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-[var(--color-text-tertiary)]">
                  <span className="font-medium text-[var(--color-text-secondary)]">
                    {job.company}
                  </span>

                  <span>·</span>

                  <span>{job.year}</span>
                </div>
              </div>
            ))}
          </div>
        );
        break;
      }

      case "location":
        outputContent = (
          <div className="my-2 flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-[var(--color-surface-border)] bg-[var(--color-surface-inactive)]">
              <FiMapPin
                size={14}
                className="text-[var(--color-accent)]"
              />
            </div>

            <div>
              <div className="text-[13px] font-semibold text-[var(--color-text)]">
                Indore, Madhya Pradesh, India
              </div>

              <div className="mt-0.5 text-[10px] text-[var(--color-text-tertiary)]">
                Current location
              </div>
            </div>
          </div>
        );
        break;

      case "date": {
        const now = new Date();

        outputContent = (
          <div className="my-2 flex items-center gap-3">
            <FiCalendar
              size={14}
              className="text-[var(--color-accent)]"
            />

            <span className="text-[12px] text-[var(--color-text-secondary)]">
              {now.toString()}
            </span>
          </div>
        );
        break;
      }

      default:
        if (command.startsWith("echo ")) {
          outputContent = (
            <span className="text-[var(--color-text-secondary)]">
              {input.substring(5)}
            </span>
          );
        } else if (command.length > 0) {
          outputContent = (
            <span className="text-[12px] text-[var(--color-text-tertiary)]">
              zsh: command not found:{" "}
              <span className="font-medium text-[var(--color-accent)]">
                {command}
              </span>
            </span>
          );
        }
    }

    setHistory((prev) => [
      ...prev,
      {
        type: "command",
        content: input,
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

    setInput("");
  };

  return (
    <div
      className="
        flex h-full w-full flex-col
        overflow-hidden
        bg-[var(--color-surface-dark)]
        text-[var(--color-text)]
        font-mono text-[12px]
        selection:bg-[var(--color-accent)]
        selection:text-white
      "
    >
      {/* =====================================================
          TERMINAL OUTPUT
      ====================================================== */}

      <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 sm:px-5">
        <div className="max-w-4xl">
          {history.map((line, index) => (
            <div
              key={index}
              className="leading-relaxed"
            >
              {line.type === "command" ? (
                <div className="mt-4 mb-1.5 flex items-center">
                  <FiChevronRight
                    size={15}
                    className="mr-1 shrink-0 text-[var(--color-accent)]"
                  />

                  <span className="font-medium tracking-[-0.01em] text-[var(--color-text)]">
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

          {/* =================================================
              INPUT
          ================================================== */}

          <div className="mt-4 flex items-center">
            <FiChevronRight
              size={15}
              className="mr-1 shrink-0 text-[var(--color-accent)]"
            />

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleCommand}
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
              placeholder="Type 'help'..."
            />
          </div>

          <div
            ref={endOfTerminalRef}
            className="h-4"
          />
        </div>
      </div>
    </div>
  );
}
