import React from 'react'
import { Navigate } from 'react-router-dom'
import { isAuthenticated } from '../helper'

export type PrivateRouteProps = {
	outlet: JSX.Element
}

const PrivateRoute = ({ outlet }: PrivateRouteProps) => {
	if (isAuthenticated()) {
		return outlet
	} else {
		return <Navigate to={{ pathname: '/login' }} />
	}
}

export default PrivateRoute
