import React, { useCallback, useEffect } from 'react'
import { Avatar, Badge, Dropdown, Layout, MenuProps, theme } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useGetAdminUnseenNotificationsMutation } from '../../Reducer/Api/UserApi'

const { Header } = Layout

const CommonHeader = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const [getAdminUnseenNotifications, { data }] = useGetAdminUnseenNotificationsMutation()
	const user = useSelector((state: RootState) => state.userDetails)
	const token = localStorage.getItem('accessToken')!

	const getNotifications = useCallback(() => {
		try {
			getAdminUnseenNotifications({ token }).unwrap()
		} catch (error: any) {
			toast.error(error.message)
		}
	}, [getAdminUnseenNotifications, token])

	const items: MenuProps['items'] =
		data && data.length > 0
			? data.map((notification: any, index: number) => {
					return {
						key: index,
						label: notification.message,
					}
			  })
			: []

	useEffect(() => {
		if (!data) {
			getNotifications()
		}
	}, [data, getNotifications])

	return (
		<Header style={{ background: colorBgContainer }}>
			<div style={{ float: 'right' }}>
				<Dropdown menu={{ items }} trigger={['click']}>
					{data && data.length > 0 ? (
						<Badge count={data.length}>
							<BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
						</Badge>
					) : (
						<BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
					)}
				</Dropdown>
				<Avatar size='small' style={{ marginLeft: '16px' }}>
					{user.firstName?.charAt(0)}
				</Avatar>
				<Link to='/profile'>
					<span style={{ marginLeft: '8px' }}>{user.firstName}</span>
				</Link>
			</div>
		</Header>
	)
}

export default CommonHeader
