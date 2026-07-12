import React from 'react';

import { Bell, Languages, User, Droplets, Thermometer, Wind, Sun, FlaskConical, Sprout } from 'lucide-react';



export default function HomeDashboard({ sensors: realSensors, isConnected }) {

  const sensors = [

    { label: 'ტენიანობა', value: realSensors?.hum || '65', unit: '%', icon: Droplets, color: 'text-blue-500', bgColor: 'bg-blue-50' },

    { label: 'ტემპერატურა', value: realSensors?.temp || '24', unit: '°C', icon: Thermometer, color: 'text-orange-500', bgColor: 'bg-orange-50' },

    { label: 'CO2 დონე', value: '420', unit: 'pcm', icon: Wind, color: 'text-purple-500', bgColor: 'bg-purple-50' },

    { label: 'სინათლის დონე', value: realSensors?.light || '850', unit: 'lux', icon: Sun, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },

    { label: 'pH დონე', value: '6.5', unit: '', icon: FlaskConical, color: 'text-pink-500', bgColor: 'bg-pink-50' },

    { label: 'ნიადაგის ტენიანობა', value: '72', unit: '%', icon: Sprout, color: 'text-green-600', bgColor: 'bg-green-50' },

  ];



  return (

    <div className="flex flex-col min-h-full pb-6">

      {/* Header */}

      <div className="bg-emerald-600 text-white pt-12 pb-8 px-6 rounded-b-[2rem] shadow-sm relative z-10">

        <div className="flex justify-between items-start mb-6">

          <div className="flex flex-col">

            <span className="text-emerald-100 text-sm mb-1">კეთილი იყოს თქვენი დაბრუნება</span>

            <h1 className="text-2xl font-bold leading-tight">სათბურის<br/>მონიტორინგი</h1>

          </div>

          <div className="flex gap-2">

            <button className="w-10 h-10 rounded-full bg-emerald-500/50 flex items-center justify-center backdrop-blur-sm">

              <Bell size={20} className="text-white" />

            </button>

            <button className="w-10 h-10 rounded-full bg-emerald-500/50 flex items-center justify-center backdrop-blur-sm relative">

              <Languages size={20} className="text-white" />

              <span className="absolute -bottom-1 -right-1 bg-white text-emerald-700 text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-600">KA</span>

            </button>

            <button className="w-10 h-10 rounded-full bg-emerald-500/50 flex items-center justify-center backdrop-blur-sm">

              <User size={20} className="text-white" />

            </button>

          </div>

        </div>

        <p className="text-emerald-50 text-sm font-medium">რეალურ დროში მონიტორინგი</p>

      </div>



      {/* Content */}

      <div className="px-5 -mt-4 relative z-20 space-y-4">

        {/* Grid */}

        <div className="grid grid-cols-2 gap-4 pt-8">

          {sensors.map((sensor, idx) => {

            const Icon = sensor.icon;

            return (

              <div key={idx} className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex flex-col justify-between aspect-square">

                <div className={`w-12 h-12 rounded-2xl ${sensor.bgColor} flex items-center justify-center mb-4`}>

                  <Icon size={24} className={sensor.color} />

                </div>

                <div>

                  <h3 className="text-slate-500 text-sm font-medium mb-1">{sensor.label}</h3>

                  <div className="flex items-baseline gap-1">

                    <span className="text-3xl font-semibold text-slate-800">{sensor.value}</span>

                    {sensor.unit && <span className="text-slate-400 text-sm font-medium">{sensor.unit}</span>}

                  </div>

                </div>

              </div>

            );

          })}

        </div>



        {/* Status Banner */}

        <div className={`border rounded-2xl p-4 flex items-center gap-3 ${isConnected ? 'bg-green-100/50 border-green-200/50' : 'bg-red-100/50 border-red-200/50'}`}>

          <div className="relative flex h-3 w-3">

            {isConnected && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>}

            <span className={`relative inline-flex rounded-full h-3 w-3 ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></span>

          </div>

          <span className={`${isConnected ? 'text-green-800' : 'text-red-800'} font-medium text-sm`}>

            {isConnected ? 'ყველა სისტემა ნორმალურად მუშაობს' : 'სისტემა გამორთულია (Offline)'}

          </span>

        </div>

      </div>

    </div>

  );

} 




