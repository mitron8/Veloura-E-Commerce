import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { useParams } from 'react-router'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  const userId = localStorage.getItem("userId")

  const loadProduct = async () => {
    const res = await api.get("/product/")
    const p = res.data.find((item) => item._id === id)
    setProduct(p)
  }

  useEffect(() => {
    loadProduct()
  }, [])

  // ADD TO CART
  const addToCart = async () => {
    try {
      if (!userId) {
        alert("Please login first")
        return
      }

      await api.post("/cart/add", {
        userId,
        productId: product._id,
        quantity: 1
      })

      alert("Added to cart 🛒")

      window.dispatchEvent(new Event("cartUpdated"))

    } catch (err) {
      console.error(err)
      alert("Error adding to cart")
    }
  }

  // Loading state (THEMED)
  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center font-[Georgia,serif]">
        <p className="text-[11px] uppercase tracking-[0.3em] text-gray-400 animate-pulse">
          Loading product…
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE] px-4 py-16 font-[Georgia,serif]">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-black pb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
            Product Details
          </p>
          <h1 className="text-3xl font-bold text-black leading-tight">
            {product.title}
          </h1>
        </div>

        {/* Product Section */}
        <div className="border-b border-gray-200 pb-8">

          {/* Image */}
          <div className="flex items-center justify-center mb-8">
            <img
              src={product.image}
              alt={product.title}
              className="w-48 h-48 object-cover grayscale"
            />
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Price */}
          <p className="text-[11px] uppercase tracking-[0.15em] text-gray-400 mb-2">
            Price
          </p>
          <p className="text-2xl font-bold text-black mb-8">
            ₹{product.price}
          </p>

          {/* Button */}
          <button
            onClick={addToCart}
            className="w-full bg-black text-white text-[11px] uppercase tracking-[0.25em] px-8 py-4 hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
          >
            Add to Cart →
          </button>

        </div>

      </div>
    </div>
  )
}

export default ProductDetails