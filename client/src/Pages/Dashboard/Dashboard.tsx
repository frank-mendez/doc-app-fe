import React from 'react'
import CommonLayout from '../../Common/Layout/CommonLayout'

const Dashboard = () => {
	const Output = () => {
		return (
			<div>
				<h1>Dashboard</h1>
			</div>
		)
	}

	return <CommonLayout children={<Output />} />
}

export default Dashboard
