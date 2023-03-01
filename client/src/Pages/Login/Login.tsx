import { Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useSubmitLoginMutation } from '../../Reducer/Api/AuthApi'

const Login = () => {
	const [login, { isError, isLoading, data }] = useSubmitLoginMutation()
	const onFinish = async (values: any) => {
		try {
			login(values)
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	useEffect(() => {
		if (data) {
			console.log('data', data)
		}
		if (isError) {
			console.log('dataError', data)
		}
	}, [data, isError])

	return (
		<div className='loginForm p-5'>
			<Title style={{ textAlign: 'center' }}>Welcome to Doctor Appointment Booking App</Title>
			<Title style={{ textAlign: 'center' }} className='mx-auto' level={2}>
				Login Here
			</Title>
			{isLoading ? (
				<Row>
					<Col span={8} offset={8}>
						<Space style={{ marginLeft: '48%' }} align='center' size='middle'>
							<Spin tip='Loading' size='large' />
						</Space>
					</Col>
				</Row>
			) : (
				<Form style={{ maxWidth: 400 }} name='login' onFinish={onFinish} layout='vertical' className='mx-auto'>
					<Form.Item label='Email' name='username' rules={[{ required: true, message: 'Please input your Email' }]}>
						<Input placeholder='Email' />
					</Form.Item>
					<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
						<Input.Password placeholder='Password' />
					</Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
					<br />
					<Link to={'/register'}>Register</Link> | <Link to={'/register'}>Forgot Password</Link>
				</Form>
			)}
		</div>
	)
}

export default Login
