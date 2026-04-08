import React, { useState } from 'react'
import api from "../api/axios"
import { useNavigate } from 'react-router'

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const [msg, setMsg] = useState("")
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const res = await api.post("/auth/login", form)

      console.log("RESPONSE:", res.data) // ✅ DEBUG

      // ✅ FIX: handle all possible backend formats
      const user =
        res.data.user ||
        res.data.User ||
        res.data

      if (!user || !(user._id || user.id)) {
  throw new Error("Invalid response from server")
}

// ✅ FIX: support both id and _id
localStorage.setItem("userId", user._id || user.id)
      // ✅ FIX: store correct userId
      localStorage.setItem("token", res.data.token)
      

      setSuccess(true)
      setMsg("Login successful")

      setTimeout(() => {
        navigate("/")
      }, 1000)

    } catch (err) {
      console.log("ERROR:", err)

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Login failed"

      setSuccess(false)
      setMsg(errorMessage)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center px-4 font-[Georgia,serif]">
      <div className="w-full max-w-sm">

        {/* Header */}
        <div className="mb-10 border-b border-black pb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">Welcome back</p>
          <h1 className="text-3xl font-bold text-black leading-tight">Log In</h1>
        </div>

        {/* Feedback message */}
        {msg && (
          <div className={`mb-6 text-[11px] uppercase tracking-[0.2em] ${success ? "text-black" : "text-red-500"}`}>
            {success ? "✓ " : "✕ "}{msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Email */}
          <div className="group border-b border-gray-300 focus-within:border-black transition-colors duration-200 py-4 mb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 group-focus-within:text-black transition-colors duration-200">
              Email
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-black text-base placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="group border-b border-gray-300 focus-within:border-black transition-colors duration-200 py-4 mb-2">
            <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 group-focus-within:text-black transition-colors duration-200">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-transparent text-black text-base placeholder:text-gray-300 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-10 w-full bg-black text-white text-[11px] uppercase tracking-[0.25em] py-4 hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
          >
            Sign In →
          </button>

        </form>

        <p className="mt-4 text-center text-[10px] text-gray-400 tracking-wide uppercase">
          Your session is encrypted and secure
        </p>

      </div>
    </div>
  )
}

export default Login