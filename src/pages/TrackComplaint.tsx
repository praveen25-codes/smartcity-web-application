import { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useComplaints } from '../hooks/useComplaints';

export default function TrackComplaint() {
  const [id, setId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { getComplaint } = useComplaints();

  const handleSearch = () => {
    const trimmed = id.trim().toUpperCase();
    if (!trimmed) { setError('Please enter a complaint ID'); return; }
    const found = getComplaint(trimmed);
    if (!found) { setError('No complaint found with this ID. Please check and try again.'); return; }
    navigate(`/complaints/${trimmed}`);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Track Your Complaint</h1>
          <p className="text-slate-300">Enter your complaint ID to check the current status.</p>
        </div>
      </div>

      <div className="max-w-xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <label className="block font-semibold text-slate-700 mb-3">Complaint ID</label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="e.g. SC2024-10001"
                value={id}
                onChange={e => { setId(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSearch()}
                className={`w-full pl-9 pr-4 py-3 border rounded-lg text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#2563eb] ${error ? 'border-red-400' : 'border-slate-200'}`}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-[#1e3a5f] hover:bg-[#163158] text-white px-5 py-3 rounded-lg font-semibold text-sm transition"
            >
              Search
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1"><AlertCircle size={12} /> {error}</p>
          )}

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-sm text-slate-500 mb-3">Quick access — recently filed complaints:</div>
            <div className="space-y-2">
              {['SC2024-10001', 'SC2024-10002', 'SC2024-10003'].map(sid => (
                <button key={sid} onClick={() => navigate(`/complaints/${sid}`)} className="w-full text-left px-3 py-2 bg-slate-50 hover:bg-slate-100 rounded-lg text-sm font-mono text-[#2563eb] transition">
                  {sid}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
          <div className="font-semibold mb-1">Need help?</div>
          <div>Can't find your complaint? Call our helpline at <strong>1800-111-SMART</strong> or visit your nearest Ward Office with a valid ID proof.</div>
        </div>
      </div>
    </div>
  );
}
