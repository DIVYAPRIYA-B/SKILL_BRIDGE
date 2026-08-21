import { Trophy, ArrowRight, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import { getTopRecommendations } from '@/lib/mockAI';
import OpportunityCard from '@/components/ui/OpportunityCard';
import EmptyState from '@/components/ui/EmptyState';

export default function Top10() {
  const { currentUser, students, internships } = useApp();
  const student = students.find((s) => s.userId === currentUser?.id);

  if (!student) return <div className="text-center py-12 text-ink-500">Profile not found.</div>;

  const recs = getTopRecommendations(student, internships, 10);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ink-900 font-display">Top 10 Opportunities For You</h1>
            <p className="text-sm text-ink-500 mt-0.5">AI-ranked based on your skills, career interest, and preferences.</p>
          </div>
        </div>
      </div>

      {/* Ranking summary */}
      <div className="card p-5">
        <div className="flex items-center gap-3 mb-4">
          <Star className="w-5 h-5 text-amber-500" />
          <h3 className="font-semibold text-ink-900">Your Match Summary</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {recs.slice(0, 5).map((r, i) => (
            <Link key={r.internship.id} to={`/student/internship/${r.internship.id}`} className="text-center p-3 rounded-xl bg-ink-50 hover:bg-ink-100 transition-colors">
              <p className="text-xs text-ink-500">#{i + 1}</p>
              <p className="text-lg font-bold text-brand-600 font-display">{r.score}%</p>
              <p className="text-xs text-ink-600 truncate mt-0.5">{r.internship.role}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Cards */}
      {recs.length ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recs.map(({ internship, score, reason }, i) => (
            <div key={internship.id} className="relative">
              {i < 3 && (
                <div className="absolute -top-2 -left-2 z-10 w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-xs font-bold shadow-soft">
                  {i + 1}
                </div>
              )}
              <OpportunityCard internship={internship} matchScore={score} matchReason={reason} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState icon={<Trophy className="w-8 h-8" />} title="No recommendations yet" description="Complete your profile to get personalized recommendations." />
      )}
    </div>
  );
}
