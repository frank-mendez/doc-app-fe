import React from 'react'
import { Link } from 'react-router-dom'
import { userMenu } from '../Menu/Menu'
import { LayoutProps } from '../types'
import './CommonLayout.style.scss'

const CommonLayout = ({ children }: LayoutProps) => {
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
								<div className='d-flex menu-item'>
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
