import { useState } from 'react';
import { Wind, Droplets, Zap, Car, Users, AlertTriangle, CheckCircle, Activity } from 'lucide-react';
import { MONITORING_SENSORS } from '../data/sampleData';

const SENSOR_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  air: Wind, water: Droplets, energy: Zap, traffic: Car, crowd: Users
};

const SENSOR_COLORS: Record<string, string> = {
  good: '#16a34a', normal: '#2563eb', alert: '#dc2626'
};

const CITY_STATS = [
  { label: 'Air Quality (Avg)', value: '87 AQI', status: 'Moderate', icon: Wind, color: '#d97706' },
  { label: 'Power Grid', value: '98.2%', status: 'Operational', icon: Zap, color: '#16a34a' },
  { label: 'Water Level', value: '4.2m', status: 'Normal', icon: Droplets, color: '#2563eb' },
  { label: 'Active Sensors', value: '142', status: 'Online', icon: Activity, color: '#0d9488' },
];

const ALERTS = [
  { zone: 'MG Road', type: 'Traffic Congestion', severity: 'High', time: '2 min ago' },
  { zone: 'Market Area', type: 'Air Quality Alert', severity: 'Medium', time: '12 min ago' },
  { zone: 'Sector 5', type: 'Garbage Overflow', severity: 'High', time: '25 min ago' },
  { zone: 'Industrial Zone', type: 'Noise Level Exceeded', severity: 'Low', time: '1 hr ago' },
];

const MAP_ROADS = [
  { d: 'M 20 50 L 80 50', stroke: '#cbd5e1', sw: 3 },
  { d: 'M 50 10 L 50 90', stroke: '#cbd5e1', sw: 3 },
  { d: 'M 20 25 L 80 75', stroke: '#e2e8f0', sw: 2 },
  { d: 'M 20 75 L 80 25', stroke: '#e2e8f0', sw: 2 },
  { d: 'M 10 50 Q 30 30 50 10', stroke: '#e2e8f0', sw: 1.5 },
  { d: 'M 90 50 Q 70 70 50 90', stroke: '#e2e8f0', sw: 1.5 },
];

