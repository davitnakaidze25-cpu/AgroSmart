import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Home, Sliders, CloudRain, Settings } from 'lucide-react';
import { cn } from './lib/utils';
import { useAgroState } from './hooks/useAgroState';

import Dashboard from './components/Dashboard';
import Controls from './components/Controls';
import Weather from './components/Weather';
import Config from './components/Config';

export default function App() {
  const [activeTab, setActiveTab] = useState('hub');
  const agroState = useAgroState();

  const renderTab = () => {
    switch (activeTab) {
      case 'hub':
        return <Dashboard key="hub" sensors={agroState.sensors} />;
      case 'controls':
        return <Controls key="controls" relays={agroState.relays} toggleRelay={agroState.toggleRelay} />;
      case 'weather':
        return <Weather key="weather" internalTemp={agroState.sensors.temp} />;
      case 'config':
        return <Config key="config" {...agroState} />;
      default:
        return <Dashboard key="hub" sensors={agroState.sensors} />;
    }
  };

  const navItems = [
    { id: 'hub', label: 'Hub', icon: Home },
    { id: 'controls', label: 'Controls', icon: Sliders },
    { id: 'weather', label: 'Weather', icon: CloudRain },
    { id: 'config', label: 'Config', icon: Settings },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-sprout-bg relative pb-24 shadow-2xl shadow-zinc-200/50 sm:border-x border-zinc-200 flex flex-col font-sans">
      
      {/* Global Sticky Header */}
      <header className="sticky top-0 z-50 bg-sprout-bg/90 backdrop-blur-2xl border-b border-zinc-200/60 px-5 py-4 flex justify-between items-center drop-shadow-sm">
        <h1 className="text-xl font-bold tracking-tight text-sprout-text">AgroSmart</h1>
        
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm">
          <div className="relative flex h-2.5 w-2.5">
            {agroState.isConnected && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sprout-primary opacity-75"></span>
            )}
            <span className={cn(
              "relative inline-flex rounded-full h-2.5 w-2.5",
              agroState.isConnected ? "bg-sprout-primary" : "bg-zinc-300"
            )}></span>
          </div>
          <span className="font-semibold text-emerald-800 uppercase tracking-widest text-[9px]">
            {agroState.isConnected ? 'Linked' : 'Offline'}
          </span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-x-hidden">
        <AnimatePresence mode="wait">
          {renderTab()}
        </AnimatePresence>
      </main>

      {/* Fixed Bottom Tab Bar */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-zinc-200 pb-[env(safe-area-inset-bottom)] z-50 drop-shadow-lg">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="relative flex flex-col items-center justify-center w-16 h-14"
              >
                <div className={cn(
                  "flex flex-col items-center justify-center gap-1.5 transition-colors duration-300 z-10",
                  isActive ? "text-sprout-primary" : "text-emerald-800/60"
                )}>
                  <Icon size={22} className={cn("transition-transform duration-300", isActive && "scale-110")} />
                  <span className="font-semibold uppercase tracking-widest text-[9px]">{item.label}</span>
                </div>
                
                {/* Active Pill Indicator */}
                {isActive && (
                  <div className="absolute inset-0 bg-sprout-primary/10 rounded-2xl -z-0" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

    </div>
  );
}
