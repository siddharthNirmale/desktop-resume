import { motion, animate, useMotionValue } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { Minus, Square, Copy, X } from "lucide-react";

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

  const [isMaximized, setIsMaximized] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const handleResize = (_, info) => {
    if (isMaximized) return;

    const nextWidth = Math.max(
      420,
      Math.min(
        window.innerWidth - x.get() - 20,
        width.get() + info.delta.x
      )
    );

    const nextHeight = Math.max(
      320,
      Math.min(
        window.innerHeight - y.get() - 20,
        height.get() + info.delta.y
      )
    );

    width.set(nextWidth);
    height.set(nextHeight);
  };

  if (isMinimized) return null;

  return (
    <motion.div
      ref={windowRef}
      drag
      dragMomentum={false}
      dragElastic={0.02}
      dragConstraints={constraintsRef}
      dragListener={true}
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
        filter: mounted ? "blur(0px)" : "blur(12px)",
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
            transition={{ duration: 0.15 }}
          >

          </motion.div>
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            onPointerDown={(e) => e.stopPropagation()}
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
            <Minus size={14} strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleMaximize();
            }}
            onPointerDown={(e) => e.stopPropagation()}
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
            <Square size={12} strokeWidth={1.5} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onPointerDown={(e) => e.stopPropagation()}
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
            <X size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

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

      {!isMaximized && (
        <motion.div
          onPan={handleResize}
          whileHover={{
            scale: 1.12,
            opacity: 1,
          }}
          className="
            absolute
            bottom-0
            right-0
            z-50
            flex
            h-[18px]
            w-[18px]
            cursor-se-resize
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
      )}
    </motion.div>
  );
}
