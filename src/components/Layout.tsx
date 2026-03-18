import React, { useState } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { ShoppingBag, LogOut, BookOpen, GraduationCap, Shield, ShieldOff } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, onLogout }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { to: '/feed', icon: BookOpen, label: 'My Subjects' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Campus Marketplace' },
    { to: '/mentorship', icon: GraduationCap, label: 'Mentorship Bridge' },
  ];

  const activeClass = isAnonymous 
    ? 'bg-slate-200 text-slate-800' 
    : 'bg-[#FFD700]/20 text-[#FFD700]';

  return (
    <div className={cn(
      "flex h-screen overflow-hidden relative transition-colors duration-500",
      isAnonymous ? "bg-slate-50" : "bg-[#F8FAFC]"
    )}>
      {/* Sidebar navigation */}
      <aside className={cn(
        "w-72 flex-shrink-0 border-r transition-all duration-500 flex flex-col justify-between hidden md:flex z-20",
        isAnonymous ? 'bg-slate-100' : 'bg-[#002147]',
        isAnonymous ? "border-slate-200" : "border-[#002147]/10"
      )}>
        <div>
          <div className="p-8 flex items-center space-x-3">
            <div className={cn(
              "p-2 rounded-lg transition-colors",
              isAnonymous ? "bg-slate-200" : "bg-white/10"
            )}>
              <GraduationCap className={cn("h-8 w-8", isAnonymous ? "text-slate-600" : "text-[#FFD700]")} />
            </div>
            <span className="text-2xl tracking-tighter">
              <span className={cn("font-black", isAnonymous ? "text-slate-700" : "text-white")}>Grad</span>
              <span className={cn("font-black", isAnonymous ? "text-slate-500" : "text-[#FFD700]")}>Edge</span>
            </span>
          </div>
          
          <nav className="mt-8 px-6 space-y-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group font-medium',
                    isActive
                      ? activeClass
                      : isAnonymous 
                        ? 'text-slate-500 hover:bg-slate-200 hover:text-slate-800'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={onLogout}
            className={cn(
              "flex w-full items-center space-x-3 px-5 py-4 rounded-2xl transition-all duration-300 font-medium",
              isAnonymous 
                ? "text-slate-400 hover:bg-red-50 hover:text-red-500" 
                : "text-white/50 hover:bg-white/5 hover:text-red-400"
            )}
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-30 px-8 py-4 border-b backdrop-blur-md flex items-center justify-between transition-colors duration-500",
          isAnonymous 
            ? "bg-slate-50/80 border-slate-200" 
            : "bg-white/80 border-gray-100"
        )}>
          <div className="flex items-center md:hidden">
              <GraduationCap className={cn("h-6 w-6 mr-2", isAnonymous ? "text-slate-600" : "text-[#FFD700]")} />
              <span className="text-xl font-black tracking-tighter">
                  <span className={isAnonymous ? "text-slate-700" : "text-[#002147]"}>Grad</span>
                  <span className={isAnonymous ? "text-slate-500" : "text-[#FFD700]"}>Edge</span>
              </span>
          </div>

          <div className="hidden md:block">
            <h2 className={cn("text-sm font-semibold uppercase tracking-widest transition-colors", isAnonymous ? "text-slate-400" : "text-[#002147]/40")}>
              Student Dashboard
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-gray-100/50 p-1.5 rounded-full border border-gray-200/50">
              <button 
                onClick={() => setIsAnonymous(!isAnonymous)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-500",
                  isAnonymous 
                    ? "bg-slate-600 text-white shadow-lg shadow-slate-200" 
                    : "bg-white text-[#002147] shadow-sm"
                )}
              >
                {isAnonymous ? <ShieldOff className="h-4 w-4" /> : <Shield className="h-4 w-4" />}
                <span>{isAnonymous ? "Anonymous Mode" : "Public Mode"}</span>
              </button>
            </div>
            
            <div className={cn(
              "h-10 w-10 rounded-full border-2 transition-colors",
              isAnonymous ? "bg-slate-300 border-white shadow-inner" : "bg-[#002147] border-[#FFD700]/20"
            )} />
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-8">
          <Outlet context={{ isAnonymous }} />
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className={cn(
        "md:hidden fixed bottom-6 left-6 right-6 border rounded-3xl flex justify-around p-3 z-40 shadow-2xl transition-all duration-500 backdrop-blur-xl",
        isAnonymous ? "bg-slate-800/90 border-slate-700" : "bg-[#002147]/90 border-white/10"
      )}>
        {navItems.map((item) => (
           <NavLink
           key={item.to}
           to={item.to}
           className={({ isActive }) =>
             cn(
               'p-3 rounded-2xl transition-all',
               isActive 
                ? isAnonymous ? 'bg-slate-700 text-white' : 'bg-[#FFD700] text-[#002147]'
                : 'text-white/50'
             )
           }
         >
           <item.icon className="h-6 w-6" />
         </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
