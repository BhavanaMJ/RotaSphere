import React, { useState } from 'react';
import { useAdminStore } from '../../../store/adminStore';
import GlassCard from '../../../components/GlassCard';
import { 
  Search, Plus, Eye, Check, Sparkles, 
  DollarSign, Users, ChevronRight, ChevronLeft, Loader, ArrowLeft
} from 'lucide-react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// Zod Validation Schema matching form fields
const activitySchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  venue: z.string().min(3, 'Venue must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  startDate: z.string().min(1, 'Start Date is required'),
  endDate: z.string().min(1, 'End Date is required'),
  endDateSameAsStart: z.boolean(),
  activityType: z.enum(['Standalone Activity', 'Collaborative Activity']),
  externalNgoInvolved: z.boolean(),
  externalNgoName: z.string().optional(),
  avenueOfService: z.array(z.string()).min(1, 'Select at least one Avenue of Service'),
  areaOfFocus: z.array(z.string()).min(1, 'Select at least one Area of Focus'),
  expensesInr: z.number().nonnegative(),
  cashContributionInr: z.number().nonnegative(),
  inKindContributionInr: z.number().nonnegative(),
  participantsCount: z.number().nonnegative(),
  beneficiariesCount: z.number().nonnegative(),
  volunteersCount: z.number().nonnegative(),
  volunteerHours: z.number().nonnegative(),
  submitForPublication: z.boolean(),
  featureActivity: z.boolean()
});

type FormValues = z.infer<typeof activitySchema>;

