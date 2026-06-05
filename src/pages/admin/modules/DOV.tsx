import React, { useState } from 'react';
import { useAdminStore } from '../../../store/adminStore';
import GlassCard from '../../../components/GlassCard';
import { 
  Search, Plus, Eye, 
  ChevronRight, ChevronLeft, Loader, ArrowLeft
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const dovSchema = z.object({
  name: z.string().min(5, 'Event Name must be at least 5 characters'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  date: z.string().min(1, 'Date is required'),
  startTime: z.string().min(1, 'Start Time is required'),
  endTime: z.string().min(1, 'End Time is required'),
  activityReportLink: z.string().url('Must be a valid PDF or report URL'),
  documentsSentViaEmail: z.boolean()
});

type FormValues = z.infer<typeof dovSchema>;

export const DOVModule: React.FC = () => {
  const { dovs, addDov } = useAdminStore();
  const [view, setView] = useState<'list' | 'report'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [formStep, setFormStep] = useState(1);

  // AI states
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingCompliance, setIsGeneratingCompliance] = useState(false);
  const [isGeneratingFollowups, setIsGeneratingFollowups] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(dovSchema),
    defaultValues: {
      documentsSentViaEmail: false
    }
  });

  const triggerAiFeatures = (feature: 'summary' | 'compliance' | 'followup') => {
    const name = watch('name') || 'DRR Visit';
    if (feature === 'summary') {
      setIsGeneratingSummary(true);
      setTimeout(() => {
        setIsGeneratingSummary(false);
        alert(`AI Generated Visit Summary:\n\nOfficial DOV audit of "${name}" was successfully completed. Operational guidelines were reviewed, and project data logs were audited for district rankings. Highlights include high engagement in community services.`);
      }, 1500);
    } else if (feature === 'compliance') {
      setIsGeneratingCompliance(true);
      setTimeout(() => {
        setIsGeneratingCompliance(false);
        alert('AI Compliance Report:\n\n- Club Bylaws: COMPLIANT\n- Reporting Timeline: COMPLIANT\n- Financial Audits: APPROVED');
      }, 1200);
    } else if (feature === 'followup') {
      setIsGeneratingFollowups(true);
      setTimeout(() => {
        setIsGeneratingFollowups(false);
        alert('AI Follow-up Actions:\n\n1. Upload remaining photo logs.\n2. Re-verify board directors on the RI portal.');
      }, 1500);
    }
  };

  const onFormSubmit = (data: FormValues) => {
    addDov({
      coverPhoto: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      name: data.name,
      venue: data.venue,
      date: data.date,
      startTime: data.startTime,
      endTime: data.endTime,
      activityReportLink: data.activityReportLink,
      photos: [],
      documentsSentViaEmail: data.documentsSentViaEmail,
      status: 'Submitted'
    });
    setView('list');
    setFormStep(1);
  };

  const filtered = dovs.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.clubName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">OPERATIONAL MODULE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">District Official Visits (DOV)</h1>
        </div>
        
        {view === 'list' ? (
          <button
            onClick={() => setView('report')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold text-white text-xs border border-cyan-400/20 shadow-lg cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Report DOV
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
              placeholder="Search DOVs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="p-4">Cover</th>
                  <th className="p-4">Event Name</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Club Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4">
                      <img src={d.coverPhoto} alt="Cover" className="h-10 w-16 object-cover rounded-lg border border-white/10" />
                    </td>
                    <td className="p-4 font-bold text-white">{d.name}</td>
                    <td className="p-4 text-slate-300">{d.venue}</td>
                    <td className="p-4 text-slate-400 font-mono">{d.date}</td>
                    <td className="p-4 text-cyan-300 font-bold">{d.clubName}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border bg-emerald-500/10 border-emerald-400/30 text-emerald-400">
                        {d.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => alert(`DOV Event: ${d.name}\nReport Link: ${d.activityReportLink}`)}
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
            <span className="font-serif text-lg font-bold text-white">Report District Official Visit</span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <span className={formStep === 1 ? 'text-cyan-400 font-bold' : ''}>1. Logistics</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className={formStep === 2 ? 'text-cyan-400 font-bold' : ''}>2. Documents & AI</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-left">
            {formStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Event Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Official DOV 2026"
                    {...register('name')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.name && <p className="text-rose-400 text-[10px] mt-1">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Venue</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Indiranagar Club Auditorium"
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
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Activity Report PDF Link</label>
                  <input 
                    type="text" 
                    placeholder="https://drive.google.com/..."
                    {...register('activityReportLink')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.activityReportLink && <p className="text-rose-400 text-[10px] mt-1">{errors.activityReportLink.message}</p>}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input type="checkbox" id="documentsSent" {...register('documentsSentViaEmail')} className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer" />
                  <label htmlFor="documentsSent" className="text-xs text-slate-300 font-mono cursor-pointer">Official Documents Sent to District Team Via Email</label>
                </div>

                {/* AI Features */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h5 className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Extra AI Utilities</h5>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => triggerAiFeatures('summary')}
                      disabled={isGeneratingSummary}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      {isGeneratingSummary && <Loader className="h-3 w-3 animate-spin" />}
                      Generate Visit Summary
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAiFeatures('compliance')}
                      disabled={isGeneratingCompliance}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      {isGeneratingCompliance && <Loader className="h-3 w-3 animate-spin" />}
                      Generate Compliance Check
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAiFeatures('followup')}
                      disabled={isGeneratingFollowups}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      {isGeneratingFollowups && <Loader className="h-3 w-3 animate-spin" />}
                      Generate Action items
                    </button>
                  </div>
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
                  Submit DOV Report
                </button>
              )}
            </div>
          </form>
        </GlassCard>
      )}
    </div>
  );
};

export default DOVModule;
