export interface Project {
  id: string;
  title: string;
  clubId: string;
  clubName: string;
  avenueOfService: 'Club Service' | 'Community Service' | 'Professional Development' | 'International Service' | 'Public Relations' | 'Public Image' | 'Next Gen';
  areaOfFocus: string;
  beneficiaries: number;
  volunteerHours: number;
  score: number; // For ranking
  uploadDate: string; // "YYYY-MM-DD"
  image: string;
  description: string;
}

export interface Club {
  id: string;
  name: string;
  president: string;
  zone: string;
  projectsCount: number;
  points: number;
  logo: string;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  clubCount: number;
  coordinates: { x: number; y: number }; // Simulated coordinate on the ocean map
}

export interface Leader {
  id: string;
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // "YYYY-MM-DD"
  type: 'District Assembly' | 'Conference' | 'Project Drive' | 'Seminar';
  description: string;
}

// 12 High-fidelity Mock Clubs in District 3192
export const mockClubs: Club[] = [
  { id: 'c1', name: 'Rotaract Club of Bengaluru East', president: 'Rtr. Ananya Sharma', zone: 'Zone 1', projectsCount: 42, points: 2450, logo: 'BE' },
  { id: 'c2', name: 'Rotaract Club of Indiranagar', president: 'Rtr. Vikram Aditya', zone: 'Zone 1', projectsCount: 38, points: 2600, logo: 'RI' },
  { id: 'c3', name: 'Rotaract Club of Koramangala', president: 'Rtr. Sneha Iyer', zone: 'Zone 2', projectsCount: 35, points: 2100, logo: 'RK' },
  { id: 'c4', name: 'Rotaract Club of Whitefield', president: 'Rtr. Rohan Das', zone: 'Zone 3', projectsCount: 45, points: 2890, logo: 'RW' },
  { id: 'c5', name: 'Rotaract Club of Jayanagar', president: 'Rtr. Meera Krishnan', zone: 'Zone 2', projectsCount: 31, points: 1950, logo: 'RJ' },
  { id: 'c6', name: 'Rotaract Club of Hebbal', president: 'Rtr. Arjun Nair', zone: 'Zone 4', projectsCount: 29, points: 1720, logo: 'RH' },
  { id: 'c7', name: 'Rotaract Club of Malleshwaram', president: 'Rtr. Pooja Hegde', zone: 'Zone 4', projectsCount: 26, points: 1540, logo: 'RM' },
  { id: 'c8', name: 'Rotaract Club of Banashankari', president: 'Rtr. Karthik Gowda', zone: 'Zone 5', projectsCount: 23, points: 1390, logo: 'RB' },
  { id: 'c9', name: 'Rotaract Club of Yelahanka', president: 'Rtr. Deepika Roy', zone: 'Zone 4', projectsCount: 21, points: 1220, logo: 'RY' },
  { id: 'c10', name: 'Rotaract Club of HSR Layout', president: 'Rtr. Rahul Shenoy', zone: 'Zone 2', projectsCount: 28, points: 1810, logo: 'RHSR' },
  { id: 'c11', name: 'Rotaract Club of Electronic City', president: 'Rtr. Divya Patil', zone: 'Zone 3', projectsCount: 33, points: 2050, logo: 'REC' },
  { id: 'c12', name: 'Rotaract Club of Rajajinagar', president: 'Rtr. Sandeep Rao', zone: 'Zone 5', projectsCount: 19, points: 1100, logo: 'RRJ' }
];

