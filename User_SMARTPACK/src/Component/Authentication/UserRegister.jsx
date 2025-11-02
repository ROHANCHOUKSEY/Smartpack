import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"
import { NavLink, useNavigate } from "react-router-dom";

const UserRegister = () => {

  const [registerUser, setRegisterUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerUserError, setRegisterUserError] = useState([])
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegisterUser = (e) => {
    const { name, value } = e.target;
    setRegisterUser({ ...registerUser, [name]: value });
  }

  const handleSubmitUserRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3006/api/user/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerUser)
      });

      const data = await response.json();
      if (!response.ok) {
        throw data;
      }

      const otpResponse = await fetch("http://localhost:3006/api/user/send-verify-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      })

      const otpData = await otpResponse.json();
      if (!otpResponse) {
        throw otpData;
      }

      navigate("/email-verification");
      return data;
    } catch (error) {
      if (error.error) {
        setRegisterUserError(error.error.map(err => err.msg));
      } else if (error.message) {
        setRegisterUserError([error.message]);
      } else {
        setRegisterUserError(["An unexpected error occurred"]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg shadow-2xl border border-gray-300 dark:border-gray-700 rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
          Create Account
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Join SmartPack and get started
        </p>

        {/* Form */}
        <form onSubmit={handleSubmitUserRegister} className="space-y-5">
          {/* First & Last Name */}
          {registerUserError.length > 0 && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
              <ul className="list-disc pl-5">
                {registerUserError.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter first name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={registerUser.firstname}
                name="firstname"
                onChange={handleRegisterUser}
                required
              />
            </div>
            <div className="md:w-1/2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter last name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={registerUser.lastname}
                name="lastname"
                onChange={handleRegisterUser}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={registerUser.email}
              name="email"
              onChange={handleRegisterUser}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                value={registerUser.password}
                name="password"
                onChange={handleRegisterUser}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none pr-10"
                value={registerUser.confirmPassword}
                name="confirmPassword"
                onChange={handleRegisterUser}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-600 dark:text-gray-300"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg 
            shadow-md transition-transform transform hover:scale-[1.02]"
          >
            {loading ? (<span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Account...
            </span>) : <span>Register</span>}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          You are already logged in.{" "}
          <NavLink
            to="/user-login"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Login here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
