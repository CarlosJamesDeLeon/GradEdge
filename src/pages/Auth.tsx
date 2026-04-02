import React, { useState } from 'react';

interface AuthProps {
  onAuthSuccess: () => void;
}

const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Email is required.');
      return;
    }
    
    if (!email.includes('@') || !email.endsWith('.edu')) {
      setError('A valid .edu email is required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (!isLogin && !studentId) {
      setError('Student ID is required.');
      return;
    }

    onAuthSuccess();
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] font-sans text-slate-900 px-4 sm:px-6">
      <div className="w-full max-w-sm relative">
        {/* Subtle gold ambient shadow - exactly one defining effect */}
        <div className="absolute -inset-0.5 bg-[#FFD700] opacity-20 blur-2xl rounded-2xl pointer-events-none transition-all duration-1000"></div>
        
        <div className="relative bg-white shadow-sm ring-1 ring-black/5 rounded-2xl p-8 sm:p-10 transition-all">
          <div className="mb-8">
            <div className="font-bold text-xl text-[#002147] tracking-tight mb-6 cursor-default">
              Grad<span className="text-[#FFD700]">Edge</span>
            </div>
            
            <h1 className="text-2xl font-medium tracking-tight text-slate-900 mb-1.5">
              {isLogin ? 'Welcome back.' : 'Request access.'}
            </h1>
            <p className="text-sm text-slate-500">
              {isLogin ? 'Enter your credentials to continue.' : 'Create your verified account.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-medium text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@university.edu"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002147] focus:border-[#002147] transition-shadow placeholder:text-slate-400"
                required
              />
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <label htmlFor="studentId" className="block text-xs font-medium text-slate-700">
                  Student ID
                </label>
                <input
                  id="studentId"
                  type="text"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  placeholder="e.g. 12345678"
                  className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002147] focus:border-[#002147] transition-shadow placeholder:text-slate-400"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-medium text-slate-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#002147] focus:border-[#002147] transition-shadow placeholder:text-slate-400"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-xs font-medium rounded-lg border border-red-100 flex items-start">
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#002147] hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#002147] transition-colors"
                style={{ WebkitFontSmoothing: 'antialiased' }}
              >
                {isLogin ? 'Log in' : 'Continue'}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center border-t border-slate-100 pt-6">
            <button
              onClick={toggleMode}
              type="button"
              className="text-xs text-slate-500 hover:text-[#002147] transition-colors focus:outline-none"
            >
              {isLogin ? "Don't have an account? Request access." : 'Already have access? Log in.'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
