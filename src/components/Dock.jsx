import { useState, useEffect, useRef, useCallback } from "react";
import {
  Sun,
  Moon,
  User,
  Briefcase,
  FileText,
  SquarePen,
  Mail,
  Terminal
} from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

// ─── Apple-Tuned Physics ────────────────────────────────
const DOCK_ICON_SIZE = 42;
const DOCK_ICON_MAX = 64;
const MAGNIFY_RADIUS = 110;
const SPRING = { stiffness: 400, damping: 32, mass: 0.8 };

// ─── per-icon magnification hook ────────────────────────
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
  const rawY = useTransform(dist, [0, MAGNIFY_RADIUS], [-10, 0], { clamp: true });

  return {
    scale: useSpring(rawScale, SPRING),
    y: useSpring(rawY, SPRING),
  };
}

// ─── icon gradient palette ───────────────────────────────
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

// ─── Glass shell shared by every icon ───────────────────
function IconShell({ id, size, children }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "22.5%",
        background: iconBg(id),
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25), inset 0 1px 1px rgba(255,255,255,0.4)",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "50%",
          background: "linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0) 100%)",
          pointerEvents: "none",
        }}
      />
      {children}
    </div>
  );
}

// ─── tooltip ────────────────────────────────────────────
function Tooltip({ label, visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.span
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 5, scale: 0.95 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 14px)",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.2px",
            color: "rgba(255,255,255,0.95)",
            background: "rgba(30, 30, 30, 0.75)",
            border: "0.5px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            padding: "6px 12px",
            borderRadius: 6,
            pointerEvents: "none",
            zIndex: 99999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
        >
          {label}
        </motion.span>
      )}
    </AnimatePresence>
  );
}

// ─── running dot ────────────────────────────────────────
function RunningDot({ isOpen, isMinimized }) {
  return (
    <div style={{ height: 8, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 4 }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={isMinimized ? "min" : "open"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isMinimized ? 0.4 : 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: "#e5e5e5",
              boxShadow: isMinimized ? "none" : "0 0 4px rgba(255,255,255,0.5)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── DockIcon ────────────────────────────────────────────
// Note: Changed `image` to `icon: IconComponent`
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
      transition: {
        duration: 0.7,
        times: [0, 0.3, 0.55, 0.8, 1],
        ease: ["easeOut", "easeIn", "easeOut", "easeIn"]
      },
    },
  };

  const iconPx = DOCK_ICON_SIZE;

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: iconPx + 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip label={label} visible={hovered} />

      <motion.button
        type="button"
        style={{ scale, y, background: "none", border: "none", padding: 0, cursor: "pointer", outline: "none", display: "flex", flexDirection: "column", alignItems: "center" }}
        variants={bounceVariants}
        animate={tapping ? "tapping" : "idle"}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={handleClick}
        aria-label={label}
      >
        <IconShell id={id} size={iconPx}>
          {/* Using Lucide React Icons here */}
          <IconComponent
            size={iconPx * 0.55}
            color="rgba(255,255,255,0.9)"
            strokeWidth={1.8}
          />
        </IconShell>

        {/* badge */}
        <AnimatePresence>
          {badge > 0 && (
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.3, opacity: 0 }}
              style={{
                position: "absolute", top: -4, right: -2,
                minWidth: 20, height: 20, padding: "0 6px",
                background: "#FF3B30",
                color: "#fff", fontSize: 11, fontWeight: 600,
                borderRadius: 999,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid rgba(0,0,0,0.1)",
                boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
                zIndex: 10,
              }}
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

// ─── ThemeButton ─────────────────────────────────────────
function ThemeButton({ isLight, onToggle, mouseX }) {
  const ref = useRef(null);
  const { scale, y } = useMagnify(mouseX, ref);
  const [hovered, setHovered] = useState(false);
  const iconPx = DOCK_ICON_SIZE;

  return (
    <div
      ref={ref}
      style={{ position: "relative", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", width: iconPx + 20 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip label={isLight ? "Dark Mode" : "Light Mode"} visible={hovered} />

      <motion.button
        type="button"
        style={{ scale, y, background: "none", border: "none", padding: 0, cursor: "pointer", outline: "none" }}
        whileTap={{ scale: 0.9, transition: { duration: 0.1 } }}
        onClick={onToggle}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <IconShell id="theme" size={iconPx}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLight ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -40, scale: 0.55 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 40, scale: 0.55 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ display: "flex" }}
            >
              {isLight ? (
                <Moon size={iconPx * 0.55} strokeWidth={1.8} color="rgba(255,255,255,0.9)" />
              ) : (
                <Sun size={iconPx * 0.55} strokeWidth={1.8} color="rgba(255,220,80,0.95)" />
              )}
            </motion.div>
          </AnimatePresence>
        </IconShell>
      </motion.button>

      <div style={{ height: 12 }} />
    </div>
  );
}

// ─── Separator ───────────────────────────────────────────
function Sep() {
  return (
    <div
      style={{
        width: 1,
        height: 32,
        margin: "0 8px 14px",
        background: "rgba(255,255,255,0.15)",
        flexShrink: 0,
        alignSelf: "flex-end",
      }}
    />
  );
}

// ─── Dock ─────────────────────────────────────────────────
export default function Dock({ windows, toggleWindow, bringToFront }) {
  const [isLight, setIsLight] = useState(false);
  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const light = saved ? saved === "light" : prefLight;
    setIsLight(light);
    document.documentElement.classList.toggle("light-theme", light);
    document.body.classList.toggle("light-theme", light);
  }, []);

  const onMouseMove = useCallback((e) => mouseX.set(e.clientX), [mouseX]);
  const onMouseLeave = useCallback((e) => mouseX.set(Infinity), [mouseX]);

  const handleThemeToggle = useCallback((e) => {
    const nextLight = !isLight;

    const apply = () => {
      document.documentElement.classList.toggle("light-theme", nextLight);
      document.body.classList.toggle("light-theme", nextLight);
      localStorage.setItem("theme", nextLight ? "light" : "dark");
      setIsLight(nextLight);
    };

    if (typeof document.startViewTransition !== "function") { apply(); return; }

    const { clientX: x, clientY: y } = e;
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
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
    <div
      style={{
        position: "absolute",
        bottom: 12,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 99999,
        pointerEvents: "auto",
      }}
    >
      <motion.div
        ref={dockRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{ y: 110, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 25, delay: 0.08 }}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          padding: "8px 12px 6px",
          gap: 6,
          borderRadius: 24,
          background: "rgba(255, 255, 255, 0.08)",
          border: "0.5px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(50px) saturate(180%)",
          WebkitBackdropFilter: "blur(50px) saturate(180%)",
          boxShadow: "0 30px 60px rgba(0,0,0,0.3), 0 10px 20px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)",
        }}
      >
        {/* Pass the Lucide component directly via the `icon` prop */}
        <DockIcon id="about" icon={User} label="About Me"  {...shared} />
        <DockIcon id="projects" icon={Briefcase} label="Projects"  {...shared} />
        <DockIcon id="resume" icon={FileText} label="Resume"    {...shared} />
        <DockIcon id="notepad" icon={SquarePen} label="Notes"     {...shared} />
        <DockIcon id="contact" icon={Mail} label="Contact"   {...shared} />

        <Sep />

        <DockIcon id="terminal" icon={Terminal} label="Terminal"  {...shared} />

        <Sep />

        <ThemeButton isLight={isLight} onToggle={handleThemeToggle} mouseX={mouseX} />
      </motion.div>
    </div>
  );
}
