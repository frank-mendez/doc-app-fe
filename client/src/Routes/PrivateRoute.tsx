import React from 'react'
import { Navigate } from 'react-router-dom'
import { verifyToken } from '../helper'

export type PrivateRouteProps = {
	outlet: JSX.Element
}

const PrivateRoute = ({ outlet }: PrivateRouteProps) => {
	const token = localStorage.getItem('accessToken')
	const isAuthenticated = token ? verifyToken(token) : false
	console.log('isAuthenticated', isAuthenticated)

	if (isAuthenticated) {
		return outlet
	} else {
		return <Navigate to={{ pathname: '/login' }} />
	}
}

export default PrivateRoute
