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
    { id: 4, name: "Chicken Chukka", price: 70,  image: cc,       tag: "Spicy"       },
    { id: 5, name: "Chicken 65",     price: 60,  image: c65,      tag: "Popular"     },
    { id: 6, name: "Grill",          price: 360, image: grill,    tag: "Premium"     },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>
      <Navbar />

      {/* Banner */}
      <div style={{ position: "relative", height: 300, overflow: "hidden" }}>
        <img src={fb} alt="food banner" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.55) saturate(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(28,16,8,0.7) 0%, rgba(200,65,10,0.4) 100%)" }} />
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "flex-end",
          padding: "0 0 40px",
        }}>
          <div className="container">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(200,65,10,0.25)",
              border: "1px solid rgba(200,65,10,0.4)",
              borderRadius: 999, padding: "4px 12px", marginBottom: 12,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8622A", display: "inline-block" }} />
              <span style={{ color: "#F5A87E", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Hot & Fresh — Made to Order
              </span>
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FAF7F4", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700,
              marginBottom: 8, lineHeight: 1.15,
            }}>
              Today's Menu
            </h1>
            <p style={{ color: "rgba(250,247,244,0.7)", fontSize: "0.93rem", fontWeight: 400 }}>
              Authentic South Indian flavours, delivered hot
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
              {["4.8 Rating", "25–30 min", "Free Delivery"].map((s) => (
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
              <p style={{ color: "#C8410A", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 6 }}>
                {foods.length} Items Available
              </p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#1C1008", fontSize: "1.5rem", fontWeight: 700,
              }}>
                Our Food Menu
              </h2>
            </div>
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "#F0FDF6", border: "1px solid #BBF7D0",
              borderRadius: 999, padding: "5px 14px",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
              <span style={{ color: "#166534", fontSize: "0.76rem", fontWeight: 600 }}>All Items Available</span>
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