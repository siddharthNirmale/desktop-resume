import { useState, useEffect, useCallback, memo } from "react";
import { RefreshCw, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import WidgetCover from "./WidgetCover";
import { generateThumbnail, preloadImage } from "../utils/imageUtils";
import one from "../assets/images/one.png";
import two from "../assets/images/two.jpg";
import three from "../assets/images/three.jpg";

// ============================================================
// CONSTANTS
// ============================================================
const WALLPAPERS = [
  { id: "default", url: "", name: "Default" },
  { id: "wp1", url: one, name: "Dark Forest" },
  { id: "wp2", url: two, name: "Abstract Blue" },
  { id: "wp3", url: three, name: "Neon Glitch" },
];

const ACCENT_COLORS = [
  { id: "blue", value: "#0A84FF", name: "Blue" },
  { id: "cyan", value: "#64D2FF", name: "Cyan" },
  { id: "emerald", value: "#30D158", name: "Emerald" },
  { id: "amber", value: "#FF9F0A", name: "Amber" },
  { id: "crimson", value: "#FF453A", name: "Crimson" },
  { id: "violet", value: "#BF5AF2", name: "Violet" },
];

// ============================================================
// WALLPAPER BUTTON
// ============================================================
const WallpaperButton = memo(({ wp, setWallpaper, onWallpaperTransition }) => {
  const [thumbUrl, setThumbUrl] = useState(null);
  const [loading, setLoading] = useState(wp.id !== "default");
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (wp.id === "default") return;
    let mounted = true;
    generateThumbnail(wp.url).then((thumb) => {
      if (!mounted) return;
      setThumbUrl(thumb);
      setLoading(false);
    });
    return () => { mounted = false; };
  }, [wp.id, wp.url]);

  const handleClick = async () => {
    if (applying) return;
    setApplying(true);
    await preloadImage(wp.url);
    setApplying(false);
    onWallpaperTransition({ wallpaper: wp.url, setWallpaper });
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={applying || loading}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 480, damping: 28 }}
      className="
        group relative h-[44px] w-[44px] flex-shrink-0 rounded-[10px]
        border border-[var(--color-surface-border)]
        bg-[var(--color-surface-inactive)]
        overflow-hidden cursor-default focus:outline-none snap-start
        disabled:opacity-70
      "
    >
      {(loading || applying) ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
          <Loader2 size={11} className="animate-spin text-white/70" />
        </div>
      ) : wp.id === "default" ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
          <RefreshCw size={11} className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-accent)] transition-colors" />
          <span className="text-[8px] font-heading font-semibold uppercase tracking-wide text-[var(--color-text-disabled)] group-hover:text-[var(--color-text-tertiary)] transition-colors">
            Reset
          </span>
        </div>
      ) : (
        <img
          src={thumbUrl}
          alt={wp.name}
          className="w-full h-full object-cover opacity-65 group-hover:opacity-100 transition-opacity duration-200"
        />
      )}
    </motion.button>
  );
});

WallpaperButton.displayName = "WallpaperButton";

// ============================================================
// ACCENT BUTTON
// ============================================================
const AccentButton = memo(({ color, isSelected, onSelect }) => (
  <motion.button
    onClick={() => onSelect(color.id, color.value)}
    style={{ backgroundColor: color.value }}
    whileHover={{ scale: 1.14 }}
    whileTap={{ scale: 0.88 }}
    transition={{ type: "spring", stiffness: 520, damping: 26 }}
    title={color.name}
    className={`
      relative h-[22px] w-[22px] rounded-full
      flex items-center justify-center
      cursor-default focus:outline-none transition-all duration-150
      ${isSelected
        ? "ring-2 ring-[var(--color-text)] ring-offset-1 ring-offset-transparent"
        : "opacity-75 hover:opacity-100"
      }
    `}
  >
    <AnimatePresence>
      {isSelected && (
        <motion.span
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <Check size={10} className="text-white stroke-[3.5]" />
        </motion.span>
      )}
    </AnimatePresence>
  </motion.button>
));

AccentButton.displayName = "AccentButton";

// ============================================================
// SECTION LABEL
// ============================================================
function SectionLabel({ children }) {
  return (
    <span className="text-[10px] font-heading font-semibold uppercase tracking-[0.1em] text-[var(--color-text-disabled)]">
      {children}
    </span>
  );
}

// ============================================================
// MAIN WIDGET
// ============================================================
export default function ThemeWidget({ constraintsRef, zIndex, onFocus, onClose, setWallpaper, positionStyle }) {
  const [activeAccent, setActiveAccent] = useState(() => {
    if (typeof window === "undefined") return "blue";
    const saved = localStorage.getItem("os-accent");
    return ACCENT_COLORS.find((c) => c.value === saved)?.id ?? "blue";
  });

  const [transitioning, setTransitioning] = useState(false);
  const [transitionWallpaper, setTransitionWallpaper] = useState(null);

  const handleAccentChange = useCallback((colorId, colorValue) => {
    setActiveAccent(colorId);
    document.documentElement.style.setProperty("--color-accent", colorValue);
    localStorage.setItem("os-accent", colorValue);
  }, []);

  const handleWallpaperTransition = useCallback(({ wallpaper, setWallpaper: apply }) => {
    if (transitioning) return;
    setTransitionWallpaper(wallpaper);
    setTransitioning(true);
    setTimeout(() => apply(wallpaper), 260);
    setTimeout(() => { setTransitioning(false); setTransitionWallpaper(null); }, 760);
  }, [transitioning]);

  return (
    <>
      {/* Full-screen Wallpaper Transition Overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-[-5%] bg-black/20 backdrop-blur-[3px]" />
            <AnimatePresence mode="sync">
              {transitionWallpaper && (
                <motion.div
                  key={transitionWallpaper}
                  className="absolute inset-0"
                  style={{ background: `url(${transitionWallpaper}) center/cover` }}
                  initial={{ opacity: 0, scale: 1.08, filter: "blur(18px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Widget */}
      <WidgetCover
        id="theme"
        title="Appearance"
        zIndex={zIndex}
        onClose={onClose}
        onFocus={onFocus}
        constraintsRef={constraintsRef}
        positionStyle={positionStyle || { top: "280px", left: "18px" }}
      >
        <div className="flex flex-col gap-4">
          {/* Wallpapers */}
          <div className="flex flex-col gap-2">
            <SectionLabel>Wallpaper</SectionLabel>
            <div
              className="flex flex-row gap-2.5 overflow-x-auto pb-0.5 snap-x snap-mandatory custom-scrollbar"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {WALLPAPERS.map((wp) => (
                <WallpaperButton
                  key={wp.id}
                  wp={wp}
                  setWallpaper={setWallpaper}
                  onWallpaperTransition={handleWallpaperTransition}
                />
              ))}
            </div>
          </div>

          {/* Hairline divider */}
          <div className="h-px w-full bg-[var(--color-surface-border)] opacity-60" />

          {/* Accent Colors */}
          <div className="flex flex-col gap-2.5">
            <SectionLabel>Accent Color</SectionLabel>
            <div
              className="flex flex-row items-center gap-3"
              onPointerDown={(e) => e.stopPropagation()}
            >
              {ACCENT_COLORS.map((color) => (
                <AccentButton
                  key={color.id}
                  color={color}
                  isSelected={activeAccent === color.id}
                  onSelect={handleAccentChange}
                />
              ))}
            </div>
          </div>
        </div>
      </WidgetCover>
    </>
  );
}
