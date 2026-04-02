// /components/ui/the-infinite-grid.tsx
// GradEdge Dark Hero — Midnight Blue bg, white grid lines, Oxford cursor glow
// Dependency: framer-motion  →  npm install framer-motion

import React from "react";
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
  MotionValue,
} from "framer-motion";

interface InfiniteGridProps {
  children: React.ReactNode;
  overlay?: React.ReactNode;
  navHeight?: number;
}

export const InfiniteGrid: React.FC<InfiniteGridProps> = ({
  children,
  overlay,
  navHeight = 68,
}) => {
  const mouseX = useMotionValue(-9999); // start off-screen so no reveal on load
  const mouseY = useMotionValue(-9999);
  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  // Perpetual slow scroll
  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.35) % 48);
    gridOffsetY.set((gridOffsetY.get() + 0.35) % 48);
  });

  // Cursor glow: the revealed layer blends an Oxford Blue radial wash
  // so the grid "lights up" with a cool blue energy around the cursor
  const maskImage = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, black 0%, transparent 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        paddingTop: navHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundColor: "#000c1a", // deep matte Midnight Blue
      }}
    >
      {/* ── Layer 1: baseline grid — always visible, very faint white ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          stroke="rgba(255,255,255,0.08)"
          patternId="grid-base"
        />
      </div>

      {/* ── Layer 2: cursor-revealed grid + Oxford Blue glow wash ── */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 1,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        {/* Brighter white grid under cursor */}
        <GridPattern
          offsetX={gridOffsetX}
          offsetY={gridOffsetY}
          stroke="rgba(255,255,255,0.55)"
          patternId="grid-reveal"
        />
        {/* Oxford Blue energy wash — the "energized" feeling around cursor */}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,33,71,0.15)",
          pointerEvents: "none",
        }} />
      </motion.div>

      {/* ── Layer 3: atmospheric glow orbs ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }}>
        {/* Academic Gold — top centre, main warmth source */}
        <div style={{
          position: "absolute", top: "-10%", left: "50%",
          transform: "translateX(-50%)",
          width: 800, height: 800, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,160,89,0.20) 0%, transparent 60%)",
        }} />
        {/* Soft gold secondary — bottom left */}
        <div style={{
          position: "absolute", bottom: "-15%", left: "-5%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,160,89,0.10) 0%, transparent 65%)",
        }} />
        {/* Oxford Blue deep right — anchors the dark side */}
        <div style={{
          position: "absolute", top: "10%", right: "-8%",
          width: 560, height: 560, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,33,71,0.55) 0%, transparent 70%)",
        }} />
        {/* Subtle teal — far left mid */}
        <div style={{
          position: "absolute", top: "35%", left: "-8%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,159,142,0.10) 0%, transparent 70%)",
        }} />
      </div>

      {/* ── Layer 4: overlay (floating icons, sparkles) ── */}
      {overlay && (
        <div style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" }}>
          {overlay}
        </div>
      )}

      {/* ── Layer 5: hero content — buttons fully clickable ── */}
      <div style={{ position: "relative", zIndex: 10, width: "100%" }}>
        {children}
      </div>
    </div>
  );
};

// ── GridPattern ───────────────────────────────────────────────────────────
interface GridPatternProps {
  offsetX: MotionValue<number>;
  offsetY: MotionValue<number>;
  stroke: string;
  patternId: string;
}

const GridPattern: React.FC<GridPatternProps> = ({ offsetX, offsetY, stroke, patternId }) => (
  <svg style={{ width: "100%", height: "100%" }}>
    <defs>
      <motion.pattern
        id={patternId}
        width="48"
        height="48"
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path
          d="M 48 0 L 0 0 0 48"
          fill="none"
          stroke={stroke}
          strokeWidth="1"
        />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${patternId})`} />
  </svg>
);