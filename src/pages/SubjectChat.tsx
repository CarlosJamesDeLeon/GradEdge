import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Users, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

const SubjectChat: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>();
  const navigate = useNavigate();

  // In a real app, you'd fetch subject details and chat history based on subjectId
  const subjectName = subjectId?.replace(/_/g, ' ') || 'Subject Chat';

  const MOCK_MESSAGES = [
    { id: 1, sender: 'Alice', content: 'Has anyone started the assignment?', time: '10:05 AM', isSelf: false },
    { id: 2, sender: 'Bob', content: 'Yeah, just finished part 1. It was tricky!', time: '10:12 AM', isSelf: false },
    { id: 3, sender: 'Me', content: 'Unsaon diay? Pwede mo tan.aw for reference?', time: '10:15 AM', isSelf: true },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] bg-[#001225] rounded-3xl border border-[#C5A059]/15 shadow-2xl overflow-hidden">
      {/* Chat Header */}
      <header className="px-6 py-4 border-b border-[#C5A059]/10 flex items-center justify-between bg-[#000c1a]/85 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-[#001225] rounded-full transition-colors text-[#C5A059]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="font-playfair font-black text-[#F0EDE6] text-lg uppercase tracking-tight">{subjectName}</h2>
            <div className="flex items-center space-x-2 text-xs font-bold text-[#F0EDE6]/40 uppercase tracking-widest">
              <span className="flex items-center space-x-1">
                <Users className="h-3 w-3 text-[#C5A059]" />
                <span>142 Members</span>
              </span>
              <span>•</span>
              <span className="text-[#C5A059]">12 Online</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-[#001225] rounded-full transition-colors text-[#F0EDE6]/40">
          <Info className="h-5 w-5" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#000c1a]/30">
        {MOCK_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[70%]",
              msg.isSelf ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            {!msg.isSelf && <span className="text-xs font-black text-[#C5A059] mb-1 ml-1 uppercase tracking-widest">{msg.sender}</span>}
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm font-medium shadow-xl",
              msg.isSelf
                ? "bg-[#C5A059] text-[#000c1a] rounded-tr-none"
                : "bg-[#000c1a] border border-[#C5A059]/10 text-[#F0EDE6] rounded-tl-none"
            )}>
              {msg.content}
            </div>
            <span className="text-[10px] font-bold text-gray-400 mt-1 mx-1 uppercase tracking-widest">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-[#001225] border-t border-[#C5A059]/10">
        <div className="flex items-center space-x-3 bg-[#000c1a] rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[#C5A059]/30 transition-all font-bold">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[#F0EDE6] font-medium placeholder-[#F0EDE6]/20 py-2"
          />
          <button className="p-2 bg-[#C5A059] text-[#000c1a] rounded-xl hover:scale-105 transition-all shadow-xl">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SubjectChat;
