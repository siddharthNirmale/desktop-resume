import { motion, animate, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Minus, Square, X } from "lucide-react";

export default function Window({
  id,
  title,
  isMinimized,
  zIndex,
  onClose,
  onMinimize,
  onFocus,
  constraintsRef,
  children,
  defaultWidth = 750,
  defaultHeight = 550,
}) {
  const windowRef = useRef(null);
  const resizeState = useRef(null);

  const [isMaximized, setIsMaximized] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const width = useMotionValue(defaultWidth);
  const height = useMotionValue(defaultHeight);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const previousState = useRef({
    width: defaultWidth,
    height: defaultHeight,
    x: 0,
    y: 0,
  });

  // Center window on initial mount
  useEffect(() => {
    const left = (window.innerWidth - defaultWidth) / 2;
    const top = (window.innerHeight - defaultHeight) / 2;
    x.set(left);
    y.set(top);

    const handleResize = () => {
      if (!isMaximized) {
        x.set((window.innerWidth - width.get()) / 2);
        y.set((window.innerHeight - height.get()) / 2);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [defaultWidth, defaultHeight]);

  const animateTo = (motionValue, value) => {
    animate(motionValue, value, {
      type: "spring",
      stiffness: 450,
      damping: 35,
      mass: 0.5,
    });
  };

  const toggleMaximize = () => {
    if (!isMaximized) {
      previousState.current = {
        width: width.get(),
        height: height.get(),
        x: x.get(),
        y: y.get(),
      };

      animateTo(width, window.innerWidth * 0.94);
      animateTo(height, window.innerHeight * 0.90);
      animateTo(x, window.innerWidth * 0.03);
      animateTo(y, window.innerHeight * 0.05);

      setIsMaximized(true);
    } else {
      const prev = previousState.current;
      animateTo(width, prev.width);
      animateTo(height, prev.height);
      animateTo(x, prev.x);
      animateTo(y, prev.y);

      setIsMaximized(false);
    }
  };

  // ============================================================
  // 8-WAY RESIZE HANDLERS
  // ============================================================
  const startResize = (event, direction) => {
    if (isMaximized) return;
    event.preventDefault();
    event.stopPropagation();
    onFocus?.();

    event.currentTarget.setPointerCapture?.(event.pointerId);

    resizeState.current = {
      direction,
      startMouseX: event.clientX,
      startMouseY: event.clientY,
      startX: x.get(),
      startY: y.get(),
      startWidth: width.get(),
      startHeight: height.get(),
    };

    setIsResizing(true);
    window.addEventListener("pointermove", handleResizeMove);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  };

  const handleResizeMove = (event) => {
    const state = resizeState.current;
    if (!state) return;

    const { direction, startMouseX, startMouseY, startX, startY, startWidth, startHeight } = state;
    const deltaX = event.clientX - startMouseX;
    const deltaY = event.clientY - startMouseY;

    const MIN_WIDTH = 400;
    const MIN_HEIGHT = 280;
    const MARGIN = 16;

    let nextX = startX;
    let nextY = startY;
    let nextWidth = startWidth;
    let nextHeight = startHeight;

    if (direction.includes("e")) {
      nextWidth = Math.max(MIN_WIDTH, Math.min(startWidth + deltaX, window.innerWidth - startX - MARGIN));
    }
    if (direction.includes("w")) {
      nextX = Math.max(MARGIN, Math.min(event.clientX, startX + startWidth - MIN_WIDTH));
      nextWidth = startX + startWidth - nextX;
    }
    if (direction.includes("s")) {
      nextHeight = Math.max(MIN_HEIGHT, Math.min(startHeight + deltaY, window.innerHeight - startY - MARGIN));
    }
    if (direction.includes("n")) {
      nextY = Math.max(MARGIN, Math.min(event.clientY, startY + startHeight - MIN_HEIGHT));
      nextHeight = startY + startHeight - nextY;
    }

    width.set(nextWidth);
    height.set(nextHeight);
    x.set(nextX);
    y.set(nextY);
  };

  const stopResize = () => {
    resizeState.current = null;
    setIsResizing(false);
    window.removeEventListener("pointermove", handleResizeMove);
    window.removeEventListener("pointerup", stopResize);
    window.removeEventListener("pointercancel", stopResize);
  };

  const ResizeHandle = ({ direction, className }) => (
    <div
      onPointerDown={(e) => startResize(e, direction)}
      className={`absolute z-[100] touch-none ${className}`}
    />
  );

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      drag={!isResizing}
      dragMomentum={false}
      dragElastic={0.02}
      dragConstraints={constraintsRef}
      dragListener={!isResizing}
      onMouseDown={onFocus}
      style={{ x, y, width, height, zIndex }}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ type: "spring", stiffness: 450, damping: 32 }}
      className="
        absolute left-0 top-0 flex flex-col overflow-hidden
        rounded-[12px] border border-[var(--color-window-border)]
        bg-[var(--color-surface)] text-[var(--color-text)]
        window-shadow select-none will-change-transform
      "
    >
      {/* ======================================================
          HEADER (Windows layout with macOS native theme colors)
      ====================================================== */}
      <div
        onDoubleClick={toggleMaximize}
        className="
          window-header-drag relative z-40 flex h-[38px] min-h-[38px]
          items-center border-b border-[var(--color-surface-border)]
          bg-[var(--color-surface-inactive)] px-3
        "
      >
        {/* Title Centered */}
        <div className="pointer-events-none mx-auto flex items-center">
          <span className="text-[12px] font-medium tracking-tight opacity-80">
            {title}
          </span>
        </div>

        {/* Right-aligned Windows-style Controls */}
        <div className="absolute right-0 top-0 flex h-full">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(); }}
            onPointerDown={(e) => e.stopPropagation()}
            title="Minimize"
            className="
              flex h-full w-[44px] items-center justify-center
              text-[var(--color-text-secondary)] transition-colors
              hover:bg-black/10 dark:hover:bg-white/10
            "
          >
            <Minus size={13} strokeWidth={1.8} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); toggleMaximize(); }}
            onPointerDown={(e) => e.stopPropagation()}
            title={isMaximized ? "Restore" : "Maximize"}
            className="
              flex h-full w-[44px] items-center justify-center
              text-[var(--color-text-secondary)] transition-colors
              hover:bg-black/10 dark:hover:bg-white/10
            "
          >
            <Square size={11} strokeWidth={1.8} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onPointerDown={(e) => e.stopPropagation()}
            title="Close"
            className="
              flex h-full w-[44px] items-center justify-center
              text-[var(--color-text-secondary)] transition-colors
              hover:bg-[#e81123] hover:text-white
            "
          >
            <X size={14} strokeWidth={1.8} />
          </button>
        </div>
      </div>

      {/* ======================================================
          CONTENT (Padding removed so children can take full space)
      ====================================================== */}
      <div className="relative flex-1 overflow-auto custom-scrollbar bg-[var(--color-surface)]">
        {children}
      </div>

      {/* ======================================================
          INVISIBLE 8-WAY RESIZE HANDLES
      ====================================================== */}
      {!isMaximized && (
        <>
          <ResizeHandle direction="n" className="top-0 left-[10px] right-[10px] h-[6px] cursor-n-resize" />
          <ResizeHandle direction="s" className="bottom-0 left-[10px] right-[10px] h-[6px] cursor-s-resize" />
          <ResizeHandle direction="w" className="left-0 top-[10px] bottom-[10px] w-[6px] cursor-w-resize" />
          <ResizeHandle direction="e" className="right-0 top-[10px] bottom-[10px] w-[6px] cursor-e-resize" />
          <ResizeHandle direction="nw" className="left-0 top-0 h-[12px] w-[12px] cursor-nw-resize" />
          <ResizeHandle direction="ne" className="right-0 top-0 h-[12px] w-[12px] cursor-ne-resize" />
          <ResizeHandle direction="sw" className="bottom-0 left-0 h-[12px] w-[12px] cursor-sw-resize" />
          <ResizeHandle direction="se" className="bottom-0 right-0 h-[12px] w-[12px] cursor-se-resize" />
        </>
      )}
    </motion.div>
  );
}
