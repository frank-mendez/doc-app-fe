import React, { useEffect } from 'react'
import { Button, Form, Input } from 'antd'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { useForgotPasswordMutation } from '../../Reducer/Api/AuthApi'
import Title from 'antd/es/typography/Title'
import CommonLoading from '../../Common/Layout/CommonLoading'

const ForgotPassword = () => {
	const [forgotPassword, { data, isLoading }] = useForgotPasswordMutation()
	const onFinish = async (values: { email: string }) => {
		try {
			const payload = { email: values.email }
			await forgotPassword(payload).unwrap()
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
		<div className='forgotPassword'>
			<Title style={{ textAlign: 'center', marginTop: '50px' }} className='mx-auto' level={2}>
				Forgot Password
			</Title>
			{isLoading ? (
				<CommonLoading />
			) : (
				<Form style={{ maxWidth: 400 }} name='login' onFinish={onFinish} layout='vertical' className='mx-auto'>
					<Form.Item label='Email' name='email' rules={[{ required: true, message: 'Please input your Email' }]}>
						<Input placeholder='Email' />
					</Form.Item>
					<Button type='primary' htmlType='submit'>
						Reset Password
					</Button>
					<br />
					<Link to={'/Login'}>Login</Link> | <Link to={'/register'}>Register</Link>
				</Form>
			)}
		</div>
	)
}

export default ForgotPassword
