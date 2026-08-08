import { useState, useEffect, useRef, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

import About from "../assets/images/About.png";
import Contact from "../assets/images/Contact.png";
import Notes from "../assets/images/Notes.png";
import Projects from "../assets/images/Projects.png";
import Resume from "../assets/images/Resume.png";
import Terminal from "../assets/images/Terminal.png";

// ─── physics ────────────────────────────────────────────
const DOCK_ICON_SIZE = 39;   // resting px  (was 52, –25%)
const DOCK_ICON_MAX = 60;   // peak magnified px (was 80, –25%)
const MAGNIFY_RADIUS = 98;   // influence zone px (was 130, –25%)
const SPRING = { stiffness: 350, damping: 28, mass: 0.55 };

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
  const rawY = useTransform(dist, [0, MAGNIFY_RADIUS], [-14, 0], { clamp: true });

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

// ─── glass shell shared by every icon ───────────────────
function IconShell({ id, size, children }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.27),
        background: iconBg(id),
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.22)",
        flexShrink: 0,
      }}
    >
      {/* top gloss */}
      <span
        style={{
          position: "absolute",
          inset: "0 0 auto 0",
          height: "52%",
          background: "linear-gradient(180deg,rgba(255,255,255,0.18) 0%,rgba(255,255,255,0) 100%)",
          borderRadius: `${Math.round(size * 0.27)}px ${Math.round(size * 0.27)}px 0 0`,
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
          initial={{ opacity: 0, y: 6, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 4, scale: 0.92 }}
          transition={{ duration: 0.13, ease: "easeOut" }}
          style={{
            position: "absolute",
            bottom: "calc(100% + 10px)",
            left: "50%",
            transform: "translateX(-50%)",
            whiteSpace: "nowrap",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            color: "rgba(255,255,255,0.92)",
            background: "rgba(22,22,26,0.88)",
            border: "1px solid rgba(255,255,255,0.13)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            padding: "5px 11px",
            borderRadius: 9,
            pointerEvents: "none",
            zIndex: 99999,
            boxShadow: "0 4px 18px rgba(0,0,0,0.32)",
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
    <div style={{ height: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={isMinimized ? "min" : "open"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: isMinimized ? 0.38 : 0.82 }}
            exit  = {{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.18 }}
            style={{
              width: isMinimized ? 3 : 4,
              height: isMinimized ? 3 : 4,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.9)",
              boxShadow: isMinimized ? "none" : "0 0 6px 1px rgba(255,255,255,0.55)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── DockIcon ────────────────────────────────────────────
function DockIcon({ id, image, label, badge, windows, toggleWindow, bringToFront, mouseX }) {
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
    setTimeout(() => setTapping(false), 500);

    if (!isOpen) { toggleWindow(id, "isOpen", true); bringToFront(id); return; }
    if (isMinimized) { toggleWindow(id, "isMinimized", false); bringToFront(id); return; }

    const activeWins = windows.filter((w) => w.type === "window" && w.isOpen && !w.isMinimized);
    const maxZ = Math.max(...activeWins.map((w) => w.zIndex ?? 0), 0);
    win.zIndex === maxZ ? toggleWindow(id, "isMinimized", true) : bringToFront(id);
  }, [win, isOpen, isMinimized, windows, id, toggleWindow, bringToFront]);

  // bounce animation when opening
  const bounceVariants = {
    idle: { y: 0 },
    tapping: {
      y: [0, -18, 0, -10, 0, -5, 0],
      transition: { duration: 0.52, ease: "easeOut" },
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
        whileTap={{ scale: 0.86, transition: { type: "spring", stiffness: 500, damping: 20 } }}
        onClick={handleClick}
        aria-label={label}
      >
        <IconShell id={id} size={iconPx}>
          <img
            src={image}
            alt={label}
            draggable={false}
            style={{ width: iconPx * 0.70, height: iconPx * 0.70, objectFit: "contain", pointerEvents: "none", userSelect: "none" }}
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
                minWidth: 18, height: 18, padding: "0 4px",
                background: "#FF3B30",
                color: "#fff", fontSize: 10, fontWeight: 700,
                borderRadius: 999,
                display: "flex", alignItems: "center", justifyContent: "center",
                border: "2px solid rgba(0,0,0,0.45)",
                boxShadow: "0 2px 8px rgba(255,59,48,0.6)",
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
        whileTap={{ scale: 0.86, transition: { type: "spring", stiffness: 500, damping: 20 } }}
        onClick={onToggle}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        <IconShell id="theme" size={iconPx}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLight ? "moon" : "sun"}
              initial={{ opacity: 0, rotate: -40, scale: 0.55 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit=   {{ opacity: 0, rotate: 40, scale: 0.55 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ display: "flex" }}
            >
              {isLight ? (
                <Moon size={20} strokeWidth={1.7} color="rgba(180,170,255,0.95)" />
              ) : (
                <Sun size={20} strokeWidth={1.7} color="rgba(255,220,80,0.95)" />
              )}
            </motion.div>
          </AnimatePresence>
        </IconShell>
      </motion.button>

      {/* spacer to match RunningDot height */}
      <div style={{ height: 8 }} />
    </div>
  );
}

// ─── Separator ───────────────────────────────────────────
function Sep() {
  return (
    <div
      style={{
        width: 1,
        height: 27,
        margin: "0 5px 9px",
        background: "linear-gradient(180deg,transparent,rgba(255,255,255,0.22),transparent)",
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

  // init theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const prefLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const light = saved ? saved === "light" : prefLight;
    setIsLight(light);
    document.documentElement.classList.toggle("light-theme", light);
    document.body.classList.toggle("light-theme", light);
  }, []);

  // mouse tracking
  const onMouseMove = useCallback((e) => mouseX.set(e.clientX), [mouseX]);
  const onMouseLeave = useCallback(() => mouseX.set(Infinity), [mouseX]);

  // theme toggle with view-transition ripple
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
        bottom: 16,
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
          padding: "8px 10px 8px",
          gap: 4,
          borderRadius: 24,
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.20)",
          backdropFilter: "blur(44px) saturate(200%)",
          WebkitBackdropFilter: "blur(44px) saturate(200%)",
          boxShadow: [
            "0 28px 64px rgba(0,0,0,0.40)",
            "0 8px 20px rgba(0,0,0,0.22)",
            "inset 0 2px 0 rgba(255,255,255,0.18)",
            "inset 0 -1px 0 rgba(0,0,0,0.15)",
          ].join(", "),
        }}
      >
        {/* top-edge gloss line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 24,
            right: 24,
            height: 1,
            background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)",
            borderRadius: 999,
            pointerEvents: "none",
          }}
        />

        <DockIcon id="about" image={About} label="About Me"  {...shared} />
        <DockIcon id="projects" image={Projects} label="Projects"  {...shared} />
        <DockIcon id="resume" image={Resume} label="Resume"    {...shared} />
        <DockIcon id="notepad" image={Notes} label="Notes"     {...shared} />
        <DockIcon id="contact" image={Contact} label="Contact"   {...shared} />

        <Sep />

        <DockIcon id="terminal" image={Terminal} label="Terminal"  {...shared} />

        <Sep />

        <ThemeButton isLight={isLight} onToggle={handleThemeToggle} mouseX={mouseX} />
      </motion.div>
    </div>
  );
}
