import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Power, Fan, CloudRain, SunMedium, Activity } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Controls({ relays, toggleRelay, sensors, isConnected }) {
  const [pending, setPending] = useState({});

  // Read the autonomous pump state directly from the telemetry
  const isPumpActive = sensors?.pumpActive === true || sensors?.pumpActive === '1' || sensors?.pumpActive === 1;

  const handleToggle = async (id) => {
    if (pending[id]) return;
    
    if (navigator.vibrate) navigator.vibrate(40);

    if (navigator.vibrate) navigator.vibrate(40);
    
    setPending(p => ({ ...p, [id]: true }));
    await toggleRelay(id);
    
    await new Promise(r => setTimeout(r, 400));
    setPending(p => ({ ...p, [id]: false }));
  };

  // Removed id: 2 (Foggers) from the manual array because it is now autonomous
  const manualControls = [
    { id: 0, title: 'Grow Lights', icon: SunMedium },
    { id: 1, title: 'Shade Cloth', icon: CloudRain },
    { id: 3, title: 'Vent Fans', icon: Fan },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-sprout-text mb-6">Actuators</h2>

      <div className="grid gap-4">
        
        {/* AUTONOMOUS MIST PUMP (READ-ONLY INDICATOR) */}
        <div className={cn(
          "group relative w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300",
          "overflow-hidden shadow-md",
          isPumpActive && isConnected ? "bg-emerald-50 border border-emerald-200" : "bg-white border border-transparent"
        )}>
          <div className="flex items-center gap-4">
            <div className={cn(
              "p-3 rounded-2xl transition-colors duration-300",
              isPumpActive && isConnected ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
            )}>
              <Activity className={cn("w-6 h-6", isPumpActive && isConnected ? "animate-pulse" : "")} />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "text-base font-bold transition-colors duration-300",
                isPumpActive && isConnected ? "text-emerald-900" : "text-stone-400"
              )}>
                Foggers (Auto)
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-0.5">
                {!isConnected ? 'Offline' : isPumpActive ? 'Misting Phase (3m)' : 'Rest Phase (4m)'}
              </span>
            </div>
          </div>

          {/* Status Badge instead of Toggle Switch */}
          <div className={cn(
            "px-4 py-1.5 rounded-full text-sm font-bold shadow-sm transition-colors duration-300",
            isConnected && isPumpActive ? "bg-emerald-500 text-white" : "bg-zinc-200 text-zinc-500"
          )}>
            {isConnected ? (isPumpActive ? 'ON' : 'OFF') : '---'}
          </div>
        </div>


        {/* MANUAL CONTROLS */}
        {manualControls.map((ctrl) => {
          const isActive = relays[ctrl.id] === '1';
          const Icon = ctrl.icon;
          const isPending = pending[ctrl.id];

          return (
            <motion.button
              whileTap={!isPending ? { scale: 0.96 } : {}}
              key={ctrl.id}
              onClick={() => handleToggle(ctrl.id)}
              className={cn(
                "group relative w-full flex items-center justify-between p-5 rounded-2xl transition-all duration-300",
                "overflow-hidden shadow-md",
                isActive ? "bg-white" : "bg-white/60",
                isPending && "opacity-70 animate-pulse pointer-events-none"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "p-3 rounded-2xl transition-colors duration-300",
                  isActive ? "bg-sprout-bg" : "bg-white"
                )}>
                  <Icon className={cn("w-6 h-6 transition-colors duration-300", isActive ? "text-sprout-primary" : "text-stone-300")} />
                </div>
                <span className={cn(
                  "text-base font-bold transition-colors duration-300",
                  isActive ? "text-sprout-text" : "text-stone-400"
                )}>
                  {ctrl.title}
                </span>
              </div>

              {/* Custom Spring Toggle */}
              <div className={cn(
                "relative w-14 h-8 rounded-full p-1 transition-colors duration-300",
                isActive ? "bg-sprout-accent" : "bg-zinc-200"
              )}>
                <motion.div
                  className="w-6 h-6 bg-white rounded-full shadow-sm"
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                  animate={{
                    x: isActive ? 24 : 0
                  }}
                />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
