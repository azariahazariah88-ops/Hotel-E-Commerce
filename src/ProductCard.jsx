import React, { useState } from "react";
import { useCart } from "./CartContext";

const categoryTheme = {
  food:    { color: "#FF5722", bg: "#FFF3EE", border: "#FFCCBC" },
  cake:    { color: "#9C27B0", bg: "#F3E5F5", border: "#CE93D8" },
  grocery: { color: "#4CAF50", bg: "#E8F5E9", border: "#A5D6A7" },
};

function ProductCard({ item, category }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const theme = categoryTheme[category] || categoryTheme.food;

  const handleAdd = () => {
    addToCart({ ...item, category, quantity: Number(qty) });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#fff",
        border: `2px solid ${hovered ? theme.border : "#F3E8E3"}`,
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        transform: hovered ? "translateY(-5px)" : "none",
        boxShadow: hovered
          ? `0 16px 40px ${theme.color}18`
          : "0 4px 16px rgba(0,0,0,0.05)",
        position: "relative",
      }}
    >
      {/* Image */}
      <div style={{ position: "relative", width: 120, flexShrink: 0, overflow: "hidden" }}>
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease",
            transform: hovered ? "scale(1.08)" : "scale(1)",
            display: "block",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to right, transparent, ${theme.color}10)`,
        }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: "16px 18px" }}>
        <h5 style={{ color: "#1A1A2E", marginBottom: 4, fontSize: "1rem", fontWeight: 800 }}>{item.name}</h5>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <span style={{
            color: theme.color,
            fontWeight: 900, fontSize: "1.15rem",
          }}>₹{item.price}</span>
          <span style={{
            background: "#E8F5E9", color: "#4CAF50",
            borderRadius: 10, padding: "1px 8px",
            fontSize: "0.68rem", fontWeight: 800,
          }}>FREE Delivery</span>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Qty stepper */}
          <div style={{
            display: "flex", alignItems: "center",
            background: theme.bg, border: `1.5px solid ${theme.border}`,
            borderRadius: 30, overflow: "hidden",
          }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{
                background: "transparent", border: "none",
                color: theme.color, width: 34, height: 34,
                cursor: "pointer", fontSize: "1.2rem", fontWeight: 900,
              }}
            >−</button>
            <span style={{
              color: "#1A1A2E", width: 28, textAlign: "center",
              fontSize: "0.95rem", fontWeight: 800,
            }}>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{
                background: "transparent", border: "none",
                color: theme.color, width: 34, height: 34,
                cursor: "pointer", fontSize: "1.2rem", fontWeight: 900,
              }}
            >+</button>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            style={{
              background: added
                ? "linear-gradient(135deg, #4CAF50, #66BB6A)"
                : `linear-gradient(135deg, ${theme.color}, ${theme.color}CC)`,
              color: "#fff",
              border: "none",
              borderRadius: 30,
              padding: "8px 20px",
              fontWeight: 800,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s",
              fontFamily: "'Nunito', sans-serif",
              boxShadow: added
                ? "0 4px 12px rgba(76,175,80,0.35)"
                : `0 4px 12px ${theme.color}35`,
              transform: added ? "scale(0.97)" : "scale(1)",
            }}
          >
            {added ? "✓ Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;