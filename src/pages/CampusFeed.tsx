import React, { useState } from 'react';
import { Share2, MessageSquare, Heart, Image as ImageIcon, Send } from 'lucide-react';
import { cn } from '../components/Layout';

type FeedTab = 'global' | 'major' | 'course';

const MOCK_POSTS = [
  {
    id: 1,
    author: 'Sarah Jenkins',
    major: 'Computer Science',
    time: '2 hours ago',
    content: 'Does anyone have studying material or past midterms for CS301? The professor\'s lectures are impossible to follow. 😭',
    likes: 42,
    comments: 12,
    tags: ['CS301', 'Help']
  },
  {
    id: 2,
    author: 'Michael Chen',
    major: 'Business Admin',
    time: '4 hours ago',
    content: 'Just finished my thesis defense. For everyone stressing right now, it gets better! Keep pushing! 🎉🎓',
    likes: 128,
    comments: 34,
    tags: ['Senior', 'Motivation']
  }
];

const CampusFeed: React.FC = () => {
  const [activeTab, setActiveTab] = useState<FeedTab>('global');
  const [postContent, setPostContent] = useState('');

  const tabs: { id: FeedTab; label: string }[] = [
    { id: 'global', label: 'Global Campus' },
    { id: 'major', label: 'My Major' },
    { id: 'course', label: 'My Courses' },
  ];

  return (
    <div className="w-full flex justify-center pb-20 md:pb-0">
      <div className="w-full max-w-2xl">
        <header className="mb-6 lg:mb-8 sticky top-0 bg-background/80 backdrop-blur-xl z-20 py-4 border-b border-gray-800 md:border-none md:static md:bg-transparent">
          <h1 className="text-3xl font-extrabold text-white hidden md:block mb-6">Campus Feed</h1>
          
          <div className="flex bg-surface p-1 rounded-xl border border-gray-800 shadow-sm">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 py-2.5 px-4 text-sm font-medium rounded-lg transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md'
                    : 'text-textSecondary hover:text-white hover:bg-gray-800'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </header>

        {/* Create Post */}
        <div className="bg-surface rounded-2xl p-4 md:p-5 border border-gray-800 shadow-sm mb-6">
          <div className="flex space-x-4">
            <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-tr from-primary to-blue-400 flex-shrink-0" />
            <div className="flex-1">
              <textarea
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="What's happening on campus?"
                className="w-full bg-transparent border-none text-white placeholder-gray-500 focus:ring-0 resize-none min-h-[80px] md:text-lg"
              />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800">
                <div className="flex space-x-2">
                  <button className="p-2 text-textSecondary hover:text-primary hover:bg-primary/10 rounded-full transition-colors">
                    <ImageIcon className="h-5 w-5" />
                  </button>
                </div>
                <button
                  disabled={!postContent.trim()}
                  className="bg-primary hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-primary text-white px-5 py-2 rounded-full font-medium flex items-center space-x-2 transition-all shadow-sm"
                >
                  <span>Post</span>
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feed Stream */}
        <div className="space-y-4 md:space-y-6">
          {MOCK_POSTS.map((post) => (
            <article key={post.id} className="bg-surface rounded-2xl p-5 border border-gray-800 hover:border-gray-700 transition-colors shadow-sm cursor-pointer group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-white group-hover:text-primary transition-colors">{post.author}</h3>
                    <div className="flex items-center text-xs text-textSecondary space-x-2 mt-0.5">
                      <span>{post.major}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-800 text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center space-x-6 text-textSecondary pt-2">
                <button className="flex items-center space-x-2 hover:text-red-400 transition-colors group/btn">
                  <Heart className="h-5 w-5 group-hover/btn:fill-current" />
                  <span className="text-sm">{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-sm">{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-primary transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampusFeed;
