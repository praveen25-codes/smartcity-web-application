import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import CityServices from './pages/CityServices';
import ReportComplaint from './pages/ReportComplaint';
import TrackComplaint from './pages/TrackComplaint';
import ComplaintsList from './pages/ComplaintsList';
import ComplaintDetail from './pages/ComplaintDetail';
import CityMonitoring from './pages/CityMonitoring';
import EmergencyServices from './pages/EmergencyServices';
import Announcements from './pages/Announcements';
import About from './pages/About';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin routes - no Layout wrapper */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />

        {/* Public routes - with Layout */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><CityServices /></Layout>} />
        <Route path="/report" element={<Layout><ReportComplaint /></Layout>} />
        <Route path="/track" element={<Layout><TrackComplaint /></Layout>} />
        <Route path="/complaints" element={<Layout><ComplaintsList /></Layout>} />
        <Route path="/complaints/:id" element={<Layout><ComplaintDetail /></Layout>} />
        <Route path="/monitoring" element={<Layout><CityMonitoring /></Layout>} />
        <Route path="/emergency" element={<Layout><EmergencyServices /></Layout>} />
        <Route path="/announcements" element={<Layout><Announcements /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}
