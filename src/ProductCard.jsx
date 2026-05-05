import React, { useState } from "react";
import { useCart } from "./CartContext";

function ProductCard({ item, category }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart({ ...item, category, quantity: Number(qty) });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 20,
        display: "flex",
        gap: 18,
        alignItems: "flex-start",
        transition: "all 0.3s ease",
        backdropFilter: "blur(8px)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid rgba(245,200,66,0.35)";
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
        e.currentTarget.style.transform = "none";
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 12, flexShrink: 0 }}
      />
      <div style={{ flex: 1 }}>
        <h5 style={{ color: "#fff", marginBottom: 4, fontSize: "1.05rem" }}>{item.name}</h5>
        <p style={{ color: "#f5c842", fontWeight: 600, marginBottom: 12, fontSize: "1rem" }}>₹{item.price}</p>

        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          {/* Qty stepper */}
          <div style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.08)", borderRadius: 30, overflow: "hidden" }}>
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              style={{ background: "transparent", border: "none", color: "#fff", width: 32, height: 34, cursor: "pointer", fontSize: "1.1rem" }}
            >−</button>
            <span style={{ color: "#fff", width: 28, textAlign: "center", fontSize: "0.95rem" }}>{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              style={{ background: "transparent", border: "none", color: "#fff", width: 32, height: 34, cursor: "pointer", fontSize: "1.1rem" }}
            >+</button>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            style={{
              background: added ? "#28a745" : "#f5c842",
              color: added ? "#fff" : "#111",
              border: "none",
              borderRadius: 30,
              padding: "7px 20px",
              fontWeight: 700,
              fontSize: "0.85rem",
              cursor: "pointer",
              transition: "all 0.3s",
              fontFamily: "'Lora', serif",
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
