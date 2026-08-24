import { useEffect, useState, useMemo, memo } from "react";
import { motion } from "framer-motion";
import WidgetCover from "./WidgetCover";

/* ─────────────────────────────────────────────────────────────
   DIAL TICKS
   ───────────────────────────────────────────────────────────── */
const ClockTicks = memo(function ClockTicks() {
  const ticks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      angle: i * 30,
      isQuarter: i % 3 === 0,
      index: i,
    }));
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {ticks.map(({ angle, isQuarter, index }) => (
        <div
          key={index}
          className="absolute inset-0 flex justify-center"
          style={{ transform: `rotate(${angle}deg)` }}
        >
          <div
            className={`rounded-full ${
              isQuarter
                ? "mt-2 h-1.5 w-[1.5px] bg-[var(--color-text)] opacity-50"
                : "mt-2 h-1 w-[1px] bg-[var(--color-text)] opacity-20"
            }`}
          />
        </div>
      ))}
    </div>
  );
});

/* ─────────────────────────────────────────────────────────────
   TIME WIDGET (COMPACT & SIMPLE)
   ───────────────────────────────────────────────────────────── */
export default function ClockWidget({
  constraintsRef,
  zIndex,
  onFocus,
  onClose,
  positionStyle,
}) {
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const minuteAngle = minutes * 6 + seconds * 0.1;
  const hourAngle = (hours % 12) * 30 + minutes * 0.5;

  const digitalTime = time.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <WidgetCover
      id="clock"
      title="Time"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      className="!w-[172px] sm:!w-[184px]"
      positionStyle={positionStyle || { top: "16px", right: "18px" }}
    >
      <div className="flex w-full flex-col items-center justify-center py-1 select-none">
        {/* Compact Analog Dial */}
        <motion.div
          whileHover={{ scale: 1.025 }}
          transition={{ type: "spring", stiffness: 420, damping: 30 }}
          className="relative flex h-[104px] w-[104px] items-center justify-center rounded-full bg-[var(--color-surface-hover)]/20 shadow-inner"
        >
          {/* Subtle Ticks */}
          <ClockTicks />

          {/* Hour Hand */}
          <div
            className="absolute inset-0 flex justify-center origin-center transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${hourAngle}deg)` }}
          >
            <div className="mt-6 h-[26px] w-[2.5px] rounded-full bg-[var(--color-text)] shadow-xs" />
          </div>

          {/* Minute Hand */}
          <div
            className="absolute inset-0 flex justify-center origin-center transition-transform duration-500 ease-out"
            style={{ transform: `rotate(${minuteAngle}deg)` }}
          >
            <div className="mt-3 h-[39px] w-[1.8px] rounded-full bg-[var(--color-text)]/85 shadow-xs" />
          </div>

          {/* Center Pin */}
          <div className="relative z-10 flex h-2 w-2 items-center justify-center rounded-full bg-[var(--color-surface)] shadow-xs">
            <div className="h-1 w-1 rounded-full bg-[var(--color-text)]" />
          </div>
        </motion.div>

        {/* Digital Time & Date */}
        <div className="mt-2 flex flex-col items-center text-center">
          <span className="text-[12px] font-heading font-medium tracking-tight text-[var(--color-text)] tabular-nums">
            {digitalTime}
          </span>
          <span className="text-[10px] text-[var(--color-text-tertiary)]">
            {dateStr}
          </span>
        </div>
      </div>
    </WidgetCover>
  );
}
