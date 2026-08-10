import { useState, useCallback } from "react";

export default function useContextMenu(disabled = false) {
  const [menu, setMenu] = useState({ show: false, x: 0, y: 0 });

  const handleContextMenu = useCallback((e) => {
    if (disabled) return;
    e.preventDefault();
    setMenu({ show: true, x: e.clientX, y: e.clientY });
  }, [disabled]);

  const closeMenu = useCallback(() => {
    setMenu((prev) => prev.show ? { show: false, x: 0, y: 0 } : prev);
  }, []);

  return { menu, handleContextMenu, closeMenu };
}
