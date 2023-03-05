import React from 'react'
import { LayoutProps } from '../types'

const CommonLayout = ({ children }: LayoutProps) => {
	return (
		<div className='main p-2'>
			<div className='layout d-flex'>
				<div className='sidebar'>Sidebar</div>
				<div className='content'>
					<div className='header'>Header</div>
					<div className='body'>{children}</div>
				</div>
			</div>
		</div>
	)
}

export default CommonLayout
