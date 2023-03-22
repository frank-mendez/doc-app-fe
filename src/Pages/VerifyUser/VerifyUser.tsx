import { Button, Col, Result, Row, Space, Spin } from 'antd'
import React, { Fragment, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useVerifyUserMutation } from '../../Reducer/Api/AuthApi'

const VerifyUser = () => {
	let { token } = useParams()
	const [verifyUser, { isLoading, isError, data }] = useVerifyUserMutation()

	useEffect(() => {
		if (token) {
			verifyUser(token)
		}
	}, [token, verifyUser])

	return (
		<Fragment>
			{isLoading && (
				<Row>
					<Col span={8} offset={8}>
						<Space style={{ marginLeft: '48%' }} align='center' size='middle'>
							<Spin tip='Loading' size='large' />
						</Space>
					</Col>
				</Row>
			)}
			{data && (
				<Result
					status='success'
					title='Verification successful!'
					subTitle={`Welcome to our website. ${data.data.message}`}
					extra={[
						<Button type='primary' key='dashboard'>
							<Link to='/dashboard'>Go to Dashboard</Link>
						</Button>,
						<Button key='home'>
							<Link to='/login'>Login</Link>
						</Button>,
					]}
				/>
			)}
			{isError && (
				<Result
					status='error'
					title='Verification unsuccessful!'
					subTitle={'We are sorry! Something went wrong. Please contact your admin'}
					extra={[
						<Button type='primary' key='dashboard'>
							<Link to='/dashboard'>Go to Dashboard</Link>
						</Button>,
						<Button key='home'>
							<Link to='/login'>Login</Link>
						</Button>,
					]}
				/>
			)}
		</Fragment>
	)
}

export default VerifyUser
