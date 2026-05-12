import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import logo from "./assets/bg3.png";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const { user } = useAuth();
  const isHome = location.pathname === "/";
  const [mobileOpen, setMobileOpen] = useState(false);

  const navStyle = {
    background: "#FFFFFF",
    borderBottom: "1px solid #FFE0D6",
    padding: "0 1.5rem",
    display: "flex",
    alignItems: "center",
    height: "68px",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    fontFamily: "'Nunito', sans-serif",
    boxShadow: "0 2px 16px rgba(255,87,34,0.08)",
  };

  return (
    <nav style={navStyle}>
      {/* Logo + Brand */}
      <div
        style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}
        onClick={() => navigate("/")}
      >
        <div style={{
          width: 42, height: 42, borderRadius: "50%",
          background: "linear-gradient(135deg, #FF5722, #FF9800)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem", boxShadow: "0 4px 12px rgba(255,87,34,0.35)",
        }}>
          🍽️
        </div>
        <div>
          <span style={{
            background: "linear-gradient(135deg, #FF5722, #FF9800)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            fontSize: "1.3rem", fontWeight: 900, letterSpacing: "-0.5px",
            fontFamily: "'Poppins', sans-serif",
          }}>
            HUNGRY LAYER
          </span>
          <div style={{ fontSize: "0.6rem", color: "#FF7043", fontWeight: 700, letterSpacing: "1px", marginTop: -2 }}>
            FAST · FRESH · FLAVOURFUL
          </div>
        </div>
      </div>

      {/* Delivery badge */}
      <div style={{
        marginLeft: 20,
        background: "#FFF3EE", border: "1px solid #FFCCBC",
        borderRadius: 20, padding: "4px 12px",
        display: "flex", alignItems: "center", gap: 6,
        fontSize: "0.75rem", color: "#FF5722", fontWeight: 700,
      }}>
        <span style={{ color: "#4CAF50", fontSize: "0.7rem" }}>●</span> Delivering Now
      </div>

      {/* Right Nav */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px" }}>
        {!isHome && (
          <NavBtn onClick={() => navigate("/")} icon="bi-house-fill" label="Home" />
        )}
        <NavBtn
          onClick={() => navigate("/cart")}
          icon="bi-bag-fill"
          label="Cart"
          badge={cartCount > 0 ? cartCount : null}
          highlight
        />
        <NavBtn onClick={() => navigate("/orders")} icon="bi-receipt" label="Orders" />

        {user ? (
          <button
            onClick={() => navigate("/profile")}
            style={{
              background: "linear-gradient(135deg, #FF5722, #FF7043)",
              border: "none",
              color: "#fff",
              borderRadius: "24px",
              padding: "6px 14px 6px 6px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.85rem",
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              boxShadow: "0 4px 12px rgba(255,87,34,0.3)",
            }}
          >
            <span style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,0.25)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "0.82rem",
            }}>
              {user.name?.[0]?.toUpperCase()}
            </span>
            <span style={{ maxWidth: 80, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {user.name.split(" ")[0]}
            </span>
          </button>
        ) : (
          <NavBtn onClick={() => navigate("/profile")} icon="bi-person-circle" label="Login" />
        )}
      </div>
    </nav>
  );
}

function NavBtn({ onClick, icon, label, badge, highlight }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: highlight
          ? hovered ? "linear-gradient(135deg, #E64A19, #FF5722)" : "linear-gradient(135deg, #FF5722, #FF7043)"
          : hovered ? "#FFF3EE" : "transparent",
        border: highlight ? "none" : `1px solid ${hovered ? "#FFCCBC" : "#F3E8E3"}`,
        color: highlight ? "#fff" : hovered ? "#FF5722" : "#4B5563",
        borderRadius: "22px",
        padding: "7px 16px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "6px",
        fontSize: "0.85rem",
        fontFamily: "'Nunito', sans-serif",
        fontWeight: 700,
        position: "relative",
        boxShadow: highlight ? "0 4px 14px rgba(255,87,34,0.3)" : "none",
        transition: "all 0.2s ease",
      }}
    >
      <i className={`bi ${icon}`}></i>
      <span>{label}</span>
      {badge && (
        <span style={{
          position: "absolute", top: -7, right: -7,
          background: "#FF1744", color: "#fff",
          borderRadius: "50%", width: 20, height: 20,
          fontSize: "0.68rem", display: "flex", alignItems: "center", justifyContent: "center",
          fontWeight: 900, border: "2px solid #fff",
          animation: "pulse-badge 1.5s ease-in-out infinite",
        }}>
          {badge}
        </span>
      )}
    </button>
  );
}

export default Navbar;