import { Tabs, Typography } from 'antd'
import React from 'react'
import UnseeNofications from './UnseeNofications'
import SeenNotifications from './SeenNotifications'
import type { TabsProps } from 'antd'

const { Title } = Typography

export interface INotification {
	data: any
	message: string
	type: string
}

const Notifications = () => {
	const items: TabsProps['items'] = [
		{
			label: 'Unseen',
			key: '0',
			children: <UnseeNofications />,
		},
		{
			label: 'Seen ',
			key: '1',
			children: <SeenNotifications />,
		},
	]

	return (
		<div>
			<Title level={3}>Notifications</Title>
			<Tabs defaultActiveKey='0' type='card' size='middle' items={items} />
		</div>
	)
}

export default Notifications
