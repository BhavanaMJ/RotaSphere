import React, { useState } from 'react';
import Sidebar from '../components/admin/Sidebar';
import AdminNavbar from '../components/admin/AdminNavbar';
import { useAdminStore } from '../store/adminStore';

// Dynamic imports of administrative modules (we will create these next)
import AdminDashboard from '../pages/admin/AdminDashboard';
import ClubActivities from '../pages/admin/modules/ClubActivities';
import Orientations from '../pages/admin/modules/Orientations';
import Installations from '../pages/admin/modules/Installations';
import Meetings from '../pages/admin/modules/Meetings';
import DOV from '../pages/admin/modules/DOV';
import DistrictAdminPanel from '../pages/admin/DistrictAdminPanel';
import Profile from '../pages/admin/Profile';
import Settings from '../pages/admin/Settings';

interface AdminLayoutProps {
  setCurrentTab: (tab: string) => void;
  isBioluminescent: boolean;
  setIsBioluminescent: (val: boolean) => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  setCurrentTab,
  isBioluminescent,
  setIsBioluminescent
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { currentView } = useAdminStore();

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'club-activities':
        return <ClubActivities />;
      case 'orientations':
        return <Orientations />;
      case 'installations':
        return <Installations />;
      case 'meetings':
        return <Meetings />;
      case 'dov':
        return <DOV />;
      case 'district-admin':
        return <DistrictAdminPanel />;
      case 'profile':
        return <Profile />;
      case 'settings':
        return <Settings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden flex">
      {/* Sidebar navigation */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        setSidebarOpen={setSidebarOpen} 
        setCurrentTab={setCurrentTab} 
      />

      {/* Main viewport */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ${
          sidebarOpen ? 'pl-64' : 'pl-20'
        }`}
      >
        {/* Navbar */}
        <AdminNavbar 
          sidebarOpen={sidebarOpen} 
          isBioluminescent={isBioluminescent} 
          setIsBioluminescent={setIsBioluminescent}
          setCurrentTab={setCurrentTab}
        />

        {/* Content area */}
        <main className="flex-1 mt-16 p-6 md:p-8 relative z-10 w-full max-w-7xl mx-auto animate-fade-in pb-20">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
