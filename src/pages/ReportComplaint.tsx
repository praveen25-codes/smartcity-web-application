import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Upload, MapPin, X, ImageIcon } from 'lucide-react';
import { useComplaints } from '../hooks/useComplaints';
import { CATEGORY_OPTIONS, WARD_OPTIONS, newComplaintId, Complaint } from '../data/sampleData';

type FormData = {
  name: string;
  phone: string;
  email: string;
  category: string;
  description: string;
  location: string;
  ward: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
};

const INITIAL: FormData = {
  name: '', phone: '', email: '', category: '', description: '',
  location: '', ward: '', priority: 'Medium'
};

export default function ReportComplaint() {
  const navigate = useNavigate();
  const { addComplaint } = useComplaints();
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  // Photo upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photo, setPhoto] = useState<{ preview: string; name: string; size: string } | null>(null);
  const [photoError, setPhotoError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('Please select an image file (JPG, PNG, WEBP, etc.).');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setPhotoError('Photo size must be less than 5 MB.');
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setPhotoError('');
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhoto({
        preview: ev.target?.result as string,
        name: file.name,
        size: file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
          : Math.round(file.size / 1024) + ' KB',
      });
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPhoto(null);
    setPhotoError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const set = (k: keyof FormData, v: string) => {
    setForm(prev => ({ ...prev, [k]: v }));
    if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined }));
  };

  const validate = () => {
    const e: Partial<FormData> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.category) e.category = 'Select a category';
    if (!form.description.trim() || form.description.length < 20) e.description = 'Please provide more detail (min 20 chars)';
    if (!form.location.trim()) e.location = 'Location is required';
    if (!form.ward) e.ward = 'Select a ward';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }

    const id = newComplaintId();
    const now = new Date().toISOString();
    const complaint: Complaint = {
      id,
      category: form.category as Complaint['category'],
      description: form.description,
      location: form.location,
      ward: form.ward,
      name: form.name,
      phone: form.phone,
      email: form.email,
      status: 'Pending',
      priority: form.priority,
      createdAt: now,
      updatedAt: now,
      timeline: [{ status: 'Pending', note: 'Complaint registered successfully. Awaiting review.', date: now }],
      ...(photo ? { image: photo.preview } : {}),
    };
    addComplaint(complaint);
    setSubmitted(id);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg max-w-md w-full p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-[#1e3a5f] mb-2">Complaint Registered!</h2>
          <p className="text-slate-500 mb-4">Your complaint has been successfully submitted and will be reviewed within 24-48 hours.</p>
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
            <div className="text-xs text-slate-500 mb-1">Your Complaint ID</div>
            <div className="font-mono font-bold text-2xl text-[#1e3a5f]">{submitted}</div>
            <div className="text-xs text-slate-400 mt-1">Save this ID to track your complaint</div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/complaints/${submitted}`)}
              className="flex-1 bg-[#1e3a5f] hover:bg-[#163158] text-white py-2.5 rounded-lg font-semibold text-sm transition"
            >
              Track Status
            </button>
            <button
              onClick={() => { setSubmitted(null); setForm(INITIAL); setStep(1); setPhoto(null); setPhotoError(''); }}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-semibold text-sm transition"
            >
              New Complaint
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputCls = (k: keyof FormData) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] transition ${errors[k] ? 'border-red-400' : 'border-slate-200'}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-[#1e3a5f] py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-teal-300 text-sm font-medium mb-2">SmartCity Portal</div>
          <h1 className="font-display text-3xl font-bold text-white mb-2">Report a Complaint</h1>
          <p className="text-slate-300">Fill in the details below and our team will respond within 48 hours.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress steps */}
        <div className="flex items-center mb-8">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0 ${step >= s ? 'bg-[#1e3a5f] text-white' : 'bg-slate-200 text-slate-400'}`}>{s}</div>
              <div className="text-xs ml-2 text-slate-500 hidden sm:block">
                {s === 1 ? 'Personal Info' : s === 2 ? 'Issue Details' : 'Location'}
              </div>
              {s < 3 && <div className={`flex-1 h-0.5 mx-3 ${step > s ? 'bg-[#1e3a5f]' : 'bg-slate-200'}`}></div>}
            </div>
          ))}
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-[#1e3a5f] mb-4">Personal Information</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name *</label>
                <input type="text" placeholder="Your full name" value={form.name} onChange={e => set('name', e.target.value)} className={inputCls('name')} />
                {errors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.name}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label>
                <input type="tel" placeholder="+91 XXXXXXXXXX" value={form.phone} onChange={e => set('phone', e.target.value)} className={inputCls('phone')} />
                {errors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label>
                <input type="email" placeholder="your@email.com" value={form.email} onChange={e => set('email', e.target.value)} className={inputCls('email')} />
                {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.email}</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-[#1e3a5f] mb-4">Issue Details</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category *</label>
                <select value={form.category} onChange={e => set('category', e.target.value)} className={inputCls('category')}>
                  <option value="">Select a category</option>
                  {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.category}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Priority *</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['Low', 'Medium', 'High', 'Critical'] as const).map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => set('priority', p)}
                      className={`py-2 rounded-lg text-xs font-semibold border transition ${form.priority === p ? {
                        'Low': 'bg-green-100 border-green-400 text-green-700',
                        'Medium': 'bg-yellow-100 border-yellow-400 text-yellow-700',
                        'High': 'bg-orange-100 border-orange-400 text-orange-700',
                        'Critical': 'bg-red-100 border-red-400 text-red-700',
                      }[p] : 'bg-slate-50 border-slate-200 text-slate-500'}`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description *</label>
                <textarea
                  rows={4}
                  placeholder="Describe the issue in detail (minimum 20 characters)..."
                  value={form.description}
                  onChange={e => set('description', e.target.value)}
                  className={inputCls('description')}
                />
                <div className="text-xs text-slate-400 text-right">{form.description.length} chars</div>
                {errors.description && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.description}</p>}
              </div>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                aria-label="Upload a photo of the issue"
                className="sr-only"
                onChange={handleFileChange}
              />

              {photo ? (
                /* Preview state */
                <div className="border-2 border-[#2563eb]/30 rounded-lg overflow-hidden">
                  <div className="relative">
                    <img
                      src={photo.preview}
                      alt="Selected photo preview"
                      className="w-full max-h-48 object-cover cursor-pointer"
                      onClick={() => fileInputRef.current?.click()}
                      title="Click to replace photo"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      aria-label="Remove photo"
                      className="absolute top-2 right-2 w-7 h-7 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow transition"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  <div className="px-3 py-2 bg-slate-50 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <ImageIcon size={13} className="text-[#2563eb] shrink-0" />
                      <span className="text-xs text-slate-700 font-medium truncate">{photo.name}</span>
                      <span className="text-xs text-slate-400 shrink-0">{photo.size}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-xs text-[#2563eb] hover:underline shrink-0 font-medium"
                    >
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty / clickable state */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  aria-label="Upload a photo of the issue"
                  className="w-full border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-slate-400 cursor-pointer hover:border-[#2563eb] hover:text-[#2563eb] transition"
                >
                  <Upload size={20} className="mx-auto mb-1" />
                  <div className="text-xs">Upload photo (optional)</div>
                  <div className="text-xs mt-0.5 opacity-70">JPG, PNG, WEBP · max 5 MB</div>
                </button>
              )}

              {photoError && (
                <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                  <AlertCircle size={11} /> {photoError}
                </p>
              )}
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="font-display font-bold text-lg text-[#1e3a5f] mb-4">Location Details</h2>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Ward *</label>
                <select value={form.ward} onChange={e => set('ward', e.target.value)} className={inputCls('ward')}>
                  <option value="">Select your ward</option>
                  {WARD_OPTIONS.map(w => <option key={w} value={w}>{w}</option>)}
                </select>
                {errors.ward && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.ward}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location / Address *</label>
                <div className="relative">
                  <MapPin size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" placeholder="Street address, landmark, area..." value={form.location} onChange={e => set('location', e.target.value)} className={`${inputCls('location')} pl-9`} />
                </div>
                {errors.location && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={11} /> {errors.location}</p>}
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-sm">
                <div className="font-semibold text-slate-700 mb-2">Complaint Summary</div>
                <div className="space-y-1 text-slate-600">
                  <div><span className="font-medium">Name:</span> {form.name || '—'}</div>
                  <div><span className="font-medium">Category:</span> {form.category || '—'}</div>
                  <div><span className="font-medium">Priority:</span> {form.priority}</div>
                  <div><span className="font-medium">Ward:</span> {form.ward || '—'}</div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 pt-4 border-t border-slate-100">
            {step > 1 ? (
              <button onClick={() => setStep(s => s - 1)} className="px-5 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition">Back</button>
            ) : <div />}
            {step < 3 ? (
              <button
                onClick={() => {
                  if (step === 1) {
                    const e = validate();
                    const step1errors = { name: e.name, phone: e.phone, email: e.email };
                    const hasErr = Object.values(step1errors).some(Boolean);
                    if (hasErr) { setErrors(step1errors); return; }
                  }
                  if (step === 2) {
                    const e = validate();
                    const step2errors = { category: e.category, description: e.description };
                    if (Object.values(step2errors).some(Boolean)) { setErrors(step2errors); return; }
                  }
                  setStep(s => s + 1);
                }}
                className="bg-[#1e3a5f] hover:bg-[#163158] text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
              >
                Next
              </button>
            ) : (
              <button onClick={handleSubmit} className="bg-[#0d9488] hover:bg-[#0f766e] text-white px-8 py-2 rounded-lg text-sm font-bold transition flex items-center gap-2">
                <CheckCircle size={16} /> Submit Complaint
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
