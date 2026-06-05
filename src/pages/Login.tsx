import React, { useState, useEffect } from 'react';
import { Lock, Mail, ArrowLeft, Waves, Sparkles, CheckCircle2, User, Phone, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useAdminStore } from '../store/adminStore';
import { mockClubs } from '../data/mockData';

interface LoginProps {
  setCurrentTab: (tab: string) => void;
}

export const Login: React.FC<LoginProps> = ({ setCurrentTab }) => {
  const { authState, setAuthState, login, submitAccessRequest } = useAdminStore();
  
  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Request access form state
  const [fullName, setFullName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedClub, setSelectedClub] = useState(mockClubs[0]?.name || '');
  const [selectedRole, setSelectedRole] = useState<'President' | 'Vice President' | 'Secretary'>('President');

  // Handle auto-redirection once approved
  useEffect(() => {
    if (authState === 'logged_in') {
      setCurrentTab('dashboard');
    }
  }, [authState, setCurrentTab]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all security credentials.');
      return;
    }

    setIsLoading(true);
    
    // Simulate slight lag for cinematic dashboard verification
    setTimeout(async () => {
      const success = await login(email);
      setIsLoading(false);
      if (success) {
        setCurrentTab('dashboard');
      } else {
        setError('Invalid credentials key.');
      }
    }, 1200);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !requestEmail || !phone) {
      alert('Please fill in all fields to submit your request.');
      return;
    }

    submitAccessRequest({
      name: fullName,
      club: selectedClub,
      role: selectedRole,
      email: requestEmail,
      phone
    });
  };

  return (
    <div className="relative z-10 w-full min-h-[85vh] flex items-center justify-center px-4 py-12">
      <GlassCard className="w-full max-w-md p-8 sm:p-10 border border-white/15 relative overflow-hidden bg-abyss-medium/80 backdrop-blur-3xl shadow-2xl">
        {/* Glow accent */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-md" />

        {/* SCREEN 1: LOGIN */}
        {authState === 'logged_out' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mx-auto text-white shadow-lg shadow-cyan-500/20">
                <Waves className="h-7 w-7" />
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-wide mt-3">
                Mission Control
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                Reporting portal gate for District 3192 administrators.
              </p>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="president@east.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Password Key
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    className="w-full pl-10 pr-4 py-3 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="ripple-btn w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-sm border border-cyan-400/20"
              >
                {isLoading ? (
                  <>
                    <Waves className="h-4 w-4 animate-spin" />
                    Connecting to Grid...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Access Dashboard
                  </>
                )}
              </button>
            </form>

            <div className="border-t border-white/5 pt-4 flex flex-col gap-2.5 text-center text-xs font-mono">
              <button
                onClick={() => setAuthState('request_access')}
                className="text-cyan-400 hover:text-cyan-300 transition-colors py-1 hover:underline"
              >
                Request Access Credentials
              </button>
              <button
                onClick={() => setCurrentTab('home')}
                className="flex items-center justify-center gap-1 text-slate-400 hover:text-white transition-colors py-2 border border-white/5 bg-white/5 rounded-xl"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back to Public Showcase
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: REQUEST ACCESS */}
        {authState === 'request_access' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-2xl font-bold text-white tracking-wide">
                Credentials Request
              </h2>
              <p className="text-slate-400 text-xs font-light">
                Submit details to get reporting access.
              </p>
            </div>

            <form onSubmit={handleRequestSubmit} className="space-y-4 text-left">
              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Rtr. Jane Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Club Association
                </label>
                <select
                  value={selectedClub}
                  onChange={(e) => setSelectedClub(e.target.value)}
                  className="w-full px-4 py-2.5 bg-abyss-deep border border-white/10 rounded-xl text-white outline-none focus:border-cyan-400 cursor-pointer font-sans text-sm"
                >
                  {mockClubs.map((club) => (
                    <option key={club.id} value={club.name}>
                      {club.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Officer Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['President', 'Vice President', 'Secretary'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={`py-2 rounded-xl text-xs font-mono border transition-all ${
                        selectedRole === role
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                          : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10'
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Official Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="jane.doe@rotaract.org"
                    value={requestEmail}
                    onChange={(e) => setRequestEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-mono text-xs text-slate-400 uppercase tracking-widest block ml-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXX XXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all border border-cyan-400/20 text-sm"
              >
                Submit Access Request
              </button>
            </form>

            <button
              onClick={() => setAuthState('logged_out')}
              className="flex items-center justify-center gap-1 text-slate-400 hover:text-white transition-colors py-2 w-full text-xs font-mono border border-white/5 bg-white/5 rounded-xl"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Login Gate
            </button>
          </div>
        )}

        {/* SCREEN 3: ACCESS PENDING */}
        {authState === 'pending' && (
          <div className="text-center py-8 space-y-6">
            <div className="h-16 w-16 rounded-full bg-yellow-500/10 border-2 border-yellow-400 text-yellow-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(234,179,8,0.2)] animate-pulse">
              <Shield className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-white">Verification Pending</h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Your credentials request has been securely dispatched to the District 3192 Administration team.
              </p>
            </div>
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-slate-400">Request status:</span>
                <span className="text-yellow-400 font-bold">Pending Approval</span>
              </div>
              <div className="text-[10px] text-slate-400 text-center pt-2 italic">
                Tip: If you are testing, you can open the Admin panel by logging in with "admin@rotaract3192.org" and approve this request.
              </div>
            </div>

            <button
              onClick={() => setAuthState('logged_out')}
              className="w-full flex items-center justify-center gap-1 text-slate-400 hover:text-white transition-colors py-2 text-xs font-mono border border-white/5 bg-white/5 rounded-xl"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Logout / Exit Gate
            </button>
          </div>
        )}

        {/* SCREEN 4: ACCESS APPROVED */}
        {authState === 'approved' && (
          <div className="text-center py-8 space-y-6 animate-fade-in">
            <div className="h-16 w-16 rounded-full bg-emerald-500/10 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(52,211,153,0.3)]">
              <CheckCircle2 className="h-10 w-10 animate-bounce" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-white">Access Approved</h2>
              <p className="text-slate-300 text-sm font-light leading-relaxed">
                Welcome to the district operations core. Your reporting clearance is active.
              </p>
            </div>

            <button
              onClick={() => {
                setAuthState('logged_in');
                setCurrentTab('dashboard');
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 py-3 font-semibold text-white shadow-lg hover:from-emerald-400 hover:to-cyan-400 transition-all border border-emerald-400/20 text-sm"
            >
              <Sparkles className="h-4 w-4" />
              Enter Dashboard
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default Login;
