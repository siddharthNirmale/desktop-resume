import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiWifiOff,
  FiRefreshCw,
  FiInfo,
  FiArrowRight,
  FiServer,
  FiCheck,
  FiX,
  FiMinimize2,
  FiSliders,
} from "react-icons/fi";
import OfflineLottie from "./OfflineLottie";

export default function OfflinePage({
  isOnline = true,
  isSimulatedOffline = false,
  isChecking = false,
  lastChecked = null,
  isDismissed = false,
  reconnectedToast = false,
  onCheckConnection,
  onToggleSimulation,
  onDismiss,
  onReopen,
}) {
  const [showDiagnostics, setShowDiagnostics] = useState(false);

  const formattedLastChecked = useMemo(() => {
    if (!lastChecked) return "Not tested yet";
    return lastChecked.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  }, [lastChecked]);

  const showFullOverlay = !isOnline && !isDismissed;
  const showFloatingPill = !isOnline && isDismissed;

  return (
    <>
      {/* ──────────────────────────────────────────────────────────
          1. RECONNECTED TOAST (Notifies when connection returns)
      ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {reconnectedToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="fixed top-10 inset-x-0 mx-auto z-[99999] w-fit max-w-[90vw] pointer-events-none"
          >
            <div
              className="
                flex items-center gap-2.5 px-4 py-2 rounded-full
                bg-[var(--color-surface-elevated)]/95 backdrop-blur-xl
                border border-emerald-500/30 text-[var(--color-text)]
                shadow-2xl text-[13px] font-medium font-primary
              "
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
              <FiCheck className="text-emerald-400" size={15} />
              <span>Network Reconnected. System is fully operational.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          2. FULLSCREEN OFFLINE PAGE MODAL OVERLAY
      ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showFullOverlay && (
          <motion.div
            key="offline-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="
              fixed inset-0 z-[99998] flex items-center justify-center p-3 sm:p-6
              bg-black/60 backdrop-blur-xl overflow-y-auto select-none
            "
          >
            <motion.div
              key="offline-modal-card"
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 16 }}
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 28,
              }}
              className="
                relative w-full max-w-[560px] my-auto
                bg-[var(--color-surface)]/95 text-[var(--color-text)]
                border border-[var(--color-surface-border-strong)]
                rounded-[18px] sm:rounded-[22px]
                shadow-2xl overflow-hidden font-primary
              "
            >
              {/* Window Header / Title Bar */}
              <div
                className="
                  flex items-center justify-between px-4 py-3
                  bg-[var(--color-surface-dark)]/90 border-b border-[var(--color-surface-border)]
                "
              >
                {/* Traffic Light Dots */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onDismiss}
                    title="Dismiss to background"
                    className="w-3 h-3 rounded-full bg-[#ff5f56] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center group"
                  >
                    <FiX size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <button
                    type="button"
                    onClick={onDismiss}
                    title="Minimize to floating indicator"
                    className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:brightness-110 active:scale-90 transition-transform flex items-center justify-center group"
                  >
                    <FiMinimize2 size={8} className="text-black/60 opacity-0 group-hover:opacity-100" />
                  </button>
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] opacity-40" />
                </div>

                {/* Window Title */}
                <div className="flex items-center gap-1.5 text-[12px] font-mono font-medium text-[var(--color-text-secondary)]">
                  <FiWifiOff size={13} className="text-red-400" />
                  <span>system.network.offline</span>
                </div>

                {/* Simulation Control Toggle */}
                <button
                  type="button"
                  onClick={onToggleSimulation}
                  className="
                    flex items-center gap-1.5 px-2 py-0.5 rounded-[5px]
                    text-[11px] font-mono text-[var(--color-text-tertiary)]
                    hover:text-[var(--color-text)] hover:bg-[var(--color-surface-hover)]
                    transition-colors cursor-pointer
                  "
                  title="Toggle offline test simulation"
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isSimulatedOffline ? "bg-amber-400 animate-pulse" : "bg-emerald-400"
                    }`}
                  />
                  <span>{isSimulatedOffline ? "Simulated" : "Live State"}</span>
                </button>
              </div>

              {/* Main Body */}
              <div className="p-6 sm:p-8 flex flex-col items-center text-center">
                {/* Status Pill Badge */}
                <div
                  className="
                    inline-flex items-center gap-2 px-3 py-1 rounded-full
                    bg-red-500/10 border border-red-500/25 text-red-400
                    text-[11px] font-mono font-medium tracking-wide uppercase mb-3
                  "
                >
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping" />
                  <span>Network Disconnected</span>
                </div>

                {/* Lottie Animation Display */}
                <div className="my-1">
                  <OfflineLottie width={210} height={210} />
                </div>

                {/* Heading & Information */}
                <h1 className="text-2xl sm:text-[26px] font-heading font-semibold text-[var(--color-text)] tracking-tight">
                  You’re Currently Offline
                </h1>
                <p className="mt-2 text-[13.5px] sm:text-[14.5px] leading-relaxed text-[var(--color-text-secondary)] max-w-[420px]">
                  Connection to the network was interrupted. All your local workspace windows,
                  projects, resume documents, and terminal commands are cached and remain accessible.
                </p>

                {/* Telemetry Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full mt-6 text-left">
                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-elevated)]/60 border border-[var(--color-surface-border)]">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[var(--color-text-tertiary)] uppercase">
                      <FiServer size={11} />
                      <span>Cache State</span>
                    </div>
                    <div className="text-[12px] font-semibold text-emerald-400 mt-0.5">
                      100% Offline Ready
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[var(--color-surface-elevated)]/60 border border-[var(--color-surface-border)]">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[var(--color-text-tertiary)] uppercase">
                      <FiRefreshCw size={11} />
                      <span>Last Probe</span>
                    </div>
                    <div className="text-[12px] font-mono text-[var(--color-text)] mt-0.5 truncate">
                      {formattedLastChecked}
                    </div>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-2.5 rounded-xl bg-[var(--color-surface-elevated)]/60 border border-[var(--color-surface-border)]">
                    <div className="flex items-center gap-1.5 text-[10.5px] font-mono text-[var(--color-text-tertiary)] uppercase">
                      <FiSliders size={11} />
                      <span>Active Mode</span>
                    </div>
                    <div className="text-[12px] font-semibold text-[var(--color-accent)] mt-0.5 truncate">
                      Local Standalone
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full mt-6">
                  {/* Primary Reconnect Button */}
                  <button
                    type="button"
                    onClick={onCheckConnection}
                    disabled={isChecking}
                    className="
                      w-full sm:flex-1 h-11 px-4 rounded-xl
                      bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)]
                      text-white font-medium text-[13.5px]
                      flex items-center justify-center gap-2
                      shadow-md active:scale-[0.98] transition-all cursor-pointer
                      disabled:opacity-60 disabled:cursor-not-allowed
                    "
                  >
                    <FiRefreshCw
                      size={15}
                      className={isChecking ? "animate-spin" : ""}
                    />
                    <span>{isChecking ? "Testing Connection..." : "Check Connection"}</span>
                  </button>

                  {/* Secondary Dismiss & Browse Button */}
                  <button
                    type="button"
                    onClick={onDismiss}
                    className="
                      w-full sm:flex-1 h-11 px-4 rounded-xl
                      bg-[var(--color-surface-elevated)] hover:bg-[var(--color-surface-hover)]
                      text-[var(--color-text)] font-medium text-[13.5px]
                      border border-[var(--color-surface-border)]
                      flex items-center justify-center gap-2
                      active:scale-[0.98] transition-all cursor-pointer
                    "
                  >
                    <span>Browse Cached Desktop</span>
                    <FiArrowRight size={14} className="text-[var(--color-text-secondary)]" />
                  </button>
                </div>

                {/* Diagnostics Toggle */}
                <button
                  type="button"
                  onClick={() => setShowDiagnostics((prev) => !prev)}
                  className="
                    mt-4 text-[12px] font-medium text-[var(--color-text-tertiary)]
                    hover:text-[var(--color-text)] flex items-center gap-1.5 transition-colors cursor-pointer
                  "
                >
                  <FiInfo size={13} />
                  <span>{showDiagnostics ? "Hide Diagnostics & Tips" : "Show Diagnostics & Tips"}</span>
                </button>

                {/* Collapsible Diagnostics Accordion */}
                <AnimatePresence>
                  {showDiagnostics && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="w-full mt-3 overflow-hidden text-left"
                    >
                      <div className="p-3.5 rounded-xl bg-[var(--color-surface-dark)]/70 border border-[var(--color-surface-border)] space-y-2.5 text-[12px]">
                        <div className="font-mono text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider">
                          Quick Troubleshooting Checklist
                        </div>
                        <ul className="space-y-1.5 text-[var(--color-text-secondary)]">
                          <li className="flex items-start gap-2">
                            <FiCheck className="text-[var(--color-accent)] mt-0.5 shrink-0" size={13} />
                            <span>Verify Wi-Fi network credentials or physical LAN cable.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FiCheck className="text-[var(--color-accent)] mt-0.5 shrink-0" size={13} />
                            <span>Toggle Airplane Mode off and on to renew DHCP lease.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <FiCheck className="text-[var(--color-accent)] mt-0.5 shrink-0" size={13} />
                            <span>Check VPN, proxy, or firewall rule restrictions.</span>
                          </li>
                        </ul>

                        <div className="pt-2 border-t border-[var(--color-surface-border)] flex items-center justify-between text-[11px] font-mono text-[var(--color-text-tertiary)]">
                          <span>Navigator Status:</span>
                          <span className="text-red-400 font-semibold">
                            {navigator.onLine ? "online (simulated off)" : "offline (unreachable)"}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom Subtle Footer */}
              <div
                className="
                  px-6 py-2.5 bg-[var(--color-surface-dark)]/50 border-t border-[var(--color-surface-border)]
                  flex items-center justify-between text-[11px] text-[var(--color-text-tertiary)] font-mono
                "
              >
                <span>Siddharth Nirmale OS</span>
                <span>Press Esc or click Browse to dismiss</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ──────────────────────────────────────────────────────────
          3. MINIMIZED FLOATING PILL (When user dismissed while offline)
      ────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showFloatingPill && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-[9999] pointer-events-auto"
          >
            <div
              className="
                flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full
                bg-[var(--color-surface-elevated)]/90 backdrop-blur-xl
                border border-amber-500/30 text-[var(--color-text)]
                shadow-xl text-[12px] font-medium font-primary
              "
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <FiWifiOff className="text-amber-400" size={13} />
              <span className="text-[var(--color-text-secondary)]">Offline Mode</span>
              <button
                type="button"
                onClick={onReopen}
                className="
                  px-2 py-0.5 rounded-full bg-[var(--color-accent)]
                  hover:bg-[var(--color-accent-hover)] text-white text-[11px]
                  font-medium transition-colors cursor-pointer
                "
              >
                Diagnostics
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
