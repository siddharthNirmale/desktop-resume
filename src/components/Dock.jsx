import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import {
  FiUser,
  FiBriefcase,
  FiFileText,
  FiEdit3,
  FiMail,
  FiTerminal,
  FiSliders,
} from "react-icons/fi";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { TooltipBubble } from "./Tooltip";

/* ==========================================================================
   CONFIG & CONSTANTS
   ========================================================================== */

const BASE_ICON_SIZE = 46;
const MAX_ICON_SCALE = 1.34;
const MAGNIFY_RADIUS = 135;

const SPRING_CONFIG = {
  stiffness: 440,
  damping: 28,
  mass: 0.52,
};

/* Pastel tinted palette with explicit Light and Dark classes */
const DOCK_ITEMS = [
  {
    id: "about",
    icon: FiUser,
    label: "About Me",
    shortcut: "1",
    lightClass:
      "bg-[#EEF4FF] text-[#2563EB] hover:bg-[#DBEAFE] border-blue-200/60 shadow-xs",
    darkClass:
      "bg-blue-500/15 text-blue-400 border-blue-500/25 hover:bg-blue-500/25 shadow-xs",
  },
  {
    id: "projects",
    icon: FiBriefcase,
    label: "Projects",
    shortcut: "2",
    lightClass:
      "bg-[#FFF4ED] text-[#EA580C] hover:bg-[#FFEDD5] border-orange-200/60 shadow-xs",
    darkClass:
      "bg-orange-500/15 text-orange-400 border-orange-500/25 hover:bg-orange-500/25 shadow-xs",
  },
  {
    id: "resume",
    icon: FiFileText,
    label: "Resume",
    shortcut: "3",
    lightClass:
      "bg-[#EDFAF6] text-[#0D9488] hover:bg-[#CCFBF1] border-teal-200/60 shadow-xs",
    darkClass:
      "bg-teal-500/15 text-teal-400 border-teal-500/25 hover:bg-teal-500/25 shadow-xs",
  },
  {
    id: "notepad",
    icon: FiEdit3,
    label: "Notes",
    shortcut: "4",
    lightClass:
      "bg-[#FEF2F2] text-[#E11D48] hover:bg-[#FFE4E6] border-rose-200/60 shadow-xs",
    darkClass:
      "bg-rose-500/15 text-rose-400 border-rose-500/25 hover:bg-rose-500/25 shadow-xs",
  },
  {
    id: "contact",
    icon: FiMail,
    label: "Contact",
    shortcut: "5",
    lightClass:
      "bg-[#FEFCE8] text-[#CA8A04] hover:bg-[#FEF9C3] border-amber-200/60 shadow-xs",
    darkClass:
      "bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/25 shadow-xs",
  },
  {
    id: "separator-1",
    type: "separator",
  },
  {
    id: "terminal",
    icon: FiTerminal,
    label: "Terminal",
    shortcut: "6",
    lightClass:
      "bg-[#F0F9FF] text-[#0284C7] hover:bg-[#E0F2FE] border-sky-200/60 shadow-xs",
    darkClass:
      "bg-sky-500/15 text-sky-400 border-sky-500/25 hover:bg-sky-500/25 shadow-xs",
  },
  {
    id: "theme",
    icon: FiSliders,
    label: "Appearance",
    shortcut: "7",
    lightClass:
      "bg-[#FAF5FF] text-[#9333EA] hover:bg-[#F3E8FF] border-purple-200/60 shadow-xs",
    darkClass:
      "bg-purple-500/15 text-purple-400 border-purple-500/25 hover:bg-purple-500/25 shadow-xs",
  },
];

/* ==========================================================================
   MAGNIFICATION HOOK
   ========================================================================== */

function useMagnification(mouseX, ref, disabled = false) {
  const distance = useMotionValue(Infinity);

  useEffect(() => {
    if (disabled) {
      distance.set(Infinity);
      return;
    }

    const unsubscribe = mouseX.on("change", (x) => {
      if (!ref.current || !Number.isFinite(x)) {
        distance.set(Infinity);
        return;
      }

      const rect = ref.current.getBoundingClientRect();
      const center = rect.left + rect.width / 2;
      distance.set(Math.abs(x - center));
    });

    return unsubscribe;
  }, [mouseX, ref, distance, disabled]);

  const rawScale = useTransform(
    distance,
    [0, MAGNIFY_RADIUS],
    [MAX_ICON_SCALE, 1],
    { clamp: true }
  );

  const rawY = useTransform(
    distance,
    [0, MAGNIFY_RADIUS],
    [-8, 0],
    { clamp: true }
  );

  return {
    scale: useSpring(rawScale, SPRING_CONFIG),
    y: useSpring(rawY, SPRING_CONFIG),
  };
}

/* ==========================================================================
   TOOLTIP / HOVER-TO-VIEW NAME
   ========================================================================== */

