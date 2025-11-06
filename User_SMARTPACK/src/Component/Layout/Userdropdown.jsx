import React, { useContext, useEffect, useRef, useState } from 'react'
import { LogOut, Settings, User } from "lucide-react"
import { useNavigate } from 'react-router-dom';
import Smartpackcontext from '../../Context/Smartpackcontext';

const Userdropdown = () => {
    const [open, setOpen] = useState(false);
    const { setIsLoggined } = useContext(Smartpackcontext);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const handleDropdown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleDropdown);
        return () => document.removeEventListener("mousedown", handleDropdown);

    }, []);

    //handle user logout
    const handleUserLogout = async () => {
        try {
            const response = await fetch("http://localhost:3006/api/user/logout", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            })
            const data = await response.json();
            if (!response.ok) {
                throw data;
            }
            setIsLoggined(false);
            navigate("/user-login")
            return data;
        } catch (error) {
            console.log("User not logout: ", error);
        }
    }

    return (
        <>
            <div ref={dropdownRef} className='flex gap-10 items-center'>
                <div className="relative">
                    {/* User Icon */}
                    <button
                        onClick={() => setOpen(!open)}
                        className="p-2 rounded-full hover:bg-gray-200 transition cursor-pointer"
                    >
                        <User className="w-6 h-6" />
                    </button>

                    {/* Dropdown Menu */}
                    {open && (
                        <div className="absolute right-0 mt-2 h-50 w-40 bg-white shadow-[0px_4px_4px_4px_rgba(0,0,0,0.1)] rounded-md ">
                            <ul className="py-2">
                                <li>
                                    <div className='flex items-center gap-4 hover:bg-gray-100 p-2 cursor-pointer'>
                                        <User className='text-gray-900' />
                                        <button 
                                            className="w-full text-left text-gray-900"
                                        >
                                            User Profile
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex items-center gap-4 hover:bg-gray-100 p-2 cursor-pointer'>
                                        <Settings className='text-gray-900' />
                                        <button
                                            className="w-full text-left text-gray-900"
                                        >
                                            Setting
                                        </button>
                                    </div>
                                </li>
                                <li>
                                    <div className='flex items-center gap-4 hover:bg-gray-100 p-2 cursor-pointer'>
                                        <LogOut className='text-gray-900' />
                                        <button onClick={handleUserLogout}
                                            className="w-full text-left text-gray-900"
                                        >
                                            Sign out
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Userdropdown