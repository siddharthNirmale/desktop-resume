import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import useWindows from "./hooks/useWindows";
import Preloader from "./components/Preloader";

// Display Modes
import DesktopDisplay from "./mode/DesktopDisplay";
import SmallDisplay from "./mode/SmallDisplay";

export default function App() {
  const [wallpaper, setWallpaper] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);

  const desktopRef = useRef(null);

  // Responsive screen size listener (Up to 1024px handles iPads/Tablets and below)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Viewport-percentage calculation helpers for safe initialization
  const vw = (pct) => (typeof window !== "undefined" ? Math.round(window.innerWidth * pct) : 800);
  const vh = (pct) => (typeof window !== "undefined" ? Math.round(window.innerHeight * pct) : 600);

  const { windows, bringToFront, toggleWindow } = useWindows([
    { id: "about", title: "About", isOpen: true, type: "window", defaultWidth: vw(0.7), defaultHeight: vh(0.75) },
    { id: "projects", title: "Projects", isOpen: false, type: "window", defaultWidth: vw(0.7), defaultHeight: vh(0.75) },
    { id: "notepad", title: "Notes", isOpen: false, type: "window", defaultWidth: vw(0.6), defaultHeight: vh(0.65) },
    { id: "contact", title: "Contact", isOpen: false, type: "window", defaultWidth: vw(0.5), defaultHeight: vh(0.6) },
    { id: "terminal", title: "Terminal", isOpen: false, type: "window", defaultWidth: vw(0.6), defaultHeight: vh(0.55) },
    { id: "resume", title: "Resume", isOpen: false, type: "window", defaultWidth: vw(0.7), defaultHeight: vh(0.8) },

    { id: "clock", title: "Local Time", isOpen: true, type: "widget" },
    { id: "github", title: "Contributions", isOpen: true, type: "widget" },
    { id: "learning", title: "Learning", isOpen: true, type: "widget" },
    { id: "weather", title: "Weather", isOpen: true, type: "widget" },
    { id: "theme", title: "Appearance", isOpen: true, type: "widget" },
    { id: "skills", title: "Skills", isOpen: true, type: "widget" },
  ]);

  const handleContextMenu = (e) => {
    if (isMobile) return;
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
      className="w-screen h-screen relative overflow-hidden select-none"
    >
      <AnimatePresence>
        {isLoading && (
          <Preloader onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {isMobile ? (
            <SmallDisplay
              windows={windows}
              toggleWindow={toggleWindow}
              setWallpaper={setWallpaper}
            />
          ) : (
            <DesktopDisplay
              windows={windows}
              toggleWindow={toggleWindow}
              bringToFront={bringToFront}
              menu={menu}
              closeMenu={closeMenu}
              desktopRef={desktopRef}
              setWallpaper={setWallpaper}
              wallpaper={wallpaper}
            />
          )}
        </>
      )}
    </div>
  );
}