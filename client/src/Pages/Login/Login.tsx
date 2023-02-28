import { Button, Form, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const onFinish = async (values: any) => {
		try {
			const response = await axios.post('/auth/login', values)
			console.log('response login', response)
			if (response.data) {
				localStorage.setItem('access_token', response.data.access_token)
				navigate('/')
			}
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='loginForm p-5'>
			<Title style={{ textAlign: 'center' }}>Welcome to Doctor Appointment Booking App</Title>
			<Title style={{ textAlign: 'center' }} className='mx-auto' level={2}>
				Login Here
			</Title>
			<Form style={{ maxWidth: 400 }} name='login' onFinish={onFinish} onFinishFailed={onFinishFailed} layout='vertical' className='mx-auto'>
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
		</div>
	)
}

export default Login
