import { useState } from 'react';

export default function useWindows(initialWindows) {
  // Map over initial data to ensure baseline parameters exist cleanly
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
      // Find the target window to see if it actually needs an update
      const target = prevWindows.find((w) => w.id === id);
      
      // If it's already at the absolute peak zIndex and visible, do nothing to prevent unnecessary rerenders
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
      // Specialized case: Handle opening or maximizing focus layers in one paint step
      if ((key === 'isOpen' && value === true) || (key === 'isMinimized' && value === false)) {
        const nextZ = maxZIndex + 1;
        setMaxZIndex(nextZ);
        
        return prevWindows.map((w) =>
          w.id === id
            ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ }
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