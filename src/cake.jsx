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
    { id: 2, name: "Chocolate Cake", price: 500, image: cc,  tag: "Fan Fav"    },
    { id: 3, name: "Cheesecake",     price: 175, image: chc, tag: "Light"      },
    { id: 4, name: "Black Forest",   price: 500, image: bfc, tag: "Premium"    },
    { id: 5, name: "Brownie",        price: 60,  image: b,   tag: "Best Seller"},
    { id: 6, name: "Ice Cake",       price: 570, image: ic,  tag: "Special"    },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>
      <Navbar />

      {/* Banner */}
      <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
        <img src={cb} alt="cake banner" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(28,16,8,0.7) 0%, rgba(92,61,143,0.45) 100%)" }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end",
          padding: "0 0 40px",
        }}>
          <div className="container">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(92,61,143,0.25)",
              border: "1px solid rgba(92,61,143,0.4)",
              borderRadius: 999, padding: "4px 12px", marginBottom: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#9B72CF", display: "inline-block" }} />
              <span style={{ color: "#C9AEF0", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Every Occasion Deserves Sweetness
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FAF7F4", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700,
              marginBottom: 8, lineHeight: 1.15,
            }}>
              Celebrate With Us
            </h1>
            <p style={{ color: "rgba(250,247,244,0.7)", fontSize: "0.93rem", fontWeight: 400 }}>
              Handcrafted cakes baked fresh for you
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              {["4.9 Rating", "Custom Orders", "Free Delivery"].map((s) => (
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
              <p style={{ color: "#5C3D8F", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>
                {cakes.length} Delicious Cakes
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1C1008", fontSize: "1.5rem", fontWeight: 700,
              }}>
                Our Cake Collection
              </h2>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#F0FDF6", border: "1px solid #BBF7D0",
              borderRadius: 999, padding: "5px 14px",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
              <span style={{ color: "#166534", fontSize: "0.76rem", fontWeight: 600 }}>Fresh Baked Today</span>
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