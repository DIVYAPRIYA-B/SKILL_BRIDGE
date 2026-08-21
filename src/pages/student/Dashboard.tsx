import { Link } from 'react-router-dom';
import {
  TrendingUp, Target, FileText, Star, Calendar, CheckCircle2, Map, Trophy, Bot, Users,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import { calculateOverallReadiness, getTopRecommendations } from '@/lib/mockAI';
import DashboardCard from '@/components/ui/DashboardCard';
import SkillProgress from '@/components/ui/SkillProgress';
import OpportunityCard from '@/components/ui/OpportunityCard';

export default function StudentDashboard() {
  const { currentUser, students, internships, applications, language } = useApp();
  const student = students.find((s) => s.userId === currentUser?.id);

  if (!student) return <div className="text-center py-12 text-ink-500">Profile not found.</div>;

  const myApps = applications.filter((a) => a.studentId === currentUser?.id);
  const shortlisted = myApps.filter((a) => a.status === 'shortlisted' || a.status === 'interview').length;
  const interviews = myApps.filter((a) => a.status === 'interview').length;
  const selected = myApps.filter((a) => a.status === 'selected').length;
  const readiness = calculateOverallReadiness(currentUser!.id, 'Java Developer');
  const skillMatch = Math.min(95, readiness + 4);
  const recs = getTopRecommendations(student, internships, 3);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? t(language, 'dashboard.goodMorning') : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 font-display">{greeting}, {student.name} 👋</h1>
          <p className="text-sm text-ink-500 mt-1">Here's your career journey at a glance.</p>
        </div>
        <Link to="/student/assistant" className="btn-primary text-sm">
          <Bot className="w-4 h-4" /> Ask AI Assistant
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        <DashboardCard label={t(language, 'dashboard.careerReadiness')} value={`${readiness}%`} icon={<TrendingUp className="w-5 h-5" />} color="brand" />
        <DashboardCard label={t(language, 'dashboard.skillMatch')} value={`${skillMatch}%`} icon={<Target className="w-5 h-5" />} color="teal" />
        <DashboardCard label={t(language, 'dashboard.applications')} value={myApps.length} icon={<FileText className="w-5 h-5" />} color="amber" />
        <DashboardCard label={t(language, 'dashboard.shortlisted')} value={shortlisted} icon={<Star className="w-5 h-5" />} color="brand" />
        <DashboardCard label={t(language, 'dashboard.interviews')} value={interviews} icon={<Calendar className="w-5 h-5" />} color="teal" />
        <DashboardCard label={t(language, 'dashboard.selected')} value={selected} icon={<CheckCircle2 className="w-5 h-5" />} color="emerald" />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Career Goal */}
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-xs font-semibold text-ink-500 uppercase">{t(language, 'dashboard.careerGoal')}</p>
              <h2 className="text-xl font-bold text-ink-900 font-display mt-1">{student.careerInterest || 'Not set'}</h2>
            </div>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-ink-600">Overall Progress</span>
            <span className="font-semibold text-ink-900">{readiness}%</span>
          </div>
          <div className="h-3 bg-ink-100 rounded-full overflow-hidden mb-4">
            <div className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-1000" style={{ width: `${readiness}%` }} />
          </div>
          <div className="space-y-3">
            <SkillProgress skill="Java" level={90} delay={0} />
            <SkillProgress skill="SQL" level={80} delay={100} />
            <SkillProgress skill="Spring Boot" level={35} delay={200} />
          </div>
          <Link to="/student/roadmap" className="btn-primary mt-5 w-full sm:w-auto">
            <Map className="w-4 h-4" /> {t(language, 'dashboard.viewRoadmap')}
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h3 className="font-semibold text-ink-900 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { to: '/student/skill-gap', icon: Target, label: 'Analyze Skill Gap' },
              { to: '/student/opportunities', icon: Trophy, label: 'Browse Internships' },
              { to: '/student/top-10', icon: Star, label: 'Top 10 Recommendations' },
              { to: '/student/mentors', icon: Users, label: 'Find a Mentor' },
              { to: '/student/resume', icon: FileText, label: 'Improve Resume' },
            ].map((a) => (
              <Link key={a.to} to={a.to} className="flex items-center gap-3 p-3 rounded-xl hover:bg-ink-50 transition-colors group">
                <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-100">
                  <a.icon className="w-4.5 h-4.5" style={{ width: 18, height: 18 }} />
                </div>
                <span className="text-sm font-medium text-ink-700">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Top Recommendations Preview */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink-900">Recommended For You</h2>
          <Link to="/student/top-10" className="text-sm text-brand-600 font-semibold hover:text-brand-700">View all →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recs.map(({ internship, score, reason }) => (
            <OpportunityCard key={internship.id} internship={internship} matchScore={score} matchReason={reason} />
          ))}
        </div>
      </div>
    </div>
  );
}
