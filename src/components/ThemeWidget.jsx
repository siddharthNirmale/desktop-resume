import { useState, useEffect, useCallback, memo } from "react";
import {
  RefreshCwIcon as RefreshCw,
  LoaderIcon as Loader2,
  CheckIcon as Check,
} from "lucide-animated";
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
  { id: "wp1", url: one, name: "Dark" },
  { id: "wp2", url: two, name: "Light Blue" },
  { id: "wp3", url: three, name: "Dark Blue" },
];

const ACCENT_COLORS = [
  { id: "violet", value: "#BF5AF2", name: "Violet" },
  { id: "indigo", value: "#5E5CE6", name: "Indigo" },
  { id: "blue", value: "#0A84FF", name: "Blue" },
  { id: "green", value: "#30D158", name: "Green" },
  { id: "yellow", value: "#FFD60A", name: "Yellow" },
  { id: "orange", value: "#FF9F0A", name: "Orange" },
  { id: "red", value: "#FF453A", name: "Red" },
];

// ============================================================
// WALLPAPER BUTTON
// ============================================================

const WallpaperButton = memo(
  ({ wp, setWallpaper, onWallpaperTransition }) => {
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

      return () => {
        mounted = false;
      };
    }, [wp.id, wp.url]);

    const handleClick = async () => {
      if (applying) return;

      setApplying(true);

      await preloadImage(wp.url);

      setApplying(false);

      onWallpaperTransition({
        wallpaper: wp.url,
        setWallpaper,
      });
    };

    return (
      <motion.button
        type="button"
        onClick={handleClick}
        disabled={applying || loading}
        aria-label={`Use ${wp.name} wallpaper`}
        whileHover={{ scale: 1.04, y: -1 }}
        whileTap={{ scale: 0.96 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="
          group relative
          h-[58px] w-[76px]
          shrink-0 overflow-hidden
          rounded-[12px]

          bg-[var(--color-surface-hover)]/30

          shadow-xs

          cursor-default
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--color-accent)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--color-surface)]

          disabled:cursor-wait
          disabled:opacity-70

          snap-start

          transition-[box-shadow]
          duration-200

          hover:shadow-sm
        "
      >
        {/* Image */}
        {wp.id !== "default" && thumbUrl && !loading && !applying && (
          <>
            <img
              src={thumbUrl}
              alt=""
              aria-hidden="true"
              className="
                absolute inset-0
                h-full w-full
                object-cover
                opacity-80
                transition-transform
                duration-500
                group-hover:scale-105
              "
            />

            <div
              className="
                absolute inset-0
                bg-black/10
                transition-colors
                duration-200
                group-hover:bg-black/0
              "
            />
          </>
        )}

        {/* Default */}
        {wp.id === "default" && !applying && (
          <div
            className="
              absolute inset-0
              flex flex-col
              items-center
              justify-center
              gap-1

              bg-[var(--color-surface-hover)]/30
            "
          >
            <RefreshCw
              size={14}
              className="
                text-[var(--color-text-tertiary)]
                transition-all
                duration-200
                group-hover:rotate-[-45deg]
                group-hover:text-[var(--color-accent)]
              "
            />

            <span
              className="
                text-[9px]
                font-heading
                font-semibold
                uppercase
                tracking-[0.08em]
                text-[var(--color-text-tertiary)]
              "
            >
              Default
            </span>
          </div>
        )}

        {/* Loading / Applying */}
        {(loading || applying) && (
          <div
            className="
              absolute inset-0 z-20
              flex items-center justify-center
              bg-black/35
              backdrop-blur-[3px]
            "
          >
            <Loader2
              size={14}
              className="animate-spin text-white/90"
            />
          </div>
        )}

        {/* Bottom label */}
        {!loading && !applying && wp.id !== "default" && (
          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-10

              px-2
              py-1.5

              bg-black/45
              backdrop-blur-[4px]

              text-left
            "
          >
            <span
              className="
                block
                truncate
                text-[9px]
                font-medium
                text-white
              "
            >
              {wp.name}
            </span>
          </div>
        )}
      </motion.button>
    );
  }
);

WallpaperButton.displayName = "WallpaperButton";

// ============================================================
// ACCENT BUTTON
// ============================================================

