import React from 'react';
import { 
  LayoutDashboard, 
  Activity, 
  BookOpen, 
  Award, 
  Users, 
  MapPin, 
  User, 
  Settings, 
  ExternalLink, 
  LogOut, 
  Waves,
  ShieldCheck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAdminStore } from '../../store/adminStore';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen, setCurrentTab }) => {
  const { currentView, setCurrentView, logout, user } = useAdminStore();
  const isAdmin = user?.role === 'District Admin';

  const menuItems = [
    { view: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { view: 'club-activities' as const, label: 'Club Activities', icon: Activity },
    { view: 'orientations' as const, label: 'Orientations', icon: BookOpen },
    { view: 'installations' as const, label: 'Installations', icon: Award },
    { view: 'meetings' as const, label: 'Meetings', icon: Users },
    { view: 'dov' as const, label: 'DOV', icon: MapPin },
  ];

  const personalItems = [
    { view: 'profile' as const, label: 'Profile', icon: User },
    { view: 'settings' as const, label: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    setCurrentTab('home');
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-screen z-40 bg-[#040e21]/90 backdrop-blur-2xl border-r border-white/10 transition-all duration-300 flex flex-col justify-between ${
        sidebarOpen ? 'w-64' : 'w-20'
      }`}
    >
      <div>
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white flex-shrink-0">
              <Waves className="h-5 w-5 animate-pulse" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="font-serif text-sm font-bold text-white tracking-wider">
                  DISTRICT 3192
                </span>
                <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-widest leading-none">
                  Operations core
                </span>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 text-slate-400 hover:text-white"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        {/* User Info Capsule */}
        {sidebarOpen && user && (
          <div className="p-4 mx-3 my-4 rounded-xl bg-white/5 border border-white/5 text-left space-y-1">
            <p className="text-xs font-mono text-cyan-400 font-bold leading-none truncate">{user.role}</p>
            <p className="text-sm font-bold text-white leading-tight truncate">{user.name}</p>
            <p className="text-[10px] text-slate-400 truncate leading-none">{user.club}</p>
          </div>
        )}

        {/* Navigation Section */}
        <nav className="px-3 mt-4 space-y-1.5 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-all group relative ${
                  isActive 
                    ? 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 font-semibold' 
                    : 'text-slate-400 hover:bg-white/5 border border-transparent hover:text-white'
                }`}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 transition-colors ${isActive ? 'text-cyan-400' : 'group-hover:text-cyan-400'}`} />
                {sidebarOpen && <span>{item.label}</span>}
                {!sidebarOpen && (
                  <span className="absolute left-16 bg-abyss-deep border border-white/10 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}

          {/* District Admin Panel Specific Section */}
          {isAdmin && (
            <div className="pt-4 border-t border-white/5">
              <button
                onClick={() => setCurrentView('district-admin')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-all group relative ${
                  currentView === 'district-admin' 
                    ? 'bg-purple-500/15 border border-purple-500/25 text-purple-300 font-semibold' 
                    : 'text-slate-400 hover:bg-white/5 border border-transparent hover:text-white'
                }`}
              >
                <ShieldCheck className={`h-5 w-5 flex-shrink-0 transition-colors ${currentView === 'district-admin' ? 'text-purple-400' : 'group-hover:text-purple-400'}`} />
                {sidebarOpen && <span>District Admin</span>}
                {!sidebarOpen && (
                  <span className="absolute left-16 bg-abyss-deep border border-white/10 text-white text-xs py-1.5 px-3 rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 shadow-xl">
                    District Admin
                  </span>
                )}
              </button>
            </div>
          )}
        </nav>
      </div>

      {/* Footer Section */}
      <div className="p-3 border-t border-white/5 space-y-1">
        {/* Personal Items */}
        {personalItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => setCurrentView(item.view)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans transition-all group relative ${
                isActive 
                  ? 'bg-cyan-500/15 border border-cyan-500/25 text-cyan-300 font-semibold' 
                  : 'text-slate-400 hover:bg-white/5 border border-transparent hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          );
        })}

        {/* Back to Showcase */}
        <button
          onClick={() => setCurrentTab('home')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans text-slate-400 hover:bg-white/5 border border-transparent hover:text-white transition-all group relative"
        >
          <ExternalLink className="h-5 w-5 flex-shrink-0 text-slate-500 group-hover:text-cyan-400 transition-colors" />
          {sidebarOpen && <span>Exit to Showcase</span>}
        </button>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-sans text-rose-400/80 hover:bg-rose-500/10 border border-transparent hover:text-rose-300 transition-all group relative"
        >
          <LogOut className="h-5 w-5 flex-shrink-0 text-rose-500/80" />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};
export default Sidebar;
