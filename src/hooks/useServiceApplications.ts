import { useState, useEffect } from 'react';

export interface ServiceApplication {
  applicationId: string;
  serviceName: string;
  department: string;
  applicantName: string;
  submittedAt: string;
  status: 'Submitted';
  formData: Record<string, string>;
}

const STORAGE_KEY = 'smartcity_service_applications';

export function useServiceApplications() {
  const [applications, setApplications] = useState<ServiceApplication[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const addApplication = (app: ServiceApplication) => {
    setApplications(prev => [app, ...prev]);
  };

  const generateApplicationId = () => {
    const year = new Date().getFullYear();
    const num = Math.floor(Math.random() * 900000) + 100000;
    return `SC-${year}-${num}`;
  };

  return { applications, addApplication, generateApplicationId };
}
