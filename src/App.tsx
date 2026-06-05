import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import AtmosphericBackground from './components/AtmosphericBackground';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Clubs from './pages/Clubs';
import District from './pages/District';
import Leaderboard from './pages/Leaderboard';
import Login from './pages/Login';
import AdminLayout from './layouts/AdminLayout';
import { Waves, Heart, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [displayTab, setDisplayTab] = useState<string>('home');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [waveState, setWaveState] = useState<'idle' | 'up' | 'down'>('idle');
  const [isBioluminescent, setIsBioluminescent] = useState<boolean>(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease-out-expo
      touchMultiplier: 2,
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Handle cinematic liquid wave page transition
  useEffect(() => {
    if (currentTab === displayTab) return;

    setIsTransitioning(true);
    setWaveState('up');

    // Swap content midway through the sweep (450ms)
    const swapTimeout = setTimeout(() => {
      setDisplayTab(currentTab);
      setWaveState('down');
    }, 450);

    // Complete the sweep cycle (900ms)
    const resetTimeout = setTimeout(() => {
      setIsTransitioning(false);
      setWaveState('idle');
    }, 900);

    return () => {
      clearTimeout(swapTimeout);
      clearTimeout(resetTimeout);
    };
  }, [currentTab, displayTab]);

  // Page switcher mapping
  const renderActivePage = () => {
    switch (displayTab) {
      case 'home':
        return <Home setCurrentTab={setCurrentTab} setSelectedProjectId={setSelectedProjectId} />;
      case 'projects':
        return <Projects selectedProjectId={selectedProjectId} setSelectedProjectId={setSelectedProjectId} />;
      case 'clubs':
        return <Clubs setCurrentTab={setCurrentTab} setSelectedProjectId={setSelectedProjectId} />;
      case 'district':
        return <District />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'login':
        return <Login setCurrentTab={setCurrentTab} />;
      case 'dashboard':
        return (
          <AdminLayout 
            setCurrentTab={setCurrentTab} 
            isBioluminescent={isBioluminescent} 
            setIsBioluminescent={setIsBioluminescent}
          />
        );
      default:
        return <Home setCurrentTab={setCurrentTab} setSelectedProjectId={setSelectedProjectId} />;
    }
  };

  const isDashboard = displayTab === 'dashboard';

  return (
    <div className={`relative min-h-screen text-slate-100 transition-colors duration-500 overflow-x-hidden ${
      isBioluminescent ? 'bg-[#031c30]' : 'bg-[#020617]'
    }`}>
      {/* 4-Layer Atmospheric Background */}
      <AtmosphericBackground />

      {/* Global Navbar */}
      {!isDashboard && (
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          isBioluminescent={isBioluminescent}
          setIsBioluminescent={setIsBioluminescent}
        />
      )}

      {/* Main Container */}
      <main className={isDashboard ? "relative z-10 w-full min-h-screen" : "relative z-10 w-full min-h-[80vh]"}>
        {renderActivePage()}
      </main>

      {/* Global Footer */}
      {!isDashboard && (
        <footer className="relative z-10 border-t border-white/5 bg-abyss-deep/80 backdrop-blur-md pt-16 pb-8 text-slate-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            
            {/* Column 1: Brand details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white">
                  <Waves className="h-5 w-5" />
                </div>
                <span className="font-serif text-base font-bold text-white tracking-wider">
                  ROTARACT 3192
                </span>
              </div>
              <p className="text-sm font-light leading-relaxed">
                An immersive digital ecosystem showcasing the collective community impact, metrics, and leaderboards of Rotaract District 3192.
              </p>
              <div className="text-xs font-mono text-cyan-400">
                EVERY DROP CREATES A RIPPLE.
              </div>
            </div>

            {/* Column 2: Navigation Shortcuts */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-white uppercase tracking-widest font-semibold">
                Explore Currents
              </h4>
              <ul className="space-y-2 text-xs font-sans">
                {['home', 'projects', 'clubs', 'district', 'leaderboard'].map((tab) => (
                  <li key={tab}>
                    <button
                      onClick={() => {
                        setCurrentTab(tab);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-cyan-400 capitalize transition-colors"
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Channels */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-white uppercase tracking-widest font-semibold">
                Contact Channels
              </h4>
              <ul className="space-y-2.5 text-xs font-sans">
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-cyan-400" />
                  <span>secretariat@rotaract3192.org</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-cyan-400" />
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <span>District Secretariat, Bengaluru, IN</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Resources */}
            <div className="space-y-3">
              <h4 className="text-sm font-mono text-white uppercase tracking-widest font-semibold">
                External Resources
              </h4>
              <ul className="space-y-2 text-xs font-sans">
                <li>
                  <a href="https://www.rotary.org" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                    Rotary International
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <a href="https://www.rotaract.org" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                    Rotaract Worldwide
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </li>
                <li>
                  <button onClick={() => setCurrentTab('login')} className="hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                    Administrator Login
                    <ExternalLink className="h-3.5 w-3.5" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-white/5 pt-8 text-center text-xs flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="font-light">
              &copy; {new Date().getFullYear()} Rotaract District 3192. Powered by the Ocean of Impact reporting current.
            </p>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
              <span>for Rotaract District 3192</span>
            </div>
          </div>
        </div>
      </footer>
      )}

      {/* Cinematic Wave Transition Screen Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-end">
          {/* Sweeping wave background panel */}
          <div
            className={`w-full bg-gradient-to-t from-cyan-900 via-blue-950 to-transparent transition-transform duration-900 ease-in-out ${
              waveState === 'up' ? 'translate-y-0 h-[100vh]' : 'translate-y-[-100vh] h-[100vh]'
            }`}
            style={{
              clipPath: 'ellipse(100% 60% at 50% 100%)',
              transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
            }}
          />
          {/* Secondary backup screen fill */}
          <div
            className={`w-full bg-blue-950/20 backdrop-blur-sm absolute inset-0 transition-opacity duration-300 ${
              waveState === 'up' ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default App;
