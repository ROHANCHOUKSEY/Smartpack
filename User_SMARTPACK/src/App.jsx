import React from 'react'
import UserRegister from './Component/Authentication/UserRegister'
import { Outlet, useLocation } from 'react-router-dom'

const App = () => {
  const {pathname} = useLocation();
  console.log("location: ", pathname);
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App