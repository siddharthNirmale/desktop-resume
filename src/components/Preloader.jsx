import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const STAGES = [
  { progress: 0, label: "" },
  { progress: 20, label: "Loading" },
  { progress: 42, label: "Loading" },
  { progress: 65, label: "Loading" },
  { progress: 84, label: "Loading" },
  { progress: 100, label: "Ready" },
];

export default function SiddharthPreloader({ onLoadingComplete }) {
  const [stageIdx, setStageIdx] = useState(0);
  const [finished, setFinished] = useState(false);
  const [reveal, setReveal] = useState(false);

  const stage = STAGES[stageIdx];

  // Lenis
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
    });

    let raf;

    const update = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(update);
    };

    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  // Loading sequence
  useEffect(() => {
    if (stageIdx === STAGES.length - 1) {
      const timer = setTimeout(() => {
        setReveal(true);
      }, 350);

      return () => clearTimeout(timer);
    }

    const delay = stageIdx === 0 ? 220 : 170;

    const timer = setTimeout(() => {
      setStageIdx((current) => current + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [stageIdx]);

  return (
    <AnimatePresence>
      {!finished && (
        <motion.div
          className="
            fixed
            inset-0
            z-[9999]
            overflow-hidden
            bg-[#0a0a0a]
            text-[#f5f5f5]
            select-none
          "
          initial={{ opacity: 1 }}
        >
          {/* -----------------------------------------
              MAIN CONTENT
          ----------------------------------------- */}

          <motion.div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
            "
            animate={{
              opacity: reveal ? 0 : 1,
            }}
            transition={{
              duration: 0.15,
            }}
          >
            <div className="flex w-full flex-col items-center">

              {/* NAME */}
              <div className="overflow-hidden">
                <motion.h1
                  initial={{
                    y: "100%",
                  }}
                  animate={{
                    y: 0,
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                  className="
                    font-['SF_Pro_Display',-apple-system,BlinkMacSystemFont,'Helvetica_Neue',sans-serif]
                    text-[clamp(52px,10vw,100px)]
                    font-bold
                    leading-[0.9]
                    tracking-[-0.06em]
                  "
                >
                  Siddharth
                </motion.h1>
              </div>

              {/* STATUS */}
              <div className="mt-8 h-[16px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={stage.label}
                    initial={{
                      y: 16,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    exit={{
                      y: -16,
                      opacity: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                    }}
                    className="
                      block
                      text-[11px]
                      font-bold
                      uppercase
                      tracking-[0.18em]
                      text-[#666]
                    "
                  >
                    {stage.label}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* PROGRESS */}
              <div
                className="
                  mt-6
                  h-[3px]
                  w-[220px]
                  overflow-hidden
                  bg-[#222]
                "
              >
                <motion.div
                  className="h-full bg-[#f5f5f5]"
                  animate={{
                    width: `${stage.progress}%`,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.76, 0, 0.24, 1],
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* -----------------------------------------
              CENTER HOLE REVEAL
          ----------------------------------------- */}

          <motion.div
            className="
              pointer-events-none
              absolute
              left-1/2
              top-1/2
              aspect-square
              w-[20px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-[#f5f5f5]
            "
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={
              reveal
                ? {
                  scale: 150,
                  opacity: 1,
                }
                : {
                  scale: 0,
                  opacity: 0,
                }
            }
            transition={{
              scale: {
                duration: 0.85,
                ease: [0.76, 0, 0.24, 1],
              },
              opacity: {
                duration: 0.05,
              },
            }}
            onAnimationComplete={() => {
              if (reveal) {
                setFinished(true);
                onLoadingComplete?.();
              }
            }}
          />

          {/* -----------------------------------------
              REVEAL MASK
          ----------------------------------------- */}

          <motion.div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#f5f5f5]
            "
            initial={{
              clipPath: "circle(0px at 50% 50%)",
            }}
            animate={
              reveal
                ? {
                  clipPath: "circle(150vmax at 50% 50%)",
                }
                : {
                  clipPath: "circle(0px at 50% 50%)",
                }
            }
            transition={{
              duration: 0.85,
              ease: [0.76, 0, 0.24, 1],
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
