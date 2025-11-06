import React from 'react'
import UserRegister from './Component/Authentication/UserRegister'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from './Component/Layout/Navbar';

const App = () => {
  const {pathname} = useLocation();
  console.log("location: ", pathname);
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default App