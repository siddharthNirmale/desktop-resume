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
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

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

  const rawY = useTransform(
    dist,
    [0, MAGNIFY_RADIUS],
    [-10, 0],
    { clamp: true }
  );

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
        relative
        flex
        shrink-0
        items-center
        justify-center

        rounded-[12px]

        border
        border-[var(--dock-icon-border)]

        bg-[var(--dock-icon-bg)]
        text-[var(--dock-icon-fg)]

        shadow-[0_2px_7px_var(--dock-icon-shadow)]

        transition-[background-color,border-color,box-shadow]
        duration-200
      "
      style={{
        width: DOCK_ICON_SIZE,
        height: DOCK_ICON_SIZE,
      }}
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
          initial={{
            opacity: 0,
            y: 4,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            y: 3,
            scale: 0.97,
          }}
          transition={{
            duration: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            bottom-[calc(100%+9px)]
            left-1/2
            z-[99999]
            -translate-x-1/2

            whitespace-nowrap

            rounded-[8px]

            border
            border-[var(--dock-tooltip-border)]

            bg-[var(--dock-tooltip-bg)]

            px-2
            py-1

            text-[11px]
            font-medium
            leading-none
            tracking-[-0.01em]

            text-[var(--dock-tooltip-fg)]

            shadow-[0_5px_16px_var(--dock-tooltip-shadow)]
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
    <div className="mt-1 flex h-1.5 items-center justify-center">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key={isMinimized ? "min" : "open"}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: isMinimized ? 0.3 : 1,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.16,
            }}
            className="
              h-[3px]
              w-[3px]
              rounded-full
              bg-[var(--dock-dot)]
            "
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
        mx-1.5
        mb-[13px]

        h-[25px]
        w-px
        shrink-0
        self-end

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
      (w) =>
        w.type === "window" &&
        w.isOpen &&
        !w.isMinimized
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
    idle: {
      y: 0,
    },

    tapping: {
      y: [0, -25, 0, -12, 0],
      transition: {
        duration: 0.7,
        times: [0, 0.3, 0.55, 0.8, 1],
        ease: [
          "easeOut",
          "easeIn",
          "easeOut",
          "easeIn",
        ],
      },
    },
  };

  return (
    <div
      ref={ref}
      className="
        relative
        flex
        flex-col
        items-center
        justify-end
      "
      style={{
        width: DOCK_ICON_SIZE + 18,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip
        label={label}
        visible={hovered}
      />

      <motion.button
        type="button"
        style={{
          scale,
          y,
        }}
        className="
          flex
          cursor-pointer
          flex-col
          items-center

          border-none
          bg-transparent
          p-0
          outline-none
        "
        variants={bounceVariants}
        animate={tapping ? "tapping" : "idle"}
        whileTap={{
          scale: 0.91,
          transition: {
            duration: 0.1,
          },
        }}
        aria-label={label}
        onClick={handleClick}
      >
        <IconShell>
          <IconComponent
            size={21}
            strokeWidth={1.65}
            aria-hidden="true"
          />
        </IconShell>

        <AnimatePresence>
          {badge > 0 && (
            <motion.div
              initial={{
                scale: 0.3,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              exit={{
                scale: 0.3,
                opacity: 0,
              }}
              className="
                absolute
                -right-1
                -top-1
                z-10

                flex
                h-[18px]
                min-w-[18px]
                items-center
                justify-center

                rounded-full

                border
                border-[var(--badge-border)]

                bg-[var(--badge-bg)]

                px-1

                text-[10px]
                font-semibold
                leading-none

                text-[var(--badge-fg)]

                shadow-[0_2px_6px_var(--badge-shadow)]
              "
            >
              {badge}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <RunningDot
        isOpen={isOpen}
        isMinimized={isMinimized}
      />
    </div>
  );
}

// ─── Theme Button ────────────────────────────────────────
function ThemeButton({
  isLight,
  onToggle,
  mouseX,
}) {
  const ref = useRef(null);

  const { scale, y } = useMagnify(
    mouseX,
    ref
  );

  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      className="
        relative
        flex
        flex-col
        items-center
        justify-end
      "
      style={{
        width: DOCK_ICON_SIZE + 18,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip
        label={isLight ? "Dark Mode" : "Light Mode"}
        visible={hovered}
      />

      <motion.button
        type="button"
        style={{
          scale,
          y,
        }}
        className="
          flex
          cursor-pointer
          flex-col
          items-center

          border-none
          bg-transparent
          p-0
          outline-none
        "
        whileTap={{
          scale: 0.91,
          transition: {
            duration: 0.1,
          },
        }}
        onClick={onToggle}
        aria-label={
          isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
        }
      >
        <IconShell>
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={isLight ? "moon" : "sun"}
              initial={{
                opacity: 0,
                rotate: -30,
                scale: 0.75,
              }}
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                rotate: 30,
                scale: 0.75,
              }}
              transition={{
                duration: 0.18,
                ease: "easeOut",
              }}
              className="
                flex
                text-[var(--dock-icon-fg)]
              "
            >
              {isLight ? (
                <FiMoon
                  size={21}
                  strokeWidth={1.65}
                />
              ) : (
                <FiSun
                  size={21}
                  strokeWidth={1.65}
                />
              )}
            </motion.span>
          </AnimatePresence>
        </IconShell>
      </motion.button>

      <div className="h-[9px]" />
    </div>
  );
}

// ─── Main Dock Component ────────────────────────────────
export default function Dock({
  windows,
  toggleWindow,
  bringToFront,
}) {
  const [isLight, setIsLight] = useState(() => {
    if (typeof window === "undefined") return false;

    const saved =
      localStorage.getItem("os-theme");

    const prefLight =
      window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;

    return saved
      ? saved === "light"
      : prefLight;
  });

  const mouseX = useMotionValue(Infinity);
  const dockRef = useRef(null);

  useEffect(() => {
    document.documentElement.classList.toggle(
      "light-theme",
      isLight
    );

    document.body.classList.toggle(
      "light-theme",
      isLight
    );
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

        document.body.classList.toggle(
          "light-theme",
          nextLight
        );

        localStorage.setItem(
          "os-theme",
          nextLight ? "light" : "dark"
        );

        setIsLight(nextLight);
      };

      if (
        typeof document.startViewTransition !==
        "function"
      ) {
        apply();
        return;
      }

      const {
        clientX: x,
        clientY: y,
      } = e;

      const r = Math.hypot(
        Math.max(
          x,
          window.innerWidth - x
        ),
        Math.max(
          y,
          window.innerHeight - y
        )
      );

      const transition =
        document.startViewTransition(
          apply
        );

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
              easing:
                "cubic-bezier(0.22,1,0.36,1)",
              pseudoElement:
                "::view-transition-new(root)",
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
    <div
      className="
        pointer-events-none
        absolute
        bottom-3
        left-1/2
        z-[99999]
        -translate-x-1/2
      "
    >
      <motion.div
        ref={dockRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        initial={{
          y: 90,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 25,
          delay: 0.08,
        }}
        className="
          pointer-events-auto

          relative
          flex
          items-end
          gap-1

          rounded-[16px]

          border
          border-[var(--dock-border)]

          bg-[var(--dock-bg)]

          px-2
          pb-1
          pt-1.5

          shadow-[0_12px_32px_var(--dock-shadow)]

          transition-[background-color,border-color,box-shadow]
          duration-300
        "
        style={{
          // Solid surfaces only — no gradients or transparency.
          "--dock-bg": isLight
            ? "#f7f7f7"
            : "#1c1c1e",

          "--dock-border": isLight
            ? "#dedede"
            : "#353537",

          "--dock-shadow": isLight
            ? "rgba(0,0,0,0.13)"
            : "rgba(0,0,0,0.38)",

          "--dock-icon-bg": isLight
            ? "#eeeeee"
            : "#29292b",

          "--dock-icon-fg": isLight
            ? "#171717"
            : "#f5f5f5",

          "--dock-icon-border": isLight
            ? "#d9d9d9"
            : "#3a3a3c",

          "--dock-icon-shadow": isLight
            ? "rgba(0,0,0,0.06)"
            : "rgba(0,0,0,0.22)",

          "--dock-separator": isLight
            ? "#d0d0d0"
            : "#414143",

          "--dock-dot": isLight
            ? "#161616"
            : "#f2f2f2",

          "--dock-tooltip-bg": isLight
            ? "#ffffff"
            : "#252527",

          "--dock-tooltip-fg": isLight
            ? "#161616"
            : "#f5f5f5",

          "--dock-tooltip-border": isLight
            ? "#dedede"
            : "#3a3a3c",

          "--dock-tooltip-shadow": isLight
            ? "rgba(0,0,0,0.12)"
            : "rgba(0,0,0,0.3)",

          "--badge-bg": isLight
            ? "#1d1d1f"
            : "#f5f5f5",

          "--badge-fg": isLight
            ? "#ffffff"
            : "#171717",

          "--badge-border": isLight
            ? "#ffffff"
            : "#1d1d1f",

          "--badge-shadow": isLight
            ? "rgba(0,0,0,0.12)"
            : "rgba(0,0,0,0.25)",
        }}
      >
        {DOCK_ITEMS.map((item) => {
          if (item.type === "separator") {
            return (
              <Sep key={item.id} />
            );
          }

          return (
            <DockIcon
              key={item.id}
              {...item}
              {...shared}
            />
          );
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
