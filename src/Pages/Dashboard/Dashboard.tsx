import { Typography } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { RootState } from '../../Reducer/Store'

const { Text } = Typography

const Dashboard = () => {
	const user = useSelector((state: RootState) => state.userDetails)
	const location = useLocation()
	const navigate = useNavigate()
	const [show, setShow] = useState(false)
	const [counter, setCounter] = useState(0)

	useEffect(() => {
		if (location.pathname !== '/dashboard') {
			navigate('/dashboard')
		}
	}, [location, navigate])

	const clickHandler = () => {
		if (counter === 0) {
			setShow(true)
			setCounter(counter + 1)
		} else {
			setShow(false)
		}
	}

	return (
		<Fragment>
			<a onClick={clickHandler} href='#'>
				Want to buy a new car?
			</a>
			{show ?? <p>Call +11 22 33 44 now!</p>}
		</Fragment>
	)
}

export default Dashboard
