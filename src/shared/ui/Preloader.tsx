import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Animate progress up to 100%
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Random step increment for realistic feel
        const increment = Math.floor(Math.random() * 15) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    if (progress === 100) {
      // Small delay at 100% for smooth experience
      timeoutId = setTimeout(() => {
        setShow(false);
        if (onComplete) {
          onComplete();
        }
      }, 500);
    }
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 bg-[#0A0A12] z-[9999] flex flex-col items-center justify-center select-none"
        >
          {/* Futuristic ambient glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#7C3AED]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#06B6D4]/5 rounded-full blur-[130px] pointer-events-none" />

          {/* Loader Content Container */}
          <div className="flex flex-col items-center gap-8 relative z-10">
            {/* Logo Wrapper with pulsing/spinning glow border */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              {/* Outer rotating gradient ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border-2 border-dashed border-t-[#7C3AED] border-r-transparent border-b-[#06B6D4] border-l-transparent opacity-80"
              />
              {/* Inner glowing pulse ring */}
              <motion.div
                animate={{ scale: [0.95, 1.05, 0.95] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-[#7C3AED]/20 to-[#06B6D4]/20 blur-md"
              />
              {/* Logo Image */}
              <img
                src="/assets/logo-source.svg"
                alt="SynapseAST Logo"
                className="w-16 h-16 relative z-10 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              />
            </div>

            {/* Brand Title */}
            <div className="flex flex-col items-center gap-1">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-extrabold tracking-wider text-white"
              >
                Synapse<span className="text-[#7C3AED]">AST</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.4 }}
                className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8]"
              >
                Compiler Visualization Engine
              </motion.p>
            </div>

            {/* Progress Container */}
            <div className="w-56 flex flex-col gap-2 items-center">
              {/* Progress Bar background */}
              <div className="w-full h-1 bg-[#1C1C2E] border border-[#2A2A45] rounded-full overflow-hidden relative">
                {/* Glowing progress line */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#7C3AED] to-[#06B6D4] rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              {/* Progress Text & Engine Status */}
              <div className="flex justify-between w-full text-[10px] font-semibold font-mono text-[#94A3B8] px-0.5">
                <span>
                  {progress < 30
                    ? 'Loading parser...'
                    : progress < 70
                      ? 'Building layout engine...'
                      : progress < 100
                        ? 'Bootstrapping canvas...'
                        : 'Ready'}
                </span>
                <span className="text-[#06B6D4]">{progress}%</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
