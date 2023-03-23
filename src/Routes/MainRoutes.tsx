import { Breadcrumb, Layout, theme } from 'antd'
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

const { Content } = Layout

interface RouteItem {
	path: string
	element: JSX.Element
}

const privateRoutes: RouteItem[] = [
	{ path: '/', element: <Dashboard /> },
	{ path: '/users', element: <Users /> },
	{ path: '/doctors', element: <Doctors /> },
	{ path: '/logout', element: <Login /> },
	{ path: '*', element: <Dashboard /> },
]

const publicRoutes: RouteItem[] = [
	{ path: '/login', element: <Login /> },
	{ path: '/logout', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/forgot-password', element: <ForgotPassword /> },
	{ path: '/reset-password/:token', element: <ResetPassword /> },
	{ path: '/email/verify/:token', element: <VerifyUser /> },
	{ path: '*', element: <Login /> },
]

const MainRoutes = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const [isAuth, setIsAuth] = useState<boolean>(false)

	const location = useLocation()

	useEffect(() => {
		setIsAuth(isAuthenticated())
	}, [isAuth, setIsAuth, location])

	return (
		<Fragment>
			{isAuth ? (
				<Layout className='main'>
					<Sidebar />
					<Layout className='site-layout'>
						<CommonHeader />
						<Content style={{ margin: '0 16px' }}>
							<Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>User</Breadcrumb.Item>
								<Breadcrumb.Item>Bill</Breadcrumb.Item>
							</Breadcrumb>
							<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>
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
