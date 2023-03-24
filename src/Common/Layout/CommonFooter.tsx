import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

const CommonFooter = () => {
	return (
		<Footer
			style={{ textAlign: 'center', position: 'fixed', bottom: 0, width: '100%' }}
		>{`${process.env.REACT_APP_COMPANY} ©2023 Created by Frank Mendez`}</Footer>
	)
}

export default CommonFooter
