import { useState } from 'react';

export default function useWindows(initialWindows) {
  const [windows, setWindows] = useState(() =>
    initialWindows.map((w, index) => ({
      ...w,
      zIndex: w.zIndex || index + 1,
      isMinimized: w.isMinimized || false,
    }))
  );
  
  const [maxZIndex, setMaxZIndex] = useState(initialWindows.length + 1);

  const bringToFront = (id) => {
    setWindows((prevWindows) => {
      const target = prevWindows.find((w) => w.id === id);
      
      if (target && target.zIndex === maxZIndex && !target.isMinimized) {
        return prevWindows;
      }

      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);

      return prevWindows.map((w) =>
        w.id === id 
          ? { ...w, zIndex: nextZ, isMinimized: false } 
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