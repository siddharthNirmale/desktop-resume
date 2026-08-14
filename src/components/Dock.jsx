import { useState, useEffect, useRef, useCallback } from "react";
import {
  FiUser,
  FiBriefcase,
  FiFileText,
  FiEdit3,
  FiMail,
  FiTerminal,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ─── Monochrome Dock Physics ─────────────────────────────
const DOCK_ICON_SIZE = 42;
const DOCK_ICON_MAX = 64;
const MAGNIFY_RADIUS = 110;
const SPRING = { stiffness: 400, damping: 32, mass: 0.8 };

// ─── Dock Configuration ─────────────────────────────────
const DOCK_ITEMS = [
  { id: "about", icon: FiUser, label: "About Me" },
  { id: "projects", icon: FiBriefcase, label: "Projects" },
  { id: "resume", icon: FiFileText, label: "Resume" },
  { id: "notepad", icon: FiEdit3, label: "Notes" },
  { id: "contact", icon: FiMail, label: "Contact" },
  { id: "sep1", type: "separator" },
  { id: "terminal", icon: FiTerminal, label: "Terminal" },
];

// ─── Custom Hooks ────────────────────────────────────────
function useMagnify(mouseX, ref) {
  const dist = useMotionValue(Infinity);

  useEffect(() => {
    return mouseX.on("change", (mx) => {
      if (!ref.current) return;
      const { left, width } = ref.current.getBoundingClientRect();
      dist.set(Math.abs(mx - (left + width / 2)));
    });
  }, [mouseX, ref, dist]);

  const rawScale = useTransform(
    dist,
    [0, MAGNIFY_RADIUS],
    [DOCK_ICON_MAX / DOCK_ICON_SIZE, 1],
    { clamp: true }
  );

  const rawY = useTransform(dist, [0, MAGNIFY_RADIUS], [-10, 0], {
    clamp: true,
  });

  return {
    scale: useSpring(rawScale, SPRING),
    y: useSpring(rawY, SPRING),
  };
}

// ─── Shared UI Components ───────────────────────────────
function IconShell({ children }) {
  return (
    <div
      className="
        relative flex shrink-0 items-center justify-center
        rounded-[13px]
        border border-[var(--dock-icon-border)]
        bg-[var(--dock-icon-bg)]
        text-[var(--dock-icon-fg)]
        shadow-[0_4px_12px_var(--dock-icon-shadow)]
        transition-colors duration-300
      "
      style={{ width: DOCK_ICON_SIZE, height: DOCK_ICON_SIZE }}
    >
      {children}
    </div>
  );
}

function Tooltip({ label, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, y: 6, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.97 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className="
            absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2
            z-[99999] whitespace-nowrap pointer-events-none
            rounded-lg border border-[var(--dock-tooltip-border)]
            bg-[var(--dock-tooltip-bg)]
            px-2.5 py-1.5
            text-[12px] font-medium tracking-[-0.01em]
            text-[var(--dock-tooltip-fg)]
            shadow-[0_8px_24px_var(--dock-tooltip-shadow)]
          "
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

function RunningDot({ isOpen, isMinimized }) {
  return (
    <div className="mt-1 flex h-2 items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={isMinimized ? "min" : "open"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isMinimized ? 0.35 : 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="h-1 w-1 rounded-full bg-[var(--dock-dot)]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Sep() {
  return (
    <div
      className="
        mx-2 mb-3.5 h-7 w-px shrink-0 self-end
        bg-[var(--dock-separator)]
      "
    />
  );
}

// ─── Dock Icon ───────────────────────────────────────────
function DockIcon({
  id,
  icon: IconComponent,
  label,
  badge,
  windows,
  toggleWindow,
  bringToFront,
  mouseX,
}) {
  const ref = useRef(null);
  const { scale, y } = useMagnify(mouseX, ref);
  const [hovered, setHovered] = useState(false);
  const [tapping, setTapping] = useState(false);

  const win = windows?.find((w) => w.id === id);
  const isOpen = win?.isOpen;
  const isMinimized = win?.isMinimized;

  const handleClick = useCallback(() => {
    if (!win) return;

    setTapping(true);
    setTimeout(() => setTapping(false), 800);

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

    const activeWins = windows.filter(
      (w) => w.type === "window" && w.isOpen && !w.isMinimized
    );
    const maxZ = Math.max(
      ...activeWins.map((w) => w.zIndex ?? 0),
      0
    );

    if (win.zIndex === maxZ) {
      toggleWindow(id, "isMinimized", true);
    } else {
      bringToFront(id);
    }
  }, [
    win,
    isOpen,
    isMinimized,
    windows,
    id,
    toggleWindow,
    bringToFront,
  ]);

  if (win?.type === "widget") return null;

  const bounceVariants = {
    idle: { y: 0 },
    tapping: {
      y: [0, -25, 0, -12, 0],
      transition: {
        duration: 0.7,
        times: [0, 0.3, 0.55, 0.8, 1],
        ease: ["easeOut", "easeIn", "easeOut", "easeIn"],
      },
    },
  };

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-end"
      style={{ width: DOCK_ICON_SIZE + 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip label={label} visible={hovered} />

      <motion.button
        type="button"
        style={{ scale, y }}
        className="
          flex cursor-pointer flex-col items-center
          border-none bg-transparent p-0 outline-none
        "
        variants={bounceVariants}
        animate={tapping ? "tapping" : "idle"}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        aria-label={label}
        onClick={handleClick}
      >
        <IconShell>
          <IconComponent
            size={22}
            strokeWidth={1.7}
            aria-hidden="true"
          />
        </IconShell>

        <AnimatePresence>
          {badge > 0 && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              className="
                absolute -right-0.5 -top-1 z-10
                flex h-5 min-w-5 items-center justify-center
                rounded-full border border-[var(--badge-border)]
                bg-[var(--badge-bg)]
                px-1.5 text-[11px] font-semibold
                text-[var(--badge-fg)]
                shadow-[0_2px_8px_var(--badge-shadow)]
              "
            >
              {badge}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <RunningDot isOpen={isOpen} isMinimized={isMinimized} />
    </div>
  );
}

// ─── Theme Button ────────────────────────────────────────
function ThemeButton({ isLight, onToggle, mouseX }) {
  const ref = useRef(null);
  const { scale, y } = useMagnify(mouseX, ref);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="relative flex flex-col items-center justify-end"
      style={{ width: DOCK_ICON_SIZE + 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip
        label={isLight ? "Dark Mode" : "Light Mode"}
        visible={hovered}
      />

      <motion.button
        type="button"
        style={{ scale, y }}
        className="
          flex cursor-pointer flex-col items-center
          border-none bg-transparent p-0 outline-none
        "
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={onToggle}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <IconShell>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isLight ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -35, scale: 0.7 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 35, scale: 0.7 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="flex text-[var(--dock-icon-fg)]"
            >
              {isLight ? (
                <FiMoon size={22} strokeWidth={1.7} />
              ) : (
                <FiSun size={22} strokeWidth={1.7} />
              )}
            </motion.span>
          </AnimatePresence>
        </IconShell>
      </motion.button>

      <div className="h-3" />
    </div>
  );
}

// ─── Main Dock Component ────────────────────────────────
export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;

    const saved = localStorage.getItem("os-theme");
    const prefLight = window.matchMedia(
      "(prefers-color-scheme: light)"
    ).matches;

    return saved ? saved === "light" : prefLight;
  });

  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle("light-theme", isLight);
    document.body.classList.toggle("light-theme", isLight);
  }, [isLight]);

  const onMouseMove = useCallback(
    (e) => mouseX.set(e.clientX),
    [mouseX]
  );

  const onMouseLeave = useCallback(
    () => mouseX.set(Infinity),
    [mouseX]
  );

  const handleThemeToggle = useCallback(
    (e) => {
      const nextLight = !isLight;

      const apply = () => {
        document.documentElement.classList.toggle(
          "light-theme",
          nextLight
        );
        document.body.classList.toggle("light-theme", nextLight);
        localStorage.setItem(
          "os-theme",
          nextLight ? "light" : "dark"
        );
        setIsLight(nextLight);
      };

      if (typeof document.startViewTransition !== "function") {
        apply();
        return;
      }

      const { clientX: x, clientY: y } = e;
      const r = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const transition = document.startViewTransition(apply);

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${r}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: 440,
              easing: "cubic-bezier(0.22,1,0.36,1)",
              pseudoElement: "::view-transition-new(root)",
            }
          );
        })
        .catch(() => { });
    },
    [isLight]
  );

  const shared = {
    windows,
    toggleWindow,
    bringToFront,
    mouseX,
  };

  return (
    <div className="absolute bottom-3 left-1/2 z-[99999] -translate-x-1/2 pointer-events-auto">
      <motion.div
        ref={dockRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ y: 110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 25,
          delay: 0.08,
        }}
        className="
          relative flex items-end gap-1.5
          rounded-[18px]
          border border-[var(--dock-border)]
          bg-[var(--dock-bg)]
          px-3 pb-1.5 pt-2
          shadow-[0_18px_45px_var(--dock-shadow)]
          transition-colors duration-300
        "
        style={{
          // Solid surfaces only — no gradients or transparency.
          "--dock-bg": isLight ? "#f7f7f7" : "#1c1c1e",
          "--dock-border": isLight ? "#d9d9d9" : "#353537",
          "--dock-shadow": isLight
            ? "rgba(0,0,0,0.16)"
            : "rgba(0,0,0,0.42)",
          "--dock-icon-bg": isLight ? "#ededed" : "#29292b",
          "--dock-icon-fg": isLight ? "#171717" : "#f5f5f5",
          "--dock-icon-border": isLight ? "#d5d5d5" : "#3b3b3d",
          "--dock-icon-shadow": isLight
            ? "rgba(0,0,0,0.08)"
            : "rgba(0,0,0,0.28)",
          "--dock-separator": isLight ? "#cfcfcf" : "#414143",
          "--dock-dot": isLight ? "#161616" : "#f2f2f2",
          "--dock-tooltip-bg": isLight ? "#ffffff" : "#252527",
          "--dock-tooltip-fg": isLight ? "#161616" : "#f5f5f5",
          "--dock-tooltip-border": isLight ? "#dedede" : "#3a3a3c",
          "--dock-tooltip-shadow": isLight
            ? "rgba(0,0,0,0.14)"
            : "rgba(0,0,0,0.35)",
          "--badge-bg": isLight ? "#1d1d1f" : "#f5f5f5",
          "--badge-fg": isLight ? "#ffffff" : "#171717",
          "--badge-border": isLight ? "#ffffff" : "#1d1d1f",
          "--badge-shadow": isLight
            ? "rgba(0,0,0,0.14)"
            : "rgba(0,0,0,0.28)",
        }}
      >
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") {
            return <Sep key={item.id} />;
          }

          return <DockIcon key={item.id} {...item} {...shared} />;
        })}

        <Sep />

        <ThemeButton
          isLight={isLight}
          onToggle={handleThemeToggle}
          mouseX={mouseX}
        />
      </motion.div>
    </div>
  );
}
