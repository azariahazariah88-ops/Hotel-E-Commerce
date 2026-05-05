import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Orders from './orders.jsx'
import Profile from './profile.jsx'
import Grocery from './grocery.jsx'
import Food from './food.jsx'
import Cake from './cake.jsx'
import Cart from './cart.jsx'
import Payment from './Payment.jsx'
import AuthCallback from './AuthCallback.jsx'
import { CartProvider } from './CartContext.jsx'
import { AuthProvider } from './AuthContext.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <Routes>
          <Route path="/"              element={<App />} />
          <Route path="/orders"        element={<Orders />} />
          <Route path="/profile"       element={<Profile />} />
          <Route path="/grocery"       element={<Grocery />} />
          <Route path="/food"          element={<Food />} />
          <Route path="/cake"          element={<Cake />} />
          <Route path="/cart"          element={<Cart />} />
          <Route path="/payment"       element={<Payment />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
)