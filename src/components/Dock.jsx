import { useState, useEffect, useRef, useCallback } from "react";
import { Sun, Moon, User, Briefcase, FileText, SquarePen, Mail, Terminal } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ─── Apple-Tuned Physics ────────────────────────────────
const DOCK_ICON_SIZE = 42;
const DOCK_ICON_MAX = 64;
const MAGNIFY_RADIUS = 110;
const SPRING = { stiffness: 400, damping: 32, mass: 0.8 };

// ─── Dock Configuration ─────────────────────────────────
const DOCK_ITEMS = [
  { id: "about", icon: User, label: "About Me" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "resume", icon: FileText, label: "Resume" },
  { id: "notepad", icon: SquarePen, label: "Notes" },
  { id: "contact", icon: Mail, label: "Contact" },
  { id: "sep1", type: "separator" },
  { id: "terminal", icon: Terminal, label: "Terminal" },
];

const ICON_GRADIENTS = {
  about: ["#2a2a72", "#009ffd"],
  projects: ["#f7971e", "#ffd200"],
  resume: ["#c94b4b", "#4b134f"],
  notepad: ["#f5af19", "#f12711"],
  contact: ["#11998e", "#38ef7d"],
  terminal: ["#1a1a1a", "#363636"],
  theme: ["#283048", "#859398"],
};

function iconBg(id) {
  const [a, b] = ICON_GRADIENTS[id] ?? ["#333", "#666"];
  return `linear-gradient(145deg, ${a}, ${b})`;
}

// ─── Custom Hooks ───────────────────────────────────────
function useMagnify(mouseX, ref) {
  const dist = useMotionValue(Infinity);

  useEffect(() => {
    return mouseX.on("change", (mx) => {
      if (!ref.current) return;
      const { left, width } = ref.current.getBoundingClientRect();
      dist.set(Math.abs(mx - (left + width / 2)));
    });
  }, [mouseX, ref, dist]);

  const rawScale = useTransform(dist, [0, MAGNIFY_RADIUS], [DOCK_ICON_MAX / DOCK_ICON_SIZE, 1], { clamp: true });
  const rawY = useTransform(dist, [0, MAGNIFY_RADIUS], [-10, 0], { clamp: true });

  return {
    scale: useSpring(rawScale, SPRING),
    y: useSpring(rawY, SPRING),
  };
}

