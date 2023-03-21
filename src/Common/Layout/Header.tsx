import React from 'react'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Header = (props: { collapsed: boolean; setCollapsed: React.Dispatch<React.SetStateAction<boolean>> }) => {
	const { setCollapsed, collapsed } = props
	const collapseHandler = () => {
		setCollapsed(!props.collapsed)
	}
	return (
		<div className='header'>
			<Button type='primary' onClick={collapseHandler} style={{ marginBottom: 16 }}>
				{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			</Button>
		</div>
	)
}

export default Header
