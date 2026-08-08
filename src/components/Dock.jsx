import { useState, useEffect, useRef } from "react";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

// ---------------------------------------------------------
// Image Imports & Array
// ---------------------------------------------------------
import About from "../assets/images/About.png";
import Contact from "../assets/images/Contact.png";
import Notes from "../assets/images/Notes.png";
import Projects from "../assets/images/Projects.png";
import Resume from "../assets/images/Resume.png";
import Terminal from "../assets/images/Terminal.png";

const Icon = [
  { name: "About", image: About },
  { name: "Contact", image: Contact },
  { name: "Notes", image: Notes },
  { name: "Projects", image: Projects },
  { name: "Resume", image: Resume },
  { name: "Terminal", image: Terminal },
];

// ---------------------------------------------------------
// App Icon Styling
// ---------------------------------------------------------

const getAppIconStyle = () => {
  return {
    wrapper: `
      w-[44px] h-[44px]
      flex items-center justify-center
      rounded-[16px]
      bg-[var(--color-surface-inactive)]
      border-t border-[var(--color-surface-border)]
      shadow-[0_8px_16px_rgba(0,0,0,0.12)]
      transition-all duration-300
    `,
  };
};

// ---------------------------------------------------------
// Dock
// ---------------------------------------------------------

export default function Dock({ windows, toggleWindow, bringToFront }) {
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
      theme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }

    const light = theme === "light";

    setIsLight(light);

    // Always keep the root element in sync
    document.documentElement.classList.toggle("light-theme", light);

    // Also keep body synced if your existing CSS depends on it
    document.body.classList.toggle("light-theme", light);
  }, []);

  // -------------------------------------------------------
  // Theme Toggle
  // -------------------------------------------------------

  const handleThemeToggle = (e) => {
    const nextTheme = isLight ? "dark" : "light";
    const nextIsLight = nextTheme === "light";

    const applyTheme = () => {
      document.documentElement.classList.toggle("light-theme", nextIsLight);
      document.body.classList.toggle("light-theme", nextIsLight);

      localStorage.setItem("theme", nextTheme);

      setIsLight(nextIsLight);
    };

    // Fallback for browsers without View Transitions
    if (typeof document.startViewTransition !== "function") {
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

    const transition = document.startViewTransition(applyTheme);

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
            easing: "cubic-bezier(0.25, 1, 0.5, 1)",
            pseudoElement: "::view-transition-new(root)",
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

  const DockIcon = ({ id, image, label, badge }) => {
    const win = windows?.find((window) => window.id === id);

    // Widgets don't appear in the dock
    if (win?.type === "widget") {
      return null;
    }

    const isOpen = win?.isOpen;
    const isMinimized = win?.isMinimized;

    const { wrapper } = getAppIconStyle();

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
          window.type === "window" && window.isOpen && !window.isMinimized
      );

      const maxZ = Math.max(
        ...activeWindows.map((window) => window.zIndex || 0),
        0
      );

      // Active window → Minimize
      if (win.zIndex === maxZ) {
        toggleWindow(id, "isMinimized", true);
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
            absolute -top-12
            opacity-0
            group-hover:opacity-100
            transition-all duration-200
            bg-[var(--color-surface-dark)]
            border-t border-[var(--color-surface-border)]
            text-[var(--color-text)]
            text-[12px] font-medium
            px-3 py-1.5
            rounded-md
            pointer-events-none
            z-[99999]
            shadow-lg
            whitespace-nowrap
          "
        >
          {label}
        </span>

        {/* App Button */}
        <motion.button
          type="button"
          whileHover={{
            scale: 1.2,
            y: -6,
          }}
          whileTap={{
            scale: 0.95,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
          }}
          onClick={handleClick}
          className="
            relative
            flex items-center justify-center
            w-[64px] h-[64px]
            transition-all
            cursor-pointer
          "
        >
          <div
            className={`
              ${wrapper}
              group-hover:border-[var(--color-accent)]
              group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]
            `}
          >
            <img
              src={image}
              alt={label}
              className="w-10 h-10 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          {/* Notification Badge */}
          {badge > 0 && (
            <div
              className="
                absolute -top-1 -right-1
                min-w-[20px] h-[20px]
                px-1.5
                bg-[#FF3B30]
                text-white
                text-[11px]
                font-bold
                rounded-full
                flex items-center justify-center
                border-2 border-[var(--color-surface-inactive)]
                shadow-md
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
              absolute -bottom-2.5
              flex justify-center items-center
              h-2
            "
          >
            <div
              className={`
                rounded-full
                transition-all duration-300
                ${isMinimized
                  ? `
                      w-[4px] h-[4px]
                      bg-[var(--color-text-tertiary)]
                    `
                  : `
                      w-[5px] h-[5px]
                      bg-[var(--color-text)]
                      shadow-[0_0_8px_var(--color-text)]
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
        bottom-4
        left-1/2
        -translate-x-1/2
        z-[99999]
        pointer-events-auto
      "
    >
      <div
        className="
          px-4 py-3
          bg-[var(--color-surface-inactive)]
          backdrop-blur-xl
          border-t border-[var(--color-surface-border)]
          rounded-[24px]
          flex items-end
          gap-3
          shadow-[0_24px_48px_rgba(0,0,0,0.15)]
          ring-1 ring-black/5
          transition-colors duration-300
        "
      >
        <DockIcon id="about" image={About} label="About Me" />
        <DockIcon id="projects" image={Projects} label="Projects" />
        <DockIcon id="resume" image={Resume} label="Resume" />
        <DockIcon id="notepad" image={Notes} label="Notes" />
        <DockIcon id="contact" image={Contact} label="Contact" />

        {/* Divider */}
        <div
          className="
            w-[2px]
            h-10
            bg-[var(--color-surface-border)]
            rounded-full
            mx-2
            self-center
            transition-colors duration-200
            opacity-70
          "
        />

        <DockIcon id="terminal" image={Terminal} label="Terminal" />

        {/* -------------------------------------------------
            Theme Toggle
        ------------------------------------------------- */}

        <div className="relative group flex flex-col items-center justify-center ml-1">
          {/* Tooltip */}
          <span
            className="
              absolute -top-12
              opacity-0
              group-hover:opacity-100
              transition-all duration-200
              bg-[var(--color-surface-dark)]
              border-t border-[var(--color-surface-border)]
              text-[var(--color-text)]
              text-[12px] font-medium
              px-3 py-1.5
              rounded-md
              pointer-events-none
              z-[99999]
              shadow-lg
              whitespace-nowrap
            "
          >
            {isLight ? "Switch to Dark" : "Switch to Light"}
          </span>

          <motion.button
            type="button"
            aria-label={
              isLight ? "Switch to dark mode" : "Switch to light mode"
            }
            aria-pressed={isLight}
            whileHover={{
              scale: 1.2,
              y: -6,
            }}
            whileTap={{
              scale: 0.95,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 20,
            }}
            onClick={handleThemeToggle}
            className="
              relative
              flex items-center justify-center
              w-[64px] h-[64px]
              transition-all
              cursor-pointer
            "
          >
            <div
              className="
                w-[56px] h-[56px]
                flex items-center justify-center
                rounded-[16px]
                bg-[var(--color-surface-inactive)]
                border-t border-[var(--color-surface-border)]
                hover:border-[var(--color-accent)]
                shadow-[0_8px_16px_rgba(0,0,0,0.12)]
                group-hover:shadow-[0_12px_24px_rgba(0,0,0,0.2)]
                transition-all duration-300
              "
            >
              {isLight ? (
                <Moon
                  size={28}
                  strokeWidth={2}
                  className="text-[var(--color-accent)] transition-transform group-hover:scale-105"
                />
              ) : (
                <Sun
                  size={28}
                  strokeWidth={2}
                  className="text-amber-400 transition-transform group-hover:scale-105"
                />
              )}
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
