import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

const categoryTheme = {
  grocery: { color: "#2D6A4F", bg: "#F0FDF6", label: "Grocery" },
  food:    { color: "#C8410A", bg: "#FFF5EE", label: "Food"    },
  cake:    { color: "#5C3D8F", bg: "#F5F0FC", label: "Bakery"  },
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
    { id: 'cod',      label: 'Cash on Delivery',      desc: 'Pay when your order arrives',       action: handleCOD,      color: "#2D6A4F" },
    { id: 'razorpay', label: 'Pay Online (Razorpay)',  desc: 'UPI · Card · NetBanking · Wallets', action: handleRazorpay, color: "#1D6FA8" },
  ]

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes slideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
      <Navbar />

      <div style={{ padding: "48px 0 80px" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <p style={{ color: "#C8410A", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", marginBottom: 8 }}>
              Your Selection
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1C1008", fontSize: "2rem", fontWeight: 700,
            }}>Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
              <div style={{
                width: 80, height: 80, borderRadius: "50%",
                background: "#FFF5EE", border: "2px solid #F5D5C0",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", color: "#C8410A",
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
              </div>
              <h3 style={{ color: "#1C1008", marginBottom: 10, fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>Your cart is empty</h3>
              <p style={{ color: "#7A6458", marginBottom: 28, fontSize: "0.9rem" }}>Add some delicious items to get started.</p>
              <button
                onClick={() => navigate('/')}
                style={{
                  background: "#C8410A", color: "#fff",
                  border: "none", borderRadius: 999,
                  padding: "12px 32px", fontWeight: 600, cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Browse Menu
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
                        border: "1.5px solid #EBE0D8",
                        borderRadius: 16,
                        padding: 18,
                        marginBottom: 14,
                        display: "flex",
                        gap: 16, alignItems: "center",
                        boxShadow: "0 2px 10px rgba(28,16,8,0.05)",
                      }}
                    >
                      <img
                        src={item.image} alt={item.name}
                        style={{ width: 76, height: 76, objectFit: "cover", borderRadius: 12, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1 }}>
                        <span style={{
                          background: theme.bg, color: theme.color,
                          borderRadius: 999, padding: "2px 8px",
                          fontSize: "0.64rem", fontWeight: 700,
                          textTransform: "uppercase", letterSpacing: "0.8px",
                          display: "inline-block", marginBottom: 4,
                        }}>
                          {theme.label}
                        </span>
                        <h5 style={{
                          color: "#1C1008", fontWeight: 700,
                          fontFamily: "'Playfair Display', serif", fontSize: "0.97rem",
                          marginBottom: 2,
                        }}>{item.name}</h5>
                        <p style={{ color: theme.color, margin: 0, fontWeight: 600, fontSize: "0.85rem", fontFamily: "'DM Mono', monospace" }}>
                          ₹{item.price} each
                        </p>
                      </div>
                      {/* Qty stepper */}
                      <div style={{
                        display: "flex", alignItems: "center",
                        background: "#FAF7F4", border: "1.5px solid #EBE0D8",
                        borderRadius: 999,
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)}
                          style={{ background: "transparent", border: "none", color: "#C8410A", width: 34, height: 34, cursor: "pointer", fontSize: "1.1rem" }}
                        >−</button>
                        <span style={{ color: "#1C1008", width: 26, textAlign: "center", fontWeight: 700, fontFamily: "'DM Mono', monospace", fontSize: "0.88rem" }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)}
                          style={{ background: "transparent", border: "none", color: "#C8410A", width: 34, height: 34, cursor: "pointer", fontSize: "1.1rem" }}
                        >+</button>
                      </div>
                      <div style={{ textAlign: "right", minWidth: 90 }}>
                        <div style={{ color: "#1C1008", fontWeight: 700, marginBottom: 8, fontFamily: "'DM Mono', monospace", fontSize: "0.97rem" }}>
                          ₹{item.price * item.quantity}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id, item.category)}
                          style={{
                            background: "transparent", border: "1px solid #FECDD3",
                            color: "#DC2626", borderRadius: 999, padding: "3px 12px",
                            cursor: "pointer", fontSize: "0.76rem", fontWeight: 600,
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.background = "#FEF2F2"}
                          onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
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
                    background: "transparent", border: "1.5px solid #EBE0D8",
                    color: "#7A6458", borderRadius: 999, padding: "9px 22px",
                    cursor: "pointer", marginTop: 6, fontWeight: 600, fontSize: "0.84rem",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#C8410A"; e.currentTarget.style.color = "#C8410A" }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EBE0D8"; e.currentTarget.style.color = "#7A6458" }}
                >
                  ← Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div style={{
                  background: "#fff",
                  border: "1.5px solid #EBE0D8",
                  borderRadius: 18, padding: 26,
                  position: "sticky", top: 80,
                  boxShadow: "0 4px 20px rgba(28,16,8,0.07)",
                }}>
                  <h4 style={{
                    color: "#1C1008", marginBottom: 22, fontWeight: 700,
                    fontFamily: "'Playfair Display', serif", fontSize: "1.15rem",
                  }}>Order Summary</h4>

                  {cartItems.map((item) => (
                    <div key={`sum-${item.id}-${item.category}`}
                      style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ color: "#7A6458", fontSize: "0.84rem", fontWeight: 500 }}>{item.name} × {item.quantity}</span>
                      <span style={{ color: "#1C1008", fontSize: "0.84rem", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: "1.5px dashed #EBE0D8", margin: "18px 0" }} />

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ color: "#7A6458", fontSize: "0.86rem" }}>Subtotal</span>
                    <span style={{ color: "#1C1008", fontWeight: 600, fontFamily: "'DM Mono', monospace", fontSize: "0.86rem" }}>₹{cartTotal}</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                    <span style={{ color: "#7A6458", fontSize: "0.86rem" }}>Delivery</span>
                    <span style={{
                      color: "#166534", fontWeight: 700,
                      background: "#F0FDF6", border: "1px solid #BBF7D0",
                      borderRadius: 999, padding: "1px 8px", fontSize: "0.78rem",
                    }}>Free</span>
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    background: "#FFF5EE", border: "1px solid #F5D5C0",
                    borderRadius: 12, padding: "14px 16px", marginBottom: 22,
                  }}>
                    <span style={{ color: "#C8410A", fontWeight: 700 }}>Total</span>
                    <span style={{ color: "#C8410A", fontWeight: 700, fontSize: "1.2rem", fontFamily: "'DM Mono', monospace" }}>₹{cartTotal}</span>
                  </div>

                  <button
                    onClick={() => { setSelected(null); setShowModal(true) }}
                    style={{
                      width: "100%",
                      background: "#C8410A",
                      color: "#fff", border: "none", borderRadius: 999, padding: "14px",
                      fontWeight: 700, fontSize: "0.95rem", cursor: "pointer",
                      transition: "background 0.2s",
                      boxShadow: "0 4px 16px rgba(200,65,10,0.3)",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = "#9E3208"}
                    onMouseLeave={(e) => e.currentTarget.style.background = "#C8410A"}
                  >
                    Place Order
                  </button>

                  <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 16, flexWrap: "wrap" }}>
                    {["Secure", "Verified", "Fast"].map((b) => (
                      <span key={b} style={{ color: "#B09A90", fontSize: "0.7rem", fontWeight: 500 }}>{b}</span>
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
            background: "rgba(28,16,8,0.55)", backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
          }}
        >
          <div style={{
            background: "#fff",
            borderRadius: 22, padding: "34px 28px",
            width: "100%", maxWidth: 420,
            animation: "slideUp 0.25s ease",
            boxShadow: "0 32px 80px rgba(0,0,0,0.2)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <h3 style={{
                color: "#1C1008", margin: 0, fontSize: "1.2rem", fontWeight: 700,
                fontFamily: "'Playfair Display', serif",
              }}>Choose Payment</h3>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "#FAF7F4", border: "none", color: "#7A6458",
                  cursor: "pointer", width: 32, height: 32, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem",
                }}
              >✕</button>
            </div>
            <p style={{ color: "#B09A90", fontSize: "0.84rem", marginBottom: 22 }}>
              Total: <span style={{ color: "#C8410A", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>₹{cartTotal}</span>
            </p>

            {methods.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelected(m.id)}
                style={{
                  display: "flex", alignItems: "center", gap: 14,
                  background: selected === m.id ? "#FFF5EE" : "#FAF7F4",
                  border: selected === m.id ? `1.5px solid ${m.color}` : "1.5px solid #EBE0D8",
                  borderRadius: 14, padding: "14px 18px", marginBottom: 10,
                  cursor: "pointer", transition: "all 0.18s",
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: "50%",
                  border: selected === m.id ? `2px solid ${m.color}` : "2px solid #D1D5DB",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  {selected === m.id && (
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.color }} />
                  )}
                </div>
                <div>
                  <div style={{ color: "#1C1008", fontWeight: 600, fontSize: "0.9rem" }}>{m.label}</div>
                  <div style={{ color: "#B09A90", fontSize: "0.76rem", marginTop: 2 }}>{m.desc}</div>
                </div>
              </div>
            ))}

            <button
              onClick={() => { if (!selected || codDone) return; methods.find(m => m.id === selected)?.action() }}
              disabled={!selected || codDone}
              style={{
                width: "100%", marginTop: 8,
                background: codDone ? "#2D6A4F" : selected ? "#C8410A" : "#EBE0D8",
                color: selected ? "#fff" : "#B09A90",
                border: "none", borderRadius: 999, padding: "14px",
                fontWeight: 700, fontSize: "0.95rem",
                cursor: selected && !codDone ? "pointer" : "not-allowed",
                transition: "all 0.25s",
              }}
            >
              {codDone ? "Order Placed" : selected ? "Proceed" : "Select a method"}
            </button>

            <p style={{ textAlign: "center", color: "#D1D5DB", fontSize: "0.72rem", marginTop: 14 }}>
              Your payment is safe & encrypted
            </p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Cart