import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, removeFromCart, updateQuantity, cartTotal, placeOrder } = useCart()
  const [showModal, setShowModal] = useState(false)
  const [selected,  setSelected]  = useState(null)
  const [codDone,   setCodDone]   = useState(false)

  const categoryEmoji = { grocery: '🛒', food: '🍛', cake: '🎂' }

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
    { id: 'cod',      icon: '💵', label: 'Cash on Delivery',      desc: 'Pay when your order arrives',        action: handleCOD      },
    { id: 'razorpay', icon: '💳', label: 'Pay Online (Razorpay)', desc: 'UPI · Card · NetBanking · Wallets',  action: handleRazorpay },
  ]

  return (
    <div style={{ fontFamily: "'Lora', serif", background: '#0d0d0d', minHeight: '100vh' }}>
      <Navbar />

      <div style={{ padding: '48px 0 80px' }}>
        <div className="container">

          <div style={{ marginBottom: 36 }}>
            <div style={{ color: '#f5c842', letterSpacing: 4, fontSize: '0.78rem', textTransform: 'uppercase', marginBottom: 8 }}>Your Selection</div>
            <h1 style={{ color: '#fff', fontSize: '2rem', fontWeight: 700 }}>Shopping Cart</h1>
          </div>

          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>🛍️</div>
              <h3 style={{ color: '#fff', marginBottom: 12 }}>Your cart is empty</h3>
              <p style={{ color: '#666', marginBottom: 28 }}>Add some delicious items to get started!</p>
              <button onClick={() => navigate('/')} style={{ background: '#f5c842', color: '#111', border: 'none', borderRadius: 30, padding: '12px 32px', fontWeight: 700, cursor: 'pointer', fontSize: '1rem', fontFamily: "'Lora', serif" }}>
                Browse Menu
              </button>
            </div>
          ) : (
            <div className="row">

              {/* Cart Items */}
              <div className="col-lg-8">
                {cartItems.map((item) => (
                  <div key={`${item.id}-${item.category}`} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: 20, marginBottom: 16, display: 'flex', gap: 18, alignItems: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 10, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span>{categoryEmoji[item.category]}</span>
                        <span style={{ color: '#888', fontSize: '0.78rem', textTransform: 'capitalize' }}>{item.category}</span>
                      </div>
                      <h5 style={{ color: '#fff', marginBottom: 4 }}>{item.name}</h5>
                      <p style={{ color: '#f5c842', marginBottom: 0 }}>₹{item.price} each</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', borderRadius: 30 }}>
                      <button onClick={() => updateQuantity(item.id, item.category, item.quantity - 1)} style={{ background: 'transparent', border: 'none', color: '#fff', width: 34, height: 36, cursor: 'pointer', fontSize: '1.1rem' }}>−</button>
                      <span style={{ color: '#fff', width: 28, textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.category, item.quantity + 1)} style={{ background: 'transparent', border: 'none', color: '#fff', width: 34, height: 36, cursor: 'pointer', fontSize: '1.1rem' }}>+</button>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 80 }}>
                      <div style={{ color: '#fff', fontWeight: 700, marginBottom: 8 }}>₹{item.price * item.quantity}</div>
                      <button onClick={() => removeFromCart(item.id, item.category)}
                        style={{ background: 'transparent', border: '1px solid #444', color: '#888', borderRadius: 20, padding: '4px 12px', cursor: 'pointer', fontSize: '0.8rem' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#e74c3c'; e.currentTarget.style.color = '#e74c3c' }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#888' }}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <button onClick={() => navigate('/')} style={{ background: 'transparent', border: '1px solid #333', color: '#aaa', borderRadius: 30, padding: '10px 24px', cursor: 'pointer', marginTop: 8, fontFamily: "'Lora', serif" }}>
                  ← Continue Shopping
                </button>
              </div>

              {/* Order Summary */}
              <div className="col-lg-4 mt-4 mt-lg-0">
                <div style={{ background: 'rgba(245,200,66,0.06)', border: '1px solid rgba(245,200,66,0.2)', borderRadius: 20, padding: 28, position: 'sticky', top: 88 }}>
                  <h4 style={{ color: '#fff', marginBottom: 24 }}>Order Summary</h4>

                  {cartItems.map((item) => (
                    <div key={`sum-${item.id}-${item.category}`} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ color: '#aaa', fontSize: '0.9rem' }}>{item.name} × {item.quantity}</span>
                      <span style={{ color: '#fff', fontSize: '0.9rem' }}>₹{item.price * item.quantity}</span>
                    </div>
                  ))}

                  <div style={{ borderTop: '1px solid #2a2a2a', margin: '18px 0' }} />

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ color: '#aaa' }}>Subtotal</span>
                    <span style={{ color: '#fff' }}>₹{cartTotal}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 18 }}>
                    <span style={{ color: '#aaa' }}>Delivery</span>
                    <span style={{ color: '#4caf50' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: '1.1rem' }}>Total</span>
                    <span style={{ color: '#f5c842', fontWeight: 700, fontSize: '1.2rem' }}>₹{cartTotal}</span>
                  </div>

                  <button
                    onClick={() => { setSelected(null); setShowModal(true) }}
                    style={{ width: '100%', background: '#f5c842', color: '#111', border: 'none', borderRadius: 30, padding: '14px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Lora', serif", transition: 'all 0.3s' }}>
                    Place Order →
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      </div>

      {/* ── PAYMENT METHOD MODAL ─────────────────────────────────── */}
      {showModal && (
        <div
          onClick={(e) => e.target === e.currentTarget && setShowModal(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 2000, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>

          <div style={{ background: '#141414', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 24, padding: '32px 28px', width: '100%', maxWidth: 430, animation: 'slideUp 0.3s ease' }}>
            <style>{`@keyframes slideUp { from{transform:translateY(30px);opacity:0} to{transform:translateY(0);opacity:1} }`}</style>

            {/* Modal header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <h3 style={{ color: '#fff', margin: 0, fontSize: '1.25rem' }}>Choose Payment Method</h3>
              <button onClick={() => setShowModal(false)} style={{ background: 'transparent', border: 'none', color: '#555', fontSize: '1.5rem', cursor: 'pointer', lineHeight: 1 }}>×</button>
            </div>
            <p style={{ color: '#444', fontSize: '0.85rem', marginBottom: 24 }}>
              Order total: <span style={{ color: '#f5c842', fontWeight: 700 }}>₹{cartTotal}</span>
            </p>

            {/* Methods */}
            {methods.map((m) => (
              <div key={m.id} onClick={() => setSelected(m.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  background: selected === m.id ? 'rgba(245,200,66,0.08)' : 'rgba(255,255,255,0.03)',
                  border: selected === m.id ? '1px solid rgba(245,200,66,0.45)' : '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 14, padding: '18px 20px', marginBottom: 12,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                {/* Radio */}
                <div style={{ width: 20, height: 20, borderRadius: '50%', border: selected === m.id ? '2px solid #f5c842' : '2px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {selected === m.id && <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f5c842' }} />}
                </div>
                <span style={{ fontSize: '1.5rem' }}>{m.icon}</span>
                <div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>{m.label}</div>
                  <div style={{ color: '#555', fontSize: '0.8rem', marginTop: 3 }}>{m.desc}</div>
                </div>
              </div>
            ))}

            {/* Proceed button */}
            <button
              onClick={() => { if (!selected || codDone) return; methods.find(m => m.id === selected)?.action() }}
              disabled={!selected || codDone}
              style={{
                width: '100%', marginTop: 8,
                background: codDone ? '#4caf50' : selected ? '#f5c842' : '#1e1e1e',
                color: codDone ? '#fff' : selected ? '#111' : '#444',
                border: 'none', borderRadius: 30, padding: '14px',
                fontWeight: 700, fontSize: '1rem',
                cursor: selected && !codDone ? 'pointer' : 'not-allowed',
                fontFamily: "'Lora', serif", transition: 'all 0.3s',
              }}>
              {codDone ? '✓ Order Placed!' : selected ? 'Proceed →' : 'Select a method'}
            </button>

            <p style={{ textAlign: 'center', color: '#2a2a2a', fontSize: '0.75rem', marginTop: 16 }}>🔒 Your payment is safe and encrypted</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Cart