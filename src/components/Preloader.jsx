import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
              <span className="text-2xl leading-none select-none">😈</span>
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

