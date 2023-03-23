import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.userDetails)

	return (
		<div>
			<h1>{`Hello ${user.firstName}`}</h1>
		</div>
	)
}

export default Dashboard
