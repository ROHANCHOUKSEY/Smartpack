import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom';
import Smartpackcontext from '../../Context/Smartpackcontext';

const SelectGender = () => {

    const [isOpen, setIsOpen] = useState(false);
    const{selectGender, setSelectGender} = useContext(Smartpackcontext);
    const dropdownRef = useRef("");

    useEffect(() => {
        const handleDropdown = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleDropdown);
        return () => document.removeEventListener("mousedown", handleDropdown);
    }, []);

    return (
        <>
            <div ref={dropdownRef}>
                <button onClick={() => setIsOpen(!isOpen)} className='w-44 h-10 px-2 className="flex  justify-between gap-2 bg-gradient-to-r from-blue-100 to-blue-50 hover:from-blue-200 hover:to-blue-100 border border-blue-300 rounded-xl shadow-sm transition-all duration-200'>
                    <div className='flex flex-row items-center cursor-pointer gap-2'>
                        {selectGender === "Male" ? <img src="/GenderIcon/Male.png" className='w-5' alt="" /> : <img src="/GenderIcon/Female.png" className='w-5' alt="" />}
                        <h1 className='text-[18px] font-medium text-blue-500'>{selectGender}</h1>
                    </div>
                </button>
                {isOpen && (
                    <div className='w-44 absolute z-1 top-18 bg-white h-auto rounded-sm shadow-[0px_4px_4px_4px_rgba(0,0,0,0.1)]'>
                        <ul className='flex flex-col gap-4 py-2'>
                            <NavLink to="/malemeasurement" onClick={() => setSelectGender("Male")}>
                                <div className='flex flex-row items-center gap-2 hover:bg-gray-100 cursor-pointer p-2'>
                                    <img src="/GenderIcon/Male.png" className='w-5' alt="" />
                                    <li>Male</li>
                                </div>
                            </NavLink>
                            <NavLink to="/femalemeasurement" onClick={() => setSelectGender("Female")}>
                                <div className='flex flex-row items-center gap-2 hover:bg-gray-100 cursor-pointer  p-2'>
                                    <img src="/GenderIcon/Female.png" className='w-5' alt="" />
                                    <li>Female</li>
                                </div>
                            </NavLink>
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
}

export default SelectGender