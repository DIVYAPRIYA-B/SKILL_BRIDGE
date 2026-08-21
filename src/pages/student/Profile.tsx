import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Save, MapPin, GraduationCap, Code, Target } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { skillCatalog, careerOptions, states, cities } from '@/data/demoData';
import type { StudentProfile, Language } from '@/types';

export default function Profile() {
  const { currentUser, students, updateStudentProfile, toast } = useApp();
  const navigate = useNavigate();
  const existing = students.find((s) => s.userId === currentUser?.id);
  const [profile, setProfile] = useState<StudentProfile>(existing ?? {
    userId: currentUser?.id ?? '', name: currentUser?.name ?? '', age: '', location: '', state: 'Tamil Nadu',
    language: 'en', degree: '', branch: '', graduationYear: '', college: '', skills: [], careerInterest: '',
    workMode: 'hybrid', preferredLocation: '', minStipend: '', duration: '3 Months', onboarded: true,
    resume: { summary: '', skills: [], projects: [], education: [], experience: [], achievements: [] },
  });

  const update = (patch: Partial<StudentProfile>) => setProfile((p) => ({ ...p, ...patch }));
  const toggleSkill = (skill: string) => update({ skills: profile.skills.includes(skill) ? profile.skills.filter((s) => s !== skill) : [...profile.skills, skill] });

  const save = () => {
    updateStudentProfile({ ...profile, resume: { ...profile.resume, skills: profile.skills } });
    toast('Profile saved successfully', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ink-900 font-display">My Profile</h1>
          <p className="text-sm text-ink-500 mt-1">Manage your personal and career information.</p>
        </div>
        <button onClick={save} className="btn-primary">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      {/* Personal Info */}
      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2"><User className="w-5 h-5 text-brand-600" /> Personal Information</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Full Name</label><input className="input" value={profile.name} onChange={(e) => update({ name: e.target.value })} /></div>
          <div><label className="label">Age</label><input className="input" type="number" value={profile.age} onChange={(e) => update({ age: e.target.value })} /></div>
          <div><label className="label">Location</label><input className="input" value={profile.location} onChange={(e) => update({ location: e.target.value })} /></div>
          <div><label className="label">State</label><select className="input" value={profile.state} onChange={(e) => update({ state: e.target.value })}>{states.map((s) => <option key={s} value={s}>{s}</option>)}</select></div>
          <div><label className="label">Preferred Language</label><select className="input" value={profile.language} onChange={(e) => update({ language: e.target.value as Language })}><option value="en">English</option><option value="ta">தமிழ் (Tamil)</option></select></div>
        </div>
      </div>

      {/* Education */}
      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2"><GraduationCap className="w-5 h-5 text-brand-600" /> Education</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className="label">Degree</label><select className="input" value={profile.degree} onChange={(e) => update({ degree: e.target.value })}><option value="">Select</option><option value="B.E.">B.E.</option><option value="B.Tech">B.Tech</option><option value="B.Sc">B.Sc</option><option value="MCA">MCA</option></select></div>
          <div><label className="label">Branch</label><input className="input" value={profile.branch} onChange={(e) => update({ branch: e.target.value })} /></div>
          <div><label className="label">College</label><input className="input" value={profile.college} onChange={(e) => update({ college: e.target.value })} /></div>
          <div><label className="label">Graduation Year</label><select className="input" value={profile.graduationYear} onChange={(e) => update({ graduationYear: e.target.value })}><option value="">Select</option>{['2025', '2026', '2027', '2028'].map((y) => <option key={y} value={y}>{y}</option>)}</select></div>
        </div>
      </div>

      {/* Skills */}
      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2"><Code className="w-5 h-5 text-brand-600" /> Skills</h3>
        <div className="flex flex-wrap gap-2">
          {skillCatalog.map((skill) => (
            <button key={skill} onClick={() => toggleSkill(skill)} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${profile.skills.includes(skill) ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
              {skill}
            </button>
          ))}
        </div>
      </div>

      {/* Career & Preferences */}
      <div className="card p-6">
        <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2"><Target className="w-5 h-5 text-brand-600" /> Career & Internship Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="label">Career Interest</label>
            <div className="flex flex-wrap gap-2">
              {careerOptions.map((c) => (
                <button key={c} onClick={() => update({ careerInterest: c })} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${profile.careerInterest === c ? 'bg-brand-600 text-white' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="label">Work Mode</label>
              <select className="input" value={profile.workMode} onChange={(e) => update({ workMode: e.target.value as StudentProfile['workMode'] })}><option value="remote">Remote</option><option value="hybrid">Hybrid</option><option value="onsite">On-site</option></select>
            </div>
            <div>
              <label className="label">Preferred Location</label>
              <select className="input" value={profile.preferredLocation} onChange={(e) => update({ preferredLocation: e.target.value })}><option value="">Any</option>{cities.map((c) => <option key={c} value={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="label">Min Stipend (₹/mo)</label>
              <input className="input" type="number" value={profile.minStipend} onChange={(e) => update({ minStipend: e.target.value })} />
            </div>
          </div>
          <div>
            <label className="label">Duration</label>
            <select className="input" value={profile.duration} onChange={(e) => update({ duration: e.target.value })}><option value="1 Month">1 Month</option><option value="2 Months">2 Months</option><option value="3 Months">3 Months</option><option value="4 Months">4 Months</option><option value="6 Months">6 Months</option></select>
          </div>
        </div>
      </div>
    </div>
  );
}
