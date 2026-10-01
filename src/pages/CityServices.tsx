import { useState } from 'react';
import { Search, Phone, Mail, MapPin, Clock, ExternalLink, FileText, CreditCard, Droplets, Building2, Trash2, BookOpen, Car, Heart } from 'lucide-react';
import { CITY_SERVICES, Service } from '../data/sampleData';
import ServiceModal from '../components/ServiceModal';
import CallModal from '../components/CallModal';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  FileText, CreditCard, Droplets, Building2, Trash2, BookOpen, Car, Heart
};

export default function CityServices() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [activeService, setActiveService] = useState<Service | null>(null);
  const [callService, setCallService] = useState<Service | null>(null);

  const departments = ['All', ...Array.from(new Set(CITY_SERVICES.map(s => s.department)))];

  const filtered = CITY_SERVICES.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || s.department === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-3">City Services</h1>
          <p className="text-slate-300 max-w-xl">Access all government services, departments, and resources in one place.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filter */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {departments.map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition whitespace-nowrap ${filter === d ? 'bg-[#1e3a5f] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map(service => {
            const Icon = ICON_MAP[service.icon] || FileText;
            return (
              <div key={service.id} className="bg-white border border-slate-200 rounded-xl shadow-sm card-hover overflow-hidden">
                <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2563eb] p-5 flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-white text-sm">{service.name}</div>
                    <div className="text-teal-200 text-xs">{service.department}</div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">{service.description}</p>
                  <div className="space-y-2 text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <Phone size={11} className="text-[#0d9488]" />
                      <span>{service.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={11} className="text-[#0d9488]" />
                      <span>{service.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={11} className="text-[#0d9488]" />
                      <span>{service.hours}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin size={11} className="text-[#0d9488] mt-0.5" />
                      <span>{service.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    {service.online && (
                      <button
                        onClick={() => setActiveService(service)}
                        aria-label={`Apply online for ${service.name}`}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#0d9488] hover:bg-[#0f766e] text-white py-2 rounded-lg text-xs font-semibold transition"
                      >
                        <ExternalLink size={12} /> Online
                      </button>
                    )}
                    <button
                      onClick={() => setCallService(service)}
                      aria-label={`Call ${service.name} at ${service.phone}`}
                      className="flex-1 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-lg text-xs font-semibold transition"
                    >
                      <Phone size={12} /> Call
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Search size={40} className="mx-auto mb-3 opacity-30" />
            <div className="font-display font-semibold text-lg">No services found</div>
            <div className="text-sm">Try a different search term</div>
          </div>
        )}
      </div>

      {activeService && (
        <ServiceModal service={activeService} onClose={() => setActiveService(null)} />
      )}
      {callService && (
        <CallModal service={callService} onClose={() => setCallService(null)} />
      )}
    </div>
  );
}
