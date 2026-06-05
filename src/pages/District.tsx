import React, { useState } from 'react';
import { mockLeaders, mockZones, mockEvents, mockClubs } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import { Map, Calendar, Users, Landmark, MessageSquare } from 'lucide-react';

export const District: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>('z1');

  const activeZone = mockZones.find((z) => z.id === selectedZoneId) || mockZones[0];
  const activeZoneClubs = mockClubs.filter((c) => c.zone === activeZone.name);

  return (
    <div className="relative z-10 w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">DISTRICT PROFILE</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-1">
          District 3192 Atlas
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
          Dive into the structural currents of our district. Explore our leadership, geographical zones, and calendar roadmap.
        </p>
      </div>

      {/* SECTION 1: ABOUT DISTRICT & STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20">
              <Landmark className="h-5 w-5" />
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">About Our Jurisdiction</h2>
          </div>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Rotaract District 3192 spans across vibrant metropolitan cores and rural sectors. We serve as a vital incubator for community leadership, connecting thousands of young adults under the global canopy of Rotary International.
          </p>
          <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
            Our governance model divides the clubs into five strategic zones. This ensures high-impact localized project execution while maintaining global fellowship currents and district-wide joint initiatives.
          </p>

          {/* Quick stats pods */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
            <div className="glass-panel p-4 text-center">
              <span className="font-mono text-cyan-400 text-2xl font-bold">120+</span>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Active Clubs</div>
            </div>
            <div className="glass-panel p-4 text-center">
              <span className="font-mono text-cyan-400 text-2xl font-bold">2.5k+</span>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Members</div>
            </div>
            <div className="glass-panel p-4 text-center col-span-2 sm:col-span-1">
              <span className="font-mono text-cyan-400 text-2xl font-bold">5 Zones</span>
              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-1">Divided Grids</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <GlassCard className="p-8 border-l-4 border-l-cyan-400 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white italic">Annual District Goals</h3>
            <div className="space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Lake Rejuvenations Target</span>
                  <span className="text-cyan-400 font-bold">8 / 10 Lakes</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Digital Classrooms Deployed</span>
                  <span className="text-cyan-400 font-bold">35 / 50 Schools</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '70%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1">
                  <span>Rural Medical Camps Held</span>
                  <span className="text-cyan-400 font-bold">12 / 15 Camps</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* SECTION 2: INTERACTIVE OCEAN MAP (Ocean Atlas) */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20">
            <Map className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">Ocean Atlas (Zones Map)</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Interactive SVG Atlas Map */}
          <div className="lg:col-span-7 glass-panel p-6 border border-white/10 flex flex-col justify-center min-h-[350px] relative">
            <div className="absolute top-4 left-4 font-mono text-[10px] text-slate-400 tracking-wider">
              TOPOLOGICAL DISTRICT MAP // ROTARACT 3192
            </div>

            {/* Vector representation of zones */}
            <svg viewBox="0 0 500 400" className="w-full h-auto max-h-[350px] select-none mt-4">
              {/* Grid backdrop */}
              <defs>
                <pattern id="grid" width="25" height="25" patternUnits="userSpaceOnUse">
                  <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* District outline simulation */}
              <path
                d="M 100,80 Q 250,30 380,90 T 420,280 Q 300,380 150,320 Z"
                fill="rgba(14, 165, 233, 0.02)"
                stroke="rgba(56, 189, 248, 0.15)"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />

              {/* Zone paths (clicking highlights) */}
              {mockZones.map((zone) => {
                const isActive = zone.id === selectedZoneId;
                return (
                  <g
                    key={zone.id}
                    onClick={() => setSelectedZoneId(zone.id)}
                    className="cursor-pointer group"
                  >
                    {/* Ring aura around coordinate dot */}
                    <circle
                      cx={zone.coordinates.x * 5}
                      cy={zone.coordinates.y * 4}
                      r={isActive ? 16 : 8}
                      className={`fill-cyan-400/10 stroke-cyan-400/40 transition-all duration-300 ${
                        isActive ? 'opacity-100 animate-pulse' : 'opacity-0 group-hover:opacity-100'
                      }`}
                      strokeWidth="1"
                    />
                    {/* Core coordinate dot */}
                    <circle
                      cx={zone.coordinates.x * 5}
                      cy={zone.coordinates.y * 4}
                      r={isActive ? 6 : 4.5}
                      className={`transition-all duration-300 ${
                        isActive ? 'fill-cyan-400 shadow-lg' : 'fill-slate-400 group-hover:fill-cyan-300'
                      }`}
                    />
                    {/* Floating label */}
                    <text
                      x={zone.coordinates.x * 5}
                      y={zone.coordinates.y * 4 - 15}
                      textAnchor="middle"
                      className={`font-mono text-[9px] font-bold uppercase transition-all duration-300 ${
                        isActive ? 'fill-cyan-300' : 'fill-slate-400 opacity-60 group-hover:opacity-100'
                      }`}
                    >
                      {zone.name}
                    </text>
                  </g>
                );
              })}
            </svg>
            <div className="text-center font-mono text-[10px] text-slate-500 mt-2">
              * Click coordinates on the grid to inspect regional club currents
            </div>
          </div>

          {/* Zone Detail Inspector Card */}
          <div className="lg:col-span-5 flex">
            <GlassCard className="w-full border-t-2 border-t-cyan-400 flex flex-col justify-between p-8">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">ZONE EXPLORER</span>
                  <h3 className="font-serif text-2xl font-bold text-white mt-1">
                    {activeZone.name}
                  </h3>
                  <p className="text-slate-300 text-sm font-light mt-3 leading-relaxed">
                    {activeZone.description}
                  </p>
                </div>

                {/* Clubs count */}
                <div className="flex justify-between items-center bg-white/5 border border-white/5 p-4 rounded-xl">
                  <span className="font-mono text-xs text-slate-400">Total Registered Clubs</span>
                  <span className="font-mono text-white text-sm font-bold">{activeZone.clubCount} Clubs</span>
                </div>

                {/* List of mock clubs in active zone */}
                <div>
                  <h4 className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold mb-3">
                    Active Drop Clubs
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto pr-2 no-scrollbar">
                    {activeZoneClubs.map((club) => (
                      <div
                        key={club.id}
                        className="glass-panel py-2 px-3 flex items-center gap-2 border border-white/5 text-xs text-slate-200"
                      >
                        <div className="h-6 w-6 rounded-md bg-cyan-500/10 flex items-center justify-center text-[9px] font-bold text-cyan-400">
                          {club.logo}
                        </div>
                        <span className="font-medium truncate">{club.name}</span>
                      </div>
                    ))}
                    {activeZoneClubs.length === 0 && (
                      <div className="text-slate-500 text-xs py-2">No cataloged mock clubs in this zone.</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="border-t border-white/5 pt-6 mt-6 flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Coordinates: [{activeZone.coordinates.x}, {activeZone.coordinates.y}]</span>
                <span className="text-cyan-400 font-semibold">// COMPASS STRENGTH</span>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* SECTION 3: LEADERSHIP PROFILE CARDS */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20">
            <Users className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">District Leadership</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockLeaders.map((leader) => (
            <GlassCard key={leader.id} className="flex flex-col justify-between min-h-[350px]">
              <div className="space-y-4">
                {/* Image & Title */}
                <div className="flex items-center gap-4">
                  <img src={leader.image} alt={leader.name} className="h-16 w-16 rounded-full object-cover border border-cyan-400/30 shadow-md" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white leading-snug">{leader.name}</h3>
                    <p className="font-mono text-[10px] text-cyan-400 font-semibold uppercase tracking-wider mt-0.5">
                      {leader.role}
                    </p>
                  </div>
                </div>

                {/* Message quote */}
                <div className="relative pt-2">
                  <MessageSquare className="absolute -top-1 -left-2 h-8 w-8 text-cyan-500/10 pointer-events-none" />
                  <p className="text-slate-300 text-sm font-light leading-relaxed italic relative z-10 pl-4">
                    "{leader.quote}"
                  </p>
                </div>
              </div>

              <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>ROTARACT D3192</span>
                <span className="text-cyan-400 font-semibold">// VERIFIED LEADER</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* SECTION 4: DISTRICT CALENDAR (Timeline) */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-400/20">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-white">District Roadmap Calendar</h2>
        </div>

        {/* Vertical Calendar Timeline */}
        <div className="glass-panel p-6 md:p-10 border border-white/10 relative">
          <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-0.5 bg-gradient-to-b from-cyan-400 via-blue-500 to-transparent pointer-events-none" />

          <div className="space-y-12">
            {mockEvents.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={evt.id}
                  className={`flex flex-col md:flex-row items-stretch relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#020617] border-2 border-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10 top-2" />

                  {/* Left Column (Spacing on desktop) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8" />

                  {/* Right Column (Content) */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <GlassCard className="p-6">
                      <span className="font-mono text-cyan-400 text-xs font-semibold tracking-wider">
                        {evt.date} • {evt.type}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-white mt-1">
                        {evt.title}
                      </h4>
                      <p className="text-slate-300 text-sm font-light mt-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </GlassCard>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default District;
