import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userMenu } from '../Menu/Menu'
import { LayoutProps } from '../types'
import './CommonLayout.style.scss'
import Sidebar from './Sidebar'

const CommonLayout = ({ children }: LayoutProps) => {
	const location = useLocation()
	const [collapsed, setCollapsed] = useState<boolean>(false)
	const collapseHandler = () => {
		setCollapsed(!collapsed)
	}
	return (
		<div className='main p-2'>
			<div className='layout d-flex'>
				<Sidebar collapsed={collapsed} />
				<div className='content'>
					<div className='header'>
						{!collapsed ? (
							<i onClick={collapseHandler} className='ri-menu-fold-line header-icon'></i>
						) : (
							<i onClick={collapseHandler} className='ri-menu-unfold-line header-icon'></i>
						)}
					</div>
					<div className='body'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default CommonLayout
