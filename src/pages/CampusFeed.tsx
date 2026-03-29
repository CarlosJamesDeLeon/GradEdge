import React, { useState } from 'react';
import { Share2, MessageSquare, ShieldCheck, Star, Users, Briefcase, ChevronDown, Sparkles } from 'lucide-react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { cn } from '../components/Layout';
import Avatar from '../components/Avatar';
import IdentityBox from '../components/IdentityBox';
import ThreadedComments from '../components/ThreadedComments';

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
          <h1 className={cn(
            "text-4xl font-black transition-colors",
            isAnonymous ? "text-slate-700" : "text-[#002147]"
          )}>Subject Threads</h1>

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
                  className="appearance-none bg-white border-2 border-[#002147] text-[#002147] px-6 py-3 pr-12 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all cursor-pointer"
                >
                  <option value="">Select Course</option>
                  <option value="BSCS">BSCS</option>
                  <option value="BSIT">BSIT</option>
                  <option value="BSCE">BSCE</option>
                  <option value="BSME">BSME</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002147] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
              </div>

              <div className="relative group">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="appearance-none bg-white border-2 border-[#002147] text-[#002147] px-6 py-3 pr-12 rounded-2xl font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] transition-all cursor-pointer"
                >
                  <option value="">Select Year</option>
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="All Years">All Years</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#002147] pointer-events-none transition-transform group-hover:translate-y-[-40%]" />
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
          <div className="mb-10 bg-white border-2 border-[#002147] rounded-3xl p-8 shadow-2xl shadow-[#002147]/5 animate-in fade-in slide-in-from-top-4 relative overflow-hidden group">
             {/* Decorative Background Element */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-[#FFD700]/10 transition-colors" />
             
             <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
               <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Sparkles className="h-4 w-4 text-[#FFD700]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#FFD700]">Selected Major</span>
                  </div>
                  <h2 className="text-3xl font-black text-[#002147] mb-3">{currentCourseData.name}</h2>
                  <p className="text-[#002147]/60 font-bold text-sm leading-relaxed max-w-xl">
                    {currentCourseData.description}
                  </p>
               </div>
               
               <button 
                onClick={() => setShowSubjectDiscovery(!showSubjectDiscovery)}
                className="group relative px-8 py-4 bg-[#002147] text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-xl shadow-[#002147]/20 whitespace-nowrap"
               >
                 <div className="absolute inset-0 bg-[#FFD700] translate-y-full group-hover:translate-y-0 transition-transform duration-300 -z-0" />
                 <span className="relative z-10 group-hover:text-[#002147] transition-colors">Explore Subjects & Community</span>
                 {/* Hover Glow Effect */}
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(circle_at_center,_rgba(255,215,0,0.4)_0%,_transparent_70%)] blur-xl" />
               </button>
             </div>

             {/* Progressive Disclosure: Subjects */}
             {showSubjectDiscovery && (
               <div className="mt-10 pt-10 border-t-2 border-gray-50 space-y-6 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Curriculum & Subject Hubs</h3>
                    <div className="h-px flex-1 bg-gray-50 mx-4" />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                    {currentCourseData.years.map(year => (
                      <div key={year.level} className="bg-slate-50/50 rounded-2xl border border-gray-100 hover:border-[#FFD700]/30 transition-all">
                        <div 
                          className="flex justify-between items-center cursor-pointer p-5"
                          onClick={() => setExpandedYear(expandedYear === year.level ? null : year.level)}
                        >
                          <h4 className="font-black text-[#002147] uppercase tracking-tight text-sm">{year.level}</h4>
                          <ChevronDown className={cn("h-5 w-5 text-gray-400 transition-transform", expandedYear === year.level && "rotate-180")} />
                        </div>
                        
                        {expandedYear === year.level && (
                          <div className="px-5 pb-5 space-y-2 animate-in fade-in slide-in-from-top-2">
                            {year.subjects.map(subject => (
                              <div 
                                key={subject.id}
                                onClick={() => navigate(`/chat/${subject.chatID}`)}
                                className="bg-white p-4 rounded-xl border border-gray-100 hover:border-[#FFD700] hover:shadow-md transition-all cursor-pointer flex justify-between items-center group/item"
                              >
                                <span className="font-bold text-[#002147] text-sm">{subject.name}</span>
                                <div className="p-2 rounded-lg bg-slate-50 group-hover/item:bg-[#FFD700]/10 transition-colors">
                                  <MessageSquare className="h-4 w-4 text-gray-300 group-hover/item:text-[#FFD700] transition-colors" />
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
                "rounded-3xl p-8 border transition-all duration-500 group",
                thread.isVerifiedAnswer ? "border-[#FFD700] bg-white shadow-xl shadow-[#FFD700]/5" : isAnonymous ? "bg-slate-100/50 border-slate-200" : "bg-white border-gray-100 shadow-sm hover:border-gray-200"
            )}>
              <div className="flex justify-between items-start mb-6">
                <div className="flex space-x-4">
                  <Avatar 
                    name={thread.author} 
                    isAnonymous={thread.isAnonymous} 
                    size="lg"
                  />
                  <div>
                    <h3 className="font-bold text-[#002147] text-lg">
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
                <button 
                  onClick={() => setExpandedPostId(expandedPostId === thread.id ? null : thread.id)}
                  className={cn(
                    "flex items-center space-x-2 transition-colors font-bold",
                    expandedPostId === thread.id ? "text-[#002147]" : "text-gray-400 hover:text-[#002147]"
                  )}
                >
                  <MessageSquare className="h-6 w-6" />
                  <span>{thread.comments === 0 ? "Add Comment" : thread.comments}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-400 hover:text-[#002147] transition-colors font-bold">
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
          {/* Teacher Rating Widget */}
          <div className="rounded-3xl p-8 border border-white/10 transition-all duration-500 bg-[#002147] text-white shadow-2xl shadow-[#002147]/20">
              <div className="flex items-center space-x-2 mb-6 text-[#FFD700]">
                  <Users className="h-6 w-6" />
                  <h3 className="font-black uppercase tracking-widest text-sm">Professor Sentiment</h3>
              </div>
              <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-sm font-bold opacity-60 mb-1">Current Focus</p>
                  <p className="text-lg font-black">{selectedCourse || 'General Academic'}</p>
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
              <button className="w-full mt-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all bg-[#FFD700] text-[#002147] hover:bg-white hover:text-[#002147]">
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
