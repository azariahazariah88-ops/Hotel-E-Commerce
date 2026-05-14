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

const CATEGORY_ROUTE = { food: "/food", cake: "/cake", grocery: "/grocery" }

const categories = [
  { image: pro1, title: "10 Min Grocery",    subtitle: "Fresh essentials at your door", path: "/grocery", color: "#2D6A4F", light: "#F0FDF6", border: "#BBF7D0", tag: "Fastest"     },
  { image: pro2, title: "Grab Your Food",    subtitle: "Biriyani, Parrota & more",      path: "/food",    color: "#C8410A", light: "#FFF5EE", border: "#F5D5C0", tag: "Best Seller" },
  { image: pro3, title: "Celebrate With Us", subtitle: "Cakes for every occasion",      path: "/cake",    color: "#5C3D8F", light: "#F5F0FC", border: "#D8C8F0", tag: "Trending"    },
]

const features = [
  { icon: SpeedIcon, title: "10-Min Delivery",  desc: "Groceries reach you faster than ever", color: "#C8410A"  },
  { icon: ShieldIcon, title: "Quality Assured",  desc: "Freshness and hygiene guaranteed",     color: "#2D6A4F"  },
  { icon: MapIcon,   title: "Live Tracking",    desc: "Know exactly where your order is",     color: "#1D6FA8"  },
  { icon: TagIcon,   title: "Best Prices",      desc: "Unbeatable deals, everyday savings",   color: "#5C3D8F"  },
]

const stats = [
  { num: "10K+",  label: "Happy Customers" },
  { num: "500+",  label: "Daily Orders"    },
  { num: "4.8",   label: "App Rating"      },
  { num: "10min", label: "Avg Delivery"    },
]

const TICKER = [
  "50% Off on First Order", "10-Min Grocery Delivery",
  "Free Delivery Above ₹199", "Fresh South Indian Food",
  "Custom Cakes Available", "Daily Essentials Stocked",
]

