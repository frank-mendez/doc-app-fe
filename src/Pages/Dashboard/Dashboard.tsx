import { Typography } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../Reducer/Store'

const { Text } = Typography

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.userDetails)
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (location.pathname !== '/dashboard') {
			navigate('/dashboard')
		}
	}, [location, navigate])

	return (
		<div>
			<Text>{`Hello ${user.firstName}`}</Text>
		</div>
	)
}

export default Dashboard
