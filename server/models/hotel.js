const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    default: ""
  },
  // ── Google OAuth fields ──────────────────────────────────────────
  googleId: {
    type: String,
    default: null
  },
  avatar: {
    type: String,    // Google profile picture URL
    default: ""
  },
  authMethod: {
    type: String,
    enum: ['local', 'google', 'linked'],
    default: 'local'
  },
  // ────────────────────────────────────────────────────────────────
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const HotelModel = mongoose.model("hotel", HotelSchema)
module.exports = HotelModel
