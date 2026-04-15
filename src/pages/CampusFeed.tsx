import React, { useState } from 'react';
import { Share2, MessageSquare, ShieldCheck, Star, Briefcase } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Avatar from '../components/Avatar';
import IdentityBox from '../components/IdentityBox';
import ThreadedComments from '../components/ThreadedComments';
import MyReminders from '../components/MyReminders';

const MOCK_THREADS = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    isAnonymous: false,
    major: 'Computer Science',
    time: '2 hours ago',
    subject: 'Data Structures (CS301)',
    content: 'Can someone explain the difference between a Red-Black tree and an AVL tree in terms of rotation complexity?',
    verifiedCount: 24,
    comments: 2,
    isVerifiedAnswer: true,
    tags: ['CS301', 'Trees']
  },
  {
    id: 2,
    author: 'Michael Chen',
    isAnonymous: true,
    major: 'Business Admin',
    time: '4 hours ago',
    subject: 'Principles of Marketing',
    content: 'What are the most effective KPIs for measuring social media organic growth in 2026 undergraduate study groups?',
    verifiedCount: 15,
    comments: 1,
    isVerifiedAnswer: false,
    tags: ['Marketing', 'KPIs']
  }
];

const CampusFeed: React.FC = () => {
  const { isAnonymous } = useOutletContext<{ isAnonymous: boolean }>();
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [threads, setThreads] = useState(MOCK_THREADS);

  const incrementCommentCount = (postId: number) => {
    setThreads(prev => prev.map(t => 
      t.id === postId ? { ...t, comments: t.comments + 1 } : t
    ));
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20 md:pb-0 w-full">
      <div className="lg:col-span-2">
        <header className="mb-10">
          <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-8 bg-[#FFD700] rounded-full" />
              <span className="text-[#FFD700] font-black uppercase tracking-widest text-xs">Academic Feed</span>
          </div>
          <h1 className="text-4xl font-playfair font-black text-[#F0EDE6] transition-colors">
            Subject Threads
          </h1>

        </header>

        {/* Identity-Aware Post Box */}
        <div className="mb-10">
          <IdentityBox 
            userName="Janet Doe" 
            initialAnonymous={isAnonymous}
            onPost={(content, anon) => console.log('Posting:', { content, anon })}
          />
        </div>

        {/* Feed Stream */}
        <div className="space-y-8">
          {threads.map((thread) => (
            <article key={thread.id} className={cn(
                "rounded-3xl p-8 border transition-all duration-500 group bg-[#001225]",
                thread.isVerifiedAnswer ? "border-[#FFD700] shadow-xl shadow-[#FFD700]/5" : "border-[#C5A059]/15 shadow-sm"
            )}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-4">
                  <Avatar 
                    name={thread.author} 
                    isAnonymous={thread.isAnonymous} 
                    size="lg"
                  />
                  <div>
                    <h3 className="font-bold text-[#F0EDE6] text-lg">
                        {thread.isAnonymous ? "Anonymous Member" : thread.author}
                    </h3>
                    <div className="flex items-center text-sm font-semibold text-gray-400 space-x-3 mt-1 uppercase tracking-wider">
                      <span>{thread.isAnonymous ? "Safe Haven Poster" : thread.subject}</span>
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
              
              <p className="text-[#F0EDE6]/80 text-xl font-medium mb-8 leading-relaxed">
                {thread.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {thread.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 text-xs font-black rounded-full uppercase tracking-tighter bg-[#000c1a] text-[#C5A059] border border-[#C5A059]/10">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-8 pt-6 border-t border-[#C5A059]/10">
                <button className={cn(
                    "flex items-center space-x-2 transition-colors font-bold",
                    thread.verifiedCount > 20 ? "text-[#FFD700]" : "text-gray-400 hover:text-[#FFD700]"
                )}>
                  <ShieldCheck className={cn("h-6 w-6", thread.verifiedCount > 20 && "fill-current")} />
                  <span>{thread.verifiedCount} Verified Accuracy</span>
                </button>
                <button 
                  onClick={() => setExpandedPostId(expandedPostId === thread.id ? null : thread.id)}
                  className={cn(
                    "flex items-center space-x-2 transition-colors font-bold",
                    expandedPostId === thread.id ? "text-[#C5A059]" : "text-white/40 hover:text-[#C5A059]"
                  )}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>{thread.comments === 0 ? "Add Comment" : thread.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-[#F0EDE6]/20 hover:text-[#C5A059] transition-colors font-bold">
                  <Share2 className="h-6 w-6" />
                </button>
              </div>

              {/* Threaded Discussion Dropdown */}
              {expandedPostId === thread.id && (
                <ThreadedComments postId={thread.id} onCommentAdded={() => incrementCommentCount(thread.id)} />
              )}
            </article>
          ))}
        </div>
      </div>

      {/* Right Sidebar Widgets */}
      <div className="lg:col-span-1 space-y-8">
          <MyReminders />

          {/* Mentorship Bridge Preview */}
          <div className="rounded-3xl p-8 border border-[#C5A059]/15 transition-all duration-500 bg-[#001225]">
              <div className="flex items-center space-x-2 mb-6 text-[#C5A059]">
                  <Briefcase className="h-6 w-6" />
                  <h3 className="font-playfair font-black uppercase tracking-widest text-sm text-[#F0EDE6]">Career Bridge</h3>
              </div>
              <p className="text-sm font-semibold text-[#F0EDE6]/60 mb-6">3 Alumni from your major are online and ready to review resumes.</p>
              <div className="flex -space-x-3 mb-8">
                  {[1,2,3].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-4 border-[#001225] bg-[#000c1a] overflow-hidden" />
                  ))}
                  <div className="h-10 w-10 rounded-full border-4 border-[#001225] bg-[#C5A059] flex items-center justify-center text-[10px] font-black text-[#000c1a]">
                      +12
                  </div>
              </div>
              <button className="w-full py-4 border-2 border-[#C5A059]/20 rounded-2xl font-black text-xs uppercase tracking-widest text-[#C5A059] hover:bg-[#C5A059] hover:text-[#000c1a] transition-all">
                  Join Bridge
              </button>
          </div>
      </div>
    </div>
  );
};

export default CampusFeed;
