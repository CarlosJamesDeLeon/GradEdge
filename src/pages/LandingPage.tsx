import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InfiniteGrid } from "@/components/ui/the-infinite-grid";
import { SignInDialog, RegisterDialog } from "@/components/AuthDialog";

// ── SVG Icons — colorful, meaningful, hand-crafted ────────────────────────

// Shielded Eye — teal/gold, Anonymity
const IconAnonymity = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" fill="#E8F8F5" />
    <path d="M28 14 L46 22 L46 34 C46 44 28 52 28 52 C28 52 10 44 10 34 L10 22 Z"
      fill="#0E9F8E" fillOpacity="0.18" stroke="#0E9F8E" strokeWidth="1.8" strokeLinejoin="round" />
    <ellipse cx="28" cy="32" rx="9" ry="6" stroke="#0E9F8E" strokeWidth="1.8" fill="white" fillOpacity="0.6" />
    <circle cx="28" cy="32" r="3" fill="#FFD700" />
    <circle cx="29" cy="31" r="1" fill="white" fillOpacity="0.8" />
    <line x1="20" y1="24" x2="36" y2="40" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// Linking Nodes — warm purple/gold, Mentorship
const IconMentorship = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" fill="#F3F0FF" />
    <circle cx="12" cy="30" r="7" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1.8" />
    <circle cx="44" cy="30" r="7" fill="#7C3AED" fillOpacity="0.2" stroke="#7C3AED" strokeWidth="1.8" />
    <circle cx="28" cy="16" r="6" fill="#FFD700" fillOpacity="0.3" stroke="#FFD700" strokeWidth="1.8" />
    <path d="M18 28 Q28 42 38 28" stroke="#7C3AED" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <line x1="19" y1="30" x2="23" y2="19" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="2.5 2" strokeLinecap="round" />
    <line x1="37" y1="30" x2="33" y2="19" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="2.5 2" strokeLinecap="round" />
    <circle cx="28" cy="16" r="2.5" fill="#FFD700" />
  </svg>
);

// Nested Dialogue — coral/oxford, Subject Threads
const IconThreads = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" fill="#FFF0ED" />
    <rect x="8" y="10" width="30" height="18" rx="5" fill="#FF6B6B" fillOpacity="0.15" stroke="#FF6B6B" strokeWidth="1.8" />
    <path d="M12 28 L10 36 L20 31" stroke="#FF6B6B" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    <rect x="18" y="28" width="30" height="16" rx="5" fill="#002147" fillOpacity="0.08" stroke="#002147" strokeWidth="1.8" />
    <path d="M44 44 L46 52 L36 47" stroke="#002147" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
    <line x1="14" y1="17" x2="30" y2="17" stroke="#FF6B6B" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="14" y1="22" x2="23" y2="22" stroke="#FF6B6B" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    <line x1="24" y1="35" x2="40" y2="35" stroke="#002147" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />
  </svg>
);

// Compass — sky blue/gold, Direction & Purpose
const IconCompass = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" fill="#EFF8FF" />
    <circle cx="28" cy="28" r="18" stroke="#3B82F6" strokeWidth="1.8" fill="white" fillOpacity="0.5" />
    <polygon points="28,10 31,26 28,24 25,26" fill="#FFD700" />
    <polygon points="28,46 31,30 28,32 25,30" fill="#3B82F6" fillOpacity="0.5" stroke="#3B82F6" strokeWidth="1" />
    <line x1="10" y1="28" x2="22" y2="28" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="34" y1="28" x2="46" y2="28" stroke="#3B82F6" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="28" cy="28" r="3.5" fill="#FFD700" />
    <circle cx="29" cy="27" r="1.2" fill="white" fillOpacity="0.7" />
  </svg>
);

// Hourglass — amber/warm, Academic Pressure & Time
const IconHourglass = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" fill="#FFFBEB" />
    <path d="M17 10 H39 L28 28 L39 46 H17 L28 28 Z"
      fill="#F59E0B" fillOpacity="0.15" stroke="#F59E0B" strokeWidth="1.8" strokeLinejoin="round" />
    <line x1="14" y1="10" x2="42" y2="10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <line x1="14" y1="46" x2="42" y2="46" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    <path d="M22 10 L28 20 L34 10" fill="#F59E0B" fillOpacity="0.3" />
    <path d="M21 40 Q28 35 35 40" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <circle cx="28" cy="28" r="2.5" fill="#F59E0B" />
  </svg>
);

