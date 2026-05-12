import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

const statusTheme = {
  Confirmed: { color: "#FF9800", bg: "#FFF8E1", border: "#FFE082" },
  Delivered: { color: "#4CAF50", bg: "#E8F5E9", border: "#A5D6A7" },
  Cancelled: { color: "#EF4444", bg: "#FEE2E2", border: "#FECACA" },
}

const categoryEmoji = { grocery: "🛒", food: "🍛", cake: "🎂" }

function Orders() {
  const navigate = useNavigate()
  const { orders } = useCart()

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFF8F5", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <div style={{ color: "#FF5722", letterSpacing: 3, fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
              Order History
            </div>
            <h1 style={{ color: "#1A1A2E", fontSize: "2rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
              Your Orders 📋
            </h1>
          </div>

          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "5rem", marginBottom: 20 }}>📋</div>
              <h3 style={{ color: "#1A1A2E", marginBottom: 12, fontWeight: 900 }}>No orders yet</h3>
              <p style={{ color: "#6B7280", marginBottom: 28 }}>Your order history will appear here once you place an order.</p>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "linear-gradient(135deg, #FF5722, #FF9800)",
                  color: "#fff", border: "none", borderRadius: 30,
                  padding: "14px 36px", fontWeight: 800, cursor: "pointer",
                  fontSize: "1rem", fontFamily: "'Nunito', sans-serif",
                  boxShadow: "0 6px 20px rgba(255,87,34,0.35)",
                }}
              >
                Start Ordering 🚀
              </button>
            </div>
          ) : (
            <div>
              {orders.map((order, idx) => {
                const st = statusTheme[order.status] || statusTheme.Confirmed
                return (
                  <div
                    key={order.id}
                    style={{
                      background: "#fff",
                      border: "2px solid #F3E8E3",
                      borderRadius: 24,
                      padding: 28,
                      marginBottom: 20,
                      boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.border = "2px solid #FFCCBC"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(255,87,34,0.1)" }}
                    onMouseLeave={(e) => { e.currentTarget.style.border = "2px solid #F3E8E3"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)" }}
                  >
                    {/* Order header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                      <div>
                        <div style={{ color: "#9CA3AF", fontSize: "0.78rem", fontWeight: 700, marginBottom: 4 }}>
                          Order #{orders.length - idx}
                        </div>
                        <div style={{ color: "#1A1A2E", fontWeight: 800, fontSize: "0.95rem" }}>📅 {order.date}</div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{
                          background: st.bg, color: st.color,
                          padding: "5px 16px", borderRadius: 20,
                          fontSize: "0.82rem", fontWeight: 800,
                          border: `1.5px solid ${st.border}`,
                        }}>
                          {order.status}
                        </span>
                        <span style={{
                          color: "#FF5722", fontWeight: 900, fontSize: "1.2rem",
                          background: "#FFF3EE", borderRadius: 12, padding: "4px 14px",
                        }}>₹{order.total}</span>
                      </div>
                    </div>

                    {/* Items */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                      {order.items.map((item) => (
                        <div
                          key={`${order.id}-${item.id}-${item.category}`}
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            background: "#FFF8F5", borderRadius: 14,
                            padding: "10px 16px",
                            border: "1.5px solid #F3E8E3",
                          }}
                        >
                          <img
                            src={item.image} alt={item.name}
                            style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 10 }}
                          />
                          <div>
                            <div style={{ color: "#1A1A2E", fontSize: "0.9rem", fontWeight: 800 }}>{item.name}</div>
                            <div style={{ color: "#9CA3AF", fontSize: "0.78rem", fontWeight: 600 }}>
                              {categoryEmoji[item.category]} × {item.quantity} · ₹{item.price * item.quantity}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Reorder */}
                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #F3E8E3", display: "flex", justifyContent: "flex-end" }}>
                      <button
                        onClick={() => navigate("/")}
                        style={{
                          background: "transparent", border: "2px solid #FF5722",
                          color: "#FF5722", borderRadius: 20, padding: "6px 20px",
                          fontWeight: 800, cursor: "pointer", fontSize: "0.85rem",
                          fontFamily: "'Nunito', sans-serif",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#FF5722"; e.currentTarget.style.color = "#fff" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#FF5722" }}
                      >
                        🔄 Reorder
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Orders