import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Target, TrendingUp, Zap, CheckCircle2, AlertCircle, Map } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { calculateSkillGap, calculateOverallReadiness } from '@/lib/mockAI';
import { targetRoles } from '@/data/demoData';
import SkillProgress from '@/components/ui/SkillProgress';
import LoadingState from '@/components/ui/LoadingState';

export default function SkillGap() {
  const { currentUser, students, toast } = useApp();
  const navigate = useNavigate();
  const student = students.find((s) => s.userId === currentUser?.id);
  const [role, setRole] = useState('Java Developer');
  const [analyzed, setAnalyzed] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!student) return <div className="text-center py-12 text-ink-500">Profile not found.</div>;

  const analyze = () => {
    setLoading(true);
    setAnalyzed(false);
    setTimeout(() => { setLoading(false); setAnalyzed(true); }, 800);
  };

  const gaps = calculateSkillGap(currentUser!.id, role);
  const readiness = calculateOverallReadiness(currentUser!.id, role);
  const strengths = gaps.filter((g) => g.level >= 70).map((g) => g.skill);
  const toImprove = gaps.filter((g) => g.level < 70).map((g) => g.skill);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">AI Skill Gap Analyzer</h1>
        <p className="text-sm text-ink-500 mt-1">Select your target role to see your skill gaps and readiness.</p>
      </div>

      {/* Role selector */}
      <div className="card p-5">
        <label className="label">Target Role</label>
        <div className="flex flex-wrap gap-2 mb-4">
          {targetRoles.map((r) => (
            <button key={r} onClick={() => { setRole(r); setAnalyzed(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${role === r ? 'bg-brand-600 text-white shadow-soft' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
              {r}
            </button>
          ))}
        </div>
        <button onClick={analyze} className="btn-primary">
          <Zap className="w-4 h-4" /> Generate Skill Gap Analysis
        </button>
      </div>

      {loading && <LoadingState message="Analyzing your skills..." />}

      {analyzed && !loading && (
        <>
          {/* Overall readiness */}
          <div className="card p-6 bg-gradient-to-br from-brand-50 to-teal-50 border-brand-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-ink-600">Overall Career Readiness for</p>
                <h2 className="text-xl font-bold text-ink-900 font-display">{role}</h2>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold text-brand-600 font-display">{readiness}%</p>
                <p className="text-xs text-ink-500">Ready</p>
              </div>
            </div>
            <div className="mt-4 h-3 bg-white/60 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-1000" style={{ width: `${readiness}%` }} />
            </div>
          </div>

          {/* Skill breakdown */}
          <div className="card p-6">
            <h3 className="font-semibold text-ink-900 mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-brand-600" /> Skill Breakdown
            </h3>
            <div className="space-y-4">
              {gaps.map((g, i) => (
                <SkillProgress key={g.skill} skill={g.skill} level={g.level} delay={i * 100} />
              ))}
            </div>
          </div>

          {/* Strengths & Improvements */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="card p-5">
              <h3 className="font-semibold text-emerald-700 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Your Strengths
              </h3>
              {strengths.length ? (
                <div className="flex flex-wrap gap-2">
                  {strengths.map((s) => <span key={s} className="badge bg-emerald-100 text-emerald-700">{s}</span>)}
                </div>
              ) : <p className="text-sm text-ink-500">Keep learning to build your strengths!</p>}
            </div>
            <div className="card p-5">
              <h3 className="font-semibold text-amber-700 mb-3 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" /> Skills to Improve
              </h3>
              {toImprove.length ? (
                <div className="flex flex-wrap gap-2">
                  {toImprove.map((s) => <span key={s} className="badge bg-amber-100 text-amber-700">{s}</span>)}
                </div>
              ) : <p className="text-sm text-ink-500">All skills are at a strong level!</p>}
            </div>
          </div>

          {/* Generate roadmap */}
          <div className="card p-6 text-center">
            <TrendingUp className="w-10 h-10 text-brand-600 mx-auto mb-3" />
            <h3 className="font-semibold text-ink-900 mb-1">Ready to close the gap?</h3>
            <p className="text-sm text-ink-500 mb-4">Generate a personalized learning roadmap for {role}.</p>
            <button onClick={() => { toast('Roadmap generated', 'success'); navigate('/student/roadmap'); }} className="btn-primary">
              <Map className="w-4 h-4" /> Generate My Learning Roadmap
            </button>
          </div>
        </>
      )}
    </div>
  );
}
