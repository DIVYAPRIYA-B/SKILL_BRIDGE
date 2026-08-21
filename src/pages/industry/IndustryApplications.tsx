import { useState, useMemo } from 'react';
import { Search, FileText, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { StatusBadge, MatchBadge } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Modal from '@/components/ui/Modal';
import type { Application, ApplicationStatus } from '@/types';

export default function IndustryApplications() {
  const { currentUser, internships, applications, students, updateApplicationStatus, toast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewApp, setViewApp] = useState<Application | null>(null);
  const [interviewDate, setInterviewDate] = useState('');

  const myInternshipIds = useMemo(() => new Set(internships.filter((i) => i.companyId === currentUser?.id).map((i) => i.id)), [internships, currentUser]);
  const myApps = applications.filter((a) => myInternshipIds.has(a.internshipId));

  const filtered = myApps.filter((a) => {
    if (search && !a.studentName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  });

  const handleStatusChange = (id: string, status: ApplicationStatus) => {
    updateApplicationStatus(id, status, status === 'interview' ? interviewDate : undefined);
    toast(`Application ${status.replace('-', ' ')}`, 'success');
    setViewApp(null);
    setInterviewDate('');
  };

  if (!myApps.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Applications</h1><p className="text-sm text-ink-500 mt-1">View and manage student applications.</p></div>
      <EmptyState icon={<FileText className="w-8 h-8" />} title="No applications received" description="Post internships to start receiving applications." />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Applications</h1><p className="text-sm text-ink-500 mt-1">View and manage student applications.</p></div>

      <div className="card p-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by student name..." />
        </div>
        <select className="input w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="applied">Applied</option><option value="under-review">Under Review</option>
          <option value="shortlisted">Shortlisted</option><option value="interview">Interview</option>
          <option value="selected">Selected</option><option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="grid gap-3">
        {filtered.map((app) => {
          const internship = internships.find((i) => i.id === app.internshipId);
          const student = students.find((s) => s.userId === app.studentId);
          return (
            <div key={app.id} className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white font-bold">{app.studentName.charAt(0)}</div>
                <div>
                  <p className="font-semibold text-ink-900">{app.studentName}</p>
                  <p className="text-sm text-ink-500">{internship?.role} • {student?.college || '—'}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MatchBadge score={app.matchScore} />
                    {student?.skills.slice(0, 3).map((s) => <span key={s} className="badge bg-ink-100 text-ink-600 text-[10px]">{s}</span>)}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status={app.status} />
                <button onClick={() => setViewApp(app)} className="btn-secondary text-xs">Manage</button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Manage Modal */}
      <Modal open={!!viewApp} onClose={() => setViewApp(null)} title="Manage Application">
        {viewApp && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-ink-500">Student</p><p className="font-medium text-ink-800">{viewApp.studentName}</p></div>
              <div><p className="text-xs text-ink-500">Email</p><p className="font-medium text-ink-800">{viewApp.studentEmail}</p></div>
              <div><p className="text-xs text-ink-500">Phone</p><p className="font-medium text-ink-800">{viewApp.studentPhone}</p></div>
              <div><p className="text-xs text-ink-500">Match Score</p><p className="font-medium text-ink-800">{viewApp.matchScore}%</p></div>
            </div>
            {viewApp.coverLetter && <div><p className="text-xs text-ink-500">Cover Letter</p><p className="text-sm text-ink-700 mt-1">{viewApp.coverLetter}</p></div>}
            <div><p className="text-xs text-ink-500 mb-1">Current Status</p><StatusBadge status={viewApp.status} /></div>
            <div>
              <label className="label">Schedule Interview (optional)</label>
              <input type="date" className="input" value={interviewDate} onChange={(e) => setInterviewDate(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => handleStatusChange(viewApp.id, 'shortlisted')} className="btn-secondary text-xs">Shortlist</button>
              <button onClick={() => handleStatusChange(viewApp.id, 'interview')} className="btn-secondary text-xs"><Calendar className="w-3.5 h-3.5" /> Schedule Interview</button>
              <button onClick={() => handleStatusChange(viewApp.id, 'selected')} className="btn-teal text-xs">Select Candidate</button>
              <button onClick={() => handleStatusChange(viewApp.id, 'rejected')} className="btn-danger text-xs">Reject</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
