import { useState } from 'react';
import { FileText, Award, Sparkles, TrendingUp, CheckCircle2, Plus, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { ResumeData } from '@/types';

const aiRecommendations = [
  'Add measurable results to your project descriptions (e.g., "Served 500+ users").',
  'Mention your Smart Rental System project because it matches the Java/Full Stack internship category.',
  'Add a "Skills" section with proficiency levels for each skill.',
  'Include any certifications or online courses you have completed.',
  'Use action verbs like "Built", "Developed", "Optimized" in experience descriptions.',
];

const improvedBullets = [
  'Built a Java-based rental management system using Spring Boot and MySQL, serving 200+ active users with 99.9% uptime.',
  'Developed REST APIs handling 500+ daily requests, reducing response time by 40% through query optimization.',
  'Led a team of 3 in building a college event portal, increasing event registrations by 60%.',
];

export default function Resume() {
  const { currentUser, students, updateStudentProfile, toast } = useApp();
  const student = students.find((s) => s.userId === currentUser?.id);
  const [showImproved, setShowImproved] = useState(false);
  const [editing, setEditing] = useState(false);

  if (!student) return <div className="text-center py-12 text-ink-500">Profile not found.</div>;

  const resume = student.resume;
  const score = Math.min(100, 40 + (resume.skills.length * 5) + (resume.projects.length * 8) + (resume.experience.length * 10) + (resume.achievements.length * 5) + (resume.summary ? 5 : 0));

  const updateResume = (data: ResumeData) => {
    updateStudentProfile({ ...student, resume: data, skills: data.skills });
    toast('Resume saved', 'success');
    setEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 font-display">AI Resume Assistant</h1>
          <p className="text-sm text-ink-500 mt-1">Improve your resume with AI-powered suggestions.</p>
        </div>
        <button onClick={() => setEditing(!editing)} className="btn-secondary text-sm">
          {editing ? 'Cancel' : 'Edit Resume'}
        </button>
      </div>

      {/* Score */}
      <div className="card p-6 bg-gradient-to-br from-brand-50 to-teal-50 border-brand-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-ink-600">Resume Score</p>
            <h2 className="text-4xl font-bold text-brand-600 font-display mt-1">{score}/100</h2>
            <p className="text-xs text-ink-500 mt-1">{score >= 80 ? 'Excellent!' : score >= 60 ? 'Good — room to improve' : 'Needs work'}</p>
          </div>
          <div className="relative w-20 h-20">
            <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="32" fill="none" stroke="#e5e7eb" strokeWidth="6" />
              <circle cx="40" cy="40" r="32" fill="none" stroke="#3366ff" strokeWidth="6" strokeDasharray={`${(score / 100) * 201} 201`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-brand-500" />
            </div>
          </div>
        </div>
      </div>

      {!editing ? (
        <>
          {/* Resume sections */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-2">Summary</h3>
              <p className="text-sm text-ink-600">{resume.summary || 'No summary added yet.'}</p>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resume.skills.length ? resume.skills.map((s) => <span key={s} className="badge bg-ink-100 text-ink-700">{s}</span>) : <p className="text-sm text-ink-500">No skills added.</p>}
              </div>
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-2">Projects</h3>
              {resume.projects.length ? resume.projects.map((p, i) => (
                <div key={i} className="mb-3 last:mb-0">
                  <p className="text-sm font-medium text-ink-800">{p.title}</p>
                  <p className="text-xs text-ink-500 mt-0.5">{p.description}</p>
                </div>
              )) : <p className="text-sm text-ink-500">No projects added.</p>}
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-2">Education</h3>
              {resume.education.length ? resume.education.map((e, i) => (
                <div key={i} className="mb-2">
                  <p className="text-sm font-medium text-ink-800">{e.degree}</p>
                  <p className="text-xs text-ink-500">{e.college} • {e.year}</p>
                </div>
              )) : <p className="text-sm text-ink-500">No education added.</p>}
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-2">Experience</h3>
              {resume.experience.length ? resume.experience.map((e, i) => (
                <div key={i} className="mb-2">
                  <p className="text-sm font-medium text-ink-800">{e.role} — {e.company}</p>
                  <p className="text-xs text-ink-500">{e.duration}</p>
                  <p className="text-xs text-ink-600 mt-0.5">{e.description}</p>
                </div>
              )) : <p className="text-sm text-ink-500">No experience added.</p>}
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-ink-900 mb-2">Achievements</h3>
              {resume.achievements.length ? resume.achievements.map((a, i) => (
                <p key={i} className="text-sm text-ink-600 flex items-start gap-2 mb-1"><Award className="w-4 h-4 mt-0.5 text-amber-500 shrink-0" /> {a}</p>
              )) : <p className="text-sm text-ink-500">No achievements added.</p>}
            </div>
          </div>

          {/* AI Recommendations */}
          <div className="card p-5">
            <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-600" /> AI Recommendations
            </h3>
            <ul className="space-y-2">
              {aiRecommendations.map((r, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" /> {r}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowImproved(!showImproved)} className="btn-primary mt-4">
              <TrendingUp className="w-4 h-4" /> Improve Resume
            </button>
          </div>

          {/* Improved bullets */}
          {showImproved && (
            <div className="card p-5 animate-fade-in">
              <h3 className="font-semibold text-ink-900 mb-3">Improved Project Descriptions</h3>
              <div className="space-y-2">
                {improvedBullets.map((b, i) => (
                  <div key={i} className="bg-teal-50 rounded-lg p-3 text-sm text-ink-700 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 mt-0.5 text-teal-600 shrink-0" /> {b}
                  </div>
                ))}
              </div>
              <p className="text-xs text-ink-500 mt-3">These improved bullets use measurable results and action verbs — proven to increase interview callbacks.</p>
            </div>
          )}
        </>
      ) : (
        <ResumeEditor resume={resume} onSave={updateResume} onCancel={() => setEditing(false)} />
      )}
    </div>
  );
}

function ResumeEditor({ resume, onSave, onCancel }: { resume: ResumeData; onSave: (d: ResumeData) => void; onCancel: () => void }) {
  const [data, setData] = useState<ResumeData>({ ...resume });

  return (
    <div className="card p-6 space-y-4">
      <div>
        <label className="label">Summary</label>
        <textarea className="input min-h-[80px]" value={data.summary} onChange={(e) => setData({ ...data, summary: e.target.value })} />
      </div>
      <div>
        <label className="label">Skills (comma-separated)</label>
        <input className="input" value={data.skills.join(', ')} onChange={(e) => setData({ ...data, skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} />
      </div>
      <div>
        <label className="label">Projects</label>
        {data.projects.map((p, i) => (
          <div key={i} className="flex gap-2 mb-2">
            <input className="input flex-1" placeholder="Title" value={p.title} onChange={(e) => { const projects = [...data.projects]; projects[i] = { ...p, title: e.target.value }; setData({ ...data, projects }); }} />
            <input className="input flex-1" placeholder="Description" value={p.description} onChange={(e) => { const projects = [...data.projects]; projects[i] = { ...p, description: e.target.value }; setData({ ...data, projects }); }} />
            <button onClick={() => setData({ ...data, projects: data.projects.filter((_, idx) => idx !== i) })} className="btn-ghost"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
        <button onClick={() => setData({ ...data, projects: [...data.projects, { title: '', description: '' }] })} className="btn-secondary text-xs"><Plus className="w-3.5 h-3.5" /> Add Project</button>
      </div>
      <div>
        <label className="label">Achievements (one per line)</label>
        <textarea className="input min-h-[60px]" value={data.achievements.join('\n')} onChange={(e) => setData({ ...data, achievements: e.target.value.split('\n').filter(Boolean) })} />
      </div>
      <div className="flex gap-2 justify-end">
        <button onClick={onCancel} className="btn-secondary">Cancel</button>
        <button onClick={() => onSave(data)} className="btn-primary">Save Resume</button>
      </div>
    </div>
  );
}
