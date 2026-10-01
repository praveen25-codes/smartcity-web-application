import { useState } from 'react';
import { Megaphone, AlertTriangle, Calendar } from 'lucide-react';
import { ANNOUNCEMENTS, Announcement } from '../data/sampleData';

const CATEGORY_COLORS: Record<string, string> = {
  'General': 'bg-blue-100 text-blue-700',
  'Emergency': 'bg-red-100 text-red-700',
  'Infrastructure': 'bg-amber-100 text-amber-700',
  'Events': 'bg-purple-100 text-purple-700',
  'Policy': 'bg-teal-100 text-teal-700',
};

export default function Announcements() {
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState<string | null>(null);

  const categories = ['All', 'Emergency', 'General', 'Infrastructure', 'Events', 'Policy'];
  const urgent = ANNOUNCEMENTS.filter(a => a.urgent);
  const filtered = ANNOUNCEMENTS.filter(a => filter === 'All' || a.category === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Announcements</h1>
          <p className="text-slate-300">Official announcements, alerts, and updates from SmartCity Municipal Corporation.</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Urgent alerts */}
        {urgent.map(a => (
          <div key={a.id} className="bg-red-50 border border-red-300 rounded-xl p-4 mb-6 flex gap-3">
            <AlertTriangle size={20} className="text-red-600 shrink-0 mt-0.5 pulse-emergency" />
            <div>
              <div className="font-display font-bold text-red-800">{a.title}</div>
              <div className="text-sm text-red-700 mt-1">{a.content.substring(0, 150)}...</div>
              <button onClick={() => setExpanded(a.id)} className="text-xs font-semibold text-red-600 mt-2 hover:underline">
                Read Full Advisory →
              </button>
            </div>
          </div>
        ))}

        {/* Filter tabs */}
        <div className="flex gap-2 flex-wrap mb-6">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${filter === c ? 'bg-[#1e3a5f] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Announcements list */}
        <div className="space-y-4">
          {filtered.map(a => (
            <div key={a.id} className={`bg-white border rounded-xl shadow-sm overflow-hidden ${a.urgent ? 'border-red-200' : 'border-slate-200'}`}>
              <div className="p-5">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${a.urgent ? 'bg-red-100' : 'bg-slate-100'}`}>
                    {a.urgent ? <AlertTriangle size={18} className="text-red-600" /> : <Megaphone size={18} className="text-slate-500" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 flex-wrap mb-1">
                      {a.urgent && <span className="bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded">URGENT</span>}
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded ${CATEGORY_COLORS[a.category] || 'bg-slate-100 text-slate-600'}`}>{a.category}</span>
                    </div>
                    <h3 className="font-display font-bold text-slate-800 leading-snug">{a.title}</h3>
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-1">
                      <Calendar size={10} /> {new Date(a.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                  </div>
                </div>

                <div className={`mt-3 text-sm text-slate-600 leading-relaxed ${expanded === a.id ? '' : 'line-clamp-2'}`}>
                  {a.content}
                </div>
                <button
                  onClick={() => setExpanded(expanded === a.id ? null : a.id)}
                  className="text-xs font-semibold text-[#0d9488] mt-2 hover:underline"
                >
                  {expanded === a.id ? 'Show less ↑' : 'Read more →'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Megaphone size={40} className="mx-auto mb-3 opacity-30" />
            <div className="font-display font-semibold text-lg">No announcements in this category</div>
          </div>
        )}
      </div>
    </div>
  );
}
