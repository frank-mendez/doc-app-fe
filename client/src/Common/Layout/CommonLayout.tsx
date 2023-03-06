import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userMenu } from '../Menu/Menu'
import { LayoutProps } from '../types'
import './CommonLayout.style.scss'

const CommonLayout = ({ children }: LayoutProps) => {
	const location = useLocation()
	return (
		<div className='main p-2'>
			<div className='layout d-flex'>
				<div className='sidebar'>
					<div className='sidebar-header'>
						<h1>App</h1>
					</div>
					<div className='menu'>
						{userMenu.map((menu) => {
							return (
								<div key={menu.name} className={`d-flex menu-item${location.pathname === menu.path ? '-active' : ''}`}>
									<i className={menu.icon}></i>
									<Link to={menu.path}>{menu.name}</Link>
								</div>
							)
						})}
					</div>
				</div>
				<div className='content'>
					<div className='header'>Header</div>
					<div className='body'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default CommonLayout
