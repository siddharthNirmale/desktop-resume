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
      onPointerDown={onFocus}
      style={{ zIndex }}
      // Base styles combined with any specific positioning/sizing you pass in
      className={`absolute bg-[#1a1a1a] border border-neutral-800 rounded-3xl p-4 py-3 cursor-move flex flex-col gap-2 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Universal Widget Header */}
      {(title || Icon || showDot) && (
        <div className="flex justify-between items-center px-1">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={14} className="text-neutral-500" />}
            {title && (
              <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
                {title}
              </span>
            )}
          </div>
          
          {/* Optional: I added a slight pulse animation to your live dot to make it feel more active! */}
          {showDot && (
            <motion.div 
              className="w-2 h-2 rounded-full bg-[#E51919]" 
              animate={{ opacity: [1, 0.4, 1] }} 
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </div>
      )}

      {/* Widget Specific Content */}
      <div className="w-full">
        {children}
      </div>
    </motion.div>
  );
}