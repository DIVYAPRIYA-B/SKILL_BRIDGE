import { CheckCircle2, Circle, Clock, Target } from 'lucide-react';
import type { RoadmapModule } from '@/types';

interface LearningCardProps {
  module: RoadmapModule;
  onToggle: () => void;
}

export default function LearningCard({ module, onToggle }: LearningCardProps) {
  return (
    <div className={`card p-5 transition-all ${module.completed ? 'border-teal-200 bg-teal-50/30' : ''}`}>
      <div className="flex items-start gap-3">
        <button onClick={onToggle} className="mt-0.5 shrink-0" aria-label={module.completed ? 'Mark incomplete' : 'Mark complete'}>
          {module.completed ? <CheckCircle2 className="w-5 h-5 text-teal-600" /> : <Circle className="w-5 h-5 text-ink-300 hover:text-brand-500" />}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-xs font-semibold text-brand-600">Week {module.week}</span>
            <span className="text-xs text-ink-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {module.estimatedHours}h</span>
          </div>
          <h3 className={`font-semibold text-ink-900 ${module.completed ? 'line-through text-ink-500' : ''}`}>{module.title}</h3>
          <p className="text-xs text-ink-500 mt-0.5">{module.topic}</p>
          <ul className="mt-3 space-y-1.5">
            {module.objectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-ink-600">
                <Target className="w-3.5 h-3.5 mt-0.5 text-brand-400 shrink-0" /> {obj}
              </li>
            ))}
          </ul>
          <button onClick={onToggle} className={`mt-3 text-xs font-semibold ${module.completed ? 'text-ink-500 hover:text-ink-700' : 'text-brand-600 hover:text-brand-700'}`}>
            {module.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
          </button>
        </div>
      </div>
    </div>
  );
}