const DockTooltip = memo(function DockTooltip({
  label,
  shortcut,
  visible,
}) {
  return (
    <TooltipBubble
      content={label}
      shortcut={shortcut ? `⌘${shortcut}` : undefined}
      side="bottom"
      visible={visible}
    />
  );
});

/* ==========================================================================
   RUNNING DOT INDICATOR
   ========================================================================== */

const RunningIndicator = memo(function RunningIndicator({
  isOpen,
  isMinimized,
  isTopActive,
  isLight,
}) {
  return (
    <div className="flex h-[5px] w-full items-center justify-center pt-0.5">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.span
            key={isMinimized ? "minimized" : isTopActive ? "top" : "open"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: isMinimized ? 0.35 : 1,
            }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            style={{
              backgroundColor: isTopActive
                ? "var(--color-accent, #0a84ff)"
                : undefined,
              boxShadow: isTopActive
                ? "0 0 6px var(--color-accent, #0a84ff)"
                : "none",
            }}
            className={`
              block h-[3.5px] w-[3.5px] rounded-full transition-colors duration-200
              ${
                !isTopActive
                  ? isLight
                    ? "bg-zinc-800"
                    : "bg-zinc-200"
                  : ""
              }
            `}
          />
        )}
      </AnimatePresence>
    </div>
  );
});

/* ==========================================================================
   SEPARATOR
   ========================================================================== */

function DockSeparator({ isLight }) {
  return (
    <div
      aria-hidden="true"
      className={`
        mx-0.5
        mb-2
        h-[24px]
        w-[1px]
        shrink-0
        self-center
        rounded-full
        transition-colors
        duration-200
        ${isLight ? "bg-black/[0.10]" : "bg-white/[0.12]"}
      `}
    />
  );
}

/* ==========================================================================
   DOCK CIRCLE ICON ITEM
   ========================================================================== */

function DockCircleItem({
  id,
  icon: Icon,
  label,
  shortcut,
  lightClass,
  darkClass,
  isLight,
  windows,
  toggleWindow,
  bringToFront,
  mouseX,
  reducedMotion,
}) {
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const { scale, y } = useMagnification(mouseX, ref, reducedMotion);

  const windowItem = windows?.find((item) => item.id === id);
  const isOpen = Boolean(windowItem?.isOpen);
  const isMinimized = Boolean(windowItem?.isMinimized);

  const isTopActive = useMemo(() => {
    if (!isOpen || isMinimized) return false;
    const activeWindows =
      windows?.filter(
        (w) => w.type === "window" && w.isOpen && !w.isMinimized
      ) ?? [];
    const maxZ = Math.max(...activeWindows.map((w) => w.zIndex ?? 0), 0);
    return (windowItem?.zIndex ?? 0) === maxZ;
  }, [windows, isOpen, isMinimized, windowItem?.zIndex]);

  const handleClick = useCallback(() => {
    if (!windowItem) return;

    setBouncing(true);
    setTimeout(() => setBouncing(false), 580);

    if (windowItem.type === "widget") {
      if (!isOpen) {
        toggleWindow(id, "isOpen", true);
        bringToFront(id);
      } else {
        toggleWindow(id, "isOpen", false);
      }
      return;
    }

    if (!isOpen) {
      toggleWindow(id, "isOpen", true);
      bringToFront(id);
      return;
    }

    if (isMinimized) {
      toggleWindow(id, "isMinimized", false);
      bringToFront(id);
      return;
    }

    if (isTopActive) {
      toggleWindow(id, "isMinimized", true);
    } else {
      bringToFront(id);
    }
  }, [
    windowItem,
    isOpen,
    isMinimized,
    isTopActive,
    id,
    toggleWindow,
    bringToFront,
  ]);

  const handleMiddleClick = useCallback(
    (e) => {
      if (e.button === 1 && windowItem?.isOpen) {
        e.preventDefault();
        toggleWindow(id, "isMinimized", true);
      }
    },
    [windowItem, id, toggleWindow]
  );

  return (
    <div
      ref={ref}
      className="relative flex w-[48px] shrink-0 flex-col items-center justify-end"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <DockTooltip
        label={label}
        shortcut={shortcut}
        visible={hovered}
        isLight={isLight}
      />

      <motion.button
        type="button"
        aria-label={label}
        onClick={handleClick}
        onMouseDown={handleMiddleClick}
        style={{ scale, y }}
        animate={
          bouncing && !reducedMotion
            ? { y: [0, -18, 0, -8, 0] }
            : { y: 0 }
        }
        transition={
          bouncing
            ? {
                duration: 0.56,
                times: [0, 0.28, 0.55, 0.78, 1],
                ease: "easeOut",
              }
            : SPRING_CONFIG
        }
        whileTap={reducedMotion ? undefined : { scale: 0.92 }}
        className={`
          group
          relative
          flex
          h-[46px]
          w-[46px]
          cursor-pointer
          items-center
          justify-center
          rounded-full
          border
          outline-none
          transition-all
          duration-200
          focus-visible:ring-2
          focus-visible:ring-[var(--color-accent,#0a84ff)]
          focus-visible:ring-offset-2
          ${isLight ? lightClass : darkClass}
        `}
      >
        <Icon size={20} />
      </motion.button>

      {/* Running App Dot */}
      <RunningIndicator
        isOpen={isOpen}
        isMinimized={isMinimized}
        isTopActive={isTopActive}
        isLight={isLight}
      />
    </div>
  );
}

