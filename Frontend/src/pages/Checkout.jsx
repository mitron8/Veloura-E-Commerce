import React, { useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router'

const Checkout = () => {
  const [cart, setCart] = useState([])
  const [addresses, setAddresses] = useState([])
  const [selectedAddress, setSelectedAddress] = useState(null)

  const navigate = useNavigate()
  const userId = localStorage.getItem("userId")

  useEffect(() => {
    fetchCart()
    fetchAddresses()
  }, [])

  // FETCH CART (WITH CLEANING)
  const fetchCart = async () => {
    try {
      const res = await api.get(`/cart/${userId}`)
      console.log("CART:", res.data)
      const cleanedCart = res.data.cart?.items.filter((item) => item.productId)
      setCart(cleanedCart || [])
    } catch (err) {
      console.error("CART ERROR:", err)
    }
  }

  // FETCH ADDRESSES
  const fetchAddresses = async () => {
    try {
      console.log("FETCHING ADDRESS FOR:", userId)
      const res = await api.get(`/address/${userId}`)
      console.log("ADDRESS RESPONSE:", res.data)
      setAddresses(res.data || [])
      setSelectedAddress(res.data[0] || null)
    } catch (err) {
      console.error("ADDRESS ERROR:", err.response?.data || err.message)
    }
  }

  // SAFE TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
    0
  )

  const placeOrder = async () => {
    if (!selectedAddress) {
      alert("Please select an address")
      return
    }
    try {
      await api.post('/order/create', {
        userId,
        items: cart,
        address: selectedAddress,
        totalAmount: totalPrice
      })
      alert("Order placed successfully 🎉")
      navigate("/")
    } catch (err) {
      console.error(err)
      alert("Error placing order")
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE] px-4 py-16 font-[Georgia,serif]">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-black pb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">Step 2 of 2</p>
          <h1 className="text-3xl font-bold text-black leading-tight">Checkout</h1>
        </div>

        <div className="grid md:grid-cols-3 gap-10">

          {/* LEFT: ORDER SUMMARY */}
          <div className="md:col-span-2">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">Order Summary</p>

            {cart.length === 0 ? (
              <p className="text-sm text-gray-400">Your cart is empty.</p>
            ) : (
              cart.map((item) => {
                if (!item.productId) return null
                return (
                  <div
                    key={item.productId._id}
                    className="flex items-center gap-5 border-b border-gray-200 py-5"
                  >
                    <img
                      src={item.productId?.image || "/placeholder.png"}
                      alt="product"
                      className="w-14 h-14 object-cover grayscale"
                    />
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-black leading-snug">
                        {item.productId?.title || "Product removed"}
                      </h3>
                      <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mt-0.5">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-black">
                      ₹{(item.productId?.price || 0) * item.quantity}
                    </p>
                  </div>
                )
              })
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-10">

            {/* ADDRESS */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">Delivery Address</p>

              {addresses && addresses.length > 0 ? (
                addresses.map((addr) => (
                  <label
                    key={addr._id}
                    className={`block border py-4 px-4 mb-3 cursor-pointer transition-colors duration-150
                    ${selectedAddress?._id === addr._id
                        ? "border-black bg-white"
                        : "border-gray-200 hover:border-gray-400"
                      }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        checked={selectedAddress?._id === addr._id}
                        onChange={() => setSelectedAddress(addr)}
                        className="mt-1 accent-black"
                      />
                      <div>
                        <p className="text-sm font-bold text-black">{addr.fullName}</p>
                        <p className="text-[11px] text-gray-500 mt-0.5">{addr.phone}</p>
                        <p className="text-[11px] text-gray-500">{addr.addressLine}</p>
                        <p className="text-[11px] text-gray-500">{addr.city} — {addr.pincode}</p>
                      </div>
                    </div>
                  </label>
                ))
              ) : (
                <button
                  onClick={() => navigate("/checkoutAddress")}
                  className="text-[11px] uppercase tracking-[0.2em] text-black underline underline-offset-4"
                >
                  + Add Address
                </button>
              )}
            </div>

            {/* PRICE DETAILS */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-4">Price Details</p>

              <div className="space-y-3 border-b border-gray-200 pb-4 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="text-black font-medium">Free</span>
                </div>
              </div>

              <div className="flex justify-between text-base font-bold text-black mb-6">
                <span>Final Amount</span>
                <span>₹{totalPrice}</span>
              </div>

              <button
                onClick={placeOrder}
                disabled={cart.length === 0 || !selectedAddress}
                className="w-full bg-black text-white text-[11px] uppercase tracking-[0.25em] py-4
                hover:bg-gray-900 active:scale-[0.99] transition-all duration-150
                disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Place Order →
              </button>

              <p className="mt-4 text-center text-[10px] text-gray-400 tracking-wide uppercase">
                Secure & encrypted checkout
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
