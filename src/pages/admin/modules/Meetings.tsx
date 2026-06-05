import React, { useState } from 'react';
import { useAdminStore } from '../../../store/adminStore';
import GlassCard from '../../../components/GlassCard';
import { 
  Search, Plus, Eye, Sparkles, 
  ChevronRight, ChevronLeft, Loader, ArrowLeft, Mic
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const meetingSchema = z.object({
  title: z.string().min(5, 'Meeting Title must be at least 5 characters'),
  date: z.string().min(1, 'Date is required'),
  minutes: z.string().min(10, 'Minutes of Meeting must be at least 10 characters'),
  meetingType: z.enum(['Board Meeting', 'General Body Meeting', 'District Meeting', 'Zonal Meeting', 'Committee Meeting']),
  participants: z.number().positive('Participants must be greater than 0'),
  startTime: z.string().min(1, 'Start Time is required'),
  endTime: z.string().min(1, 'End Time is required')
});

type FormValues = z.infer<typeof meetingSchema>;

export const Meetings: React.FC = () => {
  const { meetings, addMeeting } = useAdminStore();
  const [view, setView] = useState<'list' | 'report'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [formStep, setFormStep] = useState(1);
  
  // AI generation states
  const [isGeneratingMinutes, setIsGeneratingMinutes] = useState(false);
  const [isGeneratingActions, setIsGeneratingActions] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(meetingSchema),
    defaultValues: {
      meetingType: 'Board Meeting',
      participants: 0
    }
  });

  const triggerAiFeatures = (feature: 'minutes' | 'actions' | 'summary') => {
    const title = watch('title') || 'Monthly Assembly';
    if (feature === 'minutes') {
      setIsGeneratingMinutes(true);
      setTimeout(() => {
        setIsGeneratingMinutes(false);
        setValue('minutes', `Minutes of Meeting for ${title}:\n\n1. Meeting called to order at the scheduled time.\n2. Treasurer presented the balance sheets.\n3. Reviewed execution timelines for the upcoming water filtration drives.\n4. Scheduled community mobilization tasks for next Saturday.`);
      }, 1500);
    } else if (feature === 'actions') {
      setIsGeneratingActions(true);
      setTimeout(() => {
        setIsGeneratingActions(false);
        alert(`AI Generated Action Items:\n\n- [ ] Club Secretary to circulate the water drive spreadsheets.\n- [ ] Treasurer to disburse ₹15,000 for materials.\n- [ ] Public Image lead to publish banners.`);
      }, 1500);
    } else if (feature === 'summary') {
      setIsGeneratingSummary(true);
      setTimeout(() => {
        setIsGeneratingSummary(false);
        alert(`AI Summary for ${title}:\n\nThe board finalized the budget and logistical pipeline for upcoming social projects, emphasizing volunteer mobilization.`);
      }, 1200);
    }
  };

  const onFormSubmit = (data: FormValues) => {
    addMeeting({
      title: data.title,
      date: data.date,
      minutes: data.minutes,
      meetingType: data.meetingType,
      participants: data.participants,
      startTime: data.startTime,
      endTime: data.endTime,
      photos: [],
      status: 'Submitted'
    });
    setView('list');
    setFormStep(1);
  };

  const filtered = meetings.filter(m => 
    m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.meetingType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">OPERATIONAL MODULE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Meetings</h1>
        </div>
        
        {view === 'list' ? (
          <button
            onClick={() => setView('report')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold text-white text-xs border border-cyan-400/20 shadow-lg cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Report Meeting
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
              placeholder="Search meetings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 transition-all font-sans text-sm"
            />
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/5">
            <table className="w-full text-left border-collapse text-xs md:text-sm">
              <thead>
                <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-mono uppercase tracking-wider text-[10px]">
                  <th className="p-4">Meeting Title</th>
                  <th className="p-4">Meeting Type</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Participants</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-white/5 transition-all">
                    <td className="p-4 font-bold text-white">{m.title}</td>
                    <td className="p-4 text-slate-300">{m.meetingType}</td>
                    <td className="p-4 text-slate-400 font-mono">{m.date}</td>
                    <td className="p-4 text-slate-300 font-mono">{m.participants}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border bg-emerald-500/10 border-emerald-400/30 text-emerald-400">
                        {m.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => alert(`Meeting Title: ${m.title}\nMinutes: ${m.minutes}`)}
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
            <span className="font-serif text-lg font-bold text-white">New Meeting Minutes</span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <span className={formStep === 1 ? 'text-cyan-400 font-bold' : ''}>1. Overview</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className={formStep === 2 ? 'text-cyan-400 font-bold' : ''}>2. Minutes & AI</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit as any)} className="space-y-6 text-left">
            {formStep === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Meeting Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. June Monthly Board Meeting"
                    {...register('title')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.title && <p className="text-rose-400 text-[10px] mt-1">{errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Meeting Type</label>
                    <select 
                      {...register('meetingType')}
                      className="w-full px-4 py-2.5 bg-abyss-deep border border-white/10 rounded-xl text-white outline-none focus:border-cyan-400 text-sm cursor-pointer"
                    >
                      <option value="Board Meeting">Board Meeting</option>
                      <option value="General Body Meeting">General Body Meeting</option>
                      <option value="District Meeting">District Meeting</option>
                      <option value="Zonal Meeting">Zonal Meeting</option>
                      <option value="Committee Meeting">Committee Meeting</option>
                    </select>
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

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Meeting Date</label>
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

                {/* Upload Audio Simulator */}
                <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-400/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-cyan-400/10 text-cyan-400">
                      <Mic className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-sans">Audio Recorder Simulator</h4>
                      <p className="text-[10px] text-slate-400">Click to import audio brief for transcription.</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      alert('Simulating Audio Upload... File parsed successfully!');
                      triggerAiFeatures('minutes');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500/15 border border-cyan-500/25 hover:bg-cyan-500/25 text-cyan-300 font-mono text-[10px] cursor-pointer"
                  >
                    Upload Audio
                  </button>
                </div>
              </div>
            )}

            {formStep === 2 && (
              <div className="space-y-4">
                <div className="space-y-1 relative">
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Minutes of Meeting</label>
                    <button
                      type="button"
                      onClick={() => triggerAiFeatures('minutes')}
                      disabled={isGeneratingMinutes}
                      className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-[10px] font-mono cursor-pointer"
                    >
                      {isGeneratingMinutes ? <Loader className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                      Autofill Minutes
                    </button>
                  </div>
                  <textarea 
                    rows={6}
                    placeholder="Enter transcript details or paste official minutes..."
                    {...register('minutes')}
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.minutes && <p className="text-rose-400 text-[10px] mt-1">{errors.minutes.message}</p>}
                </div>

                {/* AI Auxiliary Controls */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h5 className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-bold">Extra AI Utilities</h5>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => triggerAiFeatures('actions')}
                      disabled={isGeneratingActions}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      {isGeneratingActions && <Loader className="h-3 w-3 animate-spin" />}
                      Generate Action Items
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAiFeatures('summary')}
                      disabled={isGeneratingSummary}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-[10px] font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      {isGeneratingSummary && <Loader className="h-3 w-3 animate-spin" />}
                      Generate Brief Summary
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
                  Submit Meeting
                </button>
              )}
            </div>
          </form>
        </GlassCard>
      )}
    </div>
  );
};

export default Meetings;
