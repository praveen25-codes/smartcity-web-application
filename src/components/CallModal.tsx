import { useEffect, useRef, useState } from 'react';
import { X, Phone, Copy, Check } from 'lucide-react';
import { Service } from '../data/sampleData';

interface CallModalProps {
  service: Service;
  onClose: () => void;
}

function cleanPhone(phone: string) {
  return phone.replace(/[\s\-().+]/g, '');
}

export default function CallModal({ service, onClose }: CallModalProps) {
  const [copied, setCopied] = useState(false);
  const backdropRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    setTimeout(() => closeBtnRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(service.phone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback for environments without clipboard API
      const el = document.createElement('textarea');
      el.value = service.phone;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdrop}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`Call ${service.name}`}
      style={{ animation: 'fadeIn 0.15s ease' }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}`}</style>

      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        style={{ animation: 'fadeIn 0.18s ease' }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] px-5 py-4 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <Phone size={18} className="text-white" />
            </div>
            <div>
              <div className="text-teal-200 text-xs font-medium">Contact Helpline</div>
              <div className="font-display font-bold text-white text-sm leading-snug">{service.name}</div>
            </div>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition shrink-0 mt-0.5"
          >
            <X size={15} />
          </button>
        </div>

        {/* Body */}
        <div className="px-5 py-5">
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Service</span>
              <span className="font-medium text-slate-800 text-right">{service.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Department</span>
              <span className="font-medium text-slate-800 text-right">{service.department}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Hours</span>
              <span className="font-medium text-slate-800 text-right">{service.hours}</span>
            </div>
          </div>

          {/* Phone number display */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center mb-5">
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wide mb-1">Helpline Number</div>
            <div className="font-display font-bold text-2xl text-[#1e3a5f]">{service.phone}</div>
            <div className="text-xs text-slate-400 mt-0.5">Toll-free helpline</div>
          </div>

          {/* Copy success message */}
          {copied && (
            <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-medium mb-3 bg-green-50 border border-green-200 rounded-lg py-2">
              <Check size={14} /> Phone number copied to clipboard
            </div>
          )}

          {/* Action buttons */}
          <div className="flex gap-3 mb-3">
            <a
              href={`tel:${cleanPhone(service.phone)}`}
              aria-label={`Call ${service.phone}`}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0d9488] hover:bg-[#0f766e] text-white py-3 rounded-xl font-semibold text-sm transition"
            >
              <Phone size={15} /> Call Now
            </a>
            <button
              onClick={handleCopy}
              aria-label="Copy phone number"
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition border ${copied ? 'bg-green-50 border-green-300 text-green-700' : 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'}`}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? 'Copied!' : 'Copy Number'}
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-500 rounded-xl text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
