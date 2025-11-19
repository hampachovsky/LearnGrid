import React, { useContext } from 'react'
import { Link, Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserContext'

const Auth = React.lazy(() => import('auth/App'))

// const Classes = React.lazy(() => import('classes/App'))
// const Tasks = React.lazy(() => import('tasks/App'))
// const Grades = React.lazy(() => import('grades/App'))

export default function App() {
	const { user, logout, refetch } = useContext(UserContext)

	return (
		<div className='p-6'>
			<nav className='flex justify-between mb-6'>
				<h1 className='text-xl font-bold'>Shell</h1>

				<div className='flex gap-4'>
					<Link to='/'>Головна</Link>
					<Link to='/auth/login'>Логін</Link>

					{user && (
						<button onClick={logout} className='px-3 py-1 bg-red-500 text-white rounded'>
							Вийти
						</button>
					)}
				</div>
			</nav>

			<React.Suspense fallback='Завантаження...'>
				<Routes>
					<Route path='/' element={<HomePage user={user} />} />

					<Route
						path='/auth/*'
						element={
							<Auth
								onLogin={() => {
									refetch()
								}}
							/>
						}
					/>
					<Route
						path='/dashboard'
						element={
							<ProtectedRoute>
								<Dashboard />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</React.Suspense>
		</div>
	)
}

function HomePage({ user }) {
	return (
		<div>
			<h2 className='text-2xl mb-2'>{user ? `Привіт, ${user.email}` : 'Привіт 👋'}</h2>
			<p>Це головний shell.</p>
		</div>
	)
}

function Dashboard() {
	return (
		<div className='p-4 bg-gray-100 rounded'>
			<h2 className='text-xl'>Особистий кабінет</h2>
			<p>Приватний контент.</p>
		</div>
	)
}
