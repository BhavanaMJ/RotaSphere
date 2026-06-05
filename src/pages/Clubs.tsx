import React, { useState } from 'react';
import { mockClubs, mockProjects, mockZones } from '../data/mockData';
import type { Club, Project } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import { Search, MapPin, Compass, X, Eye } from 'lucide-react';

interface ClubsProps {
  setCurrentTab: (tab: string) => void;
  setSelectedProjectId: (id: string | null) => void;
}

export const Clubs: React.FC<ClubsProps> = ({ setCurrentTab, setSelectedProjectId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedSort, setSelectedSort] = useState('Points'); // 'Points' | 'Projects'

  const [activeClub, setActiveClub] = useState<Club | null>(null);

  const zonesList = mockZones.map((z) => z.name);

  // Sorting clubs based on criteria (Points or Projects)
  const sortedClubs = [...mockClubs].sort((a, b) => {
    if (selectedSort === 'Points') {
      if (b.points !== a.points) return b.points - a.points;
      return b.projectsCount - a.projectsCount;
    } else {
      if (b.projectsCount !== a.projectsCount) return b.projectsCount - a.projectsCount;
      return b.points - a.points;
    }
  });

  // Podium Clubs (Top 3)
  const podiumClubs = [...mockClubs]
    .sort((a, b) => b.points - a.points) // Always points for the absolute leaderboard podium
    .slice(0, 3);

  // Re-ordering for visual podium: Rank 2 on Left, Rank 1 in Center, Rank 3 on Right
  const visualPodium = [
    { rank: 2, club: podiumClubs[1], color: 'from-slate-400 to-slate-500', border: 'border-slate-500/30', glow: 'shadow-[0_0_20px_rgba(148,163,184,0.15)]', order: 'order-2 md:order-1', scale: 'hover:scale-[1.02] md:hover:scale-[1.04]' },
    { rank: 1, club: podiumClubs[0], color: 'from-amber-400 to-yellow-500', border: 'border-amber-400/40', glow: 'shadow-[0_0_30px_rgba(245,158,11,0.2)]', order: 'order-1 md:order-2', scale: 'md:scale-105 z-10 hover:scale-[1.02] md:hover:scale-[1.07]' },
    { rank: 3, club: podiumClubs[2], color: 'from-amber-600 to-orange-700', border: 'border-amber-700/30', glow: 'shadow-[0_0_20px_rgba(194,65,12,0.15)]', order: 'order-3 md:order-3', scale: 'hover:scale-[1.02] md:hover:scale-[1.04]' }
  ];

  // Filtering directory list
  const filteredClubs = sortedClubs.filter((club) => {
    const matchesSearch = club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          club.president.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesZone = selectedZone === 'All' || club.zone === selectedZone;

    return matchesSearch && matchesZone;
  });

  // Get projects for active club details modal
  const clubProjects: Project[] = activeClub
    ? mockProjects.filter((p) => p.clubId === activeClub.id)
    : [];

  const handleProjectClickInModal = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentTab('projects');
    setActiveClub(null);
  };

  return (
    <div className="relative z-10 w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">MEMBER DIRECTORY</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-1">
          Clubs of District 3192
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
          Meet the droplets forming our ocean of impact. Explore active clubs, zones, and current point leaderboards.
        </p>
      </div>

      {/* SECTION 1: PODIUM (Top Performing Clubs) */}
      <div className="mb-20 glass-panel p-8 md:p-12 relative overflow-hidden border border-white/10 text-center">
        {/* Glowing water lines behind podium */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
          <div className="w-[500px] h-[500px] border border-cyan-400/20 rounded-full animate-pulse" />
        </div>

        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">THE SUMMIT</span>
        <h2 className="font-serif text-3xl font-bold text-white mt-1 mb-16">
          Top Performing Clubs
        </h2>

        {/* Podium Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto items-stretch mt-8">
          {visualPodium.map((pos) => {
            if (!pos.club) return null;
            return (
              <div
                key={pos.rank}
                className={`flex flex-col justify-between p-6 rounded-2xl border ${pos.border} ${pos.glow} ${pos.scale} ${pos.order} bg-[#081326]/60 backdrop-blur-md transition-all duration-300 relative group overflow-hidden`}
              >
                {/* Glowing top line */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />

                {/* Card Header: Badge & Logo */}
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="relative">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-900/60 to-blue-900/40 border border-cyan-400/30 flex items-center justify-center text-2xl font-bold text-cyan-300 shadow-lg">
                      {pos.club.logo}
                    </div>
                    <div className="absolute -top-3 -right-3 w-7 h-7 rounded-full bg-[#081326] border border-white/20 flex items-center justify-center text-sm shadow-md">
                      {pos.rank === 1 ? '🥇' : pos.rank === 2 ? '🥈' : '🥉'}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest">
                      {pos.rank === 1 ? 'CHAMPION' : pos.rank === 2 ? 'RUNNER UP' : 'SECOND RUNNER UP'}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white leading-tight min-h-[2.5rem] flex items-center justify-center">
                      {pos.club.name}
                    </h3>
                    <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">
                      {pos.club.zone}
                    </p>
                  </div>
                </div>

                {/* Card Stats */}
                <div className="mt-6 pt-4 border-t border-white/5 flex flex-col items-center justify-center space-y-3">
                  <div className="text-center">
                    <div className="text-3xl font-mono font-extrabold text-cyan-300 glow-text-cyan">
                      {pos.club.points.toLocaleString()}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                      Leaderboard Points
                    </div>
                  </div>

                  <div className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-slate-300 font-sans">
                    {pos.club.projectsCount} Impact Projects
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: SEARCH & FILTERS */}
      <div className="glass-panel p-6 mb-8 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search */}
          <div className="md:col-span-6 relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search clubs by name or president..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
            />
          </div>

          {/* Filters */}
          <div className="md:col-span-6 flex flex-wrap gap-4 justify-start md:justify-end text-xs">
            {/* Zone Selector */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Zone Filter</label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="bg-[#081326] text-white border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 cursor-pointer min-w-[120px]"
              >
                <option value="All">All Zones</option>
                {zonesList.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>

            {/* Rank Criteria */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Rank Criterion</label>
              <select
                value={selectedSort}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="bg-[#081326] text-cyan-400 border border-cyan-400/20 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 cursor-pointer font-semibold min-w-[150px]"
              >
                <option value="Points">Points Standings</option>
                <option value="Projects">Total Projects Count</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: CLUB DIRECTORY */}
      <div className="mb-20">
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-xs text-slate-400">
            SHOWING {filteredClubs.length} OF {mockClubs.length} CLUBS
          </span>
        </div>

        {filteredClubs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredClubs.map((club) => {
              const globalRank = sortedClubs.findIndex((c) => c.id === club.id) + 1;
              return (
                <GlassCard
                  key={club.id}
                  onClick={() => setActiveClub(club)}
                  className="flex flex-col justify-between p-6 relative group hover:border-cyan-400/30"
                >
                  <div className="space-y-4">
                    {/* Club header */}
                    <div className="flex justify-between items-start">
                      <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-400/20 flex items-center justify-center text-lg font-bold text-cyan-400">
                        {club.logo}
                      </div>
                      <div className="rounded-lg bg-white/5 border border-white/10 px-2.5 py-1 font-mono text-[10px] text-slate-300">
                        RANK {globalRank}
                      </div>
                    </div>

                    {/* Info */}
                    <div>
                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                        {club.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-slate-400 mt-1 font-mono">
                        <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                        {club.zone}
                      </div>
                    </div>

                    <div className="text-xs text-slate-300 font-light border-t border-white/5 pt-3">
                      <span className="font-semibold text-slate-400">President:</span> {club.president}
                    </div>
                  </div>

                  {/* Core stats footer */}
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-center">
                    <div>
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Projects</div>
                      <div className="text-white text-sm font-semibold font-mono">{club.projectsCount}</div>
                    </div>
                    <div>
                      <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Points</div>
                      <div className="text-cyan-400 text-sm font-bold font-mono">{club.points.toLocaleString()}</div>
                    </div>
                    <span className="text-cyan-400 text-xs font-semibold flex items-center gap-1 hover:translate-x-1 transition-transform cursor-pointer">
                      View Club
                    </span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel border-white/5">
            <h3 className="text-lg font-serif font-bold text-white">No clubs match your query</h3>
            <p className="text-slate-400 text-sm mt-1">Try resetting search string or changing zone selectors.</p>
          </div>
        )}
      </div>

      {/* Club Details Modal (Submerged glass overlay) */}
      {activeClub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl glass-panel bg-[#081326]/95 border border-cyan-400/30 overflow-hidden relative shadow-2xl rounded-2xl p-6 md:p-10 flex flex-col max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setActiveClub(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/50 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-6">
              <div className="flex items-center gap-4">
                <div className="h-16 h-16 w-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-2 border-cyan-400/30 flex items-center justify-center text-2xl font-bold text-cyan-300">
                  {activeClub.logo}
                </div>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">{activeClub.name}</h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400 mt-1 font-mono">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4 text-cyan-400" />
                      {activeClub.zone}
                    </span>
                    <span>•</span>
                    <span>President: <strong className="text-white">{activeClub.president}</strong></span>
                  </div>
                </div>
              </div>

              {/* Points display */}
              <div className="mt-4 md:mt-0 flex gap-4 text-center">
                <div className="glass-panel px-4 py-2 border-cyan-500/20">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Leaderboard Points</div>
                  <div className="text-xl font-bold text-cyan-400 font-mono">{activeClub.points.toLocaleString()}</div>
                </div>
                <div className="glass-panel px-4 py-2">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Total Projects</div>
                  <div className="text-xl font-bold text-white font-mono">{activeClub.projectsCount}</div>
                </div>
              </div>
            </div>

            {/* Modal Content: Projects list */}
            <div className="flex-1 overflow-y-auto pr-2 no-scrollbar">
              <h3 className="font-serif text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="h-5 w-5 text-cyan-400" />
                Submitted Projects ({clubProjects.length})
              </h3>

              {clubProjects.length > 0 ? (
                <div className="space-y-4">
                  {clubProjects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => handleProjectClickInModal(p.id)}
                      className="glass-panel p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-white/5 hover:border-cyan-400/30 cursor-pointer transition-all duration-300"
                    >
                      <div className="flex items-center gap-4">
                        <img src={p.image} alt={p.title} className="h-14 w-14 rounded-lg object-cover" />
                        <div>
                          <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest">
                            {p.avenueOfService}
                          </span>
                          <h4 className="text-white font-serif font-bold text-base hover:text-cyan-300 transition-colors">
                            {p.title}
                          </h4>
                          <span className="font-mono text-xs text-slate-400">Focus: {p.areaOfFocus}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-center text-xs font-mono text-slate-400 w-full md:w-auto justify-between md:justify-end">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-500">Beneficiaries</div>
                          <div className="text-white font-bold">{p.beneficiaries}+</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-500">Hours</div>
                          <div className="text-white font-bold">{p.volunteerHours} hr</div>
                        </div>
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-slate-500">Score</div>
                          <div className="text-cyan-400 font-bold">{p.score}</div>
                        </div>
                        <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                          <Eye className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 glass-panel border-white/5">
                  <p className="text-slate-400 text-sm">No projects recorded on this showcase yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
