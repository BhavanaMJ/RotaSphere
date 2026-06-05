import { create } from 'zustand';
import { mockClubs } from '../data/mockData';

export interface ClubActivity {
  id: string;
  coverPhoto: string;
  title: string;
  venue: string;
  description: string;
  startDate: string;
  endDate: string;
  endDateSameAsStart: boolean;
  activityType: 'Standalone Activity' | 'Collaborative Activity';
  externalNgoInvolved: boolean;
  externalNgoName?: string;
  avenueOfService: string[];
  areaOfFocus: string[];
  expensesInr: number;
  cashContributionInr: number;
  inKindContributionInr: number;
  participantsCount: number;
  beneficiariesCount: number;
  volunteersCount: number;
  volunteerHours: number;
  photos: string[];
  status: 'Draft' | 'Pending Publication' | 'Published';
  featured: boolean;
  clubName: string;
  clubId: string;
  dateReported: string;
}

export interface Orientation {
  id: string;
  name: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  facilitator: string;
  orientationType: string;
  participants: number;
  photos: string[];
  status: 'Draft' | 'Submitted';
  clubName: string;
  clubId: string;
}

export interface Installation {
  id: string;
  coverPhoto: string;
  name: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: number;
  newMembersCount: number;
  currentStrength: number;
  boardOfDirectorsCount: number;
  boardOfDirectorsSpreadsheetLink: string;
  photos: string[];
  reportedInRiPortal: boolean;
  status: 'Draft' | 'Submitted';
  clubName: string;
  clubId: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  minutes: string;
  meetingType: 'Board Meeting' | 'General Body Meeting' | 'District Meeting' | 'Zonal Meeting' | 'Committee Meeting';
  participants: number;
  startTime: string;
  endTime: string;
  photos: string[];
  audioRecordingUrl?: string;
  status: 'Draft' | 'Submitted';
  clubName: string;
  clubId: string;
}

export interface DOV {
  id: string;
  coverPhoto: string;
  name: string;
  venue: string;
  date: string;
  startTime: string;
  endTime: string;
  activityReportLink: string;
  photos: string[];
  documentsSentViaEmail: boolean;
  status: 'Draft' | 'Submitted';
  clubName: string;
  clubId: string;
}

export interface AccessRequest {
  id: string;
  name: string;
  club: string;
  role: string;
  email: string;
  phone: string;
  dateRequested: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

export interface AdminUser {
  name: string;
  email: string;
  phone: string;
  club: string;
  clubId: string;
  role: 'President' | 'Vice President' | 'Secretary' | 'District Team' | 'District Admin';
}

type AuthState = 'logged_out' | 'request_access' | 'pending' | 'approved' | 'logged_in';
type AdminView = 'dashboard' | 'club-activities' | 'orientations' | 'installations' | 'meetings' | 'dov' | 'district-admin' | 'profile' | 'settings';

interface AdminStore {
  // Auth state
  authState: AuthState;
  currentView: AdminView;
  user: AdminUser | null;
  
  // Stateful collections
  activities: ClubActivity[];
  orientations: Orientation[];
  installations: Installation[];
  meetings: Meeting[];
  dovs: DOV[];
  accessRequests: AccessRequest[];

  // Actions
  setAuthState: (state: AuthState) => void;
  setCurrentView: (view: AdminView) => void;
  setUser: (user: AdminUser | null) => void;
  login: (email: string) => Promise<boolean>;
  logout: () => void;
  submitAccessRequest: (request: Omit<AccessRequest, 'id' | 'dateRequested' | 'status'>) => void;
  approveRequest: (id: string) => void;
  rejectRequest: (id: string) => void;
  
  // Data submission
  addActivity: (activity: Omit<ClubActivity, 'id' | 'clubName' | 'clubId' | 'dateReported'>) => void;
  updateActivityStatus: (id: string, status: ClubActivity['status']) => void;
  toggleActivityFeatured: (id: string) => void;
  
