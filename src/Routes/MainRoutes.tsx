import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import Register from '../Pages/Register/Register'
import ResetPassword from '../Pages/ResetPassword/ResetPassword'
import VerifyUser from '../Pages/VerifyUser/VerifyUser'
import PrivateRoute from './PrivateRoute'

const MainRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<PrivateRoute outlet={<Dashboard />} />} />
			<Route path='/login' element={<Login />} />
			<Route path='/logout' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/reset-password/:token' element={<ResetPassword />} />
			<Route path='/email/verify/:token' element={<VerifyUser />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default MainRoutes
