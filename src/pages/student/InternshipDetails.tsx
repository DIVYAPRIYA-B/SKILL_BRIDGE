import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Building2, MapPin, IndianRupee, Clock, ArrowLeft, CheckCircle2,
  Calendar, Briefcase, Award, ListChecks, FileText, Star,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { calculateInternshipMatch } from '@/lib/mockAI';
import { MatchBadge, SkillTag } from '@/components/ui/Badge';
import EmptyState from '@/components/ui/EmptyState';
import Modal from '@/components/ui/Modal';
import { useState } from 'react';

export default function InternshipDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, students, internships, applications, addApplication, toast } = useApp();
  const student = students.find((s) => s.userId === currentUser?.id);
  const internship = internships.find((i) => i.id === id);
  const [showApply, setShowApply] = useState(false);
  const [form, setForm] = useState({ name: student?.name ?? '', email: currentUser?.email ?? '', phone: '', coverLetter: '' });
  const [error, setError] = useState('');

  if (!internship) return <EmptyState icon={<Briefcase className="w-8 h-8" />} title="Internship not found" description="This opportunity may have been removed." action={<Link to="/student/opportunities" className="btn-primary">Back to Opportunities</Link>} />;

  const match = student ? calculateInternshipMatch(student, internship) : { score: 0, reason: '' };
  const alreadyApplied = applications.some((a) => a.internshipId === internship.id && a.studentId === currentUser?.id);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) { setError('Please fill in all required fields.'); return; }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) { setError('Please enter a valid email.'); return; }
    if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) { setError('Please enter a valid 10-digit phone number.'); return; }
    const result = addApplication({
      internshipId: internship.id, studentId: currentUser!.id, studentName: form.name,
      studentEmail: form.email, studentPhone: form.phone, coverLetter: form.coverLetter, matchScore: match.score,
    });
    if (result.ok) {
      toast('Application submitted successfully 🎉', 'success');
      setShowApply(false);
      navigate('/student/applications');
    } else {
      setError(result.error ?? 'Failed to submit application.');
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/student/opportunities" className="inline-flex items-center gap-1.5 text-sm text-ink-500 hover:text-ink-700">
        <ArrowLeft className="w-4 h-4" /> Back to Opportunities
      </Link>

      {/* Header */}
      <div className="card p-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink-900 font-display">{internship.role}</h1>
            <div className="flex items-center gap-2 mt-2 text-sm text-ink-600">
              <Building2 className="w-4 h-4" /> {internship.companyName}
            </div>
            <div className="flex flex-wrap gap-4 mt-3 text-sm text-ink-600">
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {internship.remote ? `${internship.location} / Remote` : internship.location}</span>
              <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" /> {internship.stipend.toLocaleString('en-IN')}/month</span>
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {internship.duration}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Deadline: {internship.deadline}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <MatchBadge score={match.score} />
            {alreadyApplied ? (
              <span className="badge bg-emerald-100 text-emerald-700"><CheckCircle2 className="w-3.5 h-3.5" /> Applied</span>
            ) : (
              <button onClick={() => setShowApply(true)} className="btn-primary">
                <FileText className="w-4 h-4" /> Apply Now
              </button>
            )}
          </div>
        </div>
      </div>

      {/* AI Match explanation */}
      <div className="card p-5 bg-brand-50/50 border-brand-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
            <Star className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-ink-900">AI Match Explanation</h3>
            <p className="text-sm text-ink-600 mt-1">{match.reason}</p>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-2">Description</h3>
            <p className="text-sm text-ink-600 leading-relaxed">{internship.description}</p>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2"><ListChecks className="w-4 h-4 text-brand-600" /> Responsibilities</h3>
            <ul className="space-y-2">
              {internship.responsibilities.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" /> {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2"><Award className="w-4 h-4 text-brand-600" /> Benefits</h3>
            <ul className="space-y-2">
              {internship.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-3">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {internship.requiredSkills.map((s) => <SkillTag key={s} skill={s} />)}
            </div>
            <h3 className="font-semibold text-ink-900 mb-3 mt-4">Preferred Skills</h3>
            <div className="flex flex-wrap gap-2">
              {internship.preferredSkills.map((s) => <SkillTag key={s} skill={s} />)}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-2">Eligibility</h3>
            <p className="text-sm text-ink-600">{internship.eligibility}</p>
          </div>
        </div>
      </div>

      {/* Apply Modal */}
      <Modal open={showApply} onClose={() => setShowApply(false)} title={`Apply for ${internship.role}`}>
        <form onSubmit={handleApply} className="space-y-4">
          <div>
            <label className="label">Full Name *</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div>
            <label className="label">Email *</label>
            <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="label">Phone *</label>
            <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="10-digit number" />
          </div>
          <div>
            <label className="label">Resume</label>
            <p className="text-xs text-ink-500 bg-ink-50 rounded-lg p-3">Your profile resume will be automatically attached.</p>
          </div>
          <div>
            <label className="label">Cover Letter</label>
            <textarea className="input min-h-[100px]" value={form.coverLetter} onChange={(e) => setForm({ ...form, coverLetter: e.target.value })} placeholder="Tell the company why you're a great fit..." />
          </div>
          {error && <div className="bg-rose-50 text-rose-700 text-sm rounded-xl p-3">{error}</div>}
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={() => setShowApply(false)} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary">Submit Application</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
