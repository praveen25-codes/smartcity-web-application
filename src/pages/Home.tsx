import { Link } from 'react-router-dom';
import { FileText, Search, Map, AlertTriangle, Megaphone, Building2, Users, CheckCircle, Clock, ChevronRight, ArrowRight, Zap, Droplets, Car, Shield } from 'lucide-react';
import { ANNOUNCEMENTS, SAMPLE_COMPLAINTS } from '../data/sampleData';

const STATS = [
  { label: 'Complaints Resolved', value: '12,847', icon: CheckCircle, color: '#0d9488' },
  { label: 'Active Cases', value: '1,203', icon: Clock, color: '#2563eb' },
  { label: 'Citizens Served', value: '4.2M', icon: Users, color: '#7c3aed' },
  { label: 'Wards Covered', value: '14', icon: Building2, color: '#d97706' },
];

const QUICK_ACTIONS = [
  { icon: FileText, label: 'Report Complaint', desc: 'Lodge a civic issue', path: '/report', color: 'bg-blue-600' },
  { icon: Search, label: 'Track Status', desc: 'Check your complaint', path: '/track', color: 'bg-teal-600' },
  { icon: Map, label: 'City Monitor', desc: 'Live city sensors', path: '/monitoring', color: 'bg-indigo-600' },
  { icon: AlertTriangle, label: 'Emergency', desc: 'Emergency contacts', path: '/emergency', color: 'bg-red-600' },
  { icon: Megaphone, label: 'Announcements', desc: 'Latest city news', path: '/announcements', color: 'bg-amber-600' },
  { icon: Building2, label: 'City Services', desc: 'Government services', path: '/services', color: 'bg-purple-600' },
];

const HIGHLIGHTS = [
  { icon: Zap, label: 'Smart Energy Grid', value: '98.2%', sub: 'Uptime this month', color: '#2563eb' },
  { icon: Droplets, label: 'Water Coverage', value: '99.1%', sub: 'Households served', color: '#0d9488' },
  { icon: Car, label: 'Traffic Incidents', value: '↓ 23%', sub: 'vs last quarter', color: '#7c3aed' },
  { icon: Shield, label: 'Safety Index', value: 'A+', sub: 'National ranking', color: '#16a34a' },
];

const statusColor: Record<string, string> = {
  'Pending': 'status-pending',
  'Under Review': 'status-review',
  'In Progress': 'status-progress',
  'Resolved': 'status-resolved',
  'Rejected': 'status-rejected',
};

export default function Home() {
  const recent = SAMPLE_COMPLAINTS.slice(0, 4);
  const urgent = ANNOUNCEMENTS.filter(a => a.urgent);
  const latestAnn = ANNOUNCEMENTS.slice(0, 3);

  return (
    <div>
      {/* Emergency Banner */}
      {urgent.length > 0 && (
        <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-medium animate-pulse">
          ⚠ ALERT: {urgent[0].title} — <Link to="/announcements" className="underline">View Details</Link>
        </div>
      )}

      {/* Hero */}
      <section className="hero-gradient relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/20 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-teal-300 rounded-full animate-pulse"></span>
              Serving 4.2 Million Citizens
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
              Your Smart City,<br /><span className="text-teal-300">Your Voice</span>
            </h1>
            <p className="text-slate-200 text-lg mb-8 leading-relaxed">
              SmartCity connects citizens with government services, real-time monitoring, and transparent complaint resolution — making governance responsive, efficient, and open.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/report" className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition shadow-lg">
                Report an Issue <ArrowRight size={16} />
              </Link>
              <Link to="/track" className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition border border-white/30">
                Track Complaint <Search size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map(stat => (
              <div key={stat.label} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                  <stat.icon size={22} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="font-display font-bold text-2xl text-slate-800">{stat.value}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="font-display font-bold text-2xl text-[#1e3a5f] mb-6">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {QUICK_ACTIONS.map(action => (
            <Link key={action.label} to={action.path} className="card-hover group bg-white border border-slate-200 rounded-xl p-5 flex flex-col items-center text-center shadow-sm">
              <div className={`${action.color} w-12 h-12 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition`}>
                <action.icon size={22} className="text-white" />
              </div>
              <div className="font-display font-semibold text-slate-800 text-sm">{action.label}</div>
              <div className="text-xs text-slate-400 mt-1">{action.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* City Highlights */}
      <section className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-2xl text-white mb-8">City at a Glance</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {HIGHLIGHTS.map(h => (
              <div key={h.label} className="bg-white/10 border border-white/10 rounded-xl p-6 text-white">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ backgroundColor: h.color + '33' }}>
                  <h.icon size={20} style={{ color: h.color === '#2563eb' ? '#60a5fa' : h.color }} />
                </div>
                <div className="font-display font-bold text-3xl mb-1">{h.value}</div>
                <div className="font-semibold text-sm text-slate-200">{h.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{h.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Complaints + Announcements */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Complaints */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-[#1e3a5f]">Recent Complaints</h2>
              <Link to="/complaints" className="text-sm text-[#0d9488] hover:underline flex items-center gap-1">
                View All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {recent.map(c => (
                <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-4 card-hover shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs text-slate-400">{c.id}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[c.status]}`}>{c.status}</span>
                      </div>
                      <div className="font-semibold text-slate-800 text-sm truncate">{c.category}</div>
                      <div className="text-xs text-slate-500 mt-0.5 truncate">{c.description.substring(0, 80)}...</div>
                    </div>
                    <Link to={`/complaints/${c.id}`} className="shrink-0 text-[#2563eb] hover:underline text-xs font-medium">Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Announcements */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-2xl text-[#1e3a5f]">Announcements</h2>
              <Link to="/announcements" className="text-sm text-[#0d9488] hover:underline flex items-center gap-1">
                All <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-3">
              {latestAnn.map(a => (
                <div key={a.id} className={`bg-white border rounded-xl p-4 card-hover shadow-sm ${a.urgent ? 'border-red-300' : 'border-slate-200'}`}>
                  {a.urgent && (
                    <span className="inline-block bg-red-100 text-red-700 text-xs font-semibold px-2 py-0.5 rounded mb-2">URGENT</span>
                  )}
                  <div className="font-semibold text-slate-800 text-sm leading-snug">{a.title}</div>
                  <div className="text-xs text-slate-500 mt-1">{new Date(a.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-gradient-to-r from-[#0d9488] to-[#2563eb] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="font-display font-bold text-3xl mb-3">Have a civic issue to report?</h2>
          <p className="text-slate-200 mb-6">Our team responds to all complaints within 48 hours. Help us build a better city.</p>
          <Link to="/report" className="bg-white text-[#1e3a5f] hover:bg-slate-100 px-8 py-3 rounded-lg font-bold inline-flex items-center gap-2 transition shadow-lg">
            Report Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
