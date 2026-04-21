import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Hash, ChevronDown, Users, Circle, Globe, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '@/components/Avatar';

// ── Types ────────────────────────────────────────────────────────────────────
type Tab = 'general' | 'room' | 'dm';
interface Message {
  id: string;
  sender: string;
  isYou?: boolean;
  time: string;
  content: string;
}

interface Connection {
  name: string;
  status: 'online' | 'offline';
  role: string;
  unread: number;
}

interface Room {
  id: string;
  code: string;
  name: string;
  year: number;
  members: number;
  lastMessage: string;
}

interface DMConversation {
  id: string;
  name: string;
  status: 'online' | 'offline';
  lastMessage: string;
  time: string;
  unread: number;
}

// ── Mock Data ─────────────────────────────────────────────────────────────────

const GENERAL_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'Renz Etcuban',
    time: '10:42 AM',
    content: "Anyone have notes from yesterday's COMP301 lecture? I missed the last 20 minutes.",
  },
  {
    id: '2',
    sender: 'Felix Ponce',
    time: '10:45 AM',
    content: '@Renz got you — sharing to the COMP301 Year 3 room now. It covers the last two topics on recursion.',
  },
  {
    id: '3',
    sender: 'Aiko Lim',
    time: '10:47 AM',
    content: 'Reminder: Study group for midterms this Friday at 6pm in the library, Room 204. DM me to join the group chat!',
  },
  {
    id: '4',
    sender: 'Janet Doe',
    time: '10:48 AM',
    isYou: true,
    content: "Thanks Kyle! Aiko count me in for Friday — I really need this before midterms.",
  },
  {
    id: '5',
    sender: 'Rico Navarro',
    time: '10:57 AM',
    content: "Aiko I'll come too! Also posting my COMP301 summary notes to the Specific Room for Year 3 later today.",
  },
];

const ROOMS: Room[] = [
  { id: 'comp301-y3', code: 'COMP301', name: 'Data Structures & Algorithms', year: 3, members: 47, lastMessage: 'Kyle: sharing notes now...' },
  { id: 'math201-y2', code: 'MATH201', name: 'Calculus II', year: 2, members: 62, lastMessage: 'Prof posted practice set' },
  { id: 'hci401-y4', code: 'HCI401', name: 'Human-Computer Interaction', year: 4, members: 31, lastMessage: 'Wireframe review tomorrow' },
  { id: 'cs101-y1', code: 'CS101', name: 'Intro to Programming', year: 1, members: 89, lastMessage: 'Assignment 3 is posted!' },
  { id: 'arch301-y3', code: 'ARCH301', name: 'Computer Architecture', year: 3, members: 38, lastMessage: 'Roden: check the prereqs...' },
];

const DM_CONVERSATIONS: DMConversation[] = [
  { id: 'dm1', name: 'Renz Etcuban!', status: 'online', lastMessage: 'Thanks for the notes!', time: '10:42 AM', unread: 2 },
  { id: 'dm2', name: 'Felix Ponce', status: 'online', lastMessage: 'No problem! Good luck', time: '9:30 AM', unread: 0 },
  { id: 'dm3', name: 'Aiko Lim', status: 'online', lastMessage: 'Study group confirmed ✓', time: 'Yesterday', unread: 1 },
  { id: 'dm4', name: 'Paula Torres', status: 'offline', lastMessage: 'See you Friday!', time: 'Mon', unread: 0 },
  { id: 'dm5', name: 'Mia Cruz', status: 'offline', lastMessage: 'Sent the slides already', time: 'Sun', unread: 0 },
];

