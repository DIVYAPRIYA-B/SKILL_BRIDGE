import { useState, useMemo } from 'react';
import { Search, Users, MapPin, GraduationCap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { MatchBadge, SkillTag } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import { calculateInternshipMatch } from '@/lib/mockAI';
import Modal from '@/components/ui/Modal';
import type { StudentProfile } from '@/types';

export default function Candidates() {
  const { currentUser, internships, applications, students, updateApplicationStatus, toast } = useApp();
  const [search, setSearch] = useState('');
  const [viewStudent, setViewStudent] = useState<StudentProfile | null>(null);

  const myInternshipIds = useMemo(() => new Set(internships.filter((i) => i.companyId === currentUser?.id).map((i) => i.id)), [internships, currentUser]);
  const applicantIds = useMemo(() => new Set(applications.filter((a) => myInternshipIds.has(a.internshipId)).map((a) => a.studentId)), [applications, myInternshipIds]);
  const candidates = students.filter((s) => applicantIds.has(s.userId) || s.userId !== currentUser?.id);

  const filtered = candidates.filter((s) => {
    if (search && !s.name.toLowerCase().includes(search.toLowerCase()) && !s.skills.join(' ').toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Get match score for each candidate against company's first internship
  const myInternship = internships.find((i) => i.companyId === currentUser?.id && i.status === 'active');

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Candidate Matching</h1><p className="text-sm text-ink-500 mt-1">Find the best candidates for your internships.</p></div>

      <div className="card p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} className="input pl-10" placeholder="Search by name or skill..." />
        </div>
      </div>

      {!filtered.length ? (
        <EmptyState icon={<Users className="w-8 h-8" />} title="No candidates found" description="Post internships to attract candidates." />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => {
            const match = myInternship ? calculateInternshipMatch(s, myInternship) : { score: 0, reason: '' };
            const app = applications.find((a) => a.studentId === s.userId && myInternshipIds.has(a.internshipId));
            return (
              <div key={s.userId} className="card p-5">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white font-bold">{s.name.charAt(0)}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-ink-900 truncate">{s.name}</h3>
                    <p className="text-xs text-ink-500 flex items-center gap-1"><GraduationCap className="w-3 h-3" /> {s.degree} {s.branch}</p>
                    <p className="text-xs text-ink-500 flex items-center gap-1"><MapPin className="w-3 h-3" /> {s.location}, {s.state}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {s.skills.slice(0, 4).map((sk) => <SkillTag key={sk} skill={sk} />)}
                </div>
                <div className="flex items-center justify-between">
                  <MatchBadge score={match.score} />
                  <button onClick={() => setViewStudent(s)} className="btn-secondary text-xs">View Profile</button>
                </div>
                {app && (
                  <button
                    onClick={() => { updateApplicationStatus(app.id, 'shortlisted'); toast(`${s.name} shortlisted`, 'success'); }}
                    className="btn-primary text-xs w-full mt-2"
                  >
                    Shortlist Candidate
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* View Profile Modal */}
      <Modal open={!!viewStudent} onClose={() => setViewStudent(null)} title="Candidate Profile" size="lg">
        {viewStudent && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-xl font-bold">{viewStudent.name.charAt(0)}</div>
              <div>
                <h3 className="font-semibold text-ink-900 text-lg">{viewStudent.name}</h3>
                <p className="text-sm text-ink-500">{viewStudent.degree} {viewStudent.branch} • {viewStudent.graduationYear}</p>
                <p className="text-xs text-ink-500">{viewStudent.college}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-xs text-ink-500">Location</p><p className="text-ink-800">{viewStudent.location}, {viewStudent.state}</p></div>
              <div><p className="text-xs text-ink-500">Career Interest</p><p className="text-ink-800">{viewStudent.careerInterest || '—'}</p></div>
              <div><p className="text-xs text-ink-500">Work Mode</p><p className="text-ink-800 capitalize">{viewStudent.workMode}</p></div>
              <div><p className="text-xs text-ink-500">Preferred Location</p><p className="text-ink-800">{viewStudent.preferredLocation || 'Any'}</p></div>
            </div>
            <div>
              <p className="text-xs text-ink-500 mb-2">Skills</p>
              <div className="flex flex-wrap gap-2">{viewStudent.skills.map((s) => <SkillTag key={s} skill={s} />)}</div>
            </div>
            {viewStudent.resume.projects.length > 0 && (
              <div>
                <p className="text-xs text-ink-500 mb-2">Projects</p>
                {viewStudent.resume.projects.map((p, i) => (
                  <div key={i} className="bg-ink-50 rounded-lg p-3 mb-2">
                    <p className="text-sm font-medium text-ink-800">{p.title}</p>
                    <p className="text-xs text-ink-600 mt-0.5">{p.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
