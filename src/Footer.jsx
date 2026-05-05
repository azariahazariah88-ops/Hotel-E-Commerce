import React from "react";

function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(245,200,66,0.15)",
        padding: "48px 0 24px",
        fontFamily: "'Lora', serif",
        color: "#aaa",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <h5 style={{ color: "#f5c842", marginBottom: 12 }}>HUNGRY LAYER</h5>
            <p style={{ fontSize: "0.9rem", lineHeight: 1.7 }}>
              We provide the best food ordering experience with fast delivery and quality service.
            </p>
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
              {["bi-telephone", "bi-whatsapp", "bi-instagram", "bi-facebook"].map((icon) => (
                <i
                  key={icon}
                  className={`bi ${icon}`}
                  style={{
                    fontSize: "1.2rem",
                    cursor: "pointer",
                    color: "#666",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.target.style.color = "#f5c842")}
                  onMouseLeave={(e) => (e.target.style.color = "#666")}
                />
              ))}
            </div>
          </div>
          <div className="col-md-3 mb-4">
            <h6 style={{ color: "#e8e8e8", marginBottom: 12 }}>Communities</h6>
            {["Food Lovers", "Recipes", "Events"].map((t) => (
              <p key={t} style={{ fontSize: "0.88rem", marginBottom: 6, cursor: "pointer" }}
                onMouseEnter={(e) => (e.target.style.color = "#f5c842")}
                onMouseLeave={(e) => (e.target.style.color = "#aaa")}
              >{t}</p>
            ))}
          </div>
          <div className="col-md-3 mb-4">
            <h6 style={{ color: "#e8e8e8", marginBottom: 12 }}>Contact</h6>
            <p style={{ fontSize: "0.88rem", marginBottom: 6 }}>📞 9345587563</p>
            <p style={{ fontSize: "0.88rem", marginBottom: 6 }}>✉️ isravel@gmail.com</p>
          </div>
          <div className="col-md-2 mb-4">
            <h6 style={{ color: "#e8e8e8", marginBottom: 12 }}>Locations</h6>
            <p style={{ fontSize: "0.88rem", marginBottom: 6 }}>Near Manda House</p>
            <p style={{ fontSize: "0.88rem" }}>Near Richard Nadar House</p>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1a1a1a", paddingTop: 16, textAlign: "center", fontSize: "0.8rem", color: "#444" }}>
          © 2025 Hungry Layer. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
