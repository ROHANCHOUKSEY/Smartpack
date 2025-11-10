import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Smartpackcontext from '../../Context/Smartpackcontext'
import { User } from 'lucide-react';
import Userdropdown from './Userdropdown';
import SelectGender from './SelectGender';

const Navbar = () => {
    const { isLoggined } = useContext(Smartpackcontext);
    return (
        <>
            <div className='w-full h-18 shadow-md flex justify-between items-center p-10'>
                <div>
                    <h1 className='text-4xl text-blue-500 smartpack-title'>SMARTPACK</h1>
                </div>
                {isLoggined === true ? <div className='flex items-center gap-15'>
                    <SelectGender/>
                    <Userdropdown/>
                    </div>
                    :
                    <div className='flex gap-10 items-center'>
                        <NavLink to="/user-login" className="text-lg cursor-pointer">
                            Login
                        </NavLink>
                        <NavLink to="/user-register" className="text-white w-25 text-center text-base cursor-pointer bg-blue-500 hover:bg-blue-600 p-2 rounded-sm">
                            Sign Up
                        </NavLink>
                    </div>}
            </div>
        </>
    )
}

export default Navbar