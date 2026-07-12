import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ChartsHistory() {
  const weatherForecast = [
    { day: 'ორშ', temp: '24°C', icon: Sun, color: 'text-blue-400' },
    { day: 'სამ', temp: '22°C', icon: Cloud, color: 'text-blue-500' },
    { day: 'ოთხ', temp: '20°C', icon: CloudRain, color: 'text-blue-600' },
    { day: 'ხუთ', temp: '25°C', icon: Sun, color: 'text-blue-400' },
    { day: 'პარ', temp: '23°C', icon: Cloud, color: 'text-blue-500' },
  ];

  const chartData = [
    { name: 'ორშ', humidity: 62, temperature: 22 },
    { name: 'სამ', humidity: 60, temperature: 24 },
    { name: 'ოთხ', humidity: 63, temperature: 23 },
    { name: 'ხუთ', humidity: 68, temperature: 25 },
    { name: 'პარ', humidity: 65, temperature: 24 },
    { name: 'შაბ', humidity: 64, temperature: 23 },
    { name: 'კვი', humidity: 66, temperature: 24 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100">
          <p className="font-bold text-slate-800 mb-1">{label}</p>
          <p className="text-blue-500 font-medium">
            {payload[0].name}: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col min-h-full pb-6">
      {/* Header */}
      <div className="bg-emerald-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem] shadow-sm relative z-10">
        <h1 className="text-2xl font-bold mb-1">გრაფიკები და ისტორია</h1>
        <p className="text-emerald-50 text-sm font-medium">კვირის მონაცემები და ამინდის პროგნოზი</p>
      </div>

      {/* Content */}
      <div className="px-5 -mt-4 relative z-20 space-y-6 pt-8">
        
        {/* Weather Forecast */}
        <div>
          <h2 className="text-slate-600 font-medium mb-3 pl-1">ამინდის პროგნოზი</h2>
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 flex justify-between overflow-x-auto gap-2 scrollbar-hide">
            {weatherForecast.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex flex-col items-center min-w-[3.5rem]">
                  <span className="text-slate-400 text-xs font-medium mb-2">{item.day}</span>
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center mb-2">
                    <Icon size={20} className={item.color} />
                  </div>
                  <span className="text-slate-800 text-sm font-semibold">{item.temp}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Trends */}
        <div>
          <h2 className="text-slate-600 font-medium mb-3 pl-1">კვირეული ტენდენციები</h2>
          
          <div className="space-y-4">
            {/* Humidity Chart */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-800 font-semibold text-lg">ტენიანობა</h3>
                <span className="text-slate-400 text-sm font-medium">%</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[0, 80]} ticks={[0, 20, 40, 60, 80]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" name="humidity" dataKey="humidity" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Temperature Chart */}
            <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-slate-800 font-semibold text-lg">ტემპერატურა</h3>
                <span className="text-slate-400 text-sm font-medium">°C</span>
              </div>
              <div className="h-48 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} domain={[14, 28]} ticks={[14, 21, 28]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" name="temperature" dataKey="temperature" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
