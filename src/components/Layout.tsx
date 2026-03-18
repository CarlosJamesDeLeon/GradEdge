import React from 'react';
import { NavLink, Outlet, Navigate } from 'react-router-dom';
import { Home, Users, ShoppingBag, LogOut, BookOpen, GraduationCap } from 'lucide-react';
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
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  const navItems = [
    { to: '/feed', icon: Home, label: 'Campus Feed' },
    { to: '/groups', icon: Users, label: 'Study Groups' },
    { to: '/marketplace', icon: ShoppingBag, label: 'Marketplace' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden relative">
      {/* Sidebar navigation */}
      <aside className="w-64 flex-shrink-0 bg-surface border-r border-gray-800 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="p-6 flex items-center space-x-3 text-primary">
            <GraduationCap className="h-8 w-8" />
            <span className="text-2xl font-bold tracking-tight text-white">GradEdge</span>
          </div>
          
          <nav className="mt-8 px-4 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold shadow-sm'
                      : 'text-textSecondary hover:bg-gray-800 hover:text-textPrimary'
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={onLogout}
            className="flex w-full items-center space-x-3 px-4 py-3 rounded-xl text-textSecondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto w-full relative">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center p-4 bg-surface border-b border-gray-800 sticky top-0 z-10 w-full">
            <GraduationCap className="h-6 w-6 text-primary mr-2" />
            <span className="text-xl font-bold text-white">GradEdge</span>
        </div>
        <div className="max-w-5xl mx-auto p-4 md:p-8 relative">
          <Outlet />
        </div>
      </main>
      
      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface border-t border-gray-800 flex justify-around p-3 z-20">
        {navItems.map((item) => (
           <NavLink
           key={item.to}
           to={item.to}
           className={({ isActive }) =>
             cn(
               'flex flex-col items-center space-y-1 p-2 rounded-lg',
               isActive ? 'text-primary' : 'text-textSecondary'
             )
           }
         >
           <item.icon className="h-5 w-5" />
         </NavLink>
        ))}
        <button
          onClick={onLogout}
          className="flex flex-col items-center space-y-1 p-2 rounded-lg text-textSecondary hover:text-red-500"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </nav>
    </div>
  );
};

export default Layout;
