import { Breadcrumb, Layout, theme } from 'antd'
import React from 'react'
import { LayoutProps } from '../types'
import CommonFooter from './CommonFooter'
import CommonHeader from './CommonHeader'
import Sidebar from './Sidebar'
import './CommonLayout.style.scss'

const { Content } = Layout

const CommonLayout = ({ children }: LayoutProps) => {
	const {
		token: { colorBgContainer },
	} = theme.useToken()

	return (
		<Layout className='main'>
			<Sidebar />
			<Layout className='site-layout'>
				<CommonHeader />
				<Content style={{ margin: '0 16px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>User</Breadcrumb.Item>
						<Breadcrumb.Item>Bill</Breadcrumb.Item>
					</Breadcrumb>
					<div style={{ padding: 24, minHeight: 360, background: colorBgContainer }}>{children}</div>
				</Content>
				<CommonFooter />
			</Layout>
		</Layout>
	)
}

export default CommonLayout
