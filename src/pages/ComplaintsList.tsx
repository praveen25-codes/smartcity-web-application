import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { CATEGORY_OPTIONS, WARD_OPTIONS } from '../data/sampleData';

const STATUS_OPTIONS = ['All', 'Pending', 'Under Review', 'In Progress', 'Resolved', 'Rejected'];
const PRIORITY_OPTIONS = ['All', 'Low', 'Medium', 'High', 'Critical'];
const SOURCE_OPTIONS = ['All', 'Citizen Report', 'Online Service'];

const statusColor: Record<string, string> = {
  'Pending': 'status-pending',
  'Under Review': 'status-review',
  'In Progress': 'status-progress',
  'Resolved': 'status-resolved',
  'Rejected': 'status-rejected',
};

const priorityColor: Record<string, string> = {
  'Low': 'bg-green-100 text-green-700',
  'Medium': 'bg-yellow-100 text-yellow-700',
  'High': 'bg-orange-100 text-orange-700',
  'Critical': 'bg-red-100 text-red-700',
};

export default function ComplaintsList() {
  const { complaints } = useComplaints();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [category, setCategory] = useState('All');
  const [ward, setWard] = useState('All');
  const [priority, setPriority] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [source, setSource] = useState('All');

  const filtered = complaints.filter(c => {
    const q = search.toLowerCase();
    const matchSearch = !search || c.id.toLowerCase().includes(q) || c.category.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
    const matchStatus = status === 'All' || c.status === status;
    const matchCat = category === 'All' || c.category === category;
    const matchWard = ward === 'All' || c.ward === ward;
    const matchPriority = priority === 'All' || c.priority === priority;
    const matchSource = source === 'All' || (source === 'Online Service' ? c.source === 'Online Service' : c.source !== 'Online Service');
    return matchSearch && matchStatus && matchCat && matchWard && matchPriority && matchSource;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">All Complaints</h1>
          <p className="text-slate-300">Browse, search, and filter all citizen complaints.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search bar */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 mb-4">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by ID, category, location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border transition ${showFilters ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3 pt-3 border-t border-slate-100">
              <select value={status} onChange={e => setStatus(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
              </select>
              <select value={category} onChange={e => setCategory(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                <option value="All">All Categories</option>
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select value={ward} onChange={e => setWard(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                <option value="All">All Wards</option>
                {WARD_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
              <select value={priority} onChange={e => setPriority(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                {PRIORITY_OPTIONS.map(p => <option key={p} value={p}>{p === 'All' ? 'All Priorities' : p}</option>)}
              </select>
              <select value={source} onChange={e => setSource(e.target.value)} className="border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]">
                {SOURCE_OPTIONS.map(s => <option key={s} value={s}>{s === 'All' ? 'All Sources' : s}</option>)}
              </select>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="text-sm text-slate-500 mb-4">{filtered.length} complaint{filtered.length !== 1 ? 's' : ''} found</div>

        {/* List */}
        <div className="space-y-3">
          {filtered.map(c => (
            <div key={c.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm card-hover">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-mono text-xs text-slate-400">{c.id}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor[c.status]}`}>{c.status}</span>
                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${priorityColor[c.priority]}`}>{c.priority}</span>
                    {c.source === 'Online Service' && (
                      <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-700 font-medium">Online Service</span>
                    )}
                  </div>
                  <div className="font-display font-semibold text-slate-800">{c.category}</div>
                  <div className="text-xs text-slate-500 mt-0.5 line-clamp-1">{c.description}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                    <span>📍 {c.ward}</span>
                    <span>📅 {new Date(c.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>
                <Link to={`/complaints/${c.id}`} className="shrink-0 flex items-center gap-1 text-[#2563eb] hover:text-[#1e40af] text-sm font-medium transition">
                  Details <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Filter size={40} className="mx-auto mb-3 opacity-30" />
            <div className="font-display font-semibold text-lg">No complaints match your filters</div>
            <div className="text-sm mt-1">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
