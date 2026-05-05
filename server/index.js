require('dotenv').config()

const express    = require('express')
const mongoose   = require('mongoose')
const cors       = require('cors')
const bcrypt     = require('bcryptjs')
const jwt        = require('jsonwebtoken')
const passport   = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const HotelModel = require('./models/hotel')

const app = express()

// ── CORS ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: 'http://localhost:5173',  // Vite default; change to 3000 if CRA
  credentials: true
}))
app.use(express.json())

const JWT_SECRET           = "hungry_layer_secret_key_2025"
const GOOGLE_CLIENT_ID     = "process.env.GOOGLE_CLIENT_ID"
const GOOGLE_CLIENT_SECRET = "process.env.GOOGLE_CLIENT_SECRET"
const CLIENT_URL           = "http://localhost:5173"

// ── MongoDB ───────────────────────────────────────────────────────────
mongoose.connect("mongodb://127.0.0.1:27017/hotel")
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

// ── Passport Google Strategy ──────────────────────────────────────────
passport.use(new GoogleStrategy(
  {
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL:  'http://localhost:5000/auth/google/callback',
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value
      let user = await HotelModel.findOne({ email })

      if (!user) {
        // First Google login → auto-create account
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
        // Existing local account → link Google to it
        user.googleId   = profile.id
        user.avatar     = user.avatar || profile.photos?.[0]?.value || ''
        user.authMethod = 'linked'
        await user.save()
      }

      return done(null, user)
    } catch (err) {
      return done(err, null)
    }
  }
))

app.use(passport.initialize())

// ── REGISTER ─────────────────────────────────────────────────────────
app.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body
  if (!name || !email || !password)
    return res.status(400).json({ message: "Name, email and password are required" })

  try {
    if (await HotelModel.findOne({ email }))
      return res.status(409).json({ message: "Email already registered" })

    const user = await HotelModel.create({
      name,
      email,
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
    if (!user)
      return res.status(404).json({ message: "User not found" })

    if (user.authMethod === 'google')
      return res.status(400).json({ message: "This account uses Google Sign-In. Please click the Google button." })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(401).json({ message: "Invalid password" })

    return res.json({
      message: "Success",
      token: signToken(user),
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone, avatar: user.avatar || '' }
    })
  } catch (err) {
    return res.status(500).json({ message: "Server error: " + err.message })
  }
})

// ── GOOGLE OAUTH: Step 1 — redirect to Google ─────────────────────────
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
)

// ── GOOGLE OAUTH: Step 2 — Google calls back ──────────────────────────
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
    // Send token + user to frontend via URL query param
    const encoded = encodeURIComponent(JSON.stringify(payload))
    res.redirect(`${CLIENT_URL}/auth/callback?data=${encoded}`)
  }
)

// ── GET PROFILE (protected) ───────────────────────────────────────────
app.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await HotelModel.findById(req.user.id).select('-password')
    if (!user) return res.status(404).json({ message: "User not found" })
    return res.json({ user })
  } catch {
    return res.status(500).json({ message: "Server error" })
  }
})

// ── UPDATE PROFILE (protected) ────────────────────────────────────────
app.put('/profile', verifyToken, async (req, res) => {
  const { name, phone } = req.body
  try {
    const updated = await HotelModel.findByIdAndUpdate(
      req.user.id,
      { name, phone },
      { new: true }
    ).select('-password')
    return res.json({ message: "Profile updated", user: updated })
  } catch {
    return res.status(500).json({ message: "Server error" })
  }
})

app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"))