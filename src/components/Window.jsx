import { motion, animate, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
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
  const bodyRef = useRef(null);
  const contentRef = useRef(null);

  const resizeState = useRef(null);

  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);
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

  const centerWindow = () => {
    const left = (window.innerWidth - defaultWidth) / 2;
    const top = (window.innerHeight - defaultHeight) / 2;

    x.set(left);
    y.set(top);
  };

  useEffect(() => {
    centerWindow();

    requestAnimationFrame(() => {
      setMounted(true);
    });

    const handleResize = () => {
      if (!isMaximized) {
        centerWindow();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [defaultWidth, defaultHeight]);

  useEffect(() => {
    if (!bodyRef.current || !contentRef.current) return;

    const lenis = new Lenis({
      wrapper: bodyRef.current,
      content: contentRef.current,
      duration: 0.65,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.85,
      touchMultiplier: 1,
      autoRaf: false,
    });

    let frame;

    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  const animateTo = (motionValue, value) => {
    animate(motionValue, value, {
      type: "spring",
      stiffness: 520,
      damping: 38,
      mass: 0.55,
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

      const targetWidth = window.innerWidth * 0.92;
      const targetHeight = window.innerHeight * 0.9;

      animateTo(width, targetWidth);
      animateTo(height, targetHeight);
      animateTo(x, window.innerWidth * 0.04);
      animateTo(y, window.innerHeight * 0.05);

      setIsMaximized(true);
    } else {
      const previous = previousState.current;

      animateTo(width, previous.width);
      animateTo(height, previous.height);
      animateTo(x, previous.x);
      animateTo(y, previous.y);

      setIsMaximized(false);
    }
  };

  // ============================================================
  // RESIZE
  // ============================================================

  const startResize = (event, direction) => {
    if (isMaximized) return;

    event.preventDefault();
    event.stopPropagation();

    onFocus?.();

    // Lock the exact pointer that started the resize.
    event.currentTarget.setPointerCapture?.(event.pointerId);

    resizeState.current = {
      direction,

      // Exact mouse position when grabbing the edge.
      startMouseX: event.clientX,
      startMouseY: event.clientY,

      // Exact window geometry when grabbing the edge.
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

    const {
      direction,
      startMouseX,
      startMouseY,
      startX,
      startY,
      startWidth,
      startHeight,
    } = state;

    const deltaX = event.clientX - startMouseX;
    const deltaY = event.clientY - startMouseY;

    const MIN_WIDTH = 420;
    const MIN_HEIGHT = 320;

    const EDGE_MARGIN = 20;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let nextX = startX;
    let nextY = startY;

    let nextWidth = startWidth;
    let nextHeight = startHeight;

    // ------------------------------------------------------------
    // RIGHT
    // ------------------------------------------------------------

    if (direction.includes("e")) {
      nextWidth = startWidth + deltaX;

      nextWidth = Math.max(
        MIN_WIDTH,
        Math.min(
          nextWidth,
          viewportWidth - startX - EDGE_MARGIN
        )
      );
    }

    // ------------------------------------------------------------
    // LEFT
    // ------------------------------------------------------------

    if (direction.includes("w")) {
      const mouseX = event.clientX;

      const minimumX = EDGE_MARGIN;
      const maximumX =
        startX + startWidth - MIN_WIDTH;

      nextX = Math.max(
        minimumX,
        Math.min(mouseX, maximumX)
      );

      nextWidth =
        startX + startWidth - nextX;
    }

    // ------------------------------------------------------------
    // BOTTOM
    // ------------------------------------------------------------

    if (direction.includes("s")) {
      nextHeight = startHeight + deltaY;

      nextHeight = Math.max(
        MIN_HEIGHT,
        Math.min(
          nextHeight,
          viewportHeight - startY - EDGE_MARGIN
        )
      );
    }

    // ------------------------------------------------------------
    // TOP
    // ------------------------------------------------------------

    if (direction.includes("n")) {
      const mouseY = event.clientY;

      const minimumY = EDGE_MARGIN;
      const maximumY =
        startY + startHeight - MIN_HEIGHT;

      nextY = Math.max(
        minimumY,
        Math.min(mouseY, maximumY)
      );

      nextHeight =
        startY + startHeight - nextY;
    }

    // ------------------------------------------------------------
    // APPLY
    // ------------------------------------------------------------

    width.set(nextWidth);
    height.set(nextHeight);
    x.set(nextX);
    y.set(nextY);
  };

  const stopResize = () => {
    resizeState.current = null;

    setIsResizing(false);

    window.removeEventListener(
      "pointermove",
      handleResizeMove
    );

    window.removeEventListener(
      "pointerup",
      stopResize
    );

    window.removeEventListener(
      "pointercancel",
      stopResize
    );
  };

  useEffect(() => {
    return () => {
      window.removeEventListener(
        "pointermove",
        handleResizeMove
      );

      window.removeEventListener(
        "pointerup",
        stopResize
      );

      window.removeEventListener(
        "pointercancel",
        stopResize
      );
    };
  }, []);

  // ============================================================
  // RESIZE HANDLE
  // ============================================================

  const ResizeHandle = ({
    direction,
    className,
  }) => {
    return (
      <div
        onPointerDown={(event) => {
          event.stopPropagation();
          startResize(event, direction);
        }}
        className={`
          absolute
          z-[100]
          touch-none
          ${className}
        `}
      />
    );
  };

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
      style={{
        x,
        y,
        width,
        height,
        zIndex,
      }}
      initial={{
        opacity: 0,
        scale: 0.86,
        filter: "blur(12px)",
      }}
      animate={{
        opacity: mounted ? 1 : 0,
        scale: mounted ? 1 : 0.86,
        filter: mounted
          ? "blur(0px)"
          : "blur(12px)",
      }}
      transition={{
        type: "spring",
        stiffness: 520,
        damping: 34,
        mass: 0.55,
      }}
      className="
        absolute
        left-0
        top-0
        flex
        flex-col
        overflow-hidden
        rounded-[14px]
        border
        border-[var(--color-window-border)]
        bg-[var(--color-surface)]
        window-shadow
        select-none
        will-change-transform
      "
    >
      {/* ======================================================
          HEADER
      ====================================================== */}

      <div
        className="
          window-header-drag
          relative
          z-40
          flex
          h-[38px]
          min-h-[38px]
          items-center
          border-b
          border-[var(--color-surface-border)]
          bg-[var(--color-surface-inactive)]
        "
        onDoubleClick={toggleMaximize}
      >
        <div className="absolute left-3 flex items-center">
          <motion.div
            animate={{
              opacity: isMaximized ? 1 : 0,
              scale: isMaximized ? 1 : 0.8,
            }}
            transition={{
              duration: 0.15,
            }}
          />
        </div>

        <div className="pointer-events-none mx-auto flex items-center">
          <span
            className="
              text-[12px]
              font-medium
              tracking-[-0.01em]
              text-[var(--color-text)]
              opacity-80
            "
          >
            {title}
          </span>
        </div>

        <div className="absolute right-0 top-0 flex h-full">
          {/* MINIMIZE */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            className="
              flex
              h-full
              w-[46px]
              items-center
              justify-center
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-black/10
              dark:hover:bg-white/10
            "
          >
            <Minus
              size={14}
              strokeWidth={1.5}
            />
          </button>

          {/* MAXIMIZE */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            className="
              flex
              h-full
              w-[46px]
              items-center
              justify-center
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-black/10
              dark:hover:bg-white/10
            "
          >
            <Square
              size={12}
              strokeWidth={1.5}
            />
          </button>

          {/* CLOSE */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onPointerDown={(e) =>
              e.stopPropagation()
            }
            className="
              flex
              h-full
              w-[46px]
              items-center
              justify-center
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-[#e81123]
              hover:text-white
            "
          >
            <X
              size={14}
              strokeWidth={1.5}
            />
          </button>
        </div>
      </div>

      {/* ======================================================
          CONTENT
      ====================================================== */}

      <motion.div
        ref={bodyRef}
        className="
          relative
          flex-1
          overflow-auto
          bg-[var(--color-surface)]
          custom-scrollbar
        "
        data-lenis-prevent
      >
        <div
          ref={contentRef}
          className="min-h-full"
        >
          {children}
        </div>
      </motion.div>

      {/* ======================================================
          8-WAY RESIZE
      ====================================================== */}

      {!isMaximized && (
        <>
          {/* TOP */}

          <ResizeHandle
            direction="n"
            className="
              top-0
              left-[10px]
              right-[10px]
              h-[8px]
              cursor-n-resize
            "
          />

          {/* BOTTOM */}

          <ResizeHandle
            direction="s"
            className="
              bottom-0
              left-[10px]
              right-[10px]
              h-[8px]
              cursor-s-resize
            "
          />

          {/* LEFT */}

          <ResizeHandle
            direction="w"
            className="
              left-0
              top-[10px]
              bottom-[10px]
              w-[8px]
              cursor-w-resize
            "
          />

          {/* RIGHT */}

          <ResizeHandle
            direction="e"
            className="
              right-0
              top-[10px]
              bottom-[10px]
              w-[8px]
              cursor-e-resize
            "
          />

          {/* TOP LEFT */}

          <ResizeHandle
            direction="nw"
            className="
              left-0
              top-0
              h-[16px]
              w-[16px]
              cursor-nw-resize
            "
          />

          {/* TOP RIGHT */}

          <ResizeHandle
            direction="ne"
            className="
              right-0
              top-0
              h-[16px]
              w-[16px]
              cursor-ne-resize
            "
          />

          {/* BOTTOM LEFT */}

          <ResizeHandle
            direction="sw"
            className="
              bottom-0
              left-0
              h-[16px]
              w-[16px]
              cursor-sw-resize
            "
          />

          {/* BOTTOM RIGHT */}

          <ResizeHandle
            direction="se"
            className="
              bottom-0
              right-0
              h-[18px]
              w-[18px]
              cursor-se-resize
            "
          />

          {/* ==================================================
              BOTTOM RIGHT RESIZE INDICATOR
          ================================================== */}

          <motion.div
            whileHover={{
              scale: 1.12,
              opacity: 1,
            }}
            className="
              pointer-events-none
              absolute
              bottom-0
              right-0
              z-[101]
              flex
              h-[18px]
              w-[18px]
              items-end
              justify-end
              p-[3px]
              opacity-50
            "
          >
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              className="text-[var(--color-text-tertiary)]"
            >
              <line
                x1="11"
                y1="0"
                x2="0"
                y2="11"
                stroke="currentColor"
                strokeWidth="1"
              />

              <line
                x1="11"
                y1="4"
                x2="4"
                y2="11"
                stroke="currentColor"
                strokeWidth="1"
              />

              <line
                x1="11"
                y1="8"
                x2="8"
                y2="11"
                stroke="currentColor"
                strokeWidth="1"
              />
            </svg>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
