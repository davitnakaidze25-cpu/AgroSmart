import { CloudRain, Droplets, Fan, Hand, Sparkles, Sun } from 'lucide-react';

export default function ControlMode({ relays, toggleRelay, autoMode, setAutoMode, sensors }) {
  const relayControls = [
    { id: 0, title: 'Grow Lights', icon: Sun, color: 'text-yellow-500', bg: 'bg-yellow-50' },
    { id: 1, title: 'Shade Cloth', icon: CloudRain, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { id: 2, title: 'Irrigation', icon: Droplets, color: 'text-blue-500', bg: 'bg-blue-50' },
    { id: 3, title: 'Ventilation', icon: Fan, color: 'text-cyan-500', bg: 'bg-cyan-50' },
  ];

  return (
    <div className="flex flex-col min-h-full pb-6">
      <div className="bg-emerald-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem] shadow-sm relative z-10">
        <h1 className="text-2xl font-bold mb-1">Control Mode</h1>
        <p className="text-emerald-50 text-sm font-medium">Manual greenhouse relay control</p>
      </div>

      <div className="px-5 -mt-4 relative z-20 space-y-4 pt-8">
        <div className="bg-white rounded-2xl p-1 shadow-sm border border-slate-100 flex">
          <button
            type="button"
            onClick={() => setAutoMode && setAutoMode(false)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
              !autoMode ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Hand size={18} />
            <span>Manual</span>
          </button>
          <button
            type="button"
            onClick={() => setAutoMode && setAutoMode(true)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-colors ${
              autoMode ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            <Sparkles size={18} />
            <span>AI Auto</span>
          </button>
        </div>

        {/* Read-only Mist Pump status (from telemetry 4th value) */}
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className={`w-12 h-12 rounded-2xl bg-rose-50 flex items-center justify-center shrink-0`}>
              <Droplets size={24} className="text-rose-500" />
            </div>
            <div className="min-w-0">
              <h3 className="text-slate-800 font-semibold mb-0.5 truncate">Mist Pump</h3>
              <p className="text-slate-400 text-sm">{(sensors && (sensors.pumpActive === '1' || sensors.mist === '1')) ? 'ON' : 'OFF'}</p>
              <p className="text-slate-400 text-sm">{(sensors && (sensors.pumpActive === '1' || sensors.mist === '1')) ? 'Misting' : 'Resting'}</p>
            </div>
          </div>
          <div className="text-sm font-medium text-slate-700">{(sensors && (sensors.pumpActive === '1' || sensors.mist === '1')) ? 'ON' : 'OFF'}</div>
        </div>

        {relayControls.map((control) => {
          const Icon = control.icon;
          const isActive = relays && relays[control.id] === '1';

          return (
            <div key={control.id} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4 min-w-0">
                <div className={`w-12 h-12 rounded-2xl ${control.bg} flex items-center justify-center shrink-0`}>
                  <Icon size={24} className={control.color} />
                </div>
                <div className="min-w-0">
                  <h3 className="text-slate-800 font-semibold mb-0.5 truncate">{control.title}</h3>
                  <p className="text-slate-400 text-sm">{isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => toggleRelay && toggleRelay(control.id)}
                disabled={autoMode}
                aria-pressed={isActive}
                aria-label={`Toggle ${control.title}`}
                className={`w-14 h-8 rounded-full p-1 transition-colors duration-300 shrink-0 ${isActive ? 'bg-emerald-500' : 'bg-slate-300'} ${autoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className={`w-6 h-6 bg-white rounded-full shadow-sm transform transition-transform duration-300 ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
