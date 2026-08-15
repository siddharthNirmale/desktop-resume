import { motion } from "framer-motion";
import { XIcon as X } from "lucide-animated";

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
      dragElastic={0.035}
      onPointerDown={onFocus}
      style={{
        zIndex: zIndex ?? 1,
        touchAction: "none",
        willChange: "transform, opacity",
        ...positionStyle,
      }}
      whileDrag={{
        scale: 1.006,
        cursor: "grabbing",
      }}
      initial={{
        opacity: 0,
        scale: 0.97,
        y: 8,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.97,
        y: 6,
      }}
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.7,
      }}
      className={`
        custom-widget
        absolute

        w-[250px]
        sm:w-[260px]
        lg:w-[268px]
        2xl:w-[280px]

        max-w-[calc(100vw-24px)]

        flex
        flex-col

        overflow-hidden
        select-none
        pointer-events-auto
        font-primary
        group

        bg-[var(--color-surface)]
        border
        border-[var(--color-surface-border)]
        rounded-[16px]

        shadow-[var(--widget-shadow)]

        transition-[background-color,border-color,box-shadow]
        duration-200

        ${className}
      `}
    >
      {/* Header */}
      <div
        className="
          widget-header-drag
          relative

          h-9
          px-3

          flex
          items-center
          justify-center

          cursor-grab
          active:cursor-grabbing
        "
      >
        {/* Centered title */}
        <span
          className="
            max-w-[70%]
            truncate

            text-center
            text-[11px]
            leading-none
            font-heading
            font-medium
            tracking-[-0.01em]

            text-[var(--color-text-secondary)]

            group-hover:text-[var(--color-text-primary)]

            transition-colors
            duration-150
          "
        >
          {title}
        </span>

        {/* Close */}
        {onClose && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
            title="Close"
            aria-label={`Close ${title}`}
            className="
              absolute
              right-2
              top-1/2
              -translate-y-1/2

              h-5
              w-5

              flex
              items-center
              justify-center

              rounded-full

              text-[var(--color-text-disabled)]

              opacity-0
              group-hover:opacity-100

              hover:bg-[var(--color-surface-inactive)]
              hover:text-[var(--color-text-secondary)]

              active:scale-90

              transition-all
              duration-150

              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--color-accent)]/30

              cursor-default
            "
          >
            <X
              size={10}
              strokeWidth={2.4}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div
        className="
          w-full
          flex-1
          flex
          flex-col

          px-3
          pb-3
        "
      >
        {children}
      </div>
    </motion.div>
  );
}
