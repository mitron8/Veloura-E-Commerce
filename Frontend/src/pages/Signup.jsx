import React from 'react'
import { useState } from "react"
import api from "../api/axios"

const Signup = () => {
    const [form, setform] = useState({
        name: "",
        email: "",
        password: ""
    })
    const [msg, setmsg] = useState("")

    const handleChange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/signup", form)
            setmsg(response.data.message)
        }
        catch (err) {
            setmsg(err.response?.data?.message || "an error occured")
        }
    }

    return (
        <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center px-4 font-[Georgia,serif]">

            <div className="w-full max-w-sm">

                {/* Header */}
                <div className="mb-10 border-b border-black pb-4 text-center">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
                        Welcome
                    </p>
                    <h2 className="text-3xl font-bold text-black leading-tight">
                        Create Account
                    </h2>
                </div>

                {/* Message */}
                {msg && (
                    <div className="text-center mb-6 text-[11px] uppercase tracking-[0.2em] text-gray-400">
                        {msg}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handelSubmit} className="space-y-6">

                    {/* Name */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
                            Name
                        </p>
                        <input
                            name='name'
                            type='text'
                            value={form.name}
                            onChange={handleChange}
                            required
                            placeholder='Enter your name'
                            className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-black focus:outline-none focus:border-black transition-colors duration-150"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
                            Email
                        </p>
                        <input
                            name='email'
                            type='email'
                            value={form.email}
                            onChange={handleChange}
                            required
                            placeholder='Enter your email'
                            className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-black focus:outline-none focus:border-black transition-colors duration-150"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">
                            Password
                        </p>
                        <input
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={handleChange}
                            required
                            placeholder='Enter your password'
                            className="w-full border-b border-gray-300 bg-transparent py-2 text-sm text-black focus:outline-none focus:border-black transition-colors duration-150"
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white text-[11px] uppercase tracking-[0.25em] px-8 py-4 hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
                    >
                        Create Account →
                    </button>

                </form>

            </div>

        </div>
    )
}

export default Signup