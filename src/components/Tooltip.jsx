import { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Apple-inspired Tooltip with integrated smooth pointer beak.
 * Matches the native macOS / Apple design reference with subtle translucency,
 * soft ambient shadows, crisp typography, and snappy spring motion.
 */
export const TooltipBubble = memo(function TooltipBubble({
  content,
  shortcut,
  side = "top", // "top" (tooltip sits below target, pointer points up) | "bottom" (tooltip sits above target, pointer points down)
  align = "center", // "center" | "start" | "end"
  visible = false,
  className = "",
}) {
  const isTop = side === "top"; // sits below element, pointer points UP
  const isBottom = side === "bottom"; // sits above element, pointer points DOWN

  // Positioning classes
  let positionClasses = "";
  if (isTop) {
    positionClasses = "top-[calc(100%+7px)]";
  } else if (isBottom) {
    positionClasses = "bottom-[calc(100%+7px)]";
  }

  let alignClasses = "-translate-x-1/2 left-1/2";
  if (align === "start") alignClasses = "left-0";
  if (align === "end") alignClasses = "right-0";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: isTop ? -3 : 3,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: isTop ? -2 : 2,
            scale: 0.96,
          }}
          transition={{
            duration: 0.12,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`
            pointer-events-none
            select-none
            absolute
            z-[999999]
            whitespace-nowrap
            rounded-[8px]
            bg-[#222225]/95
            text-[#f5f5f7]
            border
            border-white/[0.12]
            px-2.5
            py-1
            text-[11px]
            font-medium
            leading-tight
            tracking-[-0.01em]
            backdrop-blur-2xl
            shadow-[0_6px_20px_rgba(0,0,0,0.4),0_2px_6px_rgba(0,0,0,0.25)]
            ${positionClasses}
            ${alignClasses}
            ${className}
          `}
        >
          <div className="relative flex items-center gap-1.5 z-10">
            <span>{content}</span>
            {shortcut && (
              <span className="rounded-[3px] bg-white/[0.12] px-1 py-[1px] font-mono text-[9px] text-zinc-300">
                {shortcut}
              </span>
            )}
          </div>

          {/* Integrated Pointer Beak */}
          {isTop && (
            <svg
              className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-[11px] h-[5px] text-[#222225]/95 overflow-visible"
              viewBox="0 0 11 5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 5C2.5 5 3.8 3.5 5.5 0.5C7.2 3.5 8.5 5 11 5Z"
                fill="currentColor"
              />
              <path
                d="M0 5C2.5 5 3.8 3.5 5.5 0.5C7.2 3.5 8.5 5 11 5"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          )}

          {isBottom && (
            <svg
              className="absolute -bottom-[5px] left-1/2 -translate-x-1/2 w-[11px] h-[5px] text-[#222225]/95 overflow-visible"
              viewBox="0 0 11 5"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M0 0C2.5 0 3.8 1.5 5.5 4.5C7.2 1.5 8.5 0 11 0Z"
                fill="currentColor"
              />
              <path
                d="M0 0C2.5 0 3.8 1.5 5.5 4.5C7.2 1.5 8.5 0 11 0"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="0.8"
                strokeLinecap="round"
              />
            </svg>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

/**
 * Tooltip wrapper component with automatic hover management & delay.
 */
export default function Tooltip({
  content,
  shortcut,
  side = "top",
  align = "center",
  delay = 200,
  children,
  className = "",
  disabled = false,
}) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (disabled || !content) return;
    if (delay > 0) {
      timerRef.current = setTimeout(() => setVisible(true), delay);
    } else {
      setVisible(true);
    }
  };

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleMouseEnter}
      onBlur={handleMouseLeave}
    >
      {children}
      <TooltipBubble
        content={content}
        shortcut={shortcut}
        side={side}
        align={align}
        visible={visible}
      />
    </div>
  );
}
