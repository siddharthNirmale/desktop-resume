import { useRef, useMemo, Suspense, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { LoaderIcon as Loader2 } from "lucide-animated";;

// Components
import Background from "../components/Background";
import Window from "../components/Window";
import Dock from "../components/Dock";
import ContextMenu from "../components/ContextMenu";
import TopBar from "../components/TopBar";

// Centralized Configs (Assuming we moved these to a registry)
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
  bringToFront,
  menu,
  closeMenu,
  wallpaper,
  setWallpaper,
}) {
  const workspaceRef = useRef(null);

  // Split windows/widgets for rendering efficiency
  const visibleWidgets = useMemo(() =>
    windows.filter((w) => w.type === "widget" && w.isOpen && !w.isMinimized),
    [windows]);

  const visibleWindows = useMemo(() =>
    windows.filter((w) => w.type === "window" && w.isOpen && !w.isMinimized),
    [windows]);

  // Sync wallpaper & accent color to CSS variables/storage
  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("os-wallpaper", wallpaper);

    const savedAccent = localStorage.getItem("os-accent");
    if (savedAccent) {
      document.documentElement.style.setProperty("--color-accent", savedAccent);
    }
  }, [wallpaper]);

  return (
    <div
      className="fixed inset-0 w-screen h-screen overflow-hidden font-primary text-[var(--color-text)] bg-[var(--color-desktop)]"
      style={wallpaper ? { background: `url(${wallpaper}) center/cover no-repeat` } : {}}
    >
      {/* 1. BACKGROUND LAYER (z-0) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {!wallpaper && <Background />}
      </div>

      {/* 2. TOP BAR LAYER (z-100) */}
      <div className="absolute inset-x-0 top-0 z-[100] h-[var(--topbar-height,26px)] pointer-events-auto">
        <TopBar />
      </div>

      {/* 3. WORKSPACE LAYER (z-10) - Everything that moves/resizes lives here */}
      <main
        ref={workspaceRef}
        className="absolute inset-x-0 bottom-0 top-[var(--topbar-height,26px)] z-10 overflow-hidden min-h-0 isolate"
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
                    {...(widget.id === "theme" ? { setWallpaper } : {})}
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
                    constraintsRef={workspaceRef}
                    onClose={() => toggleWindow(win.id, "isOpen", false)}
                    onMinimize={() => toggleWindow(win.id, "isMinimized", true)}
                    onFocus={() => bringToFront(win.id)}
                  >
                    <div
                      className="w-full h-full min-h-0 bg-[var(--color-surface)] rounded-b-xl overflow-y-auto overflow-x-hidden custom-scrollbar transition-colors duration-250"
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

      {/* 4. CONTEXT MENU (z-90) */}
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
              />
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. DOCK (z-80) */}
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
