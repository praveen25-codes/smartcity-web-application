import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Eye, EyeOff, AlertCircle, Lock } from 'lucide-react';
import { ADMIN_CREDENTIALS } from '../data/sampleData';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      sessionStorage.setItem('sc_admin', '1');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Use admin / smartcity@2024');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#0d9488] rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Building2 size={32} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">SmartCity Admin</h1>
          <p className="text-slate-400 text-sm mt-1">Municipal Operations Portal</p>
        </div>

        <div className="bg-[#1e293b] border border-slate-700 rounded-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <Lock size={16} className="text-[#0d9488]" />
            <h2 className="font-display font-semibold text-white">Secure Login</h2>
          </div>

          {error && (
            <div className="flex items-start gap-2 bg-red-900/30 border border-red-700/50 text-red-400 rounded-lg p-3 text-sm mb-4">
              <AlertCircle size={14} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-[#0f172a] border border-slate-600 text-white rounded-lg px-3 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent placeholder-slate-500"
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-[#0f172a] border border-slate-600 text-white rounded-lg px-3 py-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d9488] focus:border-transparent placeholder-slate-500"
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition"
                >
                  {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#0d9488] hover:bg-[#0f766e] text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Authenticating...</>
              ) : 'Login to Admin Portal'}
            </button>
          </div>

          <div className="mt-4 p-3 bg-slate-800/50 rounded-lg text-xs text-slate-400">
            <div className="font-semibold text-slate-300 mb-1">Demo Credentials</div>
            <div>Username: <span className="text-teal-400 font-mono">admin</span></div>
            <div>Password: <span className="text-teal-400 font-mono">smartcity@2024</span></div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-4">
          © 2024 SmartCity Municipal Corporation. Authorized access only.
        </p>
      </div>
    </div>
  );
}
