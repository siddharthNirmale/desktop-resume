import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MorphIcon } from "morphicons/react";
import { Sun, Moon, Check } from "lucide";
import { Sparkles } from "lucide-react";
import WidgetCover from "./WidgetCover";
import { generateThumbnail, preloadImage } from "../utils/imageUtils";
import one from "../assets/images/one.png";
import two from "../assets/images/two.jpg";
import three from "../assets/images/three.jpg";

/* ==========================================================================
   CONSTANTS
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

const WALLPAPERS = [
  { id: "default", url: "", name: "Default" },
  { id: "wp1", url: one, name: "Gray" },
  { id: "wp2", url: two, name: "Light" },
  { id: "wp3", url: three, name: "Dark" },
];

/* ==========================================================================
   1. APPLE SEGMENTED APPEARANCE TOGGLE
   ========================================================================== */

const AppearanceSegment = memo(function AppearanceSegment({
  isLight,
  onToggle,
}) {
  return (
    <div
      className="
        relative flex w-full items-center p-1 rounded-[10px]
        bg-[var(--color-surface-hover)]/40 select-none
      "
      role="radiogroup"
      aria-label="Appearance Mode"
      onPointerDown={(e) => e.stopPropagation()}
    >
      {/* Dark Button */}
      <button
        type="button"
        role="radio"
        aria-checked={!isLight}
        onClick={(e) => isLight && onToggle(false, e)}
        className="
          group relative flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3
          rounded-[8px] text-[11px] font-medium transition-colors duration-150
          cursor-default outline-none z-10
          focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        "
      >
        {!isLight && (
          <motion.div
            layoutId="appearance-active-pill"
            transition={{
              type: "spring",
              stiffness: 440,
              damping: 32,
              mass: 0.5,
            }}
            className="
              absolute inset-0 rounded-[8px]
              bg-[var(--color-surface)] shadow-xs
            "
          />
        )}
        <div
          className={`
            relative z-10 transition-colors duration-150
            ${!isLight ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]"}
          `}
        >
          <MorphIcon
            icon={Moon}
            size={13}
            strokeWidth={2.2}
            spring="snappy"
          />
        </div>
        <span
          className={`
            relative z-10 transition-colors duration-150 leading-none
            ${!isLight ? "text-[var(--color-text)] font-semibold" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]"}
          `}
        >
          Dark
        </span>
      </button>

      {/* Light Button */}
      <button
        type="button"
        role="radio"
        aria-checked={isLight}
        onClick={(e) => !isLight && onToggle(true, e)}
        className="
          group relative flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3
          rounded-[8px] text-[11px] font-medium transition-colors duration-150
          cursor-default outline-none z-10
          focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        "
      >
        {isLight && (
          <motion.div
            layoutId="appearance-active-pill"
            transition={{
              type: "spring",
              stiffness: 440,
              damping: 32,
              mass: 0.5,
            }}
            className="
              absolute inset-0 rounded-[8px]
              bg-[var(--color-surface)] shadow-xs
            "
          />
        )}
        <div
          className={`
            relative z-10 transition-colors duration-150
            ${isLight ? "text-[var(--color-accent)]" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]"}
          `}
        >
          <MorphIcon
            icon={Sun}
            size={13}
            strokeWidth={2.2}
            spring="snappy"
          />
        </div>
        <span
          className={`
            relative z-10 transition-colors duration-150 leading-none
            ${isLight ? "text-[var(--color-text)] font-semibold" : "text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-secondary)]"}
          `}
        >
          Light
        </span>
      </button>
    </div>
  );
});

/* ==========================================================================
   2. ACCENT COLOR SWATCH
   ========================================================================== */

