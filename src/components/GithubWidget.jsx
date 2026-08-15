import { useState, useEffect, useMemo } from "react";
import { GitHubCalendar } from "react-github-calendar";
import WidgetCover from "./WidgetCover";

// ============================================================
// HELPERS
// ============================================================

const hexToRgb = (hex) => {
  if (!hex || typeof hex !== "string") {
    return { r: 10, g: 132, b: 255 };
  }

  let clean = hex.replace("#", "").trim();

  if (clean.length === 3) {
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (clean.length !== 6) {
    return { r: 10, g: 132, b: 255 };
  }

  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);

  return {
    r: Number.isNaN(r) ? 10 : r,
    g: Number.isNaN(g) ? 132 : g,
    b: Number.isNaN(b) ? 255 : b,
  };
};

const filterLastFiveMonths = (contributions) => {
  const today = new Date();
  const start = new Date();

  start.setDate(today.getDate() - 150);

  return contributions.filter((day) => {
    const date = new Date(day.date);
    return date >= start && date <= today;
  });
};

// ============================================================
// GITHUB WIDGET
// ============================================================

export default function GithubWidget({
  constraintsRef,
  zIndex,
  onFocus,
  onClose,
  positionStyle,
}) {
  const [isReady, setIsReady] = useState(false);
  const [accent, setAccent] = useState("#0A84FF");
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const root = document.documentElement;
    const body = document.body;

    const syncTheme = () => {
      const currentAccent =
        getComputedStyle(root)
          .getPropertyValue("--color-accent")
          .trim() || "#0A84FF";

      setAccent(currentAccent);
      setIsLight(body.classList.contains("light-theme"));
    };

    syncTheme();

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "attributes") {
          syncTheme();
        }
      }
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["style"],
    });

    observer.observe(body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 350);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);

  const theme = useMemo(() => {
    const { r, g, b } = hexToRgb(accent);

    return {
      dark: [
        "rgba(255,255,255,0.035)",
        `rgba(${r},${g},${b},0.22)`,
        `rgba(${r},${g},${b},0.46)`,
        `rgba(${r},${g},${b},0.72)`,
        accent,
      ],

      light: [
        "rgba(0,0,0,0.045)",
        `rgba(${r},${g},${b},0.28)`,
        `rgba(${r},${g},${b},0.52)`,
        `rgba(${r},${g},${b},0.78)`,
        accent,
      ],
    };
  }, [accent]);

  return (
    <WidgetCover
      id="github"
      title="Contributions"
      zIndex={zIndex}
      onClose={onClose}
      onFocus={onFocus}
      constraintsRef={constraintsRef}
      positionStyle={positionStyle || { top: "444px", left: "18px" }}
    >
      <div
        className={`
          flex
          justify-center
          overflow-hidden
          transition-opacity
          duration-300
          ${isReady ? "opacity-100" : "opacity-0"}
        `}
        onPointerDown={(e) => e.stopPropagation()}
      >
        {GitHubCalendar && (
          <GitHubCalendar
            username="siddharthNirmale"
            colorScheme={isLight ? "light" : "dark"}
            theme={theme}
            transformData={filterLastFiveMonths}
            blockSize={7}
            blockMargin={2}
            blockRadius={2}
            fontSize={10}
            hideColorLegend
            hideTotalCount
            style={{
              color: "var(--color-text-disabled)",
              fontFamily: "var(--font-primary)",
              lineHeight: 1,
            }}
          />
        )}
      </div>
    </WidgetCover>
  );
}
