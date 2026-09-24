import { useRef, useMemo, Suspense, useEffect, useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { LoaderIcon as Loader2 } from "lucide-animated";
import { isValidHexColor, sanitizeCssUrl } from "../utils/security";
import { safeGetItem, safeRemoveItem } from "../utils/storage";

// Components
import Background from "../components/Background";
import Window from "../components/Window";
import Dock from "../components/Dock";
import ContextMenu from "../components/ContextMenu";
import TopBar from "../components/TopBar";
import ControlCenter from "../components/ControlCenter";

// Centralized Configs
import { WIDGET_MAP, WIDGET_PROPS, APP_MAP } from "../config/componentRegistry";

// ============================================================
// LOADER FALLBACK
// ============================================================
const AppLoader = () => (
  <div className="w-full h-full min-h-[160px] flex items-center justify-center bg-[var(--color-surface)]">
    <Loader2 className="w-6 h-6 animate-spin text-[var(--color-accent)] opacity-60" />
  </div>
);

// ============================================================
// DESKTOP DISPLAY (Pure Layout Orchestrator)
// ============================================================
export default function DesktopDisplay({
  windows,
  toggleWindow,
  toggleWidget,
  minimizeAll,
  restoreAll,
  resetLayout,
  bringToFront,
  menu,
  closeMenu,
  wallpaper,
  setWallpaper,
}) {
  const workspaceRef = useRef(null);
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false);

  // Partition windows and compute states in a single direct pass
  let maxWindowZ = 0;
  let hasOpenWindow = false;
  let areAllWindowsMinimized = true;
  const visibleWidgets = [];
  const visibleWindows = [];

  for (const w of windows) {
    if (w.isOpen) {
      if (w.type === "widget" && !w.isMinimized) {
        visibleWidgets.push(w);
      } else if (w.type === "window") {
        hasOpenWindow = true;
        if (!w.isMinimized) {
          areAllWindowsMinimized = false;
          visibleWindows.push(w);
          if ((w.zIndex || 0) > maxWindowZ) maxWindowZ = w.zIndex || 0;
        }
      }
    }
  }

  const allWindowsMinimized = hasOpenWindow && areAllWindowsMinimized;

  const handleToggleControlCenter = useCallback(() => {
    setIsControlCenterOpen((prev) => !prev);
  }, []);

  // Sync accent color to CSS variables & ensure session wallpaper doesn't linger across reloads
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Do NOT persist wallpaper across sessions; clear any legacy saved wallpaper on mount
    safeRemoveItem("os-wallpaper");

    const savedAccent = safeGetItem("os-accent");
    if (savedAccent && isValidHexColor(savedAccent)) {
      document.documentElement.style.setProperty("--color-accent", savedAccent);
    }
  }, []);

  const safeWallpaper = useMemo(() => sanitizeCssUrl(wallpaper), [wallpaper]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden font-primary text-[var(--color-text)] bg-[var(--color-desktop)]"
      style={safeWallpaper ? { background: `url("${safeWallpaper}") center/cover no-repeat` } : {}}
    >
      {/* 1. BACKGROUND LAYER (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {!wallpaper && <Background />}
      </div>

      {/* 2. TOP BAR LAYER (z-100) */}
      <div className="absolute inset-x-0 top-0 z-[100] h-[var(--topbar-height,28px)] pointer-events-auto">
        <TopBar
          onToggleControlCenter={handleToggleControlCenter}
          isControlCenterOpen={isControlCenterOpen}
          toggleWindow={toggleWindow}
          bringToFront={bringToFront}
          toggleWidget={toggleWidget}
        />
      </div>

      {/* 3. CONTROL CENTER LAYER (z-[105]) */}
      <ControlCenter
        isOpen={isControlCenterOpen}
        onClose={() => setIsControlCenterOpen(false)}
        windows={windows}
        toggleWindow={toggleWindow}
        toggleWidget={toggleWidget}
        minimizeAll={minimizeAll}
        restoreAll={restoreAll}
        resetLayout={resetLayout}
        bringToFront={bringToFront}
      />

      {/* 4. WORKSPACE LAYER (z-10) - Everything that moves/resizes lives here */}
      <main
        ref={workspaceRef}
        className="absolute inset-x-0 bottom-0 top-[var(--topbar-height,28px)] z-10 overflow-hidden min-h-0 isolate"
      >
        {/* WIDGETS */}
        <section className="absolute inset-0 z-10 pointer-events-none">
          {visibleWidgets.map((widget) => {
            const WidgetComponent = WIDGET_MAP[widget.id];
            if (!WidgetComponent) return null;

            return (
              <div key={widget.id} className="pointer-events-auto">
                <Suspense fallback={null}>
                  <WidgetComponent
                    constraintsRef={workspaceRef}
                    zIndex={widget.zIndex ?? 1}
                    onFocus={() => bringToFront(widget.id)}
                    onClose={() => toggleWindow(widget.id, "isOpen", false)}
                    {...(WIDGET_PROPS[widget.id] || {})}
                    {...(widget.id === "theme" ? { wallpaper, setWallpaper } : {})}
                  />
                </Suspense>
              </div>
            );
          })}
        </section>

        {/* WINDOWS */}
        <section className="absolute inset-0 z-20 pointer-events-none">
          <AnimatePresence mode="sync">
            {visibleWindows.map((win) => {
              const AppComponent = APP_MAP[win.id];
              if (!AppComponent) return null;

              return (
                <div key={win.id} className="pointer-events-auto">
                  <Window
                    {...win}
                    isFocused={win.zIndex === maxWindowZ}
                    constraintsRef={workspaceRef}
                    onClose={() => toggleWindow(win.id, "isOpen", false)}
                    onMinimize={() => toggleWindow(win.id, "isMinimized", true)}
                    onFocus={() => bringToFront(win.id)}
                  >
                    <div
                      className="w-full h-full min-h-0 flex flex-col overflow-hidden bg-[var(--color-surface)] rounded-b-[13px]"
                      onClick={(e) => {
                        e.stopPropagation();
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

      {/* 5. CONTEXT MENU (z-90) */}
      <AnimatePresence>
        {menu.show && (
          <div className="fixed inset-0 z-[90] pointer-events-none">
            <div
              className="pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <ContextMenu
                x={menu.x}
                y={menu.y}
                onClose={closeMenu}
                toggleWindow={toggleWindow}
                bringToFront={bringToFront}
                onOpenControlCenter={() => setIsControlCenterOpen(true)}
                minimizeAll={minimizeAll}
                restoreAll={restoreAll}
                resetLayout={resetLayout}
                allWindowsMinimized={allWindowsMinimized}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. DOCK (z-80) */}
      <div className="absolute inset-x-0 bottom-0 z-[80] pointer-events-none">
        <div className="pointer-events-auto">
          <Dock
            windows={windows}
            toggleWindow={toggleWindow}
            bringToFront={bringToFront}
          />
        </div>
      </div>
    </div>
  );
}
