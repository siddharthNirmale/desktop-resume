import { useState, useEffect, useCallback, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { Sun, Moon, Eye, EyeOff, Check, Mail } from "lucide";
import {
  FiRotateCcw,
  FiCloud,
  FiClock,
  FiSliders,
  FiCpu,
  FiTarget,
  FiDownload,
  FiTerminal,
  FiX,
  FiLayers,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import resume from "../data/resume";

/* ==========================================================================
   CONSTANTS & CONFIG
   ========================================================================== */

const ACCENT_COLORS = [
  { id: "violet", value: "#BF5AF2", name: "Violet" },
  { id: "indigo", value: "#5E5CE6", name: "Indigo" },
  { id: "blue", value: "#0A84FF", name: "Blue" },
  { id: "green", value: "#30D158", name: "Green" },
  { id: "yellow", value: "#FFD60A", name: "Yellow" },
  { id: "orange", value: "#FF9F0A", name: "Orange" },
  { id: "red", value: "#FF453A", name: "Red" },
  { id: "graphite", value: "#8E8E93", name: "Graphite" },
];

const WIDGET_CONFIGS = [
  { id: "weather", name: "Weather", icon: FiCloud, desc: "Forecast" },
  { id: "clock", name: "Time", icon: FiClock, desc: "Clock & Timer" },
  { id: "theme", name: "Appearance", icon: FiSliders, desc: "Theme & Wallpaper" },
  { id: "skills", name: "Tech Stack", icon: FiCpu, desc: "Skills Matrix" },
  { id: "learning", name: "Focus Tracker", icon: FiTarget, desc: "Current Goal" },
  { id: "github", name: "Contributions", icon: FaGithub, desc: "Activity" },
];

/* ==========================================================================
   1. SYSTEM QUICK TOGGLE CARD
   ========================================================================== */

const QuickToggleCard = memo(function QuickToggleCard({
  icon,
  label,
  sublabel,
  onClick,
  isActive = false,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      className={`
        group relative flex flex-col items-center justify-center gap-1
        py-2 px-1.5 rounded-xl cursor-default text-center select-none outline-none
        transition-colors duration-150
        focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        ${
          isActive
            ? "bg-[var(--color-accent)]/[0.12] text-[var(--color-text)]"
            : "bg-[var(--color-surface-hover)]/30 hover:bg-[var(--color-surface-hover)]/65 text-[var(--color-text-secondary)]"
        }
      `}
    >
      <div
        className={`
          flex h-6 w-6 items-center justify-center rounded-lg transition-colors
          ${
            isActive
              ? "text-[var(--color-accent)]"
              : "text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)]"
          }
        `}
      >
        {icon}
      </div>
      <div className="flex flex-col items-center leading-none">
        <span className="text-[10.5px] font-semibold text-[var(--color-text)] truncate max-w-full">
          {label}
        </span>
        <span className="text-[8.5px] text-[var(--color-text-tertiary)] mt-0.5 truncate max-w-full">
          {sublabel}
        </span>
      </div>
    </motion.button>
  );
});

/* ==========================================================================
   2. DESKTOP WIDGET TOGGLE TILE
   ========================================================================== */

const WidgetTile = memo(function WidgetTile({
  item,
  isOpen,
  onToggle,
}) {
  const Icon = item.icon;

  return (
    <motion.button
      type="button"
      onClick={() => onToggle(item.id)}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
      className={`
        flex items-center gap-2 p-2 rounded-xl text-left select-none outline-none
        transition-colors duration-150 cursor-default group min-w-0
        focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        ${
          isOpen
            ? "bg-[var(--color-accent)]/[0.08] hover:bg-[var(--color-accent)]/[0.12] text-[var(--color-text)]"
            : "bg-[var(--color-surface-hover)]/25 hover:bg-[var(--color-surface-hover)]/60 text-[var(--color-text-secondary)]"
        }
      `}
    >
      <div
        className={`
          flex h-6 w-6 shrink-0 items-center justify-center rounded-lg transition-colors
          ${
            isOpen
              ? "bg-[var(--color-accent)] text-white shadow-xs"
              : "bg-[var(--color-surface-hover)]/60 text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text)]"
          }
        `}
      >
        <Icon size={12} strokeWidth={2.2} />
      </div>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-medium leading-none truncate block">
          {item.name}
        </span>
        <span className="text-[8.5px] text-[var(--color-text-tertiary)] leading-none truncate block mt-1">
          {isOpen ? "Active" : "Hidden"}
        </span>
      </div>
    </motion.button>
  );
});

/* ==========================================================================
   MAIN CONTROL CENTER
   ========================================================================== */

export default function ControlCenter({
  isOpen,
  onClose,
  windows = [],
  toggleWindow,
  toggleWidget,
  minimizeAll,
  restoreAll,
  resetLayout,
  bringToFront,
}) {
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Theme Sync
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("os-theme");
    if (saved) return saved === "light";
    return document.documentElement.classList.contains("light-theme");
  });

  // Accent Sync
  const [activeAccentId, setActiveAccentId] = useState(() => {
    if (typeof window === "undefined") return "violet";
    const saved = localStorage.getItem("os-accent");
    return (
      ACCENT_COLORS.find(
        (c) =>
          c.value.toLowerCase() === saved?.toLowerCase() ||
          c.id.toLowerCase() === saved?.toLowerCase()
      )?.id ?? "violet"
    );
  });

  // Watch external theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const activeIsLight =
        document.documentElement.classList.contains("light-theme") ||
        document.body.classList.contains("light-theme");
      setIsLight(activeIsLight);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Watch external accent changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentAccent =
        document.documentElement.style.getPropertyValue("--color-accent")?.trim();
      if (currentAccent) {
        const found = ACCENT_COLORS.find(
          (c) => c.value.toLowerCase() === currentAccent.toLowerCase()
        );
        if (found) setActiveAccentId(found.id);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, []);

  // Theme Toggle with circular clip-path transition
  const handleThemeToggle = useCallback(
    (event) => {
      const nextLight = !isLight;

      const applyTheme = () => {
        document.documentElement.classList.toggle("light-theme", nextLight);
        document.body.classList.toggle("light-theme", nextLight);
        localStorage.setItem("os-theme", nextLight ? "light" : "dark");
        setIsLight(nextLight);
      };

      const reducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        reducedMotion ||
        typeof document.startViewTransition !== "function"
      ) {
        applyTheme();
        return;
      }

      const x = event?.clientX ?? window.innerWidth / 2;
      const y = event?.clientY ?? window.innerHeight / 2;
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
    [isLight]
  );

  // Accent change handler
  const handleAccentChange = useCallback((colorId, colorValue) => {
    setActiveAccentId(colorId);
    document.documentElement.style.setProperty("--color-accent", colorValue);
    localStorage.setItem("os-accent", colorValue);
  }, []);

  const handleCopyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText("siddharth175nirmale1@gmail.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  }, []);

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.href = resume;
    link.setAttribute("download", "Siddharth_Nirmale_Resume.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  const handleOpenTerminal = useCallback(() => {
    toggleWindow("terminal", "isOpen", true);
    toggleWindow("terminal", "isMinimized", false);
    bringToFront("terminal");
    onClose?.();
  }, [toggleWindow, bringToFront, onClose]);

  // Compute active states for windows & widgets
  const openWindows = useMemo(
    () => windows.filter((w) => w.type === "window" && w.isOpen),
    [windows]
  );

  const allWindowsMinimized = useMemo(
    () => openWindows.length > 0 && openWindows.every((w) => w.isMinimized),
    [openWindows]
  );

  const activeWidgetsCount = useMemo(
    () => windows.filter((w) => w.type === "widget" && w.isOpen).length,
    [windows]
  );

  const currentAccentObj =
    ACCENT_COLORS.find((c) => c.id === activeAccentId) || ACCENT_COLORS[0];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[999999] pointer-events-auto"
        onClick={onClose}
      >
        {/* Transparent backdrop capture */}
        <div className="absolute inset-0 bg-transparent" />

        {/* Popover Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -6 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -6 }}
          transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="
            absolute top-[calc(var(--topbar-height,26px)+8px)] right-3 sm:right-6
            w-[320px] sm:w-[340px] max-w-[calc(100vw-24px)]
            bg-[var(--color-surface-elevated)]/90 backdrop-blur-2xl
            rounded-2xl shadow-[var(--shadow-popover)]
            overflow-hidden font-primary select-none
            text-[var(--color-text)]
          "
        >
          {/* ═══════════════════════════════════════
              HEADER
          ═══════════════════════════════════════ */}
          <div className="flex items-center justify-between px-3.5 pt-3 pb-2">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-[var(--color-accent)]/15 text-[var(--color-accent)]">
                <FiSliders size={11} strokeWidth={2.2} />
              </div>
              <span className="text-[12px] font-heading font-semibold tracking-tight text-[var(--color-text)]">
                Control Center
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="flex h-6 w-6 items-center justify-center rounded-md text-[var(--color-text-tertiary)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)] transition-colors"
              title="Close"
            >
              <FiX size={13} strokeWidth={2} />
            </button>
          </div>

          <div className="p-3 pt-0 space-y-3 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
            {/* ═══════════════════════════════════════
                1. PRIMARY SYSTEM QUICK TOGGLES
            ═══════════════════════════════════════ */}
            <div className="grid grid-cols-3 gap-1.5">
              {/* Appearance Mode */}
              <QuickToggleCard
                icon={
                  <MorphIcon
                    icon={isLight ? Moon : Sun}
                    size={14}
                    strokeWidth={2}
                    spring="snappy"
                  />
                }
                label={isLight ? "Dark" : "Light"}
                sublabel="Mode"
                onClick={handleThemeToggle}
                isActive={false}
              />

              {/* Show Desktop / Windows */}
              <QuickToggleCard
                icon={
                  <MorphIcon
                    icon={allWindowsMinimized ? EyeOff : Eye}
                    size={14}
                    strokeWidth={2}
                    spring="snappy"
                  />
                }
                label={allWindowsMinimized ? "Windows" : "Desktop"}
                sublabel="Toggle"
                onClick={allWindowsMinimized ? restoreAll : minimizeAll}
                isActive={allWindowsMinimized}
              />

              {/* Reset Layout */}
              <QuickToggleCard
                icon={<FiRotateCcw size={13} />}
                label="Layout"
                sublabel="Reset"
                onClick={resetLayout}
                isActive={false}
              />
            </div>

            {/* ═══════════════════════════════════════
                2. ACCENT COLOR SELECTOR
            ═══════════════════════════════════════ */}
            <div className="p-2.5 rounded-xl bg-[var(--color-surface-hover)]/20 space-y-2">
              <div className="flex items-center justify-between px-0.5">
                <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] leading-none">
                  Accent Color
                </span>
                <span className="text-[10px] font-medium text-[var(--color-text-secondary)] leading-none capitalize">
                  {currentAccentObj.name}
                </span>
              </div>

              <div className="flex items-center justify-between px-0.5">
                {ACCENT_COLORS.map((color) => {
                  const isSelected = activeAccentId === color.id;
                  return (
                    <motion.button
                      key={color.id}
                      type="button"
                      onClick={() => handleAccentChange(color.id, color.value)}
                      style={{ backgroundColor: color.value }}
                      title={color.name}
                      whileHover={{ scale: 1.15, y: -1 }}
                      whileTap={{ scale: 0.9 }}
                      transition={{ type: "spring", stiffness: 520, damping: 26 }}
                      className={`
                        relative flex h-5 w-5 items-center justify-center rounded-full
                        cursor-default outline-none select-none transition-all duration-150
                        ${
                          isSelected
                            ? "ring-2 ring-[var(--color-text)] ring-offset-2 ring-offset-[var(--color-surface)] scale-105"
                            : "opacity-80 hover:opacity-100"
                        }
                      `}
                    >
                      <span className="pointer-events-none absolute inset-x-0 top-0 h-[40%] rounded-t-full bg-white/20" />
                      <AnimatePresence>
                        {isSelected && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="flex items-center justify-center text-white"
                          >
                            <MorphIcon
                              icon={Check}
                              size={9}
                              strokeWidth={3.8}
                              spring="snappy"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* ═══════════════════════════════════════
                3. DESKTOP WIDGETS MANAGER
            ═══════════════════════════════════════ */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-1.5">
                  <FiLayers size={11} className="text-[var(--color-text-tertiary)]" />
                  <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] leading-none">
                    Desktop Widgets
                  </span>
                </div>
                <span className="text-[9px] font-medium text-[var(--color-text-disabled)] leading-none">
                  {activeWidgetsCount} of {WIDGET_CONFIGS.length} active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-1.5">
                {WIDGET_CONFIGS.map((item) => {
                  const widgetObj = windows.find((w) => w.id === item.id);
                  const isWidgetOpen = Boolean(widgetObj?.isOpen);

                  return (
                    <WidgetTile
                      key={item.id}
                      item={item}
                      isOpen={isWidgetOpen}
                      onToggle={toggleWidget}
                    />
                  );
                })}
              </div>
            </div>

            {/* ═══════════════════════════════════════
                4. QUICK ACTIONS & RESUME
            ═══════════════════════════════════════ */}
            <div className="pt-2 border-t border-[var(--color-surface-border)]/40 flex items-center gap-1.5">
              <motion.button
                type="button"
                onClick={handleDownloadResume}
                whileTap={{ scale: 0.97 }}
                className="
                  flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg
                  bg-[var(--color-accent)] text-white text-[11px] font-semibold
                  hover:brightness-105 transition-all cursor-default select-none outline-none
                "
              >
                <FiDownload size={12} strokeWidth={2.2} />
                <span>Resume PDF</span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleCopyEmail}
                title="Copy email address"
                whileTap={{ scale: 0.97 }}
                className="
                  flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg
                  bg-[var(--color-surface-hover)]/30 hover:bg-[var(--color-surface-hover)]/70
                  text-[var(--color-text)] text-[11px] font-medium transition-all
                  cursor-default select-none outline-none
                "
              >
                <MorphIcon
                  icon={copiedEmail ? Check : Mail}
                  size={11}
                  strokeWidth={2.2}
                  spring="snappy"
                  className={copiedEmail ? "text-emerald-400" : "text-[var(--color-text-tertiary)]"}
                />
                <span className={copiedEmail ? "text-emerald-400 font-semibold" : ""}>
                  {copiedEmail ? "Copied" : "Email"}
                </span>
              </motion.button>

              <motion.button
                type="button"
                onClick={handleOpenTerminal}
                title="Open Terminal shell"
                whileTap={{ scale: 0.97 }}
                className="
                  flex items-center justify-center p-1.5 rounded-lg
                  bg-[var(--color-surface-hover)]/30 hover:bg-[var(--color-surface-hover)]/70
                  text-[var(--color-text-secondary)] hover:text-[var(--color-text)]
                  transition-all cursor-default select-none outline-none
                "
              >
                <FiTerminal size={13} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
