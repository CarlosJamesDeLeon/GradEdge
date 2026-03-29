import React, { useState } from 'react';
import { Users, Video, FileText, Search, PlusCircle } from 'lucide-react';

const MOCK_HUBS = [
  {
    id: 1,
    course: 'CS301',
    name: 'Data Structures & Algorithms',
    members: 142,
    activeSessions: 2,
    newFiles: 5
  },
  {
    id: 2,
    course: 'MAT204',
    name: 'Linear Algebra',
    members: 89,
    activeSessions: 0,
    newFiles: 1
  },
  {
    id: 3,
    course: 'ENG101',
    name: 'Intro to Literature',
    members: 215,
    activeSessions: 1,
    newFiles: 0
  }
];

const StudyGroups: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full pb-20 md:pb-0">
      <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between space-y-4 md:space-y-0 relative z-10">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Study Hubs</h1>
          <p className="text-textSecondary">Collaborate, share notes, and join virtual sessions.</p>
        </div>
        <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
          <PlusCircle className="h-5 w-5" />
          <span>Create Hub</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="relative mb-8 z-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-500" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by course code or name..."
          className="block w-full pl-11 pr-4 py-4 bg-surface border border-gray-800 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm text-lg"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_HUBS.map(hub => (
          <div key={hub.id} className="bg-surface border border-gray-800 rounded-2xl p-6 hover:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
            {/* Decorative gradient blur */}
            <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="px-3 py-1 bg-gray-800 text-primary font-bold rounded-lg text-sm border border-gray-700">
                {hub.course}
              </div>
              <div className="flex space-x-2">
                {hub.activeSessions > 0 && (
                  <div className="flex items-center space-x-1 text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-1 rounded-md">
                    <Video className="h-3 w-3" />
                    <span>Live</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-6 pr-4 relative z-10 line-clamp-2 min-h-[56px]">{hub.name}</h3>
            
            <div className="flex items-center justify-between text-textSecondary text-sm pt-4 border-t border-gray-800/50 relative z-10">
              <div className="flex items-center space-x-1.5">
                <Users className="h-4 w-4" />
                <span>{hub.members}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {hub.newFiles > 0 && (
                  <div className="flex items-center space-x-1 text-blue-400">
                    <FileText className="h-4 w-4" />
                    <span>{hub.newFiles} new</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyGroups;
