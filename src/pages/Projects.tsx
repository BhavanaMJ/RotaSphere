import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mockProjects, mockClubs, mockZones } from '../data/mockData';
import type { Project } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import { Search, Users, Clock, X, Sparkles, Filter } from 'lucide-react';

interface ProjectsProps {
  selectedProjectId: string | null;
  setSelectedProjectId: (id: string | null) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ selectedProjectId, setSelectedProjectId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClub, setSelectedClub] = useState('All');
  const [selectedAvenue, setSelectedAvenue] = useState('All');
  const [selectedFocus, setSelectedFocus] = useState('All');
  const [selectedZone, setSelectedZone] = useState('All');
  const [selectedDateSort, setSelectedDateSort] = useState('Newest');

  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // If a project is pre-selected (e.g. from the home page), set it active
  useEffect(() => {
    if (selectedProjectId) {
      const found = mockProjects.find((p) => p.id === selectedProjectId);
      if (found) {
        setActiveProject(found);
      }
    }
  }, [selectedProjectId]);

  const handleCloseModal = () => {
    setActiveProject(null);
    setSelectedProjectId(null);
  };

  // Get unique lists for filters
  const clubsList = Array.from(new Set(mockProjects.map((p) => p.clubName)));
  const avenuesList = Array.from(new Set(mockProjects.map((p) => p.avenueOfService)));
  const focusList = Array.from(new Set(mockProjects.map((p) => p.areaOfFocus)));
  const zonesList = mockZones.map((z) => z.name);

  // Filter & Sort Logic
  const filteredProjects = mockProjects
    .filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.clubName.toLowerCase().includes(searchQuery.toLowerCase());

      const club = mockClubs.find((c) => c.name === project.clubName);
      const matchesClub = selectedClub === 'All' || project.clubName === selectedClub;
      const matchesAvenue = selectedAvenue === 'All' || project.avenueOfService === selectedAvenue;
      const matchesFocus = selectedFocus === 'All' || project.areaOfFocus === selectedFocus;
      const matchesZone = selectedZone === 'All' || (club && club.zone === selectedZone);

      return matchesSearch && matchesClub && matchesAvenue && matchesFocus && matchesZone;
    })
    .sort((a, b) => {
      // Sorting based on selection
      if (selectedDateSort === 'Highest Score') {
        if (b.score !== a.score) return b.score - a.score;
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime(); // Early upload first
      } else if (selectedDateSort === 'Newest') {
        return new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime();
      } else {
        return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      }
    });

  // Top Ranked row (from all projects)
  const topRankedProjects = [...mockProjects]
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
    })
    .slice(0, 3);

  return (
    <div className="relative z-10 w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">DISCOVERY CENTRE</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-1">
          Projects Across District 3192
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
          Search, filter, and analyze the individual waves of impact created by our member clubs.
        </p>
      </div>

      {/* Featured Projects Row (Top Ranks) */}
      {searchQuery === '' &&
        selectedClub === 'All' &&
        selectedAvenue === 'All' &&
        selectedFocus === 'All' &&
        selectedZone === 'All' && (
          <div className="mb-16">
            <h2 className="font-serif text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-cyan-400 animate-pulse" />
              Top Ranked Reefs (Highest Impact)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {topRankedProjects.map((project, idx) => (
                <GlassCard
                  key={project.id}
                  onClick={() => setActiveProject(project)}
                  className="border-t-2 border-t-cyan-400 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-48 w-full rounded-xl overflow-hidden mb-4">
                      <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                      <div className="absolute top-2 left-2 rounded-lg bg-black/60 px-2 py-1 text-[10px] font-mono text-cyan-400 font-bold border border-white/10">
                        RANK {idx + 1}
                      </div>
                      <div className="absolute top-2 right-2 rounded-lg bg-cyan-500 text-white font-mono text-xs font-bold px-2 py-1">
                        Score: {project.score}
                      </div>
                    </div>
                    <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
                      {project.avenueOfService}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-white mt-1 line-clamp-1">{project.title}</h3>
                    <p className="text-slate-400 text-xs font-mono mt-1 font-semibold">{project.clubName}</p>
                    <p className="text-slate-300 text-sm font-light mt-3 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center text-xs text-slate-400">
                    <span className="font-mono">Date: {project.uploadDate}</span>
                    <span className="text-cyan-400 font-bold">Inspect Reef →</span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        )}

      {/* Search & Filters Panel */}
      <div className="glass-panel p-6 mb-8 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search bar */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
            />
          </div>

          {/* Filter Indicators */}
          <div className="md:col-span-8 flex flex-wrap gap-3 justify-start md:justify-end text-xs">
            {/* Club Filter */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Club</label>
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="bg-[#081326] text-white border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-xs cursor-pointer min-w-[120px]"
              >
                <option value="All">All Clubs</option>
                {clubsList.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Avenue Filter */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Avenue</label>
              <select
                value={selectedAvenue}
                onChange={(e) => setSelectedAvenue(e.target.value)}
                className="bg-[#081326] text-white border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-xs cursor-pointer min-w-[120px]"
              >
                <option value="All">All Avenues</option>
                {avenuesList.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            {/* Focus Filter */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Focus</label>
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="bg-[#081326] text-white border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-xs cursor-pointer min-w-[120px]"
              >
                <option value="All">All Focuses</option>
                {focusList.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Zone Filter */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Zone</label>
              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="bg-[#081326] text-white border border-white/10 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-xs cursor-pointer min-w-[100px]"
              >
                <option value="All">All Zones</option>
                {zonesList.map((z) => (
                  <option key={z} value={z}>
                    {z}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex flex-col">
              <label className="font-mono text-slate-400 mb-1 ml-1">Sort By</label>
              <select
                value={selectedDateSort}
                onChange={(e) => setSelectedDateSort(e.target.value)}
                className="bg-[#081326] text-cyan-400 border border-cyan-400/20 rounded-xl px-3 py-2.5 outline-none focus:border-cyan-400 text-xs cursor-pointer font-semibold min-w-[120px]"
              >
                <option value="Highest Score">Highest Score (Ranked)</option>
                <option value="Newest">Newest Upload</option>
                <option value="Oldest">Oldest Upload</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Results */}
      <div className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <span className="font-mono text-xs text-slate-400">
            SHOWING {filteredProjects.length} OF {mockProjects.length} RIPPLES
          </span>
          {filteredProjects.length === 0 && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedClub('All');
                setSelectedAvenue('All');
                setSelectedFocus('All');
                setSelectedZone('All');
              }}
              className="text-cyan-400 hover:underline text-xs font-semibold"
            >
              Clear Filters
            </button>
          )}
        </div>

        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <GlassCard
                key={project.id}
                onClick={() => setActiveProject(project)}
                className="flex flex-col justify-between min-h-[440px]"
              >
                <div>
                  <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4">
                    <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
                    <div className="absolute top-2 right-2 rounded-lg bg-black/60 border border-white/10 text-cyan-400 font-mono text-xs font-bold px-2 py-1">
                      Score: {project.score}
                    </div>
                  </div>
                  <span className="font-mono text-[9px] text-cyan-400 font-bold uppercase tracking-widest block">
                    {project.avenueOfService}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-white mt-1 hover:text-cyan-300 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-xs font-mono mt-1 font-semibold">{project.clubName}</p>
                  <p className="text-slate-300 text-sm font-light mt-3 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="border-t border-white/5 pt-4 mt-6 space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Beneficiaries</span>
                    <span className="text-white font-semibold">{project.beneficiaries}+</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Volunteers Hours</span>
                    <span className="text-white font-semibold">{project.volunteerHours} hrs</span>
                  </div>
                  <div className="pt-2 flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Date: {project.uploadDate}</span>
                    <span className="text-cyan-400 font-semibold cursor-pointer">Explore Reef →</span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 glass-panel border-white/5">
            <Filter className="h-12 w-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-serif font-bold text-white">No ripples match your current filters</h3>
            <p className="text-slate-400 text-sm mt-1">Try resetting search queries or changing avenue selectors.</p>
          </div>
        )}
      </div>

      {/* Project Details Modal (Submerged Glass Portal) */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl glass-panel bg-[#081326]/95 border border-cyan-400/30 overflow-hidden relative shadow-2xl rounded-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none"
          >
            {/* Close Button */}
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 z-20 p-2 rounded-xl bg-black/50 border border-white/10 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Left Cover Photo */}
            <div className="w-full md:w-1/2 relative h-48 md:h-auto">
              <img src={activeProject.image} alt={activeProject.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-transparent to-[#081326]/90 pointer-events-none" />
              <div className="absolute bottom-4 left-4 rounded-xl bg-black/70 px-4 py-2 border border-white/10">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Impact Score</div>
                <div className="text-xl font-bold text-cyan-400 font-mono">{activeProject.score} / 100</div>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-none">
              <div>
                <span className="font-mono text-xs text-cyan-400 font-bold uppercase tracking-widest">
                  {activeProject.avenueOfService}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1 leading-snug">
                  {activeProject.title}
                </h2>
                <div className="flex justify-between items-center border-b border-white/5 pb-4 mt-2">
                  <span className="font-sans text-xs text-slate-400">By {activeProject.clubName}</span>
                  <span className="font-mono text-xs text-slate-400">Uploaded {activeProject.uploadDate}</span>
                </div>

                <div className="mt-6 space-y-4">
                  <div>
                    <h4 className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                      Reef Focus Area
                    </h4>
                    <p className="text-white text-sm font-semibold mt-1">{activeProject.areaOfFocus}</p>
                  </div>
                  <div>
                    <h4 className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold">
                      Project Description
                    </h4>
                    <p className="text-slate-300 text-sm font-light mt-1.5 leading-relaxed">
                      {activeProject.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Stats & Actions */}
              <div className="mt-8 border-t border-white/5 pt-6 grid grid-cols-2 gap-4">
                <div className="glass-panel p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Beneficiaries</div>
                    <div className="text-white font-mono font-bold text-sm">{activeProject.beneficiaries}+</div>
                  </div>
                </div>
                <div className="glass-panel p-4 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">Volunteer Hours</div>
                    <div className="text-white font-mono font-bold text-sm">{activeProject.volunteerHours} hrs</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Projects;
