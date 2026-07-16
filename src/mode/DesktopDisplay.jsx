import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import useWindows from "../hooks/useWindows";
import Background from "../components/Background";

// System Components
import Window from "../components/Window";
import Dock from "../components/Dock";

import ContextMenu from "../components/ContextMenu";
import TopBar from "../components/TopBar";
import Preloader from "../components/Preloader";

// Desktop Widgets
import ClockWidget from "../components/ClockWidget";
import GithubWidget from "../components/GithubWidget";
import LearningWidget from "../components/LearningWidget";
import WeatherWidget from "../components/WeatherWidget";
import ThemeWidget from "../components/ThemeWidget";
import SkillsWidget from "../components/SkillsWidget";

// App Sections
import AboutSection from "../sections/AboutSection";
import ProjectsSection from "../sections/ProjectsSection";
import Notepad from "../sections/Notepad";
import ContactSection from "../sections/ContactSection";
import Terminal from "../sections/Terminal";
import ResumeSection from "../sections/ResumeSection";

export default function DesktopDisplay() {
  // 1. Initialize wallpaper directly from storage
  const [wallpaper, setWallpaper] = useState(() => {
    return localStorage.getItem("os-wallpaper") || "";
  });

  const [isLoading, setIsLoading] = useState(false);
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });

  const desktopRef = useRef(null);

  // 2. Automatically save wallpaper whenever it changes
  useEffect(() => {
    localStorage.setItem("os-wallpaper", wallpaper);
  }, [wallpaper]);

  // 3. Apply the Accent Color to the document immediately on boot
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

  const handleContextMenu = (e) => {
    e.preventDefault();
    setMenu({ show: true, x: e.clientX, y: e.clientY });
  };

  const closeMenu = () => {
    if (menu.show) setMenu({ show: false, x: 0, y: 0 });
  };

  return (
    <div
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
      // Removed transition-colors so the View Transition wave animation is perfectly crisp!
      className="
        w-screen h-screen
        relative overflow-hidden
        font-primary
        text-[var(--color-text)]
        bg-[var(--color-desktop)]
        select-none
      "
      style={{
        backgroundImage: wallpaper ? `url(${wallpaper})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <AnimatePresence>
        {isLoading && (
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <TopBar />

          {/* Background layer only when no wallpaper */}
          {!wallpaper && <Background />}

          {/* Context Menu */}
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

          {/* Widgets Layer */}
          {windows
            .filter((w) => w.type === "widget" && w.isOpen)
            .map((widget) => (
              <div key={widget.id}>
                {widget.id === "clock" && (
                  <ClockWidget
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                  />
                )}

                {widget.id === "github" && (
                  <GithubWidget
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                  />
                )}

                {widget.id === "learning" && (
                  <LearningWidget
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                    progress={55}
                    topic="Frontend Optimization"
                    subtopic="Next.js 14"
                  />
                )}

                {widget.id === "weather" && (
                  <WeatherWidget
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                  />
                )}

                {widget.id === "skills" && (
                  <SkillsWidget
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                  />
                )}

                {widget.id === "theme" && (
                  <ThemeWidget
                    constraintsRef={desktopRef}
                    zIndex={widget.zIndex || 1}
                    onFocus={() => bringToFront(widget.id)}
                    setWallpaper={setWallpaper}
                  />
                )}
              </div>
            ))}

          {/* Windows Layer */}
          <AnimatePresence>
            {windows
              .filter((w) => w.type === "window" && w.isOpen)
              .map((win) => (
                <Window
                  key={win.id}
                  {...win}
                  constraintsRef={desktopRef}
                  onClose={() => toggleWindow(win.id, "isOpen", false)}
                  onMinimize={() => toggleWindow(win.id, "isMinimized", true)}
                  onFocus={() => bringToFront(win.id)}
                >
                  {/* Cleaned up interior wrapper to use global dynamic bg-[var(--color-surface)] */}
                  <div className="w-full h-full min-h-0 bg-[var(--color-surface)] rounded-b-xl overflow-y-auto custom-scrollbar transition-colors duration-250">
                    {win.id === "about" && <AboutSection />}
                    {win.id === "projects" && <ProjectsSection />}
                    {win.id === "resume" && <ResumeSection />}
                    {win.id === "notepad" && <Notepad />}
                    {win.id === "contact" && <ContactSection />}
                    {win.id === "terminal" && <Terminal />}
                  </div>
                </Window>
              ))}
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
