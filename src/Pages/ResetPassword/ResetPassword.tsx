import React, { Fragment, useEffect } from 'react'
import { useResetPasswordMutation } from '../../Reducer/Api/AuthApi'
import { Button, Col, Form, Input, Row, Space, Spin } from 'antd'
import { Link, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ResetPasswordDto } from '../../Reducer/Api/types'
import Title from 'antd/es/typography/Title'

const ResetPassword = () => {
	let { token } = useParams()
	const [resetPassword, { data, isLoading }] = useResetPasswordMutation()
	const onFinish = async (values: ResetPasswordDto) => {
		try {
			const payload = {
				email: values.email,
				newPassword: values.newPassword,
				newPasswordToken: token!,
				currentPassword: token ? null : values.currentPassword,
			}
			await resetPassword(payload).unwrap()
		} catch (error: any) {
			toast.error(error.data.message)
		}
	}

	useEffect(() => {
		if (data) {
			toast.success(data.data.message)
		}
	}, [data])

	return (
		<Fragment>
			<Title style={{ textAlign: 'center', marginTop: '50px' }} className='mx-auto' level={2}>
				Change Password
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
					<Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email' }]}>
						<Input placeholder='Email' />
					</Form.Item>
					<Form.Item
						name='newPassword'
						label='New Password'
						rules={[
							{
								required: true,
								message: 'Please input your new password!',
							},
						]}
						hasFeedback
					>
						<Input.Password />
					</Form.Item>
					<Form.Item
						name='confirm'
						label='Confirm Password'
						dependencies={['password']}
						hasFeedback
						rules={[
							{
								required: true,
								message: 'Please confirm your password!',
							},
							({ getFieldValue }) => ({
								validator(_, value) {
									if (!value || getFieldValue('newPassword') === value) {
										return Promise.resolve()
									}
									return Promise.reject(new Error('The two passwords that you entered do not match!'))
								},
							}),
						]}
					>
						<Input.Password />
					</Form.Item>
					{!token && (
						<Form.Item
							name='currentPassword'
							label='Current Password'
							rules={[
								{
									required: true,
									message: 'Please input your current password!',
								},
							]}
							hasFeedback
						>
							<Input.Password />
						</Form.Item>
					)}
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
					<br />
					<Link to={'/login'}>Login</Link> | <Link to={'/register'}>Register</Link>
				</Form>
			)}
		</Fragment>
	)
}

export default ResetPassword
