import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMail,
  FiDownload,
  FiArrowUpRight,
  FiCheck,
  FiMapPin,
} from "react-icons/fi";
import resume from "../data/resume";

const springTransition = {
  type: "spring",
  stiffness: 350,
  damping: 28,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.02,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: springTransition,
  },
};

export default function AboutSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("siddharth175nirmale1@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  }, []);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.href = resume;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar bg-[var(--color-surface)] text-[var(--color-text)] font-primary selection:bg-[var(--color-accent)] selection:text-white">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-3xl mx-auto px-6 py-6 sm:px-10 sm:py-8 md:px-12 md:py-10 min-h-full flex flex-col justify-between gap-9 sm:gap-11"
      >
        {/* =====================================================
            TOP / MAIN CONTENT AREA
        ====================================================== */}
        <div className="space-y-9 sm:space-y-11">
          {/* Hero Lead */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-[clamp(2.25rem,6vw,3.5rem)] leading-[0.98] font-heading font-bold tracking-[-0.04em] text-[var(--color-text)]">
              Siddharth Nirmale
            </h1>

            <p className="text-[clamp(1.1rem,2.2vw,1.35rem)] leading-snug font-heading font-medium tracking-[-0.02em] text-[var(--color-text-secondary)] max-w-2xl">
              Full-stack engineer crafting fluid web applications, reactive interfaces, and intelligent systems.
            </p>

            <p className="text-[13.5px] leading-relaxed text-[var(--color-text-tertiary)] max-w-xl">
              Specializing in React 19 ecosystems, tactile micro-interactions, scalable Node.js architecture, and applied AI workflows.
            </p>
          </motion.div>

          {/* Airy 3-Column Detail Grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-1"
          >
            {/* Stack */}
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-tertiary)] font-mono">
                Core Stack
              </div>
              <p className="text-[12.5px] leading-relaxed text-[var(--color-text-secondary)]">
                React 19, Next.js, TypeScript, Node.js, Tailwind CSS, Framer Motion, MongoDB.
              </p>
            </div>

            {/* Background */}
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-tertiary)] font-mono">
                Background
              </div>
              <div className="text-[12.5px] leading-relaxed text-[var(--color-text-secondary)] space-y-1">
                <div className="group cursor-default">
                  <span className="text-[var(--color-text)] font-medium transition-colors group-hover:text-[var(--color-accent)]">
                    Personifwy
                  </span>
                  <span className="text-[var(--color-text-tertiary)] text-[11px]"> · ML & Dev Intern</span>
                </div>
                <div className="group cursor-default">
                  <span className="text-[var(--color-text)] font-medium transition-colors group-hover:text-[var(--color-accent)]">
                    MITS Gwalior
                  </span>
                  <span className="text-[var(--color-text-tertiary)] text-[11px]"> · 8.49 CGPA</span>
                </div>
              </div>
            </div>

            {/* Selected Work */}
            <div className="space-y-2">
              <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-tertiary)] font-mono">
                Selected Craft
              </div>
              <div className="text-[12.5px] leading-relaxed space-y-1">
                <div>
                  <a
                    href="https://lekha-lilac.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-150">Lekha</span>
                    <FiArrowUpRight
                      size={11}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://refundpilot-preview.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-150">AI Refund Agent</span>
                    <FiArrowUpRight
                      size={11}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                    />
                  </a>
                </div>
                <div>
                  <a
                    href="https://thumbmax-psi.vercel.app/"
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-1 text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-150"
                  >
                    <span className="group-hover:translate-x-0.5 transition-transform duration-150">Thumbmax</span>
                    <FiArrowUpRight
                      size={11}
                      className="opacity-40 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150"
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* =====================================================
            BOTTOM OPTIONS (ALIGNED TO END OF CONTAINER)
        ====================================================== */}
        <motion.div
          variants={itemVariants}
          className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-auto"
        >
          {/* Action Buttons & Links */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={handleDownloadResume}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] bg-[var(--color-text)] text-[var(--color-surface)] text-[11.5px] font-semibold transition-all duration-150 hover:opacity-90 active:scale-[0.98] cursor-pointer"
            >
              <FiDownload
                size={12}
                strokeWidth={2.2}
                className="transition-transform duration-150 group-hover:-translate-y-0.5"
              />
              <span>Resume</span>
            </button>

            <button
              type="button"
              onClick={handleCopyEmail}
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[7px] bg-[var(--color-surface-hover)]/40 hover:bg-[var(--color-surface-hover)] text-[11.5px] font-medium text-[var(--color-text)] transition-colors duration-150 active:scale-[0.98] cursor-pointer"
            >
              <AnimatePresence mode="wait" initial={false}>
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="inline-flex items-center gap-1 text-emerald-400 font-medium"
                  >
                    <FiCheck size={12} strokeWidth={2.5} />
                    <span>Copied</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="email"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    className="inline-flex items-center gap-1.5"
                  >
                    <FiMail
                      size={12}
                      className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text)] transition-colors duration-150"
                    />
                    <span>Email</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <div className="flex items-center gap-3 ml-1 text-[11.5px] font-medium text-[var(--color-text-tertiary)]">
              <a
                href="https://github.com/siddharthNirmale"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-text)] transition-colors duration-150"
              >
                GitHub
              </a>

              <span className="opacity-20">/</span>

              <a
                href="https://linkedin.com/in/siddharth-nirmale"
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--color-text)] transition-colors duration-150"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Contextual Meta: Natural & Non-competing */}
          <div className="flex items-center gap-2 text-[11px] text-[var(--color-text-tertiary)] font-medium">
            <span className="inline-flex items-center gap-1">
              <FiMapPin size={11} className="opacity-60" />
              Indore, India
            </span>
            <span className="opacity-30">·</span>
            <span className="text-[var(--color-text-secondary)]">Available for opportunities</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
