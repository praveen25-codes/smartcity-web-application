import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Building2, Bell } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'City Services', path: '/services' },
  {
    label: 'Complaints', path: '#', children: [
      { label: 'Report Complaint', path: '/report' },
      { label: 'Track Complaint', path: '/track' },
      { label: 'All Complaints', path: '/complaints' },
    ]
  },
  { label: 'City Monitor', path: '/monitoring' },
  { label: 'Emergency', path: '/emergency' },
  { label: 'Announcements', path: '/announcements' },
  { label: 'About', path: '/about' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or Escape
  useEffect(() => {
    if (!dropdown) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setDropdown(null); };
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [dropdown]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-[#1e3a5f] text-white shadow-lg sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-[#0f172a] text-xs py-1 px-4 flex justify-between items-center">
        <span className="text-slate-300">Government of SmartCity | सेवा परमो धर्म</span>
        <div className="flex gap-4 text-slate-300">
          <span>Emergency: 100</span>
          <span>|</span>
          <Link to="/admin" className="hover:text-white transition">Admin Portal</Link>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#0d9488] rounded-lg flex items-center justify-center">
            <Building2 size={22} />
          </div>
          <div>
            <div className="font-display font-bold text-lg leading-none">SmartCity</div>
            <div className="text-[11px] text-teal-300 leading-none">Municipal Corporation</div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map(link => (
            <div key={link.label} className="relative">
              {link.children ? (
                <div ref={dropdownRef} className="relative">
                  <button
                    onClick={() => setDropdown(dropdown === link.label ? null : link.label)}
                    aria-haspopup="menu"
                    aria-expanded={dropdown === link.label}
                    className={`flex items-center gap-1 px-3 py-2 rounded text-sm font-medium hover:bg-white/10 transition ${dropdown === link.label ? 'bg-white/10' : ''}`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className="transition-transform duration-200"
                      style={{ transform: dropdown === link.label ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>
                  {dropdown === link.label && (
                    <div
                      role="menu"
                      className="absolute top-full left-0 mt-1 bg-white text-slate-800 rounded-lg shadow-xl py-2 min-w-48 z-50"
                      style={{ animation: 'fadeIn 0.12s ease' }}
                    >
                      {link.children.map(child => (
                        <Link
                          key={child.path}
                          to={child.path}
                          role="menuitem"
                          onClick={() => setDropdown(null)}
                          className="block px-4 py-2 text-sm hover:bg-slate-50 hover:text-[#1e3a5f] font-medium transition"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={link.path}
                  onClick={() => setDropdown(null)}
                  className={`px-3 py-2 rounded text-sm font-medium hover:bg-white/10 transition ${isActive(link.path) ? 'bg-white/20 text-white' : 'text-slate-200'}`}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/announcements" className="relative p-2 hover:bg-white/10 rounded-lg">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
          </Link>
          <Link to="/report" className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-4 py-2 rounded-lg text-sm font-semibold transition">
            Report Issue
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="lg:hidden p-2 hover:bg-white/10 rounded-lg" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#1e3a5f]">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map(link => (
              <div key={link.label}>
                {link.children ? (
                  <>
                    <div className="text-xs uppercase text-teal-300 font-semibold mt-3 mb-1 px-2">{link.label}</div>
                    {link.children.map(child => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setOpen(false)}
                        className="block px-4 py-2 text-sm text-slate-200 hover:bg-white/10 rounded-lg transition"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className={`block px-3 py-2 rounded-lg text-sm font-medium transition ${isActive(link.path) ? 'bg-white/20 text-white' : 'text-slate-200 hover:bg-white/10'}`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
            <div className="pt-3 border-t border-white/10">
              <Link to="/report" onClick={() => setOpen(false)} className="block text-center bg-[#0d9488] text-white px-4 py-2 rounded-lg text-sm font-semibold">
                Report Issue
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
