import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayIcon as Play, PauseIcon as Pause, RotateCcwIcon as RotateCcw } from "lucide-animated";;
import WidgetCover from "./WidgetCover";

// ============================================================
// CLOCK MODE
// ============================================================
function ClockMode() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = (time.getHours() % 12 || 12).toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds();
  const isPM = time.getHours() >= 12;
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
  const secondsProgress = (seconds / 60) * 100;

  return (
    <motion.div
      key="clock"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col w-full items-center gap-5 pointer-events-none"
    >
      {/* Time Display */}
      <div className="flex items-start justify-center w-full gap-1">
        <span className="text-[52px] font-light tracking-[-0.03em] text-[var(--color-text)] leading-none tabular-nums font-heading">
          {hours}:{minutes}
        </span>
        <div className="flex flex-col items-start gap-[5px] pt-2 ml-0.5">
          <span className="text-[10px] font-semibold font-heading text-[var(--color-accent)] uppercase tracking-[0.08em] leading-none">
            {isPM ? 'PM' : 'AM'}
          </span>
          <span className="text-[11px] font-mono font-medium text-[var(--color-text-disabled)] leading-none tabular-nums">
            {seconds.toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Date Label */}
      <span className="text-[11px] text-[var(--color-text-tertiary)] font-medium tracking-tight">
        {dateStr}
      </span>

      {/* Seconds Progress Pill */}
      <div className="w-full h-[2px] bg-[var(--color-surface-border)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-accent)] rounded-full"
          animate={{ width: `${secondsProgress}%` }}
          transition={{ ease: "linear", duration: seconds === 0 ? 0 : 1 }}
        />
      </div>
    </motion.div>
  );
}

// ============================================================
// STOPWATCH MODE
// ============================================================
function StopwatchMode() {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setElapsed((t) => t + 10), 10);
    return () => clearInterval(interval);
  }, [running]);

  const mm = Math.floor(elapsed / 60000).toString().padStart(2, '0');
  const ss = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
  const ms = Math.floor((elapsed % 1000) / 10).toString().padStart(2, '0');

  return (
    <motion.div
      key="stopwatch"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col w-full items-center gap-5"
    >
      {/* Stopwatch Display */}
      <div className="flex items-end justify-center w-full gap-0.5">
        <span className="text-[52px] font-light tracking-[-0.03em] text-[var(--color-text)] leading-none tabular-nums font-heading">
          {mm}:{ss}
        </span>
        <span className="text-[18px] font-medium text-[var(--color-accent)] leading-none mb-1.5 ml-0.5 tabular-nums">
          .{ms}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3" onPointerDown={(e) => e.stopPropagation()}>
        <button
          onClick={() => { setRunning(false); setElapsed(0); }}
          className="h-8 w-8 flex items-center justify-center rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-border)] transition-all duration-150 focus:outline-none cursor-default"
        >
          <RotateCcw size={13} strokeWidth={2} />
        </button>
        <button
          onClick={() => setRunning(!running)}
          className="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--color-accent)] text-white hover:opacity-90 transition-all duration-150 focus:outline-none cursor-default"
        >
          {running
            ? <Pause size={15} strokeWidth={2} />
            : <Play size={15} strokeWidth={2} className="ml-0.5" />
          }
        </button>
      </div>
    </motion.div>
  );
}

// ============================================================
// TIMER MODE
// ============================================================
function TimerMode() {
  const [running, setRunning] = useState(false);
  const [remaining, setRemaining] = useState(300);
  const [initial, setInitial] = useState(300);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) { setRunning(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [running]);

  const adjust = (deltaMins) => {
    setRemaining((prev) => {
      const next = Math.max(0, prev + deltaMins * 60);
      setInitial(next);
      return next;
    });
  };

  const reset = () => {
    setRunning(false);
    const fallback = initial === 0 || remaining === 0 ? 300 : initial;
    setRemaining(fallback);
    if (initial === 0 || remaining === 0) setInitial(300);
  };

  const mm = Math.floor(remaining / 60).toString().padStart(2, '0');
  const ss = (remaining % 60).toString().padStart(2, '0');
  const progress = initial > 0 ? (remaining / initial) * 100 : 0;
  const isDone = remaining === 0;

  return (
    <motion.div
      key="timer"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
      className="flex flex-col w-full items-center gap-5"
    >
      {/* Timer Display */}
      <span className="text-[52px] font-light tracking-[-0.03em] text-[var(--color-text)] leading-none tabular-nums font-heading">
        {mm}:{ss}
      </span>

      {/* Progress Track */}
      <div className="w-full h-[2px] bg-[var(--color-surface-border)] rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${isDone ? 'bg-red-500' : 'bg-[var(--color-accent)]'}`}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 1 }}
        />
      </div>

      {/* Controls Row */}
      <div className="flex items-center justify-between w-full" onPointerDown={(e) => e.stopPropagation()}>
        {/* Adjust Buttons */}
        <div className="flex gap-1.5">
          {[-1, +1, +5].map((delta) => (
            <button
              key={delta}
              onClick={() => adjust(delta)}
              className="text-[11px] font-medium text-[var(--color-text-tertiary)] bg-[var(--color-surface-hover)]/30 border border-[var(--color-surface-border)] px-2.5 py-1 rounded-lg hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-hover)] transition-all duration-150 focus:outline-none cursor-default tabular-nums"
            >
              {delta > 0 ? `+${delta}m` : `${delta}m`}
            </button>
          ))}
        </div>

        {/* Play / Reset */}
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="h-7 w-7 flex items-center justify-center rounded-full text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] transition-all duration-150 focus:outline-none cursor-default"
          >
            <RotateCcw size={12} strokeWidth={2} />
          </button>
          <button
            onClick={() => remaining > 0 && setRunning(!running)}
            className="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--color-surface-hover)]/40 border border-[var(--color-surface-border)] text-[var(--color-text-secondary)] hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-text)] transition-all duration-150 focus:outline-none cursor-default"
          >
            {running
              ? <Pause size={13} strokeWidth={2} className="text-[var(--color-accent)]" />
              : <Play size={13} strokeWidth={2} className="ml-0.5" />
            }
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================
// MAIN EXPORT
// ============================================================
const TABS = ['clock', 'stopwatch', 'timer'];

export default function ClockWidget({ constraintsRef, zIndex, onFocus, onClose, positionStyle }) {
  const [mode, setMode] = useState('clock');

  return (
    <WidgetCover
      id="clock"
      title="Time"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "16px", right: "18px" }}
    >
      {/* Mode Tabs */}
      <div className="flex gap-4 items-center mb-4" onPointerDown={(e) => e.stopPropagation()}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`text-[11px] font-heading font-semibold capitalize transition-colors duration-150 cursor-default focus:outline-none
              ${mode === tab
                ? 'text-[var(--color-accent)]'
                : 'text-[var(--color-text-disabled)] hover:text-[var(--color-text-tertiary)]'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Mode View */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {mode === 'clock' && <ClockMode key="clock" />}
          {mode === 'stopwatch' && <StopwatchMode key="stopwatch" />}
          {mode === 'timer' && <TimerMode key="timer" />}
        </AnimatePresence>
      </div>
    </WidgetCover>
  );
}