// Rich set of projects to test sorting/ranking logic
// Higher Score = higher rank. If Score matches, earlier Upload Date = higher rank.
export const mockProjects: Project[] = [
  {
    id: 'p1',
    title: 'Project Oceanus: Lake Restoration Drive',
    clubId: 'c4',
    clubName: 'Rotaract Club of Whitefield',
    avenueOfService: 'Community Service',
    areaOfFocus: 'Environment & Water',
    beneficiaries: 1800,
    volunteerHours: 320,
    score: 98,
    uploadDate: '2026-04-12',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive rejuvenation campaign for the local freshwater bodies, including silt removal, bund stabilization, and planting native trees around the perimeter.'
  },
  {
    id: 'p2',
    title: 'Digital Reef: Classrooms of Tomorrow',
    clubId: 'c2',
    clubName: 'Rotaract Club of Indiranagar',
    avenueOfService: 'Professional Development',
    areaOfFocus: 'Education & Literacy',
    beneficiaries: 1200,
    volunteerHours: 240,
    score: 95,
    uploadDate: '2026-03-15',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80',
    description: 'Providing coding camps, digital infrastructure, and smart boards to three underprivileged public schools, enabling technology-driven learning pathways.'
  },
  {
    id: 'p3',
    title: 'Flowing Currents: Clean Water Assembly',
    clubId: 'c1',
    clubName: 'Rotaract Club of Bengaluru East',
    avenueOfService: 'Community Service',
    areaOfFocus: 'Water & Sanitation',
    beneficiaries: 2500,
    volunteerHours: 450,
    score: 95, // Matches Project 2 in Score, but uploaded later (2026-03-28 vs 2026-03-15) -> Should rank BELOW Project 2
    uploadDate: '2026-03-28',
    image: 'https://images.unsplash.com/photo-1541944743827-e04aa6427c33?auto=format&fit=crop&w=800&q=80',
    description: 'Installing state-of-the-art community water purification plants in suburban sectors, giving 500+ families reliable access to safe drinking water.'
  },
  {
    id: 'p4',
    title: 'Project Coral: Women Entrepreneurship Hub',
    clubId: 'c3',
    clubName: 'Rotaract Club of Koramangala',
    avenueOfService: 'Professional Development',
    areaOfFocus: 'Economic Development',
    beneficiaries: 350,
    volunteerHours: 180,
    score: 92,
    uploadDate: '2026-05-01',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    description: 'An incubator program offering vocational training, financial literacy workshops, and micro-grants to aspiring female entrepreneurs from low-income groups.'
  },
  {
    id: 'p5',
    title: 'District Tide: Youth Leadership Summit',
    clubId: 'c1',
    clubName: 'Rotaract Club of Bengaluru East',
    avenueOfService: 'Next Gen',
    areaOfFocus: 'Leadership Development',
    beneficiaries: 500,
    volunteerHours: 120,
    score: 90,
    uploadDate: '2026-02-10',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
    description: 'A multi-day intensive residential bootcamp for rotaractors, focusing on conflict resolution, project management, and global diplomatic strategies.'
  },
  {
    id: 'p6',
    title: 'Global Ripples: Cross-Border Peace Exchange',
    clubId: 'c11',
    clubName: 'Rotaract Club of Electronic City',
    avenueOfService: 'International Service',
    areaOfFocus: 'Peace & Conflict Resolution',
    beneficiaries: 400,
    volunteerHours: 95,
    score: 89,
    uploadDate: '2026-04-05',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80',
    description: 'A joint initiative with Rotaract clubs in Germany and Japan, facilitating digital summits, cultural trade forums, and collaborative global service efforts.'
  },
  {
    id: 'p7',
    title: 'Eco-Current: Re-wilding Urban Spaces',
    clubId: 'c5',
    clubName: 'Rotaract Club of Jayanagar',
    avenueOfService: 'Community Service',
    areaOfFocus: 'Environment & Forestry',
    beneficiaries: 950,
    volunteerHours: 310,
    score: 95, // Matches Score 95 of p2 and p3. Upload Date is 2026-02-20. Ranks: p2 (Mar 15), p3 (Mar 28), p7 (Feb 20).
    // Sorting order for score 95: p7 (Feb 20) -> p2 (Mar 15) -> p3 (Mar 28). Let's verify!
    uploadDate: '2026-02-20',
    image: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    description: 'Planting Miyawaki forests inside urban concrete hubs to boost local biodiversity, absorb carbon emissions, and reduce regional heat island effects.'
  },
  {
    id: 'p8',
    title: 'Project Blue: Marine Life Awareness Campaign',
    clubId: 'c10',
    clubName: 'Rotaract Club of HSR Layout',
    avenueOfService: 'Public Image',
    areaOfFocus: 'Environment Protection',
    beneficiaries: 3000,
    volunteerHours: 85,
    score: 87,
    uploadDate: '2026-05-10',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    description: 'An interactive virtual exhibition and street art festival illustrating the hazards of single-use plastics on marine ecosystems.'
  },
  {
    id: 'p9',
    title: 'Ripple of Hope: Pediatric Medical Camp',
    clubId: 'c6',
    clubName: 'Rotaract Club of Hebbal',
    avenueOfService: 'Community Service',
    areaOfFocus: 'Maternal & Child Health',
    beneficiaries: 850,
    volunteerHours: 200,
    score: 91,
    uploadDate: '2026-04-18',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    description: 'A comprehensive free pediatric medical screening camp for remote villages, providing medicines, vision checks, and nutrition workshops.'
  },
  {
    id: 'p10',
    title: 'Deep Impact: Clean Energy Solar Pods',
    clubId: 'c7',
    clubName: 'Rotaract Club of Malleshwaram',
    avenueOfService: 'Community Service',
    areaOfFocus: 'Economic & Energy Development',
    beneficiaries: 600,
    volunteerHours: 160,
    score: 88,
    uploadDate: '2026-03-30',
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    description: 'Deploying custom solar lighting grids in community centers and public spaces of off-grid rural communities to promote nighttime education and safety.'
  }
];

