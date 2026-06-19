import { useState } from 'react';

export default function useWindows(initialWindows) {
  const [windows, setWindows] = useState(initialWindows);
  const [maxZIndex, setMaxZIndex] = useState(1);

  const bringToFront = (id) => {
    const nextZ = maxZIndex + 1;
    setMaxZIndex(nextZ);
    // Use the functional update pattern (prevWindows) so we always have the latest state
    setWindows(prevWindows => 
      prevWindows.map(w => (w.id === id ? { ...w, zIndex: nextZ, isMinimized: false } : w))
    );
  };

  const toggleWindow = (id, key, value) => {
    if (key === 'isOpen' && value === true) {
      // FIX: If we are opening a window, we need to open it AND bring it to the front in one single, unified state update!
      const nextZ = maxZIndex + 1;
      setMaxZIndex(nextZ);
      setWindows(prevWindows => 
        prevWindows.map(w => (w.id === id ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZ } : w))
      );
    } else {
      // Normal toggle for closing or minimizing
      setWindows(prevWindows => 
        prevWindows.map(w => (w.id === id ? { ...w, [key]: value } : w))
      );
    }
  };

  return { windows, bringToFront, toggleWindow };
}