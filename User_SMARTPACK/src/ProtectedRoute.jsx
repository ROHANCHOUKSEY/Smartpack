import React, { useContext } from 'react'
import Smartpackcontext from './Context/Smartpackcontext'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const{isLoggined} = useContext(Smartpackcontext);
  return isLoggined ? <Outlet/> : <Navigate to="/user-login"/>
}

export default ProtectedRoute