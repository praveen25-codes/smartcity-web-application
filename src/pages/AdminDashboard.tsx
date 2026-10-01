import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, Legend
} from 'recharts';
import {
  Building2, LayoutDashboard, FileText, BarChart2, LogOut,
  CheckCircle, Clock, AlertTriangle, XCircle, Search, ChevronDown,
  Trash2, Edit3, Check, X, TrendingUp, Users
} from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { Complaint, ComplaintStatus, CATEGORY_OPTIONS, WARD_OPTIONS } from '../data/sampleData';

const STATUS_OPTIONS: ComplaintStatus[] = ['Pending', 'Under Review', 'In Progress', 'Resolved', 'Rejected'];
const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Critical'];

const STATUS_COLORS: Record<string, string> = {
  'Pending': '#f59e0b', 'Under Review': '#3b82f6', 'In Progress': '#8b5cf6',
  'Resolved': '#10b981', 'Rejected': '#ef4444'
};

const PIE_COLORS = ['#1e3a5f', '#2563eb', '#0d9488', '#7c3aed', '#d97706', '#dc2626', '#16a34a', '#ec4899', '#f59e0b', '#06b6d4'];

type Tab = 'overview' | 'complaints' | 'analytics';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { complaints, updateComplaint, deleteComplaint } = useComplaints();
  const [tab, setTab] = useState<Tab>('overview');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editStatus, setEditStatus] = useState<ComplaintStatus>('Pending');
  const [editNote, setEditNote] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    if (!sessionStorage.getItem('sc_admin')) navigate('/admin');
  }, [navigate]);

  const logout = () => { sessionStorage.removeItem('sc_admin'); navigate('/admin'); };

  // Analytics data
  const categoryData = CATEGORY_OPTIONS.map(cat => ({
    name: cat.replace(' & ', '/').split(' ').slice(0, 2).join(' '),
    count: complaints.filter(c => c.category === cat).length
  })).filter(d => d.count > 0);

  const statusData = STATUS_OPTIONS.map(s => ({
    name: s, value: complaints.filter(c => c.status === s).length
  })).filter(d => d.value > 0);

  const wardData = WARD_OPTIONS.slice(0, 8).map(w => ({
    ward: w.replace('Ward ', 'W'),
    complaints: complaints.filter(c => c.ward === w).length
  }));

  const trendData = [
    { month: 'Aug', filed: 312, resolved: 280 },
    { month: 'Sep', filed: 289, resolved: 265 },
    { month: 'Oct', filed: 356, resolved: 310 },
    { month: 'Nov', filed: complaints.length, resolved: complaints.filter(c => c.status === 'Resolved').length },
  ];

  const stats = {
    total: complaints.length,
    pending: complaints.filter(c => c.status === 'Pending').length,
    inProgress: complaints.filter(c => c.status === 'In Progress' || c.status === 'Under Review').length,
    resolved: complaints.filter(c => c.status === 'Resolved').length,
    critical: complaints.filter(c => c.priority === 'Critical').length,
  };

  const filtered = complaints.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !search || c.id.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.name.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleUpdateStatus = (id: string) => {
    const complaint = complaints.find(c => c.id === id)!;
    const now = new Date().toISOString();
    updateComplaint(id, {
      status: editStatus,
      timeline: [...complaint.timeline, { status: editStatus, note: editNote || `Status updated to ${editStatus}`, date: now }]
    });
    setEditingId(null);
    setEditNote('');
  };

  const handleDelete = (id: string) => {
    deleteComplaint(id);
    setDeletingId(null);
  };

  const TABS: { id: Tab; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'complaints', label: 'Complaints', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-56' : 'w-16'} bg-[#1e293b] border-r border-slate-700 flex flex-col transition-all duration-200 shrink-0`}>
        <div className="flex items-center gap-3 p-4 border-b border-slate-700 h-16">
          <div className="w-8 h-8 bg-[#0d9488] rounded-lg flex items-center justify-center shrink-0">
            <Building2 size={16} className="text-white" />
          </div>
          {sidebarOpen && <div className="font-display font-bold text-white text-sm">Admin Portal</div>}
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${tab === t.id ? 'bg-[#0d9488] text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
            >
              <t.icon size={16} />
              {sidebarOpen && t.label}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-700">
          <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-900/20 transition">
            <LogOut size={16} />
            {sidebarOpen && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="h-16 bg-[#1e293b] border-b border-slate-700 flex items-center justify-between px-6">
          <div>
            <h1 className="font-display font-bold text-white capitalize">{tab === 'overview' ? 'Dashboard Overview' : tab === 'complaints' ? 'Complaint Management' : 'Analytics'}</h1>
            <div className="text-xs text-slate-400">SmartCity Admin Portal</div>
          </div>
          <Link to="/" className="text-xs text-slate-400 hover:text-white transition">← City Portal</Link>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {/* OVERVIEW TAB */}
          {tab === 'overview' && (
            <div className="space-y-6">
              {/* KPI cards */}
              <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                {[
                  { label: 'Total Complaints', value: stats.total, icon: FileText, color: '#2563eb' },
                  { label: 'Pending', value: stats.pending, icon: Clock, color: '#f59e0b' },
                  { label: 'Active Cases', value: stats.inProgress, icon: AlertTriangle, color: '#8b5cf6' },
                  { label: 'Resolved', value: stats.resolved, icon: CheckCircle, color: '#10b981' },
                  { label: 'Critical', value: stats.critical, icon: XCircle, color: '#ef4444' },
                ].map(k => (
                  <div key={k.label} className="bg-[#1e293b] border border-slate-700 rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: k.color + '30' }}>
                        <k.icon size={16} style={{ color: k.color }} />
                      </div>
                    </div>
                    <div className="font-display font-bold text-2xl text-white">{k.value}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{k.label}</div>
                  </div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-white mb-4">Complaints by Status</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, value }) => `${name}: ${value}`} labelLine={false} fontSize={10}>
                        {statusData.map((entry, i) => (
                          <Cell key={i} fill={STATUS_COLORS[entry.name] || PIE_COLORS[i]} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: 12 }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-white mb-4">Monthly Trend</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                      <Line type="monotone" dataKey="filed" stroke="#2563eb" strokeWidth={2} dot={{ r: 3 }} name="Filed" />
                      <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Ward chart */}
              <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5">
                <h3 className="font-display font-semibold text-white mb-4">Complaints by Ward</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={wardData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="ward" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: 12 }} />
                    <Bar dataKey="complaints" fill="#0d9488" radius={[4, 4, 0, 0]} name="Complaints" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* COMPLAINTS TAB */}
          {tab === 'complaints' && (
            <div>
              <div className="flex flex-col sm:flex-row gap-3 mb-5">
                <div className="relative flex-1">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Search complaints..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full bg-[#1e293b] border border-slate-600 text-white rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488] placeholder-slate-500" />
                </div>
                <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
                  className="bg-[#1e293b] border border-slate-600 text-white rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
                  <option value="All">All Statuses</option>
                  {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              <div className="space-y-3">
                {filtered.map(c => (
                  <div key={c.id} className="bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden">
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="font-mono text-xs text-slate-400">{c.id}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: STATUS_COLORS[c.status] + '30', color: STATUS_COLORS[c.status] }}>{c.status}</span>
                            <span className={`text-xs px-2 py-0.5 rounded font-medium ${c.priority === 'Critical' ? 'bg-red-900/30 text-red-400' : c.priority === 'High' ? 'bg-orange-900/30 text-orange-400' : 'bg-slate-700 text-slate-300'}`}>{c.priority}</span>
                          </div>
                          <div className="font-display font-semibold text-white text-sm">{c.category}</div>
                          <div className="text-xs text-slate-400 mt-0.5 line-clamp-1">{c.description}</div>
                          <div className="text-xs text-slate-500 mt-1">{c.name} · {c.ward} · {new Date(c.createdAt).toLocaleDateString('en-IN')}</div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <button onClick={() => { setEditingId(c.id); setEditStatus(c.status); setEditNote(''); }}
                            className="p-2 text-blue-400 hover:bg-blue-900/20 rounded-lg transition" title="Update status">
                            <Edit3 size={14} />
                          </button>
                          <button onClick={() => setDeletingId(c.id)} className="p-2 text-red-400 hover:bg-red-900/20 rounded-lg transition" title="Delete">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Inline edit */}
                      {editingId === c.id && (
                        <div className="mt-3 pt-3 border-t border-slate-700">
                          <div className="flex flex-col sm:flex-row gap-2">
                            <select value={editStatus} onChange={e => setEditStatus(e.target.value as ComplaintStatus)}
                              className="flex-1 bg-[#0f172a] border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488]">
                              {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            <input type="text" placeholder="Add update note..." value={editNote} onChange={e => setEditNote(e.target.value)}
                              className="flex-1 bg-[#0f172a] border border-slate-600 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488] placeholder-slate-500" />
                            <div className="flex gap-2">
                              <button onClick={() => handleUpdateStatus(c.id)} className="px-3 py-2 bg-[#0d9488] hover:bg-[#0f766e] text-white rounded-lg transition flex items-center gap-1 text-xs font-medium">
                                <Check size={12} /> Save
                              </button>
                              <button onClick={() => setEditingId(null)} className="px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition flex items-center gap-1 text-xs">
                                <X size={12} /> Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Delete confirm */}
                      {deletingId === c.id && (
                        <div className="mt-3 pt-3 border-t border-red-900/30 bg-red-900/10 rounded-lg p-3 -mx-1">
                          <div className="text-sm text-red-300 mb-2 font-medium">Delete this complaint? This cannot be undone.</div>
                          <div className="flex gap-2">
                            <button onClick={() => handleDelete(c.id)} className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-semibold transition">Delete</button>
                            <button onClick={() => setDeletingId(null)} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-xs transition">Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {filtered.length === 0 && (
                  <div className="text-center py-16 text-slate-500">
                    <FileText size={36} className="mx-auto mb-2 opacity-30" />
                    <div>No complaints found</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ANALYTICS TAB */}
          {tab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-white mb-4">By Category</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <YAxis type="category" dataKey="name" width={90} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: 12 }} />
                      <Bar dataKey="count" radius={[0, 4, 4, 0]} name="Count">
                        {categoryData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5">
                  <h3 className="font-display font-semibold text-white mb-4">Status Distribution</h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={90} paddingAngle={3}>
                        {statusData.map((entry, i) => <Cell key={i} fill={STATUS_COLORS[entry.name]} />)}
                      </Pie>
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-[#1e293b] border border-slate-700 rounded-xl p-5 md:col-span-2">
                  <h3 className="font-display font-semibold text-white mb-4">4-Month Complaint Trend</h3>
                  <ResponsiveContainer width="100%" height={220}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                      <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#fff', fontSize: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11, color: '#94a3b8' }} />
                      <Line type="monotone" dataKey="filed" stroke="#2563eb" strokeWidth={2} dot={{ r: 4, fill: '#2563eb' }} name="Filed" />
                      <Line type="monotone" dataKey="resolved" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: '#10b981' }} name="Resolved" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Summary metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Resolution Rate', value: `${Math.round((stats.resolved / stats.total) * 100)}%`, icon: TrendingUp, color: '#10b981' },
                  { label: 'Avg. Resolution', value: '3.4 days', icon: Clock, color: '#2563eb' },
                  { label: 'Citizen Satisfaction', value: '87%', icon: Users, color: '#7c3aed' },
                  { label: 'Critical Pending', value: stats.critical, icon: AlertTriangle, color: '#ef4444' },
                ].map(m => (
                  <div key={m.label} className="bg-[#1e293b] border border-slate-700 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <m.icon size={14} style={{ color: m.color }} />
                      <span className="text-xs text-slate-400">{m.label}</span>
                    </div>
                    <div className="font-display font-bold text-2xl" style={{ color: m.color }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
