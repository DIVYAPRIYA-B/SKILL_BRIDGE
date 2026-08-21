import type { ApplicationStatus } from '@/types';

const statusConfig: Record<ApplicationStatus, { label: string; class: string }> = {
  'applied': { label: 'Applied', class: 'bg-ink-100 text-ink-700' },
  'under-review': { label: 'Under Review', class: 'bg-amber-100 text-amber-700' },
  'shortlisted': { label: 'Shortlisted', class: 'bg-brand-100 text-brand-700' },
  'interview': { label: 'Interview', class: 'bg-teal-100 text-teal-700' },
  'selected': { label: 'Selected', class: 'bg-emerald-100 text-emerald-700' },
  'rejected': { label: 'Rejected', class: 'bg-rose-100 text-rose-700' },
};

export function StatusBadge({ status }: { status: ApplicationStatus }) {
  const cfg = statusConfig[status];
  return <span className={`badge ${cfg.class}`}>{cfg.label}</span>;
}

export function MatchBadge({ score }: { score: number }) {
  const color = score >= 85 ? 'bg-emerald-100 text-emerald-700' : score >= 70 ? 'bg-brand-100 text-brand-700' : 'bg-amber-100 text-amber-700';
  return <span className={`badge ${color}`}>{score}% Match</span>;
}

export function SkillTag({ skill }: { skill: string }) {
  return <span className="badge bg-ink-100 text-ink-700">{skill}</span>;
}