// ─── Shared UI Components ───────────────────────────────
function IconShell({ id, size, children }) {
  return (
    <div
      className="relative flex shrink-0 items-center justify-center overflow-hidden border border-white/20 shadow-[0_10px_20px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.4)]"
      style={{ width: size, height: size, borderRadius: "22.5%", background: iconBg(id) }}
    >
      <span className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/25 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}

function Tooltip({ label, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="
            absolute bottom-[calc(100%+14px)] left-1/2 -translate-x-1/2
            whitespace-nowrap px-3 py-1.5 rounded-md pointer-events-none z-[99999]
            font-primary text-[13px] tracking-wide text-white/95
            bg-[#1e1e1e]/75 backdrop-blur-xl border border-white/15 shadow-lg
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
    <div className="flex h-2 items-center justify-center mt-1">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={isMinimized ? "min" : "open"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isMinimized ? 0.4 : 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={`w-1 h-1 rounded-full bg-[#e5e5e5] ${!isMinimized ? "shadow-[0_0_4px_rgba(255,255,255,0.5)]" : ""}`}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function Sep() {
  return <div className="w-[1px] h-8 mx-2 mb-3.5 bg-white/15 shrink-0 self-end" />;
}

// ─── DockIcon ───────────────────────────────────────────
function DockIcon({ id, icon: IconComponent, label, badge, windows, toggleWindow, bringToFront, mouseX }) {
  const ref = useRef(null);
  const { scale, y } = useMagnify(mouseX, ref);
  const [hovered, setHovered] = useState(false);
  const [tapping, setTapping] = useState(false);

  const win = windows?.find((w) => w.id === id);
  const isOpen = win?.isOpen;
  const isMinimized = win?.isMinimized;

  if (win?.type === "widget") return null;

  const handleClick = useCallback(() => {
    if (!win) return;
    setTapping(true);
    setTimeout(() => setTapping(false), 800);

    if (!isOpen) { toggleWindow(id, "isOpen", true); bringToFront(id); return; }
    if (isMinimized) { toggleWindow(id, "isMinimized", false); bringToFront(id); return; }

    const activeWins = windows.filter((w) => w.type === "window" && w.isOpen && !w.isMinimized);
    const maxZ = Math.max(...activeWins.map((w) => w.zIndex ?? 0), 0);
    win.zIndex === maxZ ? toggleWindow(id, "isMinimized", true) : bringToFront(id);
  }, [win, isOpen, isMinimized, windows, id, toggleWindow, bringToFront]);

  const bounceVariants = {
    idle: { y: 0 },
    tapping: {
      y: [0, -25, 0, -12, 0],
      transition: { duration: 0.7, times: [0, 0.3, 0.55, 0.8, 1], ease: ["easeOut", "easeIn", "easeOut", "easeIn"] },
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
        className="flex flex-col items-center bg-transparent border-none p-0 cursor-pointer outline-none"
        variants={bounceVariants}
        animate={tapping ? "tapping" : "idle"}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        aria-label={label}
        onClick={handleClick}
      >
        <IconShell id={id} size={DOCK_ICON_SIZE}>
          <IconComponent size={DOCK_ICON_SIZE * 0.55} color="rgba(255,255,255,0.9)" strokeWidth={1.8} />
        </IconShell>

        <AnimatePresence>
          {badge > 0 && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              className="absolute -top-1 -right-0.5 min-w-[20px] h-5 px-1.5 flex items-center justify-center rounded-full bg-[#FF3B30] text-white text-[11px] font-semibold border border-black/10 shadow-md z-10"
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

// ─── ThemeButton ────────────────────────────────────────
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
      <Tooltip label={isLight ? "Dark Mode" : "Light Mode"} visible={hovered} />

      <motion.button
        type="button"
        style={{ scale, y }}
        className="flex flex-col items-center bg-transparent border-none p-0 cursor-pointer outline-none"
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={onToggle}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <IconShell id="theme" size={DOCK_ICON_SIZE}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLight ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -40, scale: 0.55 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 40, scale: 0.55 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="flex"
            >
              {isLight ? (
                <Moon size={DOCK_ICON_SIZE * 0.55} strokeWidth={1.8} color="rgba(255,255,255,0.9)" />
              ) : (
                <Sun size={DOCK_ICON_SIZE * 0.55} strokeWidth={1.8} color="rgba(255,220,80,0.95)" />
              )}
            </motion.div>
          </AnimatePresence>
        </IconShell>
      </motion.button>

      <div className="h-3" />
    </div>
  );
}

// ─── Main Dock Component ────────────────────────────────
export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [isLight, setIsLight] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("os-theme");
    const prefLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const light = saved ? saved === "light" : prefLight;
    setIsLight(light);
    document.documentElement.classList.toggle("light-theme", light);
    document.body.classList.toggle("light-theme", light);
  }, []);

  const onMouseMove = useCallback((e) => mouseX.set(e.clientX), [mouseX]);
  const onMouseLeave = useCallback(() => mouseX.set(Infinity), [mouseX]);

  const handleThemeToggle = useCallback((e) => {
    const nextLight = !isLight;

    const apply = () => {
      document.documentElement.classList.toggle("light-theme", nextLight);
      document.body.classList.toggle("light-theme", nextLight);
      localStorage.setItem("os-theme", nextLight ? "light" : "dark");
      setIsLight(nextLight);
    };

    if (typeof document.startViewTransition !== "function") { apply(); return; }

    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const t = document.startViewTransition(apply);
    t.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 440, easing: "cubic-bezier(0.22,1,0.36,1)", pseudoElement: "::view-transition-new(root)" }
      );
    }).catch(() => { });
  }, [isLight]);

  const shared = { windows, toggleWindow, bringToFront, mouseX };

  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto">
      <motion.div
        ref={dockRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ y: 110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 25, delay: 0.08 }}
        className="
          relative flex items-end px-3 pt-2 pb-1.5 gap-1.5 rounded-[24px]
          bg-white/10 border border-white/15 backdrop-blur-2xl saturate-150
          shadow-[0_30px_60px_rgba(0,0,0,0.3),0_10px_20px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]
        "
      >
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") return <Sep key={item.id} />;
          return <DockIcon key={item.id} {...item} {...shared} />;
        })}
        <Sep />
        <ThemeButton isLight={isLight} onToggle={handleThemeToggle} mouseX={mouseX} />
      </motion.div>
    </div>
  );
}
