// /components/AuthDialog.tsx
// GradEdge — Midnight Academic auth modals
// Deps: @radix-ui/react-dialog  @radix-ui/react-label  lucide-react

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// ── Shared card skin ──────────────────────────────────────────────────────
const CARD_STYLE: React.CSSProperties = {
    backgroundColor: "#000c1a",
    border: "1px solid rgba(197,160,89,0.20)",
    borderRadius: 20,
    padding: "40px 36px 36px",
    boxShadow: `
    0 0 0 1px rgba(197,160,89,0.08),
    0 0 40px rgba(197,160,89,0.12),
    0 32px 64px rgba(0,0,0,0.6)
  `,
};

// ── Logo mark ─────────────────────────────────────────────────────────────
const LogoMark = () => (
    <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
        <svg width="26" height="26" viewBox="0 0 56 56" fill="none">
            <polygon points="28,4 50,17 50,39 28,52 6,39 6,17"
                fill="#000c1a" stroke="rgba(197,160,89,0.5)" strokeWidth="1.5" />
            <polygon points="28,13 42,21 42,35 28,43 14,35 14,21"
                fill="none" stroke="#C5A059" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="4.5" fill="#C5A059" />
        </svg>
        <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20, fontWeight: 800, letterSpacing: "-0.3px",
            color: "#F0EDE6",
        }}>
            Grad<span style={{ color: "#C5A059" }}>Edge</span>
        </span>
    </div>
);

// ── Divider ───────────────────────────────────────────────────────────────
const Divider = () => (
    <div style={{
        height: 1,
        background: "linear-gradient(90deg, transparent, rgba(197,160,89,0.2), transparent)",
        margin: "24px 0",
    }} />
);

// ── Field wrapper ─────────────────────────────────────────────────────────
const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: 18 }}>
        <Label>{label}</Label>
        {children}
    </div>
);

// ════════════════════════════════════════════════════════════════════════════
// Sign In Modal
// ════════════════════════════════════════════════════════════════════════════
interface SignInDialogProps {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSwitchToRegister: () => void;
    onAuthSuccess?: () => void;
}

export function SignInDialog({ open, onOpenChange, onSwitchToRegister, onAuthSuccess }: SignInDialogProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!email || !password) { setError("Please fill in all fields."); return; }
        if (!email.includes("@")) { setError("Enter a valid institutional email."); return; }
        setLoading(true);
        // TODO: wire to your auth service
        await new Promise(r => setTimeout(r, 800));
        setLoading(false);
        console.log("GradEdge :: Sign In →", { email });
        if (onAuthSuccess) onAuthSuccess();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div style={CARD_STYLE}>
                    <LogoMark />

                    <DialogHeader>
                        <DialogTitle>Welcome back.</DialogTitle>
                        <DialogDescription>Enter your credentials to continue.</DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit}>
                        <Field label="Institutional Email">
                            <Input
                                type="email"
                                placeholder="student@university.edu"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                        </Field>

                        <Field label="Password">
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                        </Field>

                        {error && (
                            <p style={{
                                fontSize: 12, color: "#FF6B6B",
                                marginBottom: 14, marginTop: -6,
                                padding: "8px 12px",
                                background: "rgba(255,107,107,0.08)",
                                borderRadius: 8,
                                border: "1px solid rgba(255,107,107,0.2)",
                            }}>
                                ⚠ {error}
                            </p>
                        )}

                        {/* Forgot password */}
                        <div style={{ textAlign: "right", marginBottom: 20, marginTop: -8 }}>
                            <span style={{
                                fontSize: 12, color: "rgba(197,160,89,0.6)",
                                cursor: "pointer", letterSpacing: "0.02em",
                            }}>
                                Forgot password?
                            </span>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing in…" : "Sign In"}
                        </Button>
                    </form>

                    <Divider />

                    <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                        No account yet?{" "}
                        <span
                            style={{ color: "#C5A059", cursor: "pointer", fontWeight: 600 }}
                            onClick={() => { onOpenChange(false); onSwitchToRegister(); }}
                        >
                            Request access.
                        </span>
                    </p>
                </div>
            </DialogContent>
        </Dialog>
    );
}

