import { motion } from 'framer-motion';
import { Tweet } from 'react-tweet';

export default function TweetWidget({ tweetId = "1401287393228038149", constraintsRef, zIndex, onFocus }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      onPointerDown={onFocus}
      style={{ zIndex }}
      // Keeps the exact hardware widget dimensions and style
      className="absolute top-8 left-8 w-[350px] bg-[#1a1a1a] border border-neutral-800 rounded-3xl p-2 cursor-move flex flex-col overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* OS Header for the widget */}
      <div className="flex justify-between items-center px-4 py-3">
        <span className="text-[9px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Post Stream</span>
        <div className="w-2 h-2 rounded-full bg-[#E51919] shadow-[0_0_8px_rgba(229,25,25,0.4)]" />
      </div>

      {/* Tweet Container with Dark Mode force */}
      <div className="px-1 custom-scrollbar overflow-y-auto max-h-[400px] [&_.react-tweet-theme]:!bg-[#1a1a1a]">
        <div className="dark">
           <Tweet id={tweetId} />
        </div>
      </div>
    </motion.div>
  );
}