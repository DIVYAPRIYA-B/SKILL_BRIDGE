import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Globe, Accessibility, LogOut, Menu, X, Wifi, Zap } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';
import type { Role } from '@/types';

export default function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  const { currentUser, language, setLanguage, accessibility, setAccessibility, lowBandwidth, setLowBandwidth, logout, toast } = useApp();
  const navigate = useNavigate();
  const [showAccess, setShowAccess] = useState(false);
  const [showLang, setShowLang] = useState(false);

  const handleLogout = () => {
    logout();
    toast('Logged out successfully', 'info');
    navigate('/');
  };

  const rolePath: Record<Role, string> = { student: '/student', industry: '/industry', admin: '/admin' };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-ink-100">
      <div className="px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button onClick={onMenuClick} className="lg:hidden p-2 -ml-2 text-ink-600 hover:bg-ink-100 rounded-lg">
              <Menu className="w-5 h-5" />
            </button>
          )}
          <Link to={currentUser ? rolePath[currentUser.role] : '/'} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-ink-900 font-display leading-tight">SkillBridge AI</p>
              <p className="text-[11px] text-ink-500 leading-tight">From Learning to Livelihood</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1.5">
          {/* Language */}
          <div className="relative">
            <button
              onClick={() => { setShowLang(!showLang); setShowAccess(false); }}
              className="btn-ghost px-2.5 py-2"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span className="text-xs font-semibold">{language === 'en' ? 'EN' : 'தமிழ்'}</span>
            </button>
            {showLang && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowLang(false)} />
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-xl border border-ink-100 shadow-float py-1 z-20 animate-scale-in">
                  <button onClick={() => { setLanguage('en'); setShowLang(false); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-ink-50 ${language === 'en' ? 'text-brand-600 font-semibold' : 'text-ink-700'}`}>English</button>
                  <button onClick={() => { setLanguage('ta'); setShowLang(false); }} className={`w-full text-left px-3 py-2 text-sm hover:bg-ink-50 ${language === 'ta' ? 'text-brand-600 font-semibold' : 'text-ink-700'}`}>தமிழ் (Tamil)</button>
                </div>
              </>
            )}
          </div>

          {/* Accessibility */}
          <div className="relative">
            <button
              onClick={() => { setShowAccess(!showAccess); setShowLang(false); }}
              className="btn-ghost px-2.5 py-2"
              aria-label="Accessibility settings"
            >
              <Accessibility className="w-4 h-4" />
            </button>
            {showAccess && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowAccess(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl border border-ink-100 shadow-float p-3 z-20 animate-scale-in">
                  <p className="text-xs font-semibold text-ink-500 uppercase tracking-wide mb-2">Accessibility</p>
                  <div className="space-y-1">
                    {([['normal', 'Normal'], ['large', 'Large Text'], ['high-contrast', 'High Contrast']] as const).map(([val, label]) => (
                      <button key={val} onClick={() => setAccessibility(val)} className={`w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-ink-50 ${accessibility === val ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-ink-700'}`}>
                        {label}
                      </button>
                    ))}
                  </div>
                  <hr className="my-2 border-ink-100" />
                  <button onClick={() => setLowBandwidth(!lowBandwidth)} className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm hover:bg-ink-50 text-ink-700">
                    <span className="flex items-center gap-2"><Wifi className="w-4 h-4" /> Low Bandwidth</span>
                    <span className={`w-9 h-5 rounded-full transition-colors flex items-center ${lowBandwidth ? 'bg-brand-600' : 'bg-ink-200'}`}>
                      <span className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${lowBandwidth ? 'translate-x-4' : 'translate-x-0.5'}`} />
                    </span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Demo mode indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-xs font-semibold">
            <Zap className="w-3.5 h-3.5" /> Demo
          </div>

          {currentUser ? (
            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-xs font-semibold text-ink-800">{currentUser.name}</p>
                <p className="text-[11px] text-ink-500 capitalize">{currentUser.role}</p>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center text-white text-sm font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <button onClick={handleLogout} className="btn-ghost px-2.5 py-2" aria-label="Logout">
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn-primary text-xs px-3 py-2">{t(language, 'common.login')}</Link>
          )}
        </div>
      </div>
      {lowBandwidth && (
        <div className="bg-brand-600 text-white text-xs py-1 text-center font-medium flex items-center justify-center gap-1.5">
          <Wifi className="w-3 h-3" /> {t(language, 'common.lowBandwidth')}
        </div>
      )}
    </header>
  );
}
