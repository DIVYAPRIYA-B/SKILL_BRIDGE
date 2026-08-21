import { useState, useEffect } from 'react';
import { Map, Clock, TrendingUp } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { roadmaps } from '@/data/demoData';
import type { RoadmapModule } from '@/types';
import LearningCard from '@/components/ui/LearningCard';
import EmptyState from '@/components/ui/EmptyState';

export default function Roadmap() {
  const { currentUser, getRoadmap, saveRoadmap, toast } = useApp();
  const [role, setRole] = useState('Java Developer');
  const [modules, setModules] = useState<RoadmapModule[]>([]);

  useEffect(() => {
    const saved = getRoadmap(role);
    if (saved) {
      setModules(saved);
    } else {
      const template = roadmaps[role] ?? roadmaps['Java Developer'];
      setModules(template.map((m) => ({ ...m, completed: false })));
    }
  }, [role, getRoadmap]);

  const toggle = (week: number) => {
    setModules((prev) => {
      const updated = prev.map((m) => (m.week === week ? { ...m, completed: !m.completed } : m));
      saveRoadmap(role, updated);
      const justCompleted = updated.find((m) => m.week === week)?.completed;
      if (justCompleted) toast(`Week ${week} completed!`, 'success');
      return updated;
    });
  };

  const progress = modules.length ? Math.round((modules.filter((m) => m.completed).length / modules.length) * 100) : 0;
  const totalHours = modules.reduce((sum, m) => sum + m.estimatedHours, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Personalized Learning Roadmap</h1>
        <p className="text-sm text-ink-500 mt-1">Your step-by-step plan to career readiness.</p>
      </div>

      {/* Role selector */}
      <div className="card p-4">
        <label className="label">Career Path</label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(roadmaps).map((r) => (
            <button key={r} onClick={() => setRole(r)} className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${role === r ? 'bg-brand-600 text-white shadow-soft' : 'bg-ink-100 text-ink-700 hover:bg-ink-200'}`}>
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Progress overview */}
      <div className="card p-6 bg-gradient-to-br from-brand-50 to-teal-50 border-brand-100">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-lg font-bold text-ink-900 font-display">{role} — 6 Week Roadmap</h2>
            <p className="text-sm text-ink-600 mt-0.5 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {totalHours} hours total</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-brand-600 font-display">{progress}%</p>
            <p className="text-xs text-ink-500">Complete</p>
          </div>
        </div>
        <div className="h-3 bg-white/60 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-brand-500 to-teal-500 rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Modules */}
      {modules.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {modules.map((m) => (
            <LearningCard key={m.week} module={m} onToggle={() => toggle(m.week)} />
          ))}
        </div>
      ) : (
        <EmptyState icon={<Map className="w-8 h-8" />} title="No roadmap yet" description="Select a career path above to generate your roadmap." />
      )}
    </div>
  );
}
