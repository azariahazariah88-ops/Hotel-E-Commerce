import React from "react";

function Footer() {
  return (
    <footer style={{
      background: "#18110C",
      padding: "60px 0 28px",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <div className="container">
        <div className="row">
          {/* Brand col */}
          <div className="col-md-4 mb-5">
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
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
              <span style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "#FAF7F4",
              }}>Hungry Layer</span>
            </div>
            <p style={{
              color: "#7A6458",
              fontSize: "0.86rem",
              lineHeight: 1.75,
              marginBottom: 22,
              maxWidth: 260,
            }}>
              Your favourite food, groceries & cakes — delivered fast, fresh & hot to your doorstep.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Phone", color: "#2D6A4F" },
                { label: "WhatsApp", color: "#25D366" },
                { label: "Instagram", color: "#C8410A" },
                { label: "Facebook", color: "#1877F2" },
              ].map(({ label, color }) => (
                <div
                  key={label}
                  title={label}
                  style={{
                    width: 34, height: 34, borderRadius: "50%",
                    border: `1px solid ${color}30`,
                    background: `${color}14`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = color; e.currentTarget.style.borderColor = color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = `${color}14`; e.currentTarget.style.borderColor = `${color}30`; }}
                >
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#B09A90" }}>{label[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="col-md-2 col-6 mb-4">
            <p style={{ color: "#FAF7F4", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>
              Categories
            </p>
            {["Food", "Cakes", "Grocery"].map((item) => (
              <p
                key={item}
                style={{ color: "#7A6458", fontSize: "0.86rem", marginBottom: 10, cursor: "pointer", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#E8622A")}
                onMouseLeave={(e) => (e.target.style.color = "#7A6458")}
              >{item}</p>
            ))}
          </div>

          {/* Community */}
          <div className="col-md-2 col-6 mb-4">
            <p style={{ color: "#FAF7F4", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>
              Community
            </p>
            {["Food Lovers", "Recipes", "Events"].map((item) => (
              <p
                key={item}
                style={{ color: "#7A6458", fontSize: "0.86rem", marginBottom: 10, cursor: "pointer", fontWeight: 500, transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.target.style.color = "#E8622A")}
                onMouseLeave={(e) => (e.target.style.color = "#7A6458")}
              >{item}</p>
            ))}
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <p style={{ color: "#FAF7F4", fontWeight: 700, fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: "2px", marginBottom: 16 }}>
              Get In Touch
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "9345587563" },
                { label: "isravel@gmail.com" },
                { label: "Near Manda House" },
                { label: "Near Richard Nadar House" },
              ].map((c, i) => (
                <span key={i} style={{ color: "#7A6458", fontSize: "0.84rem", fontWeight: 500 }}>{c.label}</span>
              ))}
            </div>
            <div style={{
              marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(45,106,79,0.15)",
              border: "1px solid rgba(45,106,79,0.3)",
              borderRadius: 999, padding: "5px 14px",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
              <span style={{ color: "#4ADE80", fontSize: "0.75rem", fontWeight: 600 }}>Delivering Now · Open 24/7</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.06)",
          paddingTop: 22, marginTop: 12,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <span style={{ color: "#4A3728", fontSize: "0.78rem" }}>
            © 2025 <span style={{ color: "#E8622A" }}>Hungry Layer</span>. All rights reserved.
          </span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["Secure Payments", "Fast Delivery", "Quality Assured"].map((b) => (
              <span key={b} style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 999, padding: "3px 10px",
                color: "#4A3728", fontSize: "0.7rem", fontWeight: 500,
              }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;