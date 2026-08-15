import { useRef, useMemo, Suspense, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

// Components
import Background from "../components/Background";
import Window from "../components/Window";
import Dock from "../components/Dock";
import ContextMenu from "../components/ContextMenu";
import TopBar from "../components/TopBar";

// Centralized Configs
import {
  WIDGET_MAP,
  WIDGET_PROPS,
  APP_MAP,
} from "../config/componentRegistry";

// ============================================================
// LOADER FALLBACK
// ============================================================
const AppLoader = () => (
  <div
    className="
      flex
      h-full
      min-h-[160px]
      w-full
      items-center
      justify-center
      bg-[var(--color-surface)]
      text-[var(--color-accent)]
    "
  >
    <div className="flex flex-col items-center gap-3">
      <Loader2
        className="h-5 w-5 animate-spin opacity-60"
        strokeWidth={1.8}
      />

      <span className="text-[11px] font-medium tracking-wide opacity-40">
        Loading
      </span>
    </div>
  </div>
);

// ============================================================
// WINDOW CONTENT LOADER
// ============================================================
const WindowLoader = () => (
  <div className="flex h-full min-h-[160px] w-full items-center justify-center bg-[var(--color-surface)]">
    <div className="flex items-center gap-2.5 opacity-50">
      <Loader2
        className="h-4 w-4 animate-spin text-[var(--color-accent)]"
        strokeWidth={1.8}
      />

      <span className="text-xs font-medium">
        Loading application
      </span>
    </div>
  </div>
);

// ============================================================
// DESKTOP DISPLAY
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

  // ============================================================
  // VISIBLE WINDOWS / WIDGETS
  // ============================================================

  const visibleWidgets = useMemo(
    () =>
      windows.filter(
        (w) =>
          w.type === "widget" &&
          w.isOpen &&
          !w.isMinimized
      ),
    [windows]
  );

  const visibleWindows = useMemo(
    () =>
      windows.filter(
        (w) =>
          w.type === "window" &&
          w.isOpen &&
          !w.isMinimized
      ),
    [windows]
  );

  // ============================================================
  // WALLPAPER / ACCENT SYNC
  // ============================================================

  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem("os-wallpaper", wallpaper);

    const savedAccent = localStorage.getItem("os-accent");

    if (savedAccent) {
      document.documentElement.style.setProperty(
        "--color-accent",
        savedAccent
      );
    }
  }, [wallpaper]);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div
      className="
        fixed
        inset-0
        h-screen
        w-screen
        overflow-hidden
        bg-[var(--color-desktop)]
        font-primary
        text-[var(--color-text)]
        selection:bg-[var(--color-accent)]
        selection:text-white
      "
      style={
        wallpaper
          ? {
            backgroundImage: `url(${wallpaper})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }
          : undefined
      }
    >
      {/* ======================================================
          DESKTOP ATMOSPHERE
          ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {!wallpaper && <Background />}

        {/* Very subtle desktop depth */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.08)_100%)]
            dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.2)_100%)]
          "
        />

        {/* Soft top highlight */}
        <div
          className="
            absolute
            inset-x-0
            top-0
            h-24
            bg-gradient-to-b
            from-white/[0.035]
            to-transparent
            dark:from-white/[0.02]
          "
        />
      </div>

      {/* ======================================================
          TOP BAR
          ====================================================== */}

      <div
        className="
          pointer-events-auto
          absolute
          inset-x-0
          top-0
          z-[100]
          h-[var(--topbar-height,26px)]
        "
      >
        <TopBar />
      </div>

      {/* ======================================================
          WORKSPACE
          ====================================================== */}

      <main
        ref={workspaceRef}
        className="
          isolate
          absolute
          inset-x-0
          bottom-0
          top-[var(--topbar-height,26px)]
          z-10
          min-h-0
          overflow-hidden
        "
      >
        {/* ====================================================
            WIDGET LAYER
            ==================================================== */}

        <section
          aria-label="Desktop widgets"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
          "
        >
          {visibleWidgets.map((widget) => {
            const WidgetComponent = WIDGET_MAP[widget.id];

            if (!WidgetComponent) return null;

            return (
              <div
                key={widget.id}
                className="
                  pointer-events-auto
                  absolute
                  inset-0
                "
              >
                <Suspense fallback={null}>
                  <WidgetComponent
                    constraintsRef={workspaceRef}
                    zIndex={widget.zIndex ?? 1}
                    onFocus={() => bringToFront(widget.id)}
                    onClose={() =>
                      toggleWindow(
                        widget.id,
                        "isOpen",
                        false
                      )
                    }
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

        {/* ====================================================
            WINDOW LAYER
            ==================================================== */}

        <section
          aria-label="Desktop windows"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
          "
        >
          <AnimatePresence mode="sync">
            {visibleWindows.map((win) => {
              const AppComponent = APP_MAP[win.id];

              if (!AppComponent) return null;

              return (
                <motion.div
                  key={win.id}
                  className="
                    pointer-events-auto
                    absolute
                    inset-0
                  "
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.16,
                    ease: "easeOut",
                  }}
                >
                  <Window
                    {...win}
                    constraintsRef={workspaceRef}
                    onClose={() =>
                      toggleWindow(
                        win.id,
                        "isOpen",
                        false
                      )
                    }
                    onMinimize={() =>
                      toggleWindow(
                        win.id,
                        "isMinimized",
                        true
                      )
                    }
                    onFocus={() =>
                      bringToFront(win.id)
                    }
                  >
                    <div
                      className="
                        relative
                        h-full
                        min-h-0
                        w-full
                        overflow-x-hidden
                        overflow-y-auto
                        rounded-b-xl
                        bg-[var(--color-surface)]
                        text-[var(--color-text)]
                        custom-scrollbar
                        transition-colors
                        duration-300
                      "
                      onClick={(e) => {
                        e.stopPropagation();
                        bringToFront(win.id);
                      }}
                    >
                      {/* Subtle inner highlight */}
                      <div
                        className="
                          pointer-events-none
                          absolute
                          inset-x-0
                          top-0
                          z-10
                          h-px
                          bg-white/10
                        "
                      />

                      <Suspense fallback={<WindowLoader />}>
                        <AppComponent />
                      </Suspense>
                    </div>
                  </Window>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </section>

        {/* ====================================================
            EMPTY WORKSPACE DEPTH
            ==================================================== */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            z-[1]
            opacity-0
            transition-opacity
            duration-500
          "
          aria-hidden="true"
        />
      </main>

      {/* ======================================================
          CONTEXT MENU
          ====================================================== */}

      <AnimatePresence>
        {menu.show && (
          <motion.div
            className="
              fixed
              inset-0
              z-[90]
              pointer-events-none
            "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <div
              className="
                pointer-events-auto
                h-full
                w-full
              "
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================================
          DOCK
          ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-[80]
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

      {/* ======================================================
          DESKTOP EDGE LIGHT
          ====================================================== */}

      <div
        className="
          pointer-events-none
          fixed
          inset-0
          z-[110]
          rounded-none
          ring-1
          ring-inset
          ring-black/[0.03]
          dark:ring-white/[0.025]
        "
      />
    </div>
  );
}
