import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, Users, Building2, Shield, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Role } from '@/types';

export default function Login() {
  const { login, toast } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const demoAccounts = [
    { email: 'student@skillbridge.demo', password: 'student123', role: 'student' as Role, label: 'Student', icon: Users },
    { email: 'company@skillbridge.demo', password: 'company123', role: 'industry' as Role, label: 'Industry', icon: Building2 },
    { email: 'admin@skillbridge.demo', password: 'admin123', role: 'admin' as Role, label: 'Admin', icon: Shield },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email.trim() || !password.trim()) { setError('Please enter your email and password.'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = login(email.trim(), password, role);
      if (result.ok) {
        toast('Login successful', 'success');
        navigate(role === 'student' ? '/student' : role === 'industry' ? '/industry' : '/admin');
      } else {
        setError(result.error ?? 'Login failed.');
        setLoading(false);
      }
    }, 500);
  };

  const fillDemo = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setRole(acc.role);
    setError('');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-600 via-brand-700 to-teal-700 p-12 flex-col justify-between relative overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl" />
        <div className="relative">
          <div className="flex items-center gap-2.5 text-white">
            <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold font-display">SkillBridge AI</p>
              <p className="text-xs text-brand-100">From Learning to Livelihood</p>
            </div>
          </div>
        </div>
        <div className="relative text-white">
          <h1 className="text-4xl font-bold font-display leading-tight">Bridging rural talent with skills, mentors and industry opportunities.</h1>
          <p className="mt-4 text-brand-100 text-lg">AI-powered platform for inclusive education and career empowerment.</p>
          <div className="mt-8 flex gap-6">
            <div><p className="text-3xl font-bold">10K+</p><p className="text-sm text-brand-200">Students</p></div>
            <div><p className="text-3xl font-bold">500+</p><p className="text-sm text-brand-200">Companies</p></div>
            <div><p className="text-3xl font-bold">2.5K+</p><p className="text-sm text-brand-200">Internships</p></div>
          </div>
        </div>
        <p className="relative text-xs text-brand-200">AI for Public Good — Hackathon Edition</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-ink-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2.5 mb-8 justify-center">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-ink-900 font-display text-lg">SkillBridge AI</p>
          </div>

          <h2 className="text-2xl font-bold text-ink-900 font-display">Welcome back</h2>
          <p className="text-sm text-ink-500 mt-1">Sign in to continue your journey.</p>

          {/* Demo accounts */}
          <div className="mt-5 grid grid-cols-3 gap-2">
            {demoAccounts.map((acc) => (
              <button key={acc.role} onClick={() => fillDemo(acc)} className="card p-3 hover:shadow-float transition-shadow text-center">
                <acc.icon className="w-5 h-5 mx-auto text-brand-600 mb-1.5" />
                <p className="text-xs font-semibold text-ink-700">{acc.label}</p>
                <p className="text-[10px] text-ink-400 mt-0.5">Tap to fill</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="label">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input pl-10" placeholder="you@example.com" />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-10 pr-10" placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Role</label>
              <div className="grid grid-cols-3 gap-2">
                {([['student', 'Student', Users], ['industry', 'Industry', Building2], ['admin', 'Admin', Shield]] as const).map(([val, label, Icon]) => (
                  <button key={val} type="button" onClick={() => setRole(val)} className={`flex flex-col items-center gap-1.5 py-3 rounded-xl border-2 transition-all ${role === val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-xs font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="bg-rose-50 text-rose-700 text-sm rounded-xl p-3">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Signing in...' : <>Sign In <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-ink-500">
            Don't have an account? <Link to="/register" className="text-brand-600 font-semibold hover:text-brand-700">Register</Link>
          </p>
          <p className="mt-3 text-center text-xs text-ink-400">
            <Link to="/" className="hover:text-ink-600">Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
