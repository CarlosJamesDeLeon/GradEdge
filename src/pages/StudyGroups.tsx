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
          <h1 className="text-3xl font-playfair font-black text-[#F0EDE6] mb-2 uppercase tracking-tight">Study Hubs</h1>
          <p className="text-[#F0EDE6]/60 font-medium">Collaborate, share notes, and join virtual sessions.</p>
        </div>
        <button className="bg-[#C5A059] hover:bg-[#e6bb6d] text-[#000c1a] px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all shadow-xl active:scale-95 whitespace-nowrap">
          <PlusCircle className="h-5 w-5" />
          <span>Create Hub</span>
        </button>
      </header>

      {/* Search Bar */}
      <div className="relative mb-8 z-10">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-[#C5A059]/40" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by course code or name..."
          className="block w-full pl-11 pr-4 py-4 bg-[#001225] border border-[#C5A059]/10 rounded-2xl text-[#F0EDE6] placeholder-[#F0EDE6]/20 focus:outline-none focus:border-[#C5A059]/30 transition-all shadow-sm text-lg font-bold"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_HUBS.map(hub => (
          <div key={hub.id} className="bg-[#001225] border border-[#C5A059]/15 rounded-2xl p-6 hover:border-[#C5A059]/30 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="px-3 py-1 bg-[#000c1a] text-[#C5A059] font-black rounded-lg text-xs border border-[#C5A059]/10 uppercase tracking-widest">
                {hub.course}
              </div>
              <div className="flex space-x-2">
                {hub.activeSessions > 0 && (
                  <div className="flex items-center space-x-1 text-xs font-semibold text-[#10b981] bg-[#10b981]/10 px-2 py-1 rounded-md border border-[#10b981]/20">
                    <Video className="h-3 w-3" />
                    <span>Live</span>
                  </div>
                )}
              </div>
            </div>

            <h3 className="text-xl font-playfair font-black text-[#F0EDE6] mb-6 pr-4 relative z-10 line-clamp-2 min-h-[56px]">{hub.name}</h3>
            
            <div className="flex items-center justify-between text-[#F0EDE6]/40 text-xs font-black uppercase tracking-widest pt-4 border-t border-[#C5A059]/10 relative z-10">
              <div className="flex items-center space-x-1.5 text-[#C5A059]">
                <Users className="h-4 w-4" />
                <span>{hub.members}</span>
              </div>
              
              <div className="flex items-center space-x-4">
                {hub.newFiles > 0 && (
                  <div className="flex items-center space-x-1 text-[#FFD700]">
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
