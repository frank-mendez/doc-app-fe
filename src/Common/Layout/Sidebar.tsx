import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { HomeOutlined, CalendarOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

const Sidebar = (props: { collapsed: boolean }) => {
	const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group'): MenuItem => {
		return {
			key,
			icon,
			children,
			label,
			type,
		} as MenuItem
	}
	const items: MenuItem[] = [
		getItem(<Link to='/'>Home</Link>, '1', <HomeOutlined />),
		getItem(<Link to='/appointments'>Appointments</Link>, '2', <CalendarOutlined />),
		getItem(<Link to='/apply-doctor'>Apply Doctor</Link>, '3', <UserOutlined />),
		getItem(<Link to='/profile'>Profile</Link>, '4', <UserOutlined />),
		getItem(<Link to='/logout'>Logout</Link>, '5', <LogoutOutlined />),
	]

	const adminMenuItems: MenuItem[] = [
		getItem(<Link to='/'>Home</Link>, '1', <HomeOutlined />),
		getItem(<Link to='/users'>Users</Link>, '3', <UserOutlined />),
		getItem(<Link to='/doctors'>Doctors</Link>, '3', <UserOutlined />),
		getItem(<Link to='/profile'>Profile</Link>, '4', <UserOutlined />),
		getItem(<Link to='/logout'>Logout</Link>, '5', <LogoutOutlined />),
	]

	return <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' theme='dark' inlineCollapsed={props.collapsed} items={items} />
}

export default Sidebar
