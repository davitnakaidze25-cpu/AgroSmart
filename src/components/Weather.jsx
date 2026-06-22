import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Sun, Cloud, Droplets, Wind } from 'lucide-react';
import { cn } from '../lib/utils';

// Mock forecast data since no API key is provided
const MOCK_WEATHER = {
  current: {
    temp: 24,
    condition: 'Rain', // 'Sun', 'Clouds', 'Rain'
    precipChance: 80,
    humidity: 65,
    windSpeed: 12
  },
  forecast: [
    { time: '13:00', temp: 24, condition: 'Rain', icon: CloudRain },
    { time: '14:00', temp: 23, condition: 'Rain', icon: CloudRain },
    { time: '15:00', temp: 24, condition: 'Clouds', icon: Cloud },
    { time: '16:00', temp: 25, condition: 'Sun', icon: Sun },
    { time: '17:00', temp: 22, condition: 'Clouds', icon: Cloud },
  ]
};

const CurrentIcon = {
  Sun: Sun,
  Clouds: Cloud,
  Rain: CloudRain
}[MOCK_WEATHER.current.condition];

export default function Weather({ internalTemp }) {
  const [data, setData] = useState(MOCK_WEATHER);

  // If weather temp is hotter than internal temp, recommend fans
  const isFansRecommended = data.current.temp > parseFloat(internalTemp || 0);

  // useEffect(() => {
  //   // TODO: Fetch from OpenWeatherMap when API key is available
  //   // fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=...&lon=...&appid=${API_KEY}`)
  // }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="p-4 space-y-6"
    >
      <h2 className="text-2xl font-extrabold tracking-tight text-sprout-text mb-2">Microclimate</h2>

      {/* Smart Weather Context Banner */}
      <AnimatePresence>
        {isFansRecommended && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
            animate={{ opacity: 1, height: 'auto', marginBottom: 16 }}
            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-sprout-bg border border-sprout-primary/30 p-4 rounded-2xl flex items-center gap-3 shadow-md">
              <div className="bg-white p-2 rounded-xl text-sprout-primary">
                <Wind size={20} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-sprout-text">Greenhouse Optimization</h4>
                <p className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px] mt-0.5">Outside is hotter. Fans Recommended.</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Current Weather Card */}
      <div className={cn(
        "rounded-2xl p-8 relative overflow-hidden transition-colors duration-500 bg-white shadow-md",
      )}>
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <CurrentIcon size={120} />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-zinc-600 mb-4 font-medium">
            <CurrentIcon size={20} className="text-zinc-700" />
            <span>{data.current.condition}</span>
          </div>
          
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-7xl font-extrabold tracking-tighter text-zinc-800">{data.current.temp}</span>
            <span className="text-3xl font-bold text-stone-400">°C</span>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">
                <CloudRain size={12} className="text-sprout-primary" /> Precip
              </div>
              <span className="font-bold text-zinc-800">{data.current.precipChance}%</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">
                <Droplets size={12} className="text-sprout-primary" /> Hum
              </div>
              <span className="font-bold text-zinc-800">{data.current.humidity}%</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1 font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">
                <Wind size={12} className="text-sprout-primary" /> Wind
              </div>
              <span className="font-bold text-zinc-800">{data.current.windSpeed} km/h</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div>
        <h3 className="text-lg font-bold text-sprout-text mb-4">Today</h3>
        <div className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar">
          {data.forecast.map((hour, i) => {
            const Icon = hour.icon;
            return (
              <div 
                key={i} 
                className="snap-center shrink-0 w-20 flex flex-col items-center gap-3 p-4 bg-white rounded-2xl shadow-md"
              >
                <span className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">{hour.time}</span>
                <Icon size={24} className="text-sprout-primary" />
                <span className="font-extrabold text-zinc-800">{hour.temp}°</span>
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
