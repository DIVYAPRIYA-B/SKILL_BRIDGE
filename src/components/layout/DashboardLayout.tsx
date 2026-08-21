import { useState, type ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { LayoutDashboard, Bot, Target, Map, Briefcase, Trophy, FileText, Users, FileEdit, User, Building2, PlusCircle, Calendar, BarChart3, Settings } from 'lucide-react';
import type { Role } from '@/types';

interface NavItem { to: string; labelKey: string; icon: typeof LayoutDashboard; }

const navConfig: Record<Role, NavItem[]> = {
  student: [
    { to: '/student', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { to: '/student/assistant', labelKey: 'nav.assistant', icon: Bot },
    { to: '/student/skill-gap', labelKey: 'nav.skillgap', icon: Target },
    { to: '/student/roadmap', labelKey: 'nav.roadmap', icon: Map },
    { to: '/student/opportunities', labelKey: 'nav.opportunities', icon: Briefcase },
    { to: '/student/top-10', labelKey: 'nav.top10', icon: Trophy },
    { to: '/student/applications', labelKey: 'nav.applications', icon: FileText },
    { to: '/student/mentors', labelKey: 'nav.mentors', icon: Users },
    { to: '/student/resume', labelKey: 'nav.resume', icon: FileEdit },
    { to: '/student/profile', labelKey: 'nav.profile', icon: User },
  ],
  industry: [
    { to: '/industry', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { to: '/industry/post', labelKey: 'nav.postInternship', icon: PlusCircle },
    { to: '/industry/internships', labelKey: 'nav.internships', icon: Briefcase },
    { to: '/industry/applications', labelKey: 'nav.applications', icon: FileText },
    { to: '/industry/candidates', labelKey: 'nav.candidates', icon: Users },
    { to: '/industry/interviews', labelKey: 'nav.interviews', icon: Calendar },
    { to: '/industry/mentors', labelKey: 'nav.mentors', icon: Users },
    { to: '/industry/profile', labelKey: 'nav.companyProfile', icon: Building2 },
  ],
  admin: [
    { to: '/admin', labelKey: 'nav.dashboard', icon: LayoutDashboard },
    { to: '/admin/students', labelKey: 'nav.students', icon: Users },
    { to: '/admin/companies', labelKey: 'nav.companies', icon: Building2 },
    { to: '/admin/internships', labelKey: 'nav.internships', icon: Briefcase },
    { to: '/admin/applications', labelKey: 'nav.applications', icon: FileText },
    { to: '/admin/mentors', labelKey: 'nav.mentors', icon: Users },
    { to: '/admin/analytics', labelKey: 'nav.analytics', icon: BarChart3 },
    { to: '/admin/settings', labelKey: 'nav.settings', icon: Settings },
  ],
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { currentUser, language } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  if (!currentUser) return null;
  const items = navConfig[currentUser.role] ?? [];

  return (
    <div className="min-h-screen bg-ink-50">
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <div className="flex">
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <main className="flex-1 min-w-0 pb-20 lg:pb-8">
          <div className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
      {/* Bottom nav for mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-ink-100 z-30">
        <div className="flex items-center justify-around px-2 py-1.5 overflow-x-auto no-scrollbar">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.to}
                href={`#${item.to}`}
                onClick={(e) => { e.preventDefault(); window.location.hash = item.to; }}
                className="flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] text-ink-500 min-w-[52px]"
              >
                <Icon style={{ width: 18, height: 18 }} />
                <span className="truncate max-w-[52px]">{t(language, item.labelKey).split(' ')[0]}</span>
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
