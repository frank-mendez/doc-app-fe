import React, { useEffect } from 'react'
import { useGetUsersQuery } from '../../Reducer/Api/UserApi'

const Dashboard = () => {
	const { data } = useGetUsersQuery('')

	useEffect(() => {
		if (data) {
			console.log('data', data)
		}
	}, [data])

	return (
		<div className='p-5'>
			<h1>Dashboard</h1>
		</div>
	)
}

export default Dashboard
