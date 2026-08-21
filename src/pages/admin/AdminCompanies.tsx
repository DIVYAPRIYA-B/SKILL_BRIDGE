import { useState, useMemo } from 'react';
import { Search, Building2, MapPin, Globe } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import DataTable from '@/components/ui/DataTable';
import EmptyState from '@/components/ui/EmptyState';
import type { CompanyProfile } from '@/types';

export default function AdminCompanies() {
  const { companies, internships, toast } = useApp();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => companies.filter((c) => {
    if (search && !c.companyName.toLowerCase().includes(search.toLowerCase()) && !c.industry.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [companies, search]);

  if (!companies.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Companies</h1><p className="text-sm text-ink-500 mt-1">Manage all company accounts.</p></div>
      <EmptyState icon={<Building2 className="w-8 h-8" />} title="No companies found" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Companies</h1><p className="text-sm text-ink-500 mt-1">Manage all company accounts ({companies.length} total).</p></div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by company name or industry..." />
        </div>
      </div>

      <DataTable<CompanyProfile>
        rowKey={(c) => c.userId}
        columns={[
          { key: 'name', header: 'Company', render: (c) => (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-xs font-bold">{c.companyName.charAt(0)}</div>
              <span className="font-medium">{c.companyName}</span>
            </div>
          )},
          { key: 'industry', header: 'Industry', render: (c) => <span className="text-ink-500">{c.industry || '—'}</span> },
          { key: 'location', header: 'Location', render: (c) => <span className="flex items-center gap-1 text-ink-500"><MapPin className="w-3 h-3" /> {c.location || '—'}</span> },
          { key: 'size', header: 'Size', render: (c) => <span className="text-ink-500">{c.size || '—'}</span> },
          { key: 'website', header: 'Website', render: (c) => c.website ? <span className="flex items-center gap-1 text-brand-600"><Globe className="w-3 h-3" /> {c.website}</span> : <span className="text-ink-400">—</span> },
          { key: 'internships', header: 'Internships', render: (c) => <span className="badge bg-brand-50 text-brand-700">{internships.filter((i) => i.companyId === c.userId).length}</span> },
          { key: 'actions', header: 'Actions', render: () => (
            <button onClick={() => toast('Action logged', 'info')} className="text-xs text-brand-600 font-semibold hover:text-brand-700">View</button>
          )},
        ]}
        data={filtered}
        emptyTitle="No companies match your filters"
      />
    </div>
  );
}
