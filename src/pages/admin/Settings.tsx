import React, { useState } from 'react';
import GlassCard from '../../components/GlassCard';
import { Settings as SettingsIcon, Bell, Shield } from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'account' | 'notifications' | 'privacy'>('account');

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left">
      {/* Header */}
      <div>
        <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">CONFIGURATION</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">Operational Settings</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="md:col-span-1 space-y-1.5">
          <button
            onClick={() => setActiveTab('account')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              activeTab === 'account' 
                ? 'bg-cyan-500/15 border-cyan-500/25 text-cyan-300 font-bold' 
                : 'bg-white/5 border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <SettingsIcon className="h-4 w-4" />
            Account Setup
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              activeTab === 'notifications' 
                ? 'bg-cyan-500/15 border-cyan-500/25 text-cyan-300 font-bold' 
                : 'bg-white/5 border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </button>
          <button
            onClick={() => setActiveTab('privacy')}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
              activeTab === 'privacy' 
                ? 'bg-cyan-500/15 border-cyan-500/25 text-cyan-300 font-bold' 
                : 'bg-white/5 border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="h-4 w-4" />
            Security & Keys
          </button>
        </div>

        {/* Content Box */}
        <div className="md:col-span-3">
          {activeTab === 'account' && (
            <GlassCard className="p-6 border border-white/5 space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Account Information</h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Portal Alias</label>
                  <input type="text" placeholder="Ananya Sharma" className="w-full px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Registered email</label>
                  <input type="email" placeholder="president@east.org" className="w-full px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                </div>
              </div>
              <button onClick={() => alert('Account configuration saved!')} className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs cursor-pointer">
                Save Details
              </button>
            </GlassCard>
          )}

          {activeTab === 'notifications' && (
            <GlassCard className="p-6 border border-white/5 space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Officer Alerts</h3>
              <div className="space-y-3 text-xs font-sans text-slate-300">
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                  <span>Notify upon District publication validation</span>
                  <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                  <span>Weekly digest report summaries</span>
                  <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer" />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 cursor-pointer">
                  <span>Browser notifications for priority messages</span>
                  <input type="checkbox" className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer" />
                </label>
              </div>
            </GlassCard>
          )}

          {activeTab === 'privacy' && (
            <GlassCard className="p-6 border border-white/5 space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Security Keys & Encryption</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Current Password</label>
                  <input type="password" placeholder="••••••••••••" className="w-full px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">New Password</label>
                  <input type="password" placeholder="••••••••••••" className="w-full px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                </div>
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Verify New Password</label>
                  <input type="password" placeholder="••••••••••••" className="w-full px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-white text-xs" />
                </div>
              </div>
              <button onClick={() => alert('Password successfully updated.')} className="px-4 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/20 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs cursor-pointer">
                Update Password
              </button>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
