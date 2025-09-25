import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/authSlice'
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" })

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth)


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(loginUser(form)).unwrap();
      toast.success("Login successfully")
      navigate('/home')
    }
    catch (error) {
      toast.error("Something went Wrong", error)
    }
  }

  return (
    <>
      <ToastContainer position='top-right' />
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
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <h4 className="text-3xl text-center font-[Poppins] text-[#206059] mb-6">Login</h4>

              {/* Email Input */}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter Email or Username"
                  className="w-full p-3 outline-none  border-b-2 border-[#206059] transition"
                  name='identifier'
                  value={form.identifier}
                  onChange={handleChange}
                />
              </div>

              {/* Password Input */}
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  className="w-full p-3 outline-none  border-b-2 border-[#206059] transition"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
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
              {/* Error message */}
              {error && <p className="text-red-500 text-sm mb-2">{error}</p>}


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
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login
