import { useState } from 'react';
import { Briefcase, MapPin, IndianRupee, Clock, FileText, Calendar } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import EmptyState from '@/components/ui/EmptyState';
import { StatusBadge } from '@/components/ui/Badge';

export default function IndustryInternships() {
  const { currentUser, internships, applications } = useApp();
  const myInternships = internships.filter((i) => i.companyId === currentUser?.id);

  if (!myInternships.length) return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">My Internships</h1><p className="text-sm text-ink-500 mt-1">Manage your posted internships.</p></div>
      <EmptyState icon={<Briefcase className="w-8 h-8" />} title="No internships posted" description="Post your first internship to attract candidates." />
    </div>
  );

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-ink-900 font-display">My Internships</h1><p className="text-sm text-ink-500 mt-1">Manage your posted internships.</p></div>
      <div className="grid gap-4">
        {myInternships.map((i) => {
          const apps = applications.filter((a) => a.internshipId === i.id);
          return (
            <div key={i.id} className="card p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                <div>
                  <h3 className="font-semibold text-ink-900">{i.role}</h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-ink-600">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {i.remote ? `${i.location} / Remote` : i.location}</span>
                    <span className="flex items-center gap-1.5"><IndianRupee className="w-4 h-4" /> {i.stipend.toLocaleString('en-IN')}/mo</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {i.duration}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {i.deadline}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={i.status === 'active' ? 'applied' : 'rejected'} />
                  <span className="badge bg-brand-50 text-brand-700"><FileText className="w-3.5 h-3.5" /> {apps.length} apps</span>
                </div>
              </div>
              <p className="text-sm text-ink-600 line-clamp-2">{i.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {i.requiredSkills.map((s) => <span key={s} className="badge bg-ink-100 text-ink-700">{s}</span>)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
