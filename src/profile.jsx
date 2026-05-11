import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "./AuthContext";

const API = "https://hotel-e-commerce-bakend.onrender.com";

const inputStyle = {
  width: "100%", padding: "12px 16px",
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12, color: "#fff", fontSize: "0.95rem",
  outline: "none", marginBottom: 14,
  fontFamily: "'Lora', serif", boxSizing: "border-box",
  transition: "border 0.2s",
};
const focusInput = (e) => (e.target.style.border = "1px solid rgba(245,200,66,0.55)");
const blurInput  = (e) => (e.target.style.border = "1px solid rgba(255,255,255,0.12)");

// ── Google Sign-In Button ─────────────────────────────────────────────
function GoogleButton() {
  const [hover, setHover] = useState(false);

  const handleGoogleLogin = () => {
    // Redirect browser to backend; Passport handles the rest
    window.location.href = `${API}/auth/google`;
  };

  return (
    <button
      onClick={handleGoogleLogin}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        background: hover ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.18)",
        borderRadius: 30,
        padding: "12px 16px",
        cursor: "pointer",
        fontFamily: "'Lora', serif",
        fontSize: "0.92rem",
        color: "#e8e8e8",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        transition: "all 0.2s",
      }}
    >
      {/* Official Google G SVG */}
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
      </svg>
      Continue with Google
    </button>
  );
}

// ── Divider ───────────────────────────────────────────────────────────
function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
      <span style={{ color: "#444", fontSize: "0.78rem", letterSpacing: 1 }}>OR</span>
      <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
    </div>
  );
}

