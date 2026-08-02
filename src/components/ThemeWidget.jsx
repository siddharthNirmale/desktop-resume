import { useState, useEffect, memo, useCallback, useRef } from "react";
import { RefreshCw, Loader2, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

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

const thumbnailCache = {};

const generateThumbnail = (src, size = 64) => {
  if (thumbnailCache[src]) {
    return Promise.resolve(thumbnailCache[src]);
  }

  return new Promise((resolve) => {
    const img = new Image();

    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = size / Math.max(img.width, img.height);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "medium";

      ctx.drawImage(
        img,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const base64 = canvas.toDataURL("image/jpeg", 0.6);

      thumbnailCache[src] = base64;

      resolve(base64);
    };

    img.onerror = () => resolve(src);
  });
};

const preloadImage = (src) => {
  if (!src) return Promise.resolve();

  return new Promise((resolve) => {
    const img = new Image();

    img.src = src;

    if (img.complete) {
      resolve();
      return;
    }

    img.onload = resolve;
    img.onerror = resolve;
  });
};

const WallpaperButton = memo(
  ({ wp, setWallpaper, onWallpaperTransition }) => {
    const [thumbUrl, setThumbUrl] = useState(
      thumbnailCache[wp.url] || null
    );

    const [isThumbLoading, setIsThumbLoading] = useState(
      !thumbnailCache[wp.url] && wp.id !== "default"
    );

    const [isApplying, setIsApplying] = useState(false);

    useEffect(() => {
      if (wp.id === "default" || thumbUrl) return;

      let mounted = true;

      generateThumbnail(wp.url).then((tinyImage) => {
        if (!mounted) return;

        setThumbUrl(tinyImage);
        setIsThumbLoading(false);
      });

      return () => {
        mounted = false;
      };
    }, [wp.url, wp.id, thumbUrl]);

    const handleClick = async () => {
      if (isApplying) return;

      setIsApplying(true);

      await preloadImage(wp.url);

      setIsApplying(false);

      onWallpaperTransition({
        wallpaper: wp.url,
        setWallpaper,
      });
    };

    if (isThumbLoading) {
      return (
        <div
          className="
            group relative h-11 w-11 flex-shrink-0
            rounded-[12px]
            border-t border-[var(--color-surface-border)]
            bg-[var(--color-surface-inactive)]
            flex items-center justify-center
            shadow-sm
          "
        >
          <Loader2
            size={11}
            className="
              animate-spin
              text-[var(--color-text-secondary)]
              opacity-50
            "
          />
        </div>
      );
    }

    return (
      <motion.button
        onClick={handleClick}
        disabled={isApplying}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 30,
        }}
        className="
          group relative h-11 w-11 flex-shrink-0
          rounded-[12px]
          border-t border-[var(--color-surface-border)]
          overflow-hidden
          bg-[var(--color-surface-inactive)]
          cursor-default
          focus:outline-none
          disabled:opacity-80
          shadow-sm
        "
      >
        {isApplying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              absolute inset-0 z-10
              flex items-center justify-center
              bg-black/40
              backdrop-blur-[2px]
            "
          >
            <Loader2
              size={14}
              className="animate-spin text-white"
            />
          </motion.div>
        )}

        {wp.id === "default" ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-0.5">
            <RefreshCw
              size={11}
              className="
                text-[var(--color-text-secondary)]
                group-hover:text-[var(--color-accent)]
                transition-colors duration-150
              "
            />

            <span
              className="
                text-[9px]
                font-medium
                text-[var(--color-text-tertiary)]
                group-hover:text-[var(--color-text)]
                transition-colors duration-150
              "
            >
              Reset
            </span>
          </div>
        ) : (
          <motion.img
            src={thumbUrl}
            alt={wp.name}
            className="
              w-full h-full
              object-cover
              opacity-60
              group-hover:opacity-100
            "
            whileHover={{
              scale: 1.1,
            }}
            transition={{
              duration: 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        )}
      </motion.button>
    );
  }
);

