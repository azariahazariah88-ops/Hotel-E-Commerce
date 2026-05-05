import './App.css'
import pro1 from './assets/bg.png'
import pro2 from './assets/bg1.png'
import pro3 from './assets/bg2.png'
import food from './assets/food.mp4'
import { useNavigate } from "react-router-dom"
import Navbar from './Navbar'
import Footer from './Footer'
import { useState, useRef, useEffect } from 'react'
import { useCart } from './CartContext'

// ── All searchable items ──────────────────────────────────────────────
import parrota from './assets/parrota.jpg'
import wp from './assets/wheat_parotta.jpg'
import cc from './assets/chicken_chukka.jpg'
import biriyani from './assets/biriyani.jpg'
import c65 from './assets/65.jpg'
import grill from './assets/grill.jpg'
import vcImg from './assets/vc.jpg'
import ccImg from './assets/cc.jpg'
import chcImg from './assets/chc.jpg'
import bfcImg from './assets/bfc.jpg'
import bImg from './assets/b.jpg'
import icImg from './assets/ic.jpg'
import rice from './assets/rice.jpg'
import oil from './assets/oil.jpg'
import bread from './assets/bread.jpg'
import milk from './assets/milk.png'
import sugar from './assets/sugar.jpg'
import salt from './assets/salt.jpg'

const ALL_ITEMS = [
  { id: 1, name: "Parrota",        price: 15,  image: parrota, category: "food" },
  { id: 2, name: "Wheat Parrota",  price: 20,  image: wp,      category: "food" },
  { id: 3, name: "Biriyani",       price: 120, image: biriyani,category: "food" },
  { id: 4, name: "Chicken Chukka", price: 70,  image: cc,      category: "food" },
  { id: 5, name: "Chicken 65",     price: 60,  image: c65,     category: "food" },
  { id: 6, name: "Grill",          price: 360, image: grill,   category: "food" },
  { id: 7, name: "Vanilla Cake",   price: 375, image: vcImg,   category: "cake" },
  { id: 8, name: "Chocolate Cake", price: 500, image: ccImg,   category: "cake" },
  { id: 9, name: "Cheesecake",     price: 175, image: chcImg,  category: "cake" },
  { id: 10, name: "Black Forest",  price: 500, image: bfcImg,  category: "cake" },
  { id: 11, name: "Brownie",       price: 60,  image: bImg,    category: "cake" },
  { id: 12, name: "Ice Cake",      price: 570, image: icImg,   category: "cake" },
  { id: 13, name: "Rice",          price: 60,  image: rice,    category: "grocery" },
  { id: 14, name: "Oil",           price: 110, image: oil,     category: "grocery" },
  { id: 15, name: "Bread",         price: 55,  image: bread,   category: "grocery" },
  { id: 16, name: "Milk",          price: 50,  image: milk,    category: "grocery" },
  { id: 17, name: "Sugar",         price: 40,  image: sugar,   category: "grocery" },
  { id: 18, name: "Salt",          price: 25,  image: salt,    category: "grocery" },
];

const CATEGORY_EMOJI = { food: "🍛", cake: "🎂", grocery: "🛒" };
const CATEGORY_ROUTE = { food: "/food", cake: "/cake", grocery: "/grocery" };

// ── Highlight matching substring ──────────────────────────────────────
function Highlight({ text, query }) {
  if (!query) return <>{text}</>;
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <span style={{ color: "#f5c842", fontWeight: 700 }}>{text.slice(idx, idx + query.length)}</span>
      {text.slice(idx + query.length)}
    </>
  );
}

