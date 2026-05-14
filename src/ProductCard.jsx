import React, { useState } from "react";
import { useCart } from "./CartContext";

const categoryTheme = {
  food:    { accent: "#C8410A", bg: "#FFF5EE", border: "#F5D5C0", label: "Food"    },
  cake:    { accent: "#5C3D8F", bg: "#F5F0FC", border: "#D8C8F0", label: "Bakery"  },
  grocery: { accent: "#2D6A4F", bg: "#F0FDF6", border: "#BBF7D0", label: "Grocery" },
};

function ProductCard({ item, category }) {
  const { addToCart } = useCart();
  const [qty, setQty]     = useState(1);
  const [added, setAdded] = useState(false);
  const [hov, setHov]     = useState(false);

  const theme = categoryTheme[category] || categoryTheme.food;

  const handleAdd = () => {
    addToCart({ ...item, category, quantity: Number(qty) });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? theme.border : "#EBE0D8"}`,
        borderRadius: 16,
        overflow: "hidden",
        display: "flex",
        transition: "box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease",
        transform: hov ? "translateY(-3px)" : "none",
        boxShadow: hov
          ? `0 12px 32px ${theme.accent}14`
          : "0 2px 10px rgba(28,16,8,0.06)",
      }}
    >
      {/* Image */}
      <div style={{ width: 110, flexShrink: 0, overflow: "hidden", position: "relative" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            transition: "transform 0.4s ease",
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", top: 8, left: 8,
          background: theme.bg,
          color: theme.accent,
          border: `1px solid ${theme.border}`,
          borderRadius: 999,
          padding: "2px 8px",
          fontSize: "0.62rem",
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: "0.8px",
        }}>
          {item.tag}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "14px 16px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <p style={{
            color: "#7A6458",
            fontSize: "0.65rem",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "1.5px",
            marginBottom: 4,
          }}>{theme.label}</p>
          <h5 style={{
            color: "#1C1008",
            fontSize: "0.97rem",
            fontWeight: 700,
            fontFamily: "'Playfair Display', serif",
            marginBottom: 6,
            lineHeight: 1.3,
          }}>{item.name}</h5>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{
              color: theme.accent,
              fontWeight: 700,
              fontSize: "1.05rem",
              fontFamily: "'DM Mono', monospace",
            }}>₹{item.price}</span>
            <span style={{
              background: "#F0FDF6",
              color: "#166534",
              border: "1px solid #BBF7D0",
              borderRadius: 999, padding: "1px 7px",
              fontSize: "0.62rem", fontWeight: 600,
            }}>Free Delivery</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {/* Qty stepper */}
          <div style={{
            display: "flex", alignItems: "center",
            background: "#FAF7F4",
            border: "1.5px solid #EBE0D8",
            borderRadius: 999,
          }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{
                background: "transparent", border: "none",
                color: theme.accent, width: 30, height: 30,
                cursor: "pointer", fontSize: "1.1rem", fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >−</button>
            <span style={{
              color: "#1C1008", width: 24, textAlign: "center",
              fontSize: "0.88rem", fontWeight: 700,
              fontFamily: "'DM Mono', monospace",
            }}>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{
                background: "transparent", border: "none",
                color: theme.accent, width: 30, height: 30,
                cursor: "pointer", fontSize: "1.1rem", fontWeight: 600,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >+</button>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            style={{
              background: added
                ? "#166534"
                : theme.accent,
              color: "#fff",
              border: "none",
              borderRadius: 999,
              padding: "7px 18px",
              fontWeight: 600,
              fontSize: "0.8rem",
              cursor: "pointer",
              transition: "background 0.3s, transform 0.15s",
              transform: added ? "scale(0.97)" : "scale(1)",
              letterSpacing: "0.2px",
            }}
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;