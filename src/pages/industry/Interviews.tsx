import { Calendar, Clock, MapPin, Video, Map } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';

export default function Interviews() {
  const { currentUser, internships, applications } = useApp();
  const myInternshipIds = new Set(internships.filter((i) => i.companyId === currentUser?.id).map((i) => i.id));
  const interviews = applications.filter((a) => myInternshipIds.has(a.internshipId) && a.status === 'interview' && a.interviewDate);

  if (!interviews.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Interviews</h1><p className="text-sm text-ink-500 mt-1">Manage your scheduled interviews.</p></div>
      <EmptyState icon={<Calendar className="w-8 h-8" />} title="No interviews scheduled" description="Shortlist candidates and schedule interviews from the Applications page." />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Interviews</h1><p className="text-sm text-ink-500 mt-1">Manage your scheduled interviews.</p></div>
      <div className="grid gap-4">
        {interviews.map((app) => {
          const internship = internships.find((i) => i.id === app.internshipId);
          return (
            <div key={app.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink-900">{app.studentName}</h3>
                    <p className="text-sm text-ink-500">{internship?.role}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-ink-500">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {app.interviewDate}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {internship?.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={app.status} />
                  <button className="btn-primary text-xs"><Video className="w-3.5 h-3.5" /> Join Call</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
