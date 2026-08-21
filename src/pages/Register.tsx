import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Users, Building2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import type { Role } from '@/types';

export default function Register() {
  const { register, toast } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim() || !email.trim() || !password.trim()) { setError('All fields are required.'); return; }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPass) { setError('Passwords do not match.'); return; }
    setLoading(true);
    setTimeout(() => {
      const result = register({ email: email.trim(), password, name: name.trim(), role });
      if (result.ok) {
        toast('Registration successful', 'success');
        if (role === 'student') navigate('/onboarding');
        else navigate(role === 'industry' ? '/industry' : '/admin');
      } else {
        setError(result.error ?? 'Registration failed.');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ink-50 p-6">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2.5 mb-8 justify-center">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <p className="font-bold text-ink-900 font-display text-lg">SkillBridge AI</p>
        </div>

        <div className="card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-ink-900 font-display">Create your account</h2>
          <p className="text-sm text-ink-500 mt-1">Start your journey from learning to livelihood.</p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div>
              <label className="label">Full Name {role === 'industry' && '(Company Name)'}</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input value={name} onChange={(e) => setName(e.target.value)} className="input pl-10" placeholder={role === 'industry' ? 'TechNova Solutions' : 'Karthik Raja'} />
              </div>
            </div>
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
                <input type={showPass ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="input pl-10 pr-10" placeholder="Min 6 characters" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 hover:text-ink-600">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
                <input type={showPass ? 'text' : 'password'} value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="input pl-10" placeholder="Re-enter password" />
              </div>
            </div>
            <div>
              <label className="label">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {([['student', 'Student', Users], ['industry', 'Industry', Building2]] as const).map(([val, label, Icon]) => (
                  <button key={val} type="button" onClick={() => setRole(val)} className={`flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all ${role === val ? 'border-brand-500 bg-brand-50 text-brand-700' : 'border-ink-200 text-ink-500 hover:border-ink-300'}`}>
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && <div className="bg-rose-50 text-rose-700 text-sm rounded-xl p-3">{error}</div>}

            <button type="submit" disabled={loading} className="btn-primary w-full py-3">
              {loading ? 'Creating account...' : <>Create Account <ArrowRight className="w-4 h-4" /></>}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-ink-500">
            Already have an account? <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700">Sign in</Link>
          </p>
          <p className="mt-3 text-center text-xs text-ink-400">
            <Link to="/" className="hover:text-ink-600">Back to home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