const AccentButton = memo(
  ({ color, isSelected, onSelect }) => (
    <motion.button
      onClick={() => onSelect(color.id, color.value)}
      style={{
        backgroundColor: color.value,
      }}
      whileHover={{
        scale: 1.12,
      }}
      whileTap={{
        scale: 0.9,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
      }}
      className={`
        group relative
        h-[22px] w-[22px]
        rounded-full
        flex items-center justify-center
        cursor-default
        focus:outline-none
        shadow-sm
        ${isSelected
          ? "ring-2 ring-offset-2 ring-offset-transparent ring-[var(--color-text)]"
          : "opacity-80 hover:opacity-100"
        }
      `}
      title={color.name}
    >
      <AnimatePresence>
        {isSelected && (
          <motion.div
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
          >
            <Check
              size={10}
              className="text-white stroke-[3.5]"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
);

export default function ThemeWidget({
  constraintsRef,
  zIndex,
  onFocus,
  setWallpaper,
}) {
  const [activeAccent, setActiveAccent] = useState(() => {
    const savedAccent =
      localStorage.getItem("os-accent");

    if (savedAccent) {
      const matched = ACCENT_COLORS.find(
        (c) => c.value === savedAccent
      );

      return matched
        ? matched.id
        : "ios-blue";
    }

    return "ios-blue";
  });

  const [transitionWallpaper, setTransitionWallpaper] =
    useState(null);

  const [isWallpaperTransitioning, setIsWallpaperTransitioning] =
    useState(false);

  const wallpaperScrollRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    const element = wallpaperScrollRef.current;

    if (!element) return;

    const lenis = new Lenis({
      wrapper: element,
      content: element.firstElementChild,
      orientation: "horizontal",
      gestureOrientation: "both",
      smoothWheel: true,
      syncTouch: true,
      lerp: 0.12,
      wheelMultiplier: 0.65,
    });

    lenisRef.current = lenis;

    let frame;

    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleAccentChange = useCallback(
    (colorId, colorValue) => {
      setActiveAccent(colorId);

      document.documentElement.style.setProperty(
        "--color-accent",
        colorValue
      );

      localStorage.setItem(
        "os-accent",
        colorValue
      );
    },
    []
  );

  const handleWallpaperTransition = useCallback(
    ({ wallpaper, setWallpaper: applyWallpaper }) => {
      if (isWallpaperTransitioning) return;

      setTransitionWallpaper(wallpaper);
      setIsWallpaperTransitioning(true);

      setTimeout(() => {
        applyWallpaper(wallpaper);
      }, 260);

      setTimeout(() => {
        setIsWallpaperTransitioning(false);
        setTransitionWallpaper(null);
      }, 760);
    },
    [isWallpaperTransitioning]
  );

  return (
    <>
      <AnimatePresence>
        {isWallpaperTransitioning && (
          <motion.div
            className="
              fixed inset-0 z-[99999]
              pointer-events-none
              overflow-hidden
            "
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
          >
            <motion.div
              className="
                absolute inset-[-5%]
                bg-black/20
                backdrop-blur-[3px]
              "
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
            />

            <AnimatePresence mode="sync">
              {transitionWallpaper && (
                <motion.div
                  key={transitionWallpaper || "default"}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: transitionWallpaper
                      ? `url(${transitionWallpaper})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
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

            <motion.div
              className="absolute inset-0 bg-black/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.35,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        drag
        dragMomentum={false}
        dragConstraints={constraintsRef}
        dragElastic={0.08}
        onPointerDown={onFocus}
        style={{
          zIndex,
          touchAction: "none",
          willChange: "transform, opacity",
        }}
        whileDrag={{
          cursor: "grabbing",
          scale: 1.015,
        }}
        className="
          custom-widget
          absolute top-72 left-6
          w-[280px]
          bg-[#1C1C1E]/50
          backdrop-blur-2xl
          border-t border-white/5
          rounded-[24px]
          p-4.5
          cursor-grab
          flex flex-col gap-4
          font-primary
          select-none
          pointer-events-auto
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]
        "
        initial={{
          opacity: 0,
          scale: 0.96,
          y: 10,
        }}
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
          y: 8,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
      >
        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center px-0.5">
            <span
              className="
                text-[11px]
                font-medium
                text-[var(--color-text-tertiary)]
                uppercase
                tracking-wider
              "
            >
              Desktop Wallpaper
            </span>
          </div>

          <div
            ref={wallpaperScrollRef}
            className="
              flex
              flex-row
              overflow-x-auto
              custom-scrollbar
              pb-1
              overscroll-contain
            "
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="flex flex-row items-center gap-3">
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
          </div>
        </div>

        <motion.div
          className="
            h-[1px]
            w-full
            bg-[var(--color-surface-border)]
          "
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        />

        <div className="flex flex-col gap-2.5">
          <div className="flex justify-between items-center px-0.5">
            <span
              className="
                text-[11px]
                font-medium
                text-[var(--color-text-tertiary)]
                uppercase
                tracking-wider
              "
            >
              System Accent
            </span>
          </div>

          <div
            className="
              flex flex-row
              items-center
              gap-3.5
              px-0.5
            "
            onPointerDown={(e) => e.stopPropagation()}
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
        </div>
      </motion.div>
    </>
  );
}
