import { Button, Card } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'

interface Notification {
	data: any
	message: string
	type: string
}

const UnseeNofications = () => {
	const [notifications, setNofitications] = useState<Notification[]>([])
	const unseenNotifications = useSelector((state: RootState) => state.userDetails.unseenNotifications)

	useEffect(() => {
		if (unseenNotifications.length > 0) {
			setNofitications(unseenNotifications)
		}
	}, [unseenNotifications])

	return (
		<div>
			<div className='d-flex justify-content-end'>
				<Button type='link'>Mark all as seen</Button>
			</div>
			<div>
				{notifications && notifications.length > 0
					? notifications.map((notification) => (
							<Card style={{ marginBottom: '8px' }} hoverable={true}>
								{notification.message}
							</Card>
					  ))
					: 'No notifications'}
			</div>
		</div>
	)
}
export default UnseeNofications
