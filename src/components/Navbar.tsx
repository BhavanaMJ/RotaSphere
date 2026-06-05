import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Waves, Lock } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isBioluminescent: boolean;
  setIsBioluminescent: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isBioluminescent,
  setIsBioluminescent,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'clubs', label: 'Clubs' },
    { id: 'district', label: 'District' },
    { id: 'leaderboard', label: 'Leaderboard' },
  ];

  const handleNavClick = (tabId: string) => {
    setCurrentTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-abyss-deep/40 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-18 items-center justify-between">
          {/* Logo with ocean symbol */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Waves className="h-6 w-6 animate-pulse" />
              <div className="absolute -inset-1 rounded-xl bg-cyan-400/25 blur opacity-30 animate-pulse-slow" />
            </div>
            <div>
              <span className="font-serif text-lg font-bold tracking-wide text-white block">
                ROTARACT
              </span>
              <span className="font-mono text-xs text-cyan-400 tracking-widest block -mt-1 font-semibold">
                DISTRICT 3192
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative py-2 font-sans text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'text-white font-semibold nav-active-glow'
                      : 'text-slate-300 hover:text-cyan-400 hover:glow-text-cyan'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 h-0.5 w-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Section: Theme Toggle + Login Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsBioluminescent(!isBioluminescent)}
              className="p-2 text-slate-300 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-colors"
              title="Toggle Oceanic Light"
            >
              {isBioluminescent ? (
                <Sun className="h-5 w-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            <button
              onClick={() => handleNavClick('login')}
              className={`ripple-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 hover:-translate-y-0.5 border border-cyan-400/30 ${
                currentTab === 'login' ? 'ring-2 ring-cyan-400' : ''
              }`}
            >
              <Lock className="h-4 w-4" />
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setIsBioluminescent(!isBioluminescent)}
              className="p-2 text-slate-300 hover:text-cyan-400 rounded-lg transition-colors"
            >
              {isBioluminescent ? <Sun className="h-5 w-5 text-cyan-400" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 bg-abyss-deep/95 backdrop-blur-xl absolute top-full left-0 w-full p-6 space-y-4 shadow-2xl animate-fade-in">
          <div className="flex flex-col gap-3">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left py-3 px-4 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 border-l-4 border-cyan-400 text-white font-semibold'
                      : 'text-slate-300 hover:bg-white/5 hover:text-cyan-400'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="border-t border-white/10 pt-4">
            <button
              onClick={() => handleNavClick('login')}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg"
            >
              <Lock className="h-4 w-4" />
              Login Portal
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
