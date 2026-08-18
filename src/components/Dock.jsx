import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  FiUser,
  FiBriefcase,
  FiFileText,
  FiEdit3,
  FiMail,
  FiTerminal,
  FiSun,
  FiMoon,
  FiMinimize2,
  FiMaximize2,
  FiX,
  FiLock,
  FiUnlock,
} from "react-icons/fi";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

/* ==========================================================================
   CONFIG
   ========================================================================== */

const ICON_SIZE = 42;
const MAX_ICON_SIZE = 66;

const MAGNIFY_RADIUS = 120;

const DOCK_BOTTOM = 12;

const SPRING = {
  stiffness: 420,
  damping: 30,
  mass: 0.7,
};

const DOCK_ITEMS = [
  {
    id: "about",
    icon: FiUser,
    label: "About Me",
    shortcut: "1",
  },
  {
    id: "projects",
    icon: FiBriefcase,
    label: "Projects",
    shortcut: "2",
  },
  {
    id: "resume",
    icon: FiFileText,
    label: "Resume",
    shortcut: "3",
  },
  {
    id: "notepad",
    icon: FiEdit3,
    label: "Notes",
    shortcut: "4",
  },
  {
    id: "contact",
    icon: FiMail,
    label: "Contact",
    shortcut: "5",
  },
  {
    id: "separator-1",
    type: "separator",
  },
  {
    id: "terminal",
    icon: FiTerminal,
    label: "Terminal",
    shortcut: "6",
  },
];

/* ==========================================================================
   MAGNIFICATION
   ========================================================================== */

function useMagnify(mouseX, ref, disabled = false) {
  const distance = useMotionValue(Infinity);

  useEffect(() => {
    if (disabled) {
      distance.set(Infinity);
      return;
    }

    const unsubscribe = mouseX.on("change", (x) => {
      if (!ref.current || !Number.isFinite(x)) {
        distance.set(Infinity);
        return;
      }

      const rect = ref.current.getBoundingClientRect();

      const center = rect.left + rect.width / 2;

      distance.set(Math.abs(x - center));
    });

    return unsubscribe;
  }, [mouseX, ref, distance, disabled]);

  const rawScale = useTransform(
    distance,
    [0, MAGNIFY_RADIUS],
    [MAX_ICON_SIZE / ICON_SIZE, 1],
    {
      clamp: true,
    }
  );

  const rawY = useTransform(
    distance,
    [0, MAGNIFY_RADIUS],
    [-10, 0],
    {
      clamp: true,
    }
  );

  return {
    distance,
    scale: useSpring(rawScale, SPRING),
    y: useSpring(rawY, SPRING),
  };
}

/* ==========================================================================
   ICON SHELL
   ========================================================================== */

function IconShell({
  children,
  active = false,
  launched = false,
}) {
  return (
    <motion.div
      className="
        relative
        flex
        shrink-0
        items-center
        justify-center
        overflow-hidden
        rounded-[13px]
        border
        border-[var(--dock-icon-border)]
        bg-[var(--dock-icon-bg)]
        text-[var(--dock-icon-fg)]
        shadow-[0_2px_7px_var(--dock-icon-shadow)]
        transition-[background-color,border-color,box-shadow]
        duration-200
      "
      animate={{
        boxShadow: active
          ? "0 4px 13px var(--dock-icon-shadow-active)"
          : launched
            ? "0 4px 14px var(--dock-icon-shadow-active)"
            : "0 2px 7px var(--dock-icon-shadow)",
      }}
      style={{
        width: ICON_SIZE,
        height: ICON_SIZE,
      }}
    >
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 0.07,
            }}
            exit={{
              opacity: 0,
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-[13px]
              bg-[var(--dock-active)]
            "
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {launched && (
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: [0, 0.15, 0],
              scale: [0.4, 1.4, 1.7],
            }}
            transition={{
              duration: 0.65,
              ease: "easeOut",
            }}
            className="
              pointer-events-none
              absolute
              inset-0
              rounded-full
              border
              border-[var(--dock-icon-fg)]
            "
          />
        )}
      </AnimatePresence>

      <span className="relative z-[1]">
        {children}
      </span>
    </motion.div>
  );
}

/* ==========================================================================
   TOOLTIP
   ========================================================================== */

