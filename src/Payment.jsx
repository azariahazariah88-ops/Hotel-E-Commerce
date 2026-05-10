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
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ amount: total }),
      })
      const orderData = await orderRes.json()

      if (!orderRes.ok) {
        setError(orderData.message || 'Failed to create payment order.')
        setLoading(false)
        return
      }

      const options = {
        key:         RAZORPAY_KEY_ID,
        amount:      orderData.amount,
        currency:    orderData.currency,
        name:        '🍛 Hungry Layer',
        description: 'Food Order Payment',
        order_id:    orderData.orderId,
        prefill: {
          name:    user?.name  || '',
          email:   user?.email || '',
          contact: user?.phone || '',
        },
        notes:  { address: 'Hungry Layer Restaurant' },
        theme:  { color: '#f5c842' },

        handler: async (response) => {
          try {
            const verifyRes  = await fetch(`${BACKEND_URL}/payment/verify`, {
              method:  'POST',
              headers: { 'Content-Type': 'application/json' },
              body:    JSON.stringify({
                razorpay_order_id:   response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature:  response.razorpay_signature,
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
          } catch {
            setError('Verification request failed. Please try again.')
          }
          setLoading(false)
        },

        modal: {
          ondismiss: () => {
            setLoading(false)
            setError('Payment was cancelled. You can try again anytime.')
          }
        }
      }

      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (response) => {
        setError(`Payment failed: ${response.error.description}`)
        setLoading(false)
      })
      rzp.open()

    } catch (err) {
      setError('Something went wrong: ' + err.message)
      setLoading(false)
    }
  }

  // ── SUCCESS SCREEN ────────────────────────────────────────────────
  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: "'Lora', serif", gap: 24, padding: 20 }}>
        <style>{`
          @keyframes popIn  { from{transform:scale(0);opacity:0} to{transform:scale(1);opacity:1} }
          @keyframes fadeUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
        `}</style>
        <div style={{ width: 100, height: 100, borderRadius: '50%', background: 'rgba(76,175,80,0.12)', border: '3px solid #4caf50', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.8rem', animation: 'popIn 0.6s cubic-bezier(0.34,1.56,0.64,1)' }}>✓</div>
        <div style={{ textAlign: 'center', animation: 'fadeUp 0.5s ease 0.2s both' }}>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.8rem' }}>Payment Successful!</h2>
          <p style={{ color: '#4caf50', margin: '10px 0 4px', fontWeight: 700, fontSize: '1.2rem' }}>₹{total} paid via Razorpay</p>
          <p style={{ color: '#555', fontSize: '0.88rem' }}>Your order has been confirmed 🎉</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 16, padding: '20px 36px', textAlign: 'center', animation: 'fadeUp 0.5s ease 0.35s both' }}>
          <p style={{ color: '#666', fontSize: '0.78rem', margin: 0, letterSpacing: 1, textTransform: 'uppercase' }}>Payment ID</p>
          <p style={{ color: '#f5c842', fontSize: '0.95rem', margin: '6px 0 0', letterSpacing: 0.5 }}>{paymentId}</p>
        </div>
        <button onClick={() => navigate('/orders')} style={{ background: '#f5c842', color: '#111', border: 'none', borderRadius: 30, padding: '14px 44px', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', fontFamily: "'Lora', serif", animation: 'fadeUp 0.5s ease 0.5s both' }}>
          View My Orders →
        </button>
      </div>
    )
  }

  // ── PAYMENT PAGE ──────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Lora', serif", background: '#0d0d0d', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '56px 0 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 460, padding: '0 20px' }}>

          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'rgba(245,200,66,0.08)', border: '2px solid rgba(245,200,66,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', margin: '0 auto 18px' }}>💳</div>
            <h2 style={{ color: '#fff', margin: 0, fontSize: '1.7rem' }}>Complete Your Payment</h2>
            <p style={{ color: '#555', marginTop: 8, fontSize: '0.88rem' }}>Secured by Razorpay · 256-bit SSL Encrypted</p>
          </div>

          <div style={{ background: 'linear-gradient(135deg, rgba(245,200,66,0.1), rgba(245,200,66,0.04))', border: '1px solid rgba(245,200,66,0.3)', borderRadius: 18, padding: '22px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
            <div>
              <p style={{ color: '#888', fontSize: '0.8rem', margin: 0, textTransform: 'uppercase', letterSpacing: 1 }}>Total Amount</p>
              <p style={{ color: '#f5c842', fontWeight: 700, fontSize: '2rem', margin: '4px 0 0' }}>₹{total}</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ color: '#555', fontSize: '0.78rem', margin: 0 }}>Delivery</p>
              <p style={{ color: '#4caf50', fontSize: '0.9rem', margin: '4px 0 0', fontWeight: 600 }}>FREE</p>
            </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 16, padding: '20px 22px', marginBottom: 28 }}>
            <p style={{ color: '#444', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: 1.5, margin: '0 0 16px' }}>Accepted Payment Methods</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {[
                { icon: '📱', label: 'UPI',            desc: 'GPay, PhonePe, Paytm'   },
                { icon: '💳', label: 'Debit / Credit', desc: 'Visa, Mastercard, RuPay' },
                { icon: '🏦', label: 'Net Banking',    desc: 'All major banks'         },
                { icon: '👛', label: 'Wallets',        desc: 'Paytm, Mobikwik'        },
              ].map((m) => (
                <div key={m.label} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 12, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10, flex: '1 1 45%' }}>
                  <span style={{ fontSize: '1.4rem' }}>{m.icon}</span>
                  <div>
                    <div style={{ color: '#ddd', fontSize: '0.85rem', fontWeight: 600 }}>{m.label}</div>
                    <div style={{ color: '#555', fontSize: '0.75rem' }}>{m.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div style={{ background: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.25)', borderRadius: 12, padding: '14px 18px', color: '#e74c3c', fontSize: '0.88rem', marginBottom: 20, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span>⚠️</span><span>{error}</span>
            </div>
          )}

          <button onClick={handlePay} disabled={loading}
            style={{ width: '100%', background: loading ? 'rgba(245,200,66,0.4)' : '#f5c842', color: '#111', border: 'none', borderRadius: 32, padding: '16px', fontWeight: 700, fontSize: '1.08rem', cursor: loading ? 'not-allowed' : 'pointer', fontFamily: "'Lora', serif", boxShadow: loading ? 'none' : '0 6px 28px rgba(245,200,66,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, transition: 'all 0.3s' }}>
            {loading ? (
              <>
                <div style={{ width: 20, height: 20, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#111', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
                Opening Razorpay...
              </>
            ) : <>💳 Pay ₹{total} Securely</>}
          </button>
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>

          <button onClick={() => navigate('/cart')}
            style={{ width: '100%', background: 'transparent', border: '1px solid #1e1e1e', color: '#444', borderRadius: 32, padding: '13px', cursor: 'pointer', marginTop: 14, fontFamily: "'Lora', serif", fontSize: '0.92rem', transition: 'all 0.2s' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.color = '#888' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1e'; e.currentTarget.style.color = '#444' }}>
            ← Back to Cart
          </button>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 28 }}>
            {['🔒 SSL Secure', '✅ RBI Compliant', '⚡ Instant Confirm'].map((badge) => (
              <span key={badge} style={{ color: '#2a2a2a', fontSize: '0.75rem' }}>{badge}</span>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment