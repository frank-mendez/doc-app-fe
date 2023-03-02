import { Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import Title from 'antd/es/typography/Title'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { isErrorWithMessage, isFetchBaseQueryError } from '../../helper'
import { useSubmitLoginMutation } from '../../Reducer/Api/AuthApi'
import { saveJwt } from '../../Reducer/Features/authSlice'

const Login = () => {
	const dispatch = useDispatch()
	const [login, { isLoading, data }] = useSubmitLoginMutation()
	const navigate = useNavigate()
	const onFinish = async (values: any) => {
		try {
			const payload = { username: values.username, password: values.password }
			await login(payload).unwrap()
			navigate('/')
		} catch (error: any) {
			if (isFetchBaseQueryError(error)) {
				const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)
				toast.error(errMsg)
			} else if (isErrorWithMessage(error)) {
				toast.error(error.message)
			}
		}
	}

	useEffect(() => {
		if (data) {
			dispatch(saveJwt(data.access_token))
		}
	}, [data, dispatch])

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
