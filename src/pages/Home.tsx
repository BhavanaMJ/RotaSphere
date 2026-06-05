import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { mockProjects, districtStats } from '../data/mockData';
import GlassCard from '../components/GlassCard';
import MetricCounter from '../components/MetricCounter';
import {
  Sparkles,
  Users,
  Clock,
  Compass,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Heart,
  Globe,
  Award,
  Camera,
  Share2,
  Waves
} from 'lucide-react';

interface HomeProps {
  setCurrentTab: (tab: string) => void;
  setSelectedProjectId: (id: string | null) => void;
}

export const Home: React.FC<HomeProps> = ({ setCurrentTab, setSelectedProjectId }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  // Sorting featured projects: Priority 1 - Highest Score. Priority 2 - Earliest upload date.
  const sortedProjects = [...mockProjects].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
  });

  const scrollCarousel = (direction: 'left' | 'right') => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollAmount = 350;
      carousel.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleProjectClick = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentTab('projects');
  };

  // Avenues of Service helper mapping
  const avenueData = [
    { name: 'Club Service', icon: Users, color: 'from-cyan-400 to-blue-500', count: 18, desc: 'Fostering fellowship, strong relationship grids, and active internal communication within clubs.' },
    { name: 'Community Service', icon: Heart, color: 'from-teal-400 to-emerald-500', count: 35, desc: 'Addressing critical local issues, ecological restoration, sanitation, and child welfare drives.' },
    { name: 'Professional Development', icon: Award, color: 'from-purple-400 to-pink-500', count: 24, desc: 'Nurturing executive leadership skills, career incubation mentorship, and entrepreneurship bootcamps.' },
    { name: 'International Service', icon: Globe, color: 'from-blue-400 to-indigo-500', count: 12, desc: 'Cultivating international peace, cross-border exchanges, and worldwide sister-club partnerships.' },
    { name: 'Public Relations', icon: Share2, color: 'from-pink-400 to-rose-500', count: 15, desc: 'Connecting clubs with external media networks to build collaborative ecosystems.' },
    { name: 'Public Image', icon: Camera, color: 'from-amber-400 to-orange-500', count: 21, desc: 'Broadcasting the digital story of Rotaract, establishing visual brand frameworks.' },
    { name: 'Next Gen', icon: Sparkles, color: 'from-cyan-400 to-teal-500', count: 16, desc: 'Empowering young leaders with tech accelerators and progressive civic design thinking.' }
  ];

  return (
    <div className="relative z-10 w-full min-h-screen">
      {/* SECTION 1: HERO */}
      <section className="relative flex min-h-[92vh] flex-col justify-center items-center px-4 py-12 md:py-24 overflow-hidden border-b border-white/5">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero Headline Copy */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left z-10">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-none"
            >
              OCEAN OF <br />
              <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">IMPACT</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed"
            >
              Discover the projects, initiatives, and community impact created across Rotaract District 3192. Every club is a drop, every volunteer a current.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => setCurrentTab('projects')}
                className="ripple-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/10 hover:from-cyan-400 hover:to-blue-500 hover:-translate-y-0.5 transition-all duration-300 border border-cyan-400/20"
              >
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => setCurrentTab('clubs')}
                className="ripple-btn flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 font-semibold text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                View Club Rankings
              </button>
            </motion.div>
          </div>

          {/* Centerpiece: Interactive Ocean Network */}
          <div className="lg:col-span-6 flex justify-center items-center relative min-h-[400px]">
            {/* Background current ripple animations */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border border-cyan-500/20 rounded-full animate-ping opacity-20" />
              <div className="w-96 h-96 border border-blue-500/10 rounded-full animate-ping opacity-10" />
            </div>

            {/* Glowing SVG currents connecting nodes */}
            <svg className="absolute w-full h-full pointer-events-none inset-0 overflow-visible" viewBox="0 0 500 500">
              <defs>
                <linearGradient id="current-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
                </linearGradient>
              </defs>

              {/* Connecting current paths from center to external nodes */}
              <line x1="250" y1="250" x2="110" y2="130" stroke="url(#current-grad-1)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
              <line x1="250" y1="250" x2="390" y2="130" stroke="url(#current-grad-1)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
              <line x1="250" y1="250" x2="80" y2="300" stroke="url(#current-grad-1)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
              <line x1="250" y1="250" x2="420" y2="300" stroke="url(#current-grad-1)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
              <line x1="250" y1="250" x2="250" y2="410" stroke="url(#current-grad-1)" strokeWidth="2" strokeDasharray="5,5" className="animate-[dash_10s_linear_infinite]" />
            </svg>

            {/* Center Node: District Logo representation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-[#081326] to-[#020617] border-2 border-cyan-400 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(34,211,238,0.25)]"
            >
              <div className="absolute inset-0.5 rounded-full bg-gradient-to-tr from-cyan-500/20 to-blue-500/0 animate-spin-slow" />
              <Waves className="h-8 w-8 text-cyan-400 animate-pulse" />
              <span className="font-serif text-xs font-bold text-white mt-1">D3192</span>
              <span className="font-mono text-[9px] text-cyan-300 font-bold uppercase tracking-wider">Center</span>
            </motion.div>

            {/* Sub-node 1: Projects */}
            <motion.div
              initial={{ opacity: 0, x: -140, y: -120 }}
              animate={{ opacity: 1, x: -140, y: -120 }}
              transition={{ delay: 0.2 }}
              className="absolute w-28 p-3 rounded-xl glass-panel text-center hover:scale-105 transition-transform"
            >
              <Compass className="h-5 w-5 mx-auto text-cyan-400 mb-1" />
              <div className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">Projects</div>
              <div className="text-white text-sm font-semibold font-sans">450+ Active</div>
            </motion.div>

            {/* Sub-node 2: Volunteers */}
            <motion.div
              initial={{ opacity: 0, x: 140, y: -120 }}
              animate={{ opacity: 1, x: 140, y: -120 }}
              transition={{ delay: 0.3 }}
              className="absolute w-28 p-3 rounded-xl glass-panel text-center hover:scale-105 transition-transform"
            >
              <Users className="h-5 w-5 mx-auto text-cyan-400 mb-1" />
              <div className="text-[10px] font-mono text-cyan-400 font-bold tracking-widest uppercase">Volunteers</div>
              <div className="text-white text-sm font-semibold font-sans">2,500+ Deep</div>
            </motion.div>

            {/* Sub-node 3: Beneficiaries */}
            <motion.div
              initial={{ opacity: 0, x: -170, y: 50 }}
              animate={{ opacity: 1, x: -170, y: 50 }}
              transition={{ delay: 0.4 }}
              className="absolute w-28 p-3 rounded-xl glass-panel text-center hover:scale-105 transition-transform"
            >
              <Heart className="h-5 w-5 mx-auto text-teal-400 mb-1" />
              <div className="text-[10px] font-mono text-teal-400 font-bold tracking-widest uppercase">Impacted</div>
              <div className="text-white text-sm font-semibold font-sans">12,000+ Lives</div>
            </motion.div>

            {/* Sub-node 4: Volunteer Hours */}
            <motion.div
              initial={{ opacity: 0, x: 170, y: 50 }}
              animate={{ opacity: 1, x: 170, y: 50 }}
              transition={{ delay: 0.5 }}
              className="absolute w-28 p-3 rounded-xl glass-panel text-center hover:scale-105 transition-transform"
            >
              <Clock className="h-5 w-5 mx-auto text-blue-400 mb-1" />
              <div className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase">Hours</div>
              <div className="text-white text-sm font-semibold font-sans">50,000+ Hrs</div>
            </motion.div>

            {/* Sub-node 5: Clubs */}
            <motion.div
              initial={{ opacity: 0, x: 0, y: 160 }}
              animate={{ opacity: 1, x: 0, y: 160 }}
              transition={{ delay: 0.6 }}
              className="absolute w-28 p-3 rounded-xl glass-panel text-center hover:scale-105 transition-transform"
            >
              <Award className="h-5 w-5 mx-auto text-purple-400 mb-1" />
              <div className="text-[10px] font-mono text-purple-400 font-bold tracking-widest uppercase">Clubs</div>
              <div className="text-white text-sm font-semibold font-sans">120+ drops</div>
            </motion.div>
          </div>
        </div>

        {/* Live Metrics strip at bottom */}
        <div className="w-full max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div>
              <MetricCounter value={450} suffix="+" />
              <div className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Projects Launched</div>
            </div>
            <div>
              <MetricCounter value={12000} suffix="+" />
              <div className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Beneficiaries Served</div>
            </div>
            <div>
              <MetricCounter value={2500} suffix="+" />
              <div className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Active Volunteers</div>
            </div>
            <div>
              <MetricCounter value={50000} suffix="+" />
              <div className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Hours of Service</div>
            </div>
            <div className="col-span-2 md:col-span-1">
              <MetricCounter value={120} suffix="+" />
              <div className="text-slate-400 text-xs font-mono uppercase tracking-widest mt-1">Registered Clubs</div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: FEATURED PROJECTS (Featured Impact Reefs) */}
      <section className="py-20 border-b border-white/5 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">CURATED REEFS</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
                Featured Impact Reefs
              </h2>
              <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-lg">
                The highest-impact projects across District 3192, ranked dynamically by impact scope and upload timeline.
              </p>
            </div>
            <div className="flex gap-3 mt-6 md:mt-0">
              <button
                onClick={() => scrollCarousel('left')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="p-3 rounded-xl border border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Infinite-feel Horizontal Carousel */}
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar scroll-smooth"
            style={{ scrollbarWidth: 'none' }}
          >
            {sortedProjects.map((project, idx) => {
              const rank = idx + 1;
              return (
                <div key={project.id} className="snap-start shrink-0 w-[340px] md:w-[370px]">
                  <GlassCard
                    onClick={() => handleProjectClick(project.id)}
                    className="h-full flex flex-col justify-between"
                  >
                    <div>
                      {/* Image Overlay */}
                      <div className="relative h-44 w-full rounded-xl overflow-hidden mb-4">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute top-2 left-2 rounded-lg bg-black/60 backdrop-blur-md px-2 py-1 border border-white/10 font-mono text-[10px] text-cyan-400 font-bold">
                          REEF #{rank}
                        </div>
                        <div className="absolute top-2 right-2 rounded-lg bg-cyan-500/90 text-white font-mono text-xs font-bold px-2 py-1 shadow-md shadow-cyan-500/20">
                          Score: {project.score}
                        </div>
                      </div>

                      {/* Card meta info */}
                      <span className="font-mono text-[10px] text-cyan-400 font-semibold uppercase tracking-wider">
                        {project.avenueOfService}
                      </span>
                      <h3 className="font-serif text-lg font-bold text-white mt-1 hover:text-cyan-300 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs font-mono mt-1 font-medium">{project.clubName}</p>

                      <p className="text-slate-300 text-sm font-light mt-3 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Stats strip */}
                    <div className="border-t border-white/5 pt-4 mt-5 flex justify-between items-center text-center">
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Impacted</div>
                        <div className="text-white text-sm font-semibold font-mono">{project.beneficiaries}+</div>
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Volunteers</div>
                        <div className="text-white text-sm font-semibold font-mono">{project.volunteerHours} hr</div>
                      </div>
                      <span className="text-cyan-400 flex items-center gap-1 text-xs font-semibold hover:translate-x-1 transition-transform cursor-pointer">
                        View Project
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: OCEAN METRICS */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">CUMULATIVE STREAMS</span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 mb-16">
            Ecosystem Metrics
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard className="p-8 text-center border-t-2 border-t-cyan-500">
              <Compass className="h-10 w-10 text-cyan-400 mx-auto mb-4" />
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Total Projects</h3>
              <div className="mt-2">
                <MetricCounter value={districtStats.projects} suffix="+" />
              </div>
              <p className="text-slate-300 text-sm font-light mt-3">
                Completed impact drives, education programs, and environmental cleanups across 5 zones.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center border-t-2 border-t-blue-500">
              <Users className="h-10 w-10 text-blue-400 mx-auto mb-4" />
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Total Volunteers</h3>
              <div className="mt-2">
                <MetricCounter value={districtStats.volunteers} suffix="+" />
              </div>
              <p className="text-slate-300 text-sm font-light mt-3">
                Dedicated active Rotaractors pouring their energy and expertise into municipal welfare.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center border-t-2 border-t-teal-500">
              <Heart className="h-10 w-10 text-teal-400 mx-auto mb-4" />
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Lives Impacted</h3>
              <div className="mt-2">
                <MetricCounter value={districtStats.beneficiaries} suffix="+" />
              </div>
              <p className="text-slate-300 text-sm font-light mt-3">
                Beneficiaries receiving clean water, medical aid, professional training, and digital classrooms.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center border-t-2 border-t-purple-500">
              <Clock className="h-10 w-10 text-purple-400 mx-auto mb-4" />
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Volunteer Hours</h3>
              <div className="mt-2">
                <MetricCounter value={districtStats.volunteerHours} suffix="+" />
              </div>
              <p className="text-slate-300 text-sm font-light mt-3">
                Hours of sweat equity logged on field drives, design sprints, and teaching campaigns.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center border-t-2 border-t-pink-500">
              <TrendingUp className="h-10 w-10 text-pink-400 mx-auto mb-4" />
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Active Clubs</h3>
              <div className="mt-2">
                <MetricCounter value={districtStats.clubsCount} suffix="+" />
              </div>
              <p className="text-slate-300 text-sm font-light mt-3">
                Unique drops forming our ocean, executing standalone and joint initiatives in District 3192.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center border-t-2 border-t-orange-500">
              <Award className="h-10 w-10 text-orange-400 mx-auto mb-4" />
              <h3 className="text-slate-400 font-mono text-xs uppercase tracking-widest">Contributions Raised</h3>
              <div className="mt-2">
                <MetricCounter value={districtStats.contributionsRaised} suffix=" ₹" />
              </div>
              <p className="text-slate-300 text-sm font-light mt-3">
                Funds collected and directly invested in building regional water filtration plants and libraries.
              </p>
            </GlassCard>
          </div>
        </div>
      </section>

      {/* SECTION 4: AVENUES OF SERVICE (Areas of Impact) */}
      <section className="py-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">CORAL STRUCTURES</span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1">
              Avenues of Service
            </h2>
            <p className="text-slate-400 text-sm md:text-base font-light mt-2 max-w-xl mx-auto">
              Our service ecosystem is built around seven core areas. Discover where our waves shape the shoreline.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {avenueData.map((ave) => {
              const Icon = ave.icon;
              return (
                <GlassCard key={ave.name} className="flex flex-col justify-between group hover:border-cyan-400/30">
                  <div className="space-y-4">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${ave.color} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {ave.name}
                    </h3>
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      {ave.desc}
                    </p>
                  </div>
                  <div className="border-t border-white/5 pt-4 mt-6 flex justify-between items-center">
                    <span className="text-xs font-mono text-slate-400">Activity Count</span>
                    <span className="text-sm font-mono text-cyan-400 font-bold">{ave.count} Projects</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 5: DISTRICT STORY */}
      <section className="py-20 border-b border-white/5 relative overflow-hidden bg-gradient-to-b from-transparent to-abyss-deep/40">
        {/* Subtle decorative grid background overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-5 space-y-6">
              <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">OUR UNDERCURRENT</span>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-1 leading-tight">
                Shaping the Shoreline: Our District Story
              </h2>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                Rotaract District 3192 was established to unite the young professional force under a single current. We believe youth shouldn't just witness local changes—they must drive them.
              </p>
              <p className="text-slate-300 text-sm md:text-base font-light leading-relaxed">
                From high-tech hubs in Bengaluru to rural fringes, our 120+ clubs adapt like fluid bodies of water, pooling together to solve infrastructural, literacy, and ecological problems.
              </p>
              <button
                onClick={() => setCurrentTab('district')}
                className="ripple-btn flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                Learn More About DRR & Zones
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            {/* Split Mission & Vision Editorial layout */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <GlassCard className="border-l-4 border-l-cyan-400 h-full flex flex-col justify-between p-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4 italic">Our Mission</h3>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    To connect, inspire, and mobilize young leaders across all zones. We provide the channel for professional skill incubation, cross-border fellowship networks, and direct structural aid.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-cyan-400 mt-6 tracking-widest uppercase font-bold">
                  // THE STREAM
                </div>
              </GlassCard>

              <GlassCard className="border-l-4 border-l-teal-400 h-full flex flex-col justify-between p-8">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-4 italic">Our Vision</h3>
                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    To build a sustainable digital and physical ocean of social change where every Rotaractor's effort counts. We aim to scale lake restoration, literacy clinics, and tech education exponentially.
                  </p>
                </div>
                <div className="text-[10px] font-mono text-teal-400 mt-6 tracking-widest uppercase font-bold">
                  // THE HORIZON
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FINAL CTA */}
      <section className="relative py-28 text-center overflow-hidden bg-gradient-to-b from-transparent to-abyss-deep border-b border-white/5">
        {/* Curved waves graphics overlay */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-10">
          <svg className="w-full h-24 text-cyan-500 fill-current" viewBox="0 0 1440 74" preserveAspectRatio="none">
            <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 relative z-10 space-y-8">
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">JOIN THE MOVEMENT</span>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Ready to Explore the <br />
            <span className="italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 glow-text-blue">Ocean of Impact?</span>
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light max-w-xl mx-auto leading-relaxed">
            Submit your club's project reports, explore leadership roles, or register as a community volunteer today.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentTab('login')}
              className="ripple-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3.5 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:from-cyan-400 hover:to-blue-500 hover:-translate-y-0.5 transition-all duration-300"
            >
              Login to Reporting System
            </button>
            <a
              href="mailto:contact@rotaract3192.org?subject=Requesting Access to Showcase Portal"
              className="ripple-btn flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-8 py-3.5 font-semibold text-white hover:bg-white/10 hover:-translate-y-0.5 transition-all duration-300"
            >
              Request Access
            </a>
            <button
              onClick={() => setCurrentTab('clubs')}
              className="ripple-btn flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-3.5 font-semibold text-white shadow-lg hover:from-teal-400 hover:to-emerald-500 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Clubs Directory
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
