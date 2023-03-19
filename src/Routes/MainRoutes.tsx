import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Login from '../Pages/Login/Login'
import NotFound from '../Pages/NotFound/NotFound'
import Register from '../Pages/Register/Register'
import PrivateRoute from './PrivateRoute'

const MainRoutes = () => {
	return (
		<Routes>
			<Route path='/' element={<PrivateRoute outlet={<Dashboard />} />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='*' element={<NotFound />} />
		</Routes>
	)
}

export default MainRoutes
