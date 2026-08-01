import React, { useRef, useState, useEffect, useCallback, Suspense, lazy } from "react";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import useWindows from "../hooks/useWindows";

// 🚀 CORE SYSTEM (Keep static so the desktop paints instantly)
import Background from "../components/Background";
import Window from "../components/Window";
import Dock from "../components/Dock";
import ContextMenu from "../components/ContextMenu";
import TopBar from "../components/TopBar";
import Preloader from "../components/Preloader";

// 💤 LAZY LOADED WIDGETS (Only fetched if they are 'isOpen')
const ClockWidget = lazy(() => import("../components/ClockWidget"));
const GithubWidget = lazy(() => import("../components/GithubWidget"));
const LearningWidget = lazy(() => import("../components/LearningWidget"));
const WeatherWidget = lazy(() => import("../components/WeatherWidget"));
const ThemeWidget = lazy(() => import("../components/ThemeWidget"));
const SkillsWidget = lazy(() => import("../components/SkillsWidget"));

// 💤 LAZY LOADED APPS (Fetched ONLY when the user clicks their icon in the dock)
const AboutSection = lazy(() => import("../sections/AboutSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const Notepad = lazy(() => import("../sections/Notepad"));
const ContactSection = lazy(() => import("../sections/ContactSection"));
const Terminal = lazy(() => import("../sections/Terminal"));
const ResumeSection = lazy(() => import("../sections/ResumeSection"));

// 🗺️ COMPONENT MAPS (Replaces the massive if/else chains for O(1) lookups)
const WIDGET_MAP = {
  clock: ClockWidget,
  github: GithubWidget,
  learning: LearningWidget,
  weather: WeatherWidget,
  skills: SkillsWidget,
  theme: ThemeWidget,
};

const APP_MAP = {
  about: AboutSection,
  projects: ProjectsSection,
  resume: ResumeSection,
  notepad: Notepad,
  contact: ContactSection,
  terminal: Terminal,
};

// Sleek loading fallback while the JS chunk is downloading
const AppLoader = () => (
  <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)]">
    <Loader2 className="w-6 h-6 animate-spin text-[var(--color-accent)] opacity-50" />
  </div>
);

export default function DesktopDisplay() {
  const [wallpaper, setWallpaper] = useState(() => localStorage.getItem("os-wallpaper") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });

  const desktopRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("os-wallpaper", wallpaper);
  }, [wallpaper]);

  useEffect(() => {
    const savedAccent = localStorage.getItem("os-accent");
    if (savedAccent) {
      document.documentElement.style.setProperty("--color-accent", savedAccent);
    }
  }, []);

  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: "about", title: "About", isOpen: true, type: "window", defaultWidth: 800, defaultHeight: 600 },
    { id: "projects", title: "Projects", isOpen: false, type: "window", defaultWidth: 800, defaultHeight: 600 },
    { id: "notepad", title: "Notes", isOpen: false, type: "window", defaultWidth: 800, defaultHeight: 600 },
    { id: "contact", title: "Contact", isOpen: false, type: "window", defaultWidth: 800, defaultHeight: 600 },
    { id: "terminal", title: "Terminal", isOpen: false, type: "window", defaultWidth: 800, defaultHeight: 600 },
    { id: "resume", title: "Resume", isOpen: false, type: "window", defaultWidth: 800, defaultHeight: 600 },

    { id: "clock", title: "Local Time", isOpen: true, type: "widget" },
    { id: "github", title: "Contributions", isOpen: true, type: "widget" },
    { id: "learning", title: "Learning", isOpen: true, type: "widget" },
    { id: "weather", title: "Weather", isOpen: true, type: "widget" },
    { id: "theme", title: "Appearance", isOpen: true, type: "widget" },
    { id: "skills", title: "Skills", isOpen: true, type: "widget" },
  ]);

  // 🧠 useCallback prevents re-creating these functions on every single render
  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setMenu({ show: true, x: e.clientX, y: e.clientY });
  }, []);

  const closeMenu = useCallback(() => {
    setMenu((prev) => (prev.show ? { show: false, x: 0, y: 0 } : prev));
  }, []);

  return (
    <div
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
      className="w-screen h-screen relative overflow-hidden font-primary text-[var(--color-text)] bg-[var(--color-desktop)] select-none"
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <>
          <TopBar />
          {!wallpaper && <Background />}

          <AnimatePresence>
            {menu.show && (
              <ContextMenu
                x={menu.x}
                y={menu.y}
                onClose={closeMenu}
                toggleWindow={toggleWindow}
                bringToFront={bringToFront}
              />
            )}
          </AnimatePresence>

          {/* LAYER 1: WIDGETS */}
          {windows
            .filter((w) => w.type === "widget" && w.isOpen)
            .map((widget) => {
              const WidgetComponent = WIDGET_MAP[widget.id];
              if (!WidgetComponent) return null;

              return (
                <Suspense key={widget.id} fallback={null}>
                  <WidgetComponent
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                    // Pass specific props dynamically based on ID if needed
                    {...(widget.id === "learning" && { progress: 55, topic: "Frontend Optimization", subtopic: "Next.js 14" })}
                    {...(widget.id === "theme" && { setWallpaper })}
                  />
                </Suspense>
              );
            })}

          {/* LAYER 2: WINDOWS */}
          <AnimatePresence>
            {windows
              .filter((w) => w.type === "window" && w.isOpen)
              .map((win) => {
                const AppComponent = APP_MAP[win.id];
                if (!AppComponent) return null;

                return (
                  <Window
                    key={win.id}
                    {...win}
                    constraintsRef={desktopRef}
                    onClose={() => toggleWindow(win.id, "isOpen", false)}
                    onMinimize={() => toggleWindow(win.id, "isMinimized", true)}
                    onFocus={() => bringToFront(win.id)}
                  >
                    <div className="w-full h-full min-h-0 bg-[var(--color-surface)] rounded-b-xl overflow-y-auto custom-scrollbar transition-colors duration-250">
                      {/* Suspense handles the network request gap when they click an app for the first time */}
                      <Suspense fallback={<AppLoader />}>
                        <AppComponent />
                      </Suspense>
                    </div>
                  </Window>
                );
              })}
          </AnimatePresence>

          <Dock
            windows={windows}
            toggleWindow={toggleWindow}
            bringToFront={bringToFront}
          />
        </>
      )}
    </div>
  );
}
