import React, { useState } from 'react';
import { mockClubs, mockProjects } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import { Award, Compass, Clock, Heart, Sparkles } from 'lucide-react';

export const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'clubs' | 'projects' | 'hours' | 'beneficiaries' | 'scores'>('clubs');

  // Top Clubs: sorted by points desc
  const rankedClubs = [...mockClubs].sort((a, b) => b.points - a.points);
  const maxPoints = Math.max(...mockClubs.map((c) => c.points));

  // Top Projects: sorted by score desc, then uploadDate
  const rankedProjects = [...mockProjects].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
  });
  const maxScore = 100; // score out of 100

  // Most Volunteer Hours: sorted by hours desc
  const rankedHours = [...mockProjects].sort((a, b) => b.volunteerHours - a.volunteerHours);
  const maxHours = Math.max(...mockProjects.map((p) => p.volunteerHours));

  // Most Beneficiaries: sorted by beneficiaries desc
  const rankedBeneficiaries = [...mockProjects].sort((a, b) => b.beneficiaries - a.beneficiaries);
  const maxBeneficiaries = Math.max(...mockProjects.map((p) => p.beneficiaries));

  // Helper for rank badges
  const renderRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-mono text-xs text-slate-400 font-bold">#{rank}</span>;
  };

  return (
    <div className="relative z-10 w-full min-h-screen px-4 py-12 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center md:text-left mb-12">
        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">CURRENT STANDINGS</span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white mt-1">
          District Leaderboards
        </h1>
        <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-2xl">
          Real-time metrics charting our ripples of impact. Discover top clubs, high-scoring projects, and volunteering leaders.
        </p>
      </div>

      {/* Tabs Selector Bar */}
      <div className="flex overflow-x-auto gap-2 p-1.5 glass-panel bg-white/5 border-white/10 rounded-2xl mb-8 no-scrollbar">
        <button
          onClick={() => setActiveTab('clubs')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'clubs'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Award className="h-4 w-4" />
          Top Performing Clubs
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'projects'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Compass className="h-4 w-4" />
          Top Projects
        </button>

        <button
          onClick={() => setActiveTab('hours')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'hours'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Clock className="h-4 w-4" />
          Most Volunteer Hours
        </button>

        <button
          onClick={() => setActiveTab('beneficiaries')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'beneficiaries'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Heart className="h-4 w-4" />
          Most Beneficiaries
        </button>

        <button
          onClick={() => setActiveTab('scores')}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-sans text-xs sm:text-sm font-semibold tracking-wider transition-all whitespace-nowrap ${
            activeTab === 'scores'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
              : 'text-slate-300 hover:bg-white/5 hover:text-white'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          Highest Impact Score
        </button>
      </div>

      {/* Leaderboard Table Container */}
      <GlassCard className="p-6 md:p-10 border border-white/10 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 shadow-md" />

        {/* Tab 1: Top Clubs */}
        {activeTab === 'clubs' && (
          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <span>Club Name</span>
              <span className="text-right">Leaderboard Points</span>
            </div>

            <div className="space-y-4">
              {rankedClubs.map((club, idx) => {
                const rank = idx + 1;
                const percentage = (club.points / maxPoints) * 100;
                return (
                  <div key={club.id} className="glass-panel p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-white/5 hover:border-cyan-400/20 transition-all duration-300">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 flex items-center justify-center shrink-0">
                        {renderRankBadge(rank)}
                      </div>
                      <div className="h-10 w-10 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-sm font-bold text-cyan-400 shrink-0">
                        {club.logo}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg truncate">{club.name}</h3>
                        <p className="text-slate-400 text-xs font-mono">{club.zone} • {club.projectsCount} Projects</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center w-full sm:w-48 gap-1.5">
                      <div className="text-lg font-mono font-extrabold text-cyan-300 text-left sm:text-right">
                        {club.points.toLocaleString()} pts
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Top Projects */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <span>Project Title</span>
              <span className="text-right">Impact Score</span>
            </div>

            <div className="space-y-4">
              {rankedProjects.map((proj, idx) => {
                const rank = idx + 1;
                const percentage = (proj.score / maxScore) * 100;
                return (
                  <div key={proj.id} className="glass-panel p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-white/5 hover:border-cyan-400/20 transition-all duration-300">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 flex items-center justify-center shrink-0">
                        {renderRankBadge(rank)}
                      </div>
                      <img src={proj.image} alt={proj.title} className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg truncate">{proj.title}</h3>
                        <p className="text-slate-400 text-xs font-mono">{proj.clubName} • {proj.avenueOfService}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center w-full sm:w-48 gap-1.5">
                      <div className="text-lg font-mono font-extrabold text-cyan-300 text-left sm:text-right">
                        {proj.score} / 100
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Most Volunteer Hours */}
        {activeTab === 'hours' && (
          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <span>Project & Club</span>
              <span className="text-right">Volunteer Hours</span>
            </div>

            <div className="space-y-4">
              {rankedHours.map((proj, idx) => {
                const rank = idx + 1;
                const percentage = (proj.volunteerHours / maxHours) * 100;
                return (
                  <div key={proj.id} className="glass-panel p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-white/5 hover:border-cyan-400/20 transition-all duration-300">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 flex items-center justify-center shrink-0">
                        {renderRankBadge(rank)}
                      </div>
                      <img src={proj.image} alt={proj.title} className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg truncate">{proj.title}</h3>
                        <p className="text-slate-400 text-xs font-mono">{proj.clubName} • {proj.areaOfFocus}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center w-full sm:w-48 gap-1.5">
                      <div className="text-lg font-mono font-extrabold text-cyan-300 text-left sm:text-right">
                        {proj.volunteerHours.toLocaleString()} hrs
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Most Beneficiaries */}
        {activeTab === 'beneficiaries' && (
          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <span>Project & Club</span>
              <span className="text-right">Lives Impacted</span>
            </div>

            <div className="space-y-4">
              {rankedBeneficiaries.map((proj, idx) => {
                const rank = idx + 1;
                const percentage = (proj.beneficiaries / maxBeneficiaries) * 100;
                return (
                  <div key={proj.id} className="glass-panel p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-white/5 hover:border-cyan-400/20 transition-all duration-300">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 flex items-center justify-center shrink-0">
                        {renderRankBadge(rank)}
                      </div>
                      <img src={proj.image} alt={proj.title} className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg truncate">{proj.title}</h3>
                        <p className="text-slate-400 text-xs font-mono">{proj.clubName} • {proj.areaOfFocus}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center w-full sm:w-48 gap-1.5">
                      <div className="text-lg font-mono font-extrabold text-cyan-300 text-left sm:text-right">
                        {proj.beneficiaries.toLocaleString()}+ lives
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 5: Highest Impact Score */}
        {activeTab === 'scores' && (
          <div className="space-y-6">
            <div className="flex justify-between border-b border-white/5 pb-4 text-xs font-mono text-slate-400 uppercase tracking-widest">
              <span>Project & Club</span>
              <span className="text-right">Impact Score</span>
            </div>

            <div className="space-y-4">
              {rankedProjects.map((proj, idx) => {
                const rank = idx + 1;
                const percentage = (proj.score / maxScore) * 100;
                return (
                  <div key={proj.id} className="glass-panel p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border border-white/5 hover:border-cyan-400/20 transition-all duration-300">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-10 flex items-center justify-center shrink-0">
                        {renderRankBadge(rank)}
                      </div>
                      <img src={proj.image} alt={proj.title} className="h-10 w-10 rounded-lg object-cover border border-white/10 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-serif font-bold text-base sm:text-lg truncate">{proj.title}</h3>
                        <p className="text-slate-400 text-xs font-mono">{proj.clubName} • Uploaded {proj.uploadDate}</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:items-end justify-center w-full sm:w-48 gap-1.5">
                      <div className="text-lg font-mono font-extrabold text-cyan-300 text-left sm:text-right">
                        {proj.score} pts
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                        <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Leaderboard;