export const ClubActivities: React.FC = () => {
  const { activities, addActivity, updateActivityStatus, user } = useAdminStore();
  const [view, setView] = useState<'list' | 'report'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mobile Form Steps
  const [formStep, setFormStep] = useState(1);
  const [isGeneratingAi, setIsGeneratingAi] = useState<string | null>(null);

  // Initializing React Hook Form
  const { 
    register, 
    handleSubmit, 
    control, 
    watch, 
    setValue, 
    formState: { errors } 
  } = useForm<FormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      endDateSameAsStart: true,
      activityType: 'Standalone Activity',
      externalNgoInvolved: false,
      avenueOfService: [],
      areaOfFocus: [],
      expensesInr: 0,
      cashContributionInr: 0,
      inKindContributionInr: 0,
      participantsCount: 0,
      beneficiariesCount: 0,
      volunteersCount: 0,
      volunteerHours: 0,
      submitForPublication: true,
      featureActivity: false
    }
  });

  const externalNgoChecked = watch('externalNgoInvolved');
  const startDateValue = watch('startDate');

  // Triggering simulated AI content generation
  const triggerAiFeature = (feature: 'summary' | 'caption' | 'newsletter' | 'report') => {
    const title = watch('title') || 'Local Water Conservation Drive';
    const venue = watch('venue') || 'Indiranagar Core';
    
    setIsGeneratingAi(feature);
    
    setTimeout(() => {
      setIsGeneratingAi(null);
      if (feature === 'summary') {
        setValue('description', `Under the leadership of ${user?.name || 'Rtr. Ananya'}, the Rotaract Club organized "${title}" at ${venue}. This impactful initiative rallied local community members to restore and clean up the surrounding water resources, resolving contamination concerns and establishing long-term conservation systems.`);
      } else if (feature === 'caption') {
        alert(`Generated Instagram Caption:\n\n🌊 Ripples of Impact! Our club successfully conducted #${title.replace(/\s+/g, '')} at ${venue} today. Together, we are preserving our natural waterways for a sustainable future. 💙 #Rotaract3192 #OceanOfImpact`);
      } else if (feature === 'newsletter') {
        alert(`Generated Newsletter Snippet:\n\nROTARACT DISTRICT 3192 CHRONICLES\nFeatured Initiative: ${title}\nThis week, our officers gathered to execute an incredible community drive focused on sustainability...`);
      } else if (feature === 'report') {
        alert(`Generated PDF Impact Brief:\n\nProject: ${title}\nLocation: ${venue}\nKey Metric: High communal participation with volunteer service hours logged.`);
      }
    }, 1500);
  };

  const onFormSubmit = (data: FormValues) => {
    addActivity({
      coverPhoto: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      title: data.title,
      venue: data.venue,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDateSameAsStart ? data.startDate : data.endDate,
      endDateSameAsStart: data.endDateSameAsStart,
      activityType: data.activityType,
      externalNgoInvolved: data.externalNgoInvolved,
      externalNgoName: data.externalNgoName,
      avenueOfService: data.avenueOfService,
      areaOfFocus: data.areaOfFocus,
      expensesInr: data.expensesInr,
      cashContributionInr: data.cashContributionInr,
      inKindContributionInr: data.inKindContributionInr,
      participantsCount: data.participantsCount,
      beneficiariesCount: data.beneficiariesCount,
      volunteersCount: data.volunteersCount,
      volunteerHours: data.volunteerHours,
      photos: [],
      status: data.submitForPublication ? 'Pending Publication' : 'Draft',
      featured: data.featureActivity
    });
    setView('list');
    setFormStep(1);
  };

  // Filter list
  const filteredActivities = activities.filter(act => 
    act.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    act.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Module Title */}
      <div className="flex justify-between items-center">
        <div>
          <span className="font-mono text-cyan-400 text-xs font-bold tracking-widest uppercase">OPERATIONAL MODULE</span>
          <h1 className="font-serif text-3xl font-bold text-white mt-1">Club Activities</h1>
        </div>
        
        {view === 'list' ? (
          <button
            onClick={() => setView('report')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 font-semibold text-white text-xs border border-cyan-400/20 shadow-lg cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Report New Activity
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
        /* TABLE LISTING PAGE */
        <GlassCard className="p-6 border border-white/5 space-y-6">
          <div className="flex items-center relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search reported activities..."
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
                  <th className="p-4">Activity Title</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Avenue</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredActivities.length > 0 ? (
                  filteredActivities.map((act) => (
                    <tr key={act.id} className="hover:bg-white/5 transition-all">
                      <td className="p-4">
                        <img src={act.coverPhoto} alt="Cover" className="h-10 w-16 object-cover rounded-lg border border-white/10" />
                      </td>
                      <td className="p-4 font-bold text-white max-w-[150px] truncate">{act.title}</td>
                      <td className="p-4 text-slate-300">{act.venue}</td>
                      <td className="p-4 text-slate-400 font-mono">{act.startDate}</td>
                      <td className="p-4 text-slate-400">{act.activityType.split(' ')[0]}</td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-cyan-500/10 border border-cyan-400/20 rounded-lg text-cyan-300 font-medium text-[10px]">
                          {act.avenueOfService[0]}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold border ${
                          act.status === 'Published' 
                            ? 'bg-emerald-500/10 border-emerald-400/30 text-emerald-400'
                            : act.status === 'Pending Publication'
                            ? 'bg-yellow-500/10 border-yellow-400/30 text-yellow-400'
                            : 'bg-slate-500/10 border-white/10 text-slate-400'
                        }`}>
                          {act.status}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={() => alert(`Reviewing: ${act.title}\n\nDescription: ${act.description}`)}
                            className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {act.status === 'Draft' && (
                            <button 
                              onClick={() => updateActivityStatus(act.id, 'Pending Publication')}
                              className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-500/20"
                              title="Submit for Approval"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="p-8 text-center text-slate-400 italic">No reported club activities found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      ) : (
        /* MULTI-STEP REPORT NEW ACTIVITY FORM */
        <GlassCard className="p-6 sm:p-8 border border-white/10 max-w-4xl mx-auto">
          {/* Form Header Steps indicators */}
          <div className="mb-8 border-b border-white/5 pb-4 flex justify-between items-center">
            <span className="font-serif text-lg font-bold text-white">Report Impact Activity</span>
            <div className="flex items-center gap-1.5 font-mono text-xs text-slate-400">
              <span className={formStep === 1 ? 'text-cyan-400 font-bold' : ''}>1. Core Details</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className={formStep === 2 ? 'text-cyan-400 font-bold' : ''}>2. Impact & Finance</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className={formStep === 3 ? 'text-cyan-400 font-bold' : ''}>3. media & Publish</span>
            </div>
          </div>

          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6 text-left">
            {/* STEP 1: Basic Information */}
            {formStep === 1 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Activity Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Clean Reef Initiative"
                      {...register('title')} 
                      className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                    {errors.title && <p className="text-rose-400 text-[10px] mt-1">{errors.title.message}</p>}
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Venue / Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Bangalore North School"
                      {...register('venue')} 
                      className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                    {errors.venue && <p className="text-rose-400 text-[10px] mt-1">{errors.venue.message}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Start Date</label>
                    <input 
                      type="date" 
                      {...register('startDate')} 
                      className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">End Date</label>
                    <input 
                      type="date" 
                      disabled={watch('endDateSameAsStart')}
                      {...register('endDate')} 
                      className="w-full px-4 py-2.5 bg-white/5 disabled:opacity-40 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-6 pl-2">
                    <input 
                      type="checkbox" 
                      id="endDateSameAsStart"
                      {...register('endDateSameAsStart')}
                      onChange={(e) => {
                        setValue('endDateSameAsStart', e.target.checked);
                        if (e.target.checked) setValue('endDate', startDateValue);
                      }}
                      className="rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="endDateSameAsStart" className="text-xs text-slate-300 font-mono cursor-pointer">Same as Start Date</label>
                  </div>
                </div>

                {/* AI Text generation segment */}
                <div className="space-y-1 relative">
                  <div className="flex justify-between items-center">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Project Description</label>
                    <button
                      type="button"
                      onClick={() => triggerAiFeature('summary')}
                      disabled={isGeneratingAi !== null}
                      className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 text-xs font-mono disabled:opacity-50 cursor-pointer"
                    >
                      {isGeneratingAi === 'summary' ? (
                        <>
                          <Loader className="h-3.5 w-3.5 animate-spin" />
                          Formulating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="h-3.5 w-3.5" />
                          AI Project Summary
                        </>
                      )}
                    </button>
                  </div>
                  <textarea 
                    rows={4}
                    placeholder="Enter project summary details..."
                    {...register('description')} 
                    className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                  />
                  {errors.description && <p className="text-rose-400 text-[10px] mt-1">{errors.description.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Activity Classification</label>
                    <select 
                      {...register('activityType')}
                      className="w-full px-4 py-2.5 bg-abyss-deep border border-white/10 rounded-xl text-white outline-none focus:border-cyan-400 text-sm cursor-pointer"
                    >
                      <option value="Standalone Activity">Standalone Activity</option>
                      <option value="Collaborative Activity">Collaborative Activity</option>
                    </select>
                  </div>

                  <div className="space-y-2 pl-2 pt-6">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="externalNgoInvolved"
                        {...register('externalNgoInvolved')} 
                        className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer"
                      />
                      <label htmlFor="externalNgoInvolved" className="text-xs text-slate-300 font-mono cursor-pointer">External NGO / Org Involved</label>
                    </div>
                    {externalNgoChecked && (
                      <input 
                        type="text" 
                        placeholder="Organization Name"
                        {...register('externalNgoName')} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm mt-1"
                      />
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Metrics and Financial Details */}
            {formStep === 2 && (
              <div className="space-y-6">
                {/* Financial details */}
                <div className="space-y-3">
                  <h4 className="font-serif text-sm font-bold text-white border-b border-white/5 pb-1 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-cyan-400" />
                    Financial Breakdown (INR)
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Activity Expenses</label>
                      <input 
                        type="number" 
                        {...register('expensesInr', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Cash Contribution</label>
                      <input 
                        type="number" 
                        {...register('cashContributionInr', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">In-Kind Valuation</label>
                      <input 
                        type="number" 
                        {...register('inKindContributionInr', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Impact metrics */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-serif text-sm font-bold text-white border-b border-white/5 pb-1 flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-cyan-400" />
                    Impact Parameters & Volunteers
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Participants</label>
                      <input 
                        type="number" 
                        {...register('participantsCount', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Beneficiaries</label>
                      <input 
                        type="number" 
                        {...register('beneficiariesCount', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Volunteers</label>
                      <input 
                        type="number" 
                        {...register('volunteersCount', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Volunteer Hours</label>
                      <input 
                        type="number" 
                        {...register('volunteerHours', { valueAsNumber: true })} 
                        className="w-full px-4 py-2.5 bg-white/5 rounded-xl border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Media & Publishing */}
            {formStep === 3 && (
              <div className="space-y-6">
                {/* Avenues and Areas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Avenues Of Service</label>
                    <Controller
                      name="avenueOfService"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 max-h-48 overflow-y-auto">
                          {['Club Service', 'Community Service', 'Professional Development Service', 'International Service', 'Public Relations', 'Public Image', 'Next Gen'].map((ave) => {
                            const isChecked = field.value?.includes(ave);
                            return (
                              <label key={ave} className="flex items-center gap-2 text-xs text-slate-300 font-sans cursor-pointer hover:text-white transition-all">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      field.onChange(field.value.filter((v: string) => v !== ave));
                                    } else {
                                      field.onChange([...field.value, ave]);
                                    }
                                  }}
                                  className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer"
                                />
                                {ave}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    />
                    {errors.avenueOfService && <p className="text-rose-400 text-[10px] mt-1">{errors.avenueOfService.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="font-mono text-[10px] text-slate-400 uppercase tracking-widest block ml-1">Areas of Focus</label>
                    <Controller
                      name="areaOfFocus"
                      control={control}
                      render={({ field }) => (
                        <div className="grid grid-cols-1 gap-1.5 p-3 rounded-xl bg-white/5 border border-white/10 max-h-48 overflow-y-auto">
                          {[
                            'Peace Building and Conflict Resolution',
                            'Disease Prevention and Treatment',
                            'Water, Sanitation and Hygiene',
                            'Maternal and Child Health',
                            'Basic Education and Literacy',
                            'Community Economic Development',
                            'Supporting the Environment'
                          ].map((foc) => {
                            const isChecked = field.value?.includes(foc);
                            return (
                              <label key={foc} className="flex items-center gap-2 text-xs text-slate-300 font-sans cursor-pointer hover:text-white transition-all">
                                <input
                                  type="checkbox"
                                  checked={isChecked}
                                  onChange={() => {
                                    if (isChecked) {
                                      field.onChange(field.value.filter((v: string) => v !== foc));
                                    } else {
                                      field.onChange([...field.value, foc]);
                                    }
                                  }}
                                  className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer"
                                />
                                {foc}
                              </label>
                            );
                          })}
                        </div>
                      )}
                    />
                    {errors.areaOfFocus && <p className="text-rose-400 text-[10px] mt-1">{errors.areaOfFocus.message}</p>}
                  </div>
                </div>

                {/* AI Extra Utilities */}
                <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-3">
                  <h5 className="font-mono text-[10px] text-cyan-400 uppercase tracking-wider font-bold flex items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5" />
                    Operational AI Utilities
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() => triggerAiFeature('caption')}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      Generate Caption
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAiFeature('newsletter')}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      Generate Newsletter
                    </button>
                    <button
                      type="button"
                      onClick={() => triggerAiFeature('report')}
                      className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                    >
                      Generate PDF Brief
                    </button>
                  </div>
                </div>

                {/* Publishing checks */}
                <div className="space-y-3 pt-2">
                  <h4 className="font-serif text-sm font-bold text-white border-b border-white/5 pb-1">Publishing Settings</h4>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="flex items-center gap-2 text-xs text-slate-300 font-mono cursor-pointer">
                      <input 
                        type="checkbox" 
                        {...register('submitForPublication')} 
                        className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer"
                      />
                      Submit for District Approval
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-300 font-mono cursor-pointer">
                      <input 
                        type="checkbox" 
                        {...register('featureActivity')} 
                        className="rounded border-white/10 bg-white/5 text-cyan-500 cursor-pointer"
                      />
                      Flag for Featured Showcase
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Controllers */}
            <div className="flex justify-between items-center border-t border-white/5 pt-6 mt-6">
              {formStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setFormStep(formStep - 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 hover:text-white transition-all text-xs font-mono cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {formStep < 3 ? (
                <button
                  type="button"
                  onClick={() => setFormStep(formStep + 1)}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-400/25 hover:bg-cyan-500/20 text-cyan-300 font-mono text-xs cursor-pointer ml-auto"
                >
                  Next Step
                  <ChevronRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 font-semibold text-white text-xs border border-emerald-400/20 shadow-lg cursor-pointer"
                >
                  Submit Activity Report
                </button>
              )}
            </div>
          </form>
        </GlassCard>
      )}
    </div>
  );
};

export default ClubActivities;
