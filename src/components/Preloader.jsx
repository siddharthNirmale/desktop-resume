import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Authentic Apple Logo SVG
function AppleLogo({ className = "w-7 h-7 fill-current" }) {
  return (
    <svg
      viewBox="0 0 170 170"
      className={className}
      aria-hidden="true"
    >
      <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.69-3.08-7.6-7.85-11.74-14.31-6.09-9.43-10.9-19.86-14.42-31.28-3.52-11.42-5.28-22.18-5.28-32.28 0-14.28 3.63-26.06 10.89-35.34 7.26-9.28 16.38-14.07 27.35-14.37 4.91 0 10.22 1.34 15.93 4.02 5.71 2.68 9.38 4.07 11.01 4.17 1.42 0 5.25-1.44 11.49-4.32 6.24-2.88 11.96-4.22 17.16-4.02 12.63.63 22.84 5.37 30.63 14.23-11.01 6.69-16.36 15.98-16.06 27.87.3 9.4 3.96 17.29 10.98 23.67 7.02 6.38 15.34 10.05 24.96 11.01-2.12 6.43-4.57 12.66-7.35 18.69zM119.22 31.84c0-7.39 2.7-14.15 8.11-20.28 5.41-6.13 12.08-9.98 20.02-11.56.22 1.3.33 2.45.33 3.44 0 7.39-2.73 14.33-8.19 20.81-5.46 6.49-12.33 10.37-20.61 11.66.11-1.38.34-2.74.34-4.07z" />
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

      // Apple smooth cubic ease-out
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
              <AppleLogo className="w-6 h-6 fill-[var(--color-text)] opacity-90" />
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

            {/* Apple-style Progress Bar */}
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