// ── Auth Forms ────────────────────────────────────────────────────────
function AuthForms() {
  const [mode, setMode]         = useState("login");
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [phone, setPhone]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const { login }               = useAuth();
  const navigate                = useNavigate();
  const [searchParams]          = useSearchParams();

  // Show error if Google failed
  const googleError = searchParams.get("error");

  const reset = () => { setName(""); setEmail(""); setPhone(""); setPassword(""); setConfirm(""); setError(""); setSuccess(""); };
  const switchMode = (m) => { reset(); setMode(m); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (mode === "register") {
      if (!name.trim())        return setError("Name is required.");
      if (password.length < 6) return setError("Password must be at least 6 characters.");
      if (password !== confirm) return setError("Passwords do not match.");
    }
    setLoading(true);
    try {
      const endpoint = mode === "login" ? "/login" : "/register";
      const payload  = mode === "login" ? { email, password } : { name, email, password, phone };
      const res = await axios.post(`${API}${endpoint}`, payload);
      if (res.data.message === "Success") {
        login(res.data.user, res.data.token);
        setSuccess(mode === "login" ? "Logged in!" : "Account created!");
        setTimeout(() => navigate("/profile"), 700);
      } else {
        setError(res.data.message || "Something went wrong.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Connection error. Is the server running?");
    }
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 68px)", padding: "40px 16px" }}>
      <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(245,200,66,0.18)", borderRadius: 24, padding: "40px 36px", width: "100%", maxWidth: 430 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 10 }}>{mode === "login" ? "👋" : "🎉"}</div>
          <h2 style={{ color: "#fff", marginBottom: 6 }}>{mode === "login" ? "Welcome Back" : "Create Account"}</h2>
          <p style={{ color: "#666", fontSize: "0.88rem" }}>{mode === "login" ? "Sign in to Hungry Layer" : "Join Hungry Layer today"}</p>
        </div>

        {/* Google OAuth error */}
        {googleError && (
          <div style={{ background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: 10, padding: "10px 14px", color: "#e74c3c", fontSize: "0.88rem", marginBottom: 16 }}>
            ⚠️ Google sign-in failed. Please try again.
          </div>
        )}

        {/* ── Google button ── */}
        <GoogleButton />

        <Divider />

        {/* Tab toggle */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.05)", borderRadius: 30, padding: 4, marginBottom: 22 }}>
          {["login", "register"].map((m) => (
            <button key={m} onClick={() => switchMode(m)}
              style={{ flex: 1, padding: "8px 0", borderRadius: 26, border: "none", cursor: "pointer", fontFamily: "'Lora', serif", fontWeight: 600, fontSize: "0.88rem", transition: "all 0.25s", background: mode === m ? "#f5c842" : "transparent", color: mode === m ? "#111" : "#777" }}>
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {error   && <div style={{ background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: 10, padding: "10px 14px", color: "#e74c3c", fontSize: "0.88rem", marginBottom: 14 }}>⚠️ {error}</div>}
        {success && <div style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", borderRadius: 10, padding: "10px 14px", color: "#28a745", fontSize: "0.88rem", marginBottom: 14 }}>✓ {success}</div>}

        {/* Email/password form */}
        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <>
              <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase" }}>Full Name *</label>
              <input type="text" placeholder="Your full name" style={inputStyle} value={name} onChange={(e) => setName(e.target.value)} onFocus={focusInput} onBlur={blurInput} required />
              <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase" }}>Phone (optional)</label>
              <input type="tel" placeholder="Your phone number" style={inputStyle} value={phone} onChange={(e) => setPhone(e.target.value)} onFocus={focusInput} onBlur={blurInput} />
            </>
          )}
          <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase" }}>Email *</label>
          <input type="email" placeholder="you@example.com" style={inputStyle} value={email} onChange={(e) => setEmail(e.target.value)} onFocus={focusInput} onBlur={blurInput} required />
          <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase" }}>Password *</label>
          <input type="password" placeholder={mode === "register" ? "Min. 6 characters" : "Your password"} style={inputStyle} value={password} onChange={(e) => setPassword(e.target.value)} onFocus={focusInput} onBlur={blurInput} required />
          {mode === "register" && (
            <>
              <label style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase" }}>Confirm Password *</label>
              <input type="password" placeholder="Repeat password" style={inputStyle} value={confirm} onChange={(e) => setConfirm(e.target.value)} onFocus={focusInput} onBlur={blurInput} required />
            </>
          )}
          <button type="submit" disabled={loading}
            style={{ width: "100%", background: "#f5c842", color: "#111", border: "none", borderRadius: 30, padding: "13px", fontWeight: 700, fontSize: "1rem", cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Lora', serif", marginTop: 4, marginBottom: 12, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Please wait..." : mode === "login" ? "Sign In →" : "Create Account →"}
          </button>
        </form>

        <div style={{ textAlign: "center" }}>
          <span style={{ color: "#444", fontSize: "0.85rem" }}>{mode === "login" ? "No account? " : "Already registered? "}</span>
          <span style={{ color: "#f5c842", cursor: "pointer", fontSize: "0.85rem" }} onClick={() => switchMode(mode === "login" ? "register" : "login")}>
            {mode === "login" ? "Register here" : "Sign in"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Profile Dashboard ─────────────────────────────────────────────────
function ProfileDashboard() {
  const { user, token, logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName]       = useState(user?.name || "");
  const [phone, setPhone]     = useState(user?.phone || "");
  const [saving, setSaving]   = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [saveErr, setSaveErr] = useState("");

  const handleSave = async () => {
    setSaving(true); setSaveMsg(""); setSaveErr("");
    try {
      const res = await axios.put(`${API}/profile`, { name, phone }, { headers: { Authorization: `Bearer ${token}` } });
      if (res.data.message === "Profile updated") {
        updateUser({ name, phone });
        setSaveMsg("Profile saved!");
        setEditing(false);
      }
    } catch { setSaveErr("Failed to save. Try again."); }
    setSaving(false);
    setTimeout(() => { setSaveMsg(""); setSaveErr(""); }, 3000);
  };

  const infoBox = { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: "16px 20px", marginBottom: 14 };

  // Avatar: Google photo or initial letter
  const AvatarEl = () => user?.avatar ? (
    <img src={user.avatar} alt="avatar"
      style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(245,200,66,0.4)", margin: "0 auto 16px", display: "block" }} />
  ) : (
    <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#f5c842", color: "#111", fontSize: "2rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", border: "3px solid rgba(245,200,66,0.4)" }}>
      {user?.name?.[0]?.toUpperCase() || "U"}
    </div>
  );

  return (
    <div style={{ padding: "48px 0 80px" }}>
      <div className="container">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>

          {/* Header card */}
          <div style={{ background: "linear-gradient(135deg, rgba(245,200,66,0.12), rgba(245,200,66,0.03))", border: "1px solid rgba(245,200,66,0.25)", borderRadius: 24, padding: "36px 32px", textAlign: "center", marginBottom: 28 }}>
            <AvatarEl />
            <h2 style={{ color: "#fff", marginBottom: 4 }}>{user?.name}</h2>
            <p style={{ color: "#777", fontSize: "0.9rem", marginBottom: 8 }}>{user?.email}</p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <span style={{ display: "inline-block", background: "rgba(40,167,69,0.15)", border: "1px solid rgba(40,167,69,0.3)", color: "#4caf50", borderRadius: 20, padding: "3px 14px", fontSize: "0.78rem" }}>● Active</span>
              {user?.avatar && (
                <span style={{ display: "inline-block", background: "rgba(66,133,244,0.15)", border: "1px solid rgba(66,133,244,0.3)", color: "#4285F4", borderRadius: 20, padding: "3px 14px", fontSize: "0.78rem" }}>
                  🔗 Google Account
                </span>
              )}
            </div>
          </div>

          {saveMsg && <div style={{ background: "rgba(40,167,69,0.12)", border: "1px solid rgba(40,167,69,0.3)", borderRadius: 10, padding: "10px 16px", color: "#28a745", fontSize: "0.88rem", marginBottom: 16 }}>✓ {saveMsg}</div>}
          {saveErr && <div style={{ background: "rgba(231,76,60,0.12)", border: "1px solid rgba(231,76,60,0.3)", borderRadius: 10, padding: "10px 16px", color: "#e74c3c", fontSize: "0.88rem", marginBottom: 16 }}>⚠️ {saveErr}</div>}

          {/* Details */}
          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "28px 28px 20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h4 style={{ color: "#fff", margin: 0 }}>Account Details</h4>
              {!editing ? (
                <button onClick={() => setEditing(true)} style={{ background: "transparent", border: "1px solid rgba(245,200,66,0.35)", color: "#f5c842", borderRadius: 20, padding: "6px 18px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Lora', serif" }}>✏️ Edit</button>
              ) : (
                <div style={{ display: "flex", gap: 8 }}>
                  <button onClick={() => { setEditing(false); setName(user?.name); setPhone(user?.phone || ""); }} style={{ background: "transparent", border: "1px solid #333", color: "#888", borderRadius: 20, padding: "6px 16px", cursor: "pointer", fontSize: "0.82rem", fontFamily: "'Lora', serif" }}>Cancel</button>
                  <button onClick={handleSave} disabled={saving} style={{ background: "#f5c842", border: "none", color: "#111", borderRadius: 20, padding: "6px 18px", cursor: "pointer", fontSize: "0.82rem", fontWeight: 700, fontFamily: "'Lora', serif" }}>{saving ? "Saving..." : "Save"}</button>
                </div>
              )}
            </div>

            <div style={infoBox}>
              <div style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Full Name</div>
              {editing ? <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} onFocus={focusInput} onBlur={blurInput} /> : <div style={{ color: "#fff" }}>{user?.name}</div>}
            </div>

            <div style={infoBox}>
              <div style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Email</div>
              <div style={{ color: "#aaa" }}>{user?.email}</div>
              <div style={{ color: "#383838", fontSize: "0.72rem", marginTop: 4 }}>Cannot be changed</div>
            </div>

            <div style={infoBox}>
              <div style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Phone</div>
              {editing ? <input type="tel" value={phone} placeholder="Add phone number" onChange={(e) => setPhone(e.target.value)} style={{ ...inputStyle, marginBottom: 0 }} onFocus={focusInput} onBlur={blurInput} /> : <div style={{ color: user?.phone ? "#fff" : "#444" }}>{user?.phone || "Not added"}</div>}
            </div>

            <div style={{ ...infoBox, marginBottom: 0 }}>
              <div style={{ color: "#555", fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>Member Since</div>
              <div style={{ color: "#aaa", fontSize: "0.92rem" }}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : "Recently joined"}
              </div>
            </div>
          </div>

          {/* Quick links */}
          <div className="row mt-4">
            {[
              { label: "My Orders", icon: "bi-receipt", path: "/orders" },
              { label: "Browse Menu", icon: "bi-bag-heart", path: "/food" },
            ].map((link) => (
              <div className="col-6" key={link.path}>
                <div onClick={() => navigate(link.path)}
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 16px", textAlign: "center", cursor: "pointer", transition: "all 0.25s" }}
                  onMouseEnter={(e) => { e.currentTarget.style.border = "1px solid rgba(245,200,66,0.3)"; e.currentTarget.style.background = "rgba(245,200,66,0.05)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.border = "1px solid rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}>
                  <i className={`bi ${link.icon}`} style={{ fontSize: "1.5rem", color: "#f5c842", display: "block", marginBottom: 8 }} />
                  <span style={{ color: "#ccc", fontSize: "0.9rem" }}>{link.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Sign out */}
          <button onClick={() => { logout(); navigate("/"); }}
            style={{ width: "100%", marginTop: 24, background: "transparent", border: "1px solid rgba(231,76,60,0.3)", color: "#e74c3c", borderRadius: 30, padding: "13px", fontWeight: 600, fontSize: "0.95rem", cursor: "pointer", fontFamily: "'Lora', serif" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(231,76,60,0.1)"; e.currentTarget.style.borderColor = "#e74c3c"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(231,76,60,0.3)"; }}>
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────
function Profile() {
  const { user, loading } = useAuth();
  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar />
      {loading ? (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
          <div style={{ color: "#f5c842" }}>Loading...</div>
        </div>
      ) : user ? <ProfileDashboard /> : <AuthForms />}
      <Footer />
    </div>
  );
}

export default Profile;
