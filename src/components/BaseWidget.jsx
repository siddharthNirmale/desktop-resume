import { motion } from 'framer-motion';

export default function BaseWidget({ 
  constraintsRef, 
  zIndex, 
  onFocus, 
  className = "", 
  title, 
  icon: Icon, 
  showDot = true,
  children 
}) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15} // Adds a light, physical resistance
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }} // 'none' prevents scroll conflicts
      whileDrag={{ scale: 1.02, cursor: "grabbing" }} // "Lift" effect
      className={`absolute bg-[#1a1a1a] border border-neutral-800 rounded-3xl p-4 py-3 cursor-grab flex flex-col gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {(title || Icon || showDot) && (
        <div className="flex justify-between items-center px-1 select-none">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={14} className="text-neutral-500" />}
            {title && (
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                {title}
              </span>
            )}
          </div>
          
          {showDot && (
            <div className="relative">
                <div className="w-2 h-2 rounded-full bg-[#E51919]" />
                <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#E51919] animate-ping opacity-75" />
            </div>
          )}
        </div>
      )}

      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
}