import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

function Orders() {
  const navigate = useNavigate();
  const { orders } = useCart();

  const statusColor = { Confirmed: "#f5c842", Delivered: "#4caf50", Cancelled: "#e74c3c" };
  const categoryEmoji = { grocery: "🛒", food: "🍛", cake: "🎂" };

  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <div style={{ color: "#f5c842", letterSpacing: 4, fontSize: "0.78rem", textTransform: "uppercase", marginBottom: 8 }}>History</div>
            <h1 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700 }}>Your Orders</h1>
          </div>

          {orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "4rem", marginBottom: 20 }}>📋</div>
              <h3 style={{ color: "#fff", marginBottom: 12 }}>No orders yet</h3>
              <p style={{ color: "#666", marginBottom: 28 }}>Your order history will appear here.</p>
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "#f5c842", color: "#111", border: "none", borderRadius: 30,
                  padding: "12px 32px", fontWeight: 700, cursor: "pointer", fontSize: "1rem",
                  fontFamily: "'Lora', serif",
                }}
              >
                Start Ordering
              </button>
            </div>
          ) : (
            <div>
              {orders.map((order, idx) => (
                <div
                  key={order.id}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 20,
                    padding: 28,
                    marginBottom: 24,
                  }}
                >
                  {/* Order header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
                    <div>
                      <div style={{ color: "#888", fontSize: "0.8rem", marginBottom: 4 }}>Order #{orders.length - idx}</div>
                      <div style={{ color: "#fff", fontWeight: 600 }}>Placed on {order.date}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{
                        background: `rgba(${order.status === "Confirmed" ? "245,200,66" : order.status === "Delivered" ? "76,175,80" : "231,76,60"},0.15)`,
                        color: statusColor[order.status] || "#f5c842",
                        padding: "5px 16px",
                        borderRadius: 20,
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        border: `1px solid ${statusColor[order.status] || "#f5c842"}40`,
                      }}>
                        {order.status}
                      </span>
                      <span style={{ color: "#f5c842", fontWeight: 700, fontSize: "1.15rem" }}>₹{order.total}</span>
                    </div>
                  </div>

                  {/* Items */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {order.items.map((item) => (
                      <div
                        key={`${order.id}-${item.id}-${item.category}`}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          background: "rgba(255,255,255,0.04)",
                          borderRadius: 12,
                          padding: "10px 16px",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8 }}
                        />
                        <div>
                          <div style={{ color: "#fff", fontSize: "0.9rem", fontWeight: 500 }}>{item.name}</div>
                          <div style={{ color: "#888", fontSize: "0.8rem" }}>
                            {categoryEmoji[item.category]} × {item.quantity} · ₹{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Orders;
