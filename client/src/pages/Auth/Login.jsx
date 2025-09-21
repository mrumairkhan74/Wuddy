import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full min-h-screen bg-[#206059] flex items-center justify-center p-4">
      <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg shadow-[#206059] overflow-hidden max-w-4xl w-full">
        
        {/* Left Image */}
        <div className="hidden md:flex w-1/2 h-full">
          <img 
            src="./images/login.jpg" 
            alt="Login" 
            className="w-full h-full object-cover" 
            loading='lazy'
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <form className="flex flex-col">
            <h4 className="text-3xl text-center font-[Poppins] text-[#206059] mb-6">Login</h4>
            
            {/* Email Input */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Enter Email or Username"
                className="w-full p-3 outline-none  border-b-2 border-[#206059] transition"
              />
            </div>

            {/* Password Input */}
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full p-3 outline-none  border-b-2 border-[#206059] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#206059] focus:outline-none"
              >
                {showPassword ? (
                  <IoEyeOffSharp className="text-2xl" />
                ) : (
                  <IoEyeSharp className="text-2xl" />
                )}
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-gray-500 text-sm mb-4">
              Create New Account?{" "}
              <Link
                to="/signup"
                className="text-[#206059] font-medium hover:underline"
              >
                Sign Up
              </Link>
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#206059] p-3 rounded-md hover:bg-[#206059]/90 text-white font-[Poppins] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
