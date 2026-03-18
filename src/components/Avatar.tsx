import React from 'react';
import { User } from 'lucide-react';
import { cn } from './Layout';

interface AvatarProps {
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isAnonymous?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ name, size = 'md', className, isAnonymous }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  };

  // Generate a consistent color based on the name
  const getInitials = (n?: string) => {
    if (!n) return null;
    return n.split(' ').map(p => p[0]).join('').toUpperCase().slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <div className={cn(
      "rounded-2xl flex items-center justify-center overflow-hidden transition-all duration-300 border-2 shrink-0",
      sizeClasses[size],
      isAnonymous 
        ? "bg-slate-300 border-white text-slate-500 shadow-inner" 
        : "bg-[#002147] border-[#FFD700]/20 text-[#FFD700] shadow-xl shadow-[#002147]/10",
      className
    )}>
      {isAnonymous ? (
        <User className={iconSizes[size]} />
      ) : initials ? (
        <span className={cn(
          "font-black tracking-tighter",
          size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : size === 'lg' ? 'text-base' : 'text-xl'
        )}>
          {initials}
        </span>
      ) : (
        <User className={iconSizes[size]} />
      )}
    </div>
  );
};

export default Avatar;
