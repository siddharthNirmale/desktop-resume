import { useState, useEffect, useRef } from "react";
import {
  User,
  FolderCode,
  FileText,
  Mail,
  Terminal,
  Notebook,
  Sun,
  Moon,
} from "lucide-react";
import { motion } from "framer-motion";

// ---------------------------------------------------------
// App Icon Styling
// ---------------------------------------------------------

const getAppIconStyle = (isLight) => {
  return {
    wrapper: `
      w-[44px] h-[44px]
      flex items-center justify-center
      rounded-[12px]
      bg-[var(--color-surface-inactive)]
      border-t border-[var(--color-surface-border)]
      shadow-[0_4px_12px_rgba(0,0,0,0.08)]
      transition-all duration-200
    `,
    icon: isLight
      ? "text-[var(--color-accent)]"
      : "text-white",
  };
};

// ---------------------------------------------------------
// Dock
// ---------------------------------------------------------

export default function Dock({
  windows,
  toggleWindow,
  bringToFront,
}) {
  const [isLight, setIsLight] = useState(false);
  const dockRef = useRef(null);

  // -------------------------------------------------------
  // Initialize theme
  // -------------------------------------------------------

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    let theme;

    if (savedTheme === "light" || savedTheme === "dark") {
      theme = savedTheme;
    } else {
      theme = window.matchMedia(
        "(prefers-color-scheme: light)"
      ).matches
        ? "light"
        : "dark";
    }

    const light = theme === "light";

    setIsLight(light);

    // Always keep the root element in sync
    document.documentElement.classList.toggle(
      "light-theme",
      light
    );

    // Also keep body synced if your existing CSS depends on it
    document.body.classList.toggle(
      "light-theme",
      light
    );
  }, []);

  // -------------------------------------------------------
  // Theme Toggle
  // -------------------------------------------------------

  const handleThemeToggle = (e) => {
    const nextTheme = isLight ? "dark" : "light";
    const nextIsLight = nextTheme === "light";

    const applyTheme = () => {
      document.documentElement.classList.toggle(
        "light-theme",
        nextIsLight
      );

      document.body.classList.toggle(
        "light-theme",
        nextIsLight
      );

      localStorage.setItem("theme", nextTheme);

      setIsLight(nextIsLight);
    };

    // Fallback for browsers without View Transitions
    if (
      typeof document.startViewTransition !== "function"
    ) {
      applyTheme();
      return;
    }

    const x = e.clientX;
    const y = e.clientY;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const endRadius = Math.hypot(
      Math.max(x, width - x),
      Math.max(y, height - y)
    );

    const transition =
      document.startViewTransition(applyTheme);

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 400,
            easing:
              "cubic-bezier(0.25, 1, 0.5, 1)",
            pseudoElement:
              "::view-transition-new(root)",
          }
        );
      })
      .catch(() => {
        // View transition failed.
        // Theme itself has already been applied.
      });
  };

  // -------------------------------------------------------
  // Dock App Icon
  // -------------------------------------------------------

  const DockIcon = ({
    id,
    icon: Icon,
    label,
    badge,
  }) => {
    const win = windows.find(
      (window) => window.id === id
    );

    // Widgets don't appear in the dock
    if (win?.type === "widget") {
      return null;
    }

    const isOpen = win?.isOpen;
    const isMinimized = win?.isMinimized;

    const {
      wrapper,
      icon: iconColor,
    } = getAppIconStyle(isLight);

    const handleClick = () => {
      if (!win) return;

      // Closed → Open
      if (!isOpen) {
        toggleWindow(id, "isOpen", true);
        bringToFront(id);
        return;
      }

      // Minimized → Restore
      if (isMinimized) {
        toggleWindow(id, "isMinimized", false);
        bringToFront(id);
        return;
      }

      // Already open
      const activeWindows = windows.filter(
        (window) =>
          window.type === "window" &&
          window.isOpen &&
          !window.isMinimized
      );

      const maxZ = Math.max(
        ...activeWindows.map(
          (window) => window.zIndex || 0
        ),
        0
      );

      // Active window → Minimize
      if (win.zIndex === maxZ) {
        toggleWindow(
          id,
          "isMinimized",
          true
        );
      } else {
        // Inactive window → Bring to front
        bringToFront(id);
      }
    };

    return (
      <div className="relative group flex flex-col items-center justify-center">
        {/* Tooltip */}
        <span
          className="
            absolute -top-11
            opacity-0
            group-hover:opacity-100
            transition-all duration-150
            bg-[var(--color-surface-dark)]
            border-t border-[var(--color-surface-border)]
            text-[var(--color-text)]
            text-[11px]
            px-2.5 py-1
            rounded-md
            pointer-events-none
            z-[99999]
            shadow-md
            whitespace-nowrap
          "
        >
          {label}
        </span>

        {/* App Button */}
        <motion.button
          type="button"
          whileHover={{
            scale: 1.12,
            y: -4,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
          onClick={handleClick}
          className="
            relative
            flex items-center justify-center
            w-[48px] h-[48px]
            transition-all
            cursor-pointer
          "
        >
          <div
            className={`
              ${wrapper}
              group-hover:border-[var(--color-accent)]
              group-hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]
            `}
          >
            <Icon
              size={21}
              strokeWidth={2}
              className={`
                ${iconColor}
                transition-colors duration-200
                drop-shadow-sm
              `}
            />
          </div>

          {/* Notification Badge */}
          {badge > 0 && (
            <div
              className="
                absolute -top-1 -right-1
                min-w-[16px] h-[16px]
                px-1
                bg-[#FF3B30]
                text-white
                text-[10px]
                font-semibold
                rounded-full
                flex items-center justify-center
                border border-black/20
                shadow-sm
                z-10
              "
            >
              {badge}
            </div>
          )}
        </motion.button>

        {/* Open / Minimized Indicator */}
        {isOpen && (
          <div
            className="
              absolute -bottom-1.5
              flex justify-center items-center
              h-2
            "
          >
            <div
              className={`
                rounded-full
                transition-all duration-200
                ${isMinimized
                  ? `
                      w-[3px] h-[3px]
                      bg-[var(--color-text-tertiary)]
                    `
                  : `
                      w-[4px] h-[4px]
                      bg-[var(--color-text)]
                      shadow-[0_0_6px_var(--color-text)]
                      opacity-90
                    `
                }
              `}
            />
          </div>
        )}
      </div>
    );
  };

  // -------------------------------------------------------
  // Render
  // -------------------------------------------------------

  return (
    <div
      ref={dockRef}
      className="
        absolute
        bottom-3
        left-1/2
        -translate-x-1/2
        z-[99999]
        pointer-events-auto
      "
    >
      <div
        className="
          px-3 py-2
          bg-[var(--color-surface-inactive)]
          backdrop-blur-xl
          border-t border-[var(--color-surface-border)]
          rounded-[20px]
          flex items-end
          gap-2.5
          shadow-[0_20px_40px_rgba(0,0,0,0.08)]
          ring-1 ring-black/5
          transition-colors duration-200
        "
      >
        <DockIcon
          id="about"
          icon={User}
          label="About Me"
        />

        <DockIcon
          id="projects"
          icon={FolderCode}
          label="Projects"
        />

        <DockIcon
          id="resume"
          icon={FileText}
          label="Resume"
        />

        <DockIcon
          id="notepad"
          icon={Notebook}
          label="Notes"
        />

        <DockIcon
          id="contact"
          icon={Mail}
          label="Contact"
        />

        {/* Divider */}
        <div
          className="
            w-[1px]
            h-8
            bg-[var(--color-surface-border)]
            rounded-full
            mx-1
            self-center
            transition-colors duration-200
          "
        />

        <DockIcon
          id="terminal"
          icon={Terminal}
          label="Terminal"
        />

        {/* -------------------------------------------------
            Theme Toggle
        ------------------------------------------------- */}

        <div className="relative group flex flex-col items-center justify-center ml-0.5">
          {/* Tooltip */}
          <span
            className="
              absolute -top-11
              opacity-0
              group-hover:opacity-100
              transition-all duration-150
              bg-[var(--color-surface-dark)]
              border-t border-[var(--color-surface-border)]
              text-[var(--color-text)]
              text-[11px]
              px-2.5 py-1
              rounded-md
              pointer-events-none
              z-[99999]
              shadow-md
              whitespace-nowrap
            "
          >
            {isLight
              ? "Switch to Dark"
              : "Switch to Light"}
          </span>

          <motion.button
            type="button"
            aria-label={
              isLight
                ? "Switch to dark mode"
                : "Switch to light mode"
            }
            aria-pressed={isLight}
            whileHover={{
              scale: 1.12,
              y: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            onClick={handleThemeToggle}
            className="
              relative
              flex items-center justify-center
              w-[48px] h-[48px]
              transition-all
              cursor-pointer
            "
          >
            <div
              className="
                w-[44px] h-[44px]
                flex items-center justify-center
                rounded-[12px]
                bg-[var(--color-surface-inactive)]
                border-t border-[var(--color-surface-border)]
                hover:border-[var(--color-accent)]
                shadow-[0_4px_12px_rgba(0,0,0,0.08)]
                transition-all duration-200
              "
            >
              {isLight ? (
                <Moon
                  size={21}
                  strokeWidth={2}
                  className="text-[var(--color-accent)]"
                />
              ) : (
                <Sun
                  size={21}
                  strokeWidth={2}
                  className="text-amber-400"
                />
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
