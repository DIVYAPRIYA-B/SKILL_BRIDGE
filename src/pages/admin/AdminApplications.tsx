import { useState, useMemo } from 'react';
import { Search, FileText } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import DataTable from '@/components/ui/DataTable';
import { StatusBadge, MatchBadge } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import type { Application } from '@/types';

export default function AdminApplications() {
  const { applications, internships, toast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => applications.filter((a) => {
    if (search && !a.studentName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && a.status !== statusFilter) return false;
    return true;
  }), [applications, search, statusFilter]);

  if (!applications.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Applications</h1><p className="text-sm text-ink-500 mt-1">Monitor all student applications.</p></div>
      <EmptyState icon={<FileText className="w-8 h-8" />} title="No applications found" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Applications</h1><p className="text-sm text-ink-500 mt-1">Monitor all student applications ({applications.length} total).</p></div>

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

      <DataTable<Application>
        rowKey={(a) => a.id}
        columns={[
          { key: 'student', header: 'Student', render: (a) => (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{a.studentName.charAt(0)}</div>
              <span className="font-medium">{a.studentName}</span>
            </div>
          )},
          { key: 'role', header: 'Position', render: (a) => <span className="text-ink-500">{internships.find((i) => i.id === a.internshipId)?.role ?? '—'}</span> },
          { key: 'company', header: 'Company', render: (a) => <span className="text-ink-500">{internships.find((i) => i.id === a.internshipId)?.companyName ?? '—'}</span> },
          { key: 'match', header: 'Match', render: (a) => <MatchBadge score={a.matchScore} /> },
          { key: 'date', header: 'Applied', render: (a) => <span className="text-ink-500">{new Date(a.appliedAt).toLocaleDateString()}</span> },
          { key: 'status', header: 'Status', render: (a) => <StatusBadge status={a.status} /> },
          { key: 'actions', header: 'Actions', render: () => (
            <button onClick={() => toast('Action logged', 'info')} className="text-xs text-brand-600 font-semibold hover:text-brand-700">View</button>
          )},
        ]}
        data={filtered}
        emptyTitle="No applications match your filters"
      />
    </div>
  );
}
