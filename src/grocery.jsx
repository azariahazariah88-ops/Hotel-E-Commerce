import React from 'react'
import rice from './assets/rice.jpg'
import oil from './assets/oil.jpg'
import bread from './assets/bread.jpg'
import milk from './assets/milk.png'
import sugar from './assets/sugar.jpg'
import salt from './assets/salt.jpg'
import gb from './assets/gb.png'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductCard from './ProductCard'

function Grocery() {
  const products = [
    { id: 1, name: "Rice",   price: 60,  image: rice,  tag: "Staple"   },
    { id: 2, name: "Oil",    price: 110, image: oil,   tag: "Pure"     },
    { id: 3, name: "Bread",  price: 55,  image: bread, tag: "Fresh"    },
    { id: 4, name: "Milk",   price: 50,  image: milk,  tag: "Daily"    },
    { id: 5, name: "Sugar",  price: 40,  image: sugar, tag: "Sweet"    },
    { id: 6, name: "Salt",   price: 25,  image: salt,  tag: "Essential"},
  ];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#F5FFF6", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img src={gb} alt="grocery banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(56,142,60,0.88), rgba(139,195,74,0.75))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
          <div style={{
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 30, padding: "4px 18px", marginBottom: 14,
            color: "#fff", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase",
          }}>Delivered in 10 Minutes</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, fontFamily: "'Poppins', sans-serif", textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            🛒 Fresh Grocery
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 10, fontSize: "1rem", fontWeight: 600 }}>
            Everyday essentials, lightning fast
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap", justifyContent: "center" }}>
            {["⚡ 10-Min Delivery", "✅ Fresh Stock", "🆓 Free Delivery"].map((s) => (
              <div key={s} style={{
                background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 20, padding: "4px 14px",
                color: "#fff", fontSize: "0.78rem", fontWeight: 700,
              }}>{s}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "48px 0 72px" }}>
        <div className="container">
          <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ color: "#4CAF50", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>
                {products.length} Essentials
              </div>
              <h2 style={{ color: "#1A1A2E", fontSize: "1.6rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
                Daily Essentials
              </h2>
            </div>
            <div style={{
              background: "#E8F5E9", border: "1px solid #A5D6A7",
              borderRadius: 20, padding: "6px 16px",
              color: "#4CAF50", fontSize: "0.82rem", fontWeight: 800,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
              In Stock & Ready
            </div>
          </div>

          <div className="row">
            {products.map((product) => (
              <div className="col-md-6 mb-4" key={product.id}>
                <ProductCard item={product} category="grocery" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Grocery;