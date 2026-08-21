import { useState, useMemo } from 'react';
import { Users, Search, Filter, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { careerOptions } from '@/data/demoData';
import MentorCard from '@/components/ui/MentorCard';
import EmptyState from '@/components/ui/EmptyState';

export default function Mentors() {
  const { currentUser, mentors, mentorRequests, addMentorRequest, toast } = useApp();
  const [search, setSearch] = useState('');
  const [career, setCareer] = useState('');
  const [language, setLanguage] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const myRequests = mentorRequests.filter((r) => r.studentId === currentUser?.id);

  const filtered = useMemo(() => {
    return mentors.filter((m) => {
      if (search && !m.name.toLowerCase().includes(search.toLowerCase()) && !m.role.toLowerCase().includes(search.toLowerCase()) && !m.company.toLowerCase().includes(search.toLowerCase())) return false;
      if (career && m.career !== career) return false;
      if (language && !m.languages.includes(language)) return false;
      return true;
    });
  }, [mentors, search, career, language]);

  const handleRequest = (mentorId: string) => {
    const result = addMentorRequest({ mentorId, studentId: currentUser!.id, studentName: currentUser!.name });
    if (result.ok) toast('Mentor request sent', 'success');
    else toast(result.error ?? 'Failed to send request', 'error');
  };

  const isRequested = (mentorId: string) => myRequests.some((r) => r.mentorId === mentorId);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Find a Mentor</h1>
        <p className="text-sm text-ink-500 mt-1">Connect with experienced industry professionals.</p>
      </div>

      {/* Search & Filters */}
      <div className="card p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by name, role, or company..." />
          </div>
          <button onClick={() => setShowFilters(!showFilters)} className="btn-secondary">
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        {showFilters && (
          <div className="mt-4 grid sm:grid-cols-2 gap-3 animate-fade-in">
            <div>
              <label className="label">Career</label>
              <select className="input" value={career} onChange={(e) => setCareer(e.target.value)}>
                <option value="">All careers</option>
                {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Language</label>
              <select className="input" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="">All languages</option>
                <option value="English">English</option>
                <option value="Tamil">Tamil</option>
                <option value="Hindi">Hindi</option>
                <option value="Telugu">Telugu</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      {filtered.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((m) => (
            <MentorCard key={m.id} mentor={m} onRequest={() => handleRequest(m.id)} requested={isRequested(m.id)} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Users className="w-8 h-8" />} title="No mentors found" description="Try adjusting your filters." />
      )}
    </div>
  );
}
