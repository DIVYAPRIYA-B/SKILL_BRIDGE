import { Briefcase, Clock, Globe, GraduationCap, MessageSquare } from 'lucide-react';
import type { Mentor } from '@/types';
import { SkillTag } from './Badge';

interface MentorCardProps {
  mentor: Mentor;
  onRequest?: () => void;
  requested?: boolean;
}

export default function MentorCard({ mentor, onRequest, requested }: MentorCardProps) {
  return (
    <div className="card p-5 hover:shadow-float transition-shadow flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg shrink-0">
          {mentor.name.charAt(0)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-ink-900 truncate">{mentor.name}</h3>
          <p className="text-sm text-ink-500">{mentor.role}</p>
          <p className="text-xs text-ink-400 flex items-center gap-1 mt-0.5"><Briefcase className="w-3 h-3" /> {mentor.company}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-ink-600 mb-3">
        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {mentor.experience} yrs exp</span>
        <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {mentor.career}</span>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        {mentor.skills.slice(0, 4).map((s) => <SkillTag key={s} skill={s} />)}
      </div>

      <div className="flex items-center gap-1.5 text-xs text-ink-500 mb-3">
        <Globe className="w-3.5 h-3.5" /> {mentor.languages.join(' • ')}
      </div>

      <p className="text-xs text-ink-500 mb-4 line-clamp-2">{mentor.bio}</p>

      {onRequest && (
        <button onClick={onRequest} disabled={requested} className="btn-primary text-xs mt-auto">
          <MessageSquare className="w-3.5 h-3.5" /> {requested ? 'Request Sent' : 'Request Mentorship'}
        </button>
      )}
    </div>
  );
}
