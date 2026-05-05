import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.category === item.category);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.category === item.category
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (id, category) => {
    setCartItems((prev) => prev.filter((i) => !(i.id === id && i.category === category)));
  };

  const updateQuantity = (id, category, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === id && i.category === category ? { ...i, quantity } : i
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const placeOrder = () => {
    if (cartItems.length === 0) return;
    const order = {
      id: Date.now(),
      items: [...cartItems],
      total: cartItems.reduce((s, i) => s + i.price * i.quantity, 0),
      date: new Date().toLocaleString(),
      status: "Confirmed",
    };
    setOrders((prev) => [order, ...prev]);
    clearCart();
    return order;
  };

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        placeOrder,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
