import React, { useState } from 'react';
import { Bell, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

interface AdminNavbarProps {
  sidebarOpen: boolean;
  isBioluminescent: boolean;
  setIsBioluminescent: (val: boolean) => void;
  setCurrentTab: (tab: string) => void;
}

export const AdminNavbar: React.FC<AdminNavbarProps> = ({ 
  sidebarOpen, 
  isBioluminescent, 
  setIsBioluminescent,
  setCurrentTab
}) => {
  const { user, logout, setCurrentView, accessRequests } = useAdminStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Filter pending requests for admin notification badge
  const pendingRequestsCount = user?.role === 'District Admin'
    ? accessRequests.filter(r => r.status === 'Pending').length
    : 0;

  const mockNotifications = [
    ...(pendingRequestsCount > 0 ? [{
      id: 'notif-1',
      title: 'Pending Officer Registrations',
      desc: `${pendingRequestsCount} new officer approval requests require your review.`,
      time: 'Just now',
      unread: true,
      action: 'district-admin'
    }] : []),
    {
      id: 'notif-2',
      title: 'Activity Approved',
      desc: 'Project "Water Oasis" has been approved and published to the District Portal.',
      time: '2 hours ago',
      unread: true,
      action: 'club-activities'
    },
    {
      id: 'notif-3',
      title: 'Reporting Cycle Open',
      desc: 'Monthly report templates are live. Please report orientations and DOVs.',
      time: '1 day ago',
      unread: false,
      action: 'dashboard'
    }
  ];

  const handleLogout = () => {
    logout();
    setCurrentTab('home');
  };

  const handleNotifClick = (action: string) => {
    setCurrentView(action as any);
    setShowNotifications(false);
  };

  return (
    <header 
      className={`fixed top-0 right-0 h-16 z-35 bg-[#020617]/40 backdrop-blur-md border-b border-white/5 transition-all duration-300 flex items-center justify-between px-6 ${
        sidebarOpen ? 'left-64' : 'left-20'
      }`}
    >
      {/* Title / Info Capsule */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm sm:text-base font-serif font-bold text-white tracking-wide">
          {user?.club ? `${user.club} Core` : 'Rotaract District Operations'}
        </h2>
      </div>

      {/* Action Utilities */}
      <div className="flex items-center gap-4 relative">
        {/* Bioluminescent / Ocean Caustics Toggle */}
        <button
          onClick={() => setIsBioluminescent(!isBioluminescent)}
          className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all cursor-pointer"
          title="Toggle Deep Ocean / Shallow Bioluminescence"
        >
          {isBioluminescent ? (
            <Sun className="h-4.5 w-4.5 text-cyan-400 animate-spin-slow" />
          ) : (
            <Moon className="h-4.5 w-4.5 text-blue-400" />
          )}
        </button>

        {/* Notifications Center */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`p-2 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-all cursor-pointer relative ${
              showNotifications ? 'border-cyan-500/25 text-white' : ''
            }`}
          >
            <Bell className="h-4.5 w-4.5" />
            {mockNotifications.some(n => n.unread) && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl bg-[#061226]/95 border border-white/10 shadow-2xl p-4 space-y-3 animate-fade-in z-50">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="font-serif text-sm font-bold text-white">District Notifications</span>
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Operational</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1 no-scrollbar">
                {mockNotifications.map((notif) => (
                  <div 
                    key={notif.id}
                    onClick={() => handleNotifClick(notif.action)}
                    className={`p-2.5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/5 hover:border-cyan-500/25 transition-all space-y-1 ${
                      notif.unread ? 'bg-cyan-500/5' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white font-sans truncate pr-2">{notif.title}</h4>
                      <span className="text-[8px] font-mono text-slate-400 whitespace-nowrap">{notif.time}</span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-light leading-normal line-clamp-2">{notif.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className={`flex items-center gap-2.5 p-1.5 pr-3 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white cursor-pointer hover:border-cyan-500/25 transition-all ${
              showProfileMenu ? 'border-cyan-500/25 text-white' : ''
            }`}
          >
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 border border-cyan-400/25 flex items-center justify-center font-bold text-white text-xs">
              {user?.name.slice(4, 6) || 'RT'}
            </div>
            <div className="hidden sm:block text-left leading-none">
              <p className="text-xs font-bold text-white leading-none">{user?.name.replace('Rtr. ', '')}</p>
              <p className="text-[8px] text-slate-400 font-mono mt-0.5 leading-none">{user?.role}</p>
            </div>
          </button>

          {/* Profile Context Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-48 rounded-2xl bg-[#061226]/95 border border-white/10 shadow-2xl p-2.5 space-y-1 animate-fade-in z-50">
              <button
                onClick={() => {
                  setCurrentView('profile');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-all text-left"
              >
                <User className="h-4 w-4 text-cyan-400" />
                Officer Profile
              </button>
              <button
                onClick={() => {
                  setCurrentView('settings');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-slate-300 hover:bg-white/5 hover:text-white transition-all text-left"
              >
                <Settings className="h-4 w-4 text-cyan-400" />
                Settings & Privacy
              </button>
              <div className="border-t border-white/5 my-1.5" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 transition-all text-left font-semibold"
              >
                <LogOut className="h-4 w-4 text-rose-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
export default AdminNavbar;
