import { useState, useEffect, useRef } from 'react';
import { X, CheckCircle, AlertCircle, List } from 'lucide-react';
import { Service, Complaint, newComplaintId } from '../data/sampleData';
import { useServiceApplications } from '../hooks/useServiceApplications';
import { useComplaints } from '../hooks/useComplaints';
import { useNavigate } from 'react-router-dom';

// Map service ID → closest existing ComplaintCategory
const SERVICE_CATEGORY_MAP: Record<string, Complaint['category']> = {
  'svc-001': 'Other',
  'svc-002': 'Other',
  'svc-003': 'Water Supply',
  'svc-004': 'Roads & Infrastructure',
  'svc-005': 'Garbage & Sanitation',
  'svc-006': 'Other',
  'svc-007': 'Traffic',
  'svc-008': 'Other',
};

// ─── Field definitions per service ───────────────────────────────────────────

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'tel' | 'email' | 'select' | 'textarea' | 'date' | 'file';
  placeholder?: string;
  required: boolean;
  options?: string[];
}

const SERVICE_FORMS: Record<string, { docs: string[]; fields: FieldDef[] }> = {
  'svc-001': {
    docs: ['Aadhaar Card', 'Birth/Death Hospital Record', 'Parent Marriage Certificate (for Birth)'],
    fields: [
      { key: 'applicantName', label: 'Applicant Name', type: 'text', placeholder: 'Full name as per Aadhaar', required: true },
      { key: 'certificateType', label: 'Certificate Type', type: 'select', required: true, options: ['Birth Certificate', 'Death Certificate', 'Marriage Certificate'] },
      { key: 'eventDate', label: 'Date of Birth / Death / Marriage', type: 'date', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'aadhaar', label: 'Aadhaar Number', type: 'text', placeholder: 'XXXX XXXX XXXX', required: true },
      { key: 'ward', label: 'Ward', type: 'text', placeholder: 'e.g. Ward 5', required: true },
    ]
  },
  'svc-002': {
    docs: ['Property Tax Assessment Notice', 'Previous Payment Receipt', 'Property Documents'],
    fields: [
      { key: 'propertyId', label: 'Property ID / Assessment Number', type: 'text', placeholder: 'e.g. PT-2024-XXXXX', required: true },
      { key: 'ownerName', label: 'Owner Name', type: 'text', placeholder: 'Property owner full name', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'assessmentYear', label: 'Assessment Year', type: 'select', required: true, options: ['2024-25', '2023-24', '2022-23', '2021-22'] },
      { key: 'amount', label: 'Tax Amount (₹)', type: 'text', placeholder: 'e.g. 4500', required: true },
      { key: 'paymentMode', label: 'Payment Mode', type: 'select', required: true, options: ['Online (UPI)', 'Debit Card', 'Credit Card', 'Net Banking'] },
    ]
  },
  'svc-003': {
    docs: ['Aadhaar Card', 'Property Proof / Rental Agreement', 'Previous Water Bill (for existing consumers)'],
    fields: [
      { key: 'consumerId', label: 'Consumer ID (if existing)', type: 'text', placeholder: 'Leave blank for new connection', required: false },
      { key: 'applicantName', label: 'Applicant Name', type: 'text', placeholder: 'Full name', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'serviceType', label: 'Service Type', type: 'select', required: true, options: ['New Connection', 'Bill Payment', 'Leak Report', 'Water Quality Complaint', 'Sewerage Blockage', 'Name Transfer'] },
      { key: 'address', label: 'Address / Location', type: 'textarea', placeholder: 'Full address of the property', required: true },
      { key: 'ward', label: 'Ward', type: 'text', placeholder: 'e.g. Ward 7', required: true },
    ]
  },
  'svc-004': {
    docs: ['Property Ownership Documents', 'Site Plan / Architectural Drawing', 'NOC from Neighbours (if applicable)', 'Soil Test Report (for multi-storey)'],
    fields: [
      { key: 'applicantName', label: 'Applicant Name', type: 'text', placeholder: 'Full name', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
      { key: 'propertyAddress', label: 'Property Address', type: 'textarea', placeholder: 'Complete property address with survey number', required: true },
      { key: 'buildingType', label: 'Building Type', type: 'select', required: true, options: ['Residential (Ground Floor)', 'Residential (Multi-Storey)', 'Commercial', 'Industrial', 'Renovation/Extension'] },
      { key: 'area', label: 'Built-up Area (sq. ft.)', type: 'text', placeholder: 'e.g. 1200', required: true },
      { key: 'floors', label: 'Number of Floors', type: 'select', required: true, options: ['1', '2', '3', '4', '5+'] },
      { key: 'documents', label: 'Documents (describe what you will submit)', type: 'textarea', placeholder: 'List the documents you have ready', required: false },
    ]
  },
  'svc-005': {
    docs: ['Aadhaar Card', 'Address Proof'],
    fields: [
      { key: 'applicantName', label: 'Applicant Name', type: 'text', placeholder: 'Full name', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'address', label: 'Address', type: 'textarea', placeholder: 'Full address for collection', required: true },
      { key: 'requestType', label: 'Request Type', type: 'select', required: true, options: ['Missed Collection Complaint', 'Bulk Waste Pickup', 'Hazardous Waste Disposal', 'Recycling Query', 'Bin Damage Report'] },
      { key: 'ward', label: 'Ward', type: 'text', placeholder: 'e.g. Ward 9', required: true },
      { key: 'description', label: 'Additional Details', type: 'textarea', placeholder: 'Describe the issue or request...', required: false },
    ]
  },
  'svc-006': {
    docs: ['Aadhaar Card', 'Passport-size Photograph', 'Address Proof'],
    fields: [
      { key: 'applicantName', label: 'Full Name', type: 'text', placeholder: 'As per Aadhaar', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
      { key: 'membershipType', label: 'Membership Type', type: 'select', required: true, options: ['Regular (Annual)', 'Student (Annual)', 'Senior Citizen (Free)', 'Digital Access Only'] },
      { key: 'address', label: 'Residential Address', type: 'textarea', placeholder: 'Full residential address', required: true },
      { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
    ]
  },
  'svc-007': {
    docs: ['Aadhaar Card', 'Age Proof', 'Address Proof', 'Existing License (for renewal)'],
    fields: [
      { key: 'applicantName', label: 'Full Name', type: 'text', placeholder: 'As per Aadhaar', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
      { key: 'serviceType', label: 'Service Type', type: 'select', required: true, options: ['New Driving License', 'License Renewal', 'Vehicle Registration', 'Road Tax Payment', 'RC Transfer'] },
      { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { key: 'address', label: 'Permanent Address', type: 'textarea', placeholder: 'Full address', required: true },
    ]
  },
  'svc-008': {
    docs: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate (if applicable)', 'Bank Passbook Copy'],
    fields: [
      { key: 'applicantName', label: 'Applicant Name', type: 'text', placeholder: 'Full name', required: true },
      { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: true },
      { key: 'schemeType', label: 'Scheme / Benefit Type', type: 'select', required: true, options: ['Old Age Pension', 'Widow Pension', 'Disability Benefit', 'Scholarship Application', 'Ration Card', 'Below Poverty Line Registration'] },
      { key: 'dob', label: 'Date of Birth', type: 'date', required: true },
      { key: 'address', label: 'Address', type: 'textarea', placeholder: 'Residential address', required: true },
      { key: 'bankAccount', label: 'Bank Account Number', type: 'text', placeholder: 'For direct benefit transfer', required: true },
    ]
  },
};

// Fallback for any future services
const DEFAULT_FORM: { docs: string[]; fields: FieldDef[] } = {
  docs: ['Aadhaar Card', 'Address Proof'],
  fields: [
    { key: 'applicantName', label: 'Applicant Name', type: 'text', placeholder: 'Full name', required: true },
    { key: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '10-digit mobile number', required: true },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'your@email.com', required: false },
    { key: 'description', label: 'Request Details', type: 'textarea', placeholder: 'Describe your request...', required: true },
  ]
};

// ─── Validation helpers ───────────────────────────────────────────────────────

function validateField(field: FieldDef, value: string): string {
  if (field.required && !value.trim()) return `${field.label} is required`;
  if (!value.trim()) return '';
  if (field.type === 'tel') {
    const digits = value.replace(/\D/g, '');
    if (digits.length !== 10) return 'Enter a valid 10-digit Indian mobile number';
  }
  if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return 'Enter a valid email address';
  }
  return '';
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ complaintId, service, onClose }: { complaintId: string; service: Service; onClose: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center text-center py-4">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
        <CheckCircle size={32} className="text-green-600" />
      </div>
      <h3 className="font-display font-bold text-xl text-[#1e3a5f] mb-1">Service Request Submitted!</h3>
      <p className="text-slate-500 text-sm mb-5">Your request has been registered. Track it using the Complaint ID below.</p>

      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 w-full mb-5 text-left space-y-3">
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Complaint ID</div>
          <div className="font-mono font-bold text-xl text-[#1e3a5f] mt-0.5">{complaintId}</div>
          <div className="text-xs text-slate-400 mt-0.5">Use this ID to track your request</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Service</div>
          <div className="font-semibold text-slate-800 mt-0.5">{service.name}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Department</div>
          <div className="text-slate-700 mt-0.5">{service.department}</div>
        </div>
        <div>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">Status</div>
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-700 text-xs font-semibold px-2 py-1 rounded-full mt-0.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Pending
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => { onClose(); navigate(`/complaints/${complaintId}`); }}
          className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#163158] text-white py-2.5 rounded-lg font-semibold text-sm transition"
        >
          <CheckCircle size={14} /> Track Complaint
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => { onClose(); navigate('/complaints'); }}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg font-semibold text-sm transition"
          >
            <List size={14} /> View Complaints
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-lg text-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────

interface ServiceModalProps {
  service: Service;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const { addApplication } = useServiceApplications();
  const { addComplaint } = useComplaints();
  const formDef = SERVICE_FORMS[service.id] || DEFAULT_FORM;

  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(formDef.fields.map(f => [f.key, '']))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [complaintId, setComplaintId] = useState('');
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>(null);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  // Focus first input on open
  useEffect(() => {
    setTimeout(() => firstInputRef.current?.focus(), 100);
  }, []);

  const setVal = (key: string, val: string) => {
    setValues(prev => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    for (const field of formDef.fields) {
      const err = validateField(field, values[field.key] ?? '');
      if (err) newErrors[field.key] = err;
    }
    if (Object.keys(newErrors).length) { setErrors(newErrors); return; }

    const now = new Date().toISOString();
    const id = newComplaintId();
    const applicantName = values.applicantName || values.ownerName || 'Applicant';
    const location = values.address || values.propertyAddress || values.ward || service.location;
    const ward = values.ward || 'Ward 1';

    // Build a description from key form values
    const descParts = formDef.fields
      .filter(f => values[f.key]?.trim() && f.type !== 'date' && f.key !== 'phone' && f.key !== 'email' && f.key !== 'bankAccount' && f.key !== 'aadhaar')
      .slice(0, 4)
      .map(f => `${f.label}: ${values[f.key]}`);
    const description = `[Online Service Request] ${service.name}. ${descParts.join(' | ')}`;

    // Save to the main complaints system so Track/Admin/List all work
    const complaint: Complaint = {
      id,
      category: SERVICE_CATEGORY_MAP[service.id] || 'Other',
      description,
      location,
      ward,
      name: applicantName,
      phone: values.phone || '',
      email: values.email || service.email,
      status: 'Pending',
      priority: 'Medium',
      createdAt: now,
      updatedAt: now,
      source: 'Online Service',
      timeline: [{ status: 'Pending', note: `Online service request submitted for ${service.name} via City Services portal.`, date: now }],
    };
    addComplaint(complaint);

    // Also save to the dedicated service applications store (preserves existing data)
    addApplication({
      applicationId: id,
      serviceName: service.name,
      department: service.department,
      applicantName,
      submittedAt: now,
      status: 'Submitted',
      formData: values,
    });

    setComplaintId(id);
    setSubmitted(true);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === backdropRef.current) onClose();
  };

  const inputCls = (key: string) =>
    `w-full border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition ${errors[key] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'}`;

  let inputIndex = 0;

  return (
    <div
      ref={backdropRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.name} online service form`}
      style={{ animation: 'fadeIn 0.15s ease' }}
    >
      <style>{`@keyframes fadeIn{from{opacity:0;transform:scale(0.97)}to{opacity:1;transform:scale(1)}}`}</style>

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden" style={{ animation: 'fadeIn 0.18s ease' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2563eb] px-6 py-4 flex items-start justify-between gap-3 shrink-0">
          <div>
            <div className="text-teal-200 text-xs font-medium mb-0.5">{service.department}</div>
            <h2 className="font-display font-bold text-white text-lg leading-snug">{service.name}</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition shrink-0 mt-0.5"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {submitted ? (
            <SuccessScreen complaintId={complaintId} service={service} onClose={onClose} />
          ) : (
            <>
              <p className="text-slate-500 text-sm mb-4">{service.description}</p>

              {/* Required documents */}
              {formDef.docs.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-5">
                  <div className="text-xs font-semibold text-amber-800 mb-1.5">Required Documents</div>
                  <ul className="space-y-0.5">
                    {formDef.docs.map(doc => (
                      <li key={doc} className="flex items-start gap-1.5 text-xs text-amber-700">
                        <span className="mt-0.5">•</span> {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Form fields */}
              <div className="space-y-4">
                {formDef.fields.map(field => {
                  const isFirst = inputIndex === 0;
                  inputIndex++;
                  const refCallback = isFirst
                    ? (el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null) => { firstInputRef.current = el; }
                    : undefined;

                  return (
                    <div key={field.key}>
                      <label htmlFor={field.key} className="block text-sm font-medium text-slate-700 mb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>

                      {field.type === 'select' ? (
                        <select
                          id={field.key}
                          value={values[field.key]}
                          onChange={e => setVal(field.key, e.target.value)}
                          ref={refCallback as React.RefCallback<HTMLSelectElement>}
                          className={inputCls(field.key)}
                        >
                          <option value="">— Select —</option>
                          {field.options?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      ) : field.type === 'textarea' ? (
                        <textarea
                          id={field.key}
                          rows={3}
                          value={values[field.key]}
                          onChange={e => setVal(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          className={inputCls(field.key)}
                        />
                      ) : field.type === 'file' ? (
                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center text-slate-400 text-sm hover:border-[#2563eb] cursor-pointer transition">
                          📎 Click to attach documents (PDF, JPG, PNG)
                        </div>
                      ) : (
                        <input
                          id={field.key}
                          type={field.type}
                          value={values[field.key]}
                          onChange={e => setVal(field.key, e.target.value)}
                          placeholder={field.placeholder}
                          ref={refCallback as React.RefCallback<HTMLInputElement>}
                          className={inputCls(field.key)}
                        />
                      )}

                      {errors[field.key] && (
                        <p className="flex items-center gap-1 text-red-500 text-xs mt-1">
                          <AlertCircle size={11} /> {errors[field.key]}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        {!submitted && (
          <div className="px-6 py-4 border-t border-slate-100 flex gap-3 shrink-0 bg-white">
            <button
              onClick={handleSubmit}
              className="flex-1 bg-[#0d9488] hover:bg-[#0f766e] text-white py-2.5 rounded-lg font-semibold text-sm transition flex items-center justify-center gap-2"
            >
              <CheckCircle size={15} /> Submit Application
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-lg text-sm font-medium transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
