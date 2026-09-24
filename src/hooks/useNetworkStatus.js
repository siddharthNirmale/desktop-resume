import { useState, useEffect, useCallback } from "react";

export default function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    if (typeof navigator !== "undefined" && typeof navigator.onLine === "boolean") {
      return navigator.onLine;
    }
    return true;
  });

  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const retry = useCallback(async () => {
    setIsChecking(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      const res = await fetch(`/favicon.ico?_t=${Date.now()}`, {
        method: "HEAD",
        cache: "no-store",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      setIsOnline(res.ok || res.type === "opaque");
    } catch {
      setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  return {
    isOnline,
    isChecking,
    retry,
  };
}
