import React from 'react'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { HomeOutlined, CalendarOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'

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
		getItem('Home', '1', <HomeOutlined />),
		getItem('Appointments', '2', <CalendarOutlined />),
		getItem('Apply Doctor', '3', <UserOutlined />),
		getItem('Profile', '4', <UserOutlined />),
		getItem('Logout', '5', <LogoutOutlined />),
	]
	return <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode='inline' theme='dark' inlineCollapsed={props.collapsed} items={items} />
}

export default Sidebar
