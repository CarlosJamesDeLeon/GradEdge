import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BEGIN_URL = 'https://begin-blue.vercel.app/';

export default function FocusPage() {
  const navigate = useNavigate();
  const [loadState, setLoadState] = useState<'loading' | 'loaded'>('loading');
  const [showReturn, setShowReturn] = useState(false);
  const [returnHovered, setReturnHovered] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  // Controls hiding the button if user navigates deeper into Begin
  const [isBeginDashboard, setIsBeginDashboard] = useState(true); 

  // Listen for route changes sent by the Begin app via postMessage
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Ensure we only listen to messages from our trusted Begin app
      if (
        event.origin === 'https://begin-blue.vercel.app' || 
        event.origin.includes('localhost')
      ) {
        if (event.data?.type === 'ROUTE_CHANGE') {
          const currentPath = event.data.path;
          // Enable the button only on the primary dashboard views
          if (currentPath === '/' || currentPath === '/dashboard' || currentPath === '') {
            setIsBeginDashboard(true);
          } else {
            setIsBeginDashboard(false);
          }
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Delay the return pill so it doesn't flash during the transition
  useEffect(() => {
    const t = setTimeout(() => setShowReturn(true), 900);
    return () => clearTimeout(t);
  }, []);

  const handleReturn = () => {
    setIsExiting(true);
    setTimeout(() => {
      navigate('/feed', { state: { fromFocus: true } });
    }, 650);
  };

  const isVisible = showReturn && isBeginDashboard;

  return (
    <div
      id="focus-page-root"
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'fixed',
        top: 0,
        left: 0,
        background: '#FAFAF8',
        zIndex: 9999,
      }}
    >
      {/* ── Light-leak transition overlay ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 9999,
          background:
            'radial-gradient(ellipse at 30% 50%, #FFFEF7 0%, #F5F0E8 35%, #EDE8DC 65%, #E0D8CC 100%)',
          animation: isExiting
            ? 'lightLeakIn 650ms cubic-bezier(0.25, 0, 0.1, 1) forwards'
            : 'lightLeakOut 700ms cubic-bezier(0.4, 0, 0.6, 1) forwards',
          pointerEvents: isExiting ? 'all' : 'none',
        }}
      />

      {/* ── Hairline accent bar — echoes Begin's warm tone ── */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background:
            'linear-gradient(90deg, transparent 0%, #C8B99A 20%, #A0876A 50%, #C8B99A 80%, transparent 100%)',
          opacity: loadState === 'loaded' ? 0.45 : 0,
          transition: 'opacity 1.2s ease',
          zIndex: 20,
          pointerEvents: 'none',
        }}
      />

      {/* ── Loading state — Begin-inspired minimalism ── */}
      {loadState === 'loading' && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 15,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#FAFAF8',
            gap: 28,
          }}
        >
          {/* Orbital spinner */}
          <div style={{ position: 'relative', width: 56, height: 56 }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '50%',
                border: '1.5px solid #EDE8E1',
                borderTop: '1.5px solid #8B7355',
                animation: 'focusSpin 1.1s linear infinite',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 8,
                borderRadius: '50%',
                border: '1px solid #EDE8E1',
                borderBottom: '1px solid #C8B99A',
                animation: 'focusSpin 1.8s linear infinite reverse',
              }}
            />
            {/* Centre dot */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#A0876A',
              }}
            />
          </div>

          {/* Copy — matches Begin's "Afternoon, let's begin" tone */}
          <div style={{ textAlign: 'center' }}>
            <p
              style={{
                fontSize: 22,
                fontWeight: 300,
                color: '#2D2520',
                fontFamily: "'Georgia', 'Times New Roman', serif",
                margin: '0 0 6px',
                letterSpacing: '-0.3px',
              }}
            >
              Opening your Focus space
            </p>
            <p
              style={{
                fontSize: 11,
                color: '#B5AFA7',
                fontFamily: 'system-ui, -apple-system, sans-serif',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              begin-blue.vercel.app
            </p>
          </div>

          {/* Indeterminate progress track */}
          <div
            style={{
              width: 140,
              height: 1,
              background: '#EDE8E1',
              borderRadius: 1,
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '40%',
                background: 'linear-gradient(90deg, transparent, #8B7355, transparent)',
                borderRadius: 1,
                animation: 'focusProgress 1.8s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      )}

      {/* ── The Begin iframe ── */}
      <iframe
        src={BEGIN_URL}
        id="begin-iframe"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
          opacity: loadState === 'loaded' ? 1 : 0,
          transition: 'opacity 500ms ease',
        }}
        onLoad={() => setLoadState('loaded')}
        title="Begin — Focus Space"
        allow="fullscreen; clipboard-write; clipboard-read"
      />

      {/* ── Return to GradEdge pill ───────────────────────────────────────── */}
      <button
        id="focus-return-btn"
        onClick={handleReturn}
        onMouseEnter={() => setReturnHovered(true)}
        onMouseLeave={() => setReturnHovered(false)}
        style={{
          position: 'absolute',
          bottom: 24,
          left: 24,
          zIndex: 30,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 18px 8px 14px',
          borderRadius: 999,
          border: returnHovered ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid rgba(0, 33, 71, 0.08)',
          background: returnHovered
            ? '#001A36'
            : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          cursor: 'pointer',
          fontSize: 12,
          fontWeight: 700,
          color: returnHovered ? '#FFD700' : '#002147',
          letterSpacing: '0.02em',
          opacity: isVisible ? 1 : 0,
          pointerEvents: isVisible ? 'all' : 'none',
          transform: isVisible ? (returnHovered ? 'translateY(-2px)' : 'translateY(0)') : 'translateY(12px)',
          transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          fontFamily: "'DM Sans', system-ui, sans-serif",
          boxShadow: returnHovered
            ? '0 8px 24px rgba(0, 33, 71, 0.25), inset 0 0 0 1px rgba(255, 215, 0, 0.1)'
            : '0 4px 12px rgba(0, 33, 71, 0.06), 0 2px 4px rgba(0, 33, 71, 0.03)',
          userSelect: 'none',
        }}
        title="Return to GradEdge"
        aria-label="Return to GradEdge"
      >
        <ArrowLeft
          size={14}
          strokeWidth={2.5}
          style={{ 
            transition: 'all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)', 
            transform: returnHovered ? 'translateX(-3px)' : 'none',
            color: returnHovered ? '#FFD700' : '#002147',
            opacity: returnHovered ? 1 : 0.7 
          }}
        />
        <span>Exit Focus</span>
      </button>

      {/* ── Inline keyframes for loading animations ── */}
      <style>{`
        @keyframes focusSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes focusProgress {
          0%   { transform: translateX(-250%); }
          100% { transform: translateX(450%); }
        }
      `}</style>
    </div>
  );
}
