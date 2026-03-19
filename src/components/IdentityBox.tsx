import React, { useState } from 'react';
import { Paperclip, Hash, Send, Shield, ShieldOff, Sparkles } from 'lucide-react';
import { cn } from './Layout';
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
      "w-full bg-white rounded-[2rem] border-2 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-xl",
      isAnonymous 
        ? "border-[#002147]/30 bg-gradient-to-br from-white to-[#002147]/5 shadow-[0_0_25px_rgba(0,33,71,0.15)]" 
        : "border-gray-100 bg-white"
    )}>
      {/* Header Info */}
      <div className="p-6 flex items-center justify-between border-b border-gray-50">
        <div className="flex items-center space-x-4">
          <Avatar 
            name={userName} 
            isAnonymous={isAnonymous} 
            size="md"
            className="ring-2 ring-offset-2 transition-all duration-500 ring-transparent group-hover:ring-[#FFD700]"
          />
          <div>
            <h3 className={cn(
              "font-black text-sm transition-colors duration-300",
              isAnonymous ? "text-[#002147]" : "text-[#002147]"
            )}>
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
              ? "bg-[#002147] border-[#002147] text-white" 
              : "bg-white border-gray-100 text-[#002147]/40 hover:border-[#FFD700]/20 hover:text-[#FFD700]"
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
          className={cn(
            "w-full h-32 bg-transparent border-none focus:ring-0 text-[#002147] font-medium placeholder-[#002147]/30 resize-none transition-all duration-500",
            isAnonymous ? "placeholder-[#002147]/40" : "placeholder-gray-400"
          )}
        />
      </div>

      {/* Actions & Post Button */}
      <div className="px-6 py-4 bg-gray-50/50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button className="p-3 rounded-xl hover:bg-white text-[#002147]/40 hover:text-[#002147] transition-all">
            <Paperclip className="h-5 w-5" />
          </button>
          <button className="p-3 rounded-xl hover:bg-white text-[#002147]/40 hover:text-[#002147] transition-all">
            <Hash className="h-5 w-5" />
          </button>
        </div>

        <button
          onClick={handlePost}
          disabled={!content.trim()}
          className={cn(
            "px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center space-x-2 shadow-lg disabled:opacity-50 disabled:grayscale active:scale-95",
            isAnonymous 
              ? "bg-[#002147] text-white shadow-[#002147]/10" 
              : "bg-[#FFD700] text-[#002147] shadow-[#FFD700]/20"
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
