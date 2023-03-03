import { Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from 'antd'
import axios from 'axios'
import toast from 'react-hot-toast'
import { isErrorWithMessage, isFetchBaseQueryError, verifyToken } from '../../helper'
import { useDispatch } from 'react-redux'
import { useRegisterUserMutation } from '../../Reducer/Api/UserApi'
import { saveJwt } from '../../Reducer/Features/authSlice'

const { Title } = Typography

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [registerUser, { isLoading, data }] = useRegisterUserMutation()

	const token = localStorage.getItem('accessToken')
	const isAuthenticated = token ? verifyToken(token) : false

	useEffect(() => {
		if (isAuthenticated) {
			navigate('/')
		}
	}, [isAuthenticated])

	const onFinish = async (values: any) => {
		try {
			await registerUser(values).unwrap()
		} catch (error) {
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
			navigate('/')
		}
	}, [data, dispatch])

	return (
		<div className='registrationForm p-5'>
			<Title style={{ textAlign: 'center' }}>Welcome to Doctor Appointment Booking App</Title>
			<Title style={{ textAlign: 'center' }} className='mx-auto' level={2}>
				Register Here
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
				<Form name='register' style={{ maxWidth: 400 }} onFinish={onFinish} layout='vertical' className='mx-auto'>
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
			)}
		</div>
	)
}

export default Register
