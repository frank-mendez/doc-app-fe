import { Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../helper'
import { useSubmitLoginMutation } from '../../Reducer/Api/AuthApi'
import { LoginDto } from '../../Reducer/Api/types'
import { setAuthUser } from '../../Reducer/Features/authSlice'

const Login = () => {
	const dispatch = useDispatch()
	const [login, { isLoading, data }] = useSubmitLoginMutation()
	const location = useLocation()
	const navigate = useNavigate()

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/')
		}
	}, [navigate])

	useEffect(() => {
		console.log('location', location.pathname)
		if (location.pathname === '/logout') {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('userId')
			navigate('/login')
		}
	}, [location, navigate])

	const onFinish = async (values: LoginDto) => {
		try {
			const payload = { username: values.username, password: values.password }
			await login(payload).unwrap()
		} catch (error: any) {
			toast.error(error.data.message)
		}
	}

	useEffect(() => {
		if (data) {
			dispatch(setAuthUser(data))
			navigate('/')
		}
	}, [data, dispatch, navigate])

	return (
		<div className='loginForm p-5'>
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
					<Link to={'/register'}>Register</Link> | <Link to={'/forgot-password'}>Forgot Password</Link>
				</Form>
			)}
		</div>
	)
}

export default Login