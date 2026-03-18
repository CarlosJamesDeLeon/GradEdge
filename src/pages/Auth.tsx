import React, { useState } from 'react';
import { Mail, Lock, GraduationCap, AlertCircle, ShieldCheck } from 'lucide-react';

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
    <div className="min-h-screen flex text-[#002147] bg-[#F8FAFC] relative overflow-hidden font-sans">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#002147]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#FFD700]/10 rounded-full blur-[120px]" />

      {/* Left side branding */}
      <div className="hidden lg:flex w-1/2 bg-[#002147] p-16 flex-col justify-between z-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        
        <div className="flex items-center space-x-4 relative z-20">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
            <GraduationCap className="h-10 w-10 text-[#FFD700]" />
          </div>
          <span className="text-4xl tracking-tighter text-white font-black italic">
            Grad<span className="text-[#FFD700]">Edge</span>
          </span>
        </div>

        <div className="relative z-20">
          <div className="h-1 w-20 bg-[#FFD700] mb-8 rounded-full" />
          <h1 className="text-6xl font-black mb-8 leading-[1.1] text-white">
            The Student <br/> <span className="text-[#FFD700]">Safe Haven.</span>
          </h1>
          <p className="text-xl text-white/70 max-w-lg mb-12 font-medium leading-loose">
            An exclusive academic network designed for verified students. Collaborate, share, and excel in a professional environment.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="h-12 w-12 rounded-full border-4 border-[#002147] bg-white/20" />
              ))}
            </div>
            <div className="text-white/60 text-sm font-bold uppercase tracking-widest">
              Join 50k+ Verified Students
            </div>
          </div>
        </div>

        <div className="text-xs text-white/30 font-bold tracking-widest uppercase relative z-20">
          Oxford Academic Standard © 2026
        </div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="max-w-md w-full">
          <div className="text-center lg:text-left mb-12">
            <div className="inline-flex items-center space-x-2 bg-[#002147]/5 px-4 py-2 rounded-full mb-6 border border-[#002147]/10">
                <ShieldCheck className="h-4 w-4 text-[#002147]" />
                <span className="text-xs font-black uppercase tracking-widest">Verified Access Only</span>
            </div>
            <h2 className="text-4xl font-black text-[#002147] mb-4">
              {isLogin ? 'Welcome Back' : 'Secure Your Spot'}
            </h2>
            <p className="text-gray-500 font-medium text-lg">
              {isLogin ? 'Enter your academic credentials.' : 'Create your verified student profile.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div>
              <label className="block text-xs font-black text-[#002147]/40 uppercase tracking-widest mb-3">
                University Email (.edu)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[#002147]/30" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-3xl text-[#002147] font-bold focus:outline-none focus:border-[#002147] focus:ring-4 focus:ring-[#002147]/10 transition-all text-lg"
                  placeholder="name@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-[#002147]/40 uppercase tracking-widest mb-3">
                Access Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[#002147]/30" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-14 pr-6 py-5 bg-white border-2 border-gray-100 rounded-3xl text-[#002147] font-bold focus:outline-none focus:border-[#002147] focus:ring-4 focus:ring-[#002147]/10 transition-all text-lg"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-6 rounded-3xl bg-red-50 border-2 border-red-100 text-red-600 font-bold text-sm flex items-center space-x-4 animate-in fade-in slide-in-from-top-4">
                <AlertCircle className="h-6 w-6 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-16 flex items-center justify-center bg-[#002147] hover:bg-black text-white font-black text-sm uppercase tracking-[0.2em] rounded-3xl transition-all shadow-2xl shadow-[#002147]/20 active:scale-95"
            >
              {isLogin ? 'Authorize Entry' : 'Create Identity'}
            </button>
          </form>

          <div className="mt-12 text-center text-sm">
            <span className="text-gray-400 font-bold">
              {isLogin ? "New to the hub? " : "Already verified? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#002147] hover:text-black font-black uppercase tracking-widest underline decoration-[#FFD700] decoration-4 underline-offset-8"
            >
              {isLogin ? 'Request Access' : 'Authenticate'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
