import { useState, useEffect, useCallback } from "react";

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
      return navigator.onLine;
    }
    return true;
  });

  const [isSimulatedOffline, setIsSimulatedOffline] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState(null);
  const [isDismissed, setIsDismissed] = useState(false);
  const [reconnectedToast, setReconnectedToast] = useState(false);

  // Real or simulated offline state
  const effectiveIsOnline = isSimulatedOffline ? false : isOnline;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => {
      setIsOnline(true);
      setIsDismissed(false);
      setReconnectedToast(true);
      const timer = setTimeout(() => setReconnectedToast(false), 3500);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsDismissed(false);
      setReconnectedToast(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Actively probe connection
  const checkConnection = useCallback(async () => {
    setIsChecking(true);
    const startTime = Date.now();

    try {
      if (isSimulatedOffline) {
        // If user actively simulated offline, remain simulated offline
        await new Promise((resolve) => setTimeout(resolve, 800));
        setLastChecked(new Date());
        setIsChecking(false);
        return false;
      }

      // Try fetching a lightweight local asset with cache-busting
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);

      const response = await fetch(`/favicon.ico?_t=${startTime}`, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      const online = response.ok || response.type === "opaque";
      setIsOnline(online);
      setLastChecked(new Date());
      setIsChecking(false);

      if (online) {
        setReconnectedToast(true);
        setTimeout(() => setReconnectedToast(false), 3500);
      }
      return online;
    } catch {
      setIsOnline(false);
      setLastChecked(new Date());
      setIsChecking(false);
      return false;
    }
  }, [isSimulatedOffline]);

  const toggleSimulation = useCallback(() => {
    setIsSimulatedOffline((prev) => {
      const next = !prev;
      if (!next && typeof navigator !== "undefined") {
        setIsOnline(navigator.onLine);
      }
      setIsDismissed(false);
      return next;
    });
  }, []);

  const dismissOverlay = useCallback(() => {
    setIsDismissed(true);
  }, []);

  const reopenOverlay = useCallback(() => {
    setIsDismissed(false);
  }, []);

  return {
    isOnline: effectiveIsOnline,
    isRealOnline: isOnline,
    isSimulatedOffline,
    isChecking,
    lastChecked,
    isDismissed,
    reconnectedToast,
    checkConnection,
    toggleSimulation,
    dismissOverlay,
    reopenOverlay,
  };
}
