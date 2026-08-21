import { Link } from 'react-router-dom';
import {
  Sparkles, ArrowRight, Users, Building2, Briefcase, TrendingUp,
  MapPin, Bot, Target, Map, GraduationCap, Globe, Wifi, HeartHandshake,
  BookOpen, Award, CheckCircle2, Languages, Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { t } from '@/lib/i18n';

export default function Landing() {
  const { language } = useApp();

  const stats = [
    { value: '10,000+', label: 'Students Supported', icon: Users, color: 'text-brand-600' },
    { value: '500+', label: 'Industry Partners', icon: Building2, color: 'text-teal-600' },
    { value: '2,500+', label: 'Internships', icon: Briefcase, color: 'text-amber-600' },
    { value: '78%', label: 'Avg Skill Improvement', icon: TrendingUp, color: 'text-emerald-600' },
  ];

  const problems = [
    'Career guidance', 'Industry exposure', 'Mentors', 'Skill development resources', 'Internship awareness', 'Access to quality opportunities',
  ];

  const solutions = [
    { icon: Bot, title: 'Personalized AI Guidance', desc: 'AI-powered career assistant available 24/7 in local languages.' },
    { icon: Target, title: 'Skill-gap Analysis', desc: 'Identify exactly what skills you need for your dream career.' },
    { icon: Languages, title: 'Multilingual Support', desc: 'Full Tamil and English support for inclusive access.' },
    { icon: Map, title: 'Learning Roadmaps', desc: 'Step-by-step personalized learning plans with progress tracking.' },
    { icon: Briefcase, title: 'Internship Matching', desc: 'AI-powered matching with real industry internships.' },
    { icon: Users, title: 'Mentor Connections', desc: 'Connect with experienced industry professionals.' },
  ];

  const steps = [
    { icon: Users, title: 'Create Profile', desc: 'Tell us about your skills, interests and goals.' },
    { icon: Target, title: 'Analyze Skills', desc: 'AI identifies your strengths and skill gaps.' },
    { icon: Map, title: 'Learn', desc: 'Follow a personalized learning roadmap.' },
    { icon: Briefcase, title: 'Discover Opportunities', desc: 'Get AI-matched internship recommendations.' },
    { icon: HeartHandshake, title: 'Connect with Industry', desc: 'Apply, interview and find mentors.' },
    { icon: GraduationCap, title: 'Build Your Career', desc: 'Transform learning into livelihood.' },
  ];

  const impacts = [
    { icon: BookOpen, title: 'Inclusive Education', desc: 'Students receive personalized learning guidance tailored to their background.' },
    { icon: Award, title: 'Equal Opportunity', desc: 'Students discover opportunities based on skills, not just location.' },
    { icon: Building2, title: 'Industry Access', desc: 'Rural students connect directly with companies and mentors.' },
    { icon: Globe, title: 'Local Language', desc: 'Career assistance provided in Tamil and English.' },
    { icon: Wifi, title: 'Affordable Technology', desc: 'Designed to work with limited connectivity through low-bandwidth mode.' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-ink-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center shadow-soft">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-ink-900 font-display leading-tight">SkillBridge AI</p>
              <p className="text-[11px] text-ink-500 leading-tight">From Learning to Livelihood</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/login" className="btn-ghost text-sm">{t(language, 'common.login')}</Link>
            <Link to="/register" className="btn-primary text-sm">{t(language, 'landing.getStarted')}</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-teal-50 lb-hide" />
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-200/30 rounded-full blur-3xl lb-hide" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl lb-hide" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-100 text-brand-700 text-xs font-semibold mb-5">
                <Zap className="w-3.5 h-3.5" /> AI for Public Good — Hackathon Edition
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-ink-900 font-display leading-tight text-balance">
                {t(language, 'landing.heroTitle')}
              </h1>
              <p className="mt-5 text-lg text-ink-600 max-w-xl leading-relaxed">
                {t(language, 'landing.heroSubtitle')}
              </p>
              <p className="mt-3 text-base text-ink-500 italic">
                "From Learning to Livelihood." — Bridging rural talent with skills, mentors and industry opportunities.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary text-base px-6 py-3">
                  {t(language, 'landing.getStarted')} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link to="/login" className="btn-secondary text-base px-6 py-3">
                  {t(language, 'landing.explore')}
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-4 text-xs text-ink-500">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> No credit card required</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-teal-600" /> Demo accounts ready</span>
              </div>
            </div>

            {/* Visual */}
            <div className="relative lb-hide">
              <div className="grid grid-cols-2 gap-4 animate-float">
                {[
                  { icon: Users, label: 'Student', color: 'from-brand-500 to-brand-600', sub: 'Profile & Skills' },
                  { icon: Bot, label: 'AI', color: 'from-teal-500 to-teal-600', sub: 'Guidance & Analysis' },
                  { icon: Target, label: 'Skills', color: 'from-amber-500 to-amber-600', sub: 'Gap & Roadmap' },
                  { icon: Briefcase, label: 'Internship', color: 'from-emerald-500 to-emerald-600', sub: 'Match & Apply' },
                  { icon: GraduationCap, label: 'Career', color: 'from-brand-600 to-teal-600', sub: 'Mentor & Industry' },
                ].map((item, i) => (
                  <div key={i} className={`card p-5 ${i === 4 ? 'col-span-2' : ''} hover:shadow-float transition-shadow`}>
                    <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-soft`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="font-semibold text-ink-900">{item.label}</p>
                    <p className="text-xs text-ink-500">{item.sub}</p>
                  </div>
                ))}
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-teal-200/40 rounded-full blur-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-ink-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <s.icon className={`w-7 h-7 mx-auto mb-2 ${s.color}`} />
                <p className="text-3xl font-bold font-display">{s.value}</p>
                <p className="text-sm text-ink-300 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink-900 font-display">{t(language, 'landing.problem')}</h2>
            <p className="mt-3 text-ink-600 max-w-2xl mx-auto">Many students in rural and underserved communities face barriers that limit their potential.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {problems.map((p, i) => (
              <div key={i} className="flex items-center gap-3 card p-4">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold">{i + 1}</span>
                </div>
                <span className="text-sm font-medium text-ink-700">Lack of {p.toLowerCase()}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-20 bg-ink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink-900 font-display">{t(language, 'landing.solution')}</h2>
            <p className="mt-3 text-ink-600 max-w-2xl mx-auto">SkillBridge AI provides a complete ecosystem for rural student empowerment.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {solutions.map((s, i) => (
              <div key={i} className="card p-6 hover:shadow-float transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center mb-4 shadow-soft">
                  <s.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-ink-900 mb-1.5">{s.title}</h3>
                <p className="text-sm text-ink-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink-900 font-display">{t(language, 'landing.howItWorks')}</h2>
            <p className="mt-3 text-ink-600">From profile to career in six steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {steps.map((s, i) => (
              <div key={i} className="relative card p-6">
                <div className="absolute top-4 right-4 text-5xl font-bold text-ink-100 font-display">{i + 1}</div>
                <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-ink-900 mb-1.5">{s.title}</h3>
                <p className="text-sm text-ink-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-brand-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold font-display">{t(language, 'landing.impact')}</h2>
            <p className="mt-3 text-brand-100">Real numbers, real change.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={i} className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <s.icon className="w-8 h-8 mx-auto mb-3 text-white" />
                <p className="text-3xl font-bold font-display">{s.value}</p>
                <p className="text-sm text-brand-100 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Impact */}
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-ink-900 font-display">{t(language, 'landing.socialImpact')}</h2>
            <p className="mt-3 text-ink-600 max-w-2xl mx-auto">How SkillBridge AI creates lasting social change for underserved communities.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {impacts.map((imp, i) => (
              <div key={i} className="card p-6 hover:shadow-float transition-shadow">
                <div className="w-11 h-11 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-4">
                  <imp.icon className="w-5.5 h-5.5" />
                </div>
                <h3 className="font-semibold text-ink-900 mb-1.5">{imp.title}</h3>
                <p className="text-sm text-ink-600">{imp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-ink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-ink-900 font-display">Ready to bridge the gap?</h2>
          <p className="mt-4 text-ink-600 text-lg">Join thousands of students transforming their future with AI-powered guidance.</p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link to="/register" className="btn-primary text-base px-6 py-3">
              {t(language, 'landing.getStarted')} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/login" className="btn-secondary text-base px-6 py-3">Try Demo Accounts</Link>
          </div>
          <div className="mt-8 grid sm:grid-cols-3 gap-4 text-left">
            {[
              { email: 'student@skillbridge.demo', role: 'Student', pass: 'student123' },
              { email: 'company@skillbridge.demo', role: 'Industry', pass: 'company123' },
              { email: 'admin@skillbridge.demo', role: 'Admin', pass: 'admin123' },
            ].map((d, i) => (
              <div key={i} className="card p-4">
                <p className="text-xs font-semibold text-brand-600 uppercase">{d.role}</p>
                <p className="text-sm font-medium text-ink-800 mt-1">{d.email}</p>
                <p className="text-xs text-ink-500 mt-0.5">Password: {d.pass}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink-950 text-ink-400 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-white">SkillBridge AI</span>
            </div>
            <p className="text-xs">AI for Public Good — Inclusive AI, Social Impact and Empowerment of Underserved Communities</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
