import React from 'react';
import { useAdminStore } from '../../store/adminStore';
import GlassCard from '../../components/GlassCard';
import { Mail, Phone, Shield, Award, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user } = useAdminStore();

  const mockStats = [
    { label: 'Avenue reports submitted', value: '14' },
    { label: 'Completed DOV Audits', value: '1' },
    { label: 'Officer Attendance Rate', value: '96%' },
    { label: 'District Citation Rank', value: 'Gold Level' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">ADMIN PROFILE</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">Officer Credentials</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Details Card */}
        <GlassCard className="p-6 border border-white/5 md:col-span-1 flex flex-col items-center text-center space-y-4">
          <div className="h-24 w-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-cyan-400 flex items-center justify-center font-bold text-white text-3xl shadow-xl shadow-cyan-500/10">
            {user?.name.slice(4, 6) || 'RT'}
          </div>
          <div className="space-y-1">
            <h2 className="font-serif text-xl font-bold text-white">{user?.name}</h2>
            <span className="px-2.5 py-0.5 bg-cyan-500/15 border border-cyan-500/25 rounded-full text-[10px] font-mono font-bold text-cyan-300">
              {user?.role}
            </span>
          </div>
          
          <div className="w-full border-t border-white/5 pt-4 text-left space-y-2.5 text-xs text-slate-300 font-sans">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-400" />
              <span>{user?.club}</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>{user?.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-cyan-400" />
              <span>{user?.phone || '+91 98765 43210'}</span>
            </div>
          </div>
        </GlassCard>

        {/* Stats and Achievements Grid */}
        <div className="md:col-span-2 space-y-6">
          <GlassCard className="p-6 border border-white/5 space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
              <Award className="h-5 w-5 text-cyan-400" />
              Active Reporting Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {mockStats.map((stat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="font-mono text-[9px] text-slate-400 uppercase tracking-wider block">{stat.label}</span>
                  <span className="text-lg font-bold text-white font-mono">{stat.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard className="p-6 border border-white/5 space-y-4">
            <h3 className="font-serif text-base font-bold text-white flex items-center gap-1.5">
              <Calendar className="h-5 w-5 text-cyan-400" />
              Recent Activities Audited
            </h3>
            <div className="space-y-2 text-xs font-sans text-slate-300">
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white">Water Oasis filtration drive</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Approved & Published to District Portal</p>
                </div>
                <span className="font-mono text-[10px] text-slate-400">May 11, 2026</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-white">Rotaract 101: Navigating the Currents</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Minutes logged for Assembly session</p>
                </div>
                <span className="font-mono text-[10px] text-slate-400">May 02, 2026</span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
