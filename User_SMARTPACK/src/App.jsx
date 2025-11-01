import React from 'react'
import UserRegister from './Component/Authentication/UserRegister'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Outlet/>
    </>
  )
}

export default App