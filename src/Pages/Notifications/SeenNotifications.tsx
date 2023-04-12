import { Button, Card } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { useGetAdminSeenNotificationsMutation } from '../../Reducer/Api/UserApi'
import CommonLoading from '../../Common/Layout/CommonLoading'
import { INotification } from './Notifications'

const SeenNotifications = () => {
	const authUser = useSelector((state: RootState) => state.authUser)
	const [notifications, setNotifications] = useState<INotification[]>([])
	const [getAdminSeenNotifications, { data, isLoading }] = useGetAdminSeenNotificationsMutation()

	useEffect(() => {
		if (data) {
			setNotifications(data)
			console.log('data', data)
		} else {
			if (authUser.isAdmin) {
				getAdminSeenNotifications({ token: authUser.token! })
			}
		}
	}, [data])

	return (
		<div>
			<div className='d-flex justify-content-end'>
				<Button type='link'>Delete All</Button>
			</div>
			<div>
				{isLoading ? (
					<CommonLoading />
				) : (
					<Fragment>
						{notifications && notifications.length > 0
							? notifications.map((notification, index) => (
									<Card key={index} style={{ marginBottom: '8px' }} hoverable={true}>
										{notification.message}
									</Card>
							  ))
							: 'No notifications'}
					</Fragment>
				)}
			</div>
		</div>
	)
}

export default SeenNotifications
