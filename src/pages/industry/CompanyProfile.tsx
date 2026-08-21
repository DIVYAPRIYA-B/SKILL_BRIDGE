import { useState } from 'react';
import { Building2, Save, Globe, Users } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { CompanyProfile } from '@/types';

export default function CompanyProfilePage() {
  const { currentUser, companies, updateCompanyProfile, toast } = useApp();
  const existing = companies.find((c) => c.userId === currentUser?.id);
  const [profile, setProfile] = useState<CompanyProfile>(existing ?? {
    userId: currentUser?.id ?? '', companyName: currentUser?.name ?? '', industry: '', location: '', website: '', description: '', size: '',
  });

  const update = (patch: Partial<CompanyProfile>) => setProfile((p) => ({ ...p, ...patch }));

  const save = () => {
    updateCompanyProfile(profile);
    toast('Company profile saved', 'success');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Company Profile</h1>
        <p className="text-sm text-ink-500 mt-1">Manage your company information visible to students.</p>
      </div>

      <div className="card p-6 space-y-5">
        <div className="flex items-center gap-4 pb-4 border-b border-ink-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-2xl font-bold">
            {profile.companyName.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink-900">{profile.companyName}</h2>
            <p className="text-sm text-ink-500">{profile.industry || 'Add your industry'}</p>
          </div>
        </div>

        <div>
          <label className="label">Company Name</label>
          <input className="input" value={profile.companyName} onChange={(e) => update({ companyName: e.target.value })} />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Industry</label>
            <select className="input" value={profile.industry} onChange={(e) => update({ industry: e.target.value })}>
              <option value="">Select industry</option>
              <option value="Software Development">Software Development</option>
              <option value="Data & AI">Data & AI</option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Web Development">Web Development</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="Finance">Finance</option>
              <option value="Manufacturing">Manufacturing</option>
            </select>
          </div>
          <div>
            <label className="label">Company Size</label>
            <select className="input" value={profile.size} onChange={(e) => update({ size: e.target.value })}>
              <option value="">Select size</option>
              <option value="1-10">1-10</option><option value="10-50">10-50</option>
              <option value="50-200">50-200</option><option value="200-500">200-500</option>
              <option value="500-1000">500-1000</option><option value="1000+">1000+</option>
            </select>
          </div>
        </div>
        <div>
          <label className="label">Location</label>
          <input className="input" value={profile.location} onChange={(e) => update({ location: e.target.value })} placeholder="Chennai" />
        </div>
        <div>
          <label className="label">Website</label>
          <input className="input" value={profile.website} onChange={(e) => update({ website: e.target.value })} placeholder="www.example.com" />
        </div>
        <div>
          <label className="label">Description</label>
          <textarea className="input min-h-[100px]" value={profile.description} onChange={(e) => update({ description: e.target.value })} placeholder="Tell students about your company..." />
        </div>

        <button onClick={save} className="btn-primary">
          <Save className="w-4 h-4" /> Save Profile
        </button>
      </div>
    </div>
  );
}
