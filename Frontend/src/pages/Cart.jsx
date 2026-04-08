import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router'

const Cart = () => {
  const userId = localStorage.getItem("userId")
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Load cart
  const loadCart = async () => {
    try {
      if (!userId) return
      const res = await api.get(`/cart/${userId}`)
      setCart(res.data.cart)
    } catch (err) {
      console.log("CART ERROR:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadCart()
  }, [])

  // Remove item
  const removeItem = async (productId) => {
    try {
      if (!productId) return
      await api.post(`/cart/remove`, { userId, productId })
      await loadCart()
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (err) {
      console.log("REMOVE ERROR:", err)
    }
  }

  // Update quantity
  const updateQty = async (productId, quantity) => {
    try {
      if (!productId) return
      if (quantity <= 0) {
        await removeItem(productId)
        return
      }
      await api.post(`/cart/update`, { userId, productId, quantity })
      await loadCart()
      window.dispatchEvent(new Event("cartUpdated"))
    } catch (err) {
      console.log("UPDATE ERROR:", err)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center font-[Georgia,serif]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 animate-pulse">Loading your cart…</p>
      </div>
    )
  }

  // Empty cart
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center font-[Georgia,serif]">
        <div className="text-center">
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">Nothing here yet</p>
          <h2 className="text-2xl font-bold text-black">Your cart is empty.</h2>
        </div>
      </div>
    )
  }

  // Total calculation
  const total = cart.items.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0
  )

  return (
    <div className="min-h-screen bg-[#F5F2EE] px-4 py-16 font-[Georgia,serif]">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-black pb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
            {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
          </p>
          <h1 className="text-3xl font-bold text-black leading-tight">Your Cart</h1>
        </div>

        {/* Items */}
        <div>
          {cart.items.map((item, index) => (
            <div
              key={item.productId?._id || item._id}
              className="border-b border-gray-200 py-6 flex items-center gap-5"
            >
              {/* Image */}
              <img
                src={item.productId?.image || "/placeholder.png"}
                alt="product"
                className="w-16 h-16 object-cover grayscale"
              />

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-base font-bold text-black leading-snug">
                  {item.productId?.title || "Product removed"}
                </h2>
                <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mt-0.5">
                  ₹{item.productId?.price || 0}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQty(item.productId?._id, item.quantity - 1)}
                  className="w-7 h-7 border border-gray-300 text-black hover:border-black transition-colors duration-150 text-sm leading-none"
                >
                  −
                </button>
                <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQty(item.productId?._id, item.quantity + 1)}
                  className="w-7 h-7 border border-gray-300 text-black hover:border-black transition-colors duration-150 text-sm leading-none"
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeItem(item.productId?._id)}
                className="ml-4 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors duration-150"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total + Checkout */}
        <div className="mt-10 flex items-center justify-between border-t border-black pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-0.5">Order Total</p>
            <p className="text-2xl font-bold text-black">₹{total.toFixed(2)}</p>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white text-[11px] uppercase tracking-[0.25em] px-8 py-4 hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
          >
            Checkout →
          </button>
        </div>

      </div>
    </div>
  )
}

export default Cart