function App() {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [query, setQuery]       = useState("");
  const [results, setResults]   = useState([]);
  const [showDrop, setShowDrop] = useState(false);
  const [addedId, setAddedId]   = useState(null);
  const inputRef = useRef(null);
  const dropRef  = useRef(null);

  // ── Search logic ──────────────────────────────────────────────────
  const handleSearch = (val) => {
    setQuery(val);
    if (val.trim().length < 1) { setResults([]); setShowDrop(false); return; }
    const q = val.toLowerCase();
    const filtered = ALL_ITEMS.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    setResults(filtered);
    setShowDrop(true);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (
        dropRef.current  && !dropRef.current.contains(e.target) &&
        inputRef.current && !inputRef.current.contains(e.target)
      ) setShowDrop(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleAddToCart = (item, e) => {
    e.stopPropagation();
    addToCart({ ...item, quantity: 1 });
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const handleGoToCategory = (item) => {
    setShowDrop(false);
    setQuery("");
    navigate(CATEGORY_ROUTE[item.category]);
  };

  // ── Category cards ────────────────────────────────────────────────
  const categories = [
    { image: pro1, title: "10 Min Grocery",   subtitle: "Fresh essentials at your door", path: "/grocery", emoji: "🛒" },
    { image: pro2, title: "Grab Your Food",   subtitle: "Biriyani, Parrota & more",      path: "/food",    emoji: "🍛" },
    { image: pro3, title: "Celebrate With Us",subtitle: "Cakes for every occasion",      path: "/cake",    emoji: "🎂" },
  ];

  return (
    <div style={{ fontFamily: "'Lora', serif", background: "#0d0d0d", minHeight: "100vh" }}>
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <video autoPlay muted loop playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0 }}>
          <source src={food} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))", zIndex: 1 }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "2rem 1rem", maxWidth: 700, margin: "0 auto", width: "100%" }}>
          <div style={{ fontSize: "0.85rem", letterSpacing: "4px", color: "#f5c842", textTransform: "uppercase", marginBottom: 16 }}>
            Fast · Fresh · Flavourful
          </div>
          <h1 style={{ fontSize: "clamp(2.2rem, 6vw, 4rem)", color: "#fff", fontWeight: 700, lineHeight: 1.2, marginBottom: 16 }}>
            When Hunger Calls,<br />
            <span style={{ color: "#f5c842" }}>We Answer</span>
          </h1>
          <p style={{ color: "#ccc", fontSize: "1.05rem", marginBottom: 36 }}>
            Order food, groceries & cakes delivered to your doorstep in minutes.
          </p>

          {/* ── Search bar ──────────────────────────────────────── */}
          <div style={{ position: "relative", maxWidth: 520, margin: "0 auto" }}>
            <div style={{ position: "relative" }}>
              <i className="bi bi-search" style={{
                position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)",
                color: "#f5c842", fontSize: "1rem", zIndex: 2, pointerEvents: "none",
              }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => query.trim() && setShowDrop(true)}
                placeholder="Search for food, groceries, cakes..."
                style={{
                  width: "100%",
                  padding: "14px 48px 14px 46px",
                  borderRadius: showDrop && results.length > 0 ? "20px 20px 0 0" : 50,
                  border: "2px solid rgba(245,200,66,0.45)",
                  background: "rgba(10,10,10,0.88)",
                  backdropFilter: "blur(12px)",
                  color: "#fff",
                  fontSize: "0.95rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-radius 0.2s",
                  fontFamily: "'Lora', serif",
                }}
              />
              {query && (
                <button
                  onClick={() => { setQuery(""); setResults([]); setShowDrop(false); inputRef.current?.focus(); }}
                  style={{
                    position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                    background: "transparent", border: "none", color: "#666",
                    cursor: "pointer", fontSize: "1rem", lineHeight: 1, padding: 4,
                  }}
                >✕</button>
              )}
            </div>

            {/* ── Dropdown results ──────────────────────────────── */}
            {showDrop && (
              <div
                ref={dropRef}
                style={{
                  position: "absolute",
                  top: "100%", left: 0, right: 0,
                  background: "rgba(12,12,12,0.98)",
                  backdropFilter: "blur(20px)",
                  border: "2px solid rgba(245,200,66,0.35)",
                  borderTop: "none",
                  borderRadius: "0 0 20px 20px",
                  maxHeight: 380,
                  overflowY: "auto",
                  zIndex: 100,
                  textAlign: "left",
                }}
              >
                {results.length === 0 ? (
                  <div style={{ padding: "28px 20px", color: "#555", textAlign: "center", fontSize: "0.9rem" }}>
                    No results for "<span style={{ color: "#f5c842" }}>{query}</span>"
                  </div>
                ) : (
                  <>
                    {["food", "grocery", "cake"].map((cat) => {
                      const items = results.filter((r) => r.category === cat);
                      if (!items.length) return null;
                      return (
                        <div key={cat}>
                          {/* Category heading */}
                          <div style={{
                            padding: "8px 18px 4px",
                            fontSize: "0.7rem", letterSpacing: 3,
                            textTransform: "uppercase", color: "#f5c842",
                            borderTop: "1px solid rgba(255,255,255,0.05)",
                            background: "rgba(245,200,66,0.04)",
                          }}>
                            {CATEGORY_EMOJI[cat]} {cat}
                          </div>

                          {items.map((item) => {
                            const isAdded = addedId === item.id;
                            return (
                              <div
                                key={item.id}
                                onClick={() => handleGoToCategory(item)}
                                style={{
                                  display: "flex", alignItems: "center", gap: 14,
                                  padding: "10px 18px", cursor: "pointer",
                                  transition: "background 0.15s",
                                }}
                                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(245,200,66,0.07)")}
                                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                              >
                                <img
                                  src={item.image} alt={item.name}
                                  style={{ width: 46, height: 46, objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
                                />
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ color: "#fff", fontSize: "0.92rem", fontWeight: 500 }}>
                                    <Highlight text={item.name} query={query} />
                                  </div>
                                  <div style={{ color: "#f5c842", fontSize: "0.82rem", marginTop: 2 }}>₹{item.price}</div>
                                </div>
                                <button
                                  onClick={(e) => handleAddToCart(item, e)}
                                  style={{
                                    background: isAdded ? "#28a745" : "rgba(245,200,66,0.12)",
                                    color: isAdded ? "#fff" : "#f5c842",
                                    border: `1px solid ${isAdded ? "#28a745" : "rgba(245,200,66,0.35)"}`,
                                    borderRadius: 20,
                                    padding: "5px 14px",
                                    fontSize: "0.78rem", fontWeight: 700,
                                    cursor: "pointer", whiteSpace: "nowrap",
                                    transition: "all 0.25s",
                                    fontFamily: "'Lora', serif",
                                    flexShrink: 0,
                                  }}
                                >
                                  {isAdded ? "✓ Added" : "+ Cart"}
                                </button>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}

                    {/* Footer hint */}
                    <div style={{
                      padding: "10px 18px", fontSize: "0.73rem", color: "#3a3a3a",
                      borderTop: "1px solid rgba(255,255,255,0.04)", textAlign: "center",
                    }}>
                      {results.length} result{results.length !== 1 ? "s" : ""} · click item to browse full page
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Categories ────────────────────────────────────────────── */}
      <div style={{ background: "#111", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ color: "#f5c842", letterSpacing: 4, fontSize: "0.8rem", textTransform: "uppercase", marginBottom: 10 }}>What are you craving?</div>
            <h2 style={{ color: "#fff", fontSize: "2rem", fontWeight: 700 }}>Choose Your Category</h2>
          </div>
          <div className="row justify-content-center">
            {categories.map((cat, i) => (
              <div className="col-md-4 col-sm-6 mb-4" key={i}>
                <div
                  onClick={() => navigate(cat.path)}
                  style={{
                    background: "#1a1a1a", border: "1px solid #2a2a2a",
                    borderRadius: 20, overflow: "hidden", cursor: "pointer",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-10px) scale(1.02)";
                    e.currentTarget.style.border = "1px solid rgba(245,200,66,0.5)";
                    e.currentTarget.style.boxShadow = "0 20px 50px rgba(245,200,66,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.border = "1px solid #2a2a2a";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img src={cat.image} alt={cat.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }} />
                    <span style={{ position: "absolute", top: 12, right: 12, fontSize: "1.8rem" }}>{cat.emoji}</span>
                  </div>
                  <div style={{ padding: "20px 22px 24px" }}>
                    <h4 style={{ color: "#fff", marginBottom: 4, fontSize: "1.15rem" }}>{cat.title}</h4>
                    <p style={{ color: "#888", fontSize: "0.875rem", marginBottom: 14 }}>{cat.subtitle}</p>
                    <span style={{ color: "#f5c842", fontSize: "0.85rem", letterSpacing: 1 }}>
                      Order now <i className="bi bi-arrow-right ms-1" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Why Us ────────────────────────────────────────────────── */}
      <div style={{ background: "#0d0d0d", padding: "64px 0" }}>
        <div className="container">
          <div className="row text-center">
            {[
              { icon: "bi-lightning-charge-fill", title: "10-Min Delivery", desc: "Groceries at your door faster than ever" },
              { icon: "bi-shield-check",           title: "Quality Assured", desc: "Freshness and hygiene guaranteed" },
              { icon: "bi-geo-alt-fill",            title: "Live Tracking",   desc: "Know exactly where your order is" },
            ].map((f, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div style={{ padding: "32px 24px", borderRadius: 16, background: "#141414", border: "1px solid #222" }}>
                  <i className={`bi ${f.icon}`} style={{ fontSize: "2rem", color: "#f5c842", display: "block", marginBottom: 14 }} />
                  <h5 style={{ color: "#fff", marginBottom: 8 }}>{f.title}</h5>
                  <p style={{ color: "#777", fontSize: "0.88rem" }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
