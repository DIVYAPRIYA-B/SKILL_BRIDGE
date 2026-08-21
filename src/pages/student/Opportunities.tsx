import { useState, useMemo } from 'react';
import { Search, MapPin, Filter, Briefcase, IndianRupee, Clock, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { cities } from '@/data/demoData';
import OpportunityCard from '@/components/ui/OpportunityCard';
import EmptyState from '@/components/ui/EmptyState';

export default function Opportunities() {
  const { currentUser, students, internships } = useApp();
  const student = students.find((s) => s.userId === currentUser?.id);

  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('');
  const [minStipend, setMinStipend] = useState('');
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [duration, setDuration] = useState('');
  const [skill, setSkill] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const allSkills = useMemo(() => Array.from(new Set(internships.flatMap((i) => i.requiredSkills))).sort(), [internships]);
  const allRoles = useMemo(() => Array.from(new Set(internships.map((i) => i.role))).sort(), [internships]);

  const filtered = useMemo(() => {
    return internships.filter((i) => {
      if (i.status !== 'active') return false;
      if (search && !i.role.toLowerCase().includes(search.toLowerCase()) && !i.companyName.toLowerCase().includes(search.toLowerCase())) return false;
      if (location && !i.location.toLowerCase().includes(location.toLowerCase())) return false;
      if (role && i.role !== role) return false;
      if (minStipend && i.stipend < parseInt(minStipend)) return false;
      if (remoteOnly && !i.remote) return false;
      if (duration && i.duration !== duration) return false;
      if (skill && !i.requiredSkills.includes(skill) && !i.preferredSkills.includes(skill)) return false;
      return true;
    });
  }, [internships, search, location, role, minStipend, remoteOnly, duration, skill]);

  const clearFilters = () => {
    setSearch(''); setLocation(''); setRole(''); setMinStipend(''); setRemoteOnly(false); setDuration(''); setSkill('');
  };

  const hasFilters = search || location || role || minStipend || remoteOnly || duration || skill;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Find Your Opportunity</h1>
        <p className="text-sm text-ink-500 mt-1">Browse and filter internships matched to your profile.</p>
      </div>

      {/* Search */}
      <div className="card p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by role or company..." />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 animate-fade-in">
            <div>
              <label className="label">Location</label>
              <select className="input" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All locations</option>
                {cities.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Role</label>
              <select className="input" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">All roles</option>
                {allRoles.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Min Stipend (₹/mo)</label>
              <input type="number" className="input" value={minStipend} onChange={(e) => setMinStipend(e.target.value)} placeholder="0" />
            </div>
            <div>
              <label className="label">Duration</label>
              <select className="input" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="">Any duration</option>
                <option value="3 Months">3 Months</option>
                <option value="4 Months">4 Months</option>
                <option value="6 Months">6 Months</option>
              </select>
            </div>
            <div>
              <label className="label">Skill</label>
              <select className="input" value={skill} onChange={(e) => setSkill(e.target.value)}>
                <option value="">Any skill</option>
                {allSkills.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer p-2.5">
                <input type="checkbox" checked={remoteOnly} onChange={(e) => setRemoteOnly(e.target.checked)} className="w-4 h-4 rounded text-brand-600" />
                <span className="text-sm text-ink-700">Remote only</span>
              </label>
            </div>
          </div>
        )}

        {hasFilters && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-ink-500">{filtered.length} result(s)</span>
            <button onClick={clearFilters} className="text-xs text-brand-600 font-semibold flex items-center gap-1 hover:text-brand-700">
              <X className="w-3 h-3" /> Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((internship) => (
            <OpportunityCard key={internship.id} internship={internship} showMatch={false} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Briefcase className="w-8 h-8" />} title="No internships found" description="Try adjusting your filters to see more opportunities." />
      )}
    </div>
  );
}
