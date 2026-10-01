import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, XCircle, Search, MapPin, Phone, Mail, Tag } from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ComponentType<{ size?: number }> }> = {
  'Pending': { color: '#92400e', bg: '#fef3c7', icon: Clock },
  'Under Review': { color: '#1e40af', bg: '#dbeafe', icon: Search },
  'In Progress': { color: '#5b21b6', bg: '#ede9fe', icon: AlertTriangle },
  'Resolved': { color: '#065f46', bg: '#d1fae5', icon: CheckCircle },
  'Rejected': { color: '#991b1b', bg: '#fee2e2', icon: XCircle },
};

const PRIORITY_COLOR: Record<string, string> = {
  'Low': 'bg-green-100 text-green-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'High': 'bg-orange-100 text-orange-700',
  'Critical': 'bg-red-100 text-red-700',
};

export default function ComplaintDetail() {
  const { id } = useParams<{ id: string }>();
  const { getComplaint } = useComplaints();
  const complaint = id ? getComplaint(id) : null;

  if (!complaint) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="font-display text-2xl font-bold text-[#1e3a5f] mb-2">Complaint Not Found</h2>
          <p className="text-slate-500 mb-6">The complaint ID "{id}" doesn't exist.</p>
          <Link to="/track" className="bg-[#1e3a5f] text-white px-6 py-2 rounded-lg font-semibold text-sm">Search Again</Link>
        </div>
      </div>
    );
  }

  const cfg = STATUS_CONFIG[complaint.status] || STATUS_CONFIG['Pending'];
  const StatusIcon = cfg.icon;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] py-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link to="/complaints" className="flex items-center gap-2 text-slate-300 hover:text-white text-sm mb-4 transition">
            <ArrowLeft size={14} /> All Complaints
          </Link>
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-teal-300 text-sm mb-1">{complaint.id}</div>
              <h1 className="font-display text-2xl font-bold text-white">{complaint.category}</h1>
            </div>
            <div className="flex flex-col gap-2 items-end shrink-0">
              <span className="px-3 py-1.5 rounded-full text-sm font-semibold" style={{ backgroundColor: cfg.bg, color: cfg.color }}>
                {complaint.status}
              </span>
              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${PRIORITY_COLOR[complaint.priority]}`}>
                {complaint.priority} Priority
              </span>
              {complaint.source === 'Online Service' && (
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-teal-100 text-teal-700">
                  Online Service
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-5">
          {/* Description */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-display font-semibold text-slate-800 mb-3">Description</h3>
            <p className="text-sm text-slate-600 leading-relaxed">{complaint.description}</p>
            <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
              <MapPin size={12} className="text-[#0d9488]" />
              <span>{complaint.location}</span>
            </div>
          </div>

          {/* Attached Photo */}
          {complaint.image && (
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
              <h3 className="font-display font-semibold text-slate-800 mb-3">Attached Photo</h3>
              <img
                src={complaint.image}
                alt="Complaint photo"
                className="w-full rounded-lg object-cover max-h-64 border border-slate-100"
              />
            </div>
          )}

          {/* Timeline */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-display font-semibold text-slate-800 mb-4">Status Timeline</h3>
            <div className="relative">
              {complaint.timeline.map((t, i) => {
                const tcfg = STATUS_CONFIG[t.status] || STATUS_CONFIG['Pending'];
                return (
                  <div key={i} className="timeline-item">
                    {i < complaint.timeline.length - 1 && <div className="timeline-line"></div>}
                    <div className="timeline-dot" style={{ backgroundColor: tcfg.color }}></div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-semibold text-sm text-slate-800">{t.status}</span>
                        <span className="text-xs text-slate-400">{new Date(t.date).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <p className="text-sm text-slate-600">{t.note}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-display font-semibold text-slate-800 mb-3">Details</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Tag size={14} className="text-[#0d9488] mt-0.5" />
                <div><div className="text-xs text-slate-400">Category</div><div className="font-medium text-slate-700">{complaint.category}</div></div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#0d9488] mt-0.5" />
                <div><div className="text-xs text-slate-400">Ward</div><div className="font-medium text-slate-700">{complaint.ward}</div></div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#0d9488] mt-0.5" />
                <div><div className="text-xs text-slate-400">Filed On</div><div className="font-medium text-slate-700">{new Date(complaint.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div></div>
              </div>
              <div className="flex items-start gap-2">
                <Clock size={14} className="text-[#0d9488] mt-0.5" />
                <div><div className="text-xs text-slate-400">Last Updated</div><div className="font-medium text-slate-700">{new Date(complaint.updatedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div></div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
            <h3 className="font-display font-semibold text-slate-800 mb-3">Complainant</h3>
            <div className="space-y-2 text-sm">
              <div className="font-medium text-slate-700">{complaint.name}</div>
              <div className="flex items-center gap-2 text-slate-500">
                <Phone size={12} className="text-[#0d9488]" />
                <span>{complaint.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-500">
                <Mail size={12} className="text-[#0d9488]" />
                <span className="break-all">{complaint.email}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
            <div className="font-semibold mb-1">Need escalation?</div>
            <div>Call <strong>1800-111-SMART</strong> or visit your Ward Office with this Complaint ID.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
