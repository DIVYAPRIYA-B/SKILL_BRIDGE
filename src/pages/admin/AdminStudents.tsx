import { useState, useMemo } from 'react';
import { Search, Users, MapPin, GraduationCap, CheckCircle2, XCircle } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import DataTable from '@/components/ui/DataTable';
import { SkillTag } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import type { StudentProfile } from '@/types';

export default function AdminStudents() {
  const { students, toast } = useApp();
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');

  const filtered = useMemo(() => students.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.college.toLowerCase().includes(search.toLowerCase())) return false;
    if (stateFilter && s.state !== stateFilter) return false;
    return true;
  }), [students, search, stateFilter]);

  const states = Array.from(new Set(students.map((s) => s.state).filter(Boolean)));

  if (!students.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Students</h1><p className="text-sm text-ink-500 mt-1">Manage all student accounts.</p></div>
      <EmptyState icon={<Users className="w-8 h-8" />} title="No students found" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Students</h1><p className="text-sm text-ink-500 mt-1">Manage all student accounts ({students.length} total).</p></div>

      <div className="card p-4 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by name or college..." />
        </div>
        <select className="input w-auto" value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
          <option value="">All states</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>

      <DataTable<StudentProfile>
        rowKey={(s) => s.userId}
        columns={[
          { key: 'name', header: 'Name', render: (s) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{s.name.charAt(0)}</div>
              <span className="font-medium">{s.name}</span>
            </div>
          )},
          { key: 'education', header: 'Education', render: (s) => <span>{s.degree} {s.branch}</span> },
          { key: 'college', header: 'College', render: (s) => <span className="text-ink-500">{s.college || '—'}</span> },
          { key: 'location', header: 'Location', render: (s) => <span className="flex items-center gap-1 text-ink-500"><MapPin className="w-3 h-3" /> {s.location || '—'}, {s.state}</span> },
          { key: 'skills', header: 'Skills', render: (s) => <div className="flex flex-wrap gap-1">{s.skills.slice(0, 3).map((sk) => <SkillTag key={sk} skill={sk} />)}</div> },
          { key: 'career', header: 'Career Interest', render: (s) => <span className="text-ink-500">{s.careerInterest || '—'}</span> },
          { key: 'status', header: 'Status', render: (s) => s.onboarded ? <span className="badge bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3 h-3" /> Active</span> : <span className="badge bg-amber-100 text-amber-700">Pending</span> },
          { key: 'actions', header: 'Actions', render: () => (
            <button onClick={() => toast('Action logged', 'info')} className="text-xs text-brand-600 font-semibold hover:text-brand-700">View</button>
          )},
        ]}
        data={filtered}
        emptyTitle="No students match your filters"
      />
    </div>
  );
}
