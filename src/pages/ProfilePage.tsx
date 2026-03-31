import React, { useState, useRef } from "react";

// ── Constants ──────────────────────────────────────────────────────────────
const OXFORD = "#002147";
const GOLD = "#FFD700";
const GOLD_DARK = "#c9a800";
const SURFACE = "#F8FAFC";
const CARD_BG = "#FFFFFF";
const BORDER = "#E2E8F0";
const MUTED = "#64748B";

const VIBE_STATUSES = [
  { id: "studying", label: "Studying", icon: "📖" },
  { id: "resting", label: "Resting", icon: "🌙" },
  { id: "eating", label: "Eating", icon: "🍽️" },
  { id: "in-class", label: "In Class", icon: "🏛️" },
];

// ── Main Component ─────────────────────────────────────────────────────────
export default function ProfilePage() {

  // Identity
  const [displayName, setDisplayName] = useState("Janet Doe");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Read-only
  const major = "Computer Science";
  const yearLevel = "3rd Year";

  // Vibe
  const [vibeStatus, setVibeStatus] = useState("studying");

  // Password
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Privacy
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [dmPermissions, setDmPermissions] = useState(true);

  // Save flash
  const [saveFlash, setSaveFlash] = useState(false);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAvatarUrl(URL.createObjectURL(file));
  };

  const handlePasswordReset = () => {
    setPasswordError("");
    setPasswordSuccess("");
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError("All password fields are required."); return;
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters."); return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match."); return;
    }
    setPasswordSuccess("Password updated successfully.");
    setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
  };

  const handleSaveAll = () => {
    const payload = { displayName, avatarUrl, vibeStatus, anonymousMode, dmPermissions };
    console.log("GradEdge :: Save Payload →", payload);
    setSaveFlash(true);
    setTimeout(() => setSaveFlash(false), 2000);
  };

  // ── Render ────────────────────────────────────────────────────────────────
  const activeVibe = VIBE_STATUSES.find((v) => v.id === vibeStatus);

  return (
    <div style={s.wrapper}>

      {/* Page Header */}
      <div style={s.pageHeader}>
        <p style={s.pageLabel}>⬤ MY PROFILE</p>
        <h1 style={s.pageTitle}>Identity Hub</h1>
      </div>

      <div style={s.grid}>

        {/* ── Card 1: Identity ── */}
        <div style={s.card}>
          <SectionLabel>Identity</SectionLabel>

          {/* Avatar */}
          <div style={s.avatarRow}>
            <div style={s.avatarWrap} onClick={() => fileInputRef.current?.click()}>
              {avatarUrl
                ? <img src={avatarUrl} alt="avatar" style={s.avatarImg} />
                : <div style={s.avatarInitials}>JD</div>
              }
              <div style={s.avatarOverlay}><span style={s.avatarOverlayTxt}>CHANGE</span></div>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*"
              style={{ display: "none" }} onChange={handleAvatarChange} />
            <div>
              <p style={s.avatarHint}>Click avatar to upload</p>
              <p style={s.avatarSub}>JPG, PNG — max 5MB</p>
            </div>
          </div>

          {/* Display Name */}
          <Field label="Display Name">
            {editingName
              ? <input autoFocus value={displayName} style={s.input}
                onChange={(e) => setDisplayName(e.target.value)}
                onBlur={() => setEditingName(false)}
                onKeyDown={(e) => e.key === "Enter" && setEditingName(false)} />
              : <div style={s.readRow}>
                <span style={s.readVal}>{displayName}</span>
                <button style={s.editBtn} onClick={() => setEditingName(true)}>Edit</button>
              </div>
            }
          </Field>

          <Field label="Major">
            <div style={s.readOnly}>{major}</div>
          </Field>

          <Field label="Year Level">
            <div style={s.readOnly}>{yearLevel}</div>
          </Field>
        </div>

        {/* ── Card 2: Vibe Status ── */}
        <div style={s.card}>
          <SectionLabel>Vibe Status</SectionLabel>
          <p style={s.cardSub}>Let your peers know what you&apos;re up to right now.</p>

          <div style={s.vibeGrid}>
            {VIBE_STATUSES.map((v) => (
              <button key={v.id} style={{ ...s.vibeBtn, ...(vibeStatus === v.id ? s.vibeBtnOn : {}) }}
                onClick={() => setVibeStatus(v.id)}>
                <span style={s.vibeIcon}>{v.icon}</span>
                <span style={s.vibeLabel}>{v.label}</span>
                {vibeStatus === v.id && <span style={s.vibeDot} />}
              </button>
            ))}
          </div>

          <div style={s.vibeBadge}>
            <span style={s.vibeBadgeLabel}>CURRENT STATUS</span>
            <span style={s.vibeBadgeValue}>{activeVibe?.icon} {activeVibe?.label}</span>
          </div>
        </div>

        {/* ── Card 3: Security ── */}
        <div style={s.card}>
          <SectionLabel>Security</SectionLabel>

          <Field label="Current Password">
            <input type="password" value={currentPassword} style={s.input}
              placeholder="Enter current password"
              onChange={(e) => setCurrentPassword(e.target.value)} />
          </Field>
          <Field label="New Password">
            <input type="password" value={newPassword} style={s.input}
              placeholder="Min. 8 characters"
              onChange={(e) => setNewPassword(e.target.value)} />
          </Field>
          <Field label="Confirm New Password">
            <input type="password" value={confirmPassword} style={s.input}
              placeholder="Repeat new password"
              onChange={(e) => setConfirmPassword(e.target.value)} />
          </Field>

          {passwordError && <p style={s.errorMsg}>⚠ {passwordError}</p>}
          {passwordSuccess && <p style={s.successMsg}>✓ {passwordSuccess}</p>}

          <button style={s.secondaryBtn} onClick={handlePasswordReset}>
            Update Password
          </button>
        </div>

        {/* ── Card 4: Privacy ── */}
        <div style={s.card}>
          <SectionLabel>Privacy &amp; Permissions</SectionLabel>

          <Toggle
            label="Anonymous Mode"
            description="Hide your identity across all threads and discussions globally."
            value={anonymousMode}
            onChange={setAnonymousMode}
          />

          <div style={s.divider} />

          <Toggle
            label="Direct Messaging"
            description="Allow other verified students to send you direct messages."
            value={dmPermissions}
            onChange={setDmPermissions}
          />

          {anonymousMode && (
            <div style={s.anonBanner}>
              <span style={{ fontSize: 18 }}>🕵️</span>
              <span>Anonymous Mode is <strong>ON</strong>. Your identity is hidden globally.</span>
            </div>
          )}
        </div>

        {/* ── Card 5: Save Bar ── */}
        <div style={{ ...s.card, ...s.saveCard, gridColumn: "1 / -1" }}>
          <div style={s.saveRow}>
            <div>
              <p style={s.saveTitle}>Ready to lock in your changes?</p>
              <p style={s.saveSub}>All profile updates, vibe status, and privacy settings will be saved.</p>
            </div>
            <button
              style={{ ...s.saveBtn, ...(saveFlash ? s.saveBtnFlash : {}) }}
              onClick={handleSaveAll}
            >
              {saveFlash ? "✓ Saved!" : "Save All Changes"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
      <span style={{ display: "block", width: 20, height: 3, backgroundColor: GOLD, borderRadius: 2 }} />
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: "0.15em",
        color: OXFORD, textTransform: "uppercase", fontFamily: "Inter, Roboto, sans-serif"
      }}>
        {children}
      </span>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 700,
        letterSpacing: "0.1em", color: MUTED, textTransform: "uppercase",
        marginBottom: 6, fontFamily: "Inter, Roboto, sans-serif"
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Toggle({ label, description, value, onChange }: { label: string; description: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: OXFORD, margin: 0 }}>{label}</p>
        <p style={{ fontSize: 12, color: MUTED, margin: "3px 0 0", lineHeight: 1.4 }}>{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        aria-pressed={value}
        style={{
          width: 48, height: 28, borderRadius: 14, border: "none", cursor: "pointer",
          position: "relative", transition: "background 0.2s", flexShrink: 0,
          backgroundColor: value ? OXFORD : "#CBD5E1",
        }}
      >
        <span style={{
          position: "absolute", top: 4, left: 4, width: 20, height: 20, borderRadius: "50%",
          backgroundColor: "#fff", transition: "transform 0.2s",
          boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          transform: value ? "translateX(22px)" : "translateX(2px)",
        }} />
      </button>
    </div>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────
const s: any = {
  wrapper: {
    fontFamily: "Inter, Roboto, sans-serif",
    color: OXFORD,
  },
  pageHeader: { marginBottom: 32 },
  pageLabel: {
    fontSize: 11, letterSpacing: "0.15em", color: GOLD_DARK,
    fontWeight: 600, marginBottom: 6,
  },
  pageTitle: {
    fontSize: 32, fontWeight: 700, color: OXFORD,
    margin: 0, letterSpacing: "-0.5px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: 24,
  },
  card: {
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: "28px 32px",
    border: `1px solid ${BORDER}`,
    boxShadow: "0 1px 4px rgba(0,33,71,0.06)",
  },
  cardSub: { fontSize: 13, color: MUTED, marginTop: -14, marginBottom: 20, lineHeight: 1.5 },

  // Avatar
  avatarRow: {
    display: "flex", alignItems: "center", gap: 18, marginBottom: 24,
    padding: 16, backgroundColor: SURFACE, borderRadius: 12,
    border: `1px dashed ${BORDER}`,
  },
  avatarWrap: {
    width: 64, height: 64, borderRadius: "50%", overflow: "hidden",
    backgroundColor: OXFORD, position: "relative", cursor: "pointer",
    flexShrink: 0, border: `3px solid ${GOLD}`,
  },
  avatarImg: { width: "100%", height: "100%", objectFit: "cover" },
  avatarInitials: {
    width: "100%", height: "100%", display: "flex", alignItems: "center",
    justifyContent: "center", color: GOLD, fontWeight: 700,
    fontSize: 20, fontFamily: "Inter, Roboto, sans-serif",
  },
  avatarOverlay: {
    position: "absolute", inset: 0, backgroundColor: "rgba(0,33,71,0.65)",
    display: "flex", alignItems: "center", justifyContent: "center",
    opacity: 0, transition: "opacity 0.2s",
  },
  avatarOverlayTxt: { color: GOLD, fontSize: 9, fontWeight: 700, letterSpacing: "0.1em" },
  avatarHint: { fontSize: 13, color: OXFORD, fontWeight: 600, margin: 0 },
  avatarSub: { fontSize: 11, color: MUTED, margin: "3px 0 0" },

  // Fields
  input: {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: `1.5px solid ${BORDER}`, fontSize: 14, color: OXFORD,
    backgroundColor: SURFACE, fontFamily: "Inter, Roboto, sans-serif",
    outline: "none", boxSizing: "border-box",
  },
  readOnly: {
    padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${BORDER}`,
    fontSize: 14, color: MUTED, backgroundColor: "#F1F5F9",
    fontFamily: "Inter, Roboto, sans-serif",
  },
  readRow: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "10px 14px", borderRadius: 8, border: `1.5px solid ${BORDER}`,
    backgroundColor: SURFACE,
  },
  readVal: { fontSize: 14, color: OXFORD, fontFamily: "Inter, Roboto, sans-serif" },
  editBtn: {
    fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", color: GOLD_DARK,
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "Inter, Roboto, sans-serif", textTransform: "uppercase",
  },

  // Vibe
  vibeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 },
  vibeBtn: {
    display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
    padding: "16px 12px", borderRadius: 12, border: `1.5px solid ${BORDER}`,
    backgroundColor: SURFACE, cursor: "pointer", position: "relative",
    transition: "all 0.15s", fontFamily: "Inter, Roboto, sans-serif",
  },
  vibeBtnOn: {
    border: `1.5px solid ${GOLD}`, backgroundColor: "rgba(255,215,0,0.07)",
    boxShadow: "0 0 0 3px rgba(255,215,0,0.15)",
  },
  vibeIcon: { fontSize: 22 },
  vibeLabel: { fontSize: 12, fontWeight: 600, color: OXFORD },
  vibeDot: {
    position: "absolute", top: 8, right: 8, width: 7, height: 7,
    borderRadius: "50%", backgroundColor: GOLD,
  },
  vibeBadge: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "12px 16px", borderRadius: 10, backgroundColor: OXFORD,
  },
  vibeBadgeLabel: {
    fontSize: 10, fontWeight: 700, letterSpacing: "0.12em",
    color: "rgba(255,255,255,0.45)", textTransform: "uppercase",
  },
  vibeBadgeValue: { fontSize: 14, fontWeight: 600, color: GOLD, fontFamily: "Inter, Roboto, sans-serif" },

  // Password feedback
  errorMsg: {
    fontSize: 12, color: "#DC2626", margin: "-8px 0 12px",
    padding: "8px 12px", backgroundColor: "#FEF2F2",
    borderRadius: 6, border: "1px solid #FECACA",
  },
  successMsg: {
    fontSize: 12, color: "#16A34A", margin: "-8px 0 12px",
    padding: "8px 12px", backgroundColor: "#F0FDF4",
    borderRadius: 6, border: "1px solid #BBF7D0",
  },
  secondaryBtn: {
    padding: "10px 20px", borderRadius: 8, border: `1.5px solid ${OXFORD}`,
    backgroundColor: "transparent", color: OXFORD, fontSize: 13,
    fontWeight: 600, cursor: "pointer", fontFamily: "Inter, Roboto, sans-serif",
    letterSpacing: "0.04em", marginTop: 4,
  },

  // Privacy
  divider: { height: 1, backgroundColor: BORDER, margin: "18px 0" },
  anonBanner: {
    display: "flex", alignItems: "center", gap: 10, marginTop: 18,
    padding: "10px 14px", backgroundColor: "rgba(255,215,0,0.1)",
    border: "1px solid rgba(255,215,0,0.4)", borderRadius: 8,
    fontSize: 12, color: OXFORD, lineHeight: 1.4,
  },

  // Save bar
  saveCard: {
    background: `linear-gradient(135deg, ${OXFORD} 0%, #003a7a 100%)`,
    border: "none",
  },
  saveRow: {
    display: "flex", alignItems: "center",
    justifyContent: "space-between", gap: 24,
  },
  saveTitle: { fontSize: 16, fontWeight: 700, color: "#fff", margin: 0 },
  saveSub: { fontSize: 12, color: "rgba(255,255,255,0.5)", margin: "4px 0 0" },
  saveBtn: {
    padding: "12px 28px", borderRadius: 8, border: "none",
    backgroundColor: GOLD, color: OXFORD, fontSize: 13,
    fontWeight: 700, cursor: "pointer", fontFamily: "Inter, Roboto, sans-serif",
    letterSpacing: "0.04em", transition: "all 0.2s", flexShrink: 0,
  },
  saveBtnFlash: { backgroundColor: "#16A34A", color: "#fff" },
};
