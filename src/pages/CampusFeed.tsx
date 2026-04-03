import React, { useState } from 'react';
import { Share2, MessageSquare, ShieldCheck, Star, Briefcase, ChevronDown, Sparkles } from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Avatar from '../components/Avatar';
import IdentityBox from '../components/IdentityBox';
import ThreadedComments from '../components/ThreadedComments';
import MyReminders from '../components/MyReminders';

const COURSES_DATA = [
  {
    id: 'BSCS',
    name: 'BS Computer Science',
    description: 'Master the art of coding, algorithms, and system architecture.',
    years: [
      {
        level: '1st Year',
        subjects: [
          { id: 'cs101', name: 'Intro to Programming', chatID: 'CS101_Intro_Programming' },
          { id: 'cs102', name: 'Discrete Math', chatID: 'CS102_Discrete_Math' },
        ]
      },
      {
        level: '2nd Year',
        subjects: [
          { id: 'cs201', name: 'Data Structures', chatID: 'CS201_Data_Structures' },
          { id: 'cs202', name: 'Computer Architecture', chatID: 'CS202_Architecture' },
        ]
      },
      {
        level: '3rd Year',
        subjects: [
          { id: 'cs301', name: 'Operating Systems', chatID: 'CS301_OS' },
          { id: 'cs302', name: 'Database Systems', chatID: 'CS302_DB' },
        ]
      },
      {
        level: '4th Year',
        subjects: [
          { id: 'cs401', name: 'Software Engineering', chatID: 'CS401_SoftEng' },
          { id: 'cs402', name: 'AI & Machine Learning', chatID: 'CS402_AI_ML' },
        ]
      }
    ]
  },
  {
    id: 'BSIT',
    name: 'BS Information Technology',
    description: 'Focus on networking, cybersecurity, and web technologies.',
    years: [
      {
        level: '1st Year',
        subjects: [
          { id: 'it101', name: 'IT Fundamentals', chatID: 'IT101_Fundamentals' },
          { id: 'it102', name: 'Web Dev 1', chatID: 'IT102_Web1' },
        ]
      }
    ]
  }
];

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
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [showSubjectDiscovery, setShowSubjectDiscovery] = useState(false);
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [expandedPostId, setExpandedPostId] = useState<number | null>(null);
  const [threads, setThreads] = useState(MOCK_THREADS);

  const incrementCommentCount = (postId: number) => {
    setThreads(prev => prev.map(t => 
      t.id === postId ? { ...t, comments: t.comments + 1 } : t
    ));
  };

  const currentCourseData = COURSES_DATA.find(c => c.id === selectedCourse);

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

          {/* Specificity Layer: Sub-Navigation Row */}
          <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex gap-4">
              <div className="relative group">
                <select
                  value={selectedCourse}
                  onChange={(e) => {
                    setSelectedCourse(e.target.value);
                    setShowSubjectDiscovery(false);
                    setExpandedYear(null);
                  }}
                  className="appearance-none bg-[#001225] border-2 border-[#C5A059]/20 text-[#F0EDE6] px-6 py-3 pr-12 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 transition-all cursor-pointer"
                >
                  <option value="">Select Course</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSCE">BSCE</option>
                  <option value="BSME">BSME</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C5A059] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
              </div>

              <div className="relative group">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-[#001225] border-2 border-[#C5A059]/20 text-[#F0EDE6] px-6 py-3 pr-12 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 transition-all cursor-pointer"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="All Years">All Years</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#C5A059] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
              </div>
            </div>

            {/* Breadcrumb indicator */}
            {(selectedCourse || selectedYear) && (
              <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-widest animate-in fade-in slide-in-from-left-4">
                {selectedCourse && (
                  <span className={cn(
                    "px-3 py-1 rounded-lg",
                    selectedCourse ? "bg-[#FFD700]/10 text-[#002147]" : "text-gray-400"
                  )}>{selectedCourse}</span>
                )}
                {selectedCourse && selectedYear && <span className="text-[#FFD700] mx-1">&gt;</span>}
                {selectedYear && (
                  <span className="text-[#FFD700]">{selectedYear}</span>
                )}
              </div>
            )}
          </div>
          
        </header>

        {/* Course Summary Card */}
        {selectedCourse && currentCourseData && (
          <div className="mb-10 bg-[#001225] border border-[#C5A059]/15 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-top-4 relative overflow-hidden group">
             {/* Decorative Background Element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#FFD700]/10 transition-colors" />
             
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFD700]">Selected Major</span>
                  </div>
                  <h2 className="text-3xl font-playfair font-black text-[#F0EDE6] mb-3">{currentCourseData.name}</h2>
                  <p className="text-[#F0EDE6]/60 font-bold text-sm leading-relaxed max-w-xl">
                    {currentCourseData.description}
                  </p>
               </div>
               
               <button 
                onClick={() => setShowSubjectDiscovery(!showSubjectDiscovery)}
                className="group relative px-8 py-4 bg-[#C5A059] text-[#000c1a] font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#C5A059]/10 whitespace-nowrap"
               >
                 <span className="relative z-10 transition-colors">Explore Subjects & Community</span>
                 {/* Hover Glow Effect */}
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.4)_0%,_transparent_70%)] blur-xl" />
               </button>
             </div>

             {/* Progressive Disclosure: Subjects */}
             {showSubjectDiscovery && (
               <div className="mt-10 pt-10 border-t border-[#C5A059]/10 space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-[#F0EDE6]/40">Curriculum & Subject Hubs</h3>
                    <div className="h-px flex-1 bg-[#C5A059]/10 mx-4" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {currentCourseData.years.map(year => (
                      <div key={year.level} className="bg-[#000c1a] rounded-2xl border border-[#C5A059]/10 hover:border-[#C5A059]/30 transition-all">
                        <div 
                          className="flex justify-between items-center cursor-pointer p-5"
                          onClick={() => setExpandedYear(expandedYear === year.level ? null : year.level)}
                        >
                          <h4 className="font-playfair font-black text-[#F0EDE6] uppercase tracking-tight text-sm">{year.level}</h4>
                          <ChevronDown className={cn("h-5 w-5 text-[#C5A059] transition-transform", expandedYear === year.level && "rotate-180")} />
                        </div>
                        
                        {expandedYear === year.level && (
                          <div className="px-5 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {year.subjects.map(subject => (
                              <div 
                                key={subject.id}
                                onClick={() => navigate(`/chat/${subject.chatID}`)}
                                className="bg-[#001225] p-4 rounded-xl border border-[#C5A059]/10 hover:border-[#C5A059] hover:shadow-2xl transition-all cursor-pointer flex justify-between items-center group/item"
                              >
                                <span className="font-bold text-[#F0EDE6] text-sm">{subject.name}</span>
                                <div className="p-2 rounded-lg bg-[#000c1a] group-hover/item:bg-[#C5A059]/10 transition-colors">
                                  <MessageSquare className="h-4 w-4 text-[#F0EDE6]/20 group-hover/item:text-[#C5A059] transition-colors" />
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>
        )}

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
