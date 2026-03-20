import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { ShoppingBag, LogOut, BookOpen, GraduationCap, Bell } from 'lucide-react';
import Avatar from './Avatar';
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
  const isAnonymous = false;
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { to: '/feed', icon: BookOpen, label: 'My Subjects' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Campus Marketplace' },
    { to: '/mentorship', icon: GraduationCap, label: 'Mentorship Bridge' },
  ];

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
            <div id="brand-entrance" className="w-12 h-12 flex items-center justify-center flex-shrink-0">
              <img 
                src="/Gemini_Generated_Image_k7d8mfk7d8mfk7d8.png" 
                alt="GradEdge Logo" 
                className={cn(
                  "w-full h-full max-w-[48px] object-contain animate-[prestige-pulse_4s_ease-in-out_infinite]",
                  isAnonymous && "brightness-0 opacity-50"
                )}
              />
            </div>
            <span className="text-2xl tracking-tighter">
              <span className={cn("font-black", isAnonymous ? "text-slate-700" : "text-white")}>Grad</span>
              <span className={cn("font-black", isAnonymous ? "text-slate-500" : "text-[#FFD700]")}>Edge</span>
            </span>
          </div>
          
          <nav className="mt-8 px-6 space-y-6">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-4 px-5 py-4 transition-all duration-300 group font-medium border-l-4 rounded-r-2xl rounded-l-none',
                    isActive
                      ? isAnonymous
                        ? 'bg-slate-200 text-slate-800 border-slate-800'
                        : 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]'
                      : isAnonymous 
                        ? 'border-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-800 hover:border-slate-800'
                        : 'border-transparent text-white/70 hover:bg-white/5 hover:text-[#FFD700] hover:border-[#FFD700]'
                  )
                }
              >
                <item.icon className="h-6 w-6" strokeWidth={1.5} />
                <span className="text-lg">{item.label}</span>
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
          "sticky top-0 z-40 px-8 py-4 border-b backdrop-blur-md flex items-center justify-between transition-colors duration-500",
          isAnonymous 
            ? "bg-slate-50/80 border-slate-200" 
            : "bg-white/80 border-gray-100"
        )}>
          <div className="flex items-center md:hidden">
              <div id="brand-entrance" className="w-8 h-8 flex items-center justify-center mr-2">
                <img 
                  src="/Gemini_Generated_Image_k7d8mfk7d8mfk7d8.png" 
                  alt="GradEdge Logo" 
                  className={cn(
                    "w-full h-full max-w-[32px] object-contain animate-[prestige-pulse_4s_ease-in-out_infinite]",
                    isAnonymous && "brightness-0 opacity-50"
                  )}
                />
              </div>
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

          <div className="flex items-center gap-6 relative">
            {/* Notifications Container */}
            <div className="relative" ref={dropdownRef}>
              {/* Notification Bell */}
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-[#002147] hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] focus:outline-none"
              >
                <Bell className="h-6 w-6" strokeWidth={1.5} />
                {/* Ping Indicator */}
                <span className="absolute top-1 right-2 h-2.5 w-2.5 bg-[#FFD700] rounded-full border-2 border-white"></span>
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute top-12 right-0 w-80 bg-white/95 backdrop-blur-md border border-slate-200 rounded-3xl shadow-xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="absolute -top-2 right-3 w-4 h-4 bg-white/95 border-l border-t border-slate-200 transform rotate-45"></div>
                  <div className="relative z-10 bg-white/95 rounded-3xl overflow-hidden">
                    <div className="p-4 border-b border-[#002147]/5 flex items-center justify-between">
                      <h3 className="font-black text-[#002147] uppercase tracking-widest text-xs">Notifications</h3>
                      <button className="text-[#FFD700] hover:text-[#FFC000] text-[10px] font-black uppercase tracking-widest transition-colors">
                        View All
                      </button>
                    </div>
                    <div className="divide-y divide-[#002147]/5 max-h-96 overflow-y-auto">
                      <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <p className="text-sm font-medium text-[#002147]">
                          Someone replied to your anonymous post in <span className="font-black text-[#FFD700]">BSCS</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-2">2m ago</p>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <p className="text-sm font-medium text-[#002147]">
                          New resource added to <span className="font-black text-[#FFD700]">Physics</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-2">1h ago</p>
                      </div>
                      <div className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                        <p className="text-sm font-medium text-[#002147]">
                          Dr. Turing released grades for <span className="font-black text-[#FFD700]">CS301</span>
                        </p>
                        <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-2">3h ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Avatar 
                name="Janet Doe" 
                isAnonymous={false} 
                className="border-[#FFD700]/20"
            />
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-8">
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
