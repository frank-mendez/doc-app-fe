import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { User } from '../../Reducer/Features/authSlice'
import { RootState } from '../../Reducer/Store'

const Dashboard = () => {
	const user = useSelector<RootState, User>((state) => state.authUser.user)
	const [firstName, setFirstName] = useState<string>('')

	useEffect(() => {
		if (user.fullName) {
			const fullNameArr = user.fullName.split(' ')
			setFirstName(fullNameArr[0])
		}
	}, [user])

	return (
		<div className='p-5'>
			<h1>Greetings {user && user.fullName ? firstName : 'User'}!</h1>
			<h2>Welcome!</h2>
		</div>
	)
}

export default Dashboard
