import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import logo from "./assets/bg3.png";

function Navbar() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { cartCount } = useCart();
  const { user }  = useAuth();
  const isHome    = location.pathname === "/";

  return (
    <nav style={{
      background: "rgba(10,10,10,0.95)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255,200,50,0.15)",
      padding: "0 2rem",
      display: "flex",
      alignItems: "center",
      height: "68px",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      fontFamily: "'Playfair Display', serif",
    }}>
      {/* Logo + Brand */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/")}>
        <img src={logo} alt="logo" style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #f5c842", objectFit: "cover" }} />
        <span style={{ color: "#f5c842", fontSize: "1.4rem", fontWeight: 700, letterSpacing: "1px" }}>HUNGRY LAYER</span>
      </div>

      {/* Right Nav */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
        {!isHome && <NavBtn onClick={() => navigate("/")} icon="bi-house-fill" label="Home" />}
        <NavBtn onClick={() => navigate("/cart")} icon="bi-bag-fill" label="Cart" badge={cartCount > 0 ? cartCount : null} />
        <NavBtn onClick={() => navigate("/orders")} icon="bi-receipt" label="Orders" />

        {/* Profile — shows avatar + name if logged in */}
        {user ? (
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "rgba(245,200,66,0.1)",
              border: "1px solid rgba(245,200,66,0.35)",
              color: "#f5c842",
              borderRadius: "24px",
              padding: "5px 14px 5px 6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.88rem",
              fontFamily: "'Playfair Display', serif",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,200,66,0.18)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(245,200,66,0.1)"; }}
          >
            {/* Mini avatar circle */}
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "#f5c842", color: "#111",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: "0.8rem", flexShrink: 0,
            }}>
              {user.name?.[0]?.toUpperCase()}
            </span>
            <span style={{ maxWidth: 90, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.name.split(" ")[0]}
            </span>
          </button>
        ) : (
          <NavBtn onClick={() => navigate("/profile")} icon="bi-person-circle" label="Profile" />
        )}
      </div>
    </nav>
  );
}

function NavBtn({ onClick, icon, label, badge }) {
  return (
    <button onClick={onClick}
      style={{
        background: "transparent",
        border: "1px solid rgba(245,200,66,0.25)",
        color: "#e8e8e8",
        borderRadius: "24px",
        padding: "6px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.88rem",
        fontFamily: "'Playfair Display', serif",
        transition: "all 0.2s",
        position: "relative",
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,200,66,0.12)"; e.currentTarget.style.color = "#f5c842"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e8e8e8"; }}
    >
      <i className={`bi ${icon}`}></i>
      <span>{label}</span>
      {badge && (
        <span style={{ position: "absolute", top: -6, right: -6, background: "#f5c842", color: "#111", borderRadius: "50%", width: 20, height: 20, fontSize: "0.7rem", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>
          {badge}
        </span>
      )}
    </button>
  );
}

export default Navbar;
