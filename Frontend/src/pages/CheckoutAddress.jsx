import React from 'react'
import { useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router'

const fieldLabels = {
  fullName: 'Full Name',
  phone: 'Phone Number',
  addressLine: 'Address Line',
  city: 'City',
  state: 'State',
  pincode: 'Pincode'
}

const CheckoutAddress = () => {
  const userId = localStorage.getItem("userId")
  const navigate = useNavigate()

  const [form, setform] = useState({
    fullName: '',
    phone: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: ''
  })

  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const saveAddress = async (e) => {
    await api.post(`/address/add`, {
      ...form,
      userId,
    })
    navigate("/checkout")
  }

  return (
    <div className="min-h-screen bg-[#F5F2EE] flex items-center justify-center px-4 font-[Georgia,serif]">

      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="mb-10 border-b border-black pb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-gray-400 mb-1">Step 1 of 2</p>
          <h1 className="text-3xl font-bold text-black leading-tight">Delivery Address</h1>
        </div>

        {/* Form Fields */}
        <div className="space-y-0">
          {Object.keys(form).map((key, index) => (
            <div
              key={key}
              className="group border-b border-gray-300 focus-within:border-black transition-colors duration-200 py-4"
            >
              <label
                htmlFor={key}
                className="block text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-1 group-focus-within:text-black transition-colors duration-200"
              >
                {fieldLabels[key]}
              </label>
              <input
                id={key}
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`Enter your ${fieldLabels[key].toLowerCase()}`}
                className="w-full bg-transparent text-black text-base placeholder:text-gray-300 focus:outline-none"
              />
            </div>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={saveAddress}
          className="mt-10 w-full bg-black text-white text-[11px] uppercase tracking-[0.25em] py-4 hover:bg-gray-900 active:scale-[0.99] transition-all duration-150"
        >
          Save & Continue →
        </button>

        <p className="mt-4 text-center text-[10px] text-gray-400 tracking-wide uppercase">
          Your data is encrypted and secure
        </p>

      </div>
    </div>
  )
}

export default CheckoutAddress
