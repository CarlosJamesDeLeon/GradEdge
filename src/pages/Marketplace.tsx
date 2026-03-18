import React, { useState } from 'react';
import { Tag, Plus, Search, Filter } from 'lucide-react';

const MOCK_ITEMS = [
  {
    id: 1,
    title: 'Intro to Psychology 10th Ed.',
    price: 45,
    condition: 'Like New',
    seller: 'Alex J.',
    category: 'Textbooks',
    image: 'bg-indigo-900/50'
  },
  {
    id: 2,
    title: 'Mini Fridge (Perfect working condition)',
    price: 60,
    condition: 'Good',
    seller: 'Sam R.',
    category: 'Dorm Gear',
    image: 'bg-emerald-900/50'
  },
  {
    id: 3,
    title: 'Calculus Early Transcendentals',
    price: 85,
    condition: 'Acceptable',
    seller: 'Jordan P.',
    category: 'Textbooks',
    image: 'bg-rose-900/50'
  },
  {
    id: 4,
    title: 'Desk Lamp with Wireless Charger',
    price: 25,
    condition: 'Like New',
    seller: 'Taylor M.',
    category: 'Dorm Gear',
    image: 'bg-amber-900/50'
  }
];

const Marketplace: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Textbooks', 'Dorm Gear', 'Electronics', 'Clothing'];

  const filteredItems = activeCategory === 'All' 
    ? MOCK_ITEMS 
    : MOCK_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="w-full pb-20 md:pb-0">
      <header className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-2">Campus Market</h1>
          <p className="text-textSecondary">Buy and sell items within your university.</p>
        </div>
        <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium flex items-center space-x-2 transition-all shadow-lg shadow-primary/20 whitespace-nowrap">
          <Plus className="h-5 w-5" />
          <span>Sell an Item</span>
        </button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-8">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search items..."
            className="block w-full pl-11 pr-4 py-3 bg-surface border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          />
        </div>
        <button className="flex items-center justify-center space-x-2 bg-surface border border-gray-800 px-6 py-3 rounded-xl text-textSecondary hover:text-white hover:bg-gray-800 transition-colors">
          <Filter className="h-5 w-5" />
          <span>Filters</span>
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 overflow-x-auto pb-4 mb-4 scrollbar-hide">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-primary text-white' 
                : 'bg-surface border border-gray-800 text-textSecondary hover:text-white hover:bg-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-surface border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col">
            {/* Image Placeholder */}
            <div className={`h-48 w-full ${item.image} relative flex items-center justify-center`}>
               <Tag className="h-12 w-12 text-white/20" />
               <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-lg text-white font-bold text-sm border border-white/10">
                 ${item.price}
               </div>
            </div>
            
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{item.category}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 flex-1">{item.title}</h3>
              
              <div className="mt-4 pt-4 border-t border-gray-800/50 flex justify-between items-center text-sm text-textSecondary">
                <span>{item.condition}</span>
                <span>{item.seller}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