const AccentButton = memo(({ color, isSelected, onSelect }) => (
  <motion.button
    type="button"
    onClick={() => onSelect(color.id, color.value)}
    aria-label={`Use ${color.name} accent`}
    aria-pressed={isSelected}
    title={color.name}
    style={{ backgroundColor: color.value }}
    whileHover={{
      scale: 1.14,
      y: -1,
    }}
    whileTap={{
      scale: 0.9,
    }}
    transition={{
      type: "spring",
      stiffness: 520,
      damping: 28,
    }}
    className={`
      relative
      flex
      h-[24px]
      w-[24px]
      shrink-0
      items-center
      justify-center
      rounded-full

      cursor-default
      outline-none

      transition-[box-shadow,opacity]
      duration-150

      focus-visible:ring-2
      focus-visible:ring-[var(--color-text)]
      focus-visible:ring-offset-2
      focus-visible:ring-offset-[var(--color-surface)]

      ${isSelected
        ? "opacity-100 ring-2 ring-[var(--color-text)] ring-offset-2"
        : "opacity-75 hover:opacity-100"
      }
    `}
  >
    {/* Subtle inner highlight */}
    <span
      className="
        pointer-events-none
        absolute inset-[1px]
        rounded-full
        border border-white/20
      "
    />

    <AnimatePresence>
      {isSelected && (
        <motion.span
          initial={{
            scale: 0,
            opacity: 0,
          }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          exit={{
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 0.15,
            ease: "easeOut",
          }}
        >
          <Check
            size={11}
            className="text-white stroke-[3.5]"
          />
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
    <div className="flex items-center justify-between">
      <span
        className="
          text-[10px]
          font-heading
          font-semibold
          uppercase
          tracking-[0.12em]
          text-[var(--color-text-tertiary)]
        "
      >
        {children}
      </span>
    </div>
  );
}

// ============================================================
// MAIN WIDGET
// ============================================================

export default function ThemeWidget({
  constraintsRef,
  zIndex,
  onFocus,
  onClose,
  setWallpaper,
  positionStyle,
}) {
  const [activeAccent, setActiveAccent] = useState(() => {
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

  const [transitioning, setTransitioning] = useState(false);
  const [transitionWallpaper, setTransitionWallpaper] =
    useState(null);

  const handleAccentChange = useCallback(
    (colorId, colorValue) => {
      setActiveAccent(colorId);

      document.documentElement.style.setProperty(
        "--color-accent",
        colorValue
      );

      localStorage.setItem("os-accent", colorValue);
    },
    []
  );

  const handleWallpaperTransition = useCallback(
    ({ wallpaper, setWallpaper: apply }) => {
      if (transitioning) return;

      setTransitionWallpaper(wallpaper);
      setTransitioning(true);

      setTimeout(() => {
        apply(wallpaper);
      }, 260);

      setTimeout(() => {
        setTransitioning(false);
        setTransitionWallpaper(null);
      }, 760);
    },
    [transitioning]
  );

  return (
    <>
      {/* ======================================================
          WALLPAPER TRANSITION
      ======================================================= */}

      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="
              pointer-events-none
              fixed inset-0
              z-[99999]
              overflow-hidden
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="
                absolute inset-[-5%]
                bg-black/20
                backdrop-blur-[3px]
              "
            />

            <AnimatePresence mode="sync">
              {transitionWallpaper && (
                <motion.div
                  key={transitionWallpaper}
                  className="absolute inset-0"
                  style={{
                    background: `url(${transitionWallpaper}) center/cover`,
                  }}
                  initial={{
                    opacity: 0,
                    scale: 1.08,
                    filter: "blur(18px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 1.02,
                    filter: "blur(10px)",
                  }}
                  transition={{
                    duration: 0.65,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          WIDGET
      ======================================================= */}

      <WidgetCover
        id="theme"
        title="Appearance"
        zIndex={zIndex}
        onClose={onClose}
        onFocus={onFocus}
        constraintsRef={constraintsRef}
        positionStyle={
          positionStyle || {
            top: "280px",
            left: "18px",
          }
        }
      >
        <div
          className="
            flex
            flex-col
            gap-4
          "
        >
          {/* ==================================================
              WALLPAPER
          =================================================== */}

          <section className="space-y-2.5">
            <SectionLabel>
              Wallpaper
            </SectionLabel>

            <div
              className="
                flex
                flex-row
                gap-2
                overflow-x-auto
                pb-1
                snap-x
                snap-mandatory
                custom-scrollbar
              "
              onPointerDown={(e) =>
                e.stopPropagation()
              }
            >
              {WALLPAPERS.map((wp) => (
                <WallpaperButton
                  key={wp.id}
                  wp={wp}
                  setWallpaper={setWallpaper}
                  onWallpaperTransition={
                    handleWallpaperTransition
                  }
                />
              ))}
            </div>
          </section>

          {/* ==================================================
              DIVIDER
          =================================================== */}

          <div
            className="
              h-px
              w-full
              bg-[var(--color-surface-border)]
              opacity-70
            "
          />

          {/* ==================================================
              ACCENT
          =================================================== */}

          <section className="space-y-2.5">
            <SectionLabel>
              Accent Color
            </SectionLabel>

            <div
              className="
                flex
                min-h-[30px]
                items-center
                justify-between
              "
              onPointerDown={(e) =>
                e.stopPropagation()
              }
            >
              {ACCENT_COLORS.map((color) => (
                <AccentButton
                  key={color.id}
                  color={color}
                  isSelected={
                    activeAccent === color.id
                  }
                  onSelect={handleAccentChange}
                />
              ))}
            </div>
          </section>
        </div>
      </WidgetCover>
    </>
  );
}
