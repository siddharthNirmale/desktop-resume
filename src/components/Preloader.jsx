import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onLoadingComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const start = performance.now();
    const duration = 1250;
    let frame;

    const animate = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);

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
        }, 140);

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
            transition: {
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
          className="
            fixed inset-0 z-[9999] overflow-hidden
            bg-[var(--color-desktop)]
            text-[var(--color-text)]
            select-none
          "
        >
          {/* Main content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              absolute inset-0
              flex items-center justify-center
            "
          >
            <div className="text-center">
              {/* Identity */}
              <motion.div
                initial={{ opacity: 0, letterSpacing: "0.35em" }}
                animate={{ opacity: 1, letterSpacing: "0.2em" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="
                  mb-5
                  text-[11px]
                  uppercase
                  font-medium
                  text-[var(--color-text-tertiary)]
                "
              >
                Siddharth
              </motion.div>

              {/* Main title */}
              <div
                className="
                  overflow-hidden
                  text-6xl
                  font-bold
                  leading-none
                  tracking-[-0.065em]
                  md:text-8xl
                  lg:text-[10rem]
                "
              >
                <motion.div
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  Welcome
                </motion.div>
              </div>

              {/* Accent progress line */}
              <div
                className="
                  mx-auto mt-8
                  h-[2px] w-12
                  overflow-hidden
                  bg-[var(--color-surface-border)]
                "
              >
                <motion.div
                  className="h-full origin-left bg-[var(--color-accent)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.08, ease: "linear" }}
                />
              </div>

              {/* Status */}
              <div
                className="
                  mt-5
                  flex items-center justify-center gap-3
                  text-[11px]
                  uppercase
                  tracking-[0.16em]
                  text-[var(--color-text-tertiary)]
                "
              >
                <span>Loading</span>
                <span className="tabular-nums text-[var(--color-text)]">
                  {String(progress).padStart(3, "0")}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bottom metadata */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="
              absolute bottom-7 left-7 right-7
              flex items-end justify-between
              text-[11px]
              uppercase
              tracking-[0.14em]
              text-[var(--color-text-tertiary)]
            "
          >
            <span>Portfolio</span>
            <span>2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
