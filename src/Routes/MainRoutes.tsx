import { Layout, theme } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import '../Common/Layout/CommonLayout.style.scss'
import { Route, Routes, useLocation } from 'react-router-dom'
import Dashboard from '../Pages/Dashboard/Dashboard'
import Doctors from '../Pages/Doctors/Doctors'
import ForgotPassword from '../Pages/ForgotPassword/ForgotPassword'
import Login from '../Pages/Login/Login'
import Register from '../Pages/Register/Register'
import ResetPassword from '../Pages/ResetPassword/ResetPassword'
import Users from '../Pages/Users/Users'
import VerifyUser from '../Pages/VerifyUser/VerifyUser'
import Sidebar from '../Common/Layout/Sidebar'
import CommonHeader from '../Common/Layout/CommonHeader'
import CommonFooter from '../Common/Layout/CommonFooter'
import { isAuthenticated } from '../helper'
import Profile from '../Pages/Profile/Profile'
import ApplyDoctor from '../Pages/Doctors/ApplyDoctor/ApplyDoctor'
import Appointments from '../Pages/Appointments/Appointments'
import Notifications from '../Pages/Notifications/Notifications'
import CommonBreadcrumbs from '../Common/Layout/CommonBreadcrumbs'

const { Content } = Layout

interface RouteItem {
	path: string
	element: JSX.Element
}

const MainRoutes = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const [isAuth, setIsAuth] = useState<boolean>(false)

	const location = useLocation()

	useEffect(() => {
		setIsAuth(isAuthenticated())
	}, [isAuth, setIsAuth, location])

	const privateRoutes: RouteItem[] = [
		{ path: '/apply-doctor', element: <ApplyDoctor /> },
		{ path: '/appointments', element: <Appointments /> },
		{ path: '/', element: <Dashboard /> },
		{ path: '*', element: <Dashboard /> },
		{ path: '/doctors', element: <Doctors /> },
		{ path: '/logout', element: <Login /> },
		{ path: '/profile', element: <Profile /> },
		{ path: '/users', element: <Users /> },
		{ path: '/notifications', element: <Notifications /> },
	]

	const publicRoutes: RouteItem[] = [
		{ path: '/forgot-password', element: <ForgotPassword /> },
		{ path: '/login', element: <Login /> },
		{ path: '/logout', element: <Login /> },
		{ path: '*', element: <Login /> },
		{ path: '/register', element: <Register /> },
		{ path: '/reset-password/:token', element: <ResetPassword /> },
		{ path: '/email/verify/:token', element: <VerifyUser /> },
	]

	return (
		<Fragment>
			{isAuth ? (
				<Layout className='main'>
					<Sidebar />
					<Layout style={{ display: 'flex', flexDirection: 'column', minHeight: '100%' }} className='site-layout'>
						<CommonHeader />
						<Content style={{ margin: '0 16px' }}>
							<CommonBreadcrumbs />
							<div style={{ padding: 24, background: colorBgContainer }}>
								<Routes>
									{privateRoutes.map((route) => {
										return <Route key={route.path} path={route.path} element={route.element} />
									})}
								</Routes>
							</div>
						</Content>
						<CommonFooter />
					</Layout>
				</Layout>
			) : (
				<Routes>
					{publicRoutes.map((route) => {
						return <Route key={route.path} path={route.path} element={route.element} />
					})}
				</Routes>
			)}
		</Fragment>
	)
}

export default MainRoutes
