import { useState } from 'react';

export default function useWindows(initialWindows) {
 const [windows, setWindows] = useState(() =>
  initialWindows.map((w, index) => ({
    ...w,
    zIndex:
      w.type === "window"
        ? 1000 + index
        : index,
    isMinimized: false,
  }))
);

const [maxZIndex, setMaxZIndex] = useState(100);
 const bringToFront = (id) => {
  setWindows((prev) => {
    const target = prev.find((w) => w.id === id);
    if (!target) return prev;

    const base = target.type === "window" ? 1000 : 1;
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);

    return prev.map((w) =>
      w.id === id
        ? {
            ...w,
            zIndex: base + nextZ,
            isMinimized: false,
          }
        : w
    );
  });
};

  const toggleWindow = (id, key, value) => {
    setWindows((prevWindows) => {
      // Handle opening or unminimizing focus states in a single step
      if ((key === 'isOpen' && value === true) || (key === 'isMinimized' && value === false)) {
        const nextZ = maxZIndex + 1;
        setMaxZIndex(nextZ);
        
        return prevWindows.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ }
            : w
        );
      }

      // Handle closing window layers safely (Reset depth reference on close targets)
      if (key === 'isOpen' && value === false) {
        return prevWindows.map((w) =>
          w.id === id 
            ? { ...w, isOpen: false, isMinimized: false, zIndex: 1 } 
            : w
        );
      }

      // Default toggle for typical closed / minimized window states
      return prevWindows.map((w) =>
        w.id === id 
          ? { ...w, [key]: value } 
          : w
      );
    });
  };

  return { windows, bringToFront, toggleWindow };
}