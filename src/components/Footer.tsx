import { Link } from 'react-router-dom';
import { Building2, Phone, Mail, MapPin, Share2, MessageCircle, Play } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-slate-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#0d9488] rounded-lg flex items-center justify-center">
                <Building2 size={22} className="text-white" />
              </div>
              <div>
                <div className="font-display font-bold text-white text-lg leading-none">SmartCity</div>
                <div className="text-[11px] text-teal-400 leading-none">Municipal Corporation</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Building tomorrow's city with smart technology, citizen participation, and sustainable governance for all.
            </p>
            <div className="flex gap-3 mt-4">
              {[Share2, MessageCircle, Play].map((Icon, i) => (
                <button key={i} className="w-8 h-8 bg-white/10 hover:bg-[#0d9488] rounded-lg flex items-center justify-center transition">
                  <Icon size={14} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['City Services', '/services'],
                ['Report Complaint', '/report'],
                ['Track Complaint', '/track'],
                ['City Monitoring', '/monitoring'],
                ['Emergency Services', '/emergency'],
                ['Announcements', '/announcements'],
              ].map(([label, path]) => (
                <li key={path}>
                  <Link to={path} className="hover:text-teal-400 transition">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Departments</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {['Water Authority', 'Public Works Dept.', 'Town Planning', 'Revenue Dept.', 'Civil Registration', 'Social Welfare'].map(d => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-teal-400 mt-0.5 shrink-0" />
                <span>City Hall, Civic Center Road, SmartCity – 560001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-teal-400 shrink-0" />
                <span>1800-111-SMART (toll-free)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-teal-400 shrink-0" />
                <span>contact@smartcity.gov.in</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-900/30 border border-red-700/30 rounded-lg">
              <p className="text-xs text-red-300 font-semibold">Emergency Helpline</p>
              <p className="text-xl font-display font-bold text-white">1800-111-0000</p>
              <p className="text-xs text-slate-400">24/7 City Control Room</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <span>© 2024 SmartCity Municipal Corporation. All rights reserved.</span>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-slate-300">Privacy Policy</span>
            <span className="cursor-pointer hover:text-slate-300">Terms of Use</span>
            <span className="cursor-pointer hover:text-slate-300">Accessibility</span>
            <Link to="/admin" className="hover:text-slate-300">Admin Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
