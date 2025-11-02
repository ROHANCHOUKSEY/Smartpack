import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import UserRegister from './Component/Authentication/UserRegister.jsx';
import UserLogin from './Component/Authentication/UserLogin.jsx';
import EmailVerification from './Component/Authentication/EmailVerification.jsx';
import HomePage from './HomePage.jsx';
import RequestEmail from './Component/Authentication/ForgetPassword/RequestEmail.jsx';
import VerifyOtp from './Component/Authentication/ForgetPassword/VerifyOtp.jsx';
import ForgetPasswordLayout from './Component/Authentication/ForgetPassword/ForgetPasswordLayout.jsx';
import NewPassword from './Component/Authentication/ForgetPassword/NewPassword.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index element={<Navigate to="/user-register" />} />
        <Route path='user-register' element={<UserRegister />} />
        <Route path='email-verification' element={<EmailVerification />} />
        <Route path='user-login' element={<UserLogin />} />
        <Route path='home' element={<HomePage />} />
      </Route>
      <Route path='passwordReset' element={<ForgetPasswordLayout />}>
        <Route path='email' element={<RequestEmail/>}/>
        <Route path='verify-otp' element={<VerifyOtp />} />
        <Route path='new-password' element={<NewPassword/>}/>
      </Route>
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
