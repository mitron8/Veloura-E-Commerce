import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router"
import api from "../api/axios"

const NavBar = () => {
    const navigate = useNavigate()
    const [cartCount, setCartCount] = useState(0)
    const userId = localStorage.getItem("userId")

    useEffect(() => {
        const loadCart = async () => {
            try {
                if (!userId) {
                    setCartCount(0)
                    return
                }

                const res = await api.get(`/cart/${userId}`)

                let items = []

                if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
                    items = res.data.cart.items
                }

                let total = 0
                for (let i = 0; i < items.length; i++) {
                    total += items[i].quantity || 0
                }

                setCartCount(total)

            } catch (err) {
                console.log("NAVBAR ERROR:", err)
                setCartCount(0)
            }
        }

        loadCart()

        window.addEventListener("cartUpdated", loadCart)

        return () => {
            window.removeEventListener("cartUpdated", loadCart)
        }

    }, [userId])

    const logout = () => {
        localStorage.clear()
        setCartCount(0)
        navigate("/login")
    }

    return (
        <nav className="bg-[#F5F2EE] border-b border-black px-6 py-4 font-[Georgia,serif]">

            <div className="max-w-6xl mx-auto flex justify-between items-center">

                {/* Logo */}
                <Link to="/" className="text-xl font-bold text-black tracking-wide">
                    Veloura
                </Link>

                {/* Center Links */}
                <div className="hidden md:flex gap-8 text-[12px] uppercase tracking-[0.25em] text-gray-700">

                    <Link to="/" className="hover:text-black transition-colors duration-150">
                        Home
                    </Link>

                    <Link to="/cart" className="relative hover:text-black transition-colors duration-150">
                        Cart

                        {cartCount > 0 && (
                            <span className="absolute -top-3 -right-5 text-[9px] bg-black text-white w-5 h-5 flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <a
                        href="https://github.com/mitron8"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-black transition-colors duration-150"
                    >
                        Github
                    </a>

                </div>

                {/* Right Side */}
                <div className="flex gap-6 items-center text-[12px] uppercase tracking-[0.25em] text-gray-700">

                    {!userId ? (
                        <>
                            <Link to="/login" className="hover:text-black transition-colors duration-150">
                                Login
                            </Link>
                            <Link to="/signup" className="hover:text-black transition-colors duration-150">
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={logout}
                            className="hover:text-black transition-colors duration-150"
                        >
                            Logout
                        </button>
                    )}

                </div>

            </div>

            {/* Credit */}
            <div className="text-center mt-4 text-[11px] uppercase tracking-[0.3em] text-gray-500">
                Made by — Ankur Sah
            </div>

        </nav>
    )
}

export default NavBar