  addOrientation: (orientation: Omit<Orientation, 'id' | 'clubName' | 'clubId'>) => void;
  addInstallation: (installation: Omit<Installation, 'id' | 'clubName' | 'clubId'>) => void;
  addMeeting: (meeting: Omit<Meeting, 'id' | 'clubName' | 'clubId'>) => void;
  addDov: (dov: Omit<DOV, 'id' | 'clubName' | 'clubId'>) => void;
}

export const useAdminStore = create<AdminStore>((set, get) => ({
  authState: 'logged_out',
  currentView: 'dashboard',
  user: null,

  // Rich initial mock database
  activities: [
    {
      id: 'act-1',
      coverPhoto: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&w=800&q=80',
      title: 'Water Oasis filtration system installation',
      venue: 'Siddapura Slum School',
      description: 'Setup clean drinking RO water plant for 400 school children.',
      startDate: '2026-05-10',
      endDate: '2026-05-10',
      endDateSameAsStart: true,
      activityType: 'Standalone Activity',
      externalNgoInvolved: false,
      avenueOfService: ['Community Service'],
      areaOfFocus: ['Water, Sanitation and Hygiene'],
      expensesInr: 45000,
      cashContributionInr: 30000,
      inKindContributionInr: 15000,
      participantsCount: 30,
      beneficiariesCount: 400,
      volunteersCount: 12,
      volunteerHours: 48,
      photos: ['https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&w=800&q=80'],
      status: 'Published',
      featured: true,
      clubName: 'Rotaract Club of Bengaluru East',
      clubId: 'c1',
      dateReported: '2026-05-11'
    },
    {
      id: 'act-2',
      coverPhoto: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
      title: 'Vikas: Digital Literacy Hub',
      venue: 'Malleshwaram Government High School',
      description: 'Launched a state of the art computer lab with 10 desk PCs.',
      startDate: '2026-05-15',
      endDate: '2026-05-16',
      endDateSameAsStart: false,
      activityType: 'Collaborative Activity',
      externalNgoInvolved: true,
      externalNgoName: 'Rotary Club of Malleshwaram',
      avenueOfService: ['Professional Development Service', 'Club Service'],
      areaOfFocus: ['Basic Education and Literacy'],
      expensesInr: 180000,
      cashContributionInr: 150000,
      inKindContributionInr: 30000,
      participantsCount: 150,
      beneficiariesCount: 200,
      volunteersCount: 18,
      volunteerHours: 72,
      photos: ['https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80'],
      status: 'Pending Publication',
      featured: false,
      clubName: 'Rotaract Club of Malleshwaram',
      clubId: 'c7',
      dateReported: '2026-05-17'
    }
  ],

  orientations: [
    {
      id: 'ori-1',
      name: 'Rotaract 101: Navigating the Currents',
      venue: 'Zoom Virtual Meeting Room',
      date: '2026-05-02',
      startTime: '10:00',
      endTime: '12:30',
      facilitator: 'PDRR Rtr. Shivkumar',
      orientationType: 'New Member Orientation',
      participants: 45,
      photos: [],
      status: 'Submitted',
      clubName: 'Rotaract Club of Bengaluru East',
      clubId: 'c1'
    }
  ],

  installations: [
    {
      id: 'inst-1',
      coverPhoto: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
      name: '32nd Installation Ceremony: Ocean of Service',
      venue: 'Alliance Francaise Auditorium',
      date: '2026-07-05',
      startTime: '17:30',
      endTime: '21:00',
      participants: 220,
      newMembersCount: 14,
      currentStrength: 52,
      boardOfDirectorsCount: 15,
      boardOfDirectorsSpreadsheetLink: 'https://docs.google.com/spreadsheets/example',
      photos: [],
      reportedInRiPortal: true,
      status: 'Submitted',
      clubName: 'Rotaract Club of Bengaluru East',
      clubId: 'c1'
    }
  ],

  meetings: [
    {
      id: 'meet-1',
      title: 'First Board Meeting - Sea of Opportunities',
      date: '2026-05-08',
      minutes: 'Discussed clean water drive logistics and verified incoming points budget.',
      meetingType: 'Board Meeting',
      participants: 12,
      startTime: '19:30',
      endTime: '21:00',
      photos: [],
      status: 'Submitted',
      clubName: 'Rotaract Club of Bengaluru East',
      clubId: 'c1'
    }
  ],

  dovs: [
    {
      id: 'dov-1',
      coverPhoto: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      name: 'District Official Visit of DRR Gautham Siddharth',
      venue: 'Indiranagar Club Hall',
      date: '2026-05-20',
      startTime: '18:00',
      endTime: '21:00',
      activityReportLink: 'https://drive.google.com/example-report.pdf',
      photos: [],
      documentsSentViaEmail: true,
      status: 'Submitted',
      clubName: 'Rotaract Club of Indiranagar',
      clubId: 'c2'
    }
  ],

  accessRequests: [
    {
      id: 'req-1',
      name: 'Rtr. Rohan Das',
      club: 'Rotaract Club of Whitefield',
      role: 'President',
      email: 'rohan.das@rotaract3192.org',
      phone: '+91 99887 76655',
      dateRequested: '2026-06-02',
      status: 'Pending'
    },
    {
      id: 'req-2',
      name: 'Rtr. Sneha Iyer',
      club: 'Rotaract Club of Koramangala',
      role: 'Secretary',
      email: 'sneha.iyer@rotaract3192.org',
      phone: '+91 88776 65544',
      dateRequested: '2026-06-03',
      status: 'Pending'
    }
  ],

  // Actions
  setAuthState: (state) => set({ authState: state }),
  setCurrentView: (view) => set({ currentView: view }),
  setUser: (user) => set({ user }),

  login: async (email) => {
    // Check if the user is a district admin
    if (email.toLowerCase().includes('admin')) {
      const adminUser: AdminUser = {
        name: 'District Admin',
        email: email,
        phone: '+91 90000 00000',
        club: 'District Secretariat',
        clubId: 'district_sec',
        role: 'District Admin'
      };
      set({
        user: adminUser,
        authState: 'logged_in',
        currentView: 'dashboard'
      });
      return true;
    }

    // Default: Login matches one of the requests or mock president
    const matchedClub = mockClubs[0]; // Bengaluru East
    const matchedUser: AdminUser = {
      name: 'Rtr. Ananya Sharma',
      email: email,
      phone: '+91 98765 43210',
      club: matchedClub.name,
      clubId: matchedClub.id,
      role: 'President'
    };

    set({
      user: matchedUser,
      authState: 'logged_in',
      currentView: 'dashboard'
    });
    return true;
  },

  logout: () => set({ user: null, authState: 'logged_out', currentView: 'dashboard' }),

  submitAccessRequest: (request) => {
    const newRequest: AccessRequest = {
      ...request,
      id: `req-${Date.now()}`,
      dateRequested: new Date().toISOString().split('T')[0],
      status: 'Pending'
    };

    set((state) => ({
      accessRequests: [newRequest, ...state.accessRequests],
      authState: 'pending' // Moves user to Pending screen
    }));
  },

  approveRequest: (id) => {
    set((state) => {
      const updatedRequests = state.accessRequests.map((req) => 
        req.id === id ? { ...req, status: 'Approved' as const } : req
      );
      
      // If the currently pending user was approved
      const currentPendingReq = updatedRequests.find(r => r.id === id);
      if (currentPendingReq && state.authState === 'pending') {
        const matchingClub = mockClubs.find(c => c.name === currentPendingReq.club) || mockClubs[0];
        
        return {
          accessRequests: updatedRequests,
          user: {
            name: currentPendingReq.name,
            email: currentPendingReq.email,
            phone: currentPendingReq.phone,
            club: currentPendingReq.club,
            clubId: matchingClub.id,
            role: currentPendingReq.role as AdminUser['role']
          },
          authState: 'approved' // Moves user to Screen 4 (Approved - Enter Dashboard)
        };
      }

      return { accessRequests: updatedRequests };
    });
  },

  rejectRequest: (id) => {
    set((state) => ({
      accessRequests: state.accessRequests.map((req) => 
        req.id === id ? { ...req, status: 'Rejected' as const } : req
      )
    }));
  },

  addActivity: (activity) => {
    const user = get().user;
    if (!user) return;

    const newActivity: ClubActivity = {
      ...activity,
      id: `act-${Date.now()}`,
      clubName: user.club,
      clubId: user.clubId,
      dateReported: new Date().toISOString().split('T')[0],
      featured: false
    };

    set((state) => ({
      activities: [newActivity, ...state.activities]
    }));
  },

  updateActivityStatus: (id, status) => {
    set((state) => ({
      activities: state.activities.map((act) => 
        act.id === id ? { ...act, status } : act
      )
    }));
  },

  toggleActivityFeatured: (id) => {
    set((state) => ({
      activities: state.activities.map((act) => 
        act.id === id ? { ...act, featured: !act.featured } : act
      )
    }));
  },

  addOrientation: (orientation) => {
    const user = get().user;
    if (!user) return;

    const newOrientation: Orientation = {
      ...orientation,
      id: `ori-${Date.now()}`,
      clubName: user.club,
      clubId: user.clubId
    };

    set((state) => ({
      orientations: [newOrientation, ...state.orientations]
    }));
  },

  addInstallation: (installation) => {
    const user = get().user;
    if (!user) return;

    const newInstallation: Installation = {
      ...installation,
      id: `inst-${Date.now()}`,
      clubName: user.club,
      clubId: user.clubId
    };

    set((state) => ({
      installations: [newInstallation, ...state.installations]
    }));
  },

  addMeeting: (meeting) => {
    const user = get().user;
    if (!user) return;

    const newMeeting: Meeting = {
      ...meeting,
      id: `meet-${Date.now()}`,
      clubName: user.club,
      clubId: user.clubId
    };

    set((state) => ({
      meetings: [newMeeting, ...state.meetings]
    }));
  },

  addDov: (dov) => {
    const user = get().user;
    if (!user) return;

    const newDov: DOV = {
      ...dov,
      id: `dov-${Date.now()}`,
      clubName: user.club,
      clubId: user.clubId
    };

    set((state) => ({
      dovs: [newDov, ...state.dovs]
    }));
  }
}));
