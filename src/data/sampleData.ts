export type ComplaintStatus = 'Pending' | 'Under Review' | 'In Progress' | 'Resolved' | 'Rejected';
export type ComplaintCategory = 'Roads & Infrastructure' | 'Water Supply' | 'Electricity' | 'Garbage & Sanitation' | 'Public Safety' | 'Parks & Recreation' | 'Noise Pollution' | 'Street Lighting' | 'Traffic' | 'Other';

export interface Complaint {
  id: string;
  category: ComplaintCategory;
  description: string;
  location: string;
  ward: string;
  name: string;
  phone: string;
  email: string;
  status: ComplaintStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  createdAt: string;
  updatedAt: string;
  timeline: { status: ComplaintStatus; note: string; date: string }[];
  image?: string;
  source?: 'Online Service' | 'Citizen Report';
}

export interface Announcement {
  id: string;
  title: string;
  category: 'General' | 'Emergency' | 'Infrastructure' | 'Events' | 'Policy';
  content: string;
  date: string;
  urgent: boolean;
}

export interface Service {
  id: string;
  name: string;
  department: string;
  description: string;
  icon: string;
  phone: string;
  email: string;
  hours: string;
  location: string;
  online: boolean;
}

const generateId = () => {
  const prefix = 'SC';
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `${prefix}${year}${num}`;
};

