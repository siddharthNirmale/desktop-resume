import { motion } from "framer-motion";
import { XIcon as X } from "lucide-animated";;

export default function WidgetCover({
  title,
  zIndex,
  onClose,
  onFocus,
  constraintsRef,
  children,
  className = "",
  positionStyle = {},
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragHandleClassName="widget-header-drag"
      dragConstraints={constraintsRef}
      dragElastic={0.06}
      onPointerDown={onFocus}
      style={{
        zIndex: zIndex ?? 1,
        touchAction: "none",
        willChange: "transform, opacity",
        ...positionStyle,
      }}
      whileDrag={{ cursor: "grabbing", scale: 1.012 }}
      initial={{ opacity: 0, scale: 0.95, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      className={`
        custom-widget absolute w-[260px] sm:w-[270px] lg:w-[276px] 2xl:w-[288px] max-w-[calc(100vw-36px)]
        bg-[var(--color-surface)]/90 backdrop-blur-3xl
        border border-[var(--color-surface-border)] rounded-[22px]
        flex flex-col font-primary select-none
        pointer-events-auto widget-shadow
        transition-colors duration-200 group
        ${className}
      `}
    >
      {/* Widget Header — Drag Handle */}
      <div className="widget-header-drag flex items-center justify-between px-4 pt-3.5 pb-0 cursor-grab active:cursor-grabbing">
        <span className="text-[10px] font-heading font-semibold text-[var(--color-text-tertiary)] uppercase tracking-[0.1em] group-hover:text-[var(--color-text-secondary)] transition-colors duration-150">
          {title}
        </span>

        {onClose && (
          <button
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            onPointerDown={(e) => e.stopPropagation()}
            title="Close"
            className="
              h-[18px] w-[18px] rounded-full flex items-center justify-center
              text-[var(--color-text-disabled)]
              opacity-0 group-hover:opacity-100
              hover:bg-[var(--color-surface-inactive)] hover:text-[var(--color-text-secondary)]
              transition-all duration-150 focus:outline-none cursor-default
            "
          >
            <X size={10} strokeWidth={2.5} />
          </button>
        )}
      </div>

      {/* Widget Content Area */}
      <div className="px-4 pb-4 pt-3 w-full flex-1 flex flex-col">
        {children}
      </div>
    </motion.div>
  );
}
