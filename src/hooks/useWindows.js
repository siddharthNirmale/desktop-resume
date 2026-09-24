import { useState, useCallback } from "react";

const mapInitialWindows = (config) =>
  config.map((w, index) => ({
    ...w,
    zIndex: w.type === "window" ? 1000 + index : index + 1,
    isMinimized: false,
  }));

export default function useWindows(initialWindows) {
  const [windows, setWindows] = useState(() => mapInitialWindows(initialWindows));

  const bringToFront = useCallback((id) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;

      const highestZ = Math.max(...prev.map((w) => w.zIndex || 0), 1000);
      const nextZ = highestZ + 1;

      return prev.map((w) =>
        w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w
      );
    });
  }, []);

  const toggleWindow = useCallback((id, key, value) => {
    setWindows((prevWindows) => {
      if ((key === "isOpen" && value === true) || (key === "isMinimized" && value === false)) {
        const highestZ = Math.max(...prevWindows.map((w) => w.zIndex || 0), 1000);
        const nextZ = highestZ + 1;

        return prevWindows.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ }
            : w
        );
      }

      if (key === "isOpen" && value === false) {
        return prevWindows.map((w) =>
          w.id === id
            ? { ...w, isOpen: false, isMinimized: false, zIndex: 1 }
            : w
        );
      }

      return prevWindows.map((w) =>
        w.id === id ? { ...w, [key]: value } : w
      );
    });
  }, []);

  const toggleWidget = useCallback((id) => {
    setWindows((prev) => {
      const widget = prev.find((w) => w.id === id);
      if (!widget) return prev;
      const nextOpen = !widget.isOpen;
      const highestZ = Math.max(...prev.filter((w) => w.type === "widget").map((w) => w.zIndex || 0), 1);
      return prev.map((w) =>
        w.id === id
          ? { ...w, isOpen: nextOpen, isMinimized: false, zIndex: nextOpen ? highestZ + 1 : 1 }
          : w
      );
    });
  }, []);

  const minimizeAll = useCallback(() => {
    setWindows((prev) =>
      prev.map((w) => (w.type === "window" && w.isOpen ? { ...w, isMinimized: true } : w))
    );
  }, []);

  const restoreAll = useCallback(() => {
    setWindows((prev) =>
      prev.map((w) => (w.type === "window" && w.isOpen ? { ...w, isMinimized: false } : w))
    );
  }, []);

  const resetLayout = useCallback(() => {
    setWindows(mapInitialWindows(initialWindows));
  }, [initialWindows]);

  return { windows, bringToFront, toggleWindow, toggleWidget, minimizeAll, restoreAll, resetLayout };
}
