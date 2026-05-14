import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

const statusTheme = {
  Confirmed: { color: "#B8860B", bg: "#FEFCE8", border: "#FDE68A" },
  Delivered: { color: "#166534", bg: "#F0FDF6", border: "#BBF7D0" },
  Cancelled: { color: "#991B1B", bg: "#FEF2F2", border: "#FECACA" },
}

const categoryLabel = { grocery: "Grocery", food: "Food", cake: "Bakery" }

function Orders() {
  const navigate = useNavigate()
  const { orders } = useCart()

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');`}</style>
      <Navbar />

      <div style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <p style={{ color: "#C8410A", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8 }}>
              Order History
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1C1008", fontSize: "2rem", fontWeight: 700,
            }}>Your Orders</h1>
          </div>

          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "#FFF5EE", border: "2px solid #F5D5C0",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", color: "#C8410A",
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="8" y1="13" x2="16" y2="13"/>
                  <line x1="8" y1="17" x2="16" y2="17"/>
                </svg>
              </div>
              <h3 style={{ color: "#1C1008", marginBottom: 10, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>No orders yet</h3>
              <p style={{ color: "#7A6458", marginBottom: 28, fontSize: "0.9rem" }}>
                Your order history will appear here once you place an order.
              </p>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "#C8410A", color: "#fff", border: "none",
                  borderRadius: 999, padding: "12px 32px",
                  fontWeight: 600, cursor: "pointer", fontSize: "0.9rem",
                }}
              >
                Start Ordering
              </button>
            </div>
          ) : (
            orders.map((order, idx) => {
              const st = statusTheme[order.status] || statusTheme.Confirmed
              return (
                <div
                  key={order.id}
                  style={{
                    background: "#fff",
                    border: "1.5px solid #EBE0D8",
                    borderRadius: 18,
                    padding: 26,
                    marginBottom: 18,
                    boxShadow: "0 2px 12px rgba(28,16,8,0.05)",
                    transition: "box-shadow 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F5D5C0"; e.currentTarget.style.boxShadow = "0 8px 28px rgba(200,65,10,0.08)" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EBE0D8"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(28,16,8,0.05)" }}
                >
                  {/* Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <p style={{ color: "#B09A90", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>
                        Order #{orders.length - idx}
                      </p>
                      <p style={{ color: "#1C1008", fontWeight: 600, fontSize: "0.88rem", margin: 0 }}>{order.date}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{
                        background: st.bg, color: st.color,
                        padding: "4px 14px", borderRadius: 999,
                        fontSize: "0.76rem", fontWeight: 700,
                        border: `1px solid ${st.border}`,
                      }}>
                        {order.status}
                      </span>
                      <span style={{
                        color: "#C8410A", fontWeight: 700,
                        fontFamily: "'DM Mono', monospace", fontSize: "1.1rem",
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
                          background: "#FAF7F4", borderRadius: 12,
                          padding: "10px 14px",
                          border: "1px solid #EBE0D8",
                        }}
                      >
                        <img
                          src={item.image} alt={item.name}
                          style={{ width: 46, height: 46, objectFit: "cover", borderRadius: 8 }}
                        />
                        <div>
                          <p style={{ color: "#1C1008", fontSize: "0.86rem", fontWeight: 600, margin: 0 }}>{item.name}</p>
                          <p style={{ color: "#B09A90", fontSize: "0.74rem", margin: "2px 0 0", fontFamily: "'DM Mono', monospace" }}>
                            {categoryLabel[item.category]} · ×{item.quantity} · ₹{item.price * item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Reorder */}
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid #EBE0D8", display: "flex", justifyContent: "flex-end" }}>
                    <button
                      onClick={() => navigate("/")}
                      style={{
                        background: "transparent", border: "1.5px solid #C8410A",
                        color: "#C8410A", borderRadius: 999, padding: "6px 20px",
                        fontWeight: 600, cursor: "pointer", fontSize: "0.82rem",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#C8410A"; e.currentTarget.style.color = "#fff" }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#C8410A" }}
                    >
                      Reorder
                    </button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Orders