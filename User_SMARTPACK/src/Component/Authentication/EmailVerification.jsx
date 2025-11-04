import React, { useContext, useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import Smartpackcontext from "../../Context/Smartpackcontext";

const EmailVerification = () => {

    const [otp, setOtp] = useState(new Array(6).fill(""));

    const [otpverifiedError, setOtpVerifiedError] = useState("");

    const [loading, setLoading] = useState(false);

    const { userEmail } = useContext(Smartpackcontext);

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

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedata = e.clipboardData.getData("text");

        if (!/^\d+$/.test(pastedata)) {
            alert("Only Number's Allowed");
            return;
        }

        const updateOtp = [...otp];
        for (let i = 0; i < pastedata.length; i++) {
            updateOtp[i] = pastedata[i];
        }
        setOtp(updateOtp);
        const lastIndex = pastedata.length - 1;
        document.getElementById(`otp-input-${lastIndex}`).focus();
    }

    const handelkeydown = (e, index) => {
        if (e.key === "Backspace") {
            if (otp[index] === "" && index > 0) {
                document.getElementById(`otp-input-${index - 1}`).focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            document.getElementById(`otp-input-${index - 1}`).focus();
        } else if (e.key === "ArrowRight" && index < otp.length - 1) {
            document.getElementById(`otp-input-${index + 1}`).focus();
        }
    }

    const handleSubmitVerifiedOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const firstInput = document.getElementById(`otp-input-0`);
        firstInput.focus();
    }, [otp]);

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
                <p className="text-center text-blue-500">
                    {userEmail}
                </p>
                {otpverifiedError !== "" && <div className="bg-red-100 text-red-700 px-4 py-2 rounded-lg text-sm mt-5">
                    {otpverifiedError}
                </div>}

                <form onSubmit={handleSubmitVerifiedOtp}>
                    {/* OTP Input Boxes */}
                    <div className="flex justify-center gap-3 mt-6 mb-6">
                        {otp.map((value, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                type="text"
                                maxLength="1"
                                value={value}
                                name="otp"
                                onChange={(e) => handleVerifyOtp(e.target.value, index)} /* Only UI (no functionality) */
                                onPaste={handlePaste}
                                onKeyDown={(e) => handelkeydown(e, index)}
                                className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        ))}
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
                            Verifying...
                        </span>) : <span>Verify OTP</span>}
                    </button>

                </form>
            </div>
        </div>
    );
};

export default EmailVerification;
