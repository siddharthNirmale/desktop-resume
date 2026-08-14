import { useState, useCallback } from "react";

export default function useWindows(initialWindows) {
  const [windows, setWindows] = useState(() =>
    initialWindows.map((w, index) => ({
      ...w,
      zIndex: w.type === "window" ? 1000 + index : index + 1,
      isMinimized: false,
    }))
  );

  const bringToFront = useCallback((id) => {
    setWindows((prev) => {
      const target = prev.find((w) => w.id === id);
      if (!target) return prev;

      const highestZ = Math.max(...prev.map((w) => w.zIndex || 0), 1000);
      const nextZ = highestZ + 1;

      return prev.map((w) =>
        w.id === id
          ? {
              ...w,
              zIndex: nextZ,
              isMinimized: false,
            }
          : w
      );
    });
  }, []);

  const toggleWindow = useCallback((id, key, value) => {
    setWindows((prevWindows) => {
      // Opening or unminimizing focus states
      if ((key === "isOpen" && value === true) || (key === "isMinimized" && value === false)) {
        const highestZ = Math.max(...prevWindows.map((w) => w.zIndex || 0), 1000);
        const nextZ = highestZ + 1;

        return prevWindows.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ }
            : w
        );
      }

      // Closing window layers safely
      if (key === "isOpen" && value === false) {
        return prevWindows.map((w) =>
          w.id === id
            ? { ...w, isOpen: false, isMinimized: false, zIndex: 1 }
            : w
        );
      }

      // Default toggle for typical closed / minimized window states
      return prevWindows.map((w) =>
        w.id === id ? { ...w, [key]: value } : w
      );
    });
  }, []);

  return { windows, bringToFront, toggleWindow };
}
