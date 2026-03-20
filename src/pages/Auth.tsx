import React, { useState } from 'react';
import { Mail, Lock, AlertCircle, ShieldCheck } from 'lucide-react';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.endsWith('.edu')) {
      setError('A valid .edu email is required for the Graduate Hub.');
      return;
    }

    if (password.length < 6) {
      setError('Academic keys must be at least 6 characters.');
      return;
    }

    onAuthSuccess();
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-[#002147] bg-[#F8FAFC] relative overflow-hidden font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#002147]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-[#FFD700]/20 rounded-full blur-[120px]" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay pointer-events-none" />

      {/* Centered Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-lg p-10 bg-white/90 backdrop-blur-xl shadow-[0_25px_50px_-12px_rgba(0,33,71,0.25),_0_0_0_1px_rgba(255,215,0,0.3)] rounded-[2.5rem]">
        {/* Branding */}
        <div id="brand-entrance" className="flex flex-col items-center justify-center text-center cursor-default mb-10">
          <div className="inline-flex items-center justify-center mb-1">
            <img 
              src="/Gemini_Generated_Image_k7d8mfk7d8mfk7d8.png" 
              alt="GradEdge Logo" 
              className="w-16 h-16 max-w-[64px] object-contain animate-[prestige-pulse_4s_ease-in-out_infinite]"
            />
          </div>
          <h1 className="text-5xl font-black italic tracking-tighter text-[#002147]" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Grad<span className="text-[#FFD700]">Edge</span>
          </h1>
          <p className="text-[#002147]/60 font-bold tracking-[0.2em] uppercase text-xs mt-1">
            The Student Safe Haven
          </p>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center space-x-2 bg-[#002147]/5 px-4 py-2 rounded-full mb-6 border border-[#002147]/10">
            <ShieldCheck className="h-4 w-4 text-[#002147]" />
            <span className="text-xs font-black uppercase tracking-widest">Verified Access Only</span>
          </div>
          <h2 className="text-3xl font-black text-[#002147] mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {isLogin ? 'Welcome Back' : 'Secure Your Spot'}
          </h2>
          <p className="text-gray-500 font-medium text-sm">
            {isLogin ? 'Enter your academic credentials to proceed.' : 'Create your verified student profile.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-black text-[#002147]/40 uppercase tracking-widest mb-2 px-2">
              University Email (.edu)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-[#002147]/40" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-md border hover:border-slate-300 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:border-[#002147] focus:shadow-[inset_0_2px_15px_rgba(255,215,0,0.2)] transition-all duration-300 ease-in-out text-base"
                placeholder="name@university.edu"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#002147]/40 uppercase tracking-widest mb-2 px-2">
              Access Key
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-[#002147]/40" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-14 pr-6 py-4 bg-white/70 backdrop-blur-md border hover:border-slate-300 border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 font-bold focus:outline-none focus:border-[#002147] focus:shadow-[inset_0_2px_15px_rgba(255,215,0,0.2)] transition-all duration-300 ease-in-out text-base"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-red-50/90 backdrop-blur-md border-2 border-red-100 text-red-600 font-bold text-sm flex items-center space-x-3 animate-in fade-in slide-in-from-top-4">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="group relative overflow-hidden w-full h-14 mt-4 flex items-center justify-center bg-gradient-to-b from-[#FFE55C] to-[#FFD700] text-[#002147] font-black text-sm uppercase tracking-[0.2em] rounded-2xl transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFD700]/40 active:scale-95 border-b-4 border-[#002147]/10 hover:border-transparent"
          >
            <div className="absolute inset-0 -translate-x-[150%] skew-x-[-20deg] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/50 to-transparent" />
            <span className="relative z-10">{isLogin ? 'Authorize Entry' : 'Create Identity'}</span>
          </button>
        </form>

        <div className="mt-8 text-center text-sm">
          <span className="text-gray-500 font-bold">
            {isLogin ? "New to the hub? " : "Already verified? "}
          </span>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#002147] hover:text-black font-black uppercase tracking-widest underline decoration-[#FFD700]/50 hover:decoration-[#FFD700] decoration-2 underline-offset-4 transition-all duration-300"
          >
            {isLogin ? 'Request Access' : 'Authenticate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
