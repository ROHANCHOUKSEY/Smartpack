import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import UserRegister from './Component/Authentication/UserRegister.jsx';
import UserLogin from './Component/Authentication/UserLogin.jsx';
import EmailVerification from './Component/Authentication/EmailVerification.jsx';
// import ProtectedRoute from './ProtectedRoute.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    // <Route path='/' element={<ProtectedRoute/>}>
    
    // </Route>
    <Route path='/' element={<App/>}>
      <Route index element={<Navigate to="/user-register"/>} />
      <Route path='user-register' element={<UserRegister/>}/>
      <Route path='user-login' element={<UserLogin/>}/>
      <Route path='email-verification' element={<EmailVerification/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
