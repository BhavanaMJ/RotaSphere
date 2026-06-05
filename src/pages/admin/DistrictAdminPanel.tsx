import React, { useState } from 'react';
import { useAdminStore } from '../../store/adminStore';
import { mockClubs } from '../../data/mockData';
import GlassCard from '../../components/GlassCard';
import { 
  Check, X, Shield, Star, 
  Award, Globe, FileCheck
} from 'lucide-react';

export const DistrictAdminPanel: React.FC = () => {
  const { 
    accessRequests, 
    approveRequest, 
    rejectRequest, 
    activities, 
    updateActivityStatus, 
    toggleActivityFeatured 
  } = useAdminStore();

  const [activeTab, setActiveTab] = useState<'requests' | 'publications' | 'rankings'>('requests');
  const [rankSort, setRankSort] = useState<'Points' | 'Projects' | 'Hours'>('Points');

  // Filter requests
  const pendingRequests = accessRequests.filter(req => req.status === 'Pending');
  const approvedRequests = accessRequests.filter(req => req.status === 'Approved');

  // Club rankings logic based on active primary key
  const sortedRankings = [...mockClubs].sort((a, b) => {
    if (rankSort === 'Points') return b.points - a.points;
    if (rankSort === 'Projects') return b.projectsCount - a.projectsCount;
    return (b.points * 1.5) - (a.points * 1.5); // Simulated hours ranking
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <span className="font-mono text-purple-400 text-xs font-bold tracking-widest uppercase">ADMIN PANEL</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">District Administration Core</h1>
        <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
          Approve reporting access, manage portal publications, and configure active leaderboard logic.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 gap-2">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
            activeTab === 'requests' 
              ? 'border-purple-500 text-purple-300 font-bold' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Access Requests ({pendingRequests.length})
        </button>
        <button
          onClick={() => setActiveTab('publications')}
          className={`px-4 py-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
            activeTab === 'publications' 
              ? 'border-purple-500 text-purple-300 font-bold' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Publications & Featured ({activities.length})
        </button>
        <button
          onClick={() => setActiveTab('rankings')}
          className={`px-4 py-2 text-xs font-mono border-b-2 transition-all cursor-pointer ${
            activeTab === 'rankings' 
              ? 'border-purple-500 text-purple-300 font-bold' 
              : 'border-transparent text-slate-400 hover:text-white'
          }`}
        >
          Rankings Governance
        </button>
      </div>

      {/* ACCESS REQUESTS TAB */}
      {activeTab === 'requests' && (
        <div className="grid grid-cols-1 gap-6">
          <GlassCard className="p-6 border border-white/5 space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
              <Shield className="h-5 w-5 text-purple-400" />
              Pending Officer Approvals
            </h3>
            <div className="overflow-x-auto rounded-xl border border-white/5">
              <table className="w-full text-left border-collapse text-xs md:text-sm">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                    <th className="p-4">Name</th>
                    <th className="p-4">Club Association</th>
                    <th className="p-4">Requested Role</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Phone</th>
                    <th className="p-4">Request Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {pendingRequests.length > 0 ? (
                    pendingRequests.map((req) => (
                      <tr key={req.id} className="hover:bg-white/5 transition-all">
                        <td className="p-4 font-bold text-white">{req.name}</td>
                        <td className="p-4 text-slate-300">{req.club}</td>
                        <td className="p-4 text-cyan-300">{req.role}</td>
                        <td className="p-4 text-slate-400 font-mono">{req.email}</td>
                        <td className="p-4 text-slate-400 font-mono">{req.phone}</td>
                        <td className="p-4 text-slate-400 font-mono">{req.dateRequested}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() => approveRequest(req.id)}
                              className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/20 cursor-pointer"
                              title="Approve Credentials"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => rejectRequest(req.id)}
                              className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/25 text-rose-400 hover:bg-rose-500/20 cursor-pointer"
                              title="Reject Request"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400 italic">No pending access requests.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>

          {/* Approved history log */}
          <GlassCard className="p-6 border border-white/5 space-y-4">
            <h3 className="font-serif text-sm font-bold text-slate-300">Approval Logs</h3>
            <div className="overflow-x-auto rounded-xl border border-white/5 opacity-70">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[9px]">
                    <th className="p-3">Name</th>
                    <th className="p-3">Club</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {approvedRequests.map((req) => (
                    <tr key={req.id}>
                      <td className="p-3 font-semibold text-white">{req.name}</td>
                      <td className="p-3 text-slate-300">{req.club}</td>
                      <td className="p-3 text-slate-400">{req.role}</td>
                      <td className="p-3 text-emerald-400 font-bold">{req.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      )}

      {/* PUBLICATIONS & FEATURED TAB */}
      {activeTab === 'publications' && (
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
            <Globe className="h-5 w-5 text-purple-400" />
            Showcase Publication Feed
          </h3>
          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="p-4">Activity Title</th>
                  <th className="p-4">Reporting Club</th>
                  <th className="p-4">Date Reported</th>
                  <th className="p-4">Featured</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Publication Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activities.map((act) => (
                  <tr key={act.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4 font-bold text-white">{act.title}</td>
                    <td className="p-4 text-slate-300">{act.clubName}</td>
                    <td className="p-4 text-slate-400 font-mono">{act.dateReported}</td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleActivityFeatured(act.id)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          act.featured 
                            ? 'bg-amber-500/10 border-amber-400/30 text-amber-400' 
                            : 'bg-white/5 border-white/10 text-slate-500 hover:text-white'
                        }`}
                      >
                        <Star className="h-4 w-4 fill-current" />
                      </button>
                    </td>
                    <td className="p-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                        act.status === 'Published' 
                          ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-400'
                          : 'bg-yellow-500/10 border-yellow-400/30 text-yellow-400'
                      }`}>
                        {act.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        {act.status !== 'Published' ? (
                          <button
                            onClick={() => updateActivityStatus(act.id, 'Published')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25 hover:bg-emerald-500/25 text-emerald-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <FileCheck className="h-3.5 w-3.5" />
                            Publish
                          </button>
                        ) : (
                          <button
                            onClick={() => updateActivityStatus(act.id, 'Pending Publication')}
                            className="px-3 py-1.5 rounded-lg bg-yellow-500/15 border border-yellow-500/25 hover:bg-yellow-500/25 text-yellow-300 text-xs font-mono flex items-center gap-1 cursor-pointer"
                          >
                            <X className="h-3.5 w-3.5" />
                            Retract
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* RANKINGS GOVERNANCE TAB */}
      {activeTab === 'rankings' && (
        <GlassCard className="p-6 border border-white/5 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
                <Award className="h-5 w-5 text-purple-400" />
                District Rankings Matrix
              </h3>
              <p className="text-xs text-slate-400 font-light mt-0.5">Toggle primary points sort metrics for showcase standings.</p>
            </div>
            
            <div className="flex gap-2">
              {(['Points', 'Projects', 'Hours'] as const).map((criteria) => (
                <button
                  key={criteria}
                  onClick={() => setRankSort(criteria)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all cursor-pointer ${
                    rankSort === criteria 
                      ? 'bg-purple-500/20 border-purple-400 text-purple-300 font-bold' 
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  {criteria} Logic
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="p-4">Rank</th>
                  <th className="p-4">Club Name</th>
                  <th className="p-4">Zone</th>
                  <th className="p-4">Officer Core</th>
                  <th className="p-4">Total Points</th>
                  <th className="p-4">Projects Count</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {sortedRankings.map((club, index) => (
                  <tr key={club.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4 font-mono font-bold text-cyan-300">#{index + 1}</td>
                    <td className="p-4 font-bold text-white">{club.name}</td>
                    <td className="p-4 text-slate-400 font-mono">{club.zone}</td>
                    <td className="p-4 text-slate-300">{club.president}</td>
                    <td className="p-4 text-cyan-400 font-mono font-bold">{club.points.toLocaleString()}</td>
                    <td className="p-4 text-slate-300 font-mono">{club.projectsCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}
    </div>
  );
};

export default DistrictAdminPanel;
