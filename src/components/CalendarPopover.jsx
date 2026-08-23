import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiClock } from "react-icons/fi";

const DAYS_OF_WEEK = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const monthYearFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
});

export default function CalendarPopover({ isOpen, onClose }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewDate, setViewDate] = useState(new Date());
  const [direction, setDirection] = useState(0); // -1 for prev, 1 for next
  const popoverRef = useRef(null);

  // Live clock tick
  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  // Reset view date to today when opened
  useEffect(() => {
    if (isOpen) {
      setViewDate(new Date());
    }
  }, [isOpen]);

  // Click outside & Escape key listener
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (e) => {
      if (popoverRef.current && !popoverRef.current.contains(e.target)) {
        onClose();
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    setDirection(-1);
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setDirection(1);
    setViewDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleResetToday = () => {
    setDirection(0);
    setViewDate(new Date());
  };

  // Calendar Grid Calculation
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const days = [];

    // Previous month padding days
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        day: daysInPrevMonth - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, daysInPrevMonth - i),
      });
    }

    // Current month days
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(year, month, i),
      });
    }

    // Next month padding days to complete 6 rows (42 cells) or 5 rows (35 cells)
    const totalCells = days.length > 35 ? 42 : 35;
    const remainingCells = totalCells - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(year, month + 1, i),
      });
    }

    return days;
  }, [viewDate]);

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[999999] pointer-events-auto"
          onClick={onClose}
        >
          {/* Backdrop click capture */}
          <div className="absolute inset-0 bg-transparent" />

          {/* Calendar Popover Surface */}
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="
              absolute top-[calc(var(--topbar-height,28px)+6px)] right-2 sm:right-4
              w-[290px] max-w-[calc(100vw-24px)]
              select-none
              rounded-[16px]
              bg-[var(--color-surface-elevated)]
              text-[var(--color-text)]
              border border-[var(--color-surface-border)]
              p-3.5
              shadow-[0_16px_40px_rgba(0,0,0,0.35),0_2px_8px_rgba(0,0,0,0.2)]
              font-primary
            "
          >
          {/* ──────────────────────────────────────────
              Header: Live Date & Clock Display
          ────────────────────────────────────────── */}
          <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-divider)]">
            <div>
              <div className="text-[13px] font-semibold text-[var(--color-text)] tracking-tight">
                {fullDateFormatter.format(currentDate)}
              </div>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[var(--color-text-secondary)] tabular-nums mt-0.5">
                <FiClock size={11} className="opacity-70" />
                <span>{timeFormatter.format(currentDate)}</span>
              </div>
            </div>

            {/* Jump to Today Button */}
            <button
              type="button"
              onClick={handleResetToday}
              className="
                px-2 py-1 rounded-[6px]
                text-[10px] font-medium text-[var(--color-text-secondary)]
                hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
                transition-colors cursor-default focus:outline-none
              "
              title="Jump to today"
            >
              Today
            </button>
          </div>

          {/* ──────────────────────────────────────────
              Month & Year Navigation Bar
          ────────────────────────────────────────── */}
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="text-[13px] font-medium tracking-tight text-[var(--color-text)]">
              {monthYearFormatter.format(viewDate)}
            </span>

            <div className="flex items-center gap-0.5 text-[var(--color-text-secondary)]">
              <button
                type="button"
                onClick={handlePrevMonth}
                aria-label="Previous Month"
                className="
                  flex h-6 w-6 items-center justify-center rounded-[5px]
                  hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
                  active:bg-[var(--color-surface-active)] transition-colors
                  cursor-default focus:outline-none
                "
              >
                <FiChevronLeft size={14} strokeWidth={2.2} />
              </button>
              <button
                type="button"
                onClick={handleNextMonth}
                aria-label="Next Month"
                className="
                  flex h-6 w-6 items-center justify-center rounded-[5px]
                  hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
                  active:bg-[var(--color-surface-active)] transition-colors
                  cursor-default focus:outline-none
                "
              >
                <FiChevronRight size={14} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* ──────────────────────────────────────────
              Days of Week Header
          ────────────────────────────────────────── */}
          <div className="grid grid-cols-7 mb-1 text-center">
            {DAYS_OF_WEEK.map((d, index) => (
              <span
                key={d}
                className={`
                  text-[10px] font-medium tracking-wide py-1
                  ${
                    index === 0 || index === 6
                      ? "text-[var(--color-text-tertiary)] opacity-60"
                      : "text-[var(--color-text-tertiary)]"
                  }
                `}
              >
                {d}
              </span>
            ))}
          </div>

          {/* ──────────────────────────────────────────
              Calendar Days Grid
          ────────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${viewDate.getFullYear()}-${viewDate.getMonth()}`}
              initial={{ opacity: 0, x: direction * 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -8 }}
              transition={{ duration: 0.14, ease: "easeOut" }}
              className="grid grid-cols-7 gap-y-0.5 text-center"
            >
              {calendarDays.map(({ day, isCurrentMonth, date }, idx) => {
                const today = isToday(date);
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-center p-0.5"
                  >
                    <button
                      type="button"
                      className={`
                        flex h-7 w-7 items-center justify-center rounded-full
                        text-[11px] font-medium transition-all duration-150
                        focus:outline-none cursor-default
                        ${
                          today
                            ? "bg-[var(--color-accent)] text-white font-semibold shadow-xs scale-[1.04]"
                            : isCurrentMonth
                            ? "text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]"
                            : "text-[var(--color-text-disabled)]/40 hover:text-[var(--color-text-disabled)]"
                        }
                      `}
                    >
                      {day}
                    </button>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
