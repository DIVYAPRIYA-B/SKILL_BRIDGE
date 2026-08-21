import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type {
  User, Role, StudentProfile, CompanyProfile, Internship, Application,
  Mentor, MentorRequest, Language, AccessibilityMode, RoadmapModule,
} from '@/types';
import { storage } from '@/lib/storage';
import {
  demoUsers, demoStudents, demoCompanies, demoInternships,
  demoApplications, demoMentors, demoMentorRequests, uid,
} from '@/data/demoData';

interface ToastMsg { id: string; message: string; type: 'success' | 'error' | 'info'; }

interface AppContextValue {
  // Auth
  currentUser: User | null;
  login: (email: string, password: string, role: Role) => { ok: boolean; error?: string };
  register: (data: { email: string; password: string; name: string; role: Role }) => { ok: boolean; error?: string };
  logout: () => void;
  // Data
  users: User[];
  students: StudentProfile[];
  companies: CompanyProfile[];
  internships: Internship[];
  applications: Application[];
  mentors: Mentor[];
  mentorRequests: MentorRequest[];
  // Student actions
  updateStudentProfile: (profile: StudentProfile) => void;
  addApplication: (app: Omit<Application, 'id' | 'appliedAt' | 'status'>) => { ok: boolean; error?: string };
  updateApplicationStatus: (id: string, status: Application['status'], interviewDate?: string) => void;
  addMentorRequest: (req: Omit<MentorRequest, 'id' | 'requestedAt' | 'status'>) => { ok: boolean; error?: string };
  saveRoadmap: (role: string, modules: RoadmapModule[]) => void;
  getRoadmap: (role: string) => RoadmapModule[] | null;
  // Industry actions
  addInternship: (data: Omit<Internship, 'id' | 'postedAt' | 'status'>) => void;
  updateCompanyProfile: (profile: CompanyProfile) => void;
  // Admin actions
  toggleUserStatus: (userId: string) => void;
  // UI state
  language: Language;
  setLanguage: (l: Language) => void;
  accessibility: AccessibilityMode;
  setAccessibility: (a: AccessibilityMode) => void;
  lowBandwidth: boolean;
  setLowBandwidth: (v: boolean) => void;
  // Toast
  toasts: ToastMsg[];
  toast: (message: string, type?: 'success' | 'error' | 'info') => void;
  dismissToast: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(() => storage.get<User | null>('currentUser', null));
  const [users, setUsers] = useState<User[]>(() => storage.get('users', demoUsers));
  const [students, setStudents] = useState<StudentProfile[]>(() => storage.get('students', demoStudents));
  const [companies, setCompanies] = useState<CompanyProfile[]>(() => storage.get('companies', demoCompanies));
  const [internships, setInternships] = useState<Internship[]>(() => storage.get('internships', demoInternships));
  const [applications, setApplications] = useState<Application[]>(() => storage.get('applications', demoApplications));
  const [mentors] = useState<Mentor[]>(() => storage.get('mentors', demoMentors));
  const [mentorRequests, setMentorRequests] = useState<MentorRequest[]>(() => storage.get('mentorRequests', demoMentorRequests));
  const [roadmaps, setRoadmaps] = useState<Record<string, RoadmapModule[]>>(() => storage.get('roadmaps', {}));

  const [language, setLanguageState] = useState<Language>(() => storage.get('language', 'en'));
  const [accessibility, setAccessibilityState] = useState<AccessibilityMode>(() => storage.get('accessibility', 'normal'));
  const [lowBandwidth, setLowBandwidthState] = useState<boolean>(() => storage.get('lowBandwidth', false));
  const [toasts, setToasts] = useState<ToastMsg[]>([]);

  // Persist
  useEffect(() => { storage.set('users', users); }, [users]);
  useEffect(() => { storage.set('students', students); }, [students]);
  useEffect(() => { storage.set('companies', companies); }, [companies]);
  useEffect(() => { storage.set('internships', internships); }, [internships]);
  useEffect(() => { storage.set('applications', applications); }, [applications]);
  useEffect(() => { storage.set('mentorRequests', mentorRequests); }, [mentorRequests]);
  useEffect(() => { storage.set('roadmaps', roadmaps); }, [roadmaps]);
  useEffect(() => { storage.set('currentUser', currentUser); }, [currentUser]);
  useEffect(() => { storage.set('language', language); }, [language]);
  useEffect(() => { storage.set('accessibility', accessibility); }, [accessibility]);
  useEffect(() => { storage.set('lowBandwidth', lowBandwidth); }, [lowBandwidth]);

