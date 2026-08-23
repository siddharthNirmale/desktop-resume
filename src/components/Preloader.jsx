import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Personal Monogram Mark SVG
function MonogramMark({ className = "w-6 h-6" }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" fillOpacity="0.12" />
      <path
        d="M9 11.5C9 10.12 10.12 9 11.5 9H14.5C15.88 9 17 10.12 17 11.5V12C17 13.38 15.88 14.5 14.5 14.5H11.5C10.12 14.5 9 15.62 9 17V20.5C9 21.88 10.12 23 11.5 23H14.5C15.88 23 17 21.88 17 20.5"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M20 23V9L26 23V9"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Preloader({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const start = performance.now();
    const duration = 1100;
    let frame;

    const animate = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);

      // Smooth cubic ease-out
      const eased =
        raw < 0.5
          ? 4 * raw * raw * raw
          : 1 - Math.pow(-2 * raw + 2, 3) / 2;

      setProgress(Math.round(eased * 100));

      if (raw < 1) {
        frame = requestAnimationFrame(animate);
      } else {
        const t1 = setTimeout(() => {
          setIsVisible(false);
        }, 120);

        timeoutsRef.current = [t1];
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence onExitComplete={() => onLoadingComplete?.()}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: "blur(6px)",
            transition: {
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="
            fixed inset-0 z-[99999] overflow-hidden
            bg-[var(--color-desktop)]
            flex items-center justify-center
            text-[var(--color-text)]
            select-none font-primary
          "
        >
          {/* Main Card Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center text-center px-6"
          >
            {/* System Glyph Icon */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="
                flex h-14 w-14 items-center justify-center rounded-[18px]
                bg-white/[0.06] border border-white/[0.08] shadow-sm mb-5
                text-[var(--color-text)]
              "
            >
              <MonogramMark className="w-7 h-7 text-[var(--color-text)] opacity-95" />
            </motion.div>


            {/* Title & Identity */}
            <div className="space-y-1">
              <h1 className="text-[17px] font-heading font-semibold tracking-[-0.015em] text-[var(--color-text)]">
                Siddharth Nirmale
              </h1>
              <p className="text-[11px] font-mono text-[var(--color-text-tertiary)]">
                Personal Workspace · Desktop OS
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-[180px] sm:w-[200px] h-[3px] rounded-full bg-white/[0.08] overflow-hidden mt-6 relative">
              <motion.div
                className="h-full bg-[var(--color-accent)] rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>

            {/* Status Message */}
            <div className="mt-3 text-[11px] font-medium text-[var(--color-text-tertiary)] tracking-tight">
              {progress < 45
                ? "Loading workspace..."
                : progress < 90
                ? "Initializing interface..."
                : "Ready"}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

