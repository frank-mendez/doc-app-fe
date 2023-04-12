import { Button, Form, Input } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { isAuthenticated } from '../../helper'
import { useSubmitLoginMutation } from '../../Reducer/Api/AuthApi'
import { LoginDto } from '../../Reducer/Api/types'
import { logout, setAuthUser } from '../../Reducer/Features/authSlice'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import './Login.style.scss'
import { removeUser, setUser } from '../../Reducer/Features/userSlice'
import CommonLoading from '../../Common/Layout/CommonLoading'

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
		if (location.pathname === '/logout') {
			localStorage.removeItem('accessToken')
			localStorage.removeItem('userId')
			dispatch(logout())
			dispatch(removeUser())
			navigate('/login')
		} else if (location.pathname !== '/login') {
			navigate('/login')
		}
	}, [location, navigate, dispatch])

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
			dispatch(setUser(data))
			navigate('/')
		}
	}, [data, dispatch, navigate])

	return (
		<div className='loginForm p-5'>
			<Title style={{ textAlign: 'center' }} className='mx-auto' level={2}>
				Login Here
			</Title>
			{isLoading ? (
				<CommonLoading />
			) : (
				<Form name='normal_login' className='login-form' initialValues={{ remember: true }} onFinish={onFinish}>
					<Form.Item name='username' rules={[{ required: true, message: 'Please input your Username!' }]}>
						<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username or Email' />
					</Form.Item>
					<Form.Item name='password' rules={[{ required: true, message: 'Please input your Password!' }]}>
						<Input prefix={<LockOutlined className='site-form-item-icon' />} type='password' placeholder='Password' />
					</Form.Item>
					<Form.Item>
						<Link className='login-form-forgot' to='/forgot-password'>
							Forgot password
						</Link>
					</Form.Item>

					<Form.Item>
						<Button type='primary' htmlType='submit' className='login-form-button'>
							Log in
						</Button>
						Or <Link to='/register'>register now!</Link>
					</Form.Item>
				</Form>
			)}
		</div>
	)
}

export default Login
