import { Settings, Globe, Accessibility, Wifi, RotateCcw } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { AccessibilityMode } from '@/types';

export default function AdminSettings() {
  const { language, setLanguage, accessibility, setAccessibility, lowBandwidth, setLowBandwidth, toast } = useApp();

  const resetData = () => {
    if (confirm('This will reset all demo data. Continue?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-ink-900 font-display">Settings</h1>
        <p className="text-sm text-ink-500 mt-1">Manage platform and accessibility settings.</p>
      </div>

      {/* Language */}
      <div className="card p-5">
        <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-brand-600" /> Language</h3>
        <div className="grid grid-cols-2 gap-2">
          {([['en', 'English'], ['ta', 'தமிழ் (Tamil)']] as const).map(([val, label]) => (
            <button key={val} onClick={() => { setLanguage(val); toast('Language updated', 'success'); }} className={`py-3 rounded-xl text-sm font-medium border-2 transition-all ${language === val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:border-ink-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Accessibility */}
      <div className="card p-5">
        <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2"><Accessibility className="w-5 h-5 text-brand-600" /> Accessibility</h3>
        <div className="space-y-2">
          {([['normal', 'Normal'], ['large', 'Large Text'], ['high-contrast', 'High Contrast']] as const).map(([val, label]) => (
            <button key={val} onClick={() => { setAccessibility(val as AccessibilityMode); toast('Accessibility updated', 'success'); }} className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium border-2 transition-all ${accessibility === val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-600 hover:border-ink-300'}`}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Low Bandwidth */}
      <div className="card p-5">
        <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2"><Wifi className="w-5 h-5 text-brand-600" /> Low Bandwidth Mode</h3>
        <p className="text-sm text-ink-500 mb-3">Disables animations and decorative elements for users with limited connectivity.</p>
        <button onClick={() => { setLowBandwidth(!lowBandwidth); toast('Low bandwidth mode updated', 'success'); }} className="w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 border-ink-200 hover:border-ink-300">
          <span className="text-sm font-medium text-ink-700">{lowBandwidth ? 'Enabled' : 'Disabled'}</span>
          <span className={`w-11 h-6 rounded-full transition-colors flex items-center ${lowBandwidth ? 'bg-brand-600' : 'bg-ink-200'}`}>
            <span className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${lowBandwidth ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </span>
        </button>
      </div>

      {/* Reset */}
      <div className="card p-5">
        <h3 className="font-semibold text-ink-900 mb-3 flex items-center gap-2"><Settings className="w-5 h-5 text-rose-600" /> Data Management</h3>
        <p className="text-sm text-ink-500 mb-3">Reset all demo data to its initial state. This will clear all changes made during the session.</p>
        <button onClick={resetData} className="btn-danger">
          <RotateCcw className="w-4 h-4" /> Reset Demo Data
        </button>
      </div>
    </div>
  );
}
