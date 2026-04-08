import React, { useState, useEffect } from 'react'
import api from '../api/axios'
import { Link } from 'react-router'

const CATEGORIES = [
  { value: "", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "laptop", label: "Laptops" },
  { value: "mobiles", label: "Mobile" },
  { value: "tablet", label: "Tablet" },
]

const Home = () => {
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("")
  const [addedIds, setAddedIds] = useState([])
  const [sortBy, setSortBy] = useState("")

  const loadProducts = async () => {
    try {
      const res = await api.get(`/product?search=${search}&category=${category}`)
      setProducts(res.data)
    } catch (err) {
      console.log("Error:", err)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [search, category])

  const addToCart = async (productId) => {
    const userId = localStorage.getItem("userId")

    if (!userId) {
      alert("Please login to add items to your cart.")
      return
    }

    try {
      const res = await api.post(`/cart/add`, { userId, productId })

     const total = res.data.cart.items.reduce(
  (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
  0
)
      localStorage.setItem("cartCount", total)
      window.dispatchEvent(new Event("cartUpdated"))

      // Flash "Added" state for 1.5s
      setAddedIds((prev) => [...prev, productId])
      setTimeout(() => {
        setAddedIds((prev) => prev.filter((id) => id !== productId))
      }, 1500)
    } catch (err) {
      console.log(err)
    }
  }

  // Client-side sort (non-destructive)
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price
    if (sortBy === "price_desc") return b.price - a.price
    if (sortBy === "name") return a.title.localeCompare(b.title)
    return 0
  })

  return (
    <div className="min-h-screen bg-[#F5F2EE] px-4 py-16 font-[Georgia,serif]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10 border-b border-black pb-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
              {sortedProducts.length} products
            </p>
            <h1 className="text-3xl font-bold text-black leading-tight">Shop</h1>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-[11px] uppercase tracking-[0.2em] text-gray-500 focus:outline-none cursor-pointer border-b border-gray-300 pb-1 hover:border-black transition-colors duration-150"
          >
            <option value="">Sort</option>
            <option value="price_asc">Price: Low → High</option>
            <option value="price_desc">Price: High → Low</option>
            <option value="name">Name A–Z</option>
          </select>
        </div>

        {/* Search + Category Filter */}
        <div className="flex flex-col sm:flex-row gap-6 mb-10">

          {/* Search */}
          <div className="flex-1 border-b border-gray-300 focus-within:border-black transition-colors duration-200 pb-2">
            <input
              placeholder="Search products…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm text-black placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 border transition-colors duration-150
                  ${category === cat.value
                    ? "border-black bg-black text-white"
                    : "border-gray-300 text-gray-500 hover:border-black hover:text-black"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-24">
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-2">No results</p>
            <p className="text-xl font-bold text-black">Nothing matched your search.</p>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className="bg-[#F5F2EE] flex flex-col group"
            >
              <Link to={`/product/${product._id}`}>
                {/* Image */}
                <div className="h-48 bg-white flex items-center justify-center overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="bg-[#F5F2EE] flex flex-col group transition-all duration-300 hover:shadow-md"
                  />
                </div>

                {/* Info */}
                <div className="px-4 pt-3 pb-2">
                  <h2 className="text-sm font-bold text-black line-clamp-2 leading-snug">
                    {product.title}
                  </h2>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500 mt-1">
                    ₹{product.price}
                  </p>
                </div>
              </Link>

              {/* Add to Cart */}
              <div className="px-4 pb-4 mt-auto">
                <button
                  onClick={() => addToCart(product._id)}
                  className={`w-full text-[10px] uppercase tracking-[0.2em] py-2.5 border transition-all duration-200
                    ${addedIds.includes(product._id)
                      ? "border-black bg-black text-white"
                      : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
                    }`}
                >
                  {addedIds.includes(product._id) ? "✓ Added" : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Home
