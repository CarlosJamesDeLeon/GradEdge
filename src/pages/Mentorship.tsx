import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { Star, ArrowRight } from 'lucide-react';
import Avatar from '../components/Avatar';

const MentorshipBridge: React.FC = () => {
    const { isAnonymous } = useOutletContext<{ isAnonymous: boolean }>();

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

                        <button className="w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all hover:bg-[#C5A059] hover:text-[#000c1a] border-2 border-[#C5A059]/10 text-[#C5A059]">
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
                <button className="bg-[#C5A059] text-[#000c1a] px-12 py-5 rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl hover:bg-[#e6bb6d] transition-all active:scale-95">
                    Apply to Mentor
                </button>
            </div>
        </div>
    );
};

export default MentorshipBridge;
