import React, { useState } from 'react';
import { useAdminStore } from '../../../store/adminStore';
import GlassCard from '../../../components/GlassCard';
import { 
  Search, Plus, Eye, Sparkles, 
  ChevronRight, ChevronLeft, Loader, ArrowLeft
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const orientationSchema = z.object({
  name: z.string().min(5, 'Orientation Name must be at least 5 characters'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start Time is required'),
  endTime: z.string().min(1, 'End Time is required'),
  facilitator: z.string().min(3, 'Facilitator Name is required'),
  orientationType: z.string().min(1, 'Type of Orientation is required'),
  participants: z.number().positive('Participants must be greater than 0')
});

type FormValues = z.infer<typeof orientationSchema>;

export const Orientations: React.FC = () => {
  const { orientations, addOrientation } = useAdminStore();
  const [view, setView] = useState<'list' | 'report'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [formStep, setFormStep] = useState(1);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(orientationSchema),
    defaultValues: {
      participants: 0
    }
  });

  const triggerAiSummary = () => {
    const name = watch('name') || 'Rotaract 101';
    const facilitator = watch('facilitator') || 'District Trainer';
    setIsGeneratingSummary(true);
    setTimeout(() => {
      setIsGeneratingSummary(false);
      alert(`AI Session Summary:\n\nThe "${name}" session was successfully facilitated by ${facilitator}. The orientation covered the fundamental pillars of Rotaract, including leadership avenues, local community impact strategies, and portal operations. Interactive Q&As fostered active engagement from all attendees.`);
    }, 1500);
  };

  const onFormSubmit = (data: FormValues) => {
    addOrientation({
      name: data.name,
      venue: data.venue,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      facilitator: data.facilitator,
      orientationType: data.orientationType,
      participants: data.participants,
      photos: [],
      status: 'Submitted'
    });
    setView('list');
    setFormStep(1);
  };

  const filtered = orientations.filter(o => 
    o.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.facilitator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">OPERATIONAL MODULE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Orientations</h1>
        </div>
        
        {view === 'list' ? (
          <button
            onClick={() => setView('report')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold text-white text-xs border border-cyan-400/20 shadow-lg cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Report Orientation
          </button>
        ) : (
          <button
            onClick={() => { setView('list'); setFormStep(1); }}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to List
          </button>
        )}
      </div>

      {view === 'list' ? (
        <GlassCard className="p-6 border border-white/5 space-y-6">
          <div className="flex items-center relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search orientations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="p-4">Orientation Name</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Facilitator</th>
                  <th className="p-4">Participants</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((o) => (
                  <tr key={o.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4 font-bold text-white">{o.name}</td>
                    <td className="p-4 text-slate-300">{o.venue}</td>
                    <td className="p-4 text-slate-400 font-mono">{o.date}</td>
                    <td className="p-4 text-cyan-300">{o.facilitator}</td>
                    <td className="p-4 text-slate-300 font-mono">{o.participants}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border bg-emerald-500/10 border-emerald-400/30 text-emerald-400">
                        {o.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => alert(`Orientation: ${o.name}\nType: ${o.orientationType}\nFacilitator: ${o.facilitator}`)}
                        className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      ) : (
        <GlassCard className="p-6 sm:p-8 border border-white/10 max-w-2xl mx-auto">
          <div className="mb-6 border-b border-white/5 pb-4 flex justify-between items-center">
            <span className="font-serif text-lg font-bold text-white">New Orientation Form</span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <span className={formStep === 1 ? 'text-cyan-400 font-bold' : ''}>1. Logistics</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className={formStep === 2 ? 'text-cyan-400 font-bold' : ''}>2. Content & Review</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit as any)} className="space-y-6 text-left">
            {formStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Orientation Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Rotaract Foundations"
                    {...register('name')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.name && <p className="text-rose-400 text-[10px] mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Venue</label>
                  <input 
                    type="text" 
                    placeholder="e.g. College Seminar Hall"
                    {...register('venue')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.venue && <p className="text-rose-400 text-[10px] mt-1">{errors.venue.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Date</label>
                    <input type="date" {...register('date')} className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Start Time</label>
                    <input type="time" {...register('startTime')} className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white text-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">End Time</label>
                    <input type="time" {...register('endTime')} className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white text-sm" />
                  </div>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Learning Facilitator Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. PDRR Jane Doe"
                    {...register('facilitator')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.facilitator && <p className="text-rose-400 text-[10px] mt-1">{errors.facilitator.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Type of Orientation</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Induction Training"
                      {...register('orientationType')}
                      className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Participants</label>
                    <input 
                      type="number" 
                      {...register('participants', { valueAsNumber: true })}
                      className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                    {errors.participants && <p className="text-rose-400 text-[10px] mt-1">{errors.participants.message}</p>}
                  </div>
                </div>

                {/* AI Feature */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest font-bold">Operational AI</span>
                    <p className="text-xs text-slate-300 font-light">Generate comprehensive overview brief for district submission.</p>
                  </div>
                  <button
                    type="button"
                    onClick={triggerAiSummary}
                    disabled={isGeneratingSummary}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs border border-cyan-400/20 disabled:opacity-50 cursor-pointer"
                  >
                    {isGeneratingSummary ? <Loader className="h-3.5 w-3.5 animate-spin" /> : <Sparkles className="h-3.5 w-3.5" />}
                    Summary
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-6">
              {formStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setFormStep(formStep - 1)}
                  className="flex items-center gap-1 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 text-xs font-mono"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {formStep < 2 ? (
                <button
                  type="button"
                  onClick={() => setFormStep(formStep + 1)}
                  className="flex items-center gap-1 px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/25 text-cyan-300 font-mono text-xs ml-auto"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 font-semibold text-white text-xs border border-emerald-400/20 shadow-lg cursor-pointer"
                >
                  Submit Orientation
                </button>
              )}
            </div>
          </form>
        </GlassCard>
      )}
    </div>
  );
};

export default Orientations;
