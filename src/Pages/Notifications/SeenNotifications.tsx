import { Button, Card } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { useClearALlSeenNotificationsMutation, useGetAdminSeenNotificationsMutation } from '../../Reducer/Api/UserApi'
import CommonLoading from '../../Common/Layout/CommonLoading'
import { INotification } from './Notifications'
import toast from 'react-hot-toast'

const SeenNotifications = () => {
	const authUser = useSelector((state: RootState) => state.authUser)
	const [notifications, setNotifications] = useState<INotification[]>([])
	const [getAdminSeenNotifications, { data, isLoading }] = useGetAdminSeenNotificationsMutation()
	const [clearALlSeenNotifications, { data: clearData, isLoading: isLoadingData }] = useClearALlSeenNotificationsMutation()
	const userId = useSelector((state: RootState) => state.userDetails.id)

	useEffect(() => {
		if (data) {
			setNotifications(data)
		} else {
			if (authUser.isAdmin) {
				getAdminSeenNotifications({ token: authUser.token! })
			}
		}
	}, [data])

	const clickHandler = () => {
		try {
			const payload = {
				id: userId!,
				token: authUser.token!,
			}
			clearALlSeenNotifications(payload)
		} catch (error) {
			toast.error('Something went wrong')
		}
	}

	useEffect(() => {
		if (clearData) {
			console.log('clearData', clearData)
			setNotifications([])
		}
	}, [clearData])

	return (
		<div>
			<div className='d-flex justify-content-end'>
				<Button onClick={() => clickHandler()} type='link'>
					Delete All
				</Button>
			</div>
			<div>
				{isLoading || isLoadingData ? (
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
