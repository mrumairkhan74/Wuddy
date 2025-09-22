import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOffSharp, IoEyeSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../features/authSlice";
import { toast, ToastContainer } from 'react-toastify'
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
  });

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Dispatch signup and wait for the response
      const resultAction = await dispatch(signUpUser(form));

      // Check if signup was successful
      if (signUpUser.fulfilled.match(resultAction)) {
        const userId = resultAction.payload.user._id; // get the new user's ID

        toast.success("Email Verification code sent to your email");

        // Redirect to verification page with actual userId
        setTimeout(() => {
          navigate(`/verify-email/${userId}`);
        }, 2000);
      } else {
        // Signup failed
        toast.error(resultAction.payload?.message || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-right" duration="300" />
      <div className="relative w-full min-h-screen bg-[#206059] flex items-center justify-center p-4">
        <div className="flex flex-col md:flex-row items-center justify-center bg-white rounded-lg shadow-lg shadow-[#206059] overflow-hidden max-w-4xl w-full">
          {/* Left Image */}
          <div className="hidden md:flex w-1/2 h-full">
            <img
              src="./images/signup.jpg"
              alt="Signup"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-6 md:p-10">
            <form className="flex flex-col" onSubmit={handleSubmit}>
              <h4 className="text-3xl text-center text-[#206059] mb-6 font-[Poppins]">Signup</h4>

              {/* Name */}
              <div className="mb-4 flex gap-2">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={form.firstName}
                  onChange={handleChange}
                  className="w-full p-3 outline-none border-b-2 border-[#206059] transition"
                  required
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={form.lastName}
                  onChange={handleChange}
                  className="w-full p-3 outline-none border-b-2 border-[#206059] transition"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-4">
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-3 outline-none border-b-2 border-[#206059] transition"
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full p-3 outline-none border-b-2 border-[#206059] transition"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative mb-4">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full p-3 outline-none border-b-2 border-[#206059] transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#206059] focus:outline-none"
                >
                  {showPassword ? <IoEyeOffSharp className="text-2xl" /> : <IoEyeSharp className="text-2xl" />}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="relative mb-4">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 outline-none border-b-2 border-[#206059] transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#206059] focus:outline-none"
                >
                  {showConfirmPassword ? <IoEyeOffSharp className="text-2xl" /> : <IoEyeSharp className="text-2xl" />}
                </button>
              </div>

              {/* Login Link */}
              <p className="text-gray-500 text-sm mb-4">
                Already have an account?{" "}
                <Link to="/" className="text-[#206059] font-medium hover:underline">
                  Login
                </Link>
              </p>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#206059] p-3 rounded-md hover:bg-[#206059]/90 text-white font-[Poppins] transition"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Signup"}
              </button>

              {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
