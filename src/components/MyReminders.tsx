import React, { useState, useEffect } from 'react';
import { ListTodo, Plus, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Reminder {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'gradedge-reminders';
const MAX_REMINDERS = 8;

const MyReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setReminders(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse reminders from localStorage', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reminders));
    }
  }, [reminders, isLoaded]);

  const addReminder = () => {
    if (!inputText.trim() || reminders.length >= MAX_REMINDERS) return;

    const newReminder: Reminder = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
    };

    setReminders([...reminders, newReminder]);
    setInputText('');
  };

  const toggleReminder = (id: string) => {
    setReminders(reminders.map(r =>
      r.id === id ? { ...r, completed: !r.completed } : r
    ));
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addReminder();
    }
  };

  return (
    <div className="rounded-3xl p-8 border border-[#C5A059]/15 transition-all duration-500 bg-[#001225] text-[#F0EDE6] shadow-2xl flex flex-col">
      <div className="flex items-center space-x-2 mb-6 text-[#FFD700]">
        <ListTodo className="h-6 w-6" />
        <h3 className="font-black uppercase tracking-widest text-sm">My Reminders</h3>
      </div>

      {/* Input Section */}
      <div className="relative mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="New academic task..."
            disabled={reminders.length >= MAX_REMINDERS}
            className={cn(
              "flex-1 bg-white/5 border border-[#C5A059]/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C5A059]/50 transition-all placeholder-[#F0EDE6]/20 font-bold",
              reminders.length >= MAX_REMINDERS && "opacity-50 cursor-not-allowed"
            )}
          />
          <button
            onClick={addReminder}
            disabled={reminders.length >= MAX_REMINDERS || !inputText.trim()}
            className={cn(
              "p-3 rounded-xl bg-[#C5A059] text-[#000c1a] hover:scale-105 active:scale-95 transition-all disabled:opacity-30 disabled:hover:scale-100",
              "flex items-center justify-center"
            )}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
        {reminders.length >= MAX_REMINDERS && (
          <p className="text-[10px] text-[#C5A059]/60 font-black uppercase tracking-widest mt-2 text-center animate-pulse">
            Clear some to add more
          </p>
        )}
      </div>

      {/* List Section */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar max-h-[320px]">
        {reminders.length === 0 ? (
          <div className="h-32 flex flex-col items-center justify-center text-[#F0EDE6]/40 italic text-sm">
            <p>No reminders yet.</p>
          </div>
        ) : (
          reminders.map((reminder) => (
            <div
              key={reminder.id}
              className={cn(
                "group flex items-center gap-3 p-3 rounded-xl bg-[#000c1a]/40 border border-[#C5A059]/5 transition-all hover:border-[#C5A059]/20",
                reminder.completed && "opacity-40"
              )}
            >
              <button
                onClick={() => toggleReminder(reminder.id)}
                className={cn(
                  "h-5 w-5 rounded-md border flex items-center justify-center transition-all",
                  reminder.completed
                    ? "bg-[#C5A059] border-[#C5A059] text-[#000c1a]"
                    : "border-[#C5A059]/30 text-transparent hover:border-[#C5A059]"
                )}
              >
                <Check className="h-3.5 w-3.5" strokeWidth={4} />
              </button>

              <span className={cn(
                "flex-1 text-sm font-bold truncate transition-all",
                reminder.completed && "line-through decoration-[#C5A059]/50"
              )}>
                {reminder.text}
              </span>

              <button
                onClick={() => deleteReminder(reminder.id)}
                className="opacity-0 group-hover:opacity-100 p-1 text-[#F0EDE6]/20 hover:text-red-400 transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReminders;
