import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { user } = useAuth();
  const isHome = location.pathname === "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav style={{
      background: scrolled ? "rgba(250,247,244,0.97)" : "#FAF7F4",
      borderBottom: `1px solid ${scrolled ? "#EBE0D8" : "#EBE0D8"}`,
      padding: "0 2rem",
      height: 64,
      display: "flex",
      alignItems: "center",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.3s ease",
      boxShadow: scrolled ? "0 2px 20px rgba(28,16,8,0.08)" : "none",
    }}>
      {/* Brand */}
      <div
        style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <div style={{
          width: 36, height: 36,
          background: "linear-gradient(135deg, #C8410A, #E8622A)",
          borderRadius: 10,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 2.76 1.57 5.15 3.87 6.4L8 20h8l-.87-4.6C17.43 14.15 19 11.76 19 9c0-3.87-3.13-7-7-7z" fill="white" opacity="0.9"/>
            <path d="M9 21h6" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#1C1008",
            letterSpacing: "-0.3px",
            lineHeight: 1.1,
          }}>
            Hungry Layer
          </div>
          <div style={{
            fontSize: "0.58rem",
            color: "#C8410A",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
            marginTop: 1,
          }}>
            Fast · Fresh · Flavourful
          </div>
        </div>
      </div>

      {/* Status pill */}
      <div style={{
        marginLeft: 18,
        display: "flex", alignItems: "center", gap: 6,
        background: "#F0FDF4",
        border: "1px solid #BBF7D0",
        borderRadius: 999,
        padding: "3px 10px",
        fontSize: "0.7rem",
        color: "#166534",
        fontWeight: 600,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
        Delivering Now
      </div>

      {/* Right actions */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }}>
        {!isHome && <NavItem label="Home" icon={HomeIcon} onClick={() => navigate("/")} />}
        <NavItem
          label={`Cart${cartCount > 0 ? ` (${cartCount})` : ""}`}
          icon={CartIcon}
          onClick={() => navigate("/cart")}
          primary={cartCount > 0}
        />
        <NavItem label="Orders" icon={ReceiptIcon} onClick={() => navigate("/orders")} />
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            style={{
              marginLeft: 4,
              display: "flex", alignItems: "center", gap: 8,
              background: "#1C1008",
              border: "none",
              borderRadius: 999,
              padding: "6px 14px 6px 6px",
              cursor: "pointer",
              color: "#fff",
              fontSize: "0.82rem",
              fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #C8410A, #E8622A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.8rem", fontWeight: 700,
            }}>
              {user.name?.[0]?.toUpperCase()}
            </span>
            <span style={{ maxWidth: 72, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.name.split(" ")[0]}
            </span>
          </button>
        ) : (
          <NavItem label="Sign In" icon={UserIcon} onClick={() => navigate("/profile")} />
        )}
      </div>
    </nav>
  );
}

function NavItem({ label, icon: Icon, onClick, primary }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 6,
        background: primary
          ? hov ? "#9E3208" : "#C8410A"
          : hov ? "#F5EDE8" : "transparent",
        color: primary ? "#fff" : hov ? "#C8410A" : "#3D2B1F",
        border: "none",
        borderRadius: 999,
        padding: "7px 14px",
        cursor: "pointer",
        fontSize: "0.83rem",
        fontWeight: 600,
        transition: "all 0.18s ease",
        boxShadow: primary && !hov ? "0 4px 14px rgba(200,65,10,0.28)" : "none",
      }}
    >
      <Icon size={15} />
      <span>{label}</span>
    </button>
  );
}

const HomeIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

const CartIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
  </svg>
);

const ReceiptIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="8" y1="13" x2="16" y2="13"/>
    <line x1="8" y1="17" x2="16" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);

const UserIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
  </svg>
);

export default Navbar;