function Tooltip({
  label,
  shortcut,
  visible,
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{
            opacity: 0,
            y: 5,
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
            duration: 0.13,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            pointer-events-none
            absolute
            bottom-[calc(100%+10px)]
            left-1/2
            z-[100000]
            -translate-x-1/2
            whitespace-nowrap
            rounded-[8px]
            border
            border-[var(--tooltip-border)]
            bg-[var(--tooltip-bg)]
            px-2.5
            py-1.5
            text-[11px]
            font-medium
            tracking-[-0.01em]
            text-[var(--tooltip-fg)]
            shadow-[0_7px_20px_var(--tooltip-shadow)]
          "
        >
          <div className="flex items-center gap-2">
            <span>{label}</span>

            {shortcut && (
              <span
                className="
                  rounded-[4px]
                  bg-[var(--tooltip-key-bg)]
                  px-1
                  py-[2px]
                  text-[9px]
                  font-medium
                  text-[var(--tooltip-key-fg)]
                "
              >
                Ctrl {shortcut}
              </span>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ==========================================================================
   RUNNING DOT
   ========================================================================== */

function RunningDot({
  isOpen,
  isMinimized,
}) {
  return (
    <div className="mt-[5px] flex h-[3px] items-center justify-center">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.span
            key={isMinimized ? "minimized" : "active"}
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
              duration: 0.15,
            }}
            className="
              block
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

/* ==========================================================================
   SEPARATOR
   ========================================================================== */

function Separator() {
  return (
    <div
      aria-hidden="true"
      className="
        mx-1
        mb-[10px]
        h-[26px]
        w-px
        shrink-0
        self-end
        bg-[var(--dock-separator)]
      "
    />
  );
}

/* ==========================================================================
   DOCK ICON
   ========================================================================== */

function DockIcon({
  id,
  icon: Icon,
  label,
  shortcut,
  badge,
  windows,
  toggleWindow,
  bringToFront,
  mouseX,
  velocity,
  reducedMotion,
  onRecent,
}) {
  const ref = useRef(null);

  const {
    scale,
    y,
  } = useMagnify(
    mouseX,
    ref,
    reducedMotion
  );

  const [hovered, setHovered] =
    useState(false);

  const [bouncing, setBouncing] =
    useState(false);

  const [launched, setLaunched] =
    useState(false);

  const windowItem = windows?.find(
    (item) => item.id === id
  );

  const isOpen = Boolean(
    windowItem?.isOpen
  );

  const isMinimized = Boolean(
    windowItem?.isMinimized
  );

  const isActive =
    isOpen && !isMinimized;

  const handleOpen = useCallback(() => {
    if (!windowItem) return;

    if (!isOpen) {
      toggleWindow(id, "isOpen", true);

      bringToFront(id);

      setLaunched(true);

      setTimeout(() => {
        setLaunched(false);
      }, 700);

      onRecent?.(id);

      return;
    }

    if (isMinimized) {
      toggleWindow(
        id,
        "isMinimized",
        false
      );

      bringToFront(id);

      onRecent?.(id);

      return;
    }

    bringToFront(id);

    onRecent?.(id);
  }, [
    windowItem,
    isOpen,
    isMinimized,
    id,
    toggleWindow,
    bringToFront,
    onRecent,
  ]);

  const handleClick = useCallback(() => {
    if (!windowItem) return;

    setBouncing(true);

    setTimeout(() => {
      setBouncing(false);
    }, 650);

    if (!isOpen) {
      toggleWindow(id, "isOpen", true);
      bringToFront(id);
      setLaunched(true);

      setTimeout(() => {
        setLaunched(false);
      }, 700);

      onRecent?.(id);

      return;
    }

    if (isMinimized) {
      toggleWindow(
        id,
        "isMinimized",
        false
      );

      bringToFront(id);

      onRecent?.(id);

      return;
    }

    const activeWindows =
      windows?.filter(
        (item) =>
          item.type === "window" &&
          item.isOpen &&
          !item.isMinimized
      ) ?? [];

    const maxZ = Math.max(
      ...activeWindows.map(
        (item) => item.zIndex ?? 0
      ),
      0
    );

    if (windowItem.zIndex === maxZ) {
      toggleWindow(
        id,
        "isMinimized",
        true
      );
    } else {
      bringToFront(id);
    }

    onRecent?.(id);
  }, [
    windowItem,
    isOpen,
    isMinimized,
    windows,
    id,
    toggleWindow,
    bringToFront,
    onRecent,
  ]);

  const handleMiddleClick = useCallback(
    (event) => {
      if (event.button !== 1) return;

      event.preventDefault();

      if (windowItem?.isOpen) {
        toggleWindow(
          id,
          "isMinimized",
          true
        );
      }
    },
    [
      windowItem,
      id,
      toggleWindow,
    ]
  );

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();
    },
    []
  );

  const tilt = useTransform(
    mouseX,
    (x) => {
      if (
        reducedMotion ||
        !ref.current ||
        !Number.isFinite(x)
      ) {
        return 0;
      }

      const rect =
        ref.current.getBoundingClientRect();

      const center =
        rect.left + rect.width / 2;

      const diff = x - center;

      return Math.max(
        -7,
        Math.min(7, diff / 14)
      );
    }
  );

  if (
    windowItem?.type === "widget"
  ) {
    return null;
  }

  return (
    <motion.div
      ref={ref}
      className="
        relative
        flex
        w-[60px]
        shrink-0
        flex-col
        items-center
        justify-end
      "
      style={{
        rotateZ: tilt,
      }}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >
      <Tooltip
        label={label}
        shortcut={shortcut}
        visible={hovered}
      />

      <motion.button
        type="button"
        aria-label={label}
        aria-pressed={isActive}
        style={{
          scale,
          y,
        }}
        animate={
          bouncing && !reducedMotion
            ? {
              y: [
                0,
                -24,
                0,
                -10,
                0,
              ],
            }
            : {
              y: 0,
            }
        }
        transition={
          bouncing
            ? {
              duration: 0.65,
              times: [
                0,
                0.3,
                0.55,
                0.8,
                1,
              ],
              ease: "easeOut",
            }
            : SPRING
        }
        whileTap={
          reducedMotion
            ? undefined
            : {
              scale: 0.9,
            }
        }
        className="
          flex
          cursor-pointer
          items-center
          justify-center
          border-0
          bg-transparent
          p-0
          outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--dock-focus)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--dock-bg)]
        "
        onClick={handleClick}
        onMouseDown={handleMiddleClick}
        onContextMenu={
          handleContextMenu
        }
      >
        <IconShell
          active={isActive}
          launched={launched}
        >
          <Icon
            size={20}
            strokeWidth={1.65}
            aria-hidden="true"
          />
        </IconShell>
      </motion.button>

      <AnimatePresence>
        {badge > 0 && (
          <motion.span
            initial={{
              opacity: 0,
              scale: 0.5,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.5,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 25,
            }}
            className="
              absolute
              right-[3px]
              top-[-3px]
              z-20
              flex
              min-h-[18px]
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
              shadow-[0_2px_7px_var(--badge-shadow)]
            "
          >
            {badge}
          </motion.span>
        )}
      </AnimatePresence>

      <RunningDot
        isOpen={isOpen}
        isMinimized={isMinimized}
      />
    </motion.div>
  );
}