  // Apply accessibility & low bandwidth to <html>
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle('high-contrast', accessibility === 'high-contrast');
    html.style.setProperty('--font-scale', accessibility === 'large' ? '1.15' : '1');
    html.classList.toggle('low-bandwidth', lowBandwidth);
  }, [accessibility, lowBandwidth]);

  const toast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = uid('toast');
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500);
  }, []);
  const dismissToast = useCallback((id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)), []);

  const login = useCallback((email: string, password: string, role: Role) => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password && u.role === role);
    if (!user) return { ok: false, error: 'Invalid email, password, or role.' };
    setCurrentUser(user);
    return { ok: true };
  }, [users]);

  const register = useCallback((data: { email: string; password: string; name: string; role: Role }) => {
    if (users.some((u) => u.email.toLowerCase() === data.email.toLowerCase())) {
      return { ok: false, error: 'Email already registered.' };
    }
    const newUser: User = { id: uid('u'), email: data.email, password: data.password, role: data.role, name: data.name, createdAt: new Date().toISOString() };
    setUsers((prev) => [...prev, newUser]);
    if (data.role === 'student') {
      setStudents((prev) => [...prev, {
        userId: newUser.id, name: data.name, age: '', location: '', state: '', language: 'en',
        degree: '', branch: '', graduationYear: '', college: '', skills: [], careerInterest: '',
        workMode: 'hybrid', preferredLocation: '', minStipend: '', duration: '', onboarded: false,
        resume: { summary: '', skills: [], projects: [], education: [], experience: [], achievements: [] },
      }]);
    } else if (data.role === 'industry') {
      setCompanies((prev) => [...prev, {
        userId: newUser.id, companyName: data.name, industry: '', location: '', website: '',
        description: '', size: '',
      }]);
    }
    setCurrentUser(newUser);
    return { ok: true };
  }, [users]);

  const logout = useCallback(() => setCurrentUser(null), []);

  const updateStudentProfile = useCallback((profile: StudentProfile) => {
    setStudents((prev) => {
      const exists = prev.some((s) => s.userId === profile.userId);
      return exists ? prev.map((s) => (s.userId === profile.userId ? profile : s)) : [...prev, profile];
    });
  }, []);

  const addApplication = useCallback((app: Omit<Application, 'id' | 'appliedAt' | 'status'>) => {
    if (applications.some((a) => a.internshipId === app.internshipId && a.studentId === app.studentId)) {
      return { ok: false, error: 'You have already applied for this internship.' };
    }
    const newApp: Application = { ...app, id: uid('app'), appliedAt: new Date().toISOString(), status: 'applied' };
    setApplications((prev) => [...prev, newApp]);
    return { ok: true };
  }, [applications]);

  const updateApplicationStatus = useCallback((id: string, status: Application['status'], interviewDate?: string) => {
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status, interviewDate: interviewDate ?? a.interviewDate } : a)));
  }, []);

  const addMentorRequest = useCallback((req: Omit<MentorRequest, 'id' | 'requestedAt' | 'status'>) => {
    if (mentorRequests.some((r) => r.mentorId === req.mentorId && r.studentId === req.studentId)) {
      return { ok: false, error: 'You have already requested this mentor.' };
    }
    setMentorRequests((prev) => [...prev, { ...req, id: uid('mr'), requestedAt: new Date().toISOString(), status: 'pending' }]);
    return { ok: true };
  }, [mentorRequests]);

  const saveRoadmap = useCallback((role: string, modules: RoadmapModule[]) => {
    setRoadmaps((prev) => ({ ...prev, [role]: modules }));
  }, []);

  const getRoadmap = useCallback((role: string) => roadmaps[role] ?? null, [roadmaps]);

  const addInternship = useCallback((data: Omit<Internship, 'id' | 'postedAt' | 'status'>) => {
    setInternships((prev) => [...prev, { ...data, id: uid('int'), postedAt: new Date().toISOString(), status: 'active' as const }]);
  }, []);

  const updateCompanyProfile = useCallback((profile: CompanyProfile) => {
    setCompanies((prev) => {
      const exists = prev.some((c) => c.userId === profile.userId);
      return exists ? prev.map((c) => (c.userId === profile.userId ? profile : c)) : [...prev, profile];
    });
  }, []);

  const toggleUserStatus = useCallback((_userId: string) => {
    // For demo: just a no-op placeholder that could disable users
  }, []);

  const setLanguage = useCallback((l: Language) => setLanguageState(l), []);
  const setAccessibility = useCallback((a: AccessibilityMode) => setAccessibilityState(a), []);
  const setLowBandwidth = useCallback((v: boolean) => setLowBandwidthState(v), []);

  const value: AppContextValue = {
    currentUser, login, register, logout,
    users, students, companies, internships, applications, mentors, mentorRequests,
    updateStudentProfile, addApplication, updateApplicationStatus, addMentorRequest,
    saveRoadmap, getRoadmap, addInternship, updateCompanyProfile, toggleUserStatus,
    language, setLanguage, accessibility, setAccessibility, lowBandwidth, setLowBandwidth,
    toasts, toast, dismissToast,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
