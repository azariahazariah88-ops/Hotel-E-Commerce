import React from 'react'
import parrota from './assets/parrota.jpg'
import wp from './assets/wheat_parotta.jpg'
import cc from './assets/chicken_chukka.jpg'
import biriyani from './assets/biriyani.jpg'
import c65 from './assets/65.jpg'
import grill from './assets/grill.jpg'
import fb from './assets/fb.jpg'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductCard from './ProductCard'

function Food() {
  const foods = [
    { id: 1, name: "Parrota",        price: 15,  image: parrota,  tag: "Classic"     },
    { id: 2, name: "Wheat Parrota",  price: 20,  image: wp,       tag: "Healthy"     },
    { id: 3, name: "Biriyani",       price: 120, image: biriyani, tag: "Best Seller" },
    { id: 4, name: "Chicken Chukka", price: 70,  image: cc,       tag: "Spicy 🌶️"   },
    { id: 5, name: "Chicken 65",     price: 60,  image: c65,      tag: "Popular"     },
    { id: 6, name: "Grill",          price: 360, image: grill,    tag: "Premium"     },
  ];

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFF8F5", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
        <img src={fb} alt="food banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(255,87,34,0.88), rgba(255,152,0,0.75))" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
          <div style={{
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 30, padding: "4px 18px", marginBottom: 14,
            color: "#fff", fontSize: "0.78rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase",
          }}>Hot & Fresh — Made to Order</div>
          <h1 style={{ color: "#fff", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, fontFamily: "'Poppins', sans-serif", textAlign: "center", textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
            🍛 Grab Your Food
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", marginTop: 10, fontSize: "1rem", fontWeight: 600 }}>
            Authentic South Indian flavours, delivered hot
          </p>
          {/* Stats */}
          <div style={{ display: "flex", gap: 20, marginTop: 18, flexWrap: "wrap", justifyContent: "center" }}>
            {["⭐ 4.8 Rating", "🕐 25-30 min", "🆓 Free Delivery"].map((s) => (
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
          {/* Section header */}
          <div style={{ marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ color: "#FF5722", fontSize: "0.75rem", fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 6 }}>
                {foods.length} Items Available
              </div>
              <h2 style={{ color: "#1A1A2E", fontSize: "1.6rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
                Today's Menu
              </h2>
            </div>
            <div style={{
              background: "#FFF3EE", border: "1px solid #FFCCBC",
              borderRadius: 20, padding: "6px 16px",
              color: "#FF5722", fontSize: "0.82rem", fontWeight: 800,
              display: "flex", alignItems: "center", gap: 6,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", display: "inline-block" }} />
              All Items Available
            </div>
          </div>

          <div className="row">
            {foods.map((food) => (
              <div className="col-md-6 mb-4" key={food.id}>
                <ProductCard item={food} category="food" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Food;