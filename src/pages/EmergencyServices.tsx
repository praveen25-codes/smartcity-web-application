import { Shield, Flame, Stethoscope, AlertTriangle, Car, Users, Baby, Radio, MapPin, Clock, Phone } from 'lucide-react';
import { EMERGENCY_CONTACTS } from '../data/sampleData';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Shield, Flame, Stethoscope, AlertTriangle, Car, Users, Baby, Radio
};

const SHELTER_LOCATIONS = [
  { name: 'City Convention Center', capacity: 2000, address: 'Civic Center Road', distance: '1.2 km', available: true },
  { name: 'District Government School', capacity: 800, address: 'Heritage Road, Ward 3', distance: '2.8 km', available: true },
  { name: 'Sports Complex', capacity: 1500, address: 'Stadium Road, Sector 6', distance: '3.5 km', available: false },
  { name: 'Community Hall, Ward 9', capacity: 500, address: 'Market Street, Ward 9', distance: '4.1 km', available: true },
];

const SAFETY_TIPS = [
  { icon: '🌊', title: 'Flood', tips: ['Move to higher ground immediately', 'Avoid walking in moving water', 'Do not drive through flooded roads', 'Keep emergency kit ready'] },
  { icon: '🔥', title: 'Fire', tips: ['Call 101 immediately', 'Evacuate and do not use elevator', 'Crawl low under smoke', 'Meet at designated assembly point'] },
  { icon: '🌪️', title: 'Cyclone', tips: ['Stay indoors away from windows', 'Stock 3-day food and water supply', 'Charge all devices in advance', 'Listen to official updates only'] },
];

export default function EmergencyServices() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Emergency header */}
      <div className="bg-red-700 py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center pulse-emergency">
              <AlertTriangle size={16} className="text-white" />
            </div>
            <span className="text-white font-semibold">Emergency Helpline: <strong>1800-111-0000</strong> (24/7)</span>
          </div>
          <a href="tel:100" className="bg-white text-red-700 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-50 transition">
            Call 100
          </a>
        </div>
      </div>

      <div className="bg-[#1e3a5f] py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Emergency Services</h1>
          <p className="text-slate-300">Emergency contacts, relief centers, and safety information for SmartCity residents.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Emergency Contacts */}
        <h2 className="font-display font-bold text-xl text-[#1e3a5f] mb-4">Emergency Contacts</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {EMERGENCY_CONTACTS.map(c => {
            const Icon = ICON_MAP[c.icon] || Shield;
            return (
              <a
                key={c.name}
                href={`tel:${c.number}`}
                className="bg-white border border-slate-200 rounded-xl p-4 card-hover shadow-sm group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: c.color + '20' }}>
                  <Icon size={22} style={{ color: c.color }} />
                </div>
                <div className="font-display font-bold text-2xl mb-0.5" style={{ color: c.color }}>{c.number}</div>
                <div className="font-semibold text-slate-800 text-sm">{c.name}</div>
                <div className="text-xs text-slate-500 mt-1">{c.description}</div>
                <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: c.color }}>
                  <Phone size={11} /> Tap to call
                </div>
              </a>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Relief Centers */}
          <div>
            <h2 className="font-display font-bold text-xl text-[#1e3a5f] mb-4">Relief & Shelter Centers</h2>
            <div className="space-y-3">
              {SHELTER_LOCATIONS.map(loc => (
                <div key={loc.name} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm card-hover">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-slate-800">{loc.name}</div>
                      <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                        <MapPin size={10} /> {loc.address}
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full font-semibold shrink-0 ${loc.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {loc.available ? 'Open' : 'Full'}
                    </span>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><Users size={10} /> Capacity: {loc.capacity.toLocaleString()}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {loc.distance}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Safety Tips */}
          <div>
            <h2 className="font-display font-bold text-xl text-[#1e3a5f] mb-4">Emergency Safety Tips</h2>
            <div className="space-y-4">
              {SAFETY_TIPS.map(tip => (
                <div key={tip.title} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{tip.icon}</span>
                    <span className="font-display font-bold text-slate-800">{tip.title} Emergency</span>
                  </div>
                  <ul className="space-y-1.5">
                    {tip.tips.map(t => (
                      <li key={t} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-[#0d9488] rounded-full mt-1.5 shrink-0"></span>
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Preparedness Banner */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#0d9488] rounded-2xl p-6 text-white">
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div>
              <h3 className="font-display font-bold text-xl mb-1">Be Prepared. Stay Safe.</h3>
              <p className="text-slate-200 text-sm">Keep the emergency contacts saved and your household preparedness kit ready with essentials for 72 hours.</p>
            </div>
            <div className="bg-white/20 rounded-xl px-6 py-4 text-center shrink-0">
              <div className="text-3xl font-display font-bold">72 hrs</div>
              <div className="text-xs text-slate-200">Emergency kit duration</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
