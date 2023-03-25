import React, { Fragment } from 'react'
import { Form, Input, InputNumber, Button, Typography, Row, Col, TimePicker, Space, Spin, Result } from 'antd'
import './ApplyDoctor.style.scss'
import { useApplyDoctorAccountMutation } from '../../../Reducer/Api/DoctorApi'
import { ApplyDoctorAccountDto } from '../../../Reducer/Api/types'
import { toast } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const { Title } = Typography

const ApplyDoctor = () => {
	const [applyDoctorAccount, { isLoading, data }] = useApplyDoctorAccountMutation()

	const onFinish = async (values: any) => {
		console.log('Received values:', values)
		const { firstName, lastName, phoneNumber, website, address, specialization, experience, consultationFee, consultationSchedule } = values
		const userId = localStorage.getItem('userId')!
		const token = localStorage.getItem('accessToken')!
		const payload: ApplyDoctorAccountDto = {
			firstName,
			lastName,
			phoneNumber,
			website,
			address,
			specialization,
			experience,
			consultationFee,
			consultationSchedule,
			userId,
			token,
		}
		try {
			await applyDoctorAccount(payload).unwrap()
		} catch (error) {
			console.error('error', error)
			toast.error('Something went wrong')
		}
	}

	return (
		<div className='apply-doctor'>
			<Title style={{ textAlign: 'center', marginBottom: '40px' }} level={3}>
				Apply Doctor Account
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
				<Fragment>
					{data ? (
						<Result
							status='success'
							title='Application successful!'
							subTitle={`${data.data.message} An admin will verify your application and update your account once approved`}
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
						<Form layout='vertical' labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} onFinish={onFinish}>
							<Title level={4}>Personal Information</Title>
							<hr />
							<Row gutter={24}>
								<Col span={8}>
									<Form.Item label='First Name' name='firstName' rules={[{ required: true, message: 'Please enter your first name' }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Last Name' name='lastName' rules={[{ required: true, message: 'Please enter your last name' }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Phone' name='phoneNumber' rules={[{ required: true, message: 'Please enter a valid Phone Number' }]}>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={8}>
									<Form.Item label='Website' name='website' rules={[{ required: true, message: 'Please enter your website' }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please input your address!' }]}>
										<Input />
									</Form.Item>
								</Col>
							</Row>
							<Title style={{ marginTop: 20 }} level={4}>
								Professional Information
							</Title>
							<hr />
							<Row gutter={24}>
								<Col span={8}>
									<Form.Item label='Specialization' name='specialization' rules={[{ required: true, message: 'Please enter your specialization' }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item label='Experience' name='experience' rules={[{ required: true, message: 'Please enter your experience' }]}>
										<InputNumber />
									</Form.Item>
								</Col>
								<Col span={8}>
									<Form.Item
										label='Consultation Fee'
										name='consultationFee'
										rules={[{ required: true, message: 'Please enter your consultation fee' }]}
									>
										<InputNumber />
									</Form.Item>
								</Col>
							</Row>
							<Row gutter={24}>
								<Col span={8}>
									<Form.Item label='Consultation Schedule' name='consultationSchedule'>
										<TimePicker.RangePicker />
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col style={{ marginLeft: 'auto' }}>
									<Form.Item>
										<Button type='primary' htmlType='submit'>
											Apply Doctor Account
										</Button>
									</Form.Item>
								</Col>
							</Row>
						</Form>
					)}
				</Fragment>
			)}
		</div>
	)
}

export default ApplyDoctor
