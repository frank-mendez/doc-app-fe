import { Button, Card } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { useClearAllUnseenNotificationsMutation } from '../../Reducer/Api/UserApi'
import { UserAuthData } from '../../Reducer/Api/types'
import toast from 'react-hot-toast'
import CommonLoading from '../../Common/Layout/CommonLoading'
import { INotification } from './Notifications'

const UnseeNofications = () => {
	const [notifications, setNofitications] = useState<INotification[]>([])
	const unseenNotifications = useSelector((state: RootState) => state.userDetails.unseenNotifications)
	const [clearAllUnseenNotifications, { data, isLoading }] = useClearAllUnseenNotificationsMutation()
	const userId = useSelector((state: RootState) => state.userDetails.id)

	useEffect(() => {
		if (unseenNotifications.length > 0) {
			setNofitications(unseenNotifications)
		}
	}, [unseenNotifications])

	const handleClearUnseenNotification = async () => {
		const payload: UserAuthData = {
			token: localStorage.getItem('accessToken')!,
			id: userId!,
		}
		try {
			clearAllUnseenNotifications(payload)
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	useEffect(() => {
		if (data) {
			console.log('data', data)
			toast.success('Removed Notifications')
			setNofitications([])
		}
	}, [data])

	return (
		<div>
			<div className='d-flex justify-content-end'>
				<Button onClick={() => handleClearUnseenNotification()} type='link'>
					Mark all as seen
				</Button>
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
export default UnseeNofications
