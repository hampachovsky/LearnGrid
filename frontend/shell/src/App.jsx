import React, { useContext, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router'
import Header from './components/Header'
import NotFound from './components/NotFound'
import ProtectedFromAuth from './components/Protected/ProtectedFromAuth'
import ProtectedRoute from './components/Protected/ProtectedRoute'
import MobileSidebarDrawer from './components/Sidebar/MobileSidebar'
import Sidebar from './components/Sidebar/Sidebar'
import { UserContext } from './context/UserContext'
import CreateClassPage from './pages/CreateClassPage'
import JoinClassPage from './pages/JoinClassPage'

const Auth = React.lazy(() => import('auth/App'))
const Classes = React.lazy(() => import('classes/App'))
const Tasks = React.lazy(() => import('tasks/App'))

export default function App() {
	const { user, logout, refetch } = useContext(UserContext)
	const [isDrawerOpen, setDrawerOpen] = useState(false)
	const location = useLocation()

	const isTeacher = user?.role === 'teacher'
	const isStudent = user?.role === 'student'

	return (
		<div className='min-h-screen bg-gray-100 overflow-x-hidden w-full max-w-full'>
			<Header user={user} logout={logout} onMenuOpen={() => setDrawerOpen(true)} />

			<MobileSidebarDrawer
				isOpen={isDrawerOpen}
				onClose={() => setDrawerOpen(false)}
				isTeacher={isTeacher}
				isStudent={isStudent}
			/>

			<div className='flex w-full max-w-full overflow-x-hidden'>
				{user && <Sidebar isTeacher={isTeacher} isStudent={isStudent} />}

				<main className='flex-1 p-6 sm:p-8'>
					<React.Suspense fallback='Завантаження класів...'>
						<Routes>
							<Route path='/' element={user ? <Navigate to='/classes' /> : <Navigate to='/auth/login' />} />

							<Route
								path='/auth/*'
								element={
									<ProtectedFromAuth>
										<Auth onLogin={() => refetch()} />
									</ProtectedFromAuth>
								}
							/>

							<Route
								path='/classes/*'
								element={
									<ProtectedRoute>
										<Classes />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/tasks/*'
								element={
									<ProtectedRoute>
										<Tasks initialPath={location.pathname} />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/join'
								element={
									<ProtectedRoute>
										<JoinClassPage />
									</ProtectedRoute>
								}
							/>

							<Route
								path='/create-class'
								element={
									<ProtectedRoute>
										<CreateClassPage />
									</ProtectedRoute>
								}
							/>

							<Route path='*' element={<NotFound />} />
						</Routes>
					</React.Suspense>
				</main>
			</div>
		</div>
	)
}
