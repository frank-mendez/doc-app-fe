import React, { useCallback, useEffect } from 'react'
import { Avatar, Badge, Layout, theme } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useGetAdminUnseenNotificationsMutation } from '../../Reducer/Api/UserApi'
import { useDispatch } from 'react-redux'
import { setUnseenNotifications } from '../../Reducer/Features/userSlice'

const { Header } = Layout

const CommonHeader = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const [getAdminUnseenNotifications, { data }] = useGetAdminUnseenNotificationsMutation()
	const user = useSelector((state: RootState) => state.userDetails)
	const token = localStorage.getItem('accessToken')!
	const authUser = useSelector((state: RootState) => state.authUser)
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const getNotifications = useCallback(() => {
		try {
			if (authUser.isAdmin) {
				getAdminUnseenNotifications({ token }).unwrap()
			}
		} catch (error: any) {
			toast.error(error.message)
		}
	}, [getAdminUnseenNotifications, token, authUser])

	useEffect(() => {
		if (!data) {
			getNotifications()
		} else {
			dispatch(setUnseenNotifications(data))
		}
	}, [data, getNotifications, dispatch])

	return (
		<Header style={{ background: colorBgContainer }}>
			<div style={{ float: 'right' }}>
				{data && data.length > 0 ? (
					<Badge count={data.length}>
						<BellOutlined
							onClick={() => {
								navigate('/notifications')
							}}
							style={{ fontSize: '18px', cursor: 'pointer' }}
						/>
					</Badge>
				) : (
					<BellOutlined
						onClick={() => {
							navigate('/notifications')
						}}
						style={{ fontSize: '18px', cursor: 'pointer' }}
					/>
				)}
				<Avatar size='small' style={{ marginLeft: '16px' }}>
					{user.firstName?.charAt(0)}
				</Avatar>
				<Link to='/profile'>
					<span style={{ marginLeft: '8px' }}>
						{authUser.isAdmin ? 'Admin: ' : ''}
						{user.firstName}
					</span>
				</Link>
			</div>
		</Header>
	)
}

export default CommonHeader
