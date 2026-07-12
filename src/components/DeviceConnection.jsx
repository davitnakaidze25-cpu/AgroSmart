import React from 'react';
import { Check, Activity, MapPin, Signal, RefreshCw, Wifi, HelpCircle } from 'lucide-react';

export default function DeviceConnection({ isConnected, isConnecting, connectBLE, disconnectBLE }) {
  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header */}
      <div className="bg-emerald-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem] shadow-sm relative z-10">
        <h1 className="text-2xl font-bold mb-1">მოწყობილობის დაკავშირება</h1>
        <p className="text-emerald-50 text-sm font-medium">დაკავშირება თქვენს სათბურთან</p>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 relative z-20 space-y-4 pt-8">
        
        {/* Success Card */}
        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center">
          <div className={`w-24 h-24 ${isConnected ? 'bg-green-100' : 'bg-slate-100'} rounded-full flex items-center justify-center mb-6`}>
            {isConnected ? (
              <Check size={48} className="text-emerald-600" strokeWidth={3} />
            ) : (
              <Wifi size={48} className="text-slate-400" strokeWidth={3} />
            )}
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">
            {isConnected ? 'დაკავშირებულია' : 'არ არის დაკავშირებული'}
          </h2>
          <p className={`${isConnected ? 'text-emerald-600' : 'text-slate-500'} font-medium`}>
            {isConnected ? 'მონაცემების სინქრონიზაცია' : 'დაელოდება კავშირს...'}
          </p>
        </div>

        {/* Device Information Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-6">
            <Activity size={20} className="text-emerald-600" />
            <h3 className="text-slate-800 font-semibold">მოწყობილობის ინფორმაცია</h3>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <span className="text-slate-500 text-sm">მოწყობილობის სახელი</span>
              <span className="text-slate-800 font-medium">{isConnected ? 'სათბური ალფა' : '-'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <span className="text-slate-500 text-sm">მოწყობილობის ID</span>
              <span className="text-slate-800 font-medium font-mono text-sm">{isConnected ? 'GH-2024-A1' : '-'}</span>
            </div>
            <div className="flex justify-between items-center border-b border-slate-50 pb-4">
              <span className="text-slate-500 text-sm">ადგილმდებარეობა</span>
              <div className="flex items-center gap-1 text-slate-800 font-medium">
                <MapPin size={16} className="text-emerald-600" />
                <span>ძირითადი სათბური</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500 text-sm">სიგნალის სიძლიერე</span>
              <div className="flex items-center gap-2">
                <Signal size={18} className={`${isConnected ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className={`${isConnected ? 'text-emerald-600' : 'text-slate-400'} font-medium`}>
                  {isConnected ? 'ძლიერი' : 'მიუწვდომელია'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={isConnected ? disconnectBLE : connectBLE}
            disabled={isConnecting}
            className={`flex-1 ${isConnected ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-semibold shadow-sm transition-colors disabled:opacity-50`}
          >
            <RefreshCw size={20} className={isConnecting ? "animate-spin" : ""} />
            <span>{isConnecting ? 'უკავშირდება...' : (isConnected ? 'გათიშვა' : 'დაკავშირება')}</span>
          </button>
          <button className="w-16 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <Wifi size={20} />
          </button>
        </div>

        {/* Troubleshooting Tips */}
        <div className="bg-slate-100/50 rounded-3xl p-6 border border-slate-200/50 mt-2">
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle size={20} className="text-blue-600" />
            <h3 className="text-slate-800 font-semibold">პრობლემების მოგვარების რჩევები</h3>
          </div>
          <ul className="text-slate-500 text-sm space-y-2 list-disc list-inside">
            <li>დარწმუნდით, რომ თქვენი მოწყობილობა ჩართულია.</li>
            <li>შეამოწმეთ ინტერნეტ კავშირი.</li>
          </ul>
        </div>

      </div>
    </div>
  );
}
