import { motion, AnimatePresence } from "framer-motion";
import OfflineLottie from "./OfflineLottie";

export default function OfflinePage({
  isOnline = true,
  isChecking = false,
  onRetry,
}) {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            filter: "blur(6px)",
            transition: {
              duration: 0.4,
              ease: [0.16, 1, 0.3, 1],
            },
          }}
          className="
            fixed inset-0 z-[99999] overflow-hidden
            bg-[var(--color-desktop)]
            flex items-center justify-center
            text-[var(--color-text)]
            select-none font-primary
          "
        >
          {/* Main Card Cluster */}
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="flex flex-col items-center text-center px-6 max-w-sm"
          >
            {/* Actual Lottie Graphic */}
            <div className="w-52 h-44 flex items-center justify-center mb-2">
              <OfflineLottie width={208} height={176} />
            </div>

            {/* Title & Status */}
            <div className="space-y-1">
              <h1 className="text-[17px] font-heading font-semibold tracking-[-0.015em] text-[var(--color-text)]">
                You're Offline
              </h1>
              <p className="text-[12px] font-mono text-[var(--color-text-tertiary)]">
                Please check your internet connection
              </p>
            </div>

            {/* Simple Retry Button */}
            <button
              type="button"
              onClick={onRetry}
              disabled={isChecking}
              className="
                mt-6 h-9 px-5 rounded-[8px]
                bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-hover)]
                border border-[var(--color-surface-border)]
                text-[var(--color-text)] text-[12px] font-medium
                flex items-center gap-2
                active:scale-[0.98] transition-all cursor-pointer
                disabled:opacity-50
              "
            >
              {isChecking && (
                <span className="w-3 h-3 rounded-full border-2 border-[var(--color-text-tertiary)] border-t-[var(--color-text)] animate-spin" />
              )}
              <span>{isChecking ? "Checking..." : "Retry Connection"}</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
