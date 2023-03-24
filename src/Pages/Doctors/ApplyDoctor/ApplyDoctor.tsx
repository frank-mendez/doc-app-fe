import React from 'react'
import { Form, Input, Upload, Select, DatePicker, InputNumber, Button, Typography } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import './ApplyDoctor.style.scss'

const { Title } = Typography

const { Option } = Select

const ApplyDoctor = () => {
	const onFinish = (values: any) => {
		console.log('Received values:', values)
	}

	const handleUpload = (file: any) => {
		console.log(file)
		// Handle file upload logic here
	}

	return (
		<div className='apply-doctor'>
			<Title level={3}>Apply Doctor Account</Title>
			<Form labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish}>
				<Form.Item label='First Name' name='firstName' rules={[{ required: true, message: 'Please enter your first name' }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Last Name' name='lastName' rules={[{ required: true, message: 'Please enter your last name' }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Email' name='email' rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Phone Number' name='phoneNumber' rules={[{ required: true, message: 'Please enter your phone number' }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Image' name='image'>
					<Upload beforeUpload={handleUpload} maxCount={1}>
						<Button icon={<UploadOutlined />}>Click to Upload</Button>
					</Upload>
				</Form.Item>
				<Form.Item label='Department' name='department' rules={[{ required: true, message: 'Please select your department' }]}>
					<Select>
						<Option value='cardiology'>Cardiology</Option>
						<Option value='dentistry'>Dentistry</Option>
						<Option value='dermatology'>Dermatology</Option>
					</Select>
				</Form.Item>
				<Form.Item label='Profession' name='profession' rules={[{ required: true, message: 'Please enter your profession' }]}>
					<Input />
				</Form.Item>
				<Form.Item label='Experience' name='experience' rules={[{ required: true, message: 'Please enter your experience' }]}>
					<InputNumber />
				</Form.Item>
				<Form.Item label='Address' name='address' rules={[{ required: true, message: 'Please enter your address' }]}>
					<Input.TextArea />
				</Form.Item>
				<Form.Item label='Consultation Fee' name='consultationFee' rules={[{ required: true, message: 'Please enter your consultation fee' }]}>
					<InputNumber />
				</Form.Item>
				<Form.Item
					label='Consultation Schedule'
					name='consultationSchedule'
					rules={[{ required: true, message: 'Please select your consultation schedule' }]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item wrapperCol={{ offset: 6 }}>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
			</Form>
		</div>
	)
}

export default ApplyDoctor