/* ==========================================================================
   THEME BUTTON
   ========================================================================== */

function ThemeButton({
  isLight,
  onToggle,
  mouseX,
  reducedMotion,
}) {
  const ref = useRef(null);

  const {
    scale,
    y,
  } = useMagnify(
    mouseX,
    ref,
    reducedMotion
  );

  const [hovered, setHovered] =
    useState(false);

  const label = isLight
    ? "Dark Mode"
    : "Light Mode";

  return (
    <div
      ref={ref}
      className="
        relative
        flex
        w-[60px]
        shrink-0
        flex-col
        items-center
        justify-end
      "
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={() =>
        setHovered(false)
      }
    >
      <Tooltip
        label={label}
        visible={hovered}
      />

      <motion.button
        type="button"
        aria-label={label}
        style={{
          scale,
          y,
        }}
        whileTap={
          reducedMotion
            ? undefined
            : {
              scale: 0.9,
            }
        }
        className="
          flex
          cursor-pointer
          items-center
          justify-center
          border-0
          bg-transparent
          p-0
          outline-none
          focus-visible:ring-2
          focus-visible:ring-[var(--dock-focus)]
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[var(--dock-bg)]
        "
        onClick={onToggle}
      >
        <IconShell>
          <AnimatePresence
            mode="wait"
            initial={false}
          >
            <motion.span
              key={
                isLight
                  ? "moon"
                  : "sun"
              }
              initial={
                reducedMotion
                  ? false
                  : {
                    opacity: 0,
                    rotate: -45,
                    scale: 0.7,
                  }
              }
              animate={{
                opacity: 1,
                rotate: 0,
                scale: 1,
              }}
              exit={
                reducedMotion
                  ? undefined
                  : {
                    opacity: 0,
                    rotate: 45,
                    scale: 0.7,
                  }
              }
              transition={{
                duration: 0.18,
              }}
              className="flex"
            >
              {isLight ? (
                <FiMoon
                  size={20}
                  strokeWidth={1.65}
                />
              ) : (
                <FiSun
                  size={20}
                  strokeWidth={1.65}
                />
              )}
            </motion.span>
          </AnimatePresence>
        </IconShell>
      </motion.button>

      <div className="h-[8px]" />
    </div>
  );
}

