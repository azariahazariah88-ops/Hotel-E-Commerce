import React from 'react'
import cc from './assets/cc.jpg'
import chc from './assets/chc.jpg'
import bfc from './assets/bfc.jpg'
import b from './assets/b.jpg'
import vc from './assets/vc.jpg'
import ic from './assets/ic.jpg'
import cb from './assets/cb.jpg'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductCard from './ProductCard'

function Cake() {
  const cakes = [
    { id: 1, name: "Vanilla Cake",   price: 375, image: vc,  tag: "Classic"    },
    { id: 2, name: "Chocolate Cake", price: 500, image: cc,  tag: "Fan Fav 💜" },
    { id: 3, name: "Cheesecake",     price: 175, image: chc, tag: "Light"      },
    { id: 4, name: "Black Forest",   price: 500, image: bfc, tag: "Premium"    },
    { id: 5, name: "Brownie",        price: 60,  image: b,   tag: "Best Seller"},
    { id: 6, name: "Ice Cake",       price: 570, image: ic,  tag: "Special"    },
  ];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FDF8FF", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img src={cb} alt="cake banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(156,39,176,0.88), rgba(233,30,99,0.75))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
          <div style={{
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 30, padding: "4px 18px", marginBottom: 14,
            color: "#fff", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase",
          }}>Every Occasion Deserves Sweetness</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, fontFamily: "'Poppins', sans-serif", textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            🎂 Celebrate With Us
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 10, fontSize: "1rem", fontWeight: 600 }}>
            Handcrafted cakes baked fresh for you
          </p>
          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap", justifyContent: "center" }}>
            {["⭐ 4.9 Rating", "🎂 Custom Orders", "🆓 Free Delivery"].map((s) => (
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
              <div style={{ color: "#9C27B0", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>
                {cakes.length} Delicious Cakes
              </div>
              <h2 style={{ color: "#1A1A2E", fontSize: "1.6rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
                Our Cake Collection
              </h2>
            </div>
            <div style={{
              background: "#F3E5F5", border: "1px solid #CE93D8",
              borderRadius: 20, padding: "6px 16px",
              color: "#9C27B0", fontSize: "0.82rem", fontWeight: 800,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
              Fresh Baked Today
            </div>
          </div>

          <div className="row">
            {cakes.map((cake) => (
              <div className="col-md-6 mb-4" key={cake.id}>
                <ProductCard item={cake} category="cake" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cake;