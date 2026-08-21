import { useState, useMemo } from 'react';
import { Search, Briefcase, MapPin, IndianRupee } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import DataTable from '@/components/ui/DataTable';
import { SkillTag } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import type { Internship } from '@/types';

export default function AdminInternships() {
  const { internships, applications, toast } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = useMemo(() => internships.filter((i) => {
    if (search && !i.role.toLowerCase().includes(search.toLowerCase()) && !i.companyName.toLowerCase().includes(search.toLowerCase())) return false;
    if (statusFilter && i.status !== statusFilter) return false;
    return true;
  }), [internships, search, statusFilter]);

  if (!internships.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Internships</h1><p className="text-sm text-ink-500 mt-1">Manage all posted internships.</p></div>
      <EmptyState icon={<Briefcase className="w-8 h-8" />} title="No internships found" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Internships</h1><p className="text-sm text-ink-500 mt-1">Manage all posted internships ({internships.length} total).</p></div>

      <div className="card p-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by role or company..." />
        </div>
        <select className="input w-auto" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">All statuses</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <DataTable<Internship>
        rowKey={(i) => i.id}
        columns={[
          { key: 'role', header: 'Role', render: (i) => <span className="font-medium">{i.role}</span> },
          { key: 'company', header: 'Company', render: (i) => <span className="text-ink-500">{i.companyName}</span> },
          { key: 'location', header: 'Location', render: (i) => <span className="flex items-center gap-1 text-ink-500"><MapPin className="w-3 h-3" /> {i.remote ? `${i.location} / Remote` : i.location}</span> },
          { key: 'stipend', header: 'Stipend', render: (i) => <span className="flex items-center gap-0.5 text-ink-500"><IndianRupee className="w-3 h-3" />{i.stipend.toLocaleString('en-IN')}</span> },
          { key: 'duration', header: 'Duration', render: (i) => <span className="text-ink-500">{i.duration}</span> },
          { key: 'skills', header: 'Required Skills', render: (i) => <div className="flex flex-wrap gap-1">{i.requiredSkills.slice(0, 3).map((s) => <SkillTag key={s} skill={s} />)}</div> },
          { key: 'apps', header: 'Applications', render: (i) => <span className="badge bg-brand-50 text-brand-700">{applications.filter((a) => a.internshipId === i.id).length}</span> },
          { key: 'status', header: 'Status', render: (i) => <span className={`badge ${i.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-ink-100 text-ink-600'}`}>{i.status}</span> },
          { key: 'actions', header: 'Actions', render: () => (
            <button onClick={() => toast('Action logged', 'info')} className="text-xs text-brand-600 font-semibold hover:text-brand-700">View</button>
          )},
        ]}
        data={filtered}
        emptyTitle="No internships match your filters"
      />
    </div>
  );
}
