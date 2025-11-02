import React, { useState } from "react";
import { Mail } from "lucide-react";
import { Outlet, useNavigate } from "react-router-dom";

const RequestEmail = () => {

  const [userEmail, setUserEmail] = useState({
    email: ""
  })

  const navigate = useNavigate();

  const [userEmailError, setUserEmailError] = useState("");

  const handleUserEmail = (e) => {
    const { name, value } = e.target;
    setUserEmail({ ...userEmail, [name]: value });
  }

  const handleSubmitUserEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3006/api/user/send-reset-otp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(userEmail)
      })
      const data = await response.json();
      if (!response.ok) {
        throw data;
      }
      navigate("/passwordReset/verify-otp");
      return data;
    } catch (error) {
      if (error.message) {
        setUserEmailError(error.message);
      } else {
        setUserEmailError("An Unexpected Error Occour");
      }
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
            Forgot Password?
          </h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
            Enter your registered email to receive an OTP for password reset.
          </p>

          {/* Error Message */}
          {userEmailError && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mt-3">
              {userEmailError}
            </div>
          )}

          {/* Email Form */}
          <form onSubmit={handleSubmitUserEmail} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={userEmail.email}
                  name="email"
                  onChange={handleUserEmail}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 
                rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 
                dark:text-white"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg 
            shadow-md transition-transform transform hover:scale-[1.02]"
            >
              Send OTP
            </button>
          </form>
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default RequestEmail;
