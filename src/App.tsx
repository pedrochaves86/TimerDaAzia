/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { intervalToDuration, format } from 'date-fns';
import { pt } from 'date-fns/locale';
import { motion, AnimatePresence } from 'motion/react';
import { Clock, TrendingUp, AlertCircle } from 'lucide-react';

export default function App() {
  const startDate = new Date(2025, 7, 30, 19, 30); // 30 Ago 2025 (Month is 0-indexed, so 7)
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const duration = intervalToDuration({
    start: startDate,
    end: now,
  });

  const timeUnits = [
    { label: 'ANOS', value: duration.years },
    { label: 'MESES', value: duration.months },
    { label: 'DIAS', value: duration.days },
    { label: 'HORAS', value: duration.hours },
    { label: 'MINUTOS', value: duration.minutes },
    { label: 'SEGUNDOS', value: duration.seconds },
  ];

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center py-12 md:justify-center font-sans overflow-hidden">
      {/* Background with the specified image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-[30s] hover:scale-110"
        style={{ 
          backgroundImage: `url('background.jpg')`, 
          backgroundColor: '#003319' 
        }}
      />
      
      {/* Sporting Green Tint Overlay */}
      <div className="absolute inset-0 z-[1] bg-green-900/20 mix-blend-overlay pointer-events-none" />
      
      {/* Sporting Stripes Overlay (Very subtle) */}
      <div className="absolute inset-0 z-[2] opacity-5 pointer-events-none bg-[repeating-linear-gradient(90deg,transparent,transparent_80px,rgba(255,255,255,0.03)_80px,rgba(255,255,255,0.03)_160px)]" />
      
      {/* Gradient Vignette - Focused on center for readability */}
      <div className="absolute inset-0 z-[4] bg-radial-[at_50%_50%] from-transparent via-black/30 to-black/80" />

      {/* Content */}
      <main className="relative z-10 w-full max-w-6xl px-6 pb-24 md:pb-12 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/40 text-green-400 text-[10px] font-mono tracking-[0.3em] mb-6 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <Clock size={12} className="animate-pulse" />
            <span>CRONÓMETRO OFICIAL DA "AZIA"</span>
          </div>
          
          <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter leading-[0.9] text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
            Há quanto tempo <br />
            as <span className="text-green-500 relative inline-block">
              putinhas
            </span> <br />
            andam com <br className="xs:hidden" />
            <span className="text-green-400">dores no pescoço?</span>
          </h1>
        </motion.div>

        {/* Timer Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-6 w-full max-w-5xl mb-8 md:mb-12">
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className="relative group h-28 sm:h-32 md:h-40 flex flex-col items-center justify-center bg-white/5 backdrop-blur-md rounded-xl md:rounded-2xl border border-white/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-display text-white z-10"
                >
                  {unit.value ?? 0}
                </motion.span>
              </AnimatePresence>
              
              <span className="text-[8px] sm:text-[10px] md:text-xs font-mono tracking-[0.2em] text-gray-400 mt-1 sm:mt-2 z-10 group-hover:text-green-400 transition-colors uppercase">
                {unit.label}
              </span>
              
              {/* Decorative line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-green-500 group-hover:w-full transition-all duration-700" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 text-green-400 font-mono text-xs sm:text-sm font-bold">
            <AlertCircle size={18} />
            <span className="uppercase tracking-widest drop-shadow-md">Desde {format(startDate, "d 'de' MMMM 'de' yyyy 'às' HH:mm", { locale: pt })}</span>
          </div>
          
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-green-600 to-transparent" />
          
          <p className="text-green-300 text-sm sm:text-base font-bold italic tracking-wide max-w-lg drop-shadow-md">
            "A olhar para cima desde o verão de 2025. A fisioterapia não está a fazer efeito."
          </p>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="absolute bottom-6 left-0 w-full z-10 px-6 flex justify-between items-center text-[10px] font-mono text-gray-500 tracking-widest uppercase">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span>LIVE TRACKING ACTIVE</span>
        </div>
        <div>SPORTING CP BANTER v1.0</div>
      </footer>
    </div>
  );
}