// ════════════════════════════════════════════════════════════════════════════
// Request Access Modal
// ════════════════════════════════════════════════════════════════════════════
interface RegisterDialogProps {
    open: boolean;
    onOpenChange: (v: boolean) => void;
    onSwitchToSignIn: () => void;
}

export function RegisterDialog({ open, onOpenChange, onSwitchToSignIn }: RegisterDialogProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [studentId, setStudentId] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (!name || !email || !studentId || !password) {
            setError("All fields are required."); return;
        }
        if (!email.includes("@")) {
            setError("Enter a valid institutional email."); return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters."); return;
        }
        setLoading(true);
        // TODO: wire to your auth service
        await new Promise(r => setTimeout(r, 900));
        setLoading(false);
        setSuccess(true);
        console.log("GradEdge :: Request Access →", { name, email, studentId });
    };

    return (
        <Dialog open={open} onOpenChange={v => { onOpenChange(v); if (!v) setSuccess(false); }}>
            <DialogContent>
                <div style={CARD_STYLE}>
                    <LogoMark />

                    {success ? (
                        // ── Success state ──────────────────────────────────────────
                        <div style={{ textAlign: "center", padding: "16px 0 8px" }}>
                            <div style={{
                                width: 56, height: 56, borderRadius: "50%",
                                background: "rgba(197,160,89,0.12)",
                                border: "1px solid rgba(197,160,89,0.3)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                margin: "0 auto 20px", fontSize: 24,
                            }}>
                                ✦
                            </div>
                            <h3 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 22, fontWeight: 700, color: "#F0EDE6", marginBottom: 10,
                            }}>
                                Request submitted.
                            </h3>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.6 }}>
                                We'll verify your student credentials and send confirmation to{" "}
                                <span style={{ color: "#C5A059" }}>{email}</span>.
                            </p>
                            <Divider />
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => { onOpenChange(false); setSuccess(false); }}
                            >
                                Close
                            </Button>
                        </div>
                    ) : (
                        // ── Form state ────────────────────────────────────────────
                        <>
                            <DialogHeader>
                                <DialogTitle>Request access.</DialogTitle>
                                <DialogDescription>Create your verified student account.</DialogDescription>
                            </DialogHeader>

                            <form onSubmit={handleSubmit}>
                                <Field label="Full Name">
                                    <Input
                                        type="text"
                                        placeholder="e.g. Janet Doe"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        autoComplete="name"
                                    />
                                </Field>

                                <Field label="Institutional Email">
                                    <Input
                                        type="email"
                                        placeholder="student@university.edu"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        autoComplete="email"
                                    />
                                </Field>

                                <Field label="Student ID">
                                    <Input
                                        type="text"
                                        placeholder="e.g. 12345678"
                                        value={studentId}
                                        onChange={e => setStudentId(e.target.value)}
                                    />
                                </Field>

                                <Field label="Password">
                                    <Input
                                        type="password"
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                    />
                                </Field>

                                {error && (
                                    <p style={{
                                        fontSize: 12, color: "#FF6B6B",
                                        marginBottom: 14, marginTop: -6,
                                        padding: "8px 12px",
                                        background: "rgba(255,107,107,0.08)",
                                        borderRadius: 8,
                                        border: "1px solid rgba(255,107,107,0.2)",
                                    }}>
                                        ⚠ {error}
                                    </p>
                                )}

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full mt-1"
                                    disabled={loading}
                                >
                                    {loading ? "Submitting…" : "Request Access →"}
                                </Button>
                            </form>

                            <Divider />

                            <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                                Already have access?{" "}
                                <span
                                    style={{ color: "#C5A059", cursor: "pointer", fontWeight: 600 }}
                                    onClick={() => { onOpenChange(false); onSwitchToSignIn(); }}
                                >
                                    Sign in.
                                </span>
                            </p>
                        </>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}