const CONNECTIONS: Connection[] = [
  { name: 'Renz Etcuban', status: 'online', role: 'Active now', unread: 2 },
  { name: 'Felix Ponce', status: 'online', role: 'Active now', unread: 0 },
  { name: 'Aiko Lim', status: 'online', role: 'Active now', unread: 1 },
  { name: 'Paula Torres', status: 'online', role: 'Active now', unread: 0 },
  { name: 'Rico Navarro', status: 'offline', role: '1 hour ago', unread: 0 },
  { name: 'Mia Cruz', status: 'offline', role: 'Yesterday', unread: 0 },
  { name: 'Ben Torres', status: 'offline', role: '2 days ago', unread: 0 },
];

// ── Component ─────────────────────────────────────────────────────────────────
const Messaging: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [activeRoom, setActiveRoom] = useState<Room>(ROOMS[0]);
  const [activeDM, setActiveDM] = useState<DMConversation>(DM_CONVERSATIONS[0]);
  const [messageInput, setMessageInput] = useState('');
  const [connectionSearch, setConnectionSearch] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeTab, activeRoom, activeDM]);

  const filteredConnections = CONNECTIONS.filter(c =>
    c.name.toLowerCase().includes(connectionSearch.toLowerCase())
  );
  const onlineConnections = filteredConnections.filter(c => c.status === 'online');
  const offlineConnections = filteredConnections.filter(c => c.status === 'offline');

  const handleSend = () => {
    if (messageInput.trim()) setMessageInput('');
  };

  const totalUnread = DM_CONVERSATIONS.reduce((sum, dm) => sum + dm.unread, 0);

  const getDisplayMessages = (): Message[] => {
    if (activeTab === 'general') return GENERAL_MESSAGES;
    if (activeTab === 'room') {
      return [
        {
          id: 'room-1',
          sender: 'Kyle Roberts',
          time: '9:00 AM',
          content: `Welcome to ${activeRoom.code}! Post any class-specific questions here.`,
        },
        {
          id: 'room-2',
          sender: 'Janet Doe',
          isYou: true,
          time: '9:05 AM',
          content: 'Thanks Kyle!',
        }
      ];
    }
    if (activeTab === 'dm') {
      return [
        {
          id: 'dm-1',
          sender: 'Janet Doe',
          isYou: true,
          time: 'Earlier',
          content: 'Hey! Just checking in about the group project meeting later this week.',
        },
        {
          id: 'dm-2',
          sender: activeDM.name,
          time: activeDM.time,
          content: activeDM.lastMessage,
        }
      ];
    }
    return [];
  };

  const getInputPlaceholder = () => {
    if (activeTab === 'general') return 'Share something with everyone...';
    if (activeTab === 'room') return `Message #${activeRoom.code}...`;
    return `Message ${activeDM.name}...`;
  };

  return (
    <div className="h-[calc(100vh-73px)] flex flex-col -mx-8 -my-8">

      {/* ── Tab Bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 px-6 py-3 border-b border-white/5 flex-shrink-0">
        {(['general', 'room', 'dm'] as Tab[]).map(tab => {
          const labels: Record<Tab, string> = { general: 'General', room: 'Specific Room', dm: 'Direct Messages' };
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-5 py-2 rounded-xl font-black text-xs uppercase tracking-widest transition-all border flex items-center gap-2',
                isActive
                  ? 'bg-[#C5A059]/15 text-[#C5A059] border-[#C5A059]/30'
                  : 'text-[#F0EDE6]/40 border-transparent hover:text-[#F0EDE6]/70 hover:bg-white/5'
              )}
            >
              {labels[tab]}
              {tab === 'dm' && totalUnread > 0 && (
                <span className="bg-[#FFD700] text-[#000c1a] text-[9px] font-black px-1.5 py-0.5 rounded-full leading-none">
                  {totalUnread}
                </span>
              )}
            </button>
          );
        })}

        {/* Online pill — right-aligned in tab bar */}
        <div className="ml-auto flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full">
          <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
          <span className="text-emerald-400 font-black text-[10px]">142 online</span>
        </div>
      </div>

      {/* ── Main Body ────────────────────────────────────────────────── */}
      <div className="flex flex-1 min-h-0">

        {/* Left panel — shown for Room and DM tabs */}
        {(activeTab === 'room' || activeTab === 'dm') && (
          <div className="w-72 flex-shrink-0 border-r border-white/5 bg-[#001225]/40 flex flex-col">
            {/* Search */}
            <div className="p-3 border-b border-white/5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#F0EDE6]/25" />
                <input
                  type="text"
                  placeholder={activeTab === 'room' ? 'Search rooms...' : 'Search messages...'}
                  className="w-full bg-[#001225] border border-white/5 rounded-xl pl-9 pr-4 py-2.5 text-sm text-[#F0EDE6] placeholder:text-[#F0EDE6]/20 focus:outline-none focus:border-[#C5A059]/30 transition-all"
                />
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
              {/* ── Rooms list ── */}
              {activeTab === 'room' && ROOMS.map(room => (
                <button
                  key={room.id}
                  onClick={() => setActiveRoom(room)}
                  className={cn(
                    'w-full flex items-start gap-3 p-3 rounded-xl transition-all text-left border',
                    activeRoom.id === room.id
                      ? 'bg-[#C5A059]/10 border-[#C5A059]/20'
                      : 'border-transparent hover:bg-white/5'
                  )}
                >
                  <div className={cn(
                    'h-10 w-10 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all',
                    activeRoom.id === room.id
                      ? 'bg-[#C5A059]/20 border-[#C5A059]/30'
                      : 'bg-[#001225] border-white/5'
                  )}>
                    <Hash className={cn('h-4 w-4', activeRoom.id === room.id ? 'text-[#C5A059]' : 'text-[#F0EDE6]/40')} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-black text-[#F0EDE6]">{room.code}</span>
                      <span className="text-[10px] bg-[#002147] text-[#FFD700] px-1.5 py-0.5 rounded font-black">
                        Y{room.year}
                      </span>
                    </div>
                    <p className="text-xs text-[#F0EDE6]/50 truncate">{room.lastMessage}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Users className="h-3 w-3 text-[#F0EDE6]/25" />
                      <span className="text-[10px] text-[#F0EDE6]/30">{room.members} members</span>
                    </div>
                  </div>
                </button>
              ))}

              {/* ── DM list ── */}
              {activeTab === 'dm' && DM_CONVERSATIONS.map(dm => (
                <button
                  key={dm.id}
                  onClick={() => setActiveDM(dm)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left border',
                    activeDM.id === dm.id
                      ? 'bg-[#C5A059]/10 border-[#C5A059]/20'
                      : 'border-transparent hover:bg-white/5'
                  )}
                >
                  <div className="relative flex-shrink-0">
                    <Avatar name={dm.name} size="sm" />
                    {dm.status === 'online' && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 rounded-full border-2 border-[#001225]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between items-center mb-0.5">
                      <span className="text-sm font-bold text-[#F0EDE6] truncate">{dm.name}</span>
                      <span className="text-[10px] text-[#F0EDE6]/30 flex-shrink-0 ml-2">{dm.time}</span>
                    </div>
                    <p className="text-xs text-[#F0EDE6]/40 truncate">{dm.lastMessage}</p>
                  </div>
                  {dm.unread > 0 && (
                    <div className="h-5 w-5 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                      <span className="text-[9px] font-black text-[#000c1a]">{dm.unread}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Center Chat Area ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col min-w-0">

          {/* Subheader (filters / room info / DM header) */}
          <div className="flex items-center gap-3 px-6 py-3 border-b border-white/5 bg-[#000c1a]/60 flex-shrink-0">
            {activeTab === 'general' && (
              <>
                <button className="flex items-center gap-1.5 bg-[#001225] border border-white/5 px-3 py-2 rounded-xl text-xs font-black text-[#F0EDE6]/60 hover:border-[#C5A059]/30 transition-all">
                  <Globe className="h-3.5 w-3.5" />
                  All Students
                  <ChevronDown className="h-3 w-3" />
                </button>
                <button className="flex items-center gap-1.5 bg-[#001225] border border-white/5 px-3 py-2 rounded-xl text-xs font-black text-[#F0EDE6]/60 hover:border-[#C5A059]/30 transition-all">
                  Year: All
                  <ChevronDown className="h-3 w-3" />
                </button>
                <div className="ml-auto text-[10px] font-black text-[#F0EDE6]/25 uppercase tracking-widest">
                  Today · Apr 14
                </div>
              </>
            )}

            {activeTab === 'room' && (
              <>
                <div className="h-8 w-8 rounded-lg bg-[#C5A059]/15 border border-[#C5A059]/20 flex items-center justify-center">
                  <Hash className="h-4 w-4 text-[#C5A059]" />
                </div>
                <div>
                  <span className="font-black text-[#F0EDE6] text-sm">{activeRoom.code}</span>
                  <span className="text-[#F0EDE6]/40 text-sm mx-2">·</span>
                  <span className="text-sm text-[#F0EDE6]/60">{activeRoom.name}</span>
                </div>
                <div className="ml-auto flex items-center gap-1.5 text-[10px] font-black text-[#F0EDE6]/30 uppercase tracking-widest">
                  <Lock className="h-3 w-3" />
                  Year {activeRoom.year}
                  <span className="mx-1">·</span>
                  <Users className="h-3 w-3" />
                  {activeRoom.members}
                </div>
              </>
            )}

            {activeTab === 'dm' && (
              <>
                <div className="relative">
                  <Avatar name={activeDM.name} size="sm" />
                  {activeDM.status === 'online' && (
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 rounded-full border-2 border-[#001225]" />
                  )}
                </div>
                <div>
                  <span className="font-black text-[#F0EDE6] text-sm">{activeDM.name}</span>
                  <p className={cn(
                    'text-[10px] font-bold',
                    activeDM.status === 'online' ? 'text-emerald-400' : 'text-[#F0EDE6]/30'
                  )}>
                    {activeDM.status === 'online' ? 'Active now' : 'Offline'}
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {/* Date separator */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] font-black text-[#F0EDE6]/25 uppercase tracking-widest">Today</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {getDisplayMessages().map(msg => (
              <div
                key={msg.id}
                className={cn('flex gap-3 items-start', msg.isYou && 'flex-row-reverse')}
              >
                <Avatar name={msg.sender} size="sm" className="flex-shrink-0 mt-1" />

                <div className={cn('max-w-[62%] space-y-1', msg.isYou && 'items-end flex flex-col')}>
                  {/* Sender row */}
                  {!msg.isYou && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-[#F0EDE6]">{msg.sender}</span>
                      <span className="text-[10px] text-[#F0EDE6]/25">{msg.time}</span>
                    </div>
                  )}
                  {msg.isYou && (
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-[10px] text-[#F0EDE6]/25">{msg.time}</span>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 text-[#C5A059] uppercase tracking-wider">
                        You
                      </span>
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={cn(
                    'px-4 py-3 rounded-2xl text-sm leading-relaxed font-medium',
                    msg.isYou
                      ? 'bg-[#C5A059]/15 border border-[#C5A059]/20 text-[#F0EDE6] rounded-tr-sm'
                      : 'bg-[#001225] border border-white/5 text-[#F0EDE6]/85 rounded-tl-sm'
                  )}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="px-6 py-4 border-t border-white/5 flex-shrink-0">
            <div className="flex items-center gap-3 bg-[#001225] border border-white/5 rounded-2xl px-4 py-3 focus-within:border-[#C5A059]/30 transition-all">
              <input
                type="text"
                value={messageInput}
                onChange={e => setMessageInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
                placeholder={getInputPlaceholder()}
                className="flex-1 bg-transparent text-[#F0EDE6] placeholder:text-[#F0EDE6]/20 text-sm font-medium focus:outline-none"
              />

              <div className="flex items-center gap-3 flex-shrink-0">
                {/* "Post in" selector — only for General */}
                {activeTab === 'general' && (
                  <div className="flex items-center gap-2 text-xs font-black text-[#F0EDE6]/30 border-r border-white/5 pr-4">
                    Post in:
                    <button className="flex items-center gap-1.5 bg-[#001a33] border border-[#C5A059]/15 px-3 py-1.5 rounded-lg text-[#F0EDE6]/60 hover:border-[#C5A059]/40 transition-all">
                      <Avatar name="Janet Doe" size="sm" />
                      <span className="text-[11px] font-black">Janet</span>
                      <ChevronDown className="h-3 w-3" />
                    </button>
                  </div>
                )}

                <button
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="flex items-center gap-2 bg-[#C5A059] hover:bg-[#e6bb6d] disabled:opacity-30 disabled:cursor-not-allowed text-[#000c1a] font-black text-xs uppercase tracking-widest px-5 py-2.5 rounded-xl transition-all active:scale-95"
                >
                  <Send className="h-3.5 w-3.5" />
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right Connections Panel ───────────────────────────────── */}
        <div className="w-64 flex-shrink-0 border-l border-white/5 bg-[#001225]/25 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-white/5">
            <span className="text-xs font-black text-[#F0EDE6]/50 uppercase tracking-widest">Connections</span>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-full">
              <Circle className="h-2 w-2 fill-emerald-400 text-emerald-400" />
              <span className="text-[10px] font-black text-emerald-400">{onlineConnections.length} online</span>
            </div>
          </div>

          {/* Search */}
          <div className="px-3 pt-3 pb-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#F0EDE6]/20" />
              <input
                type="text"
                placeholder="Search people..."
                value={connectionSearch}
                onChange={e => setConnectionSearch(e.target.value)}
                className="w-full bg-[#001225] border border-white/5 rounded-xl pl-8 pr-3 py-2 text-xs text-[#F0EDE6] placeholder:text-[#F0EDE6]/20 focus:outline-none focus:border-[#C5A059]/25 transition-all"
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto px-2 pb-4">
            {/* Online */}
            <div className="px-2 py-2">
              <span className="text-[9px] font-black text-[#F0EDE6]/25 uppercase tracking-widest">
                Online — {onlineConnections.length}
              </span>
            </div>
            {onlineConnections.map(conn => (
              <button
                key={conn.name}
                className="w-full flex items-center gap-2.5 px-2 py-2.5 rounded-xl hover:bg-white/5 transition-all text-left group"
              >
                <div className="relative flex-shrink-0">
                  <Avatar name={conn.name} size="sm" />
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-emerald-400 rounded-full border-2 border-[#001225]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-[#F0EDE6] truncate group-hover:text-[#C5A059] transition-colors">
                    {conn.name}
                  </p>
                  <p className="text-[10px] text-emerald-400 font-medium">{conn.role}</p>
                </div>
                {conn.unread > 0 && (
                  <div className="h-5 w-5 rounded-full bg-[#FFD700] flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-black text-[#000c1a]">{conn.unread}</span>
                  </div>
                )}
              </button>
            ))}

            {/* Offline */}
            {offlineConnections.length > 0 && (
              <>
                <div className="px-2 py-2 mt-3">
                  <span className="text-[9px] font-black text-[#F0EDE6]/25 uppercase tracking-widest">
                    Offline — {offlineConnections.length}
                  </span>
                </div>
                {offlineConnections.map(conn => (
                  <button
                    key={conn.name}
                    className="w-full flex items-center gap-2.5 px-2 py-2.5 rounded-xl hover:bg-white/5 transition-all text-left group opacity-50 hover:opacity-70"
                  >
                    <Avatar name={conn.name} size="sm" className="flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-[#F0EDE6] truncate">{conn.name}</p>
                      <p className="text-[10px] text-[#F0EDE6]/40 font-medium">{conn.role}</p>
                    </div>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messaging;
