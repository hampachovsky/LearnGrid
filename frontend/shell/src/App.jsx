import React from 'react'

const Classes = React.lazy(() => import('classes/App'))
const Auth = React.lazy(() => import('auth/App'))
const Tasks = React.lazy(() => import('tasks/App'))
const Grades = React.lazy(() => import('grades/App'))

export default function App() {
	return (
		<div>
			<h1>Shell</h1>

			<React.Suspense fallback={'Loading...'}>
				<div className='flex flex-col gap-9'>
					<div>
						<Auth />
					</div>
					<div>
						<Classes />
					</div>
					<div>
						<Tasks />
					</div>
					<div>
						<Grades />
					</div>
				</div>
			</React.Suspense>
		</div>
	)
}
