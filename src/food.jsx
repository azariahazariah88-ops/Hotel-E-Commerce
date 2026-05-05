import React from 'react'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate();

  const foods = [
    { id: 1, name: "Parrota", price: 15, image: parrota },
    { id: 2, name: "Wheat Parrota", price: 20, image: wp },
    { id: 3, name: "Biriyani", price: 120, image: biriyani },
    { id: 4, name: "Chicken Chukka", price: 70, image: cc },
    { id: 5, name: "Chicken 65", price: 60, image: c65 },
    { id: 6, name: "Grill", price: 360, image: grill },
  ];

  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div style={{
        position: "relative", height: 260, overflow: "hidden",
        backgroundImage: `url(${fb})`, backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#f5c842", letterSpacing: 4, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 10 }}>Hot & Fresh</div>
          <h1 style={{ color: "#fff", fontSize: "2.5rem", fontWeight: 700 }}>🍛 Grab Your Food</h1>
          <p style={{ color: "#ccc", marginTop: 8 }}>Authentic South Indian flavours, delivered hot</p>
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "48px 0 64px" }}>
        <div className="container">
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
