import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Send } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { skillCatalog, cities } from '@/data/demoData';
import type { Internship } from '@/types';

export default function PostInternship() {
  const { currentUser, companies, addInternship, toast } = useApp();
  const navigate = useNavigate();
  const companyProfile = companies.find((c) => c.userId === currentUser?.id);

  const [form, setForm] = useState({
    role: '', description: '', location: '', remote: false, stipend: '', duration: '3 Months',
    requiredSkills: [] as string[], preferredSkills: [] as string[], eligibility: '',
    responsibilities: [''], benefits: [''], deadline: '',
  });
  const [error, setError] = useState('');

  const toggleSkill = (field: 'requiredSkills' | 'preferredSkills', skill: string) => {
    setForm((f) => {
      const arr = f[field];
      return { ...f, [field]: arr.includes(skill) ? arr.filter((s) => s !== skill) : [...arr, skill] };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.role.trim() || !form.description.trim() || !form.location.trim() || !form.stipend.trim() || !form.deadline.trim()) {
      setError('Please fill in all required fields.'); return;
    }
    if (form.requiredSkills.length === 0) { setError('Select at least one required skill.'); return; }

    const newInternship: Omit<Internship, 'id' | 'postedAt' | 'status'> = {
      companyId: currentUser!.id,
      companyName: companyProfile?.companyName ?? currentUser!.name,
      role: form.role.trim(),
      description: form.description.trim(),
      location: form.location.trim(),
      remote: form.remote,
      stipend: parseInt(form.stipend),
      duration: form.duration,
      requiredSkills: form.requiredSkills,
      preferredSkills: form.preferredSkills,
      eligibility: form.eligibility.trim() || 'Open to all eligible students',
      responsibilities: form.responsibilities.filter((r) => r.trim()),
      benefits: form.benefits.filter((b) => b.trim()),
      deadline: form.deadline,
    };
    addInternship(newInternship);
    toast('Internship posted successfully', 'success');
    navigate('/industry/internships');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Post an Internship</h1>
        <p className="text-sm text-ink-500 mt-1">Create a new internship opportunity for students.</p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div>
          <label className="label">Role Title *</label>
          <input className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Java Developer Intern" />
        </div>
        <div>
          <label className="label">Description *</label>
          <textarea className="input min-h-[100px]" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Describe the internship role and what the intern will do..." />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Location *</label>
            <select className="input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}>
              <option value="">Select location</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Stipend (₹/month) *</label>
            <input type="number" className="input" value={form.stipend} onChange={(e) => setForm({ ...form, stipend: e.target.value })} placeholder="15000" />
          </div>
          <div>
            <label className="label">Duration</label>
            <select className="input" value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })}>
              <option value="1 Month">1 Month</option><option value="2 Months">2 Months</option>
              <option value="3 Months">3 Months</option><option value="4 Months">4 Months</option>
              <option value="6 Months">6 Months</option>
            </select>
          </div>
          <div>
            <label className="label">Application Deadline *</label>
            <input type="date" className="input" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={form.remote} onChange={(e) => setForm({ ...form, remote: e.target.checked })} className="w-4 h-4 rounded text-brand-600" />
            <span className="text-sm text-ink-700">Remote-friendly (allows remote work)</span>
          </label>
        </div>

        {/* Required Skills */}
        <div>
          <label className="label">Required Skills *</label>
          <div className="flex flex-wrap gap-2">
            {skillCatalog.map((s) => (
              <button key={s} type="button" onClick={() => toggleSkill('requiredSkills', s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${form.requiredSkills.includes(s) ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>{s}</button>
            ))}
          </div>
        </div>

        {/* Preferred Skills */}
        <div>
          <label className="label">Preferred Skills</label>
          <div className="flex flex-wrap gap-2">
            {skillCatalog.map((s) => (
              <button key={s} type="button" onClick={() => toggleSkill('preferredSkills', s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${form.preferredSkills.includes(s) ? 'bg-teal-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>{s}</button>
            ))}
          </div>
        </div>

        <div>
          <label className="label">Eligibility</label>
          <input className="input" value={form.eligibility} onChange={(e) => setForm({ ...form, eligibility: e.target.value })} placeholder="B.E./B.Tech Computer Science, 2025/2026 batch" />
        </div>

        <div>
          <label className="label">Responsibilities (one per line)</label>
          <textarea className="input min-h-[80px]" value={form.responsibilities.join('\n')} onChange={(e) => setForm({ ...form, responsibilities: e.target.value.split('\n') })} />
        </div>

        <div>
          <label className="label">Benefits (one per line)</label>
          <textarea className="input min-h-[80px]" value={form.benefits.join('\n')} onChange={(e) => setForm({ ...form, benefits: e.target.value.split('\n') })} />
        </div>

        {error && <div className="bg-rose-50 text-rose-700 text-sm rounded-xl p-3">{error}</div>}

        <button type="submit" className="btn-primary w-full sm:w-auto">
          <Send className="w-4 h-4" /> Post Internship
        </button>
      </form>
    </div>
  );
}
