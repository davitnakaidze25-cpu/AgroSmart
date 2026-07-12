import React, { useState } from 'react';
import HomeDashboard from './components/HomeDashboard';
import ControlMode from './components/ControlMode';
import DeviceConnection from './components/DeviceConnection';
import ChartsHistory from './components/ChartsHistory';
import { Home, SlidersHorizontal, Cloud, BarChart2 } from 'lucide-react';
import { useAgroState } from './hooks/useAgroState';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const agroState = useAgroState();

  const renderView = () => {
    switch (activeTab) {
      case 'home':
        return <HomeDashboard sensors={agroState.sensors} isConnected={agroState.isConnected} />;
      case 'control':
        return (
          <ControlMode
            relays={agroState.relays}
            toggleRelay={agroState.toggleRelay}
            autoMode={agroState.autoMode}
            setAutoMode={agroState.setAutoMode}
            sensors={agroState.sensors}
          />
        );
      case 'device':
        return (
          <DeviceConnection
            isConnected={agroState.isConnected}
            isConnecting={agroState.isConnecting}
            connectBLE={agroState.connectBLE}
            disconnectBLE={agroState.disconnectBLE}
          />
        );
      case 'charts':
        return <ChartsHistory />;
      default:
        return <HomeDashboard sensors={agroState.sensors} isConnected={agroState.isConnected} />;
    }
  };

  const navItems = [
    { id: 'home', label: 'მთავარი', icon: Home },
    { id: 'control', label: 'კონტროლი', icon: SlidersHorizontal },
    { id: 'device', label: 'მოწყობილობა', icon: Cloud },
    { id: 'charts', label: 'გრაფიკები', icon: BarChart2 },
  ];

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative pb-20 shadow-2xl overflow-hidden flex flex-col font-sans text-slate-800">
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">{renderView()}</main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-100 pb-[env(safe-area-inset-bottom)] z-50">
        <div className="flex justify-around items-center pt-2 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center w-16 h-12 transition-colors ${
                  isActive ? 'text-emerald-600' : 'text-slate-400 hover:text-slate-500'
                }`}
              >
                <Icon size={24} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
