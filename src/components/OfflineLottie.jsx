import { memo, useRef } from "react";
import { LottieSvg } from "lottie-react";
import offlineAnimationData from "../assets/lottie/offline.json";

const OfflineLottie = memo(function OfflineLottie({
  width = 240,
  height = 240,
  className = "",
  loop = true,
  autoplay = true,
}) {
  const lottieRef = useRef(null);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width, height }}
    >
      {/* Ambient Pulsing Glow behind Lottie */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none filter blur-2xl opacity-25"
        style={{
          background:
            "radial-gradient(circle, var(--color-accent, #0a84ff) 0%, rgba(255, 69, 58, 0.4) 60%, transparent 80%)",
        }}
      />

      {/* Lottie Animation Canvas */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <LottieSvg
          lottieRef={lottieRef}
          src={offlineAnimationData}
          loop={loop}
          autoplay={autoplay}
          className="w-full h-full flex items-center justify-center"
        />
      </div>
    </div>
  );
});

export default OfflineLottie;
