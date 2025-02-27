import {Route, Routes} from 'react-router-dom'
import { AuthLayout } from './AuthLayout'
import { Login } from './components/Login'
import { Registration } from './components/Registration'
import { ForgotPassword } from './components/ForgotPassword'

const AuthPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<Login />} />
      <Route path='registration' element={<Registration />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route index element={<Login />} />
    </Route>
  </Routes>
)

export {AuthPage}