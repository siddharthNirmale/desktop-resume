import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function ClockWidget({ constraintsRef, zIndex, onFocus }) {
  const [mode, setMode] = useState('clock'); // 'clock', 'stopwatch', 'timer'

  // --- CLOCK STATE ---
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- STOPWATCH STATE ---
  const [swRunning, setSwRunning] = useState(false);
  const [swTime, setSwTime] = useState(0);

  useEffect(() => {
    let interval;
    if (swRunning) {
      interval = setInterval(() => setSwTime((prev) => prev + 10), 10);
    }
    return () => clearInterval(interval);
  }, [swRunning]);

  // --- TIMER STATE ---
  const [tRunning, setTRunning] = useState(false);
  const [tRemaining, setTRemaining] = useState(300); // 5 minutes default
  const [tInitial, setTInitial] = useState(300);

  useEffect(() => {
    let interval;
    if (tRunning) {
      interval = setInterval(() => {
        setTRemaining((prev) => {
          if (prev <= 1) {
            setTRunning(false);
            return 0;
          }
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
    if (tInitial === 0 || tRemaining === 0) {
      setTRemaining(300);
      setTInitial(300);
    } else {
      setTRemaining(tInitial);
    }
  };

  // Reusable mechanical button styles for the tiny controls
  const actionBtnStyle = `flex items-center justify-center rounded-[10px]
                          border-b-[4px] active:border-b-0 active:translate-y-[4px]
                          transition-all duration-150 focus:outline-none cursor-pointer font-black`;

  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={constraintsRef}
      dragElastic={0.08}
      onPointerDown={onFocus}
      style={{ zIndex, touchAction: "none" }}
      whileDrag={{ cursor: "grabbing", scale: 1.02 }}
      className="custom-widget absolute top-14 right-6 w-[310px] p-5 cursor-grab flex flex-col select-none pointer-events-auto
                 bg-[#eef2f5] dark:bg-[#1a1c23]
                 rounded-[28px]
                 border-t-[3px] border-t-white/80 dark:border-t-white/10
                 border-b-[8px] border-b-[#cdd4db] dark:border-b-[#0d0e12]
                 border-x-[4px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                 shadow-[0_25px_50px_rgba(0,10,40,0.25)] dark:shadow-[0_25px_50px_rgba(0,0,0,0.8)]
                 font-primary transition-colors duration-250 min-h-[200px]"
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 300, damping: 25, mass: 0.8 }}
    >
      {/* Decorative Top Pill */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 rounded-full bg-[#cdd4db] dark:bg-[#0d0e12] shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)]" />

      {/* Chunky Tab Selector */}
      <div
        className="flex p-1.5 mb-5 mt-1 bg-[#d5dde5] dark:bg-[#111317] rounded-[16px] shadow-[inset_0_3px_6px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_4px_8px_rgba(0,0,0,0.6)]"
        onPointerDown={(e) => e.stopPropagation()}
      >
        {['clock', 'stopwatch', 'timer'].map((tab) => (
          <button
            key={tab}
            onClick={() => setMode(tab)}
            className={`flex-1 py-1.5 text-[11px] font-black uppercase tracking-widest transition-all duration-200 cursor-pointer focus:outline-none rounded-[10px]
              ${mode === tab
                ? 'bg-white dark:bg-[#2c3039] text-[#0066ff] dark:text-[#6699ff] shadow-[0_2px_4px_rgba(0,0,0,0.1)]'
                : 'text-[#8899aa] dark:text-[#424859] hover:text-[#0066ff]/70'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Recessed Screen Area */}
      <div className="relative w-full flex-1 flex flex-col items-center justify-center
                      bg-[#f8fafc] dark:bg-[#111317]
                      rounded-[20px] p-4
                      border-t-[3px] border-t-[#cdd4db] dark:border-t-[#000]
                      border-b-[2px] border-b-white dark:border-b-[#2c3039]
                      border-x-[2px] border-x-[#e2e8f0] dark:border-x-[#15171d]
                      shadow-[inset_0_6px_12px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_8px_16px_rgba(0,0,0,0.6)]">

        {/* Faint Grid Background on the screen */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.05] rounded-[20px]"
          style={{ backgroundImage: 'radial-gradient(#0066ff 1px, transparent 1px)', backgroundSize: '10px 10px' }}
        />

        <AnimatePresence mode="wait">

          {/* ---------------- CLOCK MODE ---------------- */}
          {mode === 'clock' && (
            <motion.div
              key="clock"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col w-full items-center gap-3 relative z-10 pointer-events-none"
            >
              <div className="flex items-start justify-center gap-2 w-full">
                <span className="text-[52px] font-black tracking-tighter text-[#0066ff] dark:text-[#6699ff] leading-none tabular-nums drop-shadow-[0_2px_2px_rgba(0,102,255,0.2)]">
                  {(time.getHours() % 12 || 12).toString().padStart(2, '0')}:
                  {time.getMinutes().toString().padStart(2, '0')}
                </span>

                <div className="flex flex-col items-start gap-1 mt-1.5">
                  <span className="px-1.5 py-0.5 bg-[#ff6b1a] text-white rounded-[6px] text-[10px] font-black uppercase tracking-wider leading-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                    {time.getHours() >= 12 ? 'PM' : 'AM'}
                  </span>
                  <span className="text-[14px] font-bold text-[#8899aa] dark:text-[#424859] w-5 text-left leading-none tabular-nums">
                    {time.getSeconds().toString().padStart(2, '0')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3 w-full text-[11px] uppercase tracking-widest text-[#8899aa] dark:text-[#64748b] font-bold">
                <span>{time.toLocaleDateString('en-US', { weekday: 'short' })}</span>
                <div className="w-[4px] h-[4px] bg-[#ff6b1a] rounded-full" />
                <span>{time.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
              </div>

              {/* Glowing Progress Track */}
              <div className="w-full h-[6px] bg-[#d5dde5] dark:bg-[#0d0e12] rounded-full overflow-hidden mt-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#0066ff] to-[#00d4ff] shadow-[0_0_8px_#00d4ff]"
                  animate={{ width: `${(time.getSeconds() / 60) * 100}%` }}
                  transition={{ ease: "linear", duration: time.getSeconds() === 0 ? 0 : 1 }}
                />
              </div>
            </motion.div>
          )}

          {/* ---------------- STOPWATCH MODE ---------------- */}
          {mode === 'stopwatch' && (
            <motion.div
              key="stopwatch"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col w-full items-center gap-4 relative z-10"
            >
              <div className="flex items-end justify-center w-full mt-2">
                <span className="text-[48px] font-black tracking-tighter text-[#0066ff] dark:text-[#6699ff] leading-none tabular-nums drop-shadow-[0_2px_2px_rgba(0,102,255,0.2)]">
                  {Math.floor(swTime / 60000).toString().padStart(2, '0')}:
                  {Math.floor((swTime % 60000) / 1000).toString().padStart(2, '0')}
                </span>
                <span className="text-[18px] font-bold text-[#ff6b1a] leading-none ml-1 mb-1.5 tabular-nums">
                  .{Math.floor((swTime % 1000) / 10).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Physical Toy Controls */}
              <div
                className="flex items-center gap-4 mt-2"
                onPointerDown={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSwRunning(!swRunning)}
                  className={`${actionBtnStyle} w-[56px] h-[40px] text-white
                    ${swRunning
                      ? 'bg-[#ff3333] border-[#cc0000] hover:bg-[#ff4d4d]'
                      : 'bg-[#0066ff] border-[#0044cc] hover:bg-[#1a75ff]'}`}
                >
                  {swRunning ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" className="ml-1" />}
                </button>

                <button
                  onClick={() => { setSwRunning(false); setSwTime(0); }}
                  className={`${actionBtnStyle} w-[40px] h-[40px] bg-[#d5dde5] dark:bg-[#2c3039] border-[#b0b8c4] dark:border-[#111317] text-[#0066ff] dark:text-[#6699ff] hover:bg-white`}
                >
                  <RotateCcw size={16} strokeWidth={3} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ---------------- TIMER MODE ---------------- */}
          {mode === 'timer' && (
            <motion.div
              key="timer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col w-full items-center gap-3 relative z-10"
            >
              <div className="flex items-start justify-center w-full mt-1">
                <span className="text-[52px] font-black tracking-tighter text-[#0066ff] dark:text-[#6699ff] leading-none tabular-nums drop-shadow-[0_2px_2px_rgba(0,102,255,0.2)]">
                  {Math.floor(tRemaining / 60).toString().padStart(2, '0')}:
                  {(tRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Recessed Progress Bar */}
              <div className="w-full h-[6px] bg-[#d5dde5] dark:bg-[#0d0e12] rounded-full overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] mt-1">
                <motion.div
                  className={`h-full ${tRemaining === 0 ? 'bg-[#ff3333]' : 'bg-[#ff6b1a]'}`}
                  initial={{ width: '100%' }}
                  animate={{ width: `${tInitial > 0 ? (tRemaining / tInitial) * 100 : 0}%` }}
                  transition={{ ease: "linear", duration: 1 }}
                />
              </div>

              {/* Toy Control Board */}
              <div
                className="flex items-center justify-between w-full mt-2"
                onPointerDown={(e) => e.stopPropagation()}
              >
                {/* Tiny Keycaps */}
                <div className="flex gap-2">
                  {[-1, 1, 5].map((val) => (
                    <button
                      key={val}
                      onClick={() => adjustTimerMinutes(val)}
                      className={`${actionBtnStyle} px-2.5 py-1 text-[11px] bg-[#d5dde5] dark:bg-[#2c3039] border-[#b0b8c4] dark:border-[#111317] text-[#0066ff] dark:text-[#6699ff] hover:bg-white`}
                    >
                      {val > 0 ? '+' : ''}{val}m
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetTimer}
                    className={`${actionBtnStyle} w-[32px] h-[32px] bg-[#d5dde5] dark:bg-[#2c3039] border-[#b0b8c4] dark:border-[#111317] text-[#0066ff] dark:text-[#6699ff] hover:bg-white`}
                  >
                    <RotateCcw size={14} strokeWidth={3} />
                  </button>

                  <button
                    onClick={() => tRemaining > 0 && setTRunning(!tRunning)}
                    className={`${actionBtnStyle} w-[42px] h-[32px] text-white
                      ${tRunning
                        ? 'bg-[#ff3333] border-[#cc0000] hover:bg-[#ff4d4d]'
                        : 'bg-[#ff6b1a] border-[#cc5500] hover:bg-[#ff8533]'}`}
                  >
                    {tRunning ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" className="ml-0.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}
