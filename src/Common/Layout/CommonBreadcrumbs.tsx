import { Breadcrumb } from 'antd'
import React from 'react'
import useBreadcrumbs from 'use-react-router-breadcrumbs'

const CommonBreadcrumbs = () => {
	const breadcrumbs = useBreadcrumbs()

	return (
		<Breadcrumb style={{ margin: '16px 0' }}>
			{breadcrumbs.map(({ breadcrumb }, index) => {
				return <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
			})}
		</Breadcrumb>
	)
}

export default CommonBreadcrumbs
