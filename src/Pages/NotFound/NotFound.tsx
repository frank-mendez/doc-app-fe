import React from 'react'
import './NotFound.style.scss'

const NotFound = () => {
	return (
		<div className='not-found container text-center'>
			<div className='row'>
				<div className='col-md-12'>
					<h1 className='mt-5'>404</h1>
					<h2>Page Not Found</h2>
					<p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
					<a className='btn btn-primary' href='/'>
						Go to Home Page
					</a>
				</div>
			</div>
		</div>
	)
}

export default NotFound
