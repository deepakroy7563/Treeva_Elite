import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, Lock, Mail, Sparkles, ShieldAlert, ArrowRight, CheckCircle2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, fillDemoCredentials } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim()) {
      setErrorMessage('Please enter your admin email address.');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const result = login(email, password);
      setIsSubmitting(false);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
      }
    }, 400);
  };

  const handleFillDemo = () => {
    const creds = fillDemoCredentials();
    setEmail(creds.email);
    setPassword(creds.password);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#070e1e] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Login Card Container */}
      <div className="relative w-full max-w-md bg-[#0d1830] border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 via-blue-500 to-indigo-400 mx-auto flex items-center justify-center text-white shadow-xl shadow-brand-500/25 mb-3">
            <Sparkles className="w-6 h-6 text-amber-200" />
          </div>
          <h1 className="tracking-[0.25em] text-2xl font-bold text-white uppercase font-sans">
            Treeva
          </h1>
          <span className="text-xs tracking-[0.35em] text-brand-300 font-semibold uppercase block -mt-1">
            Elite
          </span>
          <p className="text-xs tracking-wider text-slate-400 uppercase mt-2">
            Hotel Booking Made Easy
          </p>
          <div className="mt-3 inline-block px-3 py-1 rounded-full bg-brand-950/80 border border-brand-500/30 text-[11px] font-semibold text-brand-300">
            Admin Management Portal
          </div>
        </div>

        {/* Demo Credentials Notice Banner */}
        <div className="mb-6 p-3.5 rounded-2xl bg-slate-900/90 border border-brand-500/20 text-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="font-bold text-slate-200 uppercase tracking-wider text-[10px]">
              Client Presentation Demo Credentials
            </span>
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-[11px] text-brand-400 hover:text-brand-300 font-semibold underline underline-offset-2 flex items-center gap-1 transition"
            >
              <CheckCircle2 className="w-3 h-3" />
              <span>Fill Credentials</span>
            </button>
          </div>
          <div className="space-y-1 font-mono text-[11px] text-slate-300 bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 font-sans">Email: </span>
              <span className="text-blue-300">admin@treevaelite.demo</span>
            </div>
            <div>
              <span className="text-slate-500 font-sans">Password: </span>
              <span className="text-amber-300">Admin@123</span>
            </div>
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-5 p-3.5 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
            <ShieldAlert className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-400" />
            <span className="leading-relaxed">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Admin Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@treevaelite.demo"
                autoComplete="email"
                className="w-full pl-10 pr-4 py-3 bg-[#081124] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-500" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin@123"
                autoComplete="current-password"
                className="w-full pl-10 pr-10 py-3 bg-[#081124] border border-slate-700/80 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-slate-300 transition"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-sm shadow-lg shadow-brand-600/30 transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Admin Panel'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        {/* Security disclaimer for client presentation */}
        <div className="mt-8 pt-4 border-t border-slate-800 text-center">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            <span className="font-semibold text-slate-400">Presentation Demo Mode:</span> This demo uses browser LocalStorage for session state. In production, this must be replaced with JWT/OAuth2 HTTP-only secure cookie authentication.
          </p>
        </div>
      </div>
    </div>
  );
};
