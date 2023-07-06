import { Button, Col, Form, Input, Result, Row, Space, Spin } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import { Typography } from 'antd'
import toast from 'react-hot-toast'
import { useRegisterUserMutation } from '../../Reducer/Api/UserApi'
import { RegisterDto } from '../../Reducer/Api/types'
import './Register.style.scss'

const { Title } = Typography

const Register = () => {
	const [registerUser, { isLoading, data, error }] = useRegisterUserMutation()

	const onFinish = async (values: RegisterDto) => {
		try {
			await registerUser(values).unwrap()
		} catch (error: any) {
			if (typeof error.data.message === 'string') {
				toast.error('Email already in use')
			} else {
				for (let err of error.data.message) {
					toast.error(err.charAt(0).toUpperCase() + err.slice(1))
				}
			}
		}
	}

	const layout = {
		labelCol: { span: 6 },
		wrapperCol: { span: 16 },
	}

	const tailLayout = {
		wrapperCol: { offset: 6, span: 16 },
	}

	return (
		<div className='registrationForm p-5'>
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
				<div>
					{data ? (
						<Result
							status='success'
							title='Registration successful!'
							subTitle={`Welcome to our website. ${data.data.message}`}
							extra={[
								<Button type='primary' key='dashboard'>
									<Link to='/dashboard'>Go to Dashboard</Link>
								</Button>,
								<Button key='home'>
									<Link to='/'>Go to Home</Link>
								</Button>,
							]}
						/>
					) : (
						<Form {...layout} name='registration-form' onFinish={onFinish}>
							<Form.Item label='First Name' name='firstName' rules={[{ required: true, message: 'Please input your first name!' }]}>
								<Input />
							</Form.Item>

							<Form.Item label='Last Name' name='lastName' rules={[{ required: true, message: 'Please input your last name!' }]}>
								<Input />
							</Form.Item>

							<Form.Item label='Email' name='email' rules={[{ required: true, type: 'email', message: 'Please input a valid email address!' }]}>
								<Input />
							</Form.Item>

							<Form.Item label='Password' name='password' rules={[{ required: true, message: 'Please input a password!' }]}>
								<Input.Password />
							</Form.Item>

							<Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please input your address!' }]}>
								<Input />
							</Form.Item>

							<Form.Item {...tailLayout}>
								<Button type='primary' htmlType='submit'>
									Register
								</Button>
								<br />
								<Link to='/login'>Already have an account? Login</Link>
							</Form.Item>
						</Form>
					)}
				</div>
			)}
		</div>
	)
}

export default Register
