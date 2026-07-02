import { motion } from "framer-motion";

export default function DraggableWindow({ children, id }) {
  return (
    <motion.div
      drag
      dragMomentum={false} // Stops the floaty/slidey feeling
      dragElastic={0} // Makes it stick exactly to the cursor
      onDragEnd={(event, info) => {
        // ONLY update your global context/state when the user lets go!
        // e.g., updateWindowPosition(id, info.point.x, info.point.y);
      }}
      style={{ willChange: "transform" }} // Hardware acceleration 
      className="absolute bg-white shadow-xl rounded-lg"
    >
      {/* Window Header (drag handle) */}
      <div className="handle w-full h-8 bg-gray-200 cursor-grab active:cursor-grabbing">
        Title
      </div>
      
      {/* Window Content */}
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  );
}