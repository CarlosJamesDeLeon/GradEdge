import React, { useState } from "react";
import { Search, Star, MessageSquare, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Avatar from "@/components/Avatar";

// ── Mock Data ─────────────────────────────────────────────────────────────
const MOCK_PROFESSORS = [
    {
        id: "1",
        name: "Prof. Jun Albert Pardillo",
        department: "Human Computer Interaction",
        rating: 4.8,
        metrics: { clarity: 95, fairness: 92, responseTime: 88 },
        recentReview: "His lectures on Wireframes are legendary. Demanding but extremely clear.",
        image: null
    },
    {
        id: "2",
        name: "Dr. Jay Vince Serato",
        department: "Data Structures and Algorithm",
        rating: 4.5,
        metrics: { clarity: 89, fairness: 95, responseTime: 91 },
        recentReview: "Always available for consultations. He makes complex discussions feel intuitive.",
        image: null
    },
    {
        id: "3",
        name: "Prof. Roden",
        department: "Computer Architecture",
        rating: 4.2,
        metrics: { clarity: 82, fairness: 85, responseTime: 78 },
        recentReview: "Incredible storyteller. The course load is heavy, but you'll learn so much about computers.",
        image: null
    },
    {
        id: "4",
        name: "Prof. Sarah Jenkins",
        department: "Literature",
        rating: 4.7,
        metrics: { clarity: 94, fairness: 90, responseTime: 96 },
        recentReview: "Her feedback on essays is life-changing. Truly cares about student growth.",
        image: null
    }
];

// ── Sub-components ────────────────────────────────────────────────────────

const StarRating = ({ rating }: { rating: number }) => {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star
                    key={i}
                    size={14}
                    className={cn(
                        i <= Math.round(rating) ? "fill-[#C5A059] text-[#C5A059]" : "text-white/10"
                    )}
                />
            ))}
            <span className="ml-2 text-xs font-bold text-[#C5A059]">{rating.toFixed(1)}</span>
        </div>
    );
};

