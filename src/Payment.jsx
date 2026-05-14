import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from './CartContext'
import { useAuth } from './AuthContext'
import Navbar from './Navbar'
import Footer from './Footer'

const RAZORPAY_KEY_ID = "rzp_test_SmMsfEIIPGYzQw"
const BACKEND_URL     = "https://hotel-e-commerce-bakend.onrender.com"

function Payment() {
  const navigate       = useNavigate()
  const location       = useLocation()
  const { placeOrder } = useCart()
  const { user }       = useAuth()

  const total = location.state?.total || 0

  const [loading,   setLoading]   = useState(false)
  const [error,     setError]     = useState('')
  const [success,   setSuccess]   = useState(false)
  const [paymentId, setPaymentId] = useState('')

  const loadRazorpay = () =>
    new Promise((resolve) => {
      if (window.Razorpay) return resolve(true)
      const script   = document.createElement('script')
      script.src     = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onload  = () => resolve(true)
      script.onerror = () => resolve(false)
      document.body.appendChild(script)
    })

  const handlePay = async () => {
    setError('')
    setLoading(true)
    const sdkLoaded = await loadRazorpay()
    if (!sdkLoaded) {
      setError('Could not load Razorpay. Check your internet connection.')
      setLoading(false)
      return
    }
    try {
      const orderRes  = await fetch(`${BACKEND_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      })
      const orderData = await orderRes.json()
      if (!orderRes.ok) { setError(orderData.message || 'Failed to create order.'); setLoading(false); return }

      const options = {
        key: RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Hungry Layer',
        description: 'Food Order Payment',
        order_id: orderData.orderId,
        prefill: { name: user?.name || '', email: user?.email || '', contact: user?.phone || '' },
        theme: { color: '#C8410A' },
        handler: async (response) => {
          try {
            const verifyRes  = await fetch(`${BACKEND_URL}/payment/verify`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            })
            const verifyData = await verifyRes.json()
            if (verifyData.success) {
              placeOrder()
              setPaymentId(verifyData.paymentId)
              setSuccess(true)
            } else {
              setError('Payment verification failed. Please contact support.')
            }
          } catch { setError('Verification request failed. Please try again.') }
          setLoading(false)
        },
        modal: { ondismiss: () => { setLoading(false); setError('Payment was cancelled.') } }
      }
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (r) => { setError(`Payment failed: ${r.error.description}`); setLoading(false) })
      rzp.open()
    } catch (err) {
      setError('Something went wrong: ' + err.message)
      setLoading(false)
    }
  }

  // SUCCESS SCREEN
  if (success) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #FAF7F4, #FFF5EE)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'DM Sans', sans-serif", gap: 24, padding: 20,
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
          @keyframes popIn  { from{transform:scale(0.7);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes fadeUp { from{transform:translateY(18px);opacity:0} to{transform:translateY(0);opacity:1} }
          @keyframes confetti { 0%,100%{transform:rotate(-5deg) scale(1)} 50%{transform:rotate(5deg) scale(1.08)} }
        `}</style>

        <div style={{
          width: 88, height: 88, borderRadius: "50%",
          background: "linear-gradient(135deg, #2D6A4F, #16A34A)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 12px 40px rgba(45,106,79,0.3)",
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>

        <div style={{ textAlign: "center", animation: "fadeUp 0.4s ease 0.15s both" }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            color: "#1C1008", margin: 0, fontSize: "1.8rem", fontWeight: 700,
          }}>Payment Successful</h2>
          <p style={{ color: "#2D6A4F", margin: "10px 0 4px", fontWeight: 700, fontSize: "1.2rem", fontFamily: "'DM Mono', monospace" }}>
            ₹{total} paid
          </p>
          <p style={{ color: "#7A6458", fontSize: "0.88rem" }}>Your delicious order is confirmed.</p>
        </div>

        <div style={{
          background: "#fff", border: "1.5px solid #EBE0D8",
          borderRadius: 14, padding: "16px 32px", textAlign: "center",
          animation: "fadeUp 0.4s ease 0.3s both",
          boxShadow: "0 4px 16px rgba(28,16,8,0.06)",
        }}>
          <p style={{ color: "#B09A90", fontSize: "0.68rem", margin: 0, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px" }}>
            Payment ID
          </p>
          <p style={{ color: "#C8410A", fontSize: "0.84rem", margin: "6px 0 0", fontWeight: 600, fontFamily: "'DM Mono', monospace" }}>
            {paymentId}
          </p>
        </div>

        <button
          onClick={() => navigate('/orders')}
          style={{
            background: "#C8410A", color: "#fff",
            border: "none", borderRadius: 999,
            padding: "13px 40px", fontWeight: 700, fontSize: "0.95rem",
            cursor: "pointer",
            animation: "fadeUp 0.4s ease 0.45s both",
            boxShadow: "0 6px 24px rgba(200,65,10,0.35)",
          }}
        >
          View My Orders
        </button>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        @keyframes spin { to { transform: rotate(360deg) } }
      `}</style>
      <Navbar />
      <div style={{ padding: "56px 0 80px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 460, padding: "0 20px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "linear-gradient(135deg, #C8410A, #E8622A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
              boxShadow: "0 8px 28px rgba(200,65,10,0.3)",
            }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                <line x1="1" y1="10" x2="23" y2="10"/>
              </svg>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1C1008", margin: 0, fontSize: "1.6rem", fontWeight: 700,
            }}>Complete Payment</h2>
            <p style={{ color: "#B09A90", marginTop: 8, fontSize: "0.84rem" }}>
              Secured by Razorpay · 256-bit SSL
            </p>
          </div>

          {/* Total card */}
          <div style={{
            background: "linear-gradient(135deg, #C8410A, #E8622A)",
            borderRadius: 18, padding: "22px 26px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 22, boxShadow: "0 8px 28px rgba(200,65,10,0.28)",
          }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1.5px", margin: 0 }}>
                Total Amount
              </p>
              <p style={{
                color: "#fff", fontWeight: 700, fontSize: "2rem", margin: "4px 0 0",
                fontFamily: "'DM Mono', monospace",
              }}>₹{total}</p>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.18)", borderRadius: 999, padding: "4px 12px",
            }}>
              <span style={{ color: "#fff", fontSize: "0.78rem", fontWeight: 600 }}>Free Delivery</span>
            </div>
          </div>

          {/* Payment methods */}
          <div style={{
            background: "#fff", border: "1.5px solid #EBE0D8",
            borderRadius: 16, padding: "18px 20px", marginBottom: 22,
            boxShadow: "0 2px 10px rgba(28,16,8,0.05)",
          }}>
            <p style={{ color: "#B09A90", fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "2px", margin: "0 0 14px" }}>
              Accepted Methods
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {[
                { label: "UPI",          desc: "GPay · PhonePe · Paytm" },
                { label: "Debit/Credit", desc: "Visa · Mastercard"      },
                { label: "Net Banking",  desc: "All major banks"         },
                { label: "Wallets",      desc: "Paytm · Mobikwik"       },
              ].map((m) => (
                <div key={m.label} style={{
                  background: "#FAF7F4", border: "1px solid #EBE0D8",
                  borderRadius: 10, padding: "8px 12px",
                  flex: "1 1 45%",
                }}>
                  <div style={{ color: "#1C1008", fontSize: "0.8rem", fontWeight: 600 }}>{m.label}</div>
                  <div style={{ color: "#B09A90", fontSize: "0.7rem", marginTop: 2 }}>{m.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: 12, padding: "12px 16px",
              color: "#991B1B", fontSize: "0.84rem", marginBottom: 18,
              display: "flex", gap: 8, alignItems: "flex-start",
            }}>
              <span style={{ flexShrink: 0 }}>⚠</span><span>{error}</span>
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "rgba(200,65,10,0.4)" : "#C8410A",
              color: "#fff", border: "none", borderRadius: 999, padding: "15px",
              fontWeight: 700, fontSize: "1rem",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 8px 28px rgba(200,65,10,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
              transition: "background 0.25s",
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 20, height: 20,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                Opening Razorpay...
              </>
            ) : <>Pay ₹{total} Securely</>}
          </button>

          <button
            onClick={() => navigate('/cart')}
            style={{
              width: "100%", background: "transparent",
              border: "1.5px solid #EBE0D8", color: "#B09A90",
              borderRadius: 999, padding: "12px", cursor: "pointer",
              marginTop: 10, fontSize: "0.88rem", fontWeight: 600,
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#F5D5C0"; e.currentTarget.style.color = "#C8410A" }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#EBE0D8"; e.currentTarget.style.color = "#B09A90" }}
          >
            Back to Cart
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 22 }}>
            {["SSL Secure", "RBI Compliant", "Instant Confirm"].map((b) => (
              <span key={b} style={{ color: "#D1D5DB", fontSize: "0.7rem", fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment