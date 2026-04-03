import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { ShoppingBag, LogOut, BookOpen, GraduationCap, Bell, PanelLeftClose, PanelLeftOpen, Star, Hash } from 'lucide-react';
import Avatar from './Avatar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ isAuthenticated, onLogout }) => {
  const isAnonymous = false;
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

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
    return <Navigate to="/" replace />;
  }

  const navItems = [
    { to: '/feed', icon: BookOpen, label: 'Academic Feed' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Campus Marketplace' },
    { to: '/mentorship', icon: GraduationCap, label: 'Mentorship Bridge' },
    { to: '/professor-ratings', icon: Star, label: 'Professor Ratings' },
    { to: '/study-groups', icon: Hash, label: 'Study Hubs' },
  ];

  return (
    <div className={cn(
      "flex h-screen overflow-hidden relative transition-colors duration-500 bg-[#000c1a] text-[#F0EDE6]"
    )}>
      {/* Sidebar navigation */}
      <aside className={cn(
        "flex-shrink-0 border-r transition-[width] duration-300 ease-in-out flex flex-col justify-between hidden md:flex z-20 overflow-hidden",
        isCollapsed ? "w-[54px]" : "w-72",
        isAnonymous ? 'bg-slate-100' : 'bg-[#002147]',
        isAnonymous ? "border-slate-200" : "border-[#002147]/10"
      )}>
        <div>
          {/* Header: always a horizontal row — no flex-direction change */}
          <div className="flex items-center h-[60px] px-3 overflow-hidden">
            {/* Logo – width collapses to 0, never changes flex direction */}
            <div
              className={cn(
                "flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out flex items-center",
                isCollapsed ? "w-0 opacity-0" : "w-9 opacity-100 mr-2"
              )}
            >
              <img
                src="/Gemini_Generated_Image_k7d8mfk7d8mfk7d8.png"
                alt="GradEdge Logo"
                className={cn(
                  "w-9 h-9 object-contain flex-shrink-0 animate-[prestige-pulse_4s_ease-in-out_infinite]",
                  isAnonymous && "brightness-0 opacity-50"
                )}
              />
            </div>

            {/* Brand text */}
            <span
              className={cn(
                "text-2xl tracking-tighter whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[160px]"
              )}
            >
              <span className={cn("font-black", isAnonymous ? "text-slate-700" : "text-white")}>Grad</span>
              <span className={cn("font-black", isAnonymous ? "text-slate-500" : "text-[#FFD700]")}>Edge</span>
            </span>

            {/* Toggle – stable ml-auto keeps it pinned to the right always */}
            <button
              onClick={toggleSidebar}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "ml-auto flex-shrink-0 p-1.5 rounded-lg transition-all duration-200",
                "hover:bg-white/10 hover:text-[#FFD700] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/50",
                isAnonymous
                  ? "text-slate-500 hover:bg-slate-200 hover:text-slate-800"
                  : "text-white/60"
              )}
            >
              {isCollapsed
                ? <PanelLeftOpen className="h-5 w-5" />
                : <PanelLeftClose className="h-5 w-5" />}
            </button>
          </div>

          <nav className="mt-6 space-y-1 px-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 py-3 px-3 rounded-xl font-medium border-l-4 transition-all duration-200 group overflow-hidden",
                    isActive
                      ? isAnonymous
                        ? 'bg-slate-200 text-slate-800 border-slate-800'
                        : 'bg-[#FFD700]/10 text-[#FFD700] border-[#FFD700]'
                      : isAnonymous
                        ? 'border-transparent text-slate-500 hover:bg-slate-200 hover:text-slate-800 hover:border-slate-800'
                        : 'border-transparent text-white/60 hover:bg-white/5 hover:text-[#FFD700] hover:border-[#FFD700]'
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" strokeWidth={1.5} />
                <span
                  className={cn(
                    "text-base whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                    isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
                  )}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-2 pb-5">
          <button
            onClick={onLogout}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-3 rounded-xl font-medium overflow-hidden transition-all duration-200",
              isAnonymous
                ? "text-slate-400 hover:bg-red-50 hover:text-red-500"
                : "text-white/50 hover:bg-white/5 hover:text-red-400"
            )}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            <span
              className={cn(
                "whitespace-nowrap overflow-hidden transition-all duration-300 ease-in-out",
                isCollapsed ? "opacity-0 max-w-0" : "opacity-100 max-w-[200px]"
              )}
            >
              Sign Out
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col h-full relative overflow-hidden">
        {/* Header */}
        <header className={cn(
          "sticky top-0 z-40 px-8 py-4 border-b backdrop-blur-md flex items-center justify-between transition-colors duration-500 flex-shrink-0",
          "bg-[#000c1a]/85 border-white/5"
        )}>
          <div className="flex items-center">
            <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C5A059]">
              Student Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-6 relative">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-[#F0EDE6] hover:scale-110 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(255,215,0,0.6)] focus:outline-none"
              >
                <Bell className="h-6 w-6" strokeWidth={1.5} />
                <span className="absolute top-1 right-2 h-2.5 w-2.5 bg-[#FFD700] rounded-full border-2 border-[#000c1a]"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-12 right-0 w-80 bg-[#001225]/95 backdrop-blur-md border border-white/5 rounded-3xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="absolute -top-2 right-3 w-4 h-4 bg-[#001225]/95 border-l border-t border-white/5 transform rotate-45"></div>
                  <div className="relative z-10 bg-[#001225]/95 rounded-3xl overflow-hidden">
                    <div className="p-4 border-b border-white/5 flex items-center justify-between">
                      <h3 className="font-black text-[#FFD700] uppercase tracking-widest text-xs">Notifications</h3>
                    </div>
                    <div className="divide-y divide-white/5 max-h-96 overflow-y-auto font-dm-sans">
                      <div className="p-4 hover:bg-white/5 transition-colors cursor-pointer group">
                        <p className="text-sm font-medium text-[#F0EDE6]">
                          Someone replied to your anonymous post in <span className="font-black text-[#FFD700]">BSCS</span>
                        </p>
                        <p className="text-[10px] text-[#F0EDE6]/40 font-bold tracking-widest uppercase mt-2">2m ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <NavLink to="/profile" className="focus:outline-none transition-transform hover:scale-105 active:scale-95">
              <Avatar
                name="Janet Doe"
                isAnonymous={false}
                className="border-[#FFD700]/20"
              />
            </NavLink>
          </div>
        </header>

        {/* Scrollable Main Section */}
        <main className="flex-1 overflow-y-auto overflow-x-auto bg-[#000c1a]">
          <div className="max-w-7xl mx-auto p-8 min-w-fit">
            <Outlet context={{ isAnonymous }} />
          </div>
        </main>
      </div>

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