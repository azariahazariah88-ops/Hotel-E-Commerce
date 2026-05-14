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
    { id: 1, name: "Rice",   price: 60,  image: rice,  tag: "Staple"    },
    { id: 2, name: "Oil",    price: 110, image: oil,   tag: "Pure"      },
    { id: 3, name: "Bread",  price: 55,  image: bread, tag: "Fresh"     },
    { id: 4, name: "Milk",   price: 50,  image: milk,  tag: "Daily"     },
    { id: 5, name: "Sugar",  price: 40,  image: sugar, tag: "Sweet"     },
    { id: 6, name: "Salt",   price: 25,  image: salt,  tag: "Essential" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>
      <Navbar />

      {/* Banner */}
      <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
        <img src={gb} alt="grocery banner" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.9)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(28,16,8,0.7) 0%, rgba(45,106,79,0.45) 100%)" }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end",
          padding: "0 0 40px",
        }}>
          <div className="container">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(45,106,79,0.25)",
              border: "1px solid rgba(45,106,79,0.4)",
              borderRadius: 999, padding: "4px 12px", marginBottom: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
              <span style={{ color: "#86EFAC", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Delivered in 10 Minutes
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FAF7F4", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700,
              marginBottom: 8, lineHeight: 1.15,
            }}>
              Fresh Grocery
            </h1>
            <p style={{ color: "rgba(250,247,244,0.7)", fontSize: "0.93rem", fontWeight: 400 }}>
              Everyday essentials, lightning fast
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              {["10-Min Delivery", "Fresh Stock", "Free Delivery"].map((s) => (
                <div key={s} style={{
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 999, padding: "4px 12px",
                  color: "rgba(250,247,244,0.85)", fontSize: "0.74rem", fontWeight: 500,
                }}>{s}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "52px 0 80px" }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
            <div>
              <p style={{ color: "#2D6A4F", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>
                {products.length} Essentials
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1C1008", fontSize: "1.5rem", fontWeight: 700,
              }}>
                Daily Essentials
              </h2>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#F0FDF6", border: "1px solid #BBF7D0",
              borderRadius: 999, padding: "5px 14px",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
              <span style={{ color: "#166534", fontSize: "0.76rem", fontWeight: 600 }}>In Stock & Ready</span>
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