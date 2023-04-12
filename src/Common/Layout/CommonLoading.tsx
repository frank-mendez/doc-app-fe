import { Col, Row, Space, Spin } from 'antd'
import React from 'react'

const CommonLoading = () => {
	return (
		<Row>
			<Col span={8} offset={8}>
				<Space style={{ marginLeft: '48%' }} align='center' size='middle'>
					<Spin tip='Loading' size='large' />
				</Space>
			</Col>
		</Row>
	)
}

export default CommonLoading