// Orbit — emerald/gold, Knowledge System & Community
const IconOrbit = ({ size = 32 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <circle cx="28" cy="28" r="26" fill="#ECFDF5" />
    <circle cx="28" cy="28" r="6" fill="#10B981" fillOpacity="0.3" />
    <circle cx="28" cy="28" r="3" fill="#10B981" />
    <ellipse cx="28" cy="28" rx="20" ry="9" stroke="#10B981" strokeWidth="1.8" fill="none" />
    <ellipse cx="28" cy="28" rx="20" ry="9" stroke="#FFD700" strokeWidth="1.5" fill="none"
      transform="rotate(60 28 28)" strokeDasharray="3 2" />
    <ellipse cx="28" cy="28" rx="20" ry="9" stroke="#002147" strokeWidth="1" fill="none" strokeOpacity="0.3"
      transform="rotate(120 28 28)" strokeDasharray="2 3" />
    <circle cx="44" cy="20" r="3" fill="#FFD700" />
    <circle cx="12" cy="36" r="2" fill="#002147" fillOpacity="0.5" />
  </svg>
);

// ── Floating icon layout — balanced composition ────────────────────────────
const SVG_ICONS = [IconAnonymity, IconMentorship, IconThreads, IconCompass, IconHourglass, IconOrbit];

const FLOATING_ICONS = [
  // Left column — staggered vertically, never past left: 10%
  { iconIndex: 0, top: "12%", left: "3%", size: 48, delay: "0s", duration: "6s" },
  { iconIndex: 1, top: "48%", left: "5%", size: 44, delay: "1.8s", duration: "7s" },
  { iconIndex: 4, top: "78%", left: "4%", size: 40, delay: "3.2s", duration: "5.5s" },
  // Right column — staggered vertically, never past right: 10% (left > 88%)
  { iconIndex: 3, top: "10%", left: "90%", size: 44, delay: "1s", duration: "7.5s" },
  { iconIndex: 2, top: "44%", left: "88%", size: 48, delay: "0.5s", duration: "6s" },
  { iconIndex: 5, top: "74%", left: "91%", size: 42, delay: "2.4s", duration: "8s" },
];

const STATS = [
  { value: "12K+", label: "Students", color: "#FFD700" },
  { value: "98%", label: "Safe & Anonymous", color: "#10B981" },
  { value: "200+", label: "Universities", color: "#7C3AED" },
  { value: "4.9★", label: "Student Rated", color: "#F59E0B" },
];

const FEATURES = [
  {
    icon: <IconAnonymity size={48} />,
    title: "Anonymous by Default",
    desc: "Post, ask, and discuss without ever revealing who you are. Your identity, your choice.",
    accent: "#0E9F8E",
    bg: "linear-gradient(135deg, #E8F8F5 0%, #fff 100%)",
  },
  {
    icon: <IconMentorship size={48} />,
    title: "Mentorship Bridge",
    desc: "Connect with verified alumni and senior students in your exact field of study.",
    accent: "#7C3AED",
    bg: "linear-gradient(135deg, #F3F0FF 0%, #fff 100%)",
  },
  {
    icon: <IconThreads size={48} />,
    title: "Subject Threads",
    desc: "Course-specific discussion boards built for focused, high-quality academic exchange.",
    accent: "#FF6B6B",
    bg: "linear-gradient(135deg, #FFF0ED 0%, #fff 100%)",
  },
];

interface LandingPageProps {
  isAuthenticated: boolean;
  onAuthSuccess: () => void;
}

export default function LandingPage({ isAuthenticated, onAuthSuccess }: LandingPageProps) {
  const navigate = useNavigate();
  const [signInOpen, setSignInOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/feed");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div style={s.page}>
      <style>{css}</style>

      {/* ── NAV ── */}
      <nav style={s.nav}>
        <div style={s.navLogo}>
          <svg width="30" height="30" viewBox="0 0 56 56" fill="none" style={{ flexShrink: 0 }}>
            <polygon points="28,4 50,17 50,39 28,52 6,39 6,17"
              fill="#002147" fillOpacity="0.06" stroke="#002147" strokeWidth="1.5" />
            <polygon points="28,13 42,21 42,35 28,43 14,35 14,21"
              fill="none" stroke="#FFD700" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="5" fill="#FFD700" />
          </svg>
          <span style={s.navLogoText}>
            Grad<span style={s.navLogoAccent}>Edge</span>
          </span>
        </div>
        <div style={s.navLinks}>
          {["About", "Features", "Community"].map(l => (
            <span key={l} style={s.navLink} className="nav-link">{l}</span>
          ))}
        </div>
        <div style={s.navCtas}>
          <button style={s.navSignIn} className="nav-signin" onClick={() => setSignInOpen(true)}>
            Sign In
          </button>
          <button style={s.navSignUp} className="nav-signup" onClick={() => setRegisterOpen(true)}>
            Request Access
          </button>
        </div>
      </nav>

      {/* ── HERO — InfiniteGrid ── */}
      <InfiniteGrid
        navHeight={68}
        overlay={
          <>
            {/* Floating icon cards */}
            {FLOATING_ICONS.map((ic, i) => {
              const Icon = SVG_ICONS[ic.iconIndex];
              return (
                <div key={i} className="float-icon" style={{
                  position: "absolute", top: ic.top, left: ic.left,
                  width: ic.size + 24, height: ic.size + 24,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  animation: `floatBob ${ic.duration} ${ic.delay} ease-in-out infinite`,
                  userSelect: "none", transition: "transform 0.3s ease",
                  backdropFilter: "blur(10px)",
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 20,
                  border: "1px solid rgba(255,255,255,0.10)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.35), 0 1px 2px rgba(255,255,255,0.04)",
                }}>
                  <Icon size={ic.size} />
                </div>
              );
            })}

            {/* Gold sparkles */}
            {[
              { top: "14%", left: "28%", big: true },
              { top: "22%", left: "72%", big: false },
              { top: "66%", left: "24%", big: false },
              { top: "72%", left: "68%", big: true },
              { top: "44%", left: "50%", big: false },
            ].map((sp, i) => (
              <div key={i} style={{
                position: "absolute", top: sp.top, left: sp.left,
                width: sp.big ? 12 : 7, height: sp.big ? 12 : 7,
                background: "#FFD700",
                clipPath: "polygon(50% 0%,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)",
                animation: `twinkle ${2.5 + i * 0.5}s ${i * 0.4}s ease-in-out infinite`,
              }} />
            ))}
          </>
        }
      >
        {/* Hero content — centred, buttons fully clickable */}
        <div style={s.heroContent}>
          <div style={s.badge}>
            <span style={s.badgeDot} />
            The Student Safe Haven
          </div>

          <h1 style={s.heroTitle}>
            Where Students{" "}
            <span style={s.heroHighlight}>
              <span style={s.heroHighlightBg as React.CSSProperties} />
              Thrive Together
            </span>
          </h1>

          <p style={s.heroSub}>
            Anonymous mentorship. Real academic discussions.
            <br />
            Built exclusively for university students.
          </p>

          <div style={s.heroCtas}>
            <button style={s.ctaPrimary} className="cta-primary"
              onClick={() => setRegisterOpen(true)}>
              Request Access →
            </button>
            <button style={s.ctaSecondary} className="cta-secondary"
              onClick={() => setSignInOpen(true)}>
              Sign In
            </button>
          </div>

          <p style={s.heroNote}>
            🔒 Verified students only · Anonymous by default
          </p>
        </div>
      </InfiniteGrid>

      {/* ── STATS ── */}
      <section style={s.statsSection}>
        <div style={s.statsGrid}>
          {STATS.map((st) => (
            <div key={st.label} style={s.statItem}>
              <span style={{ ...s.statValue, color: st.color }}>{st.value}</span>
              <span style={s.statLabel}>{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={s.featuresSection}>
        <p style={s.featuresEyebrow}>⬤ WHY GRADEDGE</p>
        <h2 style={s.featuresTitle}>Built for the modern student</h2>
        <div style={s.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} style={{ ...s.featureCard, background: f.bg }}
              className="feature-card">
              <div style={s.featureIconWrap}>
                {f.icon}
              </div>
              <div style={{ ...s.featureAccentLine, backgroundColor: f.accent }} />
              <h3 style={{ ...s.featureTitle, color: f.accent }}>{f.title}</h3>
              <p style={s.featureDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section style={s.ctaBanner}>
        <div style={s.ctaBannerOrb1} />
        <div style={s.ctaBannerOrb2} />
        <div style={s.ctaBannerInner}>
          <div style={s.ctaBannerBadge}>✦ JOIN THE COMMUNITY</div>
          <h2 style={s.ctaBannerTitle}>Ready to get your edge?</h2>
          <p style={s.ctaBannerSub}>
            Join thousands of students already inside.
          </p>
          <button style={s.ctaBannerBtn} className="cta-primary"
            onClick={() => navigate("/auth?mode=register")}>
            Request Access →
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={s.footer}>
        <span style={s.footerLogo}>
          Grad<span style={{ color: "#FFD700" }}>Edge</span>
        </span>
        <span style={s.footerNote}>© 2026 · Built for students, by students.</span>
      </footer>
      {/* ── Auth Dialogs ── */}
      <SignInDialog
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onSwitchToRegister={() => setRegisterOpen(true)}
        onAuthSuccess={onAuthSuccess}
      />
      <RegisterDialog
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        onSwitchToSignIn={() => setSignInOpen(true)}
      />

    </div>
  );
}

// ── CSS ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

  @keyframes floatBob {
    0%   { transform: translateY(0px);   }
    50%  { transform: translateY(-14px); }
    100% { transform: translateY(0px);   }
  }
  @keyframes twinkle {
    0%, 100% { opacity: 0.25; transform: scale(0.8) rotate(0deg);  }
    50%       { opacity: 1;   transform: scale(1.3) rotate(20deg); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0);    }
  }

  .cta-primary:hover {
    transform: translateY(-3px) scale(1.02) !important;
    box-shadow: 0 16px 48px rgba(255,215,0,0.55) !important;
  }
  .cta-secondary:hover {
    background: rgba(255,255,255,0.12) !important;
    border-color: rgba(255,255,255,0.3) !important;
  }
  .nav-link:hover { color: rgba(255,255,255,0.9) !important; }
  .nav-signin:hover { color: #fff !important; opacity: 0.9; }
  .nav-signup:hover { opacity: 0.88; transform: translateY(-1px); }
  .feature-card:hover {
    transform: translateY(-8px) !important;
    box-shadow: 0 24px 64px rgba(0,33,71,0.13) !important;
  }
`;

// ── Styles ─────────────────────────────────────────────────────────────────
const OXFORD = "#002147";
const GOLD = "#FFD700";

const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#F8FAFC",
    fontFamily: "'DM Sans', sans-serif",
    color: OXFORD,
    overflowX: "hidden",
  },

  // Nav — dark to match midnight hero
  nav: {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 52px", height: 68,
    backgroundColor: "rgba(0,12,26,0.85)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid rgba(255,255,255,0.07)",
  },
  navLogo: { display: "flex", alignItems: "center", gap: 10 },
  navLogoText: {
    fontSize: 22, fontWeight: 800, color: "#F0EDE6",
    fontFamily: "'Playfair Display', serif", letterSpacing: "-0.5px",
  },
  navLogoAccent: { color: GOLD },
  navLinks: { display: "flex", gap: 40 },
  navLink: {
    fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.45)",
    cursor: "pointer", letterSpacing: "0.02em", transition: "color 0.15s",
  },
  navCtas: { display: "flex", alignItems: "center", gap: 10 },
  navSignIn: {
    padding: "8px 18px", borderRadius: 8, border: "none",
    background: "transparent", color: "rgba(255,255,255,0.7)", fontSize: 14,
    fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    transition: "opacity 0.15s",
  },
  navSignUp: {
    padding: "9px 22px", borderRadius: 8,
    border: `1.5px solid ${GOLD}`,
    background: GOLD, color: "#000c1a", fontSize: 14,
    fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.15s",
  },

  // Hero content (inside InfiniteGrid)
  heroContent: {
    position: "relative", zIndex: 10,
    textAlign: "center", maxWidth: 740, padding: "0 24px",
    margin: "0 auto",
    animation: "fadeUp 0.9s ease both",
  },
  badge: {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "7px 18px", borderRadius: 999,
    backgroundColor: "rgba(255,215,0,0.10)",
    border: "1px solid rgba(255,215,0,0.30)",
    fontSize: 11, fontWeight: 700, letterSpacing: "0.14em",
    color: "rgba(255,215,0,0.85)", textTransform: "uppercase", marginBottom: 28,
  },
  badgeDot: {
    width: 7, height: 7, borderRadius: "50%",
    backgroundColor: GOLD, flexShrink: 0,
    boxShadow: `0 0 10px ${GOLD}`,
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "clamp(42px, 6.5vw, 76px)",
    fontWeight: 900, lineHeight: 1.08,
    color: "#F0EDE6", // warm off-white — legible on midnight
    margin: "0 0 24px", letterSpacing: "-1.5px",
  },
  heroHighlight: {
    position: "relative", display: "inline-block", whiteSpace: "nowrap",
  },
  heroHighlightBg: {
    position: "absolute", bottom: 6, left: -6, right: -6,
    height: "36%", backgroundColor: GOLD, opacity: 0.45,
    borderRadius: 4, zIndex: -1,
  },
  heroSub: {
    fontSize: 18, lineHeight: 1.75,
    color: "rgba(255,255,255,0.45)", // muted white
    margin: "0 0 44px", fontWeight: 400,
  },
  heroCtas: { display: "flex", gap: 14, justifyContent: "center", marginBottom: 22 },
  ctaPrimary: {
    padding: "15px 38px", borderRadius: 10, border: "none",
    backgroundColor: GOLD, color: "#000c1a", fontSize: 15,
    fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    boxShadow: "0 4px 32px rgba(255,215,0,0.40)",
    transition: "all 0.22s ease",
  },
  ctaSecondary: {
    padding: "15px 38px", borderRadius: 10,
    border: "1.5px solid rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(8px)",
    color: "#F0EDE6", fontSize: 15, fontWeight: 600,
    cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    transition: "all 0.2s ease",
  },
  heroNote: {
    fontSize: 12, color: "rgba(255,255,255,0.25)",
    fontWeight: 500, letterSpacing: "0.04em",
  },

  // Stats
  statsSection: {
    background: `linear-gradient(135deg, ${OXFORD} 0%, #001530 100%)`,
    padding: "52px 48px",
  },
  statsGrid: {
    maxWidth: 960, margin: "0 auto",
    display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
  },
  statItem: {
    display: "flex", flexDirection: "column", alignItems: "center",
    gap: 8, padding: "0 24px",
    borderRight: "1px solid rgba(255,255,255,0.08)",
  },
  statValue: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 38, fontWeight: 700, lineHeight: 1,
  },
  statLabel: {
    fontSize: 11, fontWeight: 600, letterSpacing: "0.1em",
    color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
  },

  // Features
  featuresSection: {
    padding: "110px 48px",
    maxWidth: 1120, margin: "0 auto", textAlign: "center",
  },
  featuresEyebrow: {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
    color: "#c9a800", textTransform: "uppercase", marginBottom: 14,
  },
  featuresTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 42, fontWeight: 700, color: OXFORD,
    margin: "0 0 60px", letterSpacing: "-0.5px",
  },
  featuresGrid: {
    display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 28,
  },
  featureCard: {
    padding: "40px 36px", borderRadius: 24,
    border: "1px solid rgba(0,33,71,0.07)",
    boxShadow: "0 4px 28px rgba(0,33,71,0.07)",
    textAlign: "left", transition: "all 0.3s ease", cursor: "default",
  },
  featureIconWrap: {
    marginBottom: 24,
    display: "inline-flex",
    padding: "10px",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    boxShadow: "0 2px 12px rgba(0,33,71,0.08)",
  },
  featureAccentLine: {
    width: 32, height: 3, borderRadius: 2, marginBottom: 16,
  },
  featureTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 21, fontWeight: 700,
    margin: "0 0 12px",
  },
  featureDesc: {
    fontSize: 14, lineHeight: 1.8,
    color: "rgba(0,33,71,0.55)", margin: 0,
  },

  // CTA banner
  ctaBanner: {
    position: "relative",
    background: `linear-gradient(135deg, ${OXFORD} 0%, #003580 50%, #001a3d 100%)`,
    padding: "100px 48px", textAlign: "center", overflow: "hidden",
  },
  ctaBannerOrb1: {
    position: "absolute", top: "-30%", left: "20%",
    width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(255,215,0,0.1) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaBannerOrb2: {
    position: "absolute", bottom: "-20%", right: "15%",
    width: 400, height: 400, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaBannerInner: { maxWidth: 600, margin: "0 auto", position: "relative", zIndex: 1 },
  ctaBannerBadge: {
    display: "inline-block",
    fontSize: 11, fontWeight: 700, letterSpacing: "0.18em",
    color: GOLD, marginBottom: 20, opacity: 0.8,
  },
  ctaBannerTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 44, fontWeight: 700, color: "#fff",
    margin: "0 0 14px", letterSpacing: "-0.5px",
  },
  ctaBannerSub: {
    fontSize: 16, color: "rgba(255,255,255,0.5)", margin: "0 0 40px",
  },
  ctaBannerBtn: {
    padding: "16px 44px", borderRadius: 10, border: "none",
    backgroundColor: GOLD, color: OXFORD, fontSize: 15,
    fontWeight: 700, cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
    letterSpacing: "0.02em",
    boxShadow: "0 4px 32px rgba(255,215,0,0.4)",
    transition: "all 0.22s ease",
  },

  // Footer
  footer: {
    padding: "28px 52px",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    borderTop: "1px solid rgba(0,33,71,0.07)",
    backgroundColor: "#F8FAFC",
  },
  footerLogo: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18, fontWeight: 700, color: OXFORD,
  },
  footerNote: {
    fontSize: 12, color: "rgba(0,33,71,0.32)", fontWeight: 500,
  },
};