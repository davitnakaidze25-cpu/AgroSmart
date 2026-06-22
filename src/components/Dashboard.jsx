import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Sun } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Dashboard({ sensors }) {
  // Simple SVG sparkline component
  const Sparkline = ({ className }) => (
    <svg className={cn("absolute bottom-0 left-0 w-full h-24 opacity-10 pointer-events-none", className)} viewBox="0 0 100 30" preserveAspectRatio="none">
      <path
        d="M0,25 C20,25 20,5 40,15 C60,25 60,10 80,10 C90,10 95,20 100,20 L100,30 L0,30 Z"
        fill="currentColor"
      />
    </svg>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-sprout-text mb-6">Live Telemetry</h2>

      <div className="grid gap-6">
        {/* Temp Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Thermometer size={120} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Thermometer size={16} className="text-orange-500" />
            <span className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">Temperature</span>
          </div>
          <Sparkline className="text-orange-500 opacity-20" />
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-7xl font-extrabold tracking-tighter text-zinc-800">{sensors.temp}</span>
            <span className="text-2xl font-bold text-stone-400">°C</span>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Droplets size={120} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Droplets size={16} className="text-sky-500" />
            <span className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">Humidity</span>
          </div>
          <Sparkline className="text-sky-500 opacity-20" />
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-7xl font-extrabold tracking-tighter text-zinc-800">{sensors.hum}</span>
            <span className="text-2xl font-bold text-stone-400">%</span>
          </div>
        </div>

        {/* Light Card */}
        <div className="bg-white p-6 rounded-2xl shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <Sun size={120} />
          </div>
          <div className="flex items-center gap-2 mb-4">
            <Sun size={16} className="text-amber-400" />
            <span className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">Light Intensity</span>
          </div>
          <Sparkline className="text-amber-400 opacity-20" />
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-7xl font-extrabold tracking-tighter text-zinc-800">{sensors.light}</span>
            <span className="text-2xl font-bold text-stone-400">%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
