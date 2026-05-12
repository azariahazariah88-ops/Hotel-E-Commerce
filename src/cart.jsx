import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

const categoryTheme = {
  grocery: { color: "#4CAF50", bg: "#E8F5E9", emoji: "🛒" },
  food:    { color: "#FF5722", bg: "#FFF3EE", emoji: "🍛" },
  cake:    { color: "#9C27B0", bg: "#F3E5F5", emoji: "🎂" },
}

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, cartTotal, placeOrder } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [selected,  setSelected]  = useState(null)
  const [codDone,   setCodDone]   = useState(false)

  const handleCOD = () => {
    placeOrder()
    setCodDone(true)
    setTimeout(() => {
      setCodDone(false)
      setShowModal(false)
      navigate('/orders')
    }, 1800)
  }

  const handleRazorpay = () => {
    setShowModal(false)
    navigate('/payment', { state: { total: cartTotal } })
  }

  const methods = [
    { id: 'cod',      icon: '💵', label: 'Cash on Delivery',      desc: 'Pay when your order arrives',        action: handleCOD,      color: "#4CAF50" },
    { id: 'razorpay', icon: '💳', label: 'Pay Online (Razorpay)', desc: 'UPI · Card · NetBanking · Wallets',  action: handleRazorpay, color: "#2196F3" },
  ]

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFF8F5", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <div style={{ color: "#FF5722", letterSpacing: 3, fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", marginBottom: 8 }}>
              Your Selection
            </div>
            <h1 style={{ color: "#1A1A2E", fontSize: "2rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
              Shopping Cart 🛍️
            </h1>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{ fontSize: "5rem", marginBottom: 20 }}>🛍️</div>
              <h3 style={{ color: "#1A1A2E", marginBottom: 12, fontWeight: 900 }}>Your cart is empty</h3>
              <p style={{ color: "#6B7280", marginBottom: 28 }}>Add some delicious items to get started!</p>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: "linear-gradient(135deg, #FF5722, #FF9800)",
                  color: "#fff", border: "none", borderRadius: 30,
                  padding: "14px 36px", fontWeight: 800, cursor: "pointer",
                  fontSize: "1rem", fontFamily: "'Nunito', sans-serif",
                  boxShadow: "0 6px 20px rgba(255,87,34,0.35)",
                }}
              >
                Browse Menu →
              </button>
            </div>
          ) : (
            <div className="row">
              {/* Cart Items */}
              <div className="col-lg-8">
                {cartItems.map((item) => {
                  const theme = categoryTheme[item.category] || categoryTheme.food
                  return (
                    <div
                      key={`${item.id}-${item.category}`}
                      style={{
                        background: "#fff",
                        border: "2px solid #F3E8E3",
                        borderRadius: 20,
                        padding: 20,
                        marginBottom: 16,
                        display: "flex",
                        gap: 16,
                        alignItems: "center",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                        transition: "all 0.2s",
                      }}
                    >
                      <img
                        src={item.image} alt={item.name}
                        style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 14, flexShrink: 0, border: `2px solid ${theme.bg}` }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{
                            background: theme.bg, color: theme.color,
                            borderRadius: 10, padding: "2px 10px",
                            fontSize: "0.72rem", fontWeight: 800,
                          }}>
                            {theme.emoji} {item.category}
                          </span>
                        </div>
                        <h5 style={{ color: "#1A1A2E", marginBottom: 2, fontWeight: 800 }}>{item.name}</h5>
                        <p style={{ color: theme.color, marginBottom: 0, fontWeight: 800 }}>₹{item.price} each</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", background: "#FFF3EE", border: "1.5px solid #FFCCBC", borderRadius: 30 }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}
                          style={{ background: "transparent", border: "none", color: "#FF5722", width: 36, height: 36, cursor: "pointer", fontSize: "1.2rem", fontWeight: 900 }}
                        >−</button>
                        <span style={{ color: "#1A1A2E", width: 28, textAlign: "center", fontWeight: 800 }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}
                          style={{ background: "transparent", border: "none", color: "#FF5722", width: 36, height: 36, cursor: "pointer", fontSize: "1.2rem", fontWeight: 900 }}
                        >+</button>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 90 }}>
                        <div style={{ color: "#1A1A2E", fontWeight: 900, marginBottom: 8, fontSize: "1.05rem" }}>₹{item.price * item.quantity}</div>
                        <button
                          onClick={() => removeFromCart(item.id, item.category)}
                          style={{
                            background: "transparent", border: "1.5px solid #FECDD3",
                            color: "#EF4444", borderRadius: 20, padding: "4px 12px",
                            cursor: "pointer", fontSize: "0.8rem", fontWeight: 700,
                            fontFamily: "'Nunito', sans-serif",
                          }}
                          onMouseEnter={(e) => { e.currentTarget.style.background = "#FEE2E2" }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )
                })}

                <button
                  onClick={() => navigate('/')}
                  style={{
                    background: "transparent", border: "2px solid #F3E8E3",
                    color: "#6B7280", borderRadius: 30, padding: "10px 24px",
                    cursor: "pointer", marginTop: 8, fontFamily: "'Nunito', sans-serif", fontWeight: 700,
                  }}
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div style={{
                  background: "#fff",
                  border: "2px solid #FFE0D6",
                  borderRadius: 24, padding: 28,
                  position: "sticky", top: 88,
                  boxShadow: "0 8px 32px rgba(255,87,34,0.08)",
                }}>
                  <h4 style={{ color: "#1A1A2E", marginBottom: 24, fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
                    Order Summary
                  </h4>

                  {cartItems.map((item) => (
                    <div key={`sum-${item.id}-${item.category}`} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ color: "#6B7280", fontSize: "0.88rem", fontWeight: 600 }}>{item.name} × {item.quantity}</span>
                      <span style={{ color: "#1A1A2E", fontSize: "0.88rem", fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: "2px dashed #FFE0D6", margin: "18px 0" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#6B7280", fontWeight: 600 }}>Subtotal</span>
                    <span style={{ color: "#1A1A2E", fontWeight: 700 }}>₹{cartTotal}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ color: "#6B7280", fontWeight: 600 }}>Delivery</span>
                    <span style={{
                      color: "#4CAF50", fontWeight: 800,
                      background: "#E8F5E9", borderRadius: 10, padding: "1px 8px", fontSize: "0.85rem",
                    }}>FREE 🎉</span>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between", marginBottom: 24,
                    background: "#FFF3EE", borderRadius: 14, padding: "14px 16px",
                  }}>
                    <span style={{ color: "#FF5722", fontWeight: 800, fontSize: "1.05rem" }}>Total</span>
                    <span style={{ color: "#FF5722", fontWeight: 900, fontSize: "1.3rem" }}>₹{cartTotal}</span>
                  </div>

                  <button
                    onClick={() => { setSelected(null); setShowModal(true) }}
                    style={{
                      width: "100%",
                      background: "linear-gradient(135deg, #FF5722, #FF9800)",
                      color: "#fff", border: "none", borderRadius: 30, padding: "15px",
                      fontWeight: 900, fontSize: "1rem", cursor: "pointer",
                      fontFamily: "'Nunito', sans-serif",
                      boxShadow: "0 6px 24px rgba(255,87,34,0.4)",
                      letterSpacing: "0.3px",
                    }}
                  >
                    Place Order → 🎉
                  </button>

                  {/* Trust badges */}
                  <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                    {["🔒 Secure", "✅ Verified", "⚡ Fast"].map((b) => (
                      <span key={b} style={{ color: "#9CA3AF", fontSize: "0.72rem", fontWeight: 700 }}>{b}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showModal && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <div style={{
            background: "#fff",
            borderRadius: 28, padding: "36px 28px",
            width: "100%", maxWidth: 440,
            animation: "slideUp 0.3s ease",
            boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
          }}>
            <style>{`@keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }`}</style>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h3 style={{ color: "#1A1A2E", margin: 0, fontSize: "1.3rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
                Choose Payment
              </h3>
              <button
                onClick={() => setShowModal(false)}
                style={{ background: "#F3F4F6", border: "none", color: "#6B7280", fontSize: "1rem", cursor: "pointer", width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}
              >✕</button>
            </div>
            <p style={{ color: "#9CA3AF", fontSize: "0.85rem", marginBottom: 24 }}>
              Order total: <span style={{ color: "#FF5722", fontWeight: 900, fontSize: "1rem" }}>₹{cartTotal}</span>
            </p>

            {methods.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelected(m.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 16,
                  background: selected === m.id ? "#FFF3EE" : "#FAFAFA",
                  border: selected === m.id ? "2px solid #FF5722" : "2px solid #F3E8E3",
                  borderRadius: 16, padding: "16px 20px", marginBottom: 12,
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <div style={{
                  width: 22, height: 22, borderRadius: "50%",
                  border: selected === m.id ? `2px solid ${m.color}` : "2px solid #D1D5DB",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {selected === m.id && <div style={{ width: 11, height: 11, borderRadius: "50%", background: m.color }} />}
                </div>
                <span style={{ fontSize: "1.6rem" }}>{m.icon}</span>
                <div>
                  <div style={{ color: "#1A1A2E", fontWeight: 800, fontSize: "0.95rem" }}>{m.label}</div>
                  <div style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: 2 }}>{m.desc}</div>
                </div>
              </div>
            ))}

            <button
              onClick={() => { if (!selected || codDone) return; methods.find(m => m.id === selected)?.action() }}
              disabled={!selected || codDone}
              style={{
                width: "100%", marginTop: 8,
                background: codDone ? "linear-gradient(135deg, #4CAF50, #66BB6A)"
                  : selected ? "linear-gradient(135deg, #FF5722, #FF9800)"
                  : "#F3F4F6",
                color: codDone ? "#fff" : selected ? "#fff" : "#9CA3AF",
                border: "none", borderRadius: 30, padding: "15px",
                fontWeight: 900, fontSize: "1rem",
                cursor: selected && !codDone ? "pointer" : "not-allowed",
                fontFamily: "'Nunito', sans-serif",
                boxShadow: selected && !codDone ? "0 6px 20px rgba(255,87,34,0.3)" : "none",
                transition: "all 0.3s",
              }}
            >
              {codDone ? "✓ Order Placed! 🎉" : selected ? "Proceed →" : "Select a method"}
            </button>

            <p style={{ textAlign: "center", color: "#D1D5DB", fontSize: "0.75rem", marginTop: 16 }}>
              🔒 Your payment is safe & encrypted
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Cart