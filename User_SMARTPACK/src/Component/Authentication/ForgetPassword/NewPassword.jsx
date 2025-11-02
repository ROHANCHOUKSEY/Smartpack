import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NewPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [usernewPassword, setUsernewPassword] = useState({
    password: "",
    confirmPassword: ""
  })

  const [usernewPasswordError, setUsernewPasswordError] = useState([]);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUsernewPassword = (e) => {
    const { name, value } = e.target;
    setUsernewPassword({ ...usernewPassword, [name]: value });
  }

  const handleSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3006/api/user/change-password", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usernewPassword)
      })
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      navigate("/user-login")
      return data;
    } catch (error) {
      if (error.error) {
        setUsernewPasswordError(error.error.map(err => err.msg));
      } else if (error.message) {
        setUsernewPasswordError([error.message]);
      } else {
        setUsernewPasswordError(["An unexpected error occour"]);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create New Password
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
          Your new password must be different from old password.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmitNewPassword} className="mt-6 space-y-5">
          {usernewPasswordError.length > 0 && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm">
              <ul className="list-disc pl-5">
                {usernewPasswordError.map((error, idx) => (
                  <li key={idx}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                value={usernewPassword.password}
                name="password"
                onChange={handleUsernewPassword}
                placeholder="Enter new password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                cursor-pointer
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={usernewPassword.confirmPassword}
                name="confirmPassword"
                onChange={handleUsernewPassword}
                placeholder="Confirm new password"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </div>

          {/* Submit Button */}
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
              Updating Password...</span>) : <span>Reset Password</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;
