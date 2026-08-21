import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { skillCatalog, careerOptions, states, cities } from '@/data/demoData';
import { ArrowRight, ArrowLeft, Check, User, GraduationCap, Code, Target, MapPin } from 'lucide-react';
import type { StudentProfile, Language } from '@/types';

const steps = [
  { title: 'Personal Information', icon: User },
  { title: 'Education', icon: GraduationCap },
  { title: 'Skills', icon: Code },
  { title: 'Career Interest', icon: Target },
  { title: 'Internship Preferences', icon: MapPin },
];

export default function Onboarding() {
  const { currentUser, students, updateStudentProfile, toast } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const existing = students.find((s) => s.userId === currentUser?.id);
  const [profile, setProfile] = useState<StudentProfile>(
    existing ?? {
      userId: currentUser?.id ?? '', name: currentUser?.name ?? '', age: '', location: '', state: 'Tamil Nadu',
      language: 'en', degree: '', branch: '', graduationYear: '', college: '', skills: [], careerInterest: '',
      workMode: 'hybrid', preferredLocation: '', minStipend: '', duration: '3 Months', onboarded: false,
      resume: { summary: '', skills: [], projects: [], education: [], experience: [], achievements: [] },
    }
  );

  const update = (patch: Partial<StudentProfile>) => setProfile((p) => ({ ...p, ...patch }));

  const toggleSkill = (skill: string) => {
    update({ skills: profile.skills.includes(skill) ? profile.skills.filter((s) => s !== skill) : [...profile.skills, skill] });
  };

  const next = () => { if (step < steps.length - 1) setStep(step + 1); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const finish = () => {
    updateStudentProfile({ ...profile, onboarded: true });
    toast('Profile saved successfully', 'success');
    navigate('/student');
  };

  const canProceed = () => {
    if (step === 0) return profile.name && profile.age && profile.location && profile.state;
    if (step === 1) return profile.degree && profile.branch && profile.graduationYear && profile.college;
    if (step === 2) return profile.skills.length > 0;
    if (step === 3) return profile.careerInterest;
    if (step === 4) return profile.workMode && profile.duration;
    return true;
  };

  return (
    <div className="min-h-screen bg-ink-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-ink-900 font-display">Welcome to SkillBridge AI</h1>
          <p className="text-sm text-ink-500 mt-1">Let's set up your profile. This takes 2 minutes.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-between mb-8">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center flex-1 last:flex-none">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${i < step ? 'bg-teal-500 text-white' : i === step ? 'bg-brand-600 text-white' : 'bg-ink-200 text-ink-500'}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              {i < steps.length - 1 && <div className={`h-1 flex-1 mx-1 rounded-full ${i < step ? 'bg-teal-500' : 'bg-ink-200'}`} />}
            </div>
          ))}
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
              {(() => { const Icon = steps[step].icon; return <Icon className="w-5 h-5" />; })()}
            </div>
            <h2 className="text-lg font-semibold text-ink-900">Step {step + 1}: {steps[step].title}</h2>
          </div>

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="label">Full Name</label>
                <input className="input" value={profile.name} onChange={(e) => update({ name: e.target.value })} placeholder="Karthik Raja" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Age</label>
                  <input className="input" type="number" value={profile.age} onChange={(e) => update({ age: e.target.value })} placeholder="21" />
                </div>
                <div>
                  <label className="label">Preferred Language</label>
                  <select className="input" value={profile.language} onChange={(e) => update({ language: e.target.value as Language })}>
                    <option value="en">English</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="label">Location (City/Town)</label>
                <input className="input" value={profile.location} onChange={(e) => update({ location: e.target.value })} placeholder="Madurai" />
              </div>
              <div>
                <label className="label">State</label>
                <select className="input" value={profile.state} onChange={(e) => update({ state: e.target.value })}>
                  <option value="">Select state</option>
                  {states.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Degree</label>
                  <select className="input" value={profile.degree} onChange={(e) => update({ degree: e.target.value })}>
                    <option value="">Select degree</option>
                    <option value="B.E.">B.E.</option>
                    <option value="B.Tech">B.Tech</option>
                    <option value="B.Sc">B.Sc</option>
                    <option value="MCA">MCA</option>
                    <option value="M.E.">M.E.</option>
                  </select>
                </div>
                <div>
                  <label className="label">Branch</label>
                  <input className="input" value={profile.branch} onChange={(e) => update({ branch: e.target.value })} placeholder="Computer Science" />
                </div>
              </div>
              <div>
                <label className="label">College Name</label>
                <input className="input" value={profile.college} onChange={(e) => update({ college: e.target.value })} placeholder="Thiagarajar College of Engineering" />
              </div>
              <div>
                <label className="label">Graduation Year</label>
                <select className="input" value={profile.graduationYear} onChange={(e) => update({ graduationYear: e.target.value })}>
                  <option value="">Select year</option>
                  {['2025', '2026', '2027', '2028'].map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-sm text-ink-500 mb-3">Select the skills you currently have.</p>
              <div className="flex flex-wrap gap-2">
                {skillCatalog.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${profile.skills.includes(skill) ? 'bg-brand-600 text-white shadow-soft' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}
                  >
                    {profile.skills.includes(skill) && <Check className="w-3.5 h-3.5 inline mr-1" />}
                    {skill}
                  </button>
                ))}
              </div>
              <p className="text-xs text-ink-400 mt-3">{profile.skills.length} skill(s) selected</p>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-sm text-ink-500 mb-3">What career are you interested in?</p>
              <div className="grid grid-cols-2 gap-2">
                {careerOptions.map((career) => (
                  <button
                    key={career}
                    onClick={() => update({ careerInterest: career })}
                    className={`p-3 rounded-xl text-sm font-medium text-left transition-all border-2 ${profile.careerInterest === career ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-700 hover:border-ink-300'}`}
                  >
                    {career}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="label">Work Mode</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['remote', 'hybrid', 'onsite'] as const).map((m) => (
                    <button key={m} onClick={() => update({ workMode: m })} className={`py-2.5 rounded-xl text-sm font-medium capitalize border-2 ${profile.workMode === m ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:border-ink-300'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Preferred Location</label>
                <select className="input" value={profile.preferredLocation} onChange={(e) => update({ preferredLocation: e.target.value })}>
                  <option value="">Any location</option>
                  {cities.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="label">Minimum Stipend (₹/month)</label>
                  <input className="input" type="number" value={profile.minStipend} onChange={(e) => update({ minStipend: e.target.value })} placeholder="10000" />
                </div>
                <div>
                  <label className="label">Duration</label>
                  <select className="input" value={profile.duration} onChange={(e) => update({ duration: e.target.value })}>
                    <option value="1 Month">1 Month</option>
                    <option value="2 Months">2 Months</option>
                    <option value="3 Months">3 Months</option>
                    <option value="4 Months">4 Months</option>
                    <option value="6 Months">6 Months</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="flex justify-between mt-6 pt-5 border-t border-ink-100">
            <button onClick={back} disabled={step === 0} className="btn-secondary">
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {step < steps.length - 1 ? (
              <button onClick={next} disabled={!canProceed()} className="btn-primary">
                Next <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button onClick={finish} disabled={!canProceed()} className="btn-primary">
                Complete <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
