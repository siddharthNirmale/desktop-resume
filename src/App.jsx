import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

// Hooks
import useWindows from "./hooks/useWindows";
import useIsMobile from "./hooks/useIsMobile";
import useContextMenu from "./hooks/useContextMenu";

// Components
import Preloader from "./components/Preloader";
import DesktopDisplay from "./mode/DesktopDisplay";
import SmallDisplay from "./mode/SmallDisplay";
import CommandPalette from "./components/CommandPalette";

// Config (Centralized outside the render cycle)
import { initialWindowsConfig } from "./config/windowsConfig";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [wallpaper, setWallpaper] = useState("");

  const desktopRef = useRef(null);

  // Abstracted logic into custom hooks for clean architecture
  const isMobile = useIsMobile(768);
  const { menu, handleContextMenu, closeMenu } = useContextMenu(isMobile);

  // Passed centralized config to the windows manager
  const {
    windows,
    bringToFront,
    toggleWindow,
    toggleWidget,
    minimizeAll,
    restoreAll,
    resetLayout,
  } = useWindows(initialWindowsConfig);

  return (
    <main
      ref={desktopRef}
      onContextMenu={handleContextMenu}
      onClick={closeMenu}
      className="relative w-screen h-screen overflow-hidden select-none bg-black text-white"
    >
      {/* PRINCIPLE: Fluid, purposeful motion for state changes */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader
            key="preloader"
            onLoadingComplete={() => setIsLoading(false)}
          />
        )}
      </AnimatePresence>

      {!isLoading && (
        <div className="absolute inset-0 w-full h-full">
          {isMobile ? (
            <SmallDisplay
              windows={windows}
              toggleWindow={toggleWindow}
              setWallpaper={setWallpaper}
            />
          ) : (
            <DesktopDisplay
              desktopRef={desktopRef}
              windows={windows}
              toggleWindow={toggleWindow}
              toggleWidget={toggleWidget}
              minimizeAll={minimizeAll}
              restoreAll={restoreAll}
              resetLayout={resetLayout}
              bringToFront={bringToFront}
              menu={menu}
              closeMenu={closeMenu}
              wallpaper={wallpaper}
              setWallpaper={setWallpaper}
            />
          )}
        </div>
      )}

      {/* Global Command Palette */}
      <CommandPalette
        toggleWindow={toggleWindow}
        toggleWidget={toggleWidget}
        minimizeAll={minimizeAll}
        restoreAll={restoreAll}
        resetLayout={resetLayout}
        bringToFront={bringToFront}
      />
    </main>
  );
}

