import { NavLink } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import {
  LayoutDashboard, Bot, Target, Map, Briefcase, Trophy, FileText,
  Users, FileEdit, User, Building2, PlusCircle, ListChecks, Calendar,
  BarChart3, Settings, X,
} from 'lucide-react';
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

export default function Sidebar({ mobileOpen, onClose }: { mobileOpen: boolean; onClose: () => void }) {
  const { currentUser, language } = useApp();
  if (!currentUser) return null;
  const items = navConfig[currentUser.role] ?? [];

  const sidebarContent = (
    <nav className="flex flex-col gap-1 px-3 py-4">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${currentUser.role}`}
            onClick={onClose}
            className={({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`}
          >
            <Icon className="w-4.5 h-4.5 shrink-0" style={{ width: 18, height: 18 }} />
            <span>{t(language, item.labelKey)}</span>
          </NavLink>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden lg:block w-60 shrink-0 border-r border-ink-100 bg-white h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto scrollbar-thin">
        {sidebarContent}
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 animate-fade-in">
          <div className="absolute inset-0 bg-ink-950/50 backdrop-blur-sm" onClick={onClose} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-white shadow-float overflow-y-auto animate-slide-in-right">
            <div className="flex items-center justify-between px-4 h-16 border-b border-ink-100">
              <span className="font-semibold text-ink-900">Menu</span>
              <button onClick={onClose} className="p-2 text-ink-400 hover:bg-ink-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
}