const AccentSwatch = memo(function AccentSwatch({
  color,
  isSelected,
  onSelect,
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(color.id, color.value)}
      aria-label={`Select ${color.name} accent`}
      aria-pressed={isSelected}
      title={color.name}
      style={{ backgroundColor: color.value }}
      whileHover={{ scale: 1.15, y: -1 }}
      whileTap={{ scale: 0.88 }}
      transition={{
        type: "spring",
        stiffness: 520,
        damping: 26,
      }}
      className={`
        relative flex h-[20px] w-[20px] shrink-0 items-center justify-center
        rounded-full cursor-default outline-none select-none
        transition-[box-shadow,opacity] duration-150
        focus-visible:ring-2 focus-visible:ring-[var(--color-text)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]
        ${
          isSelected
            ? "ring-2 ring-[var(--color-text)] ring-offset-2 ring-offset-[var(--color-surface)] opacity-100 scale-105"
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
            transition={{ duration: 0.12, ease: "easeOut" }}
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
});

/* ==========================================================================
   3. COMPACT WALLPAPER CARD
   ========================================================================== */

const CompactWallpaperCard = memo(function CompactWallpaperCard({
  wallpaper,
  isActive,
  onSelect,
  isApplying,
}) {
  const [thumbUrl, setThumbUrl] = useState(null);
  const [isLoaded, setIsLoaded] = useState(wallpaper.id === "default");

  useEffect(() => {
    if (wallpaper.id === "default") return;

    let mounted = true;
    generateThumbnail(wallpaper.url, 90).then((thumb) => {
      if (!mounted) return;
      setThumbUrl(thumb);
      setIsLoaded(true);
    });

    return () => {
      mounted = false;
    };
  }, [wallpaper.id, wallpaper.url]);

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(wallpaper)}
      disabled={isApplying}
      aria-label={`Apply ${wallpaper.name} wallpaper`}
      aria-pressed={isActive}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 460,
        damping: 28,
      }}
      className={`
        group relative flex flex-col items-center justify-between
        h-[48px] w-full min-w-0 overflow-hidden
        rounded-[8px] select-none cursor-default outline-none
        bg-[var(--color-surface-hover)]/30
        focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]
        focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]
        ${
          isActive
            ? "ring-2 ring-[var(--color-accent)] ring-offset-1.5 ring-offset-[var(--color-surface)]"
            : ""
        }
      `}
    >
      {/* Thumbnail background */}
      {wallpaper.id === "default" ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-zinc-800/90 via-zinc-900 to-black/95">
          <Sparkles
            size={11}
            className="text-[var(--color-accent)] transition-transform duration-200 group-hover:scale-110"
          />
        </div>
      ) : (
        <>
          {thumbUrl && isLoaded ? (
            <img
              src={thumbUrl}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-108"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20" />
          )}
          <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-colors" />
        </>
      )}

      {/* Active Check Indicator */}
      <AnimatePresence>
        {isActive && !isApplying && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="
              absolute top-1 right-1 z-10 flex h-3.5 w-3.5
              items-center justify-center rounded-full
              bg-[var(--color-accent)] text-white shadow-xs
            "
          >
            <MorphIcon
              icon={Check}
              size={8}
              strokeWidth={4}
              spring="snappy"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Label bar */}
      <div className="absolute inset-x-0 bottom-0 z-10 px-0.5 py-0.5 bg-black/55 backdrop-blur-[2px] text-center">
        <span className="block truncate text-[8px] font-medium text-white leading-tight">
          {wallpaper.name}
        </span>
      </div>
    </motion.button>
  );
});

/* ==========================================================================
   4. SECTION HEADER HELPER
   ========================================================================== */

function SectionHeader({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between px-0.5">
      <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.08em] text-[var(--color-text-tertiary)] leading-none">
        {title}
      </span>
      {subtitle && (
        <span className="text-[10px] font-medium text-[var(--color-text-secondary)] leading-none capitalize">
          {subtitle}
        </span>
      )}
    </div>
  );
}

/* ==========================================================================
   MAIN APPEARANCE WIDGET
   ========================================================================== */

export default function ThemeWidget({
  constraintsRef,
  zIndex,
  onFocus,
  onClose,
  setWallpaper,
  positionStyle,
}) {
  // Theme Mode (Light / Dark)
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("os-theme");
    if (saved) return saved === "light";
    return document.documentElement.classList.contains("light-theme");
  });

  // Accent Color
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

  // Active Wallpaper URL
  const [activeWallpaperUrl, setActiveWallpaperUrl] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("os-wallpaper") || "";
  });

  const [transitioning, setTransitioning] = useState(false);
  const [transitionWallpaper, setTransitionWallpaper] = useState(null);
  const [applyingWallpaperId, setApplyingWallpaperId] = useState(null);

  // Sync external theme changes
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

  // Sync external accent changes
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

  // Theme switch handler with circular clip-path transition effect
  const handleThemeToggle = useCallback(
    (nextLight, event) => {
      if (nextLight === isLight) return;

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

  // Wallpaper change handler with smooth crossfade
  const handleWallpaperSelect = useCallback(
    async (wallpaper) => {
      if (activeWallpaperUrl === wallpaper.url || transitioning) return;

      setApplyingWallpaperId(wallpaper.id);

      if (wallpaper.url) {
        await preloadImage(wallpaper.url);
      }

      setTransitionWallpaper(wallpaper.url);
      setTransitioning(true);

      setTimeout(() => {
        setWallpaper?.(wallpaper.url);
        setActiveWallpaperUrl(wallpaper.url);
        localStorage.setItem("os-wallpaper", wallpaper.url);
        setApplyingWallpaperId(null);
      }, 240);

      setTimeout(() => {
        setTransitioning(false);
        setTransitionWallpaper(null);
      }, 680);
    },
    [activeWallpaperUrl, transitioning, setWallpaper]
  );

  const currentAccentObj =
    ACCENT_COLORS.find((c) => c.id === activeAccentId) || ACCENT_COLORS[0];

  const currentWallpaperObj =
    WALLPAPERS.find((w) => w.url === activeWallpaperUrl) || WALLPAPERS[0];

  return (
    <>
      {/* ======================================================
          CINEMATIC WALLPAPER TRANSITION OVERLAY
      ======================================================= */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="absolute inset-[-5%] bg-black/20 backdrop-blur-[2px]" />
            <AnimatePresence mode="sync">
              {transitionWallpaper && (
                <motion.div
                  key={transitionWallpaper}
                  className="absolute inset-0"
                  style={{
                    background: `url(${transitionWallpaper}) center/cover no-repeat`,
                  }}
                  initial={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(8px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          WIDGET CONTAINER
      ======================================================= */}
      <WidgetCover
        id="theme"
        title="Appearance"
        zIndex={zIndex}
        onClose={onClose}
        onFocus={onFocus}
        constraintsRef={constraintsRef}
        positionStyle={positionStyle || { top: "280px", left: "18px" }}
      >
        <div className="flex flex-col gap-3 w-full">
          {/* 1. Theme Mode Switcher */}
          <AppearanceSegment
            isLight={isLight}
            onToggle={handleThemeToggle}
          />

          {/* Hairline Divider */}
          <div className="h-px w-full bg-[var(--color-surface-border)]/40" />

          {/* 2. Accent Color Section */}
          <div
            className="flex flex-col gap-1.5 w-full"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <SectionHeader
              title="Accent Color"
              subtitle={currentAccentObj.name}
            />

            <div className="flex items-center justify-between px-0.5">
              {ACCENT_COLORS.map((color) => (
                <AccentSwatch
                  key={color.id}
                  color={color}
                  isSelected={activeAccentId === color.id}
                  onSelect={handleAccentChange}
                />
              ))}
            </div>
          </div>

          {/* Hairline Divider */}
          <div className="h-px w-full bg-[var(--color-surface-border)]/40" />

          {/* 3. Wallpaper Collection Section (Direct Grid, NO Scroll) */}
          <div
            className="flex flex-col gap-1.5 w-full"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <SectionHeader
              title="Wallpaper"
              subtitle={currentWallpaperObj.name}
            />

            <div className="grid grid-cols-4 gap-1.5 w-full px-0.5">
              {WALLPAPERS.map((wp) => (
                <CompactWallpaperCard
                  key={wp.id}
                  wallpaper={wp}
                  isActive={
                    wp.url === activeWallpaperUrl ||
                    (!wp.url && !activeWallpaperUrl)
                  }
                  isApplying={applyingWallpaperId === wp.id}
                  onSelect={handleWallpaperSelect}
                />
              ))}
            </div>
          </div>
        </div>
      </WidgetCover>
    </>
  );
}
