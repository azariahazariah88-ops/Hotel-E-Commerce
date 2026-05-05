import React from 'react'
import rice from './assets/rice.jpg'
import oil from './assets/oil.jpg'
import bread from './assets/bread.jpg'
import milk from './assets/milk.png'
import sugar from './assets/sugar.jpg'
import salt from './assets/salt.jpg'
import gb from './assets/gb.png'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ProductCard from './ProductCard'

function Grocery() {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Rice", price: 60, image: rice },
    { id: 2, name: "Oil", price: 110, image: oil },
    { id: 3, name: "Bread", price: 55, image: bread },
    { id: 4, name: "Milk", price: 50, image: milk },
    { id: 5, name: "Sugar", price: 40, image: sugar },
    { id: 6, name: "Salt", price: 25, image: salt },
  ];

  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar />

      {/* Banner */}
      <div style={{
        position: "relative", height: 260, overflow: "hidden",
        backgroundImage: `url(${gb})`, backgroundSize: "cover", backgroundPosition: "center",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
        <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ color: "#f5c842", letterSpacing: 4, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 10 }}>Delivered in 10 minutes</div>
          <h1 style={{ color: "#fff", fontSize: "2.5rem", fontWeight: 700 }}>🛒 Fresh Grocery</h1>
          <p style={{ color: "#ccc", marginTop: 8 }}>Everyday essentials, lightning fast</p>
        </div>
      </div>

      {/* Products */}
      <div style={{ padding: "48px 0 64px" }}>
        <div className="container">
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
