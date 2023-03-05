import { Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Typography } from 'antd'
import toast from 'react-hot-toast'
import { isAuthenticated, isErrorWithMessage, isFetchBaseQueryError } from '../../helper'
import { useDispatch } from 'react-redux'
import { useRegisterUserMutation } from '../../Reducer/Api/UserApi'
import { setAuthUser } from '../../Reducer/Features/authSlice'
import { RegisterDto } from '../../Reducer/Api/types'

const { Title } = Typography

const Register = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const [registerUser, { isLoading, data }] = useRegisterUserMutation()

	useEffect(() => {
		if (isAuthenticated()) {
			navigate('/')
		}
	}, [navigate])

	const onFinish = async (values: RegisterDto) => {
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
			dispatch(setAuthUser(data))
			navigate('/')
		}
	}, [data, dispatch, navigate])

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
