import React from 'react'
import { Layout } from 'antd'
const { Footer } = Layout

const CommonFooter = () => {
	return <Footer style={{ textAlign: 'center' }}>{`${process.env.REACT_APP_COMPANY} ©2023 Created by Frank Mendez`}</Footer>
}

export default CommonFooter
