import { Building2, Users, MapPin, Award, Target, Eye, Phone, Mail } from 'lucide-react';

const LEADERS = [
  { name: 'Dr. Ravi Shankar Gupta', role: 'Municipal Commissioner', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop' },
  { name: 'Ms. Ananya Krishnamurthy', role: 'Deputy Commissioner', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop' },
  { name: 'Mr. Sanjay Mehta', role: 'Chief Engineer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Ms. Preethi Nair', role: 'Smart City Director', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop' },
];

const MILESTONES = [
  { year: '2019', event: 'Smart City Mission Selection', desc: 'SmartCity selected under National Smart City Mission' },
  { year: '2020', event: 'Digital Portal Launch', desc: 'Online citizen services portal launched with 12 services' },
  { year: '2021', event: 'IoT Sensor Network', desc: '142 smart sensors deployed across the city' },
  { year: '2022', event: 'Complaint Management System', desc: 'AI-powered complaint routing and tracking launched' },
  { year: '2023', event: 'Green City Award', desc: 'Received National Green City Excellence Award' },
  { year: '2024', event: 'Smart City 2.0', desc: 'Expanded portal with real-time monitoring and analytics' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="hero-gradient py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} />
          </div>
          <h1 className="font-display text-4xl font-bold mb-3">About SmartCity</h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto leading-relaxed">
            SmartCity Municipal Corporation serves 4.2 million citizens across 14 wards with transparent, technology-driven governance.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { icon: Users, label: 'Population', value: '4.2M' },
            { icon: MapPin, label: 'Area', value: '680 km²' },
            { icon: Building2, label: 'Wards', value: '14' },
            { icon: Award, label: 'Awards Won', value: '23' },
          ].map(s => (
            <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 text-center shadow-sm">
              <div className="w-10 h-10 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                <s.icon size={20} className="text-[#1e3a5f]" />
              </div>
              <div className="font-display font-bold text-2xl text-[#1e3a5f]">{s.value}</div>
              <div className="text-xs text-slate-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <div className="bg-[#1e3a5f] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Target size={22} className="text-teal-300" />
              <h3 className="font-display font-bold text-lg">Our Mission</h3>
            </div>
            <p className="text-slate-200 leading-relaxed">
              To deliver efficient, transparent, and citizen-centric governance using smart technology, ensuring equitable access to quality services for all residents of SmartCity.
            </p>
          </div>
          <div className="bg-[#0d9488] rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <Eye size={22} className="text-white/80" />
              <h3 className="font-display font-bold text-lg">Our Vision</h3>
            </div>
            <p className="text-emerald-50 leading-relaxed">
              To be India's most livable, sustainable, and technologically advanced city — where citizens and government work together to create a thriving urban future.
            </p>
          </div>
        </div>

        {/* Leadership */}
        <h2 className="font-display font-bold text-2xl text-[#1e3a5f] mb-6">City Leadership</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-12">
          {LEADERS.map(leader => (
            <div key={leader.name} className="bg-white border border-slate-200 rounded-xl p-4 text-center shadow-sm card-hover">
              <img src={leader.img} alt={leader.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-2 border-slate-100" />
              <div className="font-display font-semibold text-sm text-slate-800">{leader.name}</div>
              <div className="text-xs text-[#0d9488] mt-0.5">{leader.role}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="font-display font-bold text-2xl text-[#1e3a5f] mb-6">Our Journey</h2>
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-12">
          <div className="relative">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="timeline-item">
                {i < MILESTONES.length - 1 && <div className="timeline-line bg-[#0d9488]/30"></div>}
                <div className="timeline-dot bg-[#0d9488]"></div>
                <div>
                  <div className="flex items-center gap-3 mb-0.5">
                    <span className="font-mono font-bold text-[#0d9488]">{m.year}</span>
                    <span className="font-display font-semibold text-slate-800">{m.event}</span>
                  </div>
                  <p className="text-sm text-slate-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="bg-[#1e3a5f] rounded-2xl p-8 text-white">
          <h2 className="font-display font-bold text-2xl mb-6">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, label: 'Address', value: 'City Hall, Civic Center Road\nSmartCity – 560001' },
              { icon: Phone, label: 'Helpline', value: '1800-111-SMART\nMon-Sat, 9 AM – 6 PM' },
              { icon: Mail, label: 'Email', value: 'contact@smartcity.gov.in\ngrievances@smartcity.gov.in' },
            ].map(c => (
              <div key={c.label} className="flex gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                  <c.icon size={18} className="text-teal-300" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">{c.label}</div>
                  <div className="text-sm text-white whitespace-pre-line">{c.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
