import { Link } from 'react-router-dom';
import { Briefcase, FileText, Star, Calendar, CheckCircle2, PlusCircle, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import DashboardCard from '@/components/ui/DashboardCard';
import EmptyState from '@/components/ui/EmptyState';
import { StatusBadge, MatchBadge } from '@/components/ui/Badge';

export default function IndustryDashboard() {
  const { currentUser, internships, applications, companies } = useApp();
  const companyId = currentUser?.id;
  const companyProfile = companies.find((c) => c.userId === companyId);

  const myInternships = internships.filter((i) => i.companyId === companyId);
  const myInternshipIds = new Set(myInternships.map((i) => i.id));
  const myApps = applications.filter((a) => myInternshipIds.has(a.internshipId));
  const shortlisted = myApps.filter((a) => a.status === 'shortlisted' || a.status === 'interview').length;
  const interviews = myApps.filter((a) => a.status === 'interview').length;
  const selected = myApps.filter((a) => a.status === 'selected').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 font-display">Industry Portal</h1>
          <p className="text-sm text-ink-500 mt-1">{companyProfile?.companyName ?? currentUser?.name} — manage your internships and candidates.</p>
        </div>
        <Link to="/industry/post" className="btn-primary text-sm">
          <PlusCircle className="w-4 h-4" /> Post New Internship
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <DashboardCard label="Active Internships" value={myInternships.filter((i) => i.status === 'active').length} icon={<Briefcase className="w-5 h-5" />} color="brand" />
        <DashboardCard label="Applications" value={myApps.length} icon={<FileText className="w-5 h-5" />} color="teal" />
        <DashboardCard label="Shortlisted" value={shortlisted} icon={<Star className="w-5 h-5" />} color="amber" />
        <DashboardCard label="Interviews" value={interviews} icon={<Calendar className="w-5 h-5" />} color="brand" />
        <DashboardCard label="Selected" value={selected} icon={<CheckCircle2 className="w-5 h-5" />} color="emerald" />
      </div>

      {/* Recent Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink-900">Recent Applications</h2>
          <Link to="/industry/applications" className="text-sm text-brand-600 font-semibold hover:text-brand-700">View all →</Link>
        </div>
        {myApps.length ? (
          <div className="grid gap-3">
            {myApps.slice(0, 5).map((app) => {
              const internship = internships.find((i) => i.id === app.internshipId);
              return (
                <div key={app.id} className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink-900">{app.studentName}</p>
                    <p className="text-sm text-ink-500">{internship?.role}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MatchBadge score={app.matchScore} />
                    <StatusBadge status={app.status} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon={<FileText className="w-8 h-8" />} title="No applications yet" description="Post internships to start receiving applications." />
        )}
      </div>

      {/* My Internships */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink-900">My Internships</h2>
          <Link to="/industry/internships" className="text-sm text-brand-600 font-semibold hover:text-brand-700">View all →</Link>
        </div>
        {myInternships.length ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {myInternships.slice(0, 4).map((i) => (
              <div key={i.id} className="card p-4">
                <h3 className="font-semibold text-ink-900">{i.role}</h3>
                <p className="text-sm text-ink-500 mt-0.5">{i.location} • ₹{i.stipend.toLocaleString('en-IN')}/mo</p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="badge bg-ink-100 text-ink-700">{myApps.filter((a) => a.internshipId === i.id).length} applications</span>
                  <span className="badge bg-teal-100 text-teal-700">{i.status}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState icon={<Briefcase className="w-8 h-8" />} title="No internships posted" description="Post your first internship to attract candidates." action={<Link to="/industry/post" className="btn-primary">Post Internship</Link>} />
        )}
      </div>
    </div>
  );
}
