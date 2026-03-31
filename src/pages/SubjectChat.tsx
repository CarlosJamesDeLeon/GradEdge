import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Users, Info } from 'lucide-react';
import { cn } from '../components/Layout';

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
    <div className="flex flex-col h-[calc(100vh-140px)] bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Chat Header */}
      <header className="px-6 py-4 border-b border-gray-50 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-[#002147]"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h2 className="font-black text-[#002147] text-lg uppercase tracking-tight">{subjectName}</h2>
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <span className="flex items-center space-x-1">
                <Users className="h-3 w-3" />
                <span>142 Members</span>
              </span>
              <span>•</span>
              <span className="text-green-500">12 Online</span>
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
          <Info className="h-5 w-5" />
        </button>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {MOCK_MESSAGES.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col max-w-[70%]",
              msg.isSelf ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            {!msg.isSelf && <span className="text-xs font-black text-[#002147]/40 mb-1 ml-1 uppercase tracking-widest">{msg.sender}</span>}
            <div className={cn(
              "px-4 py-3 rounded-2xl text-sm font-medium shadow-sm",
              msg.isSelf
                ? "bg-[#002147] text-white rounded-tr-none"
                : "bg-white border border-gray-100 text-[#002147] rounded-tl-none"
            )}>
              {msg.content}
            </div>
            <span className="text-[10px] font-bold text-gray-400 mt-1 mx-1 uppercase tracking-widest">{msg.time}</span>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <footer className="p-4 bg-white border-t border-gray-50">
        <div className="flex items-center space-x-3 bg-slate-100 rounded-2xl px-4 py-2 border-2 border-transparent focus-within:border-[#FFD700] transition-all">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:outline-none text-[#002147] font-medium placeholder-gray-400 py-2"
          />
          <button className="p-2 bg-[#002147] text-[#FFD700] rounded-xl hover:scale-105 transition-all shadow-lg shadow-[#002147]/10">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SubjectChat;