const MetricBar = ({ label, value }: { label: string; value: number }) => {
    return (
        <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-widest text-[#F0EDE6]/40">
                <span>{label}</span>
                <span className="text-[#C5A059]">{value}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-[#C5A059] transition-all duration-1000"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
};

// ── Main Page ─────────────────────────────────────────────────────────────

export default function ProfessorRatings() {
    const [searchTerm, setSearchTerm] = useState("");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [selectedProf, setSelectedProf] = useState<typeof MOCK_PROFESSORS[0] | null>(null);

    // Form State
    const [ratingValue, setRatingValue] = useState(5);
    const [clarity, setClarity] = useState(80);
    const [fairness, setFairness] = useState(80);
    const [responseTime, setResponseTime] = useState(80);
    const [review, setReview] = useState("");
    const [isAnonymous, setIsAnonymous] = useState(true);

    const filteredProfs = MOCK_PROFESSORS.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRateClick = (prof: typeof MOCK_PROFESSORS[0]) => {
        setSelectedProf(prof);
        setIsFormOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("GradEdge :: Submission →", {
            professor: selectedProf?.name,
            ratingValue, clarity, fairness, responseTime, review, isAnonymous
        });
        setIsFormOpen(false);
        // Reset form
        setReview("");
    };

    return (
        <div className="py-0">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap');
                .font-playfair { font-family: 'Playfair Display', serif; }
                .font-dm-sans { font-family: 'DM Sans', sans-serif; }
            `}</style>

            <header className="mb-10">
                <div className="flex items-center space-x-2 mb-2">
                    <div className="h-2 w-8 bg-[#FFD700] rounded-full" />
                    <span className="text-[#FFD700] font-black uppercase tracking-widest text-xs">Faculty Insights</span>
                </div>
                <h1 className="text-4xl font-black text-[#F0EDE6] uppercase tracking-tight mb-2">Professor Ratings</h1>
                <p className="text-[#F0EDE6]/80 font-medium text-base max-w-2xl leading-relaxed">
                    Peer-verified metrics and qualitative analysis on the educators shaping your academic journey.
                </p>
            </header>

            {/* Search Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-10">
                <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-[#F0EDE6]/30">
                        <Search className="h-5 w-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by name or department..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-14 pr-6 py-4 border-2 font-bold transition-all focus:outline-none rounded-3xl bg-[#001225] border-[#C5A059]/10 text-[#F0EDE6] placeholder:text-[#F0EDE6]/20 focus:border-[#C5A059]/30"
                    />
                </div>
                <button className="flex items-center justify-center space-x-2 px-8 py-4 border-2 rounded-3xl font-black text-xs uppercase tracking-widest transition-all bg-[#001225] border-[#C5A059]/10 text-[#F0EDE6]/60 hover:bg-[#001f3f]">
                    <Filter className="h-4 w-4" />
                    <span>Filter Majors</span>
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8">
                {filteredProfs.map((prof) => (
                    <div
                        key={prof.id}
                        className="bg-[#001225] border border-[#C5A059]/15 rounded-[32px] p-8 transition-all duration-500 group flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-8">
                            <div className="flex gap-4">
                                <Avatar name={prof.name} size="xl" className="border-[#C5A059]/10" />
                                <div>
                                    <h3 className="text-xl font-black text-[#F0EDE6] group-hover:text-[#C5A059] transition-colors">
                                        {prof.name}
                                    </h3>
                                    <p className="text-xs font-black uppercase tracking-widest text-[#FFD700] mt-1">
                                        {prof.department}
                                    </p>
                                    <div className="mt-3">
                                        <StarRating rating={prof.rating} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <MetricBar label="Clarity" value={prof.metrics.clarity} />
                            <MetricBar label="Fairness" value={prof.metrics.fairness} />
                            <MetricBar label="Response" value={prof.metrics.responseTime} />
                        </div>

                        <div className="bg-white/5 p-5 rounded-2xl border border-white/5 mb-8 flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <MessageSquare size={12} className="text-[#C5A059]" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#C5A059]">Latest Verified Review</span>
                            </div>
                            <p className="text-sm font-medium leading-relaxed text-[#F0EDE6]/80">
                                &quot;{prof.recentReview}&quot;
                            </p>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#F0EDE6]/50 hover:text-[#C5A059] cursor-pointer transition-colors">
                                See all 42 reviews &rarr;
                            </span>
                            <Button
                                onClick={() => handleRateClick(prof)}
                                className="bg-[#C5A059] hover:bg-[#e6bb6d] text-[#000c1a] font-black text-[10px] uppercase tracking-widest px-6 py-5 rounded-xl h-auto"
                            >
                                Rate this Professor
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Rating Modal */}
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogContent className="bg-[#000c1a] border border-[#C5A059]/15 text-[#F0EDE6] rounded-[32px] sm:max-w-[480px] p-0 overflow-hidden shadow-2xl">
                    <div className="p-8 sm:p-10">
                        <DialogHeader className="mb-8">
                            <div className="flex items-center gap-4 mb-4">
                                <Avatar name={selectedProf?.name} size="md" className="border-[#C5A059]/20" />
                                <div>
                                    <DialogTitle className="text-2xl font-playfair font-bold text-[#F0EDE6]">Rate Prof. {selectedProf?.name.split(' ').pop()}</DialogTitle>
                                    <DialogDescription className="text-[#F0EDE6]/40 font-dm-sans text-xs uppercase tracking-widest font-black">Verified Student Feed</DialogDescription>
                                </div>
                            </div>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-8 font-dm-sans">
                            {/* Star Selector */}
                            <div className="space-y-4">
                                <Label className="text-xs font-black uppercase tracking-widest text-[#F0EDE6]/60">Overall Rating</Label>
                                <div className="flex items-center gap-2">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => setRatingValue(i)}
                                            className="focus:outline-none transition-transform hover:scale-110"
                                        >
                                            <Star
                                                size={32}
                                                className={cn(
                                                    "transition-all duration-300",
                                                    i <= ratingValue ? "fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.4)]" : "text-white/10"
                                                )}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sliders */}
                            <div className="space-y-6">
                                <SliderField label="Clarity" value={clarity} onChange={setClarity} />
                                <SliderField label="Fairness" value={fairness} onChange={setFairness} />
                                <SliderField label="Response Time" value={responseTime} onChange={setResponseTime} />
                            </div>

                            {/* Review */}
                            <div className="space-y-4">
                                <Label className="text-xs font-black uppercase tracking-widest text-[#F0EDE6]/60">Written Review</Label>
                                <textarea
                                    required
                                    value={review}
                                    onChange={(e) => setReview(e.target.value)}
                                    placeholder="Share your academic experience..."
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#C5A059]/50 transition-all min-h-[120px] placeholder:text-white/10"
                                />
                            </div>

                            {/* Anonymous Toggle */}
                            <div className="flex items-center justify-between bg-white/5 p-4 rounded-2xl border border-white/5">
                                <div>
                                    <p className="text-sm font-bold text-[#F0EDE6]">Post Anonymously</p>
                                    <p className="text-[10px] text-[#F0EDE6]/40 uppercase tracking-widest font-black mt-1">Protect your academic identity</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsAnonymous(!isAnonymous)}
                                    className={cn(
                                        "w-12 h-6 rounded-full transition-all duration-300 relative",
                                        isAnonymous ? "bg-[#C5A059]" : "bg-white/10"
                                    )}
                                >
                                    <div className={cn(
                                        "absolute top-1 w-4 h-4 rounded-full bg-[#000c1a] transition-all duration-300",
                                        isAnonymous ? "left-7" : "left-1"
                                    )} />
                                </button>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#C5A059] hover:bg-[#e6bb6d] text-[#000c1a] font-black text-xs uppercase tracking-widest py-8 rounded-2xl h-auto shadow-xl shadow-[#C5A059]/10"
                            >
                                Submit Verified Rating
                            </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function SliderField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-[#F0EDE6]/60">
                <span>{label}</span>
                <span className="text-[#C5A059]">{value}%</span>
            </div>
            <input
                type="range"
                min="0"
                max="100"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value))}
                className="w-full h-1 bg-white/5 rounded-full appearance-none cursor-pointer accent-[#C5A059]"
            />
        </div>
    );
}
