import { Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import MentorCard from '@/components/ui/MentorCard';
import EmptyState from '@/components/ui/EmptyState';

export default function IndustryMentors() {
  const { mentors } = useApp();

  if (!mentors.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Mentors</h1><p className="text-sm text-ink-500 mt-1">View all platform mentors.</p></div>
      <EmptyState icon={<Users className="w-8 h-8" />} title="No mentors available" />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">Mentors</h1><p className="text-sm text-ink-500 mt-1">View all platform mentors available to students.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mentors.map((m) => <MentorCard key={m.id} mentor={m} />)}
      </div>
    </div>
  );
}
