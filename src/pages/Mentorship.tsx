import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Star, ArrowRight, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Avatar from '../components/Avatar';

const MentorshipBridge: React.FC = () => {
    const { isAnonymous } = useOutletContext<{ isAnonymous: boolean }>();
    const [selectedMentor, setSelectedMentor] = useState<any>(null);
    const [showApplyModal, setShowApplyModal] = useState(false);
    
    // Form states
    const [bookingForm, setBookingForm] = useState({ subject: '', sessionType: '', date: '', time: '', helpText: '' });
    const [applyForm, setApplyForm] = useState({ subject: '', sessionType: '', date: '', time: '' });

    return (
        <div className="w-full pb-20 md:pb-0 font-sans w-full">
            <header className="mb-12">
                <div className="flex items-center space-x-2 mb-2">
                    <div className="h-2 w-8 bg-[#FFD700] rounded-full" />
                    <span className="text-[#FFD700] font-black uppercase tracking-widest text-xs">Professional Bridge</span>
                </div>
                <h1 className="text-5xl font-playfair font-black text-[#F0EDE6] transition-colors mb-4">
                    Mentorship Bridge
                </h1>
                <p className="text-xl font-dm-sans font-medium max-w-2xl text-[#F0EDE6]/60">
                    Connect with industry alumni and senior peers for resume reviews, mock interviews, and career guidance.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { name: 'David Wilson', role: 'SWE at Google', major: 'CS Alumnus', rating: 4.9, sessions: 124 },
                    { name: 'Elena Rodriguez', role: 'Product at Meta', major: 'Marketing Alumna', rating: 5.0, sessions: 89 },
                    { name: 'Marcus Thorne', role: 'Quant at Goldman', major: 'Math Alumnus', rating: 4.8, sessions: 210 }
                ].map(mentor => (
                    <div key={mentor.name} className="rounded-[2.5rem] p-8 border border-[#C5A059]/15 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group bg-[#001225]">
                        <div className="flex items-center space-x-4 mb-8">
                            <Avatar 
                                name={mentor.name} 
                                isAnonymous={isAnonymous} 
                                size="lg"
                            />
                            <div className="flex flex-col justify-center">
                                <h3 className="text-xl font-playfair font-black leading-tight text-[#F0EDE6]">{mentor.name}</h3>
                                <p className="text-[#FFD700] font-bold uppercase tracking-widest text-[10px] mt-1.5">{mentor.role}</p>
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between items-center text-sm font-bold opacity-60">
                                <span>Expertise</span>
                                <span className="text-[#F0EDE6]">{mentor.major}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold opacity-60">
                                <span>Reviews</span>
                                <div className="flex items-center space-x-1">
                                     <Star className="h-3 w-3 fill-[#FFD700] text-[#FFD700]" />
                                     <span className="text-[#F0EDE6]">{mentor.rating} ({mentor.sessions} sessions)</span>
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setSelectedMentor(mentor)}
                            className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all hover:bg-[#C5A059] hover:text-[#000c1a] border-2 border-[#C5A059]/10 text-[#C5A059]"
                        >
                            <span>Book Session</span>
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>
            
            <div className="mt-20 rounded-[3rem] p-12 text-center border-4 border-dashed border-[#C5A059]/10 transition-all duration-500 bg-[#001225]">
                <h3 className="text-3xl font-playfair font-black mb-4 text-[#F0EDE6]">Become a Mentor</h3>
                <p className="text-lg font-dm-sans font-medium mb-10 max-w-xl mx-auto text-[#F0EDE6]/60">
                    Already graduated or in your final year? Help build the next generation of academic leaders.
                </p>
                <button 
                    onClick={() => setShowApplyModal(true)}
                    className="bg-[#C5A059] text-[#000c1a] px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-[#e6bb6d] transition-all active:scale-95"
                >
                    Apply to Mentor
                </button>
            </div>

            {/* Book Mentorship Session Modal */}
            {selectedMentor && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#001225] border border-[#C5A059]/20 rounded-[2.5rem] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button onClick={() => setSelectedMentor(null)} className="absolute top-6 right-6 text-[#F0EDE6]/60 hover:text-[#C5A059] transition-colors p-2 bg-[#001a33] rounded-full">
                            <X className="h-6 w-6" />
                        </button>
                        
                        <h2 className="text-2xl font-playfair font-black text-[#F0EDE6] uppercase tracking-wide text-center mb-8">Book Mentorship Session</h2>
                        
                        <div className="bg-[#001a33] rounded-3xl p-6 border border-[#C5A059]/10 mb-8">
                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar name={selectedMentor.name} isAnonymous={false} size="lg" />
                                <div>
                                    <h3 className="text-xl font-bold text-[#F0EDE6]">{selectedMentor.name}</h3>
                                    <p className="text-[#C5A059] text-xs font-bold uppercase tracking-widest mt-1">{selectedMentor.role}</p>
                                    <div className="flex items-center space-x-1 mt-1">
                                        <Star className="h-3 w-3 fill-[#FFD700] text-[#FFD700]" />
                                        <span className="text-[#F0EDE6]/60 text-xs font-medium">{selectedMentor.rating} Rating</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Select Subject/Expertise</label>
                                    <select 
                                        value={bookingForm.subject}
                                        onChange={(e) => setBookingForm({...bookingForm, subject: e.target.value})}
                                        className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                    >
                                        <option value="" disabled>Select subject...</option>
                                        <option value="resume">Resume Review</option>
                                        <option value="interview">Mock Interview</option>
                                        <option value="general">General Guidance</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Select Session Type</label>
                                    <select 
                                        value={bookingForm.sessionType}
                                        onChange={(e) => setBookingForm({...bookingForm, sessionType: e.target.value})}
                                        className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                    >
                                        <option value="" disabled>Select type...</option>
                                        <option value="video">Video Call (30 min)</option>
                                        <option value="video_long">Video Call (1 hr)</option>
                                        <option value="chat">Chat Support</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Select Date</label>
                                    <input 
                                        type="date"
                                        value={bookingForm.date}
                                        onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                                        className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Select Time</label>
                                    <input 
                                        type="time"
                                        value={bookingForm.time}
                                        onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                                        className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                            </div>
                            
                            <div className="space-y-2 mt-4">
                                <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">What would you like help with?</label>
                                <textarea 
                                    rows={3}
                                    value={bookingForm.helpText}
                                    onChange={(e) => setBookingForm({...bookingForm, helpText: e.target.value})}
                                    className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl px-4 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={() => setSelectedMentor(null)}
                                className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#C5A059] text-[#000c1a] hover:bg-[#e6bb6d] transition-colors shadow-lg shadow-[#C5A059]/20"
                            >
                                Confirm Booking
                            </button>
                            <button 
                                onClick={() => setSelectedMentor(null)}
                                className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#001a33] text-[#F0EDE6] hover:bg-[#00284d] transition-colors border border-[#C5A059]/20"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Become a Mentor Modal */}
            {showApplyModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-[#001225] border border-[#C5A059]/20 rounded-[2.5rem] p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
                        <button onClick={() => setShowApplyModal(false)} className="absolute top-6 right-6 text-[#F0EDE6]/60 hover:text-[#C5A059] transition-colors p-2 bg-[#001a33] rounded-full">
                            <X className="h-6 w-6" />
                        </button>
                        
                        <h2 className="text-2xl font-playfair font-black text-[#F0EDE6] uppercase tracking-wide text-center mb-8">Become a Mentor</h2>
                        
                        <div className="bg-[#001a33] rounded-3xl p-6 border border-[#C5A059]/10 mb-8">
                            <div className="flex items-center space-x-4 mb-6">
                                <Avatar name="Current User" isAnonymous={false} size="lg" />
                                <div>
                                    <h3 className="text-xl font-bold text-[#F0EDE6]">[User Name]</h3>
                                    <p className="text-[#F0EDE6]/60 text-sm mt-1">[User Program/Major]</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Subject / Expertise</label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={applyForm.subject}
                                            onChange={(e) => setApplyForm({...applyForm, subject: e.target.value})}
                                            className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl pl-4 pr-10 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                            placeholder="Add subject..."
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0EDE6]/40 text-xl font-light">+</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Session Type</label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={applyForm.sessionType}
                                            onChange={(e) => setApplyForm({...applyForm, sessionType: e.target.value})}
                                            className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl pl-4 pr-10 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                            placeholder="Add type..."
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0EDE6]/40 text-xl font-light">+</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Available Date(s)</label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={applyForm.date}
                                            onChange={(e) => setApplyForm({...applyForm, date: e.target.value})}
                                            className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl pl-4 pr-10 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                            placeholder="Add dates..."
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0EDE6]/40 text-xl font-light">+</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[#F0EDE6]/60 text-xs font-black uppercase tracking-widest">Available Time</label>
                                    <div className="relative">
                                        <input 
                                            type="text"
                                            value={applyForm.time}
                                            onChange={(e) => setApplyForm({...applyForm, time: e.target.value})}
                                            className="w-full bg-[#001225] border border-[#C5A059]/20 rounded-xl pl-4 pr-10 py-3 text-[#F0EDE6] focus:outline-none focus:border-[#C5A059]/60 font-medium"
                                            placeholder="Add times..."
                                        />
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#F0EDE6]/40 text-xl font-light">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col space-y-3">
                            <button 
                                onClick={() => setShowApplyModal(false)}
                                className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#C5A059] text-[#000c1a] hover:bg-[#e6bb6d] transition-colors shadow-lg shadow-[#C5A059]/20"
                            >
                                Submit
                            </button>
                            <button 
                                onClick={() => setShowApplyModal(false)}
                                className="w-full py-4 rounded-xl font-black text-xs uppercase tracking-widest bg-[#001a33] text-[#F0EDE6] hover:bg-[#00284d] transition-colors border border-[#C5A059]/20"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MentorshipBridge;