/* ==========================================================================
   MAIN DOCK
   ========================================================================== */

export default function Dock({
  windows = [],
  toggleWindow,
  bringToFront,
}) {
  const [isLight, setIsLight] =
    useState(() => {
      if (
        typeof window ===
        "undefined"
      ) {
        return false;
      }

      const saved =
        localStorage.getItem(
          "os-theme"
        );

      if (saved) {
        return saved === "light";
      }

      return window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches;
    });

  const [
    dockVisible,
    setDockVisible,
  ] = useState(true);

  const [
    dockLocked,
    setDockLocked,
  ] = useState(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return false;
    }

    return (
      localStorage.getItem(
        "dock-locked"
      ) === "true"
    );
  });

  const [
    recentApps,
    setRecentApps,
  ] = useState([]);

  const mouseX =
    useMotionValue(Infinity);

  const velocity =
    useMotionValue(0);

  const lastMouseX =
    useRef(null);

  const lastMouseTime =
    useRef(null);

  const hideTimer =
    useRef(null);

  const reducedMotion =
    typeof window !==
    "undefined" &&
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  /* ------------------------------------------------------------------------
     THEME
     ------------------------------------------------------------------------ */

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

  /* ------------------------------------------------------------------------
     DOCK LOCK
     ------------------------------------------------------------------------ */

  useEffect(() => {
    localStorage.setItem(
      "dock-locked",
      String(dockLocked)
    );
  }, [dockLocked]);

  /* ------------------------------------------------------------------------
     RECENT APPS
     ------------------------------------------------------------------------ */

  const markRecent = useCallback(
    (id) => {
      setRecentApps((current) => [
        id,
        ...current.filter(
          (item) => item !== id
        ),
      ].slice(0, 4));
    },
    []
  );

  /* ------------------------------------------------------------------------
     MOUSE PHYSICS
     ------------------------------------------------------------------------ */

  const handleMouseMove =
    useCallback(
      (event) => {
        const x =
          event.clientX;

        const now =
          performance.now();

        if (
          lastMouseX.current !==
          null &&
          lastMouseTime.current !==
          null
        ) {
          const dx =
            x -
            lastMouseX.current;

          const dt =
            Math.max(
              now -
              lastMouseTime.current,
              1
            );

          const nextVelocity =
            Math.min(
              Math.abs(
                dx / dt
              ) * 10,
              10
            );

          velocity.set(
            nextVelocity
          );
        }

        lastMouseX.current =
          x;

        lastMouseTime.current =
          now;

        mouseX.set(x);

        setDockVisible(true);

        if (hideTimer.current) {
          clearTimeout(
            hideTimer.current
          );
        }

        if (!dockLocked) {
          hideTimer.current =
            setTimeout(() => {
              setDockVisible(false);
            }, 2200);
        }
      },
      [
        mouseX,
        velocity,
        dockLocked,
      ]
    );

  const handleMouseLeave =
    useCallback(() => {
      mouseX.set(Infinity);
      velocity.set(0);

      lastMouseX.current =
        null;

      lastMouseTime.current =
        null;

      if (!dockLocked) {
        hideTimer.current =
          setTimeout(() => {
            setDockVisible(false);
          }, 900);
      }
    }, [
      mouseX,
      velocity,
      dockLocked,
    ]);

  /* ------------------------------------------------------------------------
     EDGE REVEAL
     ------------------------------------------------------------------------ */

  useEffect(() => {
    const handlePointerMove =
      (event) => {
        const nearBottom =
          window.innerHeight -
          event.clientY <
          55;

        if (nearBottom) {
          setDockVisible(true);

          if (
            hideTimer.current
          ) {
            clearTimeout(
              hideTimer.current
            );
          }
        }
      };

    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );
    };
  }, []);

  /* ------------------------------------------------------------------------
     KEYBOARD SHORTCUTS
     ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleKeyDown =
      (event) => {
        if (
          event.metaKey ||
          event.ctrlKey
        ) {
          const number =
            Number(event.key);

          if (
            number >= 1 &&
            number <= 6
          ) {
            event.preventDefault();

            const item =
              DOCK_ITEMS.filter(
                (entry) =>
                  entry.type !==
                  "separator"
              )[number - 1];

            if (!item) return;

            const win =
              windows.find(
                (entry) =>
                  entry.id ===
                  item.id
              );

            if (!win) return;

            if (!win.isOpen) {
              toggleWindow(
                item.id,
                "isOpen",
                true
              );

              bringToFront(
                item.id
              );
            } else if (
              win.isMinimized
            ) {
              toggleWindow(
                item.id,
                "isMinimized",
                false
              );

              bringToFront(
                item.id
              );
            } else {
              bringToFront(
                item.id
              );
            }

            markRecent(item.id);
          }
        }

      };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    windows,
    toggleWindow,
    bringToFront,
    markRecent,
  ]);

  /* ------------------------------------------------------------------------
     THEME
     ------------------------------------------------------------------------ */

  const handleThemeToggle =
    useCallback(
      (event) => {
        const nextLight =
          !isLight;

        const applyTheme =
          () => {
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
              nextLight
                ? "light"
                : "dark"
            );

            setIsLight(
              nextLight
            );
          };

        if (
          reducedMotion ||
          typeof document.startViewTransition !==
          "function"
        ) {
          applyTheme();
          return;
        }

        const x =
          event.clientX;

        const y =
          event.clientY;

        const radius =
          Math.hypot(
            Math.max(
              x,
              window.innerWidth -
              x
            ),
            Math.max(
              y,
              window.innerHeight -
              y
            )
          );

        const transition =
          document.startViewTransition(
            applyTheme
          );

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
                duration: 460,
                easing:
                  "cubic-bezier(0.22,1,0.36,1)",
                pseudoElement:
                  "::view-transition-new(root)",
              }
            );
          })
          .catch(() => { });
      },
      [
        isLight,
        reducedMotion,
      ]
    );

  /* ------------------------------------------------------------------------
     SHARED PROPS
     ------------------------------------------------------------------------ */

  const themeVariables =
    useMemo(
      () => ({
        "--dock-bg": isLight
          ? "#f7f7f7"
          : "#1c1c1e",

        "--dock-border": isLight
          ? "#dddddd"
          : "#363638",

        "--dock-shadow": isLight
          ? "rgba(0,0,0,0.14)"
          : "rgba(0,0,0,0.44)",

        "--dock-icon-bg": isLight
          ? "#eeeeee"
          : "#29292b",

        "--dock-icon-fg": isLight
          ? "#171717"
          : "#f5f5f5",

        "--dock-icon-border":
          isLight
            ? "#d9d9d9"
            : "#3a3a3c",

        "--dock-icon-shadow":
          isLight
            ? "rgba(0,0,0,0.055)"
            : "rgba(0,0,0,0.22)",

        "--dock-icon-shadow-active":
          isLight
            ? "rgba(0,0,0,0.12)"
            : "rgba(0,0,0,0.36)",

        "--dock-active": isLight
          ? "#000000"
          : "#ffffff",

        "--dock-separator":
          isLight
            ? "#d0d0d0"
            : "#414143",

        "--dock-dot": isLight
          ? "#161616"
          : "#f2f2f2",

        "--dock-focus": isLight
          ? "#707070"
          : "#aaaaaa",

        "--tooltip-bg": isLight
          ? "#ffffff"
          : "#252527",

        "--tooltip-fg": isLight
          ? "#161616"
          : "#f5f5f5",

        "--tooltip-border":
          isLight
            ? "#dedede"
            : "#3a3a3c",

        "--tooltip-shadow":
          isLight
            ? "rgba(0,0,0,0.13)"
            : "rgba(0,0,0,0.32)",

        "--tooltip-key-bg":
          isLight
            ? "#eeeeee"
            : "#343436",

        "--tooltip-key-fg":
          isLight
            ? "#555555"
            : "#bbbbbb",

        "--badge-bg": isLight
          ? "#1d1d1f"
          : "#f5f5f5",

        "--badge-fg": isLight
          ? "#ffffff"
          : "#171717",

        "--badge-border":
          isLight
            ? "#ffffff"
            : "#1d1d1f",

        "--badge-shadow":
          isLight
            ? "rgba(0,0,0,0.13)"
            : "rgba(0,0,0,0.25)",

        "--menu-bg": isLight
          ? "#ffffff"
          : "#252527",

        "--menu-border":
          isLight
            ? "#dedede"
            : "#3a3a3c",

        "--menu-shadow":
          isLight
            ? "rgba(0,0,0,0.18)"
            : "rgba(0,0,0,0.4)",

        "--menu-fg": isLight
          ? "#202020"
          : "#f2f2f2",

        "--menu-muted":
          isLight
            ? "#888888"
            : "#8e8e93",

        "--menu-hover":
          isLight
            ? "#eeeeee"
            : "#343436",

        "--menu-divider":
          isLight
            ? "#e5e5e5"
            : "#3a3a3c",

        "--menu-danger":
          isLight
            ? "#c62828"
            : "#ff6b6b",

        "--menu-danger-bg":
          isLight
            ? "#fff0f0"
            : "#3b2525",
      }),
      [isLight]
    );

  /* ------------------------------------------------------------------------
     RENDER
     ------------------------------------------------------------------------ */

  return (
    <>
      <motion.div
        initial={false}
        animate={{
          y: dockVisible
            ? 0
            : 75,
          opacity: dockVisible
            ? 1
            : 0,
          scale: dockVisible
            ? 1
            : 0.96,
        }}
        transition={{
          type: "spring",
          stiffness: 340,
          damping: 30,
          mass: 0.75,
        }}
        className="
          pointer-events-none
          fixed
          bottom-3
          left-1/2
          z-[99999]
          -translate-x-1/2
          sm:bottom-4
        "
      >
        <motion.div
          onMouseMove={
            handleMouseMove
          }
          onMouseLeave={
            handleMouseLeave
          }
          className="
            pointer-events-auto
            relative
            flex
            max-w-[calc(100vw-16px)]
            items-end
            overflow-visible
            rounded-[17px]
            border
            border-[var(--dock-border)]
            bg-[var(--dock-bg)]
            px-1
            pb-1
            pt-1
            shadow-[0_10px_30px_var(--dock-shadow)]
            transition-[background-color,border-color,box-shadow]
            duration-300
            sm:px-1.5
            sm:pb-1
            sm:pt-1.5
          "
          style={themeVariables}
        >
          {DOCK_ITEMS.map(
            (item) => {
              if (
                item.type ===
                "separator"
              ) {
                return (
                  <Separator
                    key={item.id}
                  />
                );
              }

              const index =
                DOCK_ITEMS.findIndex(
                  (entry) =>
                    entry.id ===
                    item.id
                );

              const actualShortcut =
                item.shortcut ??
                String(index + 1);

              return (
                <DockIcon
                  key={item.id}
                  {...item}
                  shortcut={
                    actualShortcut
                  }
                  {...{
                    windows,
                    toggleWindow,
                    bringToFront,
                  }}
                  mouseX={mouseX}
                  velocity={
                    velocity
                  }
                  reducedMotion={
                    reducedMotion
                  }
                  onRecent={
                    markRecent
                  }
                />
              );
            }
          )}

          <Separator />

          <ThemeButton
            isLight={isLight}
            onToggle={
              handleThemeToggle
            }
            mouseX={mouseX}
            reducedMotion={
              reducedMotion
            }
          />

          <button
            type="button"
            aria-label={
              dockLocked
                ? "Unlock dock"
                : "Lock dock"
            }
            title={
              dockLocked
                ? "Unlock dock"
                : "Lock dock"
            }
            onClick={() =>
              setDockLocked(
                (value) =>
                  !value
              )
            }
            className="
              absolute
              -right-2
              -top-2
              z-30
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              border
              border-[var(--dock-border)]
              bg-[var(--dock-bg)]
              text-[var(--dock-icon-fg)]
              opacity-0
              shadow-[0_3px_8px_var(--dock-shadow)]
              transition-opacity
              duration-200
              hover:opacity-100
              focus:opacity-100
            "
          >
            {dockLocked ? (
              <FiLock size={9} />
            ) : (
              <FiUnlock size={9} />
            )}
          </button>
        </motion.div>
      </motion.div>

    </>
  );
}
