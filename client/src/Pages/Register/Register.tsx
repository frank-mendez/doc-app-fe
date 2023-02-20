import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'

const { Title } = Typography

const Register = () => {
	const onFinish = (values: any) => {
		console.log('Success:', values)
	}

	const onFinishFailed = (errorInfo: any) => {
		console.log('Failed:', errorInfo)
	}

	return (
		<div className='registrationForm p-5'>
			<Title style={{ textAlign: 'center' }}>Welcome to Doctor Appointment Booking App</Title>
			<Title style={{ textAlign: 'center' }} className='mx-auto' level={2}>
				Register Here
			</Title>
			<Form name='basic' style={{ maxWidth: 400 }} onFinish={onFinish} onFinishFailed={onFinishFailed} layout='vertical' className='mx-auto'>
				<Form.Item label='Full Name' name='fullName'>
					<Input placeholder='Full Name' />
				</Form.Item>
				<Form.Item label='Email' name='email'>
					<Input placeholder='Email' />
				</Form.Item>
				<Form.Item label='Password' name='password'>
					<Input.Password placeholder='Password' />
				</Form.Item>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
				<br />
				<Link to={'/login'}>Login</Link>
			</Form>
		</div>
	)
}

export default Register
