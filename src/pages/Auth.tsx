import React, { useState } from 'react';
import { Mail, Lock, GraduationCap, AlertCircle, Sparkles } from 'lucide-react';
import { cn } from '../components/Layout'; // reusing utility

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

    // Simulated verification logic
    if (!email.endsWith('.edu')) {
      setError('Please use a valid .edu email address to join GradEdge.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Success
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen flex text-textPrimary bg-background relative overflow-hidden">
      {/* Gradient Decorative Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[100px] mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[100px] mix-blend-screen" />

      {/* Left side branding */}
      <div className="hidden lg:flex w-1/2 bg-surface/50 p-12 flex-col justify-between border-r border-gray-800 backdrop-blur-3xl z-10">
        <div className="flex items-center space-x-3">
          <GraduationCap className="h-10 w-10 text-primary" />
          <span className="text-3xl font-bold tracking-tight text-white">GradEdge</span>
        </div>
        <div>
          <h1 className="text-5xl font-extrabold mb-6 leading-tight text-white">
            The exclusive network <br/> for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">students.</span>
          </h1>
          <p className="text-xl text-textSecondary max-w-lg mb-8">
            Connect with your peers, share study materials in class hubs, and buy/sell dorm gear.
          </p>
          <div className="flex items-center space-x-2 text-primary">
            <Sparkles className="h-5 w-5" />
            <span className="font-medium">Verified student community</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">© 2026 GradEdge Inc.</div>
      </div>

      {/* Right side form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 z-10">
        <div className="max-w-md w-full">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-3xl font-bold text-white mb-2">
              {isLogin ? 'Welcome back' : 'Create an account'}
            </h2>
            <p className="text-textSecondary">
              {isLogin ? 'Enter your credentials to access your campus.' : 'Join your exclusive campus network today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                University Email (.edu)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-surface border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="student@university.edu"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-surface border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 space-x-0 md:space-x-3 animate-in slide-in-from-top-2">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full h-12 flex items-center justify-center bg-primary hover:bg-blue-600 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-primary/20"
            >
              {isLogin ? 'Sign In' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <span className="text-gray-400">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline font-medium"
            >
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
