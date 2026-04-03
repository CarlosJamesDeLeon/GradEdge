import React, { useState } from 'react';
import { Paperclip, Hash, Send, Shield, ShieldOff, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from './Avatar';

interface IdentityBoxProps {
  userName?: string;
  initialAnonymous?: boolean;
  onPost?: (content: string, isAnonymous: boolean) => void;
}

const IdentityBox: React.FC<IdentityBoxProps> = ({ 
  userName = "Janet Doe", 
  initialAnonymous = false,
  onPost 
}) => {
  const [isAnonymous, setIsAnonymous] = useState(initialAnonymous);
  const [content, setContent] = useState('');

  const handlePost = () => {
    if (content.trim() && onPost) {
      onPost(content, isAnonymous);
      setContent('');
    }
  };

  return (
    <div className={cn(
      "w-full bg-[#001225] rounded-[2rem] border-2 transition-all duration-500 overflow-hidden shadow-2xl",
      isAnonymous 
        ? "border-[#C5A059]/30 shadow-[0_0_25px_rgba(197,160,89,0.1)]" 
        : "border-[#C5A059]/15"
    )}>
      {/* Header Info */}
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center space-x-4">
          <Avatar 
            name={userName} 
            isAnonymous={isAnonymous} 
            size="md"
            className="ring-2 ring-offset-2 ring-offset-[#000c1a] transition-all duration-500 ring-transparent group-hover:ring-[#C5A059]"
          />
          <div>
            <h3 className="font-playfair font-black text-sm transition-colors duration-300 text-[#F0EDE6]">
              {isAnonymous ? "Anonymous Student" : userName}
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
              {isAnonymous ? (
                <>
                  <Shield className="h-3 w-3 mr-1 text-[#002147]/40" />
                  Safe Haven Active
                </>
              ) : (
                <>
                  <Sparkles className="h-3 w-3 mr-1 text-[#FFD700]" />
                  Verified Identity
                </>
              )}
            </p>
          </div>
        </div>

        {/* Identity Toggle Switch */}
        <button
          onClick={() => setIsAnonymous(!isAnonymous)}
          className={cn(
            "flex items-center space-x-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 border-2 active:scale-95",
            isAnonymous 
              ? "bg-[#C5A059]/10 border-[#C5A059] text-[#C5A059] shadow-sm" 
              : "bg-transparent border-[#C5A059]/20 text-[#F0EDE6]/40 hover:border-[#C5A059] hover:text-[#C5A059]"
          )}
        >
          {isAnonymous ? <ShieldOff className="h-3 w-3" /> : <Shield className="h-3 w-3" />}
          <span>{isAnonymous ? "Go Public" : "Post Anonymously"}</span>
        </button>
      </div>

      {/* Input Area */}
      <div className="p-6">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={isAnonymous ? "Ask an sensitive question or share a protected resource..." : "Share your academic insights with your peers..."}
          className="w-full h-32 bg-transparent border-none focus:ring-0 text-[#F0EDE6] font-medium placeholder-[#F0EDE6]/20 resize-none transition-all duration-500"
        />
      </div>

      {/* Actions & Post Button */}
      <div className="px-6 py-4 bg-[#000c1a]/50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-3 rounded-xl hover:bg-white/5 text-[#F0EDE6]/20 hover:text-[#C5A059] transition-all">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white/5 text-[#F0EDE6]/20 hover:text-[#C5A059] transition-all">
            <Hash className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={!content.trim()}
          className={cn(
            "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-2 shadow-2xl disabled:opacity-50 disabled:grayscale active:scale-95",
            isAnonymous 
              ? "bg-[#000c1a] text-[#C5A059] border border-[#C5A059]/30" 
              : "bg-[#C5A059] text-[#000c1a]"
          )}
        >
          <span>Share to Feed</span>
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default IdentityBox;
