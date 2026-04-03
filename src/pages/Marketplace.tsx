import React, { useState } from 'react';
import { Plus, Search, Filter, ShoppingBag } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { cn } from '@/lib/utils';
import Avatar from '../components/Avatar';

const MOCK_ITEMS = [
  {
    id: 1,
    title: 'Intro to Psychology 10th Ed.',
    price: 45,
    condition: 'Like New',
    seller: 'Alex J.',
    category: 'Textbooks',
    image: 'bg-[#002147]/5'
  },
  {
    id: 2,
    title: 'Mini Fridge (Perfect working condition)',
    price: 60,
    condition: 'Good',
    seller: 'Sam R.',
    category: 'Dorm Gear',
    image: 'bg-[#002147]/10'
  },
  {
    id: 3,
    title: 'Calculus Early Transcendentals',
    price: 85,
    condition: 'Acceptable',
    seller: 'Jordan P.',
    category: 'Textbooks',
    image: 'bg-[#FFD700]/5'
  },
  {
    id: 4,
    title: 'Desk Lamp with Wireless Charger',
    price: 25,
    condition: 'Like New',
    seller: 'Taylor M.',
    category: 'Dorm Gear',
    image: 'bg-[#FFD700]/10'
  }
];

const Marketplace: React.FC = () => {
  const { isAnonymous } = useOutletContext<{ isAnonymous: boolean }>();
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Textbooks', 'Dorm Gear', 'Electronics', 'Clothing'];

  const filteredItems = activeCategory === 'All' 
    ? MOCK_ITEMS 
    : MOCK_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="w-full pb-20 md:pb-0 font-sans w-full">
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end space-y-6 md:space-y-0">
        <div>
          <div className="flex items-center space-x-2 mb-2">
              <div className="h-2 w-8 bg-[#FFD700] rounded-full" />
              <span className="text-[#FFD700] font-black uppercase tracking-widest text-xs font-sans">Campus Trade</span>
          </div>
          <h1 className="text-4xl font-playfair font-black text-[#F0EDE6] transition-colors uppercase tracking-tight">
            Campus Marketplace
          </h1>
          <p className={cn("mt-2 font-medium", isAnonymous ? "text-slate-400" : "text-[#002147]/60")}>Secure trading exclusive to your university peer network.</p>
        </div>
        <button className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 transition-all shadow-2xl active:scale-95 bg-[#C5A059] text-[#000c1a] hover:bg-[#e6bb6d]">
          <Plus className="h-4 w-4" />
          <span>Post an Item</span>
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-10">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            type="text"
            placeholder="Search verified listings..."
            className="block w-full pl-14 pr-6 py-4 border-2 font-bold transition-all focus:outline-none rounded-3xl bg-[#001225] border-[#C5A059]/10 text-[#F0EDE6] placeholder:text-[#F0EDE6]/20 focus:border-[#C5A059]/30"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 rounded-3xl font-black text-xs uppercase tracking-widest transition-all bg-[#001225] border-[#C5A059]/10 text-[#F0EDE6]/60 hover:bg-[#001f3f]">
          <Filter className="h-4 w-4" />
          <span>Advanced Filters</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-3 overflow-x-auto pb-6 mb-6 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={cn(
                "px-6 py-3 rounded-2xl whitespace-nowrap text-xs font-black uppercase tracking-widest transition-all border-2",
                activeCategory === category 
                    ? 'bg-[#C5A059] border-[#C5A059] text-[#000c1a] shadow-xl' 
                    : 'bg-[#001225] border-[#C5A059]/10 text-[#F0EDE6]/40 hover:border-[#C5A059]/30'
            )}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {filteredItems.map(item => (
          <div key={item.id} className="rounded-3xl overflow-hidden border border-[#C5A059]/15 transition-all duration-300 group cursor-pointer flex flex-col hover:shadow-2xl hover:-translate-y-2 bg-[#001225]">
            {/* Image Placeholder */}
            <div className={`h-56 w-full ${item.image} relative flex items-center justify-center transition-transform group-hover:scale-105 duration-500`}>
               <ShoppingBag className="h-16 w-16 opacity-10 text-[#F0EDE6]" />
               <div className="absolute bottom-4 left-4 bg-[#001225] px-4 py-2 rounded-2xl text-[#C5A059] font-black text-sm shadow-xl border border-[#C5A059]/10">
                 ${item.price}
               </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-[0.2em]">{item.category}</span>
              </div>
              <h3 className="text-xl font-bold mb-6 line-clamp-2 flex-1 text-[#F0EDE6]">{item.title}</h3>
              
              <div className="mt-4 pt-4 border-t border-[#C5A059]/10 flex justify-between items-center text-xs font-black uppercase tracking-widest text-gray-400">
                 <span>{item.condition}</span>
                 <div className="flex items-center space-x-2">
                    <Avatar name={item.seller} isAnonymous={false} size="sm" />
                    <span className="text-[#F0EDE6]/60">{item.seller}</span>
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
