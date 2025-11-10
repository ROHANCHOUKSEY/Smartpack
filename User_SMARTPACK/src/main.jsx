import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import UserRegister from './Component/Authentication/UserRegister.jsx';
import UserLogin from './Component/Authentication/UserLogin.jsx';
import EmailVerification from './Component/Authentication/EmailVerification.jsx';
import RequestEmail from './Component/Authentication/ForgetPassword/RequestEmail.jsx';
import VerifyOtp from './Component/Authentication/ForgetPassword/VerifyOtp.jsx';
import ForgetPasswordLayout from './Component/Authentication/ForgetPassword/ForgetPasswordLayout.jsx';
import NewPassword from './Component/Authentication/ForgetPassword/NewPassword.jsx';
import Smartpackprovider from './Context/Smartpackprovider.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import PagenotFound from './Component/PagenotFound.jsx';
import MaleMeasurementDetails from './Component/Measurement/MaleMeasurementDetails.jsx';
import UserAddress from './Component/UserAddress/UserAddress.jsx';
import FemaleMeasurementDetails from './Component/Measurement/FemaleMeasurementDetails.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<App />}>
        <Route index element={<Navigate to="/user-register" />} />
        <Route path='user-register' element={<UserRegister />} />
        <Route path='email-verification' element={<EmailVerification />} />
        <Route path='user-login' element={<UserLogin />} />
        <Route element={<ProtectedRoute />}>
          <Route path='malemeasurement' element={<MaleMeasurementDetails />} />
          <Route path='femalemeasurement' element={<FemaleMeasurementDetails />} />
          <Route path='address' element={<UserAddress />} />
        </Route>
      </Route>

      <Route path='passwordReset' element={<ForgetPasswordLayout />}>
        <Route path='email' element={<RequestEmail />} />
        <Route path='verify-otp' element={<VerifyOtp />} />
        <Route path='new-password' element={<NewPassword />} />
      </Route>
      <Route path='*' element={<PagenotFound />} />
    </>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Smartpackprovider>
      <RouterProvider router={router} />
    </Smartpackprovider>
  </StrictMode>,
)
