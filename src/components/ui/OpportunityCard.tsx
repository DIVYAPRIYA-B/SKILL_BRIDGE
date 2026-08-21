import { MapPin, Clock, IndianRupee, Building2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Internship } from '@/types';
import { MatchBadge, SkillTag } from './Badge';

interface OpportunityCardProps {
  internship: Internship;
  matchScore?: number;
  matchReason?: string;
  onApply?: () => void;
  showMatch?: boolean;
}

export default function OpportunityCard({ internship, matchScore, matchReason, onApply, showMatch = true }: OpportunityCardProps) {
  return (
    <div className="card p-5 hover:shadow-float transition-shadow duration-200 flex flex-col">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink-900 truncate">{internship.role}</h3>
          <p className="text-sm text-ink-500 flex items-center gap-1.5 mt-0.5">
            <Building2 className="w-3.5 h-3.5" /> {internship.companyName}
          </p>
        </div>
        {showMatch && matchScore !== undefined && <MatchBadge score={matchScore} />}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-ink-600 mb-3">
        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {internship.remote ? `${internship.location} / Remote` : internship.location}</span>
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {internship.duration}</span>
        <span className="flex items-center gap-1"><IndianRupee className="w-3.5 h-3.5" /> {internship.stipend.toLocaleString('en-IN')}/mo</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {internship.requiredSkills.slice(0, 4).map((s) => <SkillTag key={s} skill={s} />)}
      </div>

      {showMatch && matchReason && (
        <p className="text-xs text-ink-500 bg-brand-50/50 rounded-lg p-2.5 mb-3 italic">&ldquo;{matchReason}&rdquo;</p>
      )}

      <div className="flex gap-2 mt-auto pt-2">
        <Link to={`/student/internship/${internship.id}`} className="btn-secondary text-xs flex-1">
          View Details
        </Link>
        {onApply && (
          <button onClick={onApply} className="btn-primary text-xs flex-1">
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
}
