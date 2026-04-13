import React, { useState } from 'react';
import { Plus, Search, Filter, ShoppingBag, X, Heart, MessageSquare, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
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
  const [showPostModal, setShowPostModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof MOCK_ITEMS)[0] | null>(null);
  const [postForm, setPostForm] = useState({
    title: '', price: '', category: 'Textbooks', description: '', condition: 'Like New'
  });

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
        <button 
          onClick={() => setShowPostModal(true)}
          className="px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center space-x-3 transition-all shadow-2xl active:scale-95 bg-[#C5A059] text-[#000c1a] hover:bg-[#e6bb6d]"
        >
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
          <div 
            key={item.id} 
            onClick={() => setSelectedItem(item)}
            className="rounded-3xl overflow-hidden border border-[#C5A059]/15 transition-all duration-300 group cursor-pointer flex flex-col hover:shadow-2xl hover:-translate-y-2 bg-[#001225]"
          >
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

      {/* Post Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#001225] border border-[#C5A059]/20 rounded-[2.5rem] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-playfair font-black text-[#F0EDE6] uppercase tracking-wide">Campus Trade</h2>
                <p className="text-[#F0EDE6]/60 text-sm font-bold uppercase tracking-widest mt-1">Post an Item</p>
              </div>
              <button onClick={() => setShowPostModal(false)} className="text-[#F0EDE6]/60 hover:text-[#C5A059] transition-colors p-2 bg-[#001a33] rounded-full">
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Photo Upload Area */}
              <button className="w-full h-40 border-2 border-dashed border-[#C5A059]/30 rounded-2xl flex flex-col items-center justify-center bg-[#001a33]/50 hover:bg-[#001a33] transition-colors group">
                <div className="h-12 w-12 rounded-full bg-[#C5A059] flex items-center justify-center text-[#000c1a] group-hover:scale-110 transition-transform mb-3">
                  <Plus className="h-6 w-6" />
                </div>
                <span className="text-[#F0EDE6] font-bold text-sm tracking-wide">TAP TO ADD PHOTOS</span>
              </button>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Category</label>
                  <select 
                    value={postForm.category}
                    onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                    className="w-full bg-[#001a33] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                  >
                    {categories.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Price ($)</label>
                  <input 
                    type="number" 
                    placeholder="0.00"
                    value={postForm.price}
                    onChange={(e) => setPostForm({...postForm, price: e.target.value})}
                    className="w-full bg-[#001a33] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Item Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Calculus Early Transcendentals, 8th Ed."
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  className="w-full bg-[#001a33] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Description</label>
                <textarea 
                  rows={4}
                  placeholder="Add details — edition, highlights, damage, what's included..."
                  value={postForm.description}
                  onChange={(e) => setPostForm({...postForm, description: e.target.value})}
                  className="w-full bg-[#001a33] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium resize-none"
                />
              </div>

              <div className="space-y-3">
                <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Condition</label>
                <div className="flex flex-wrap gap-2">
                  {['Like New', 'Good', 'Acceptable', 'For Parts'].map(cond => (
                    <button
                      key={cond}
                      onClick={() => setPostForm({...postForm, condition: cond})}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all border",
                        postForm.condition === cond
                          ? "bg-[#C5A059] text-[#000c1a] border-[#C5A059]"
                          : "bg-[#001a33] text-[#F0EDE6]/80 border-[#C5A059]/20 hover:border-[#C5A059]/60"
                      )}
                    >
                      {cond}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex space-x-4 pt-4 border-t border-[#C5A059]/10">
                <button 
                  onClick={() => setShowPostModal(false)}
                  className="flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#001a33] text-[#F0EDE6] hover:bg-[#00284d] transition-colors border border-[#C5A059]/20"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    // Logic to post item goes here
                    setShowPostModal(false);
                  }}
                  className="flex-1 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#C5A059] text-[#000c1a] hover:bg-[#e6bb6d] transition-colors shadow-lg shadow-[#C5A059]/20"
                >
                  + Post Listing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Item Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#001225] border border-[#C5A059]/20 rounded-[2.5rem] w-full max-w-3xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden">
            
            {/* Image Section */}
            <div className={`md:w-1/2 h-64 md:h-auto ${selectedItem?.image} relative flex items-center justify-center border-b md:border-b-0 md:border-r border-[#C5A059]/20`}>
                <div className="absolute top-4 left-4">
                    <span className="bg-[#001a33]/80 backdrop-blur-md px-3 py-1.5 rounded-lg text-[10px] font-black text-[#FFD700] uppercase tracking-[0.2em] border border-[#C5A059]/20">
                        {selectedItem?.category}
                    </span>
                </div>
                <button onClick={() => setSelectedItem(null)} className="md:hidden absolute top-4 right-4 text-[#F0EDE6] p-2 bg-[#001a33]/80 rounded-full backdrop-blur-md">
                    <X className="h-5 w-5" />
                </button>
                <ImageIcon className="h-24 w-24 opacity-10 text-[#F0EDE6]" />
            </div>

            {/* Details Section */}
            <div className="md:w-1/2 p-8 flex flex-col overflow-y-auto">
                <div className="flex justify-end hidden md:flex mb-2">
                    <button onClick={() => setSelectedItem(null)} className="text-[#F0EDE6]/60 hover:text-[#C5A059] transition-colors bg-[#001a33] p-1.5 rounded-full">
                        <X className="h-5 w-5" />
                    </button>
                </div>
                
                <h2 className="text-3xl font-playfair font-black text-[#F0EDE6] mb-2">{selectedItem?.title}</h2>
                <div className="flex items-center space-x-3 text-xs font-bold text-[#F0EDE6]/60 uppercase tracking-wider mb-6">
                    <span className="text-[#C5A059]">${selectedItem?.price}</span>
                    <span>•</span>
                    <span>{selectedItem?.condition}</span>
                    <span>•</span>
                    <span>14 views</span>
                </div>

                <p className="text-[#F0EDE6]/80 text-sm leading-relaxed mb-8">
                    Barely used — no highlighting or writing. All pages intact. Perfect for classes this semester. Will meet on campus at library or student center.
                </p>

                <div className="bg-[#001a33] p-4 rounded-2xl flex items-center space-x-4 mb-8 border border-[#C5A059]/10">
                    <Avatar name={selectedItem?.seller || ''} isAnonymous={false} size="lg" />
                    <div>
                        <p className="text-[#F0EDE6] font-bold text-sm">{selectedItem?.seller}</p>
                        <p className="text-[#C5A059] text-xs font-medium uppercase tracking-wider">Student</p>
                    </div>
                </div>

                <div className="mt-auto space-y-4">
                    <div className="flex space-x-4">
                        <button className="flex-1 flex items-center justify-center space-x-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#001a33] text-[#F0EDE6] hover:bg-[#00284d] transition-colors border border-[#C5A059]/20">
                            <Heart className="h-4 w-4" />
                            <span>Save</span>
                        </button>
                        <button className="flex-[2] flex items-center justify-center space-x-2 py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#C5A059] text-[#000c1a] hover:bg-[#e6bb6d] transition-colors shadow-lg shadow-[#C5A059]/20 group">
                            <MessageSquare className="h-4 w-4 group-hover:scale-110 transition-transform" />
                            <span>Contact Seller</span>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2 text-[#C5A059]/80 text-[10px] font-bold uppercase tracking-widest justify-center bg-[#C5A059]/5 py-2 rounded-lg">
                        <CheckCircle2 className="h-3 w-3" />
                        <span>Seller typically responds within 2 hours</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
