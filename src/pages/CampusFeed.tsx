import React, { useState } from 'react';
import { Share2, MessageSquare, Image as ImageIcon, Send, ShieldCheck, TrendingUp, Star, Users, Briefcase } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { cn } from '../components/Layout';

type SubjectTab = 'cs' | 'math' | 'physics';

const MOCK_THREADS = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    major: 'Computer Science',
    time: '2 hours ago',
    subject: 'Data Structures (CS301)',
    content: 'Can someone explain the difference between a Red-Black tree and an AVL tree in terms of rotation complexity?',
    verifiedCount: 24,
    comments: 8,
    isVerifiedAnswer: true,
    tags: ['CS301', 'Trees']
  },
  {
    id: 2,
    author: 'Michael Chen',
    major: 'Business Admin',
    time: '4 hours ago',
    subject: 'Principles of Marketing',
    content: 'What are the most effective KPIs for measuring social media organic growth in 2026 undergraduate study groups?',
    verifiedCount: 15,
    comments: 4,
    isVerifiedAnswer: false,
    tags: ['Marketing', 'KPIs']
  }
];

const CampusFeed: React.FC = () => {
  const { isAnonymous } = useOutletContext<{ isAnonymous: boolean }>();
  const [activeTab, setActiveTab] = useState<SubjectTab>('cs');
  const [postContent, setPostContent] = useState('');

  const subjects: { id: SubjectTab; label: string }[] = [
    { id: 'cs', label: 'Computer Science' },
    { id: 'math', label: 'Mathematics' },
    { id: 'physics', label: 'Physics' },
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-8 pb-20 md:pb-0">
      <div className="flex-1 max-w-3xl">
        <header className="mb-10">
          <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-8 bg-[#FFD700] rounded-full" />
              <span className="text-[#FFD700] font-black uppercase tracking-widest text-xs">Academic Feed</span>
          </div>
          <h1 className={cn(
            "text-4xl font-black transition-colors",
            isAnonymous ? "text-slate-700" : "text-[#002147]"
          )}>Subject Threads</h1>
          
          <div className="flex space-x-2 mt-8 overflow-x-auto pb-2 scrollbar-hide">
            {subjects.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveTab(sub.id)}
                className={cn(
                  'whitespace-nowrap py-3 px-6 text-sm font-bold rounded-2xl transition-all duration-300 border-2',
                  activeTab === sub.id
                    ? isAnonymous ? 'bg-slate-600 border-slate-600 text-white shadow-xl shadow-slate-200' : 'bg-[#002147] border-[#002147] text-white shadow-xl shadow-[#002147]/10'
                    : isAnonymous ? 'bg-slate-100 border-slate-200 text-slate-500 hover:border-slate-300' : 'bg-white border-gray-100 text-[#002147]/40 hover:border-gray-200 shadow-sm'
                )}
              >
                {sub.label}
              </button>
            ))}
          </div>
        </header>

        {/* Create Post */}
        <div className={cn(
            "rounded-3xl p-6 border transition-all duration-500 mb-10",
            isAnonymous ? "bg-slate-200/50 border-slate-200" : "bg-white border-gray-100 shadow-sm"
        )}>
          <div className="flex space-x-4">
            <div className={cn(
                "h-12 w-12 rounded-2xl flex-shrink-0 flex items-center justify-center transition-colors",
                isAnonymous ? "bg-slate-400" : "bg-[#002147]"
            )}>
                {isAnonymous ? <ShieldCheck className="text-white h-6 w-6" /> : <TrendingUp className="text-[#FFD700] h-6 w-6" />}
            </div>
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={isAnonymous ? "Post anonymously to the hub..." : "Share an academic insight or question..."}
                className="w-full bg-transparent border-none text-[#002147] placeholder-gray-400 focus:ring-0 resize-none min-h-[100px] text-lg font-medium"
              />
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button className="p-3 text-gray-400 hover:text-[#002147] hover:bg-gray-100 rounded-xl transition-all">
                    <ImageIcon className="h-5 w-5" />
                  </button>
                </div>
                <button
                  disabled={!postContent.trim()}
                  className={cn(
                    "px-8 py-3 rounded-2xl font-black flex items-center space-x-2 transition-all shadow-lg",
                    isAnonymous 
                        ? "bg-slate-600 text-white hover:bg-slate-700 disabled:bg-slate-300" 
                        : "bg-[#002147] text-white hover:bg-blue-900 disabled:bg-gray-200"
                  )}
                >
                  <span>Post Subject</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Stream */}
        <div className="space-y-8">
          {MOCK_THREADS.map((thread) => (
            <article key={thread.id} className={cn(
                "rounded-3xl p-8 border transition-all duration-500 group",
                thread.isVerifiedAnswer ? "border-[#FFD700] bg-white shadow-xl shadow-[#FFD700]/5" : isAnonymous ? "bg-slate-100/50 border-slate-200" : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
            )}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-4">
                  <div className={cn(
                    "h-12 w-12 rounded-2xl flex-shrink-0 transition-all",
                    isAnonymous ? "bg-slate-300" : "bg-gray-200"
                  )} />
                  <div>
                    <h3 className="font-bold text-[#002147] text-lg">
                        {isAnonymous ? "Anonymous Peer" : thread.author}
                    </h3>
                    <div className="flex items-center text-sm font-semibold text-gray-400 space-x-3 mt-1 uppercase tracking-wider">
                      <span>{thread.subject}</span>
                      <span>•</span>
                      <span>{thread.time}</span>
                    </div>
                  </div>
                </div>
                {thread.isVerifiedAnswer && (
                    <div className="bg-[#FFD700]/10 text-[#FFD700] p-2 rounded-xl border border-[#FFD700]/20 flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-current" />
                        <span className="text-xs font-black">TOP ACCURACY</span>
                    </div>
                )}
              </div>
              
              <p className="text-[#002147]/80 text-xl font-medium mb-8 leading-relaxed">
                {thread.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {thread.tags.map(tag => (
                  <span key={tag} className={cn(
                      "px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-tighter",
                      isAnonymous ? "bg-slate-200 text-slate-500" : "bg-gray-100 text-gray-500"
                  )}>
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-8 pt-6 border-t border-gray-50">
                <button className={cn(
                    "flex items-center space-x-2 transition-colors font-bold",
                    thread.verifiedCount > 20 ? "text-[#FFD700]" : "text-gray-400 hover:text-[#FFD700]"
                )}>
                  <ShieldCheck className={cn("h-6 w-6", thread.verifiedCount > 20 && "fill-current")} />
                  <span>{thread.verifiedCount} Verified Accuracy</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-[#002147] transition-colors font-bold">
                  <MessageSquare className="h-6 w-6" />
                  <span>{thread.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-[#002147] transition-colors font-bold">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Right Sidebar Widgets */}
      <div className="w-full lg:w-80 space-y-8">
          {/* Teacher Rating Widget */}
          <div className={cn(
              "rounded-3xl p-8 border transition-all duration-500",
              isAnonymous ? "bg-slate-200/50 border-slate-200" : "bg-[#002147] text-white shadow-2xl shadow-[#002147]/20"
          )}>
              <div className="flex items-center space-x-2 mb-6 text-[#FFD700]">
                  <Users className="h-6 w-6" />
                  <h3 className="font-black uppercase tracking-widest text-sm">Professor Sentiment</h3>
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm font-bold opacity-60 mb-1">Current Subject</p>
                  <p className="text-lg font-black">{activeTab === 'cs' ? 'Dr. Alan Turing' : activeTab === 'math' ? 'Dr. Katherine Johnson' : 'Dr. Richard Feynman'}</p>
              </div>
              <div className="space-y-6">
                  {[
                      { label: 'Clarity', val: '92%' },
                      { label: 'Fairness', val: '88%' },
                      { label: 'Response Time', val: 'Fast' }
                  ].map(stat => (
                      <div key={stat.label} className="flex justify-between items-center group">
                          <span className="font-bold opacity-60">{stat.label}</span>
                          <span className="font-black text-[#FFD700] group-hover:scale-110 transition-transform">{stat.val}</span>
                      </div>
                  ))}
              </div>
              <button className={cn(
                  "w-full mt-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all",
                  isAnonymous ? "bg-slate-400 text-white" : "bg-[#FFD700] text-[#002147] hover:bg-white hover:text-[#002147]"
              )}>
                  View Full Report
              </button>
          </div>

          {/* Mentorship Bridge Preview */}
          <div className={cn(
              "rounded-3xl p-8 border transition-all duration-500 bg-white",
              isAnonymous ? "border-slate-200" : "border-gray-100 shadow-sm"
          )}>
              <div className="flex items-center space-x-2 mb-6 text-[#002147]">
                  <Briefcase className="h-6 w-6" />
                  <h3 className="font-black uppercase tracking-widest text-sm">Career Bridge</h3>
              </div>
              <p className="text-sm font-semibold text-gray-500 mb-6">3 Alumni from your major are online and ready to review resumes.</p>
              <div className="flex -space-x-3 mb-8">
                  {[1,2,3].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-4 border-white bg-gray-200 overflow-hidden" />
                  ))}
                  <div className="h-10 w-10 rounded-full border-4 border-white bg-[#002147] flex items-center justify-center text-[10px] font-black text-white">
                      +12
                  </div>
              </div>
              <button className="w-full py-4 border-2 border-[#002147]/10 rounded-2xl font-black text-xs uppercase tracking-widest text-[#002147] hover:bg-[#002147] hover:text-white transition-all">
                  Join Bridge
              </button>
          </div>
      </div>
    </div>
  );
};

export default CampusFeed;
