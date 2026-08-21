import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from '@/context/AppContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import ProtectedRoute from '@/components/ProtectedRoute';
import DashboardLayout from '@/components/layout/DashboardLayout';
import ToastContainer from '@/components/ui/Toast';

import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Onboarding from '@/pages/Onboarding';
import NotFound from '@/pages/NotFound';

import StudentDashboard from '@/pages/student/Dashboard';
import AIAssistant from '@/pages/student/AIAssistant';
import SkillGap from '@/pages/student/SkillGap';
import Roadmap from '@/pages/student/Roadmap';
import Opportunities from '@/pages/student/Opportunities';
import Top10 from '@/pages/student/Top10';
import Applications from '@/pages/student/Applications';
import Mentors from '@/pages/student/Mentors';
import Resume from '@/pages/student/Resume';
import Profile from '@/pages/student/Profile';
import InternshipDetails from '@/pages/student/InternshipDetails';

import IndustryDashboard from '@/pages/industry/Dashboard';
import PostInternship from '@/pages/industry/PostInternship';
import IndustryInternships from '@/pages/industry/IndustryInternships';
import IndustryApplications from '@/pages/industry/IndustryApplications';
import Candidates from '@/pages/industry/Candidates';
import Interviews from '@/pages/industry/Interviews';
import IndustryMentors from '@/pages/industry/IndustryMentors';
import CompanyProfile from '@/pages/industry/CompanyProfile';

import AdminDashboard from '@/pages/admin/Dashboard';
import AdminStudents from '@/pages/admin/AdminStudents';
import AdminCompanies from '@/pages/admin/AdminCompanies';
import AdminInternships from '@/pages/admin/AdminInternships';
import AdminApplications from '@/pages/admin/AdminApplications';
import AdminMentors from '@/pages/admin/AdminMentors';
import AdminAnalytics from '@/pages/admin/AdminAnalytics';
import AdminSettings from '@/pages/admin/AdminSettings';

function StudentLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute role="student"><DashboardLayout>{children}</DashboardLayout></ProtectedRoute>;
}
function IndustryLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute role="industry"><DashboardLayout>{children}</DashboardLayout></ProtectedRoute>;
}
function AdminLayout({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute role="admin"><DashboardLayout>{children}</DashboardLayout></ProtectedRoute>;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <HashRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/onboarding" element={<ProtectedRoute role="student"><Onboarding /></ProtectedRoute>} />

            {/* Student */}
            <Route path="/student" element={<StudentLayout><StudentDashboard /></StudentLayout>} />
            <Route path="/student/assistant" element={<StudentLayout><AIAssistant /></StudentLayout>} />
            <Route path="/student/skill-gap" element={<StudentLayout><SkillGap /></StudentLayout>} />
            <Route path="/student/roadmap" element={<StudentLayout><Roadmap /></StudentLayout>} />
            <Route path="/student/opportunities" element={<StudentLayout><Opportunities /></StudentLayout>} />
            <Route path="/student/top-10" element={<StudentLayout><Top10 /></StudentLayout>} />
            <Route path="/student/applications" element={<StudentLayout><Applications /></StudentLayout>} />
            <Route path="/student/mentors" element={<StudentLayout><Mentors /></StudentLayout>} />
            <Route path="/student/resume" element={<StudentLayout><Resume /></StudentLayout>} />
            <Route path="/student/profile" element={<StudentLayout><Profile /></StudentLayout>} />
            <Route path="/student/internship/:id" element={<StudentLayout><InternshipDetails /></StudentLayout>} />

            {/* Industry */}
            <Route path="/industry" element={<IndustryLayout><IndustryDashboard /></IndustryLayout>} />
            <Route path="/industry/post" element={<IndustryLayout><PostInternship /></IndustryLayout>} />
            <Route path="/industry/internships" element={<IndustryLayout><IndustryInternships /></IndustryLayout>} />
            <Route path="/industry/applications" element={<IndustryLayout><IndustryApplications /></IndustryLayout>} />
            <Route path="/industry/candidates" element={<IndustryLayout><Candidates /></IndustryLayout>} />
            <Route path="/industry/interviews" element={<IndustryLayout><Interviews /></IndustryLayout>} />
            <Route path="/industry/mentors" element={<IndustryLayout><IndustryMentors /></IndustryLayout>} />
            <Route path="/industry/profile" element={<IndustryLayout><CompanyProfile /></IndustryLayout>} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/students" element={<AdminLayout><AdminStudents /></AdminLayout>} />
            <Route path="/admin/companies" element={<AdminLayout><AdminCompanies /></AdminLayout>} />
            <Route path="/admin/internships" element={<AdminLayout><AdminInternships /></AdminLayout>} />
            <Route path="/admin/applications" element={<AdminLayout><AdminApplications /></AdminLayout>} />
            <Route path="/admin/mentors" element={<AdminLayout><AdminMentors /></AdminLayout>} />
            <Route path="/admin/analytics" element={<AdminLayout><AdminAnalytics /></AdminLayout>} />
            <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

            {/* Fallback */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <ToastContainer />
        </HashRouter>
      </AppProvider>
    </ErrorBoundary>
  );
}
