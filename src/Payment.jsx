import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from './CartContext'
import Navbar from './Navbar'
import Footer from './Footer'

function Payment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { placeOrder } = useCart()
  const [step, setStep] = useState('enter') // enter | processing | success
  const [upi, setUpi] = useState('')
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(0)

  const total = location.state?.total || 0

  const handlePay = () => {
    if (!upi.trim()) {
      setError('Please enter your UPI ID or mobile number')
      return
    }
    setError('')
    setStep('processing')

    // Animate progress bar
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 18
      if (p >= 100) {
        p = 100
        clearInterval(interval)
        setTimeout(() => {
          placeOrder()
          setStep('success')
        }, 400)
      }
      setProgress(Math.min(p, 100))
    }, 180)
  }

  const handleDone = () => {
    navigate('/orders')
  }

  // ── PROCESSING SCREEN ─────────────────────────────────────────────
  if (step === 'processing') {
    return (
      <div style={{
        minHeight: '100vh', background: '#0d0d0d',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Lora', serif", gap: 28,
      }}>
        {/* GPay logo ring */}
        <div style={{ position: 'relative', width: 100, height: 100 }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0 }}>
            <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(245,200,66,0.1)" strokeWidth="4" />
            <circle cx="50" cy="50" r="45" fill="none" stroke="#f5c842" strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 0.18s ease', transformOrigin: '50px 50px', transform: 'rotate(-90deg)' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem',
          }}>
            {progress < 100 ? '⏳' : '✓'}
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#f5c842', fontSize: '1.1rem', margin: 0 }}>
            {progress < 40 ? 'Connecting to GPay...' : progress < 80 ? 'Processing payment...' : 'Confirming...'}
          </p>
          <p style={{ color: '#555', fontSize: '0.85rem', marginTop: 8 }}>
            Please do not close this window
          </p>
        </div>

        <div style={{
          width: 260, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 4, overflow: 'hidden',
        }}>
          <div style={{
            height: '100%', borderRadius: 4,
            background: 'linear-gradient(90deg, #f5c842, #ffaa00)',
            width: `${progress}%`, transition: 'width 0.18s ease',
          }} />
        </div>
      </div>
    )
  }

  // ── SUCCESS SCREEN ────────────────────────────────────────────────
  if (step === 'success') {
    return (
      <div style={{
        minHeight: '100vh', background: '#0d0d0d',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Lora', serif", gap: 20,
      }}>
        {/* Checkmark */}
        <div style={{
          width: 90, height: 90, borderRadius: '50%',
          background: 'rgba(76,175,80,0.12)',
          border: '3px solid #4caf50',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '2.5rem',
          animation: 'popIn 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}>
          ✓
        </div>
        <style>{`@keyframes popIn { from { transform: scale(0); opacity: 0 } to { transform: scale(1); opacity: 1 } }`}</style>

        <div style={{ textAlign: 'center' }}>
          <h2 style={{ color: '#fff', margin: 0, fontSize: '1.8rem' }}>Payment Successful!</h2>
          <p style={{ color: '#4caf50', margin: '8px 0 4px', fontSize: '1.1rem', fontWeight: 700 }}>₹{total} paid via GPay</p>
          <p style={{ color: '#555', fontSize: '0.85rem' }}>Your order has been placed successfully 🎉</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 14, padding: '16px 32px', textAlign: 'center',
        }}>
          <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>Transaction ID</p>
          <p style={{ color: '#f5c842', fontSize: '0.95rem', margin: '4px 0 0', letterSpacing: 1 }}>
            TXN{Date.now().toString().slice(-10)}
          </p>
        </div>

        <button
          onClick={handleDone}
          style={{
            background: '#f5c842', color: '#111', border: 'none',
            borderRadius: 30, padding: '13px 40px',
            fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
            fontFamily: "'Lora', serif", marginTop: 8,
          }}
        >
          View Orders →
        </button>
      </div>
    )
  }

  // ── ENTRY SCREEN ──────────────────────────────────────────────────
  return (
    <div style={{ fontFamily: "'Lora', serif", background: '#0d0d0d', minHeight: '100vh' }}>
      <Navbar />
      <div style={{ padding: '60px 0 80px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: 440, padding: '0 20px' }}>

          {/* Header */}
          <div style={{ marginBottom: 32, textAlign: 'center' }}>
            <div style={{ fontSize: '2.8rem', marginBottom: 12 }}>
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png"
                alt="GPay" style={{ height: 48, objectFit: 'contain' }} />
            </div>
            <h2 style={{ color: '#fff', margin: 0 }}>Pay with GPay</h2>
            <p style={{ color: '#666', marginTop: 6, fontSize: '0.9rem' }}>Secure UPI payment</p>
          </div>

          {/* Amount card */}
          <div style={{
            background: 'rgba(245,200,66,0.07)',
            border: '1px solid rgba(245,200,66,0.25)',
            borderRadius: 16, padding: '20px 24px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 28,
          }}>
            <span style={{ color: '#aaa', fontSize: '0.9rem' }}>Amount to pay</span>
            <span style={{ color: '#f5c842', fontWeight: 700, fontSize: '1.5rem' }}>₹{total}</span>
          </div>

          {/* UPI input */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ color: '#aaa', fontSize: '0.82rem', letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 8 }}>
              UPI ID / Mobile Number
            </label>
            <input
              value={upi}
              onChange={(e) => { setUpi(e.target.value); setError('') }}
              placeholder="yourname@upi or 9876543210"
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: error ? '1px solid #e74c3c' : '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12, padding: '14px 18px',
                color: '#fff', fontSize: '1rem', fontFamily: "'Lora', serif",
                boxSizing: 'border-box', outline: 'none',
                transition: 'border 0.2s',
              }}
              onFocus={(e) => e.target.style.border = '1px solid rgba(245,200,66,0.5)'}
              onBlur={(e) => e.target.style.border = error ? '1px solid #e74c3c' : '1px solid rgba(255,255,255,0.12)'}
            />
            {error && <p style={{ color: '#e74c3c', fontSize: '0.82rem', marginTop: 6 }}>{error}</p>}
          </div>

          {/* Quick UPI options */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 28, flexWrap: 'wrap' }}>
            {['@okicici', '@oksbi', '@ybl', '@paytm'].map((suffix) => (
              <button
                key={suffix}
                onClick={() => setUpi((prev) => prev.split('@')[0] + suffix)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#aaa', borderRadius: 20,
                  padding: '5px 14px', cursor: 'pointer',
                  fontSize: '0.8rem', fontFamily: "'Lora', serif",
                }}
              >
                {suffix}
              </button>
            ))}
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            style={{
              width: '100%', background: '#f5c842', color: '#111',
              border: 'none', borderRadius: 30, padding: '15px',
              fontWeight: 700, fontSize: '1.05rem', cursor: 'pointer',
              fontFamily: "'Lora', serif",
              boxShadow: '0 4px 24px rgba(245,200,66,0.3)',
            }}
          >
            Pay ₹{total} →
          </button>

          {/* Back */}
          <button
            onClick={() => navigate('/cart')}
            style={{
              width: '100%', background: 'transparent',
              border: '1px solid #222', color: '#666',
              borderRadius: 30, padding: '12px',
              cursor: 'pointer', marginTop: 12,
              fontFamily: "'Lora', serif", fontSize: '0.9rem',
            }}
          >
            ← Back to Cart
          </button>

          {/* Security note */}
          <p style={{ textAlign: 'center', color: '#333', fontSize: '0.78rem', marginTop: 24 }}>
            🔒 Payments are encrypted and secure
          </p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Payment