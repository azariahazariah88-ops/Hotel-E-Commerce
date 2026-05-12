import './App.css'
import pro1 from './assets/bg.png'
import pro2 from './assets/bg1.png'
import pro3 from './assets/bg2.png'
import { useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useRef, useEffect } from 'react'
import { useCart } from './CartContext'

import parrota  from './assets/parrota.jpg'
import wp       from './assets/wheat_parotta.jpg'
import cc       from './assets/chicken_chukka.jpg'
import biriyani from './assets/biriyani.jpg'
import c65      from './assets/65.jpg'
import grill    from './assets/grill.jpg'
import vcImg    from './assets/vc.jpg'
import ccImg    from './assets/cc.jpg'
import chcImg   from './assets/chc.jpg'
import bfcImg   from './assets/bfc.jpg'
import bImg     from './assets/b.jpg'
import icImg    from './assets/ic.jpg'
import rice     from './assets/rice.jpg'
import oil      from './assets/oil.jpg'
import bread    from './assets/bread.jpg'
import milk     from './assets/milk.png'
import sugar    from './assets/sugar.jpg'
import salt     from './assets/salt.jpg'

const ALL_ITEMS = [
  { id: 1,  name: "Parrota",        price: 15,  image: parrota,  category: "food"    },
  { id: 2,  name: "Wheat Parrota",  price: 20,  image: wp,       category: "food"    },
  { id: 3,  name: "Biriyani",       price: 120, image: biriyani, category: "food"    },
  { id: 4,  name: "Chicken Chukka", price: 70,  image: cc,       category: "food"    },
  { id: 5,  name: "Chicken 65",     price: 60,  image: c65,      category: "food"    },
  { id: 6,  name: "Grill",          price: 360, image: grill,    category: "food"    },
  { id: 7,  name: "Vanilla Cake",   price: 375, image: vcImg,    category: "cake"    },
  { id: 8,  name: "Chocolate Cake", price: 500, image: ccImg,    category: "cake"    },
  { id: 9,  name: "Cheesecake",     price: 175, image: chcImg,   category: "cake"    },
  { id: 10, name: "Black Forest",   price: 500, image: bfcImg,   category: "cake"    },
  { id: 11, name: "Brownie",        price: 60,  image: bImg,     category: "cake"    },
  { id: 12, name: "Ice Cake",       price: 570, image: icImg,    category: "cake"    },
  { id: 13, name: "Rice",           price: 60,  image: rice,     category: "grocery" },
  { id: 14, name: "Oil",            price: 110, image: oil,      category: "grocery" },
  { id: 15, name: "Bread",          price: 55,  image: bread,    category: "grocery" },
  { id: 16, name: "Milk",           price: 50,  image: milk,     category: "grocery" },
  { id: 17, name: "Sugar",          price: 40,  image: sugar,    category: "grocery" },
  { id: 18, name: "Salt",           price: 25,  image: salt,     category: "grocery" },
]

const CATEGORY_EMOJI = { food: "🍛", cake: "🎂", grocery: "🛒" }
const CATEGORY_ROUTE = { food: "/food", cake: "/cake", grocery: "/grocery" }

function Highlight({ text, query }) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "#FF5722", fontWeight: 800 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

const categories = [
  {
    image: pro1,
    title: "10 Min Grocery",
    subtitle: "Fresh essentials at your door",
    path: "/grocery",
    emoji: "🛒",
    color: "#4CAF50",
    light: "#E8F5E9",
    tag: "Fastest",
  },
  {
    image: pro2,
    title: "Grab Your Food",
    subtitle: "Biriyani, Parrota & more",
    path: "/food",
    emoji: "🍛",
    color: "#FF5722",
    light: "#FFF3EE",
    tag: "Best Seller",
  },
  {
    image: pro3,
    title: "Celebrate With Us",
    subtitle: "Cakes for every occasion",
    path: "/cake",
    emoji: "🎂",
    color: "#9C27B0",
    light: "#F3E5F5",
    tag: "Trending",
  },
]

const features = [
  { icon: "⚡", title: "10-Min Delivery", desc: "Groceries reach you faster than ever", color: "#FF9800", bg: "#FFF8E1" },
  { icon: "🛡️", title: "Quality Assured",  desc: "Freshness and hygiene guaranteed",    color: "#4CAF50", bg: "#E8F5E9" },
  { icon: "📍", title: "Live Tracking",    desc: "Know exactly where your order is",    color: "#2196F3", bg: "#E3F2FD" },
  { icon: "💰", title: "Best Prices",      desc: "Unbeatable deals, everyday savings",  color: "#9C27B0", bg: "#F3E5F5" },
]

