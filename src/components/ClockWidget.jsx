import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [mode, setMode] = useState('clock');

  // --- STATES (Kept the same) ---
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [swRunning, setSwRunning] = useState(false);
  const [swTime, setSwTime] = useState(0); 
  useEffect(() => {
    let interval;
    if (swRunning) interval = setInterval(() => setSwTime((prev) => prev + 10), 10);
    return () => clearInterval(interval);
  }, [swRunning]);

  const [tRunning, setTRunning] = useState(false);
  const [tRemaining, setTRemaining] = useState(300);
  const [tInitial, setTInitial] = useState(300);
  useEffect(() => {
    let interval;
    if (tRunning) {
      interval = setInterval(() => {
        setTRemaining((prev) => {
          if (prev <= 1) { setTRunning(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [tRunning]);

  const adjustTimerMinutes = (mins) => {
    const deltaSecs = mins * 60;
    setTRemaining((prev) => {
      const newTime = Math.max(0, prev + deltaSecs);
      setTInitial(newTime); 
      return newTime;
    });
  };

  const resetTimer = () => {
    setTRunning(false);
    setTRemaining(tInitial === 0 ? 300 : tInitial);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.15}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ scale: 1.01, cursor: "grabbing" }}
      // Compact: Reduced width to 260px and tighter padding
      className="absolute top-10 right-3 w-[260px] glass-panel !rounded-3xl p-4 cursor-grab flex flex-col gap-3 font-primary shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Tighter Segmented Control */}
      <div 
        className="flex p-0.5 bg-surface rounded-xl"
        onPointerDown={(e) => e.stopPropagation()} 
      >
        {['clock', 'stopwatch', 'timer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`flex-1 py-1 text-[9px] font-bold uppercase tracking-wider rounded-lg transition-all duration-300 
              ${mode === tab ? 'bg-surface-elevated text-white shadow-sm' : 'text-text-tertiary hover:text-text'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="relative w-full flex-1 flex flex-col items-center justify-center min-h-[120px]">
        <AnimatePresence mode="wait">
          
          {/* CLOCK MODE */}
          {mode === 'clock' && (
            <motion.div key="clock" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full items-center gap-2">
              <span className="text-4xl font-medium tracking-tight text-text leading-none">
                {(time.getHours() % 12 || 12).toString().padStart(2, '0')}:
                {time.getMinutes().toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-text-tertiary font-medium">
                {time.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
              </span>
            </motion.div>
          )}

          {/* STOPWATCH MODE */}
          {mode === 'stopwatch' && (
            <motion.div key="stopwatch" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full items-center gap-3">
              <div className="text-4xl font-mono tracking-tight text-text">
                {Math.floor(swTime / 60000).toString().padStart(2, '0')}:
                {Math.floor((swTime % 60000) / 1000).toString().padStart(2, '0')}
                <span className="text-xl text-accent">.{Math.floor((swTime % 1000) / 10).toString().padStart(2, '0')}</span>
              </div>
              <div className="flex gap-2" onPointerDown={(e) => e.stopPropagation()}>
                <button onClick={() => setSwRunning(!swRunning)} className="h-9 w-9 rounded-full bg-surface-elevated flex items-center justify-center border border-surface-border">
                  {swRunning ? <Pause size={14} className="text-accent" /> : <Play size={14} className="ml-0.5" />}
                </button>
                <button onClick={() => { setSwRunning(false); setSwTime(0); }} className="h-9 w-9 rounded-full bg-surface flex items-center justify-center border border-surface-border">
                  <RotateCcw size={14} className="text-text-tertiary" />
                </button>
              </div>
            </motion.div>
          )}

          {/* TIMER MODE */}
          {mode === 'timer' && (
            <motion.div key="timer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col w-full items-center gap-3">
              <span className="text-4xl font-mono tracking-tight text-text">
                {Math.floor(tRemaining / 60).toString().padStart(2, '0')}:
                {(tRemaining % 60).toString().padStart(2, '0')}
              </span>
              <div className="flex gap-1 w-full justify-center" onPointerDown={(e) => e.stopPropagation()}>
                {[-1, 1, 5].map(m => (
                    <button key={m} onClick={() => adjustTimerMinutes(m)} className="px-2 py-1 text-[9px] bg-surface rounded-md text-text-tertiary hover:text-white border border-surface-border transition-colors">
                        {m > 0 ? '+' : ''}{m}m
                    </button>
                ))}
              </div>
              <div className="flex gap-2 mt-1" onPointerDown={(e) => e.stopPropagation()}>
                <button onClick={() => tRemaining > 0 && setTRunning(!tRunning)} className="h-9 w-9 rounded-full bg-surface-elevated flex items-center justify-center border border-surface-border">
                  {tRunning ? <Pause size={14} className="text-accent" /> : <Play size={14} className="ml-0.5" />}
                </button>
                <button onClick={resetTimer} className="h-9 w-9 rounded-full bg-surface flex items-center justify-center border border-surface-border">
                  <RotateCcw size={14} className="text-text-tertiary" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}