import { Button, Form, Input } from 'antd'
import axios from 'axios'
import React from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
	const navigate = useNavigate()
	const onFinish = async (values: any) => {
		try {
			const response = await axios.post('/users/login', values)
			console.log('response login', response)
			if (response.data) {
				localStorage.setItem('token', response.data)
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
			<Form
				name='basic'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 600 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				autoComplete='off'
				className='mx-auto'
			>
				<Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email' }]}>
					<Input placeholder='Email' />
				</Form.Item>

				<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
					<Input.Password placeholder='Password' />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default Login
