import React from 'react';
import { 
  AreaChart, Area, 
  BarChart, Bar, 
  PieChart, Pie, Cell, 
  LineChart, Line, 
  XAxis, YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useAdminStore } from '../../store/adminStore';
import GlassCard from '../../components/GlassCard';
import { Activity, Users, Clock, Heart, Landmark, PiggyBank, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { activities } = useAdminStore();

  // 1. Reactive KPI Computations
  const totalActivities = 45 + activities.length;
  const totalVolunteers = 1450 + activities.reduce((acc, act) => acc + act.volunteersCount, 0);
  const totalHours = 4800 + activities.reduce((acc, act) => acc + act.volunteerHours, 0);
  const totalBeneficiaries = 9800 + activities.reduce((acc, act) => acc + act.beneficiariesCount, 0);
  const totalContributions = 740000 + activities.reduce((acc, act) => acc + (act.cashContributionInr + act.inKindContributionInr), 0);
  const totalExpenses = 420000 + activities.reduce((acc, act) => acc + act.expensesInr, 0);

  const kpis = [
    { label: 'Total Projects', value: totalActivities, icon: Activity, change: '+12.4%', up: true, desc: 'vs last reporting cycle', color: 'text-cyan-400' },
    { label: 'Total Volunteers', value: totalVolunteers, icon: Users, change: '+8.2%', up: true, desc: 'active volunteers', color: 'text-blue-400' },
    { label: 'Volunteer Hours', value: totalHours, icon: Clock, change: '+15.1%', up: true, desc: 'cumulative hours logged', color: 'text-emerald-400' },
    { label: 'Total Beneficiaries', value: totalBeneficiaries, icon: Heart, change: '+20.3%', up: true, desc: 'lives impacted', color: 'text-rose-400' },
    { label: 'Contributions (INR)', value: `₹${totalContributions.toLocaleString()}`, icon: PiggyBank, change: '-2.4%', up: false, desc: 'grants & contributions', color: 'text-amber-400' },
    { label: 'Expenses (INR)', value: `₹${totalExpenses.toLocaleString()}`, icon: Landmark, change: '+4.7%', up: true, desc: 'project disbursements', color: 'text-indigo-400' },
  ];

  // 2. Chart Data Processing
  // Monthly Trends (Jan - Jun)
  const monthlyData = [
    { month: 'Jan', activities: 8, volunteers: 180, hours: 580, contributions: 80000, expenses: 50000 },
    { month: 'Feb', activities: 12, volunteers: 240, hours: 820, contributions: 120000, expenses: 85000 },
    { month: 'Mar', activities: 15, volunteers: 320, hours: 1100, contributions: 140000, expenses: 100000 },
    { month: 'Apr', activities: 18, volunteers: 390, hours: 1400, contributions: 210000, expenses: 120000 },
    { month: 'May', activities: 20 + activities.length, volunteers: 410 + activities.reduce((a,c) => a + c.volunteersCount, 0), hours: 1500 + activities.reduce((a,c) => a + c.volunteerHours, 0), contributions: 190000 + activities.reduce((a,c) => a + (c.cashContributionInr + c.inKindContributionInr), 0), expenses: 110000 + activities.reduce((a,c) => a + c.expensesInr, 0) },
  ];

  // Avenue of Service Distributions
  const avenueDistribution = [
    { name: 'Club Service', count: 12 },
    { name: 'Community Service', count: 18 + activities.filter(a => a.avenueOfService.includes('Community Service')).length },
    { name: 'Professional Dev', count: 14 + activities.filter(a => a.avenueOfService.includes('Professional Development Service')).length },
    { name: 'International Service', count: 8 },
    { name: 'Public Image', count: 9 },
    { name: 'Next Gen', count: 7 },
  ];

  // Area of Focus Distributions
  const focusDistribution = [
    { name: 'Peace & Conflict', count: 4 },
    { name: 'Disease Prevention', count: 9 },
    { name: 'Water & Hygiene', count: 12 + activities.filter(a => a.areaOfFocus.includes('Water, Sanitation and Hygiene')).length },
    { name: 'Maternal & Child Health', count: 7 },
    { name: 'Basic Education', count: 14 + activities.filter(a => a.areaOfFocus.includes('Basic Education and Literacy')).length },
    { name: 'Economic Dev', count: 8 },
    { name: 'Supporting Environment', count: 11 },
  ];

  // Standalone vs Collaborative Activity
  const collaborativeCount = 18 + activities.filter(a => a.activityType === 'Collaborative Activity').length;
  const standaloneCount = 27 + activities.filter(a => a.activityType === 'Standalone Activity').length;
  const typeData = [
    { name: 'Standalone', value: standaloneCount },
    { name: 'Collaborative', value: collaborativeCount }
  ];

  const COLORS = ['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#6366f1', '#8b5cf6'];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">MISSION CONTROL</span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-white mt-1">Operational Analytics</h1>
          <p className="text-slate-400 text-xs sm:text-sm font-light mt-1">
            Visualizing club performance, impact currents, and reporting metrics across District 3192.
          </p>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <GlassCard key={idx} className="p-6 relative group overflow-hidden border border-white/5 hover:border-cyan-400/25 transition-all">
              {/* Ripple water effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              
              <div className="flex justify-between items-start z-10 relative">
                <div className="space-y-3">
                  <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block font-medium">
                    {kpi.label}
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white">
                    {kpi.value}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs">
                    {kpi.up ? (
                      <span className="flex items-center text-emerald-400 font-mono font-bold">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        {kpi.change}
                      </span>
                    ) : (
                      <span className="flex items-center text-rose-400 font-mono font-bold">
                        <ArrowDownRight className="h-3.5 w-3.5" />
                        {kpi.change}
                      </span>
                    )}
                    <span className="text-slate-500">{kpi.desc}</span>
                  </div>
                </div>
                <div className={`h-11 w-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center ${kpi.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Chart 1: Club Activity Trend */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Monthly Activity Trend</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 1</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorActivities" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} />
                <YAxis stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} labelClassName="text-slate-400 text-xs font-mono" />
                <Area type="monotone" dataKey="activities" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorActivities)" name="Projects Reported" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 2: Activities by Avenue of Service */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Activities By Avenue Of Service</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 2</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={avenueDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={9} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} interval={0} tickFormatter={(v) => v.slice(0, 10)} />
                <YAxis stroke="#94a3b8" fontSize={10} tick={{ fill: '#94a3b8', fontFamily: 'monospace' }} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Avenue Metrics">
                  {avenueDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 3: Activities by Area of Focus */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Activities By Area Of Focus</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 3</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={focusDistribution} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis type="number" stroke="#94a3b8" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={9} width={100} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 4, 4, 0]} name="Projects Count">
                  {focusDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 4: Activities by Type */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Activities Classification</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 4</span>
          </div>
          <div className="h-72 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={typeData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {typeData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Legend verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 5: Volunteer Count Trend */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Volunteer Count Trend</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 5</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="volunteers" stroke="#f59e0b" strokeWidth={2.5} activeDot={{ r: 6 }} name="Volunteers Engaged" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 6: Volunteer Hours Trend */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Volunteer Hours Trend</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 6</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="hours" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorHours)" name="Hours Logged" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 7: Contribution Trend */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Contribution Trend (INR)</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 7</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Line type="monotone" dataKey="contributions" stroke="#8b5cf6" strokeWidth={2.5} name="Total Raised" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Chart 8: Activity Expense Trend */}
        <GlassCard className="p-6 border border-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-serif text-base font-bold text-white">Disbursement Trend (INR)</h3>
            <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-wider">Chart 8</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} />
                <YAxis stroke="#94a3b8" fontSize={10} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: '#081326', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="expenses" stroke="#ec4899" strokeWidth={2} fillOpacity={1} fill="url(#colorExpenses)" name="Funds Utilized" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

      </div>
    </div>
  );
};
export default AdminDashboard;
