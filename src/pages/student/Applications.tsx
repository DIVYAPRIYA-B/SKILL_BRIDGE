import { Link } from 'react-router-dom';
import { FileText, Calendar, Building2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatusBadge } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';

export default function Applications() {
  const { currentUser, applications, internships } = useApp();
  const myApps = applications.filter((a) => a.studentId === currentUser?.id);
  const [viewApp, setViewApp] = useState<typeof myApps[0] | null>(null);

  const statusTimeline = ['applied', 'under-review', 'shortlisted', 'interview', 'selected'];

  if (!myApps.length) return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">My Applications</h1>
        <p className="text-sm text-ink-500 mt-1">Track all your internship applications.</p>
      </div>
      <EmptyState
        icon={<FileText className="w-8 h-8" />}
        title="No applications yet"
        description="Start applying to internships to track them here."
        action={<Link to="/student/opportunities" className="btn-primary">Browse Opportunities</Link>}
      />
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">My Applications</h1>
        <p className="text-sm text-ink-500 mt-1">Track all your internship applications.</p>
      </div>

      <div className="grid gap-4">
        {myApps.map((app) => {
          const internship = internships.find((i) => i.id === app.internshipId);
          if (!internship) return null;
          const currentStep = statusTimeline.indexOf(app.status);

          return (
            <div key={app.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-semibold text-ink-900">{internship.role}</h3>
                  <p className="text-sm text-ink-500 flex items-center gap-1.5 mt-0.5"><Building2 className="w-3.5 h-3.5" /> {internship.companyName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={app.status} />
                  <button onClick={() => setViewApp(app)} className="btn-ghost text-xs">View Details</button>
                </div>
              </div>

              {/* Timeline */}
              {app.status !== 'rejected' ? (
                <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar pb-1">
                  {statusTimeline.map((s, i) => (
                    <div key={s} className="flex items-center gap-1 sm:gap-2 shrink-0">
                      <div className="flex flex-col items-center gap-1">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${i <= currentStep ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-400'}`}>
                          {i < currentStep ? '✓' : i + 1}
                        </div>
                        <span className={`text-[10px] capitalize whitespace-nowrap ${i <= currentStep ? 'text-brand-600 font-semibold' : 'text-ink-400'}`}>{s.replace('-', ' ')}</span>
                      </div>
                      {i < statusTimeline.length - 1 && <div className={`h-0.5 w-8 sm:w-12 ${i < currentStep ? 'bg-brand-600' : 'bg-ink-200'}`} />}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-rose-50 text-rose-700 text-sm rounded-lg p-3">Your application was not selected for this position. Keep applying!</div>
              )}

              <div className="flex items-center gap-4 mt-3 text-xs text-ink-500">
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Applied: {new Date(app.appliedAt).toLocaleDateString()}</span>
                {app.interviewDate && <span className="flex items-center gap-1 text-teal-600"><Calendar className="w-3.5 h-3.5" /> Interview: {app.interviewDate}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* View Details Modal */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)} title="Application Details">
        {viewApp && (
          <div className="space-y-4">
            <div>
              <p className="text-xs text-ink-500">Position</p>
              <p className="font-semibold text-ink-900">{internships.find((i) => i.id === viewApp.internshipId)?.role}</p>
            </div>
            <div>
              <p className="text-xs text-ink-500">Company</p>
              <p className="font-semibold text-ink-900">{internships.find((i) => i.id === viewApp.internshipId)?.companyName}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-ink-500">Name</p><p className="text-sm text-ink-800">{viewApp.studentName}</p></div>
              <div><p className="text-xs text-ink-500">Email</p><p className="text-sm text-ink-800">{viewApp.studentEmail}</p></div>
              <div><p className="text-xs text-ink-500">Phone</p><p className="text-sm text-ink-800">{viewApp.studentPhone}</p></div>
              <div><p className="text-xs text-ink-500">Match Score</p><p className="text-sm text-ink-800">{viewApp.matchScore}%</p></div>
            </div>
            {viewApp.coverLetter && (
              <div>
                <p className="text-xs text-ink-500">Cover Letter</p>
                <p className="text-sm text-ink-700 mt-1">{viewApp.coverLetter}</p>
              </div>
            )}
            <div>
              <p className="text-xs text-ink-500">Status</p>
              <div className="mt-1"><StatusBadge status={viewApp.status} /></div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