export const mockZones: Zone[] = [
  { id: 'z1', name: 'Zone 1', description: 'Bengaluru Central & East districts featuring highly active urban clubs.', clubCount: 28, coordinates: { x: 30, y: 45 } },
  { id: 'z2', name: 'Zone 2', description: 'South Bengaluru region focusing on digital classrooms and microfinance projects.', clubCount: 32, coordinates: { x: 45, y: 70 } },
  { id: 'z3', name: 'Zone 3', description: 'IT Corridor of Whitefield & Electronic City driving tech education and lake restorations.', clubCount: 22, coordinates: { x: 75, y: 55 } },
  { id: 'z4', name: 'Zone 4', description: 'North Bengaluru & Yelahanka zones conducting extensive rural medical programs.', clubCount: 24, coordinates: { x: 50, y: 25 } },
  { id: 'z5', name: 'Zone 5', description: 'Western suburbs leading environmental re-wilding initiatives.', clubCount: 14, coordinates: { x: 20, y: 65 } }
];

export const mockLeaders: Leader[] = [
  {
    id: 'l1',
    name: 'Rtr. Gautham Siddharth',
    role: 'District Rotaract Representative (DRR)',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    quote: 'Our impact is a collective current. Each project we upload is a ripple that helps shape our ocean of community leadership. Welcome to District 3192.'
  },
  {
    id: 'l2',
    name: 'Rtr. Megha Kulkarni',
    role: 'District General Secretary',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    quote: 'Data meets storytelling on this platform. By showcasing projects transparently, we empower sponsors and volunteers to dive deeper into our mission.'
  },
  {
    id: 'l3',
    name: 'Rtr. Sandeep Hegde',
    role: 'District Project Chair',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    quote: 'We rank projects not to compete, but to inspire excellence. The points earned reflect hours of sweat and tears dedicated to service.'
  }
];

export const mockEvents: CalendarEvent[] = [
  { id: 'e1', title: 'District Leadership Assembly 2026', date: '2026-06-25', type: 'District Assembly', description: 'Training sessions and alignment meeting for all incoming club presidents and board members.' },
  { id: 'e2', title: 'Oceanic Wave: Annual District Conference', date: '2026-08-14', type: 'Conference', description: 'The flagship annual gathering of Rotaract District 3192 to celebrate our collective achievements.' },
  { id: 'e3', title: 'Eco-Grid Reforestation Mega Drive', date: '2026-09-05', type: 'Project Drive', description: 'Targeting planting of 10,000 saplings across the dry zones of Zone 4 & 5.' },
  { id: 'e4', title: 'Avenues of Service Incubation Seminar', date: '2026-10-10', type: 'Seminar', description: 'A detailed workshop covering project scoping, grant applications, and public image strategies.' }
];

export const districtStats = {
  projects: 450,
  beneficiaries: 12000,
  volunteers: 2500,
  volunteerHours: 50000,
  clubsCount: 120,
  contributionsRaised: 850000 // In Rupees or USD
};
