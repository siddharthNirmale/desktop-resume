import { useState, useCallback, memo } from "react";
import { RefreshCw, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utils
import { generateThumbnail, preloadImage } from "../utils/imageUtils";

// Assets (In a real app, these might come from a config or API)
import one from "../assets/images/one.png";
import two from "../assets/images/two.jpg";
import three from "../assets/images/three.jpg";

const WALLPAPERS = [
  { id: "default", url: "", name: "Default Canvas" },
  { id: "wp1", url: one, name: "Dark Forest" },
  { id: "wp2", url: two, name: "Abstract Blue" },
  { id: "wp3", url: three, name: "Neon Glitch" },
];

const ACCENT_COLORS = [
  { id: "crimson", value: "#FF453A", name: "Crimson" },
  { id: "ios-blue", value: "#0A84FF", name: "Graphite Blue" },
  { id: "emerald", value: "#30D158", name: "Emerald" },
  { id: "amber", value: "#FF9F0A", name: "Amber" },
  { id: "violet", value: "#BF5AF2", name: "Violet" },
];

// ============================================================
// SUB-COMPONENTS
// ============================================================

const WallpaperButton = memo(({ wp, setWallpaper, onWallpaperTransition }) => {
  const [thumbUrl, setThumbUrl] = useState(null);
  const [isThumbLoading, setIsThumbLoading] = useState(wp.id !== "default");
  const [isApplying, setIsApplying] = useState(false);

  // Lazy load thumbnails on mount
  useState(() => {
    if (wp.id === "default") return;
    let mounted = true;
    generateThumbnail(wp.url).then((tinyImage) => {
      if (!mounted) return;
      setThumbUrl(tinyImage);
      setIsThumbLoading(false);
    });
    return () => (mounted = false);
  });

  const handleClick = async () => {
    if (isApplying) return;
    setIsApplying(true);
    await preloadImage(wp.url);
    setIsApplying(false);
    onWallpaperTransition({ wallpaper: wp.url, setWallpaper });
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isApplying || isThumbLoading}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.94 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="
        group relative h-11 w-11 flex-shrink-0 rounded-[12px]
        border border-[var(--color-surface-border)]
        bg-[var(--color-surface-inactive)]
        overflow-hidden cursor-default focus:outline-none
        disabled:opacity-80 subtle-shadow snap-start
      "
    >
      {isThumbLoading || isApplying ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
          <Loader2 size={12} className="animate-spin text-white opacity-80" />
        </div>
      ) : wp.id === "default" ? (
        <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
          <RefreshCw size={11} className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors" />
          <span className="text-[9px] font-medium text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text)] transition-colors">Reset</span>
        </div>
      ) : (
        <motion.img
          src={thumbUrl}
          alt={wp.name}
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
});

const AccentButton = memo(({ color, isSelected, onSelect }) => (
  <motion.button
    onClick={() => onSelect(color.id, color.value)}
    style={{ backgroundColor: color.value }}
    whileHover={{ scale: 1.12 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 500, damping: 25 }}
    className={`
      group relative h-[22px] w-[22px] rounded-full
      flex items-center justify-center cursor-default focus:outline-none subtle-shadow
      ${isSelected ? "ring-2 ring-offset-2 ring-offset-transparent ring-[var(--color-text)]" : "opacity-80 hover:opacity-100"}
    `}
    title={color.name}
  >
    <AnimatePresence>
      {isSelected && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <Check size={10} className="text-white stroke-[3.5]" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
));

// ============================================================
// MAIN WIDGET
// ============================================================

export default function ThemeWidget({ constraintsRef, zIndex, onFocus, setWallpaper }) {
  const [activeAccent, setActiveAccent] = useState(() => {
    if (typeof window === "undefined") return "ios-blue";
    const savedAccent = localStorage.getItem("os-accent");
    const matched = ACCENT_COLORS.find((c) => c.value === savedAccent);
    return matched ? matched.id : "ios-blue";
  });

  const [transitionWallpaper, setTransitionWallpaper] = useState(null);
  const [isWallpaperTransitioning, setIsWallpaperTransitioning] = useState(false);

  const handleAccentChange = useCallback((colorId, colorValue) => {
    setActiveAccent(colorId);
    document.documentElement.style.setProperty("--color-accent", colorValue);
    localStorage.setItem("os-accent", colorValue);
  }, []);

  const handleWallpaperTransition = useCallback(({ wallpaper, setWallpaper: applyWallpaper }) => {
    if (isWallpaperTransitioning) return;

    setTransitionWallpaper(wallpaper);
    setIsWallpaperTransitioning(true);

    setTimeout(() => applyWallpaper(wallpaper), 260);
    setTimeout(() => {
      setIsWallpaperTransitioning(false);
      setTransitionWallpaper(null);
    }, 760);
  }, [isWallpaperTransitioning]);

  return (
    <>
      {/* GLOBAL TRANSITION OVERLAY */}
      <AnimatePresence>
        {isWallpaperTransitioning && (
          <motion.div
            className="fixed inset-0 z-[99999] pointer-events-none overflow-hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <motion.div className="absolute inset-[-5%] bg-black/20 backdrop-blur-[3px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} />
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

      {/* DRAGGABLE WIDGET */}
      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        onPointerDown={onFocus}
        style={{ zIndex, touchAction: "none", willChange: "transform, opacity" }}
        whileDrag={{ cursor: "grabbing", scale: 1.015 }}
        className="
          custom-widget absolute top-70 left-6 w-[280px]
          bg-[var(--color-surface)]/80 backdrop-blur-2xl
          border border-[var(--color-surface-border)] rounded-[var(--radius-window)]
          p-4 flex flex-col gap-4 select-none pointer-events-auto cursor-grab popover-shadow
        "
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 8 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Wallpapers Section */}
        <div className="flex flex-col gap-2.5">
          <span className="px-1 text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            Desktop Wallpaper
          </span>
          <div
            className="flex flex-row overflow-x-auto custom-scrollbar pb-2 snap-x snap-mandatory"
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center gap-3 px-1">
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
        </div>

        <div className="surface-divider h-[1px] w-full" />

        {/* Accents Section */}
        <div className="flex flex-col gap-2.5">
          <span className="px-1 text-[11px] font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider">
            System Accent
          </span>
          <div
            className="flex flex-row items-center gap-3.5 px-1 pb-1"
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
      </motion.div>
    </>
  );
}
