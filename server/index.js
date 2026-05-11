require('dotenv').config()

const express        = require('express')
const mongoose       = require('mongoose')
const cors           = require('cors')
const bcrypt         = require('bcryptjs')
const jwt            = require('jsonwebtoken')
const passport       = require('passport')
const Razorpay       = require('razorpay')
const crypto         = require('crypto')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const HotelModel     = require('./models/hotel')

const app = express()

// ── CORS — allow Vercel frontend + localhost ───────────────────────────
const allowedOrigins = [
  'https://hotel-e-commerce-tawny.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000',
]

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) return callback(null, true)
    return callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

// Handle preflight requests
app.options('*', cors())

app.use(express.json())

// ── Health check route ────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: '🚀 Hungry Layer Backend Running' })
})

const JWT_SECRET  = process.env.JWT_SECRET  || "hungry_layer_secret_key_2025"
const CLIENT_URL  = process.env.CLIENT_URL  || "https://hotel-e-commerce-tawny.vercel.app"
const BACKEND_URL = process.env.BACKEND_URL || "https://hotel-e-commerce-bakend.onrender.com"

// ── Razorpay ──────────────────────────────────────────────────────────
const razorpay = new Razorpay({
  key_id:     process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// ── MongoDB ───────────────────────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/hotel")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err))

// ── JWT helpers ───────────────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]
  if (!token) return res.status(401).json({ message: "No token provided" })
  try {
    req.user = jwt.verify(token, JWT_SECRET)
    next()
  } catch {
    return res.status(401).json({ message: "Invalid token" })
  }
}

// ── Google OAuth ──────────────────────────────────────────────────────
passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  `${BACKEND_URL}/auth/google/callback`,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const email = profile.emails[0].value
    let user = await HotelModel.findOne({ email })
    if (!user) {
      user = await HotelModel.create({
        name:       profile.displayName,
        email,
        password:   await bcrypt.hash(Math.random().toString(36), 10),
        phone:      '',
        googleId:   profile.id,
        avatar:     profile.photos?.[0]?.value || '',
        authMethod: 'google',
      })
    } else if (!user.googleId) {
      user.googleId   = profile.id
      user.avatar     = user.avatar || profile.photos?.[0]?.value || ''
      user.authMethod = 'linked'
      await user.save()
    }
    return done(null, user)
  } catch (err) { return done(err, null) }
}))

app.use(passport.initialize())

// ── REGISTER ──────────────────────────────────────────────────────────
app.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email and password are required" })
  try {
    if (await HotelModel.findOne({ email }))
      return res.status(409).json({ message: "Email already registered" })
    const user = await HotelModel.create({
      name, email,
      password:   await bcrypt.hash(password, 10),
      phone:      phone || '',
      authMethod: 'local',
    })
    return res.json({
      message: "Success",
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, avatar: '' }
    })
  } catch (err) {
    return res.status(500).json({ message: "Server error: " + err.message })
  }
})

// ── LOGIN ─────────────────────────────────────────────────────────────
app.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password)
    return res.status(400).json({ message: "Email and password are required" })
  try {
    const user = await HotelModel.findOne({ email })
    if (!user) return res.status(404).json({ message: "User not found" })
    if (user.authMethod === 'google')
      return res.status(400).json({ message: "This account uses Google Sign-In. Please click the Google button." })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: "Invalid password" })
    return res.json({
      message: "Success",
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar || '' }
    })
  } catch (err) {
    return res.status(500).json({ message: "Server error: " + err.message })
  }
})

// ── GOOGLE OAUTH ROUTES ───────────────────────────────────────────────
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

app.get('/auth/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: `${CLIENT_URL}/profile?error=google_failed`
  }),
  (req, res) => {
    const payload = {
      token: signToken(req.user),
      user: {
        id:     req.user._id,
        name:   req.user.name,
        email:  req.user.email,
        phone:  req.user.phone  || '',
        avatar: req.user.avatar || '',
      }
    }
    res.redirect(`${CLIENT_URL}/auth/callback?data=${encodeURIComponent(JSON.stringify(payload))}`)
  }
)

// ── PROFILE ───────────────────────────────────────────────────────────
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await HotelModel.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.json({ user })
  } catch { return res.status(500).json({ message: "Server error" }) }
})

app.put('/profile', verifyToken, async (req, res) => {
  const { name, phone } = req.body
  try {
    const updated = await HotelModel.findByIdAndUpdate(
      req.user.id, { name, phone }, { new: true }
    ).select('-password')
    return res.json({ message: "Profile updated", user: updated })
  } catch { return res.status(500).json({ message: "Server error" }) }
})

// ══════════════════════════════════════════════════════════════════════
//  RAZORPAY
// ══════════════════════════════════════════════════════════════════════

app.post('/payment/create-order', async (req, res) => {
  const { amount } = req.body
  if (!amount || amount <= 0)
    return res.status(400).json({ message: "Invalid amount" })
  try {
    const order = await razorpay.orders.create({
      amount:   Math.round(amount * 100),
      currency: 'INR',
      receipt:  `rcpt_${Date.now()}`,
    })
    return res.json({
      orderId:  order.id,
      amount:   order.amount,
      currency: order.currency,
      keyId:    process.env.RAZORPAY_KEY_ID,
    })
  } catch (err) {
    console.error("Razorpay create-order error:", err)
    return res.status(500).json({ message: "Failed to create order: " + err.message })
  }
})

app.post('/payment/verify', async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
    return res.status(400).json({ message: "Missing payment fields" })
  try {
    const expected = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expected !== razorpay_signature)
      return res.status(400).json({ success: false, message: "Invalid payment signature" })

    return res.json({
      success:   true,
      message:   "Payment verified successfully",
      paymentId: razorpay_payment_id,
    })
  } catch (err) {
    return res.status(500).json({ message: "Verification error: " + err.message })
  }
})

// ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))