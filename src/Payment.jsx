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
        name: '🍛 Hungry Layer',
        description: 'Food Order Payment',
        order_id: orderData.orderId,
        prefill: { name: user?.name || '', email: user?.email || '', contact: user?.phone || '' },
        theme: { color: '#FF5722' },
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
        minHeight: "100vh", background: "linear-gradient(135deg, #FFF8F5, #FFF3EE)",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        fontFamily: "'Nunito', sans-serif", gap: 24, padding: 20,
      }}>
        <style>{`
          @keyframes popIn  { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes fadeUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
          @keyframes confetti { 0%{transform:rotate(0deg) scale(1)} 50%{transform:rotate(180deg) scale(1.2)} 100%{transform:rotate(360deg) scale(1)} }
        `}</style>

        <div style={{ fontSize: "3rem", animation: "confetti 2s ease infinite" }}>🎉</div>
        <div style={{
          width: 100, height: 100, borderRadius: "50%",
          background: "linear-gradient(135deg, #4CAF50, #66BB6A)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "2.8rem", animation: "popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)",
          boxShadow: "0 12px 40px rgba(76,175,80,0.35)",
        }}>✓</div>

        <div style={{ textAlign: "center", animation: "fadeUp 0.5s ease 0.2s both" }}>
          <h2 style={{ color: "#1A1A2E", margin: 0, fontSize: "1.9rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
            Payment Successful!
          </h2>
          <p style={{ color: "#4CAF50", margin: "10px 0 4px", fontWeight: 900, fontSize: "1.3rem" }}>₹{total} paid ✅</p>
          <p style={{ color: "#6B7280", fontSize: "0.9rem" }}>Your delicious order is confirmed 🍛</p>
        </div>

        <div style={{
          background: "#fff", border: "2px solid #F3E8E3",
          borderRadius: 18, padding: "18px 36px", textAlign: "center",
          animation: "fadeUp 0.5s ease 0.35s both",
          boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
        }}>
          <p style={{ color: "#9CA3AF", fontSize: "0.75rem", margin: 0, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
            Payment ID
          </p>
          <p style={{ color: "#FF5722", fontSize: "0.9rem", margin: "6px 0 0", fontWeight: 800 }}>{paymentId}</p>
        </div>

        <button
          onClick={() => navigate('/orders')}
          style={{
            background: "linear-gradient(135deg, #FF5722, #FF9800)",
            color: "#fff", border: "none", borderRadius: 30,
            padding: "14px 44px", fontWeight: 900, fontSize: "1rem",
            cursor: "pointer", fontFamily: "'Nunito', sans-serif",
            animation: "fadeUp 0.5s ease 0.5s both",
            boxShadow: "0 6px 24px rgba(255,87,34,0.4)",
          }}
        >
          View My Orders →
        </button>
      </div>
    )
  }

  // PAYMENT PAGE
  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFF8F5", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ padding: "56px 0 80px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 480, padding: "0 20px" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{
              width: 80, height: 80, borderRadius: "50%",
              background: "linear-gradient(135deg, #FF5722, #FF9800)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "2.2rem", margin: "0 auto 20px",
              boxShadow: "0 8px 28px rgba(255,87,34,0.35)",
            }}>💳</div>
            <h2 style={{ color: "#1A1A2E", margin: 0, fontSize: "1.7rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
              Complete Payment
            </h2>
            <p style={{ color: "#9CA3AF", marginTop: 8, fontSize: "0.88rem", fontWeight: 600 }}>
              Secured by Razorpay · 256-bit SSL
            </p>
          </div>

          {/* Total card */}
          <div style={{
            background: "linear-gradient(135deg, #FF5722, #FF9800)",
            borderRadius: 22, padding: "24px 28px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: 24, boxShadow: "0 8px 28px rgba(255,87,34,0.3)",
          }}>
            <div>
              <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, margin: 0 }}>
                Total Amount
              </p>
              <p style={{ color: "#fff", fontWeight: 900, fontSize: "2.2rem", margin: "4px 0 0", fontFamily: "'Poppins', sans-serif" }}>
                ₹{total}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ background: "rgba(255,255,255,0.2)", borderRadius: 20, padding: "4px 14px" }}>
                <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 800 }}>🆓 Free Delivery</span>
              </div>
            </div>
          </div>

          {/* Payment methods grid */}
          <div style={{
            background: "#fff", border: "2px solid #F3E8E3",
            borderRadius: 20, padding: "20px 22px", marginBottom: 24,
            boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
          }}>
            <p style={{ color: "#9CA3AF", fontSize: "0.76rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, margin: "0 0 16px" }}>
              Accepted Methods
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {[
                { icon: "📱", label: "UPI",            desc: "GPay · PhonePe · Paytm", color: "#FF5722" },
                { icon: "💳", label: "Debit/Credit",   desc: "Visa · Mastercard",      color: "#2196F3" },
                { icon: "🏦", label: "Net Banking",    desc: "All major banks",         color: "#4CAF50" },
                { icon: "👛", label: "Wallets",        desc: "Paytm · Mobikwik",       color: "#9C27B0" },
              ].map((m) => (
                <div key={m.label} style={{
                  background: "#FFF8F5", border: "1.5px solid #F3E8E3",
                  borderRadius: 14, padding: "10px 14px",
                  display: "flex", alignItems: "center", gap: 10, flex: "1 1 45%",
                }}>
                  <span style={{ fontSize: "1.4rem" }}>{m.icon}</span>
                  <div>
                    <div style={{ color: "#1A1A2E", fontSize: "0.82rem", fontWeight: 800 }}>{m.label}</div>
                    <div style={{ color: "#9CA3AF", fontSize: "0.72rem", fontWeight: 600 }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#FEE2E2", border: "1.5px solid #FECACA",
              borderRadius: 14, padding: "14px 18px",
              color: "#EF4444", fontSize: "0.88rem", marginBottom: 20,
              display: "flex", gap: 10, alignItems: "flex-start", fontWeight: 600,
            }}>
              <span>⚠️</span><span>{error}</span>
            </div>
          )}

          {/* Pay button */}
          <button
            onClick={handlePay}
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "rgba(255,87,34,0.4)" : "linear-gradient(135deg, #FF5722, #FF9800)",
              color: "#fff", border: "none", borderRadius: 32, padding: "17px",
              fontWeight: 900, fontSize: "1.1rem",
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "'Nunito', sans-serif",
              boxShadow: loading ? "none" : "0 8px 28px rgba(255,87,34,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
              transition: "all 0.3s",
            }}
          >
            {loading ? (
              <>
                <div style={{
                  width: 22, height: 22,
                  border: "2.5px solid rgba(255,255,255,0.3)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                }} />
                Opening Razorpay...
              </>
            ) : <>💳 Pay ₹{total} Securely</>}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

          <button
            onClick={() => navigate('/cart')}
            style={{
              width: "100%", background: "transparent",
              border: "2px solid #F3E8E3", color: "#9CA3AF",
              borderRadius: 32, padding: "13px", cursor: "pointer",
              marginTop: 12, fontFamily: "'Nunito', sans-serif",
              fontSize: "0.92rem", fontWeight: 700, transition: "all 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#FFCCBC"; e.currentTarget.style.color = "#FF5722" }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#F3E8E3"; e.currentTarget.style.color = "#9CA3AF" }}
          >
            ← Back to Cart
          </button>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 24 }}>
            {["🔒 SSL Secure", "✅ RBI Compliant", "⚡ Instant Confirm"].map((b) => (
              <span key={b} style={{ color: "#D1D5DB", fontSize: "0.73rem", fontWeight: 700 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment