import React from "react";
import { FiAlertTriangle, FiRefreshCw } from "react-icons/fi";

/**
 * Production Error Boundary Component
 * Conforms to Rules-and-Regulations:
 * - FE-05: Handle All Async & Runtime Error States Explicitly
 * - SEC-02 / Law 17: Zero silent swallowing, sanitize client errors (no raw stack leak)
 * - A11Y-01 / A11Y-02: Accessible alerts and keyboard-navigable retry triggers
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log operational error for diagnostic purposes without exposing to end-users
    if (typeof import.meta !== "undefined" && import.meta.env?.DEV) {
      console.error("[ErrorBoundary caught error]:", error, errorInfo);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    if (typeof this.props.onReset === "function") {
      this.props.onReset();
    }
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return typeof this.props.fallback === "function"
          ? this.props.fallback({ reset: this.handleReset, error: this.state.error })
          : this.props.fallback;
      }

      return (
        <div
          role="alert"
          aria-live="assertive"
          className="flex flex-col items-center justify-center p-6 text-center rounded-xl bg-[var(--color-surface)] border border-[var(--color-surface-border)] text-[var(--color-text)] min-h-[140px] w-full"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-500/10 text-amber-400 mb-3">
            <FiAlertTriangle size={20} aria-hidden="true" />
          </div>
          <h3 className="text-sm font-semibold mb-1">
            {this.props.title || "Something went wrong"}
          </h3>
          <p className="text-xs text-[var(--color-text-tertiary)] max-w-xs mb-4">
            {this.props.message || "An unexpected error occurred in this component."}
          </p>
          <button
            type="button"
            onClick={this.handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-surface-hover)] hover:bg-[var(--color-surface-active)] text-xs font-medium text-[var(--color-text)] border border-[var(--color-surface-border)] transition-all active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] cursor-pointer"
          >
            <FiRefreshCw size={12} aria-hidden="true" />
            <span>Try again</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
