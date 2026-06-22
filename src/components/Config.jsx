import React from 'react';
import { motion } from 'framer-motion';
import { Bluetooth, Settings2, SlidersHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Config({ 
  isConnected, 
  isConnecting,
  connectBLE, 
  disconnectBLE,
  autoMode,
  setAutoMode,
  calibrations,
  setCalibrations
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-sprout-text mb-6">Configuration</h2>

      {/* BLE Connection Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className={cn(
            "p-2 rounded-xl",
            isConnected ? "bg-sprout-bg text-sprout-primary" : "bg-white text-stone-400 border border-zinc-100"
          )}>
            <Bluetooth size={24} />
          </div>
          <div>
            <h3 className="font-bold text-zinc-800">ESP32 Hardware</h3>
            <p className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px] mt-0.5">
              {isConnected ? 'Linked and Active' : 'Disconnected'}
            </p>
          </div>
        </div>

        {isConnected ? (
          <button 
            onClick={disconnectBLE}
            className="w-full py-4 rounded-2xl bg-rose-50 text-rose-600 font-bold active:scale-95 transition-all"
          >
            Terminate Link
          </button>
        ) : (
          <button 
            onClick={connectBLE}
            disabled={isConnecting}
            className="w-full py-4 rounded-xl bg-sprout-primary text-white font-bold active:scale-95 transition-all disabled:opacity-50 shadow-md"
          >
            {isConnecting ? 'Negotiating...' : 'Initialize Connection'}
          </button>
        )}
      </div>

      {/* Automation Master Switch */}
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Settings2 size={24} className="text-sprout-primary" />
            <h3 className="font-bold text-zinc-800">Automatic Mode</h3>
          </div>
          
          <button
            onClick={() => setAutoMode(!autoMode)}
            className={cn(
              "relative w-14 h-8 rounded-full p-1 transition-colors duration-300",
              autoMode ? "bg-sprout-accent" : "bg-zinc-200"
            )}
          >
            <motion.div
              className="w-6 h-6 bg-white rounded-full shadow-sm"
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              animate={{ x: autoMode ? 24 : 0 }}
            />
          </button>
        </div>
        <p className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px] leading-relaxed mt-2">
          Allow the system to automatically control actuators based on sensor telemetry.
        </p>
      </div>

      {/* Calibration Panel */}
      <div className="bg-white p-6 rounded-2xl shadow-md space-y-6">
        <div className="flex items-center gap-3">
          <SlidersHorizontal size={24} className="text-sprout-primary" />
          <h3 className="font-bold text-zinc-800">Light Calibration</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">Dark Calibration (0%)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" max="4095" 
                value={calibrations.dark}
                onChange={(e) => setCalibrations({ ...calibrations, dark: parseInt(e.target.value) })}
                className="flex-1 accent-sprout-primary"
              />
              <span className="w-12 text-right font-mono text-sm font-extrabold text-zinc-800">{calibrations.dark}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">Bright Calibration (100%)</label>
            <div className="flex items-center gap-4">
              <input 
                type="range" 
                min="0" max="4095" 
                value={calibrations.bright}
                onChange={(e) => setCalibrations({ ...calibrations, bright: parseInt(e.target.value) })}
                className="flex-1 accent-sprout-primary"
              />
              <span className="w-12 text-right font-mono text-sm font-extrabold text-zinc-800">{calibrations.bright}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
