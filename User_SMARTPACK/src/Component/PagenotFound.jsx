import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Smartpackcontext from "../Context/Smartpackcontext";

const PagenotFound = () => {

 const{setIsLoggined} = useContext(Smartpackcontext);

 const handleIsLoggined = () => {
    setIsLoggined(false);
 }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        
        {/* Icon */}
        <AlertTriangle className="w-16 h-16 text-red-500 mx-auto animate-bounce" />

        {/* Error Code */}
        <h1 className="text-6xl font-bold mt-4">404</h1>

        {/* Message */}
        <p className="text-lg text-gray-600 mt-2">
          Oops! The page you're looking for doesn't exist.
        </p>

        {/* Button */}
        <NavLink onClick={handleIsLoggined}
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Go Home
        </NavLink>
      </div>
    </div>
  );
};

export default PagenotFound;