export const SAMPLE_COMPLAINTS: Complaint[] = [
  {
    id: 'SC2024-10001',
    category: 'Roads & Infrastructure',
    description: 'Large pothole on MG Road near City Mall causing vehicle damage and traffic issues. The pothole is approximately 2 feet wide and has been there for over 3 weeks.',
    location: 'MG Road, near City Mall, Ward 12',
    ward: 'Ward 12',
    name: 'Rajesh Kumar',
    phone: '+91-9876543210',
    email: 'rajesh.kumar@email.com',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2024-11-01T10:30:00Z',
    updatedAt: '2024-11-05T14:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered successfully.', date: '2024-11-01T10:30:00Z' },
      { status: 'Under Review', note: 'Field inspection team assigned to assess the damage.', date: '2024-11-02T09:00:00Z' },
      { status: 'In Progress', note: 'Road repair crew dispatched. Work expected to complete in 3-4 days.', date: '2024-11-05T14:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10002',
    category: 'Water Supply',
    description: 'No water supply for the past 5 days in Block C of Riverside Apartments. Multiple families are affected and relying on tanker water.',
    location: 'Riverside Apartments, Block C, Ward 7',
    ward: 'Ward 7',
    name: 'Priya Sharma',
    phone: '+91-9123456789',
    email: 'priya.sharma@email.com',
    status: 'Resolved',
    priority: 'Critical',
    createdAt: '2024-10-28T08:00:00Z',
    updatedAt: '2024-10-31T16:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered.', date: '2024-10-28T08:00:00Z' },
      { status: 'Under Review', note: 'Water department notified. Main pipe rupture identified.', date: '2024-10-28T11:00:00Z' },
      { status: 'In Progress', note: 'Emergency repair team deployed to fix the main pipe.', date: '2024-10-29T07:00:00Z' },
      { status: 'Resolved', note: 'Main pipe repaired. Water supply restored to all units.', date: '2024-10-31T16:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10003',
    category: 'Street Lighting',
    description: '8 street lights are non-functional on Heritage Street between the bus stop and the park entrance. This is causing safety concerns for pedestrians at night.',
    location: 'Heritage Street, Ward 3',
    ward: 'Ward 3',
    name: 'Arun Patel',
    phone: '+91-9988776655',
    email: 'arun.patel@email.com',
    status: 'Under Review',
    priority: 'Medium',
    createdAt: '2024-11-03T19:00:00Z',
    updatedAt: '2024-11-04T10:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered.', date: '2024-11-03T19:00:00Z' },
      { status: 'Under Review', note: 'Electricity department engineer assigned for inspection.', date: '2024-11-04T10:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10004',
    category: 'Garbage & Sanitation',
    description: 'Garbage collection has not happened for 10 days in Sector 5. Waste is piling up at collection points creating health hazards and foul odor.',
    location: 'Sector 5, Near Community Center, Ward 9',
    ward: 'Ward 9',
    name: 'Meera Nair',
    phone: '+91-9765432109',
    email: 'meera.nair@email.com',
    status: 'Pending',
    priority: 'High',
    createdAt: '2024-11-06T09:00:00Z',
    updatedAt: '2024-11-06T09:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered. Awaiting assignment.', date: '2024-11-06T09:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10005',
    category: 'Public Safety',
    description: 'CCTV cameras near the women\'s college on Lake Road have been damaged and non-functional for 2 weeks. This is creating safety concerns for students.',
    location: 'Lake Road, Near Women\'s College, Ward 5',
    ward: 'Ward 5',
    name: 'Suresh Reddy',
    phone: '+91-9543216789',
    email: 'suresh.reddy@email.com',
    status: 'In Progress',
    priority: 'Critical',
    createdAt: '2024-10-25T11:00:00Z',
    updatedAt: '2024-11-01T09:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered.', date: '2024-10-25T11:00:00Z' },
      { status: 'Under Review', note: 'Police department and IT infrastructure team notified.', date: '2024-10-26T10:00:00Z' },
      { status: 'In Progress', note: 'New cameras ordered. Installation scheduled for next week.', date: '2024-11-01T09:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10006',
    category: 'Electricity',
    description: 'Frequent power cuts in the evening hours (6 PM to 10 PM) in Green Valley Housing Society. This has been happening for 3 weeks.',
    location: 'Green Valley Housing Society, Ward 14',
    ward: 'Ward 14',
    name: 'Kavitha Krishnan',
    phone: '+91-9654321098',
    email: 'kavitha.k@email.com',
    status: 'Resolved',
    priority: 'Medium',
    createdAt: '2024-10-20T18:30:00Z',
    updatedAt: '2024-10-27T12:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered.', date: '2024-10-20T18:30:00Z' },
      { status: 'Under Review', note: 'BESCOM engineer assigned to investigate.', date: '2024-10-21T09:00:00Z' },
      { status: 'In Progress', note: 'Faulty transformer identified. Replacement ordered.', date: '2024-10-23T14:00:00Z' },
      { status: 'Resolved', note: 'Transformer replaced. Power supply stable.', date: '2024-10-27T12:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10007',
    category: 'Noise Pollution',
    description: 'Construction work happening 24/7 near residential buildings on Park Avenue, violating noise pollution norms. This is affecting sleep and health of residents.',
    location: 'Park Avenue, Ward 8',
    ward: 'Ward 8',
    name: 'Vikram Singh',
    phone: '+91-9432109876',
    email: 'vikram.singh@email.com',
    status: 'Rejected',
    priority: 'Low',
    createdAt: '2024-11-02T22:00:00Z',
    updatedAt: '2024-11-04T15:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered.', date: '2024-11-02T22:00:00Z' },
      { status: 'Under Review', note: 'Site inspection conducted.', date: '2024-11-03T11:00:00Z' },
      { status: 'Rejected', note: 'Construction site has valid permit for extended hours due to metro project deadline. No violation found.', date: '2024-11-04T15:00:00Z' }
    ]
  },
  {
    id: 'SC2024-10008',
    category: 'Parks & Recreation',
    description: 'Swings and slides in Central Park (near Fountain) are broken and rusted. Children have been injured. Immediate repair needed.',
    location: 'Central Park, Near Fountain, Ward 1',
    ward: 'Ward 1',
    name: 'Anita Desai',
    phone: '+91-9876123456',
    email: 'anita.desai@email.com',
    status: 'In Progress',
    priority: 'High',
    createdAt: '2024-11-04T15:00:00Z',
    updatedAt: '2024-11-06T08:00:00Z',
    timeline: [
      { status: 'Pending', note: 'Complaint registered.', date: '2024-11-04T15:00:00Z' },
      { status: 'Under Review', note: 'Parks department conducting safety assessment.', date: '2024-11-05T10:00:00Z' },
      { status: 'In Progress', note: 'Damaged equipment cordoned off. Repair contractor engaged.', date: '2024-11-06T08:00:00Z' }
    ]
  }
];

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-001',
    title: 'Smart City Water Conservation Drive – November 2024',
    category: 'General',
    content: 'The SmartCity Water Authority is launching a city-wide water conservation campaign from November 10-30, 2024. Citizens are urged to report water leakages, and households reducing water consumption by 20% will receive special incentives. Free water audit kits available at Ward offices.',
    date: '2024-11-07T09:00:00Z',
    urgent: false
  },
  {
    id: 'ann-002',
    title: 'EMERGENCY: Cyclone Advisory – Coastal Areas',
    category: 'Emergency',
    content: 'A cyclone warning has been issued for coastal wards (1, 2, 7, and 8). Residents in low-lying areas must evacuate to designated relief centers immediately. Emergency helpline: 1800-XXX-XXXX. Government vehicles available for evacuation at community centers.',
    date: '2024-11-06T06:00:00Z',
    urgent: true
  },
  {
    id: 'ann-003',
    title: 'Metro Phase 3 Construction: Traffic Advisory',
    category: 'Infrastructure',
    content: 'Metro rail phase 3 construction begins November 15, 2024 on MG Road. Sections between Junction Circle and City Mall will have alternate traffic routing. Construction hours: 6 AM to 10 PM. Motorists are advised to use alternative routes via Ring Road.',
    date: '2024-11-05T11:00:00Z',
    urgent: false
  },
  {
    id: 'ann-004',
    title: 'Annual Smart City Innovation Expo – December 2024',
    category: 'Events',
    content: 'SmartCity invites residents to the Annual Smart City Innovation Expo at Civic Center from December 15-17, 2024. Showcasing AI-powered city services, EV infrastructure, solar energy initiatives, and citizen technology projects. Free entry for all residents.',
    date: '2024-11-04T14:00:00Z',
    urgent: false
  },
  {
    id: 'ann-005',
    title: 'New Property Tax Policy – Effective January 2025',
    category: 'Policy',
    content: 'The City Council has approved revised property tax rates effective January 1, 2025. Properties with solar installations receive 10% tax rebate. Commercial properties with green certification receive 15% rebate. Details available at ward offices and city website.',
    date: '2024-11-03T10:00:00Z',
    urgent: false
  },
  {
    id: 'ann-006',
    title: 'Free Health Camp – Ward 5 & 6 Residents',
    category: 'Events',
    content: 'SmartCity Health Department organizes a free health check-up camp at District Hospital on November 20, 2024. Services include blood pressure monitoring, diabetes screening, eye testing, and dental check-up. Bring Aadhaar card. No appointment required, 8 AM to 4 PM.',
    date: '2024-11-02T16:00:00Z',
    urgent: false
  }
];

