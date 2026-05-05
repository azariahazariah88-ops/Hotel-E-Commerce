import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();

  const cakes = [
    { id: 1, name: "Vanilla Cake", price: 375, image: vc },
    { id: 2, name: "Chocolate Cake", price: 500, image: cc },
    { id: 3, name: "Cheesecake", price: 175, image: chc },
    { id: 4, name: "Black Forest", price: 500, image: bfc },
    { id: 5, name: "Brownie", price: 60, image: b },
    { id: 6, name: "Ice Cake", price: 570, image: ic },
  ];

  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div style={{
        position: "relative", height: 260, overflow: "hidden",
        backgroundImage: `url(${cb})`, backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#f5c842", letterSpacing: 4, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 10 }}>Every occasion deserves sweetness</div>
          <h1 style={{ color: "#fff", fontSize: "2.5rem", fontWeight: 700 }}>🎂 Celebrate With Us</h1>
          <p style={{ color: "#ccc", marginTop: 8 }}>Handcrafted cakes baked fresh for you</p>
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "48px 0 64px" }}>
        <div className="container">
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
