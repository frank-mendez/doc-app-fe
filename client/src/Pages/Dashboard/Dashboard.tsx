import React from 'react'
import CommonLayout from '../../Common/Layout/CommonLayout'

const Dashboard = () => {
	const Output = () => {
		return (
			<div className='p-5'>
				<h1>Greetings!</h1>
				<h2>Welcome!</h2>
			</div>
		)
	}

	return <CommonLayout children={<Output />} />
}

export default Dashboard
