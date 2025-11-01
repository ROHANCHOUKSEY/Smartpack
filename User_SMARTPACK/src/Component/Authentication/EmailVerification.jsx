import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const EmailVerification = () => {

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const [otpverifiedError, setOtpVerifiedError] = useState("");

    const navigate = useNavigate();

    const handleVerifyOtp = (value, index) => {  //v=3, i=0
        if (isNaN(value)) return;
        const updateOtp = [...otp]; //u=3
        updateOtp[index] = value;  //u[0] = 3
        setOtp(updateOtp);

        // ✅ Auto-move to next input
        if (value && index < 5) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    }

    const handleSubmitVerifiedOtp = async (e) => {
        e.preventDefault();
        const finalOtp = otp.join("");
        try {
            const response = await fetch("http://localhost:3006/api/user/verify-otp", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp: finalOtp })
            })
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            navigate("/user-login");
            return data;
        } catch (error) {
            if (error.message) {
                setOtpVerifiedError(error.message);
            } else {
                setOtpVerifiedError("Unexpected Error Occured");
            }
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
            <div className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-300 dark:border-gray-700 rounded-2xl shadow-xl p-8">

                {/* Title */}
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
                    Email Verification
                </h2>
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-2">
                    Enter the 6-digit code sent to your email
                </p>

                {otpverifiedError !== "" && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mt-5">
                    {otpverifiedError}
                </div>}
 
                <form onSubmit={handleSubmitVerifiedOtp}>
                    {/* OTP Input Boxes */}
                    <div className="flex justify-center gap-3 mt-6">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                maxLength="1"
                                value={value}
                                name="otp"
                                onChange={(e) => handleVerifyOtp(e.target.value, index)} /* Only UI (no functionality) */
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type='submit'
                        className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg shadow-md transition-transform transform hover:scale-[1.02] focus:ring-2 focus:ring-blue-400"
                    >
                        Verify Email
                    </button>

                </form>

                {/* Resend OTP */}
                <p className="text-center text-gray-600 dark:text-gray-400 text-sm mt-4">
                    Didn’t receive the code?{" "}
                    <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">
                        Resend OTP
                    </button>
                </p>
            </div>
        </div>
    );
};

export default EmailVerification;