export default function CityMonitoring() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedSensor = MONITORING_SENSORS.find(s => s.id === selected);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">City Monitoring Dashboard</h1>
          <p className="text-slate-300">Real-time sensor data across SmartCity's infrastructure and environment.</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-green-300 text-sm font-medium">Live data — updates every 30 seconds</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {CITY_STATS.map(stat => (
            <div key={stat.label} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '20' }}>
                  <stat.icon size={18} style={{ color: stat.color }} />
                </div>
                <span className="text-xs text-slate-500">{stat.label}</span>
              </div>
              <div className="font-display font-bold text-2xl text-slate-800">{stat.value}</div>
              <div className="text-xs font-medium mt-0.5" style={{ color: stat.color }}>{stat.status}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
              <h2 className="font-display font-bold text-slate-800">Smart City Map</h2>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500 rounded-full"></span> Good</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Normal</div>
                <div className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Alert</div>
              </div>
            </div>

            <div className="relative bg-slate-100 p-4" style={{ minHeight: '400px' }}>
              <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minHeight: '360px' }}>
                {/* City background zones */}
                <rect x="0" y="0" width="100" height="100" fill="#f8fafc" />
                <rect x="5" y="5" width="40" height="40" rx="2" fill="#e2e8f0" opacity="0.5" />
                <rect x="55" y="5" width="40" height="40" rx="2" fill="#e2e8f0" opacity="0.5" />
                <rect x="5" y="55" width="40" height="40" rx="2" fill="#e2e8f0" opacity="0.5" />
                <rect x="55" y="55" width="40" height="40" rx="2" fill="#e2e8f0" opacity="0.5" />
                {/* Lake */}
                <ellipse cx="25" cy="55" rx="10" ry="7" fill="#bfdbfe" opacity="0.7" />
                {/* Park */}
                <rect x="43" y="43" width="14" height="14" rx="7" fill="#bbf7d0" opacity="0.8" />
                {/* Roads */}
                {MAP_ROADS.map((r, i) => (
                  <path key={i} d={r.d} stroke={r.stroke} strokeWidth={r.sw} fill="none" />
                ))}
                {/* City label zones */}
                <text x="5" y="30" fontSize="3" fill="#94a3b8">Residential Zone</text>
                <text x="58" y="20" fontSize="3" fill="#94a3b8">Commercial Zone</text>
                <text x="5" y="80" fontSize="3" fill="#94a3b8">Industrial Zone</text>
                <text x="58" y="80" fontSize="3" fill="#94a3b8">South District</text>
                <text x="43" y="52" fontSize="2.5" fill="#16a34a">Central Park</text>
                <text x="18" y="57" fontSize="2.5" fill="#2563eb">Lake</text>

                {/* Sensors */}
                {MONITORING_SENSORS.map(sensor => {
                  const Icon = SENSOR_ICONS[sensor.type];
                  const color = SENSOR_COLORS[sensor.status];
                  const isSelected = selected === sensor.id;
                  return (
                    <g key={sensor.id} className="city-map-pin" onClick={() => setSelected(selected === sensor.id ? null : sensor.id)}>
                      <circle cx={sensor.x} cy={sensor.y} r={isSelected ? 5 : 4} fill={color} opacity="0.2" />
                      <circle cx={sensor.x} cy={sensor.y} r={isSelected ? 3.5 : 2.5} fill={color} stroke="white" strokeWidth="0.5" />
                      {sensor.status === 'alert' && (
                        <circle cx={sensor.x} cy={sensor.y} r="5" fill="none" stroke={color} strokeWidth="0.5" opacity="0.5">
                          <animate attributeName="r" from="3" to="7" dur="1.5s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.5" to="0" dur="1.5s" repeatCount="indefinite" />
                        </circle>
                      )}
                      {isSelected && (
                        <rect x={sensor.x + 3} y={sensor.y - 8} width="20" height="6" rx="1" fill={color} opacity="0.9" />
                      )}
                      {isSelected && (
                        <text x={sensor.x + 4} y={sensor.y - 4} fontSize="2" fill="white">{sensor.name.substring(0, 12)}</text>
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 flex gap-3 text-xs">
                {Object.entries({ Air: '🌬️', Water: '💧', Energy: '⚡', Traffic: '🚗', Crowd: '👥' }).map(([k, v]) => (
                  <div key={k} className="flex items-center gap-1 bg-white/80 px-2 py-1 rounded-md text-slate-600">
                    <span>{v}</span><span>{k}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected sensor info */}
            {selectedSensor && (
              <div className="px-5 py-4 border-t border-slate-100 bg-slate-50">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-slate-800">{selectedSensor.name}</div>
                    <div className="text-sm text-slate-500">
                      Value: <strong>{selectedSensor.value} {selectedSensor.unit}</strong> · Status: <strong style={{ color: SENSOR_COLORS[selectedSensor.status] }}>{selectedSensor.status.charAt(0).toUpperCase() + selectedSensor.status.slice(1)}</strong>
                    </div>
                  </div>
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: SENSOR_COLORS[selectedSensor.status] }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Alerts & Sensors */}
          <div className="space-y-4">
            {/* Active Alerts */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <AlertTriangle size={16} className="text-amber-500" />
                <h3 className="font-display font-semibold text-slate-800">Active Alerts</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {ALERTS.map((alert, i) => (
                  <div key={i} className="px-4 py-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-medium text-sm text-slate-800">{alert.type}</div>
                        <div className="text-xs text-slate-500">{alert.zone} · {alert.time}</div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${alert.severity === 'High' ? 'bg-red-100 text-red-700' : alert.severity === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {alert.severity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sensor List */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-sm">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2">
                <Activity size={16} className="text-[#0d9488]" />
                <h3 className="font-display font-semibold text-slate-800">Sensor Readings</h3>
              </div>
              <div className="divide-y divide-slate-50">
                {MONITORING_SENSORS.map(s => {
                  const Icon = SENSOR_ICONS[s.type];
                  const color = SENSOR_COLORS[s.status];
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSelected(selected === s.id ? null : s.id)}
                      className={`w-full px-4 py-2.5 flex items-center gap-3 hover:bg-slate-50 transition text-left ${selected === s.id ? 'bg-slate-50' : ''}`}
                    >
                      <Icon size={14} style={{ color }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-slate-700 truncate">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.value} {s.unit}</div>
                      </div>
                      <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }}></div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
