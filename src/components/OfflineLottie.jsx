import { memo, useRef } from "react";
import { LottieSvg } from "lottie-react";
import offlineAnimationData from "../assets/lottie/offline.json";

const OfflineLottie = memo(function OfflineLottie({
  width = 208,
  height = 176,
  className = "",
  loop = false,
  autoplay = true,
}) {
  const lottieRef = useRef(null);

  return (
    <div
      className={`relative flex items-center justify-center select-none ${className}`}
      style={{ width, height }}
    >
      <LottieSvg
        lottieRef={lottieRef}
        src={offlineAnimationData}
        loop={loop}
        autoplay={autoplay}
        className="w-full h-full flex items-center justify-center"
      />
    </div>
  );
});

export default OfflineLottie;