function Highlight({ text, query }) {
  if (!query) return <>{text}</>
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "#C8410A", fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  )
}

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
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAF7F4", minHeight: "100vh" }}>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: translateY(0); } }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
      `}</style>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #18110C 0%, #2C1A10 55%, #3A1F0D 100%)",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle texture overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(200,65,10,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(200,65,10,0.08) 0%, transparent 40%)",
          pointerEvents: "none",
        }} />

        {/* Food image mosaic — right side */}
        <div style={{
          position: "absolute", right: 0, top: 0, bottom: 0,
          width: "48%", display: "flex", flexWrap: "wrap",
          overflow: "hidden",
        }}>
          {[biriyani, grill, ccImg, bfcImg, c65, chcImg].map((img, i) => (
            <div key={i} style={{
              width: "33.33%", height: "33.33%",
              overflow: "hidden", position: "relative",
            }}>
              <img src={img} alt="" style={{
                width: "100%", height: "100%", objectFit: "cover",
                filter: "brightness(0.55) saturate(1.1)",
                transition: "transform 0.6s ease",
              }} />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to right, rgba(24,17,12,0.6), transparent)",
              }} />
            </div>
          ))}
          {/* Right edge fade */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, #18110C 0%, transparent 35%, transparent 65%, #18110C 100%)",
          }} />
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
            background: "linear-gradient(to top, #18110C, transparent)",
          }} />
        </div>

        {/* Hero content */}
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: 580 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(200,65,10,0.18)",
              border: "1px solid rgba(200,65,10,0.35)",
              borderRadius: 999, padding: "5px 14px",
              marginBottom: 24,
              animation: "fadeUp 0.5s ease both",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#E8622A", display: "inline-block" }} />
              <span style={{ color: "#F5A87E", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase" }}>
                Delivering Now
              </span>
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FAF7F4",
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 900,
              lineHeight: 1.12,
              marginBottom: 20,
              animation: "fadeUp 0.5s ease 0.1s both",
            }}>
              Authentic flavours,<br />
              <em style={{ color: "#E8622A", fontStyle: "italic" }}>delivered fresh.</em>
            </h1>

            <p style={{
              color: "#B09A90",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 440,
              animation: "fadeUp 0.5s ease 0.2s both",
            }}>
              South Indian food, celebration cakes & daily groceries — all from one place, right to your door.
            </p>

            {/* Search bar */}
            <div style={{
              position: "relative",
              animation: "fadeUp 0.5s ease 0.3s both",
              zIndex: 9999,
            }}>
              <div style={{
                display: "flex", alignItems: "center",
                background: "#FAF7F4",
                borderRadius: 14,
                padding: "4px 4px 4px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#B09A90" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search for biriyani, cake, rice..."
                  style={{
                    flex: 1, border: "none", background: "transparent",
                    padding: "12px 12px",
                    fontSize: "0.92rem", color: "#1C1008",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                />
                <button
                  onClick={() => { if (query && results.length > 0) handleGoToCategory(results[0]) }}
                  style={{
                    background: "#C8410A",
                    color: "#fff",
                    border: "none",
                    borderRadius: 10,
                    padding: "12px 22px",
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    cursor: "pointer",
                    transition: "background 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#9E3208"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#C8410A"}
                >
                  Search
                </button>
              </div>

              {/* Dropdown */}
              {showDrop && (
                <div ref={dropRef} style={{
                  position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0,
                  background: "#fff",
                  borderRadius: 14,
                  border: "1.5px solid #EBE0D8",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                  overflow: "hidden",
                  maxHeight: 340,
                  overflowY: "auto",
                  zIndex: 99999,
                }}>
                  {results.length === 0 ? (
                    <div style={{ padding: "20px", textAlign: "center", color: "#B09A90", fontSize: "0.88rem" }}>
                      No items found
                    </div>
                  ) : results.map((item) => (
                    <div
                      key={`${item.id}-${item.category}`}
                      onClick={() => handleGoToCategory(item)}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "12px 16px",
                        cursor: "pointer",
                        borderBottom: "1px solid #F5EDE8",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "#FFF5EE"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      <img src={item.image} alt={item.name}
                        style={{ width: 44, height: 44, objectFit: "cover", borderRadius: 8, flexShrink: 0 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#1C1008", fontSize: "0.88rem", fontWeight: 600 }}>
                          <Highlight text={item.name} query={query} />
                        </div>
                        <div style={{ color: "#B09A90", fontSize: "0.74rem", textTransform: "capitalize", marginTop: 2 }}>
                          {item.category} · ₹{item.price}
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(item, e)}
                        style={{
                          background: addedId === item.id ? "#2D6A4F" : "#C8410A",
                          color: "#fff", border: "none",
                          borderRadius: 999, padding: "5px 12px",
                          fontSize: "0.75rem", fontWeight: 600, cursor: "pointer",
                          transition: "background 0.2s",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {addedId === item.id ? "Added" : "+ Add"}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Quick stats */}
            <div style={{
              display: "flex", gap: 28, marginTop: 36, flexWrap: "wrap",
              animation: "fadeUp 0.5s ease 0.4s both",
            }}>
              {[
                { label: "Happy Customers", value: "10K+" },
                { label: "Avg Delivery", value: "10 min" },
                { label: "Rating", value: "4.8 / 5" },
              ].map((s, i) => (
                <div key={i} style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.1)" : "none", paddingLeft: i > 0 ? 28 : 0 }}>
                  <div style={{ color: "#FAF7F4", fontSize: "1.3rem", fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>{s.value}</div>
                  <div style={{ color: "#7A6458", fontSize: "0.73rem", fontWeight: 500, marginTop: 2, letterSpacing: "0.5px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TICKER ──────────────────────────────── */}
      <div style={{
        background: "#1C1008",
        padding: "11px 0",
        overflow: "hidden",
        borderBottom: "1px solid #2C1A10",
        position: "relative", zIndex: 5,
      }}>
        <div style={{
          display: "flex", gap: 64, whiteSpace: "nowrap",
          animation: "marquee 28s linear infinite",
          width: "max-content",
        }}>
          {[...Array(4)].map((_, rep) =>
            TICKER.map((t, i) => (
              <span key={`${rep}-${i}`} style={{
                color: "#B09A90", fontSize: "0.78rem", fontWeight: 500, letterSpacing: "0.3px",
              }}>
                {t}
                <span style={{ color: "#C8410A", margin: "0 28px", fontSize: "0.6rem" }}>◆</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ── CATEGORIES ──────────────────────────── */}
      <section style={{ background: "#fff", padding: "72px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <p style={{
              color: "#C8410A", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10,
            }}>What Are You Craving?</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1C1008", fontSize: "clamp(1.7rem, 3vw, 2.2rem)", fontWeight: 700,
            }}>Choose Your Category</h2>
          </div>
          <div className="row justify-content-center">
            {categories.map((cat, i) => (
              <div className="col-md-4 col-sm-6 mb-4" key={i}>
                <CategoryCard cat={cat} navigate={navigate} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY US ──────────────────────────────── */}
      <section style={{ background: "#FAF7F4", padding: "72px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 48 }}>
            <p style={{
              color: "#C8410A", fontSize: "0.72rem", fontWeight: 700,
              letterSpacing: "3px", textTransform: "uppercase", marginBottom: 10,
            }}>Why Hungry Layer</p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              color: "#1C1008", fontSize: "clamp(1.7rem, 3vw, 2.2rem)", fontWeight: 700,
            }}>We don't just deliver food —<br />
              <em style={{ fontStyle: "italic", color: "#C8410A" }}>we deliver happiness.</em>
            </h2>
          </div>
          <div className="row">
            {features.map((f, i) => {
              const Icon = f.icon
              return (
                <div className="col-md-3 col-sm-6 mb-4" key={i}>
                  <FeatureCard f={f} Icon={Icon} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── STATS CTA ───────────────────────────── */}
      <section style={{
        background: "linear-gradient(160deg, #18110C 0%, #2C1A10 100%)",
        padding: "80px 0",
      }}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <p style={{
                color: "#C8410A", fontSize: "0.72rem", fontWeight: 700,
                letterSpacing: "3px", textTransform: "uppercase", marginBottom: 12,
              }}>Our Numbers</p>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                color: "#FAF7F4",
                fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                fontWeight: 700, lineHeight: 1.2, marginBottom: 16,
              }}>
                Order Anytime,<br />
                <em style={{ color: "#E8622A", fontStyle: "italic" }}>Anywhere.</em>
              </h2>
              <p style={{ color: "#7A6458", fontSize: "0.93rem", lineHeight: 1.7, maxWidth: 380 }}>
                Thousands of happy customers trust Hungry Layer every day for fast, fresh, flavourful meals.
              </p>
            </div>
            <div className="col-md-6">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {stats.map((s, i) => (
                  <div key={i} style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 16, padding: "24px 20px",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "rgba(200,65,10,0.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.04)"}
                  >
                    <div style={{
                      color: "#E8622A", fontSize: "1.8rem", fontWeight: 700,
                      fontFamily: "'DM Mono', monospace", marginBottom: 6,
                    }}>{s.num}</div>
                    <div style={{ color: "#7A6458", fontSize: "0.78rem", fontWeight: 500 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

function CategoryCard({ cat, navigate }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={() => navigate(cat.path)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? cat.border : "#EBE0D8"}`,
        borderRadius: 18, overflow: "hidden", cursor: "pointer",
        transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s",
        transform: hov ? "translateY(-6px)" : "none",
        boxShadow: hov ? `0 20px 50px ${cat.color}18` : "0 2px 12px rgba(28,16,8,0.06)",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", top: 14, left: 14, zIndex: 2 }}>
        <span style={{
          background: cat.color, color: "#fff",
          borderRadius: 999, padding: "3px 10px",
          fontSize: "0.65rem", fontWeight: 700,
          textTransform: "uppercase", letterSpacing: "1px",
        }}>{cat.tag}</span>
      </div>
      <div style={{ height: 196, overflow: "hidden", position: "relative" }}>
        <img
          src={cat.image} alt={cat.title}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            transition: "transform 0.5s ease",
            transform: hov ? "scale(1.06)" : "scale(1)",
          }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(to top, ${cat.color}CC 0%, ${cat.color}20 50%, transparent 100%)`,
        }} />
      </div>
      <div style={{ padding: "18px 20px 20px" }}>
        <h4 style={{
          fontFamily: "'Playfair Display', serif",
          color: "#1C1008", fontSize: "1.05rem", fontWeight: 700, marginBottom: 4,
        }}>{cat.title}</h4>
        <p style={{ color: "#7A6458", fontSize: "0.83rem", marginBottom: 14 }}>{cat.subtitle}</p>
        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          color: cat.color, fontSize: "0.82rem", fontWeight: 600,
        }}>
          Order Now
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ f, Icon }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? f.color + "30" : "#EBE0D8"}`,
        borderRadius: 16, padding: "28px 22px",
        transition: "box-shadow 0.25s, border-color 0.25s, transform 0.25s",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? `0 14px 36px ${f.color}14` : "0 2px 10px rgba(28,16,8,0.05)",
        height: "100%",
      }}
    >
      <div style={{
        width: 48, height: 48, borderRadius: 14,
        background: f.color + "14",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 18, color: f.color,
      }}>
        <Icon size={22} />
      </div>
      <h5 style={{ color: "#1C1008", fontSize: "0.95rem", fontWeight: 700, marginBottom: 8 }}>{f.title}</h5>
      <p style={{ color: "#7A6458", fontSize: "0.84rem", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
    </div>
  )
}

/* ── Icon components ─────────────────────── */
function SpeedIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
    </svg>
  )
}
function ShieldIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  )
}
function MapIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="10" r="3"/>
      <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z"/>
    </svg>
  )
}
function TagIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  )
}

export default App