import { useApp } from '@/context/AppContext';

interface SkillProgressProps {
  skill: string;
  level: number;
  delay?: number;
}

export default function SkillProgress({ skill, level, delay = 0 }: SkillProgressProps) {
  const { lowBandwidth } = useApp();
  const color = level >= 75 ? 'bg-emerald-500' : level >= 50 ? 'bg-brand-500' : level >= 35 ? 'bg-amber-500' : 'bg-rose-500';
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-ink-700">{skill}</span>
        <span className="text-sm font-semibold text-ink-900">{level}%</span>
      </div>
      <div className="h-2.5 bg-ink-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${color} ${lowBandwidth ? '' : 'transition-all duration-1000 ease-out'}`}
          style={{ width: lowBandwidth ? `${level}%` : '0%', animationDelay: `${delay}ms` }}
          ref={(el) => { if (el && !lowBandwidth) requestAnimationFrame(() => { el.style.width = `${level}%`; }); }}
        />
      </div>
    </div>
  );
}
