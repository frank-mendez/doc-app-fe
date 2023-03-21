import React, { useState } from 'react'
import { LayoutProps } from '../types'
import './CommonLayout.style.scss'
import Header from './Header'
import Sidebar from './Sidebar'

const CommonLayout = ({ children }: LayoutProps) => {
	const [collapsed, setCollapsed] = useState<boolean>(false)

	return (
		<div className='main p-2'>
			<div className='layout d-flex'>
				<Sidebar collapsed={collapsed} />
				<div className='content'>
					<Header collapsed={collapsed} setCollapsed={setCollapsed} />
					<div className='body'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default CommonLayout
