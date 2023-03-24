import React from 'react'
import { Avatar, Badge, Dropdown, Layout, MenuProps, theme } from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../Reducer/Store'
import { Link } from 'react-router-dom'

const { Header } = Layout

const CommonHeader = () => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()
	const user = useSelector((state: RootState) => state.userDetails)

	const items: MenuProps['items'] = [
		{ key: '1', label: 'Nofication 1' },
		{ key: '2', label: 'Nofication 1' },
		{ key: '3', label: 'Nofication 1' },
	]

	return (
		<Header style={{ background: colorBgContainer }}>
			<div style={{ float: 'right' }}>
				<Dropdown menu={{ items }} trigger={['click']}>
					<Badge count={items.length}>
						<BellOutlined style={{ fontSize: '18px', cursor: 'pointer' }} />
					</Badge>
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