const offers = [
  { label: "50% OFF", desc: "First Order", color: "#FF5722", bg: "linear-gradient(135deg, #FF5722, #FF9800)" },
  { label: "FREE",    desc: "Delivery",    color: "#4CAF50", bg: "linear-gradient(135deg, #4CAF50, #8BC34A)" },
  { label: "FLAT ₹30", desc: "Cashback",  color: "#9C27B0", bg: "linear-gradient(135deg, #9C27B0, #E91E63)" },
]

function App() {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const [query,    setQuery]    = useState("")
  const [results,  setResults]  = useState([])
  const [showDrop, setShowDrop] = useState(false)
  const [addedId,  setAddedId]  = useState(null)
  const inputRef = useRef(null)
  const dropRef  = useRef(null)

  const handleSearch = (val) => {
    setQuery(val)
    if (val.trim().length < 1) { setResults([]); setShowDrop(false); return }
    const q = val.toLowerCase()
    const filtered = ALL_ITEMS.filter(
      (item) => item.name.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    )
    setResults(filtered)
    setShowDrop(true)
  }

  useEffect(() => {
    const handler = (e) => {
      if (
        dropRef.current  && !dropRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) setShowDrop(false)
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const handleAddToCart = (item, e) => {
    e.stopPropagation()
    addToCart({ ...item, quantity: 1 })
    setAddedId(item.id)
    setTimeout(() => setAddedId(null), 1500)
  }

  const handleGoToCategory = (item) => {
    setShowDrop(false)
    setQuery("")
    navigate(CATEGORY_ROUTE[item.category])
  }

  return (
    <div style={{ fontFamily: "'Nunito', sans-serif", background: "#FFF8F5", minHeight: "100vh" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────── */}
      <div style={{
        position: "relative",
        background: "linear-gradient(135deg, #FF5722 0%, #FF9800 50%, #FFC107 100%)",
        minHeight: "88vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Decorative blobs */}
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.06)", top: -150, right: -100 }} />
        <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.06)", bottom: -80, left: -60 }} />
        <div style={{ position: "absolute", width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.04)", top: "20%", left: "10%" }} />

        {/* Floating food emojis */}
        {["🍛", "🎂", "🛒", "🍗", "🥘", "🍰"].map((em, i) => (
          <div key={i} style={{
            position: "absolute",
            fontSize: "2.5rem",
            opacity: 0.15,
            top: `${10 + i * 14}%`,
            left: i % 2 === 0 ? `${3 + i * 3}%` : `${85 - i * 3}%`,
            animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
            animationDelay: `${i * 0.4}s`,
          }}>{em}</div>
        ))}

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "3rem 1.5rem", maxWidth: 720, width: "100%" }}>

          {/* Offer pills */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            {offers.map((o, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: 30, padding: "5px 14px",
                display: "flex", alignItems: "center", gap: 6,
                fontSize: "0.78rem", color: "#fff", fontWeight: 800,
              }}>
                <span style={{ fontWeight: 900 }}>{o.label}</span>
                <span style={{ opacity: 0.8, fontWeight: 600 }}>{o.desc}</span>
              </div>
            ))}
          </div>

          <h1 style={{
            fontSize: "clamp(2.2rem, 7vw, 4.2rem)",
            color: "#fff", fontWeight: 900, lineHeight: 1.15,
            marginBottom: 16, fontFamily: "'Poppins', sans-serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.2)",
          }}>
            Hungry? We've Got<br />
            <span style={{ color: "#FFF176" }}>Everything You Crave! 🔥</span>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.88)", fontSize: "1.1rem", marginBottom: 40, fontWeight: 500 }}>
            Order food, groceries & cakes — delivered to your door in minutes.
          </p>

          {/* Search bar */}
          <div style={{ position: "relative", maxWidth: 560, margin: "0 auto" }}>
            <div style={{ position: "relative" }}>
              <i className="bi bi-search" style={{
                position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
                color: "#FF5722", fontSize: "1.1rem", zIndex: 2, pointerEvents: "none",
              }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => query.trim() && setShowDrop(true)}
                placeholder="Search biriyani, cake, rice..."
                style={{
                  width: "100%",
                  padding: "16px 52px 16px 52px",
                  borderRadius: showDrop && results.length > 0 ? "24px 24px 0 0" : 50,
                  border: "none",
                  background: "#fff",
                  color: "#1A1A2E",
                  fontSize: "1rem",
                  fontWeight: 600,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-radius 0.2s",
                  fontFamily: "'Nunito', sans-serif",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setResults([]); setShowDrop(false); inputRef.current?.focus() }}
                  style={{
                    position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
                    background: "#F3E8E3", border: "none", color: "#FF5722",
                    cursor: "pointer", fontSize: "0.85rem", padding: "4px 8px", borderRadius: 20,
                    fontWeight: 700,
                  }}
                >✕</button>
              )}
            </div>

            {/* Dropdown */}
            {showDrop && (
              <div ref={dropRef} style={{
                position: "absolute", top: "100%", left: 0, right: 0,
                background: "#fff",
                border: "none",
                borderRadius: "0 0 24px 24px",
                maxHeight: 380, overflowY: "auto", zIndex: 100, textAlign: "left",
                boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
              }}>
                {results.length === 0 ? (
                  <div style={{ padding: "28px 20px", color: "#9CA3AF", textAlign: "center", fontSize: "0.9rem" }}>
                    No results for "<span style={{ color: "#FF5722" }}>{query}</span>"
                  </div>
                ) : (
                  <>
                    {["food", "grocery", "cake"].map((cat) => {
                      const items = results.filter((r) => r.category === cat)
                      if (!items.length) return null
                      const catColors = { food: "#FF5722", grocery: "#4CAF50", cake: "#9C27B0" }
                      const catBg = { food: "#FFF3EE", grocery: "#E8F5E9", cake: "#F3E5F5" }
                      return (
                        <div key={cat}>
                          <div style={{
                            padding: "8px 18px 4px",
                            fontSize: "0.72rem", letterSpacing: 2, textTransform: "uppercase",
                            color: catColors[cat], fontWeight: 800,
                            background: catBg[cat],
                          }}>
                            {CATEGORY_EMOJI[cat]} {cat}
                          </div>
                          {items.map((item) => {
                            const isAdded = addedId === item.id
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleGoToCategory(item)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 14,
                                  padding: "10px 18px", cursor: "pointer", transition: "background 0.15s",
                                  borderBottom: "1px solid #F9F4F2",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF8F5")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                <img src={item.image} alt={item.name} style={{ width: 48, height: 48, objectFit: "cover", borderRadius: 10, flexShrink: 0 }} />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ color: "#1A1A2E", fontSize: "0.92rem", fontWeight: 700 }}>
                                    <Highlight text={item.name} query={query} />
                                  </div>
                                  <div style={{ color: "#FF5722", fontSize: "0.82rem", marginTop: 2, fontWeight: 700 }}>₹{item.price}</div>
                                </div>
                                <button
                                  onClick={(e) => handleAddToCart(item, e)}
                                  style={{
                                    background: isAdded ? "#4CAF50" : "linear-gradient(135deg, #FF5722, #FF7043)",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 20, padding: "6px 14px",
                                    fontSize: "0.78rem", fontWeight: 800,
                                    cursor: "pointer", whiteSpace: "nowrap",
                                    fontFamily: "'Nunito', sans-serif",
                                    boxShadow: "0 4px 10px rgba(255,87,34,0.25)",
                                  }}
                                >
                                  {isAdded ? "✓ Added" : "+ Cart"}
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      )
                    })}
                    <div style={{ padding: "10px 18px", fontSize: "0.75rem", color: "#9CA3AF", textAlign: "center", background: "#FFF8F5" }}>
                      {results.length} result{results.length !== 1 ? "s" : ""} · tap item to browse
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Quick tags */}
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
            {["🍛 Biriyani", "🎂 Cake", "🛒 Rice", "🍗 Chicken"].map((tag) => (
              <button
                key={tag}
                onClick={() => { handleSearch(tag.split(" ")[1]); inputRef.current?.focus() }}
                style={{
                  background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)",
                  color: "#fff", borderRadius: 20, padding: "5px 14px",
                  fontSize: "0.82rem", fontWeight: 700, cursor: "pointer",
                  fontFamily: "'Nunito', sans-serif",
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── OFFER BANNER STRIP ─────────────── */}
      <div style={{ background: "#1A1A2E", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", gap: 60, whiteSpace: "nowrap", animation: "marquee 20s linear infinite" }}>
          {[...Array(3)].map((_, rep) => (
            ["🔥 50% OFF on First Order", "⚡ 10-Min Delivery", "🎁 Free Delivery Above ₹199", "🍛 Fresh South Indian Food", "🎂 Custom Cakes Available", "🛒 Daily Essentials Stocked"].map((t, i) => (
              <span key={`${rep}-${i}`} style={{ color: "#FFC107", fontSize: "0.82rem", fontWeight: 800, letterSpacing: "0.5px" }}>
                {t} <span style={{ color: "#FF5722", marginLeft: 30 }}>•</span>
              </span>
            ))
          ))}
        </div>
        <style>{`
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-33.33%); } }
        `}</style>
      </div>

      {/* ── CATEGORIES ─────────────────────── */}
      <div style={{ background: "#fff", padding: "64px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <div style={{
              display: "inline-block",
              background: "linear-gradient(135deg, #FF5722, #FF9800)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              fontSize: "0.78rem", fontWeight: 800, letterSpacing: "3px",
              textTransform: "uppercase", marginBottom: 10,
            }}>What Are You Craving?</div>
            <h2 style={{ color: "#1A1A2E", fontSize: "2rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
              Choose Your Category
            </h2>
          </div>
          <div className="row justify-content-center">
            {categories.map((cat, i) => (
              <div className="col-md-4 col-sm-6 mb-4" key={i}>
                <div
                  onClick={() => navigate(cat.path)}
                  style={{
                    background: "#fff",
                    border: `2px solid ${cat.light}`,
                    borderRadius: 24,
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)"
                    e.currentTarget.style.border = `2px solid ${cat.color}40`
                    e.currentTarget.style.boxShadow = `0 20px 50px ${cat.color}22`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.border = `2px solid ${cat.light}`
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.06)"
                  }}
                >
                  {/* Tag badge */}
                  <div style={{
                    position: "absolute", top: 14, left: 14, zIndex: 2,
                    background: cat.color, color: "#fff",
                    borderRadius: 20, padding: "3px 12px",
                    fontSize: "0.7rem", fontWeight: 900, letterSpacing: "0.5px",
                  }}>
                    {cat.tag}
                  </div>

                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                      onMouseEnter={(e) => e.target.style.transform = "scale(1.08)"}
                      onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${cat.color}CC, transparent 60%)` }} />
                  </div>
                  <div style={{ padding: "18px 20px 22px" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div>
                        <h4 style={{ color: "#1A1A2E", marginBottom: 4, fontSize: "1.1rem", fontWeight: 800 }}>{cat.title}</h4>
                        <p style={{ color: "#6B7280", fontSize: "0.85rem", marginBottom: 0 }}>{cat.subtitle}</p>
                      </div>
                      <div style={{
                        width: 44, height: 44, borderRadius: "50%",
                        background: cat.light, display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.4rem", flexShrink: 0,
                      }}>
                        {cat.emoji}
                      </div>
                    </div>
                    <div style={{
                      marginTop: 14, display: "flex", alignItems: "center", gap: 6,
                      color: cat.color, fontSize: "0.85rem", fontWeight: 800,
                    }}>
                      Order Now <i className="bi bi-arrow-right" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── WHY US / FEATURES ───────────────── */}
      <div style={{ background: "#FFF8F5", padding: "64px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ color: "#1A1A2E", fontSize: "1.9rem", fontWeight: 900, fontFamily: "'Poppins', sans-serif" }}>
              Why Choose <span style={{ color: "#FF5722" }}>Hungry Layer?</span>
            </h2>
            <p style={{ color: "#6B7280", marginTop: 8 }}>We don't just deliver food — we deliver happiness 😊</p>
          </div>
          <div className="row text-center">
            {features.map((f, i) => (
              <div className="col-md-3 col-sm-6 mb-4" key={i}>
                <div
                  style={{
                    padding: "32px 20px",
                    borderRadius: 20,
                    background: "#fff",
                    border: "2px solid #F3E8E3",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                    cursor: "default",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-6px)"
                    e.currentTarget.style.border = `2px solid ${f.color}40`
                    e.currentTarget.style.boxShadow = `0 16px 40px ${f.color}18`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none"
                    e.currentTarget.style.border = "2px solid #F3E8E3"
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.04)"
                  }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: f.bg, display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.8rem", margin: "0 auto 16px",
                  }}>
                    {f.icon}
                  </div>
                  <h5 style={{ color: "#1A1A2E", marginBottom: 8, fontWeight: 800, fontSize: "1rem" }}>{f.title}</h5>
                  <p style={{ color: "#6B7280", fontSize: "0.85rem", marginBottom: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── APP DOWNLOAD CTA ──────────────────── */}
      <div style={{
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        padding: "64px 0",
      }}>
        <div className="container" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>📱</div>
          <h2 style={{ color: "#fff", fontSize: "1.9rem", fontWeight: 900, marginBottom: 12, fontFamily: "'Poppins', sans-serif" }}>
            Order Anytime, Anywhere
          </h2>
          <p style={{ color: "#9CA3AF", marginBottom: 28 }}>
            Thousands of happy customers trust Hungry Layer every day
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
            {[
              { num: "10K+", label: "Happy Customers" },
              { num: "500+", label: "Daily Orders" },
              { num: "4.8★", label: "App Rating" },
              { num: "10min", label: "Avg Delivery" },
            ].map((s, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 16, padding: "20px 28px", textAlign: "center", minWidth: 120,
              }}>
                <div style={{ color: "#FF9800", fontSize: "1.6rem", fontWeight: 900 }}>{s.num}</div>
                <div style={{ color: "#9CA3AF", fontSize: "0.8rem", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App