export const CITY_SERVICES: Service[] = [
  {
    id: 'svc-001',
    name: 'Birth & Death Certificate',
    department: 'Civil Registration',
    description: 'Apply for birth, death, and marriage certificates online or visit the ward office.',
    icon: 'FileText',
    phone: '1800-111-2233',
    email: 'civil@smartcity.gov',
    hours: 'Mon-Fri: 9 AM – 5 PM',
    location: 'City Hall, Ground Floor',
    online: true
  },
  {
    id: 'svc-002',
    name: 'Property Tax Payment',
    department: 'Revenue Department',
    description: 'Pay property tax online, view payment history, and download receipts.',
    icon: 'CreditCard',
    phone: '1800-222-3344',
    email: 'revenue@smartcity.gov',
    hours: 'Mon-Sat: 9 AM – 6 PM',
    location: 'Revenue Office, 2nd Floor',
    online: true
  },
  {
    id: 'svc-003',
    name: 'Water & Sewerage',
    department: 'Water Authority',
    description: 'New connections, bill payments, leak reporting, and water quality complaints.',
    icon: 'Droplets',
    phone: '1800-333-4455',
    email: 'water@smartcity.gov',
    hours: 'Mon-Sat: 8 AM – 7 PM',
    location: 'Water Board Office, Sector 3',
    online: true
  },
  {
    id: 'svc-004',
    name: 'Building Permits',
    department: 'Town Planning',
    description: 'Submit building plan approvals, renovation permits, and occupancy certificates.',
    icon: 'Building2',
    phone: '1800-444-5566',
    email: 'planning@smartcity.gov',
    hours: 'Mon-Fri: 10 AM – 4 PM',
    location: 'Planning Office, Block B',
    online: true
  },
  {
    id: 'svc-005',
    name: 'Solid Waste Management',
    department: 'Sanitation',
    description: 'Garbage collection schedules, bulk waste pickup requests, and recycling information.',
    icon: 'Trash2',
    phone: '1800-555-6677',
    email: 'sanitation@smartcity.gov',
    hours: 'Mon-Sun: 6 AM – 8 PM',
    location: 'Sanitation Dept, Ward Offices',
    online: false
  },
  {
    id: 'svc-006',
    name: 'Public Library Services',
    department: 'Education & Culture',
    description: 'Library membership, digital resource access, and cultural program registrations.',
    icon: 'BookOpen',
    phone: '1800-666-7788',
    email: 'library@smartcity.gov',
    hours: 'Tue-Sun: 8 AM – 8 PM',
    location: 'Central Library, Heritage Road',
    online: true
  },
  {
    id: 'svc-007',
    name: 'Vehicle & Driving License',
    department: 'Transport',
    description: 'License applications, renewal, vehicle registration, and road tax payment.',
    icon: 'Car',
    phone: '1800-777-8899',
    email: 'transport@smartcity.gov',
    hours: 'Mon-Fri: 9 AM – 5 PM',
    location: 'RTO Office, Bypass Road',
    online: true
  },
  {
    id: 'svc-008',
    name: 'Social Welfare Schemes',
    department: 'Social Welfare',
    description: 'Pension schemes, disability benefits, scholarship applications, and welfare program registration.',
    icon: 'Heart',
    phone: '1800-888-9900',
    email: 'welfare@smartcity.gov',
    hours: 'Mon-Fri: 9 AM – 5 PM',
    location: 'Social Welfare Office, Sector 7',
    online: true
  }
];

export const EMERGENCY_CONTACTS = [
  { name: 'Police Emergency', number: '100', icon: 'Shield', color: '#1e3a5f', description: 'Crime, accidents, public disturbance' },
  { name: 'Fire Brigade', number: '101', icon: 'Flame', color: '#dc2626', description: 'Fire emergencies, rescue operations' },
  { name: 'Ambulance', number: '102', icon: 'Stethoscope', color: '#16a34a', description: 'Medical emergencies, hospital transfer' },
  { name: 'Disaster Management', number: '108', icon: 'AlertTriangle', color: '#d97706', description: 'Natural disasters, relief operations' },
  { name: 'Traffic Police', number: '103', icon: 'Car', color: '#7c3aed', description: 'Accidents, traffic regulation' },
  { name: 'Women Helpline', number: '1091', icon: 'Users', color: '#db2777', description: 'Women safety, harassment complaints' },
  { name: 'Child Helpline', number: '1098', icon: 'Baby', color: '#ea580c', description: 'Child abuse, missing children' },
  { name: 'City Control Room', number: '1800-111-0000', icon: 'Radio', color: '#0d9488', description: 'General city emergencies & coordination' }
];

export const MONITORING_SENSORS = [
  { id: 's1', name: 'City Center AQI', x: 45, y: 38, type: 'air', value: 87, unit: 'AQI', status: 'good' },
  { id: 's2', name: 'MG Road Traffic', x: 60, y: 45, type: 'traffic', value: 'High', unit: '', status: 'alert' },
  { id: 's3', name: 'Lake Water Level', x: 25, y: 55, type: 'water', value: 4.2, unit: 'm', status: 'normal' },
  { id: 's4', name: 'North Zone AQI', x: 40, y: 20, type: 'air', value: 42, unit: 'AQI', status: 'good' },
  { id: 's5', name: 'Riverside Energy', x: 70, y: 30, type: 'energy', value: 2847, unit: 'kW', status: 'normal' },
  { id: 's6', name: 'South Ring Traffic', x: 55, y: 68, type: 'traffic', value: 'Medium', unit: '', status: 'normal' },
  { id: 's7', name: 'Market AQI', x: 35, y: 60, type: 'air', value: 134, unit: 'AQI', status: 'alert' },
  { id: 's8', name: 'Central Park Crowd', x: 48, y: 50, type: 'crowd', value: 856, unit: 'people', status: 'normal' },
];

export const ADMIN_CREDENTIALS = { username: 'admin', password: 'smartcity@2024' };

export const WARD_OPTIONS = [
  'Ward 1', 'Ward 2', 'Ward 3', 'Ward 4', 'Ward 5', 'Ward 6', 'Ward 7',
  'Ward 8', 'Ward 9', 'Ward 10', 'Ward 11', 'Ward 12', 'Ward 13', 'Ward 14'
];

export const CATEGORY_OPTIONS: ComplaintCategory[] = [
  'Roads & Infrastructure', 'Water Supply', 'Electricity', 'Garbage & Sanitation',
  'Public Safety', 'Parks & Recreation', 'Noise Pollution', 'Street Lighting', 'Traffic', 'Other'
];

export const newComplaintId = () => {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 90000) + 10000;
  return `SC${year}-${num}`;
};
