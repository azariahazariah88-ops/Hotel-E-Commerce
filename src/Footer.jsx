import React from "react";

function Footer() {
  return (
    <footer style={{
      background: "#1A1A2E",
      padding: "56px 0 24px",
      fontFamily: "'Nunito', sans-serif",
    }}>
      <div className="container">
        <div className="row">
          {/* Brand */}
          <div className="col-md-4 mb-4">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%",
                background: "linear-gradient(135deg, #FF5722, #FF9800)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.2rem",
              }}>🍽️</div>
              <span style={{
                background: "linear-gradient(135deg, #FF7043, #FFC107)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontSize: "1.2rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif",
              }}>HUNGRY LAYER</span>
            </div>
            <p style={{ color: "#9CA3AF", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: 18 }}>
              Your favourite food, groceries & cakes — delivered fast, fresh & hot to your doorstep.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              {[
                { icon: "bi-telephone-fill", color: "#4CAF50" },
                { icon: "bi-whatsapp",       color: "#25D366" },
                { icon: "bi-instagram",      color: "#E1306C" },
                { icon: "bi-facebook",       color: "#1877F2" },
              ].map(({ icon, color }) => (
                <div
                  key={icon}
                  style={{
                    width: 36, height: 36, borderRadius: "50%",
                    background: `${color}18`, border: `1px solid ${color}30`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = color; e.currentTarget.querySelector("i").style.color = "#fff" }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${color}18`; e.currentTarget.querySelector("i").style.color = color }}
                >
                  <i className={`bi ${icon}`} style={{ color, fontSize: "0.95rem", transition: "color 0.2s" }} />
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 mb-4">
            <h6 style={{ color: "#fff", marginBottom: 16, fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Categories
            </h6>
            {[
              { label: "🍛 Food",    emoji: "" },
              { label: "🎂 Cakes",   emoji: "" },
              { label: "🛒 Grocery", emoji: "" },
            ].map(({ label }) => (
              <p
                key={label}
                style={{ fontSize: "0.88rem", marginBottom: 10, cursor: "pointer", color: "#9CA3AF", fontWeight: 600, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#FF7043")}
                onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}
              >{label}</p>
            ))}
          </div>

          {/* Communities */}
          <div className="col-md-2 mb-4">
            <h6 style={{ color: "#fff", marginBottom: 16, fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Community
            </h6>
            {["Food Lovers", "Recipes", "Events"].map((t) => (
              <p
                key={t}
                style={{ fontSize: "0.88rem", marginBottom: 10, cursor: "pointer", color: "#9CA3AF", fontWeight: 600, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#FF7043")}
                onMouseLeave={(e) => (e.target.style.color = "#9CA3AF")}
              >{t}</p>
            ))}
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h6 style={{ color: "#fff", marginBottom: 16, fontWeight: 800, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "1px" }}>
              Get In Touch
            </h6>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: "📞", text: "9345587563", color: "#4CAF50" },
                { icon: "✉️", text: "isravel@gmail.com", color: "#2196F3" },
                { icon: "📍", text: "Near Manda House", color: "#FF5722" },
                { icon: "📍", text: "Near Richard Nadar House", color: "#FF5722" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: "0.9rem" }}>{c.icon}</span>
                  <span style={{ color: "#9CA3AF", fontSize: "0.85rem", fontWeight: 600 }}>{c.text}</span>
                </div>
              ))}
            </div>

            {/* Delivery badge */}
            <div style={{
              marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.25)",
              borderRadius: 20, padding: "6px 14px",
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
              <span style={{ color: "#4CAF50", fontSize: "0.8rem", fontWeight: 800 }}>Delivering Now • Open 24/7</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 20,
          marginTop: 8,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ color: "#4B5563", fontSize: "0.8rem" }}>
            © 2025 <span style={{ color: "#FF7043", fontWeight: 700 }}>Hungry Layer</span>. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {["🔒 Secure Payments", "⚡ Fast Delivery", "✅ Quality Assured"].map((b) => (
              <span key={b} style={{
                background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "3px 10px",
                color: "#6B7280", fontSize: "0.72rem", fontWeight: 600,
              }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;