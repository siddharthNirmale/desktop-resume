import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import useWindows from "../hooks/useWindows";

// ============================================================
// CORE SYSTEM
// Keep these static so the desktop can paint immediately.
// ============================================================

import Background from "../components/Background";
import Window from "../components/Window";
import Dock from "../components/Dock";
import ContextMenu from "../components/ContextMenu";
import TopBar from "../components/TopBar";
import Preloader from "../components/Preloader";

// ============================================================
// LAZY LOADED WIDGETS
// ============================================================

const ClockWidget = lazy(() => import("../components/ClockWidget"));
const GithubWidget = lazy(() => import("../components/GithubWidget"));
const LearningWidget = lazy(() => import("../components/LearningWidget"));
const WeatherWidget = lazy(() => import("../components/WeatherWidget"));
const ThemeWidget = lazy(() => import("../components/ThemeWidget"));
const SkillsWidget = lazy(() => import("../components/SkillsWidget"));

// ============================================================
// LAZY LOADED APPS
// ============================================================

const AboutSection = lazy(() => import("../sections/AboutSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const Notepad = lazy(() => import("../sections/Notepad"));
const ContactSection = lazy(() => import("../sections/ContactSection"));
const Terminal = lazy(() => import("../sections/Terminal"));
const ResumeSection = lazy(() => import("../sections/ResumeSection"));

// ============================================================
// COMPONENT MAPS
// ============================================================

const WIDGET_MAP = {
  clock: ClockWidget,
  github: GithubWidget,
  learning: LearningWidget,
  weather: WeatherWidget,
  theme: ThemeWidget,
  skills: SkillsWidget,
};

const APP_MAP = {
  about: AboutSection,
  projects: ProjectsSection,
  resume: ResumeSection,
  notepad: Notepad,
  contact: ContactSection,
  terminal: Terminal,
};

// ============================================================
// WIDGET PROPS
// Keeps widget-specific data outside the render logic.
// ============================================================

const WIDGET_PROPS = {
  learning: {
    progress: 55,
    topic: "Frontend Optimization",
    subtopic: "Next.js 14",
  },
};

// ============================================================
// WINDOW INITIAL STATE
// ============================================================

const INITIAL_WINDOWS = [
  // Applications
  {
    id: "about",
    title: "About",
    isOpen: true,
    isMinimized: false,
    type: "window",
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: "projects",
    title: "Projects",
    isOpen: false,
    isMinimized: false,
    type: "window",
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: "notepad",
    title: "Notes",
    isOpen: false,
    isMinimized: false,
    type: "window",
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: "contact",
    title: "Contact",
    isOpen: false,
    isMinimized: false,
    type: "window",
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: "terminal",
    title: "Terminal",
    isOpen: false,
    isMinimized: false,
    type: "window",
    defaultWidth: 800,
    defaultHeight: 600,
  },
  {
    id: "resume",
    title: "Resume",
    isOpen: false,
    isMinimized: false,
    type: "window",
    defaultWidth: 800,
    defaultHeight: 600,
  },

  // Widgets
  {
    id: "clock",
    title: "Local Time",
    isOpen: true,
    isMinimized: false,
    type: "widget",
  },
  {
    id: "github",
    title: "Contributions",
    isOpen: true,
    isMinimized: false,
    type: "widget",
  },
  {
    id: "learning",
    title: "Learning",
    isOpen: true,
    isMinimized: false,
    type: "widget",
  },
  {
    id: "weather",
    title: "Weather",
    isOpen: true,
    isMinimized: false,
    type: "widget",
  },
  {
    id: "theme",
    title: "Appearance",
    isOpen: true,
    isMinimized: false,
    type: "widget",
  },
  {
    id: "skills",
    title: "Skills",
    isOpen: true,
    isMinimized: false,
    type: "widget",
  },
];

// ============================================================
// LOADER
// ============================================================

const AppLoader = () => {
  return (
    <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-[var(--color-surface)]">
      <Loader2
        className="
          w-6 h-6
          animate-spin
          text-[var(--color-accent)]
          opacity-60
        "
      />
    </div>
  );
};

// ============================================================
// DESKTOP DISPLAY
// ============================================================

export default function DesktopDisplay() {
  // ----------------------------------------------------------
  // Refs
  // ----------------------------------------------------------

  const desktopRef = useRef(null);

  // IMPORTANT:
  // This is the actual area where windows/widgets are allowed.
  // It starts BELOW the TopBar.
  const workspaceRef = useRef(null);

  // ----------------------------------------------------------
  // Local state
  // ----------------------------------------------------------

  const [wallpaper, setWallpaper] = useState(() => {
    if (typeof window === "undefined") return "";

    return localStorage.getItem("os-wallpaper") || "";
  });

  const [isLoading, setIsLoading] = useState(false);

  const [menu, setMenu] = useState({
    show: false,
    x: 0,
    y: 0,
  });

  // ----------------------------------------------------------
  // Window manager
  // ----------------------------------------------------------

  const {
    windows,
    bringToFront,
    toggleWindow,
  } = useWindows(INITIAL_WINDOWS);

  // ==========================================================
  // PERSIST WALLPAPER
  // ==========================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("os-wallpaper", wallpaper);
  }, [wallpaper]);

  // ==========================================================
  // RESTORE ACCENT COLOR
  // ==========================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    const savedAccent = localStorage.getItem("os-accent");

    if (savedAccent) {
      document.documentElement.style.setProperty(
        "--color-accent",
        savedAccent
      );
    }
  }, []);

  // ==========================================================
  // SPLIT WINDOWS / WIDGETS
  // ==========================================================

  const visibleWidgets = useMemo(() => {
    return windows.filter(
      (window) =>
        window.type === "widget" &&
        window.isOpen &&
        !window.isMinimized
    );
  }, [windows]);

  const visibleWindows = useMemo(() => {
    return windows.filter(
      (window) =>
        window.type === "window" &&
        window.isOpen &&
        !window.isMinimized
    );
  }, [windows]);

  // ==========================================================
  // CONTEXT MENU
  // ==========================================================

  const handleContextMenu = useCallback((event) => {
    event.preventDefault();

    const MENU_WIDTH = 220;
    const MENU_HEIGHT = 260;
    const PADDING = 8;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let x = event.clientX;
    let y = event.clientY;

    // Prevent menu from leaving right edge
    if (x + MENU_WIDTH > viewportWidth - PADDING) {
      x = viewportWidth - MENU_WIDTH - PADDING;
    }

    // Prevent menu from leaving bottom edge
    if (y + MENU_HEIGHT > viewportHeight - PADDING) {
      y = viewportHeight - MENU_HEIGHT - PADDING;
    }

    // Safety bounds
    x = Math.max(PADDING, x);
    y = Math.max(PADDING, y);

    setMenu({
      show: true,
      x,
      y,
    });
  }, []);

  // ==========================================================
  // CLOSE CONTEXT MENU
  // ==========================================================

  const closeMenu = useCallback(() => {
    setMenu((previous) => {
      if (!previous.show) return previous;

      return {
        show: false,
        x: 0,
        y: 0,
      };
    });
  }, []);

  // ==========================================================
  // CLOSE MENU WHEN ESC IS PRESSED
  // ==========================================================

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [closeMenu]);

  // ==========================================================
  // BACKGROUND STYLE
  // ==========================================================

  const desktopStyle = useMemo(() => {
    if (!wallpaper) return undefined;

    return {
      backgroundImage: `url(${wallpaper})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    };
  }, [wallpaper]);

  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
      className="
        fixed
        inset-0
        w-screen
        h-screen
        overflow-hidden
        select-none
        font-primary
        text-[var(--color-text)]
        bg-[var(--color-desktop)]
      "
      style={desktopStyle}
    >
      {/* ======================================================
          PRELOADER
          ====================================================== */}

      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* ==================================================
              BACKGROUND
              z-index: 0
              ================================================== */}

          <div
            className="
              absolute
              inset-0
              z-0
              pointer-events-none
              overflow-hidden
            "
          >
            {!wallpaper && <Background />}
          </div>

          {/* ==================================================
              TOP BAR
              z-index: 100

              IMPORTANT:
              TopBar should itself be fixed/absolute at the
              top and should use the same height variable.
              ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              top-0
              z-[100]
              h-[var(--topbar-height,26px)]
              pointer-events-auto
            "
          >
            <TopBar />
          </div>

          {/* ==================================================
              WORKSPACE

              EVERYTHING THAT CAN MOVE / RESIZE LIVES HERE.

              This is the most important architectural change.

              Windows/widgets can NEVER go above TopBar because
              this container starts below it.
              ================================================== */}

          <main
            ref={workspaceRef}
            className="
              absolute
              inset-x-0
              bottom-0
              top-[var(--topbar-height,26px)]

              z-10

              overflow-hidden
              min-h-0

              isolate
            "
          >
            {/* ==================================================
                WIDGET LAYER
                ================================================== */}

            <section
              className="
                absolute
                inset-0
                z-10
                pointer-events-none
              "
            >
              {visibleWidgets.map((widget) => {
                const WidgetComponent = WIDGET_MAP[widget.id];

                if (!WidgetComponent) {
                  return null;
                }

                return (
                  <div
                    key={widget.id}
                    className="pointer-events-auto"
                  >
                    <Suspense fallback={null}>
                      <WidgetComponent
                        constraintsRef={workspaceRef}
                        zIndex={widget.zIndex ?? 1}
                        onFocus={() => {
                          bringToFront(widget.id);
                        }}
                        {...(WIDGET_PROPS[widget.id] || {})}
                        {...(widget.id === "theme"
                          ? { setWallpaper }
                          : {})}
                      />
                    </Suspense>
                  </div>
                );
              })}
            </section>

            {/* ==================================================
                WINDOW LAYER
                ================================================== */}

            <section
              className="
                absolute
                inset-0
                z-20
                pointer-events-none
              "
            >
              <AnimatePresence mode="sync">
                {visibleWindows.map((win) => {
                  const AppComponent = APP_MAP[win.id];

                  if (!AppComponent) {
                    return null;
                  }

                  return (
                    <div
                      key={win.id}
                      className="pointer-events-auto"
                    >
                      <Window
                        {...win}
                        constraintsRef={workspaceRef}
                        onClose={() => {
                          toggleWindow(
                            win.id,
                            "isOpen",
                            false
                          );
                        }}
                        onMinimize={() => {
                          toggleWindow(
                            win.id,
                            "isMinimized",
                            true
                          );
                        }}
                        onFocus={() => {
                          bringToFront(win.id);
                        }}
                      >
                        {/* ======================================
                            WINDOW CONTENT

                            min-h-0 is important for nested
                            scrolling/resizing.
                            ====================================== */}

                        <div
                          className="
                            w-full
                            h-full
                            min-h-0

                            bg-[var(--color-surface)]

                            rounded-b-xl

                            overflow-y-auto
                            overflow-x-hidden

                            custom-scrollbar

                            transition-colors
                            duration-250
                          "
                          onClick={(event) => {
                            // Don't let clicking inside a window
                            // accidentally close the context menu.
                            event.stopPropagation();

                            bringToFront(win.id);
                          }}
                        >
                          <Suspense fallback={<AppLoader />}>
                            <AppComponent />
                          </Suspense>
                        </div>
                      </Window>
                    </div>
                  );
                })}
              </AnimatePresence>
            </section>
          </main>

          {/* ==================================================
              CONTEXT MENU

              Above windows but below TopBar.
              ================================================== */}

          <AnimatePresence>
            {menu.show && (
              <div
                className="
                  fixed
                  inset-0
                  z-[90]
                  pointer-events-none
                "
              >
                <div
                  className="pointer-events-auto"
                  onClick={(event) => {
                    event.stopPropagation();
                  }}
                >
                  <ContextMenu
                    x={menu.x}
                    y={menu.y}
                    onClose={closeMenu}
                    toggleWindow={toggleWindow}
                    bringToFront={bringToFront}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>

          {/* ==================================================
              DOCK

              Dock is outside workspace intentionally.
              It therefore cannot be affected by window
              dragging/resizing.
              ================================================== */}

          <div
            className="
              absolute
              inset-x-0
              bottom-0
              z-[80]
              pointer-events-none
            "
          >
            <div className="pointer-events-auto">
              <Dock
                windows={windows}
                toggleWindow={toggleWindow}
                bringToFront={bringToFront}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
