import React from 'react'
import 'antd/dist/reset.css'
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './Routes/MainRoutes'
import { Toaster } from 'react-hot-toast'

function App() {
	return (
		<BrowserRouter>
			<Toaster position='bottom-center' />
			<MainRoutes />
		</BrowserRouter>
	)
}

export default App
