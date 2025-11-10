import React, { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import Smartpackcontext from "../../Context/Smartpackcontext";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userLoginError, setUserLoginError] = useState("");
  const [loading, setLoading] = useState();
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: ""
  });
  const {setIsLoggined, selectGender} = useContext(Smartpackcontext);

  const handleUserLogin = (e) => {
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };

  const navigate = useNavigate();

  const handleUserLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3006/api/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userLogin)
      });
      const data = await response.json();
      if (!response.ok) throw data;
      setIsLoggined(true);
      {selectGender === "Male" ? navigate("/malemeasurement") : navigate("/femalemeasurement")}
      return data;
    } catch (error) {
      setUserLoginError(error.message || "An Unexpected Error Occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-[0px_4px_6px_0px_rgba(0,0,0,0.5)] rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
          Login to your SmartPack account
        </p>

        {/* Error Message */}
        {userLoginError && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mt-3">
            {userLoginError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleUserLoginSubmit} className="mt-6 space-y-4">

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                value={userLogin.email}
                name="email"
                onChange={handleUserLogin}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 
                dark:text-white"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={userLogin.password}
                name="password"
                onChange={handleUserLogin}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 
                dark:text-white"
                required
              />
              <div
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500 hover:text-blue-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right mt-2">
              <NavLink
                to="/passwordReset/email"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot Password?
              </NavLink>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg 
            shadow-md transition-transform transform hover:scale-[1.02] cursor-pointer"
          >
            {loading ? (<span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Logging in...
            </span>) : <span>Login</span>}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
          Don’t have an account?{" "}
          <NavLink
            to="/user-register"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Register here
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