/* ==========================================================================
   MAIN DOCK COMPONENT
   ========================================================================== */

export default function Dock({
  windows = [],
  toggleWindow,
  bringToFront,
}) {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("os-theme");
    if (saved) return saved === "light";
    return (
      document.documentElement.classList.contains("light-theme") ||
      document.body.classList.contains("light-theme")
    );
  });

  const mouseX = useMotionValue(Infinity);

  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------------
     THEME SYNC
     ------------------------------------------------------------------------ */

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLight);
    document.body.classList.toggle("light-theme", isLight);
  }, [isLight]);

  /* ------------------------------------------------------------------------
     OBSERVE EXTERNAL THEME CHANGES (e.g. SmallDisplay, ThemeWidget)
     ------------------------------------------------------------------------ */

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const activeIsLight =
        document.documentElement.classList.contains("light-theme") ||
        document.body.classList.contains("light-theme");
      setIsLight((prev) => (prev !== activeIsLight ? activeIsLight : prev));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* ------------------------------------------------------------------------
     MOUSE TRACKING
     ------------------------------------------------------------------------ */

  const handleMouseMove = useCallback(
    (e) => {
      mouseX.set(e.clientX);
    },
    [mouseX]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(Infinity);
  }, [mouseX]);

  /* ------------------------------------------------------------------------
     KEYBOARD SHORTCUTS (Ctrl / Cmd + 1..7)
     ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey || event.ctrlKey) {
        const num = Number(event.key);
        if (num >= 1 && num <= 7) {
          event.preventDefault();
          const items = DOCK_ITEMS.filter(
            (entry) => entry.type !== "separator"
          );
          const item = items[num - 1];
          if (!item) return;

          const win = windows.find((entry) => entry.id === item.id);
          if (!win) return;

          if (win.type === "widget") {
            toggleWindow(item.id, "isOpen", !win.isOpen);
            if (!win.isOpen) bringToFront(item.id);
            return;
          }

          if (!win.isOpen) {
            toggleWindow(item.id, "isOpen", true);
            bringToFront(item.id);
          } else if (win.isMinimized) {
            toggleWindow(item.id, "isMinimized", false);
            bringToFront(item.id);
          } else {
            bringToFront(item.id);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [windows, toggleWindow, bringToFront]);

  /* ------------------------------------------------------------------------
     THEME TOGGLE HANDLER
     ------------------------------------------------------------------------ */

  const handleThemeToggle = useCallback(
    (event) => {
      const nextLight = !isLight;

      const applyTheme = () => {
        document.documentElement.classList.toggle("light-theme", nextLight);
        document.body.classList.toggle("light-theme", nextLight);
        localStorage.setItem("os-theme", nextLight ? "light" : "dark");
        setIsLight(nextLight);
      };

      if (
        reducedMotion ||
        typeof document.startViewTransition !== "function"
      ) {
        applyTheme();
        return;
      }

      const x = event?.clientX ?? window.innerWidth / 2;
      const y = event?.clientY ?? window.innerHeight - 30;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(applyTheme);

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 450,
              easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => {});
    },
    [isLight, reducedMotion]
  );

  /* ------------------------------------------------------------------------
     RENDER
     ------------------------------------------------------------------------ */

  return (
    <div
      className="
        pointer-events-none
        fixed
        bottom-3.5
        left-1/2
        z-[99999]
        -translate-x-1/2
        sm:bottom-4.5
      "
    >
      <nav
        aria-label="Application Dock"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          pointer-events-auto
          relative
          flex
          max-w-[calc(100vw-16px)]
          items-end
          gap-2.5
          overflow-visible
          rounded-[30px]
          border
          px-3.5
          pb-2
          pt-2.5
          backdrop-blur-2xl
          transition-all
          duration-300
          sm:gap-3
          sm:px-4
          sm:pb-2
          sm:pt-2.5
          ${
            isLight
              ? "border-black/[0.08] bg-white/85 shadow-[0_16px_44px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.03)]"
              : "border-white/[0.10] bg-[#161618]/85 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_1px_1px_rgba(255,255,255,0.08)_inset]"
          }
        `}
      >
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") {
            return <DockSeparator key={item.id} isLight={isLight} />;
          }

          return (
            <DockCircleItem
              key={item.id}
              {...item}
              isLight={isLight}
              windows={windows}
              toggleWindow={toggleWindow}
              bringToFront={bringToFront}
              mouseX={mouseX}
              reducedMotion={reducedMotion}
            />
          );
        })}
      </nav>
    </div>
  );
}
