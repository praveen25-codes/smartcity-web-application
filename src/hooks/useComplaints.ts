import { useState, useEffect } from 'react';
import { Complaint, SAMPLE_COMPLAINTS } from '../data/sampleData';

const STORAGE_KEY = 'smartcity_complaints';

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return SAMPLE_COMPLAINTS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(complaints));
  }, [complaints]);

  const addComplaint = (c: Complaint) => {
    setComplaints(prev => [c, ...prev]);
  };

  const updateComplaint = (id: string, updates: Partial<Complaint>) => {
    setComplaints(prev =>
      prev.map(c => c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c)
    );
  };

  const deleteComplaint = (id: string) => {
    setComplaints(prev => prev.filter(c => c.id !== id));
  };

  const getComplaint = (id: string) => complaints.find(c => c.id === id);

  return { complaints, addComplaint, updateComplaint, deleteComplaint, getComplaint